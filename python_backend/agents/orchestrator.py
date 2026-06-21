"""
ORCHESTRATOR - Coordinates all 5 AI agents in sequence
Workflow:
1. User message → ORCHESTRATOR
2. ORCHESTRATOR → Emotion Bot → Result back
3. ORCHESTRATOR → Context Memory Bot (with emotion result) → Result back
4. ORCHESTRATOR → Strategy Bot (with emotion + context) → Result back
5. ORCHESTRATOR → Response Generator Bot (with all results) → Result back
6. ORCHESTRATOR → sends final response to USER
"""

from typing import Dict, Any
from datetime import datetime

class Orchestrator:
    def __init__(self):
        print("🎯 Initializing ORCHESTRATOR...")
        print("   Loading all 5 agents...")
        
        # Import and initialize all 5 agents
        try:
            # Agent 1: Emotion Analyzer
            from agents.emotion_model import emotion_classifier
            self.emotion_bot = emotion_classifier
            print("   ✅ Agent 1: Emotion Bot loaded")
        except Exception as e:
            print(f"   ❌ Agent 1 failed: {e}")
            self.emotion_bot = None
        
        try:
            # Agent 2: Context Memory Bot
            from agents.memory_agent import memory_agent
            self.memory_bot = memory_agent
            print("   ✅ Agent 2: Context Memory Bot loaded")
        except Exception as e:
            print(f"   ❌ Agent 2 failed: {e}")
            self.memory_bot = None
        
        try:
            # Agent 3: Strategy Bot
            from agents.wellness_strategy import wellness_agent
            self.strategy_bot = wellness_agent
            print("   ✅ Agent 3: Strategy Bot loaded")
        except Exception as e:
            print(f"   ❌ Agent 3 failed: {e}")
            self.strategy_bot = None
        
        try:
            # Agent 4: Response Generator Bot
            from agents.response_agent import response_agent
            self.response_bot = response_agent
            print("   ✅ Agent 4: Response Generator Bot loaded")
        except Exception as e:
            print(f"   ❌ Agent 4 failed: {e}")
            self.response_bot = None
        
        try:
            # Agent 5: Scoping Agent (Input Validation)
            from agents.scoping_agent import scoping_agent
            self.scoping_bot = scoping_agent
            print("   ✅ Agent 5: Scoping Agent loaded")
        except Exception as e:
            print(f"   ❌ Agent 5 failed: {e}")
            self.scoping_bot = None
        
        print("🎯 ORCHESTRATOR initialized successfully!")
        print("=" * 60)
    
    def process_message(self, message: str, user_id: str = "default_user", 
                       voice_input: bool = False) -> Dict[str, Any]:
        """
        Main orchestration function - coordinates all 5 agents
        
        Workflow:
        1. User message → ORCHESTRATOR
        2. ORCHESTRATOR → Emotion Bot
        3. ORCHESTRATOR → Context Memory Bot (forwards emotion result)
        4. ORCHESTRATOR → Strategy Bot (forwards emotion + context results)
        5. ORCHESTRATOR → Response Generator Bot (forwards all results)
        6. ORCHESTRATOR → sends final response to USER
        """
        
        print("\n" + "=" * 60)
        print(f"🎯 ORCHESTRATOR: Processing message from {user_id}")
        print(f"📝 Message: '{message[:50]}...'")
        print("=" * 60)
        
        # ========== STEP 1: SCOPING BOT (VALIDATION) ==========
        print("\n🔹 STEP 1: Calling Scoping Bot...")
        if self.scoping_bot:
            if not self.scoping_bot.is_in_scope(message):
                print(f"   ⚠️ Message is OUT OF SCOPE. Rejecting.")
                rejection_msg = self.scoping_bot.get_invalid_input_message()
                return {
                    "response": rejection_msg,
                    "emotion": "neutral",
                    "intensity": "low",
                    "confidence": 1.0,
                    "strategy": "rejection",
                    "user_type": "NEW",
                    "interaction_count": 0,
                    "emotional_trend": "none",
                    "voice_output": voice_input,
                    "timestamp": datetime.now().isoformat(),
                    "orchestrator": "5-agent-pipeline",
                    "scoped": False
                }
            else:
                print(f"   ✅ Message is IN SCOPE. Proceeding.")
        
        
        # ========== STEP 2: EMOTION BOT ==========
        print("\n🔹 STEP 2: Calling Emotion Bot...")
        emotion_result = self._call_emotion_bot(message)
        print(f"   ✅ Emotion Bot Result: {emotion_result['emotion']} "
              f"({emotion_result['intensity']}) - "
              f"Confidence: {emotion_result['confidence']:.2f}")
        
        # ========== STEP 3: CONTEXT MEMORY BOT ==========
        print("\n🔹 STEP 3: Calling Context Memory Bot...")
        print(f"   → Forwarding emotion result: {emotion_result['emotion']}")
        context_result = self._call_memory_bot(user_id, message, emotion_result)
        print(f"   ✅ Memory Bot Result: User type: {context_result.get('user_type', 'NEW')}, "
              f"Interactions: {context_result.get('interaction_count', 0)}, "
              f"Trend: {context_result.get('emotional_trend', 'unknown')}")
        
        # ========== STEP 4: STRATEGY BOT ==========
        print("\n🔹 STEP 4: Calling Strategy Bot...")
        print(f"   → Forwarding emotion result: {emotion_result['emotion']}")
        print(f"   → Forwarding context result: {context_result.get('emotional_trend', 'unknown')}")
        strategy_result = self._call_strategy_bot(message, emotion_result, context_result)
        print(f"   ✅ Strategy Bot Result: {strategy_result['strategy']} "
              f"(Score: {strategy_result.get('strategy_score', 0):.2f})")
        
        # ========== STEP 5: RESPONSE GENERATOR BOT ==========
        print("\n🔹 STEP 5: Calling Response Generator Bot...")
        print(f"   → Forwarding emotion result: {emotion_result['emotion']}")
        print(f"   → Forwarding context result: {context_result.get('user_type', 'NEW')}")
        print(f"   → Forwarding strategy result: {strategy_result['strategy']}")
        response_result = self._call_response_bot(
            message, emotion_result, strategy_result, context_result
        )
        print(f"   ✅ Response Bot Result: Generated {len(response_result['response'])} chars")
        print(f"   📝 RESPONSE: \"{response_result['response']}\"")
        
        # ========== STEP 6: SEND FINAL RESPONSE TO USER ==========
        print("\n🔹 STEP 6: Preparing final response for USER...")
        final_response = {
            "response": response_result["response"],
            "emotion": emotion_result["emotion"],
            "intensity": emotion_result["intensity"],
            "confidence": emotion_result["confidence"],
            "strategy": strategy_result["strategy"],
            "user_type": context_result.get("user_type", "NEW"),
            "interaction_count": context_result.get("interaction_count", 0),
            "emotional_trend": context_result.get("emotional_trend", "unknown"),
            "voice_output": voice_input,
            "timestamp": datetime.now().isoformat(),
            "orchestrator": "5-agent-pipeline"
        }
        
        print(f"   ✅ Final response ready!")
        print("=" * 60)
        print(f"📤 ORCHESTRATOR → USER: Sending response")
        print(f"💬 AI MSG: {response_result['response']}")
        print("=" * 60 + "\n")
        
        return final_response
    
    def _call_emotion_bot(self, message: str) -> Dict[str, Any]:
        """
        STEP 2: Call Emotion Bot
        Analyzes emotion from user message
        """
        if not self.emotion_bot:
            return {
                "emotion": "neutral",
                "intensity": "medium",
                "confidence": 0.5
            }
        
        try:
            result = self.emotion_bot.predict(message)
            return {
                "emotion": result.get("emotion", "neutral"),
                "intensity": result.get("intensity", "medium"),
                "confidence": result.get("confidence", 0.5)
            }
        except Exception as e:
            print(f"   ⚠️ Emotion Bot error: {e}")
            return {
                "emotion": "neutral",
                "intensity": "medium",
                "confidence": 0.5
            }
    
    def _call_memory_bot(self, user_id: str, message: str, 
                        emotion_result: Dict[str, Any]) -> Dict[str, Any]:
        """
        STEP 3: Call Context Memory Bot
        Receives emotion result and checks user history
        """
        if not self.memory_bot:
            return {
                "has_history": False,
                "user_id": user_id,
                "is_new_user": True,
                "interaction_count": 0,
                "emotional_trend": "first_interaction",
                "user_type": "NEW"
            }
        
        try:
            # Update memory with emotion result
            context = self.memory_bot.update_memory(
                user_id=user_id,
                message=message,
                emotion_data=emotion_result
            )
            return context
        except Exception as e:
            print(f"   ⚠️ Memory Bot error: {e}")
            return {
                "has_history": False,
                "user_id": user_id,
                "is_new_user": True,
                "interaction_count": 0,
                "emotional_trend": "first_interaction",
                "user_type": "NEW"
            }
    
    def _call_strategy_bot(self, message: str, emotion_result: Dict[str, Any],
                          context_result: Dict[str, Any]) -> Dict[str, Any]:
        """
        STEP 4: Call Strategy Bot
        Receives emotion result + context result and decides strategy
        """
        if not self.strategy_bot:
            return {
                "strategy": "active_listening",
                "strategy_score": 0.5,
                "recommended_strategies": ["active_listening"],
                "response_template": "I'm here to listen and support you.",
                "is_crisis": False
            }
        
        try:
            # Add user message to emotion data for crisis detection
            emotion_with_message = emotion_result.copy()
            emotion_with_message["user_message"] = message
            
            # Call strategy bot with emotion + context
            result = self.strategy_bot.predict(
                emotion_data=emotion_with_message,
                context_data=context_result
            )
            return result
        except Exception as e:
            print(f"   ⚠️ Strategy Bot error: {e}")
            return {
                "strategy": "active_listening",
                "strategy_score": 0.5,
                "recommended_strategies": ["active_listening"],
                "response_template": "I'm here to listen and support you.",
                "is_crisis": False
            }
    
    def _call_response_bot(self, message: str, emotion_result: Dict[str, Any],
                          strategy_result: Dict[str, Any], 
                          context_result: Dict[str, Any]) -> Dict[str, Any]:
        """
        STEP 5: Call Response Generator Bot
        Receives emotion + context + strategy results and creates final response
        """
        if not self.response_bot:
            return {
                "response": strategy_result.get("response_template", 
                                               "I'm here to support you."),
                "strategy_used": strategy_result.get("strategy", "active_listening"),
                "tone_style": "neutral",
                "personalized": False,
                "emotion_aware": True
            }
        
        try:
            # Extract ML-driven keywords for a "Real AI" feel
            ml_keywords = []
            if hasattr(self.emotion_bot, 'get_top_keywords'):
                ml_keywords = self.emotion_bot.get_top_keywords(message)
            
            # Call response generator with all results + ML keywords
            result = self.response_bot.generate_response(
                user_message=message,
                emotion_data=emotion_result,
                strategy_data=strategy_result,
                context_data=context_result,
                ml_keywords=ml_keywords
            )
            return result
        except Exception as e:
            print(f"   ⚠️ Response Bot error: {e}")
            return {
                "response": strategy_result.get("response_template", 
                                               "I'm here to support you."),
                "strategy_used": strategy_result.get("strategy", "active_listening"),
                "tone_style": "neutral",
                "personalized": False,
                "emotion_aware": True
            }

# Create global orchestrator instance
orchestrator = Orchestrator()

# Test function
def test_orchestrator():
    """Test the complete 5-agent pipeline"""
    print("\n" + "=" * 60)
    print("🧪 TESTING COMPLETE 5-AGENT ORCHESTRATOR")
    print("=" * 60)
    
    test_messages = [
        {
            "message": "I'm feeling really anxious about my exams",
            "user_id": "test_user_1"
        },
        {
            "message": "Hello there!",
            "user_id": "test_user_2"
        },
        {
            "message": "What is the weather like today?",
            "user_id": "test_user_3"
        },
        {
            "message": "Can you tell me a joke?",
            "user_id": "test_user_4"
        }
    ]
    
    for i, test in enumerate(test_messages, 1):
        print(f"\n{'='*60}")
        print(f"TEST CASE {i}")
        print(f"{'='*60}")
        
        result = orchestrator.process_message(
            message=test["message"],
            user_id=test["user_id"]
        )
        
        print(f"\n📊 FINAL RESULT:")
        print(f"   Response: {result['response'][:100]}...")
        print(f"   Emotion: {result['emotion']} ({result['intensity']})")
        print(f"   Strategy: {result['strategy']}")
        print(f"   User Type: {result['user_type']}")
        print(f"   Interactions: {result['interaction_count']}")

if __name__ == "__main__":
    test_orchestrator()
