from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn
import json
from datetime import datetime
import traceback
import os
import signal
import psutil
import time
import socket

# Try to import our agents
try:
    from agents.orchestrator import Orchestrator
    ORCHESTRATOR_AVAILABLE = True
    print("✅ Orchestrator agent loaded successfully")
except Exception as e:
    print(f"⚠️  Warning: Could not import orchestrator: {e}")
    ORCHESTRATOR_AVAILABLE = False
    Orchestrator = None

# ✅ IMPORT YOUR CUSTOM TRAINED EMOTION MODEL HERE
try:
    from agents.emotion_model import emotion_classifier
    # Force training to ensure model is ready
    print("🧠 Initializing custom emotion model...")
    if not emotion_classifier.is_trained:
        print("🔄 Training custom emotion model...")
        accuracy = emotion_classifier.train()
        print(f"✅ Custom model trained with accuracy: {accuracy:.2%}")
    else:
        print("✅ Custom emotion model already trained")
    
    # Test the model immediately
    test_result = emotion_classifier.predict("I feel happy today")
    print(f"🧪 Test prediction: '{test_result['emotion']}' (Confidence: {test_result['confidence']:.2f})")
    
    EMOTION_MODEL_AVAILABLE = True
except Exception as e:
    print(f"❌ Custom emotion model failed to load: {e}")
    traceback.print_exc()
    EMOTION_MODEL_AVAILABLE = False
    emotion_classifier = None

# Initialize FastAPI app
app = FastAPI(title="MentAura 5-Agent API", version="1.0.0")

# Configure CORS to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====================== 🌐 BROWSER LOGGING SYSTEM ======================
def print_browser_log(log_type: str, message: str, data: Dict[str, Any] = None, user_id: str = "unknown"):
    """Print browser logs directly to terminal with nice formatting"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    
    # Color codes for terminal
    colors = {
        "info": "\033[94m",      # Blue
        "success": "\033[92m",   # Green
        "warning": "\033[93m",   # Yellow
        "error": "\033[91m",     # Red
        "api": "\033[95m",       # Purple
        "user": "\033[96m",      # Cyan
        "reset": "\033[0m"       # Reset
    }
    
    # Map log types to colors
    color_map = {
        "USER_MESSAGE": colors["user"],
        "API_CALL": colors["api"],
        "API_RESPONSE": colors["success"],
        "API_ERROR": colors["error"],
        "CONSOLE_LOG": colors["info"],
        "BUTTON_CLICK": colors["info"],
        "VOICE_INPUT": colors["info"],
        "ERROR": colors["error"]
    }
    
    color = color_map.get(log_type, colors["info"])
    
    # Print header
    print(f"\n{color}┌─────────────────────────────────────────────────────────────")
    print(f"│ 🌐 BROWSER LOG - {timestamp}")
    print(f"│ Type: {log_type}")
    print(f"│ User: {user_id}")
    print(f"├─────────────────────────────────────────────────────────────{colors['reset']}")
    
    # Print message
    print(f"{color}│ 📝 Message: {message}{colors['reset']}")
    
    # Print data if available
    if data:
        print(f"{color}│ 📊 Data:{colors['reset']}")
        try:
            if isinstance(data, dict):
                for key, value in data.items():
                    if key == 'message' and len(str(value)) > 50:
                        print(f"{color}│   • {key}: {str(value)[:50]}...{colors['reset']}")
                    else:
                        print(f"{color}│   • {key}: {value}{colors['reset']}")
            else:
                print(f"{color}│   {data}{colors['reset']}")
        except:
            print(f"{color}│   [Complex data - see below]{colors['reset']}")
            print(f"{color}│   {json.dumps(data, indent=2)[:200]}...{colors['reset']}")
    
    print(f"{color}└─────────────────────────────────────────────────────────────{colors['reset']}\n")

# Data models
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "default_user"
    voice_input: Optional[bool] = False

class ChatResponse(BaseModel):
    response: str
    emotion: Optional[str] = None
    intensity: Optional[str] = None
    confidence: Optional[float] = None
    strategy: Optional[str] = None
    voice_output: Optional[bool] = False

# 🌐 NEW: Model for browser logs
class BrowserLog(BaseModel):
    type: str
    message: str
    data: Optional[Dict[str, Any]] = None
    user_id: Optional[str] = "browser_user"
    timestamp: Optional[str] = None

# Initialize orchestrator only if available
if ORCHESTRATOR_AVAILABLE:
    orchestrator = Orchestrator()
else:
    orchestrator = None
    print("⚠️  WARNING: Orchestrator not available - chat responses will be basic")

# Get the project root directory
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.get("/")
async def root():
    return FileResponse(os.path.join(project_root, "index.html"))

# Mount static files for CSS, JS, Images, etc.
# Direct children of the root directory
static_dirs = ["css", "js", "images", "assests", "audio", "videos", "balloon_pop", "breathing_app", "emotion_compass", "puzzle", "snake"]
for d in static_dirs:
    dir_path = os.path.join(project_root, d)
    if os.path.exists(dir_path):
        app.mount(f"/{d}", StaticFiles(directory=dir_path), name=d)

# Also serve other HTML files directly if requested
@app.get("/{page}.html")
async def serve_html(page: str):
    html_file = os.path.join(project_root, f"{page}.html")
    if os.path.exists(html_file):
        return FileResponse(html_file)
    raise HTTPException(status_code=404, detail="Page not found")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy" if ORCHESTRATOR_AVAILABLE and EMOTION_MODEL_AVAILABLE else "degraded",
        "agents": 5 if ORCHESTRATOR_AVAILABLE else 0,
        "emotion_model": EMOTION_MODEL_AVAILABLE,
        "custom_model": True
    }

# 🌐 NEW ENDPOINT: Receive browser logs
@app.post("/log")
async def receive_browser_log(log: BrowserLog):
    """Receive logs from browser and display in terminal"""
    print_browser_log(
        log_type=log.type,
        message=log.message,
        data=log.data,
        user_id=log.user_id
    )
    return {"status": "log_received", "timestamp": datetime.now().isoformat()}

# 🌟 NEW ENDPOINT: Test emotion analyzer directly
@app.post("/analyze_emotion")
async def analyze_emotion_endpoint(request: Dict[str, Any]):
    """Direct endpoint to test emotion analysis with CUSTOM model"""
    try:
        text = request.get("text", "")
        if not text:
            raise HTTPException(status_code=400, detail="No text provided")
        
        if not EMOTION_MODEL_AVAILABLE:
            raise HTTPException(status_code=503, detail="Custom emotion model not available")
        
        # Use your CUSTOM emotion model
        result = emotion_classifier.predict(text)
        
        print_browser_log(
            log_type="EMOTION_ANALYSIS",
            message=f"Custom model analysis for text: '{text[:50]}...'",
            data=result,
            user_id="test_user"
        )
        
        return result
        
    except Exception as e:
        print_browser_log(
            log_type="ERROR",
            message=f"Error in emotion analysis: {str(e)}",
            data={"error": str(e)},
            user_id="test_user"
        )
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Main endpoint for chat messages.
    Uses CUSTOM emotion model + agents.
    """
    try:
        # 🌐 Log the incoming chat request
        print_browser_log(
            log_type="USER_MESSAGE",
            message=f"User '{request.user_id}' sent message",
            data={
                "message": request.message,
                "length": len(request.message),
                "voice_input": request.voice_input
            },
            user_id=request.user_id
        )
        
        print(f"🤖 Processing message from {request.user_id}: '{request.message[:50]}...'")
        
        # 🌟 STEP 1: CUSTOM EMOTION ANALYSIS (ALWAYS FIRST)
        emotion_result = None
        if EMOTION_MODEL_AVAILABLE:
            try:
                emotion_result = emotion_classifier.predict(request.message)
                print(f"🎭 CUSTOM MODEL → Emotion: {emotion_result['emotion'].upper()} "
                      f"({emotion_result['intensity'].upper()}) - Confidence: {emotion_result['confidence']:.2f}")
            except Exception as e:
                print(f"⚠️  Custom emotion analysis failed: {e}")
                emotion_result = {
                    "emotion": "neutral",
                    "intensity": "medium", 
                    "confidence": 0.5
                }
        else:
            emotion_result = {
                "emotion": "neutral",
                "intensity": "medium",
                "confidence": 0.5
            }
        
        # 🌟 STEP 3: PROCESS THROUGH AGENTS (IF AVAILABLE)
        if ORCHESTRATOR_AVAILABLE and orchestrator:
            result = orchestrator.process_message(
                message=request.message,
                user_id=request.user_id,
                voice_input=request.voice_input
            )
        else:
            # Fallback response if orchestrator not available
            result = {
                "response": f"I understand you're feeling {emotion_result['emotion']}. "
                          f"I'm here to listen and support you. "
                          f"Would you like to tell me more about what's on your mind?",
                "strategy": "active_listening",
                "voice_output": request.voice_input
            }
        
        # 🌟 STEP 4: ADD CUSTOM MODEL EMOTION DATA TO RESPONSE
        result["emotion"] = emotion_result["emotion"]
        result["intensity"] = emotion_result["intensity"]
        result["confidence"] = emotion_result["confidence"]
        
        # 🌐 Log the agent processing result
        print_browser_log(
            log_type="AGENT_RESULT",
            message="Processing complete",
            data={
                "emotion": result.get("emotion"),
                "intensity": result.get("intensity"),
                "confidence": result.get("confidence"),
                "strategy": result.get("strategy"),
                "response_preview": result.get("response", "")[:100] + "...",
                "response_length": len(result.get("response", ""))
            },
            user_id=request.user_id
        )
        
        return ChatResponse(**result)
        
    except Exception as e:
        error_msg = str(e)
        print_browser_log(
            log_type="ERROR",
            message=f"Error processing message: {error_msg}",
            data={"error": error_msg},
            user_id=request.user_id
        )
        print(f"❌ Error processing message: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def cleanup_port(port):
    """Try to find and kill process on the given port"""
    print(f"🔍 Checking for processes on port {port}...")
    
    # 1. Try socket check first
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        if s.connect_ex(('localhost', port)) != 0:
            print(f"✅ Port {port} is free.")
            return True

    # 2. Port is in use, try to identify and kill
    print(f"⚠️  Port {port} is in use. Attempting to clear...")
    found = False
    
    # Try PSUTIL first
    try:
        import psutil
        for conn in psutil.net_connections(kind='inet'):
            if conn.laddr.port == port:
                pid = conn.pid
                if pid and pid != os.getpid():
                    try:
                        proc = psutil.Process(pid)
                        print(f"🔪 Killing process '{proc.name()}' (PID: {pid}) using port {port}...")
                        proc.terminate()
                        time.sleep(1)
                        found = True
                    except (psutil.NoSuchProcess, psutil.AccessDenied):
                        pass
    except Exception as e:
        print(f"⚠️  psutil cleanup failed: {e}")

    # Try SUBPROCESS/LSOF as fallback (very reliable on Mac)
    if not found:
        try:
            import subprocess
            # Get PIDs using lsof
            output = subprocess.check_output(["lsof", "-t", "-i", f":{port}"]).decode().strip()
            if output:
                for pid_str in output.split("\n"):
                    pid = int(pid_str)
                    if pid != os.getpid():
                        print(f"🔪 Killing process PID {pid} using lsof...")
                        os.kill(pid, signal.SIGTERM)
                        found = True
                if found:
                    time.sleep(1)
        except Exception as e:
            print(f"⚠️  lsof cleanup failed: {e}")
    
    return found

if __name__ == "__main__":
    print("🚀 Starting MentAura 5-Agent API...")
    print("📡 Endpoints:")
    print("   GET  /                  - API status")
    print("   GET  /health           - Health check")
    print("   POST /chat             - Main chat endpoint (uses CUSTOM emotion model)")
    print("   POST /log              - 🌐 Browser log receiver")
    print("   POST /analyze_emotion  - 🌟 Direct emotion analysis with CUSTOM model")
    print(f"📊 Orchestrator: {'✅ Available' if ORCHESTRATOR_AVAILABLE else '❌ Not available'}")
    print(f"📊 Custom Emotion Model: {'✅ Available' if EMOTION_MODEL_AVAILABLE else '❌ Not available'}")
    print("💡 Using: CUSTOM TRAINED LOGISTIC REGRESSION + TF-IDF MODEL")
    print("\n" + "═" * 60)
    print("🌟 MENTAURA BACKEND IS LIVE!")
    print(f"🔗 CLICK TO OPEN: http://localhost:8000")
    print("═" * 60 + "\n")
    
    # Try to cleanup port 8000 before starting
    try:
        cleanup_port(8000)
    except Exception as e:
        print(f"⚠️  Port cleanup failed: {e}")

    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, reload=False, log_level="info")
    except Exception as e:
        if "address already in use" in str(e).lower() or "[errno 48]" in str(e).lower():
            print("\n" + "!" * 60)
            print("❌ STILL FAILING TO BIND TO PORT 8000")
            print("💡 PRO TIP: On Mac, go to Settings > General > AirPlay & Handoff")
            print("   and turn OFF 'AirPlay Receiver' - it often steals port 8000.")
            print("!" * 60 + "\n")
            
            # Try fallback to 8001
            print("🔄 Attempting fallback to port 8001...")
            try:
                uvicorn.run(app, host="0.0.0.0", port=8001, reload=False)
            except Exception as e2:
                print(f"❌ Fallback failed: {e2}")
        else:
            raise e