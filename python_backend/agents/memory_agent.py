"""
Memory Agent - REAL Context Memory for Mental Health Chatbot
FIXED VERSION with correct trends
"""
import json
import os
from datetime import datetime
from typing import Dict, Any

class MemoryAgent:
    def __init__(self, memory_file: str = "user_memories.json"):
        """
        Initialize REAL Memory Agent with FIXED logic
        """
        self.memory_file = memory_file
        self.memories = self._load_memories()
        print(f"🧠 REAL Memory Agent initialized")
        print(f"   Users in memory: {len(self.memories)}")
        if self.memories:
            print(f"   Existing users: {list(self.memories.keys())}")
    
    def _load_memories(self) -> Dict[str, Any]:
        """Load memories from JSON file"""
        if os.path.exists(self.memory_file):
            try:
                with open(self.memory_file, 'r') as f:
                    return json.load(f)
            except:
                print("   ⚠️  Could not load memory file, starting fresh")
                return {}
        print("   No memory file found, starting fresh")
        return {}
    
    def _save_memories(self):
        """Save memories to JSON file"""
        try:
            with open(self.memory_file, 'w') as f:
                json.dump(self.memories, f, indent=2, default=str)
        except Exception as e:
            print(f"   ⚠️  Could not save memories: {e}")
    
    def _clear_old_memories(self):
        """Optional: Clear memories for testing"""
        self.memories = {}
        self._save_memories()
        print("   🗑️  Memories cleared for testing")
    
    def update_memory(self, user_id: str, message: str, 
                     emotion_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update user's memory with new interaction - FIXED
        """
        # DEBUG: Check if user truly exists
        is_new_user = user_id not in self.memories
        print(f"   👤 User '{user_id}': {'NEW' if is_new_user else 'RETURNING'}")
        
        # Create or get user memory
        if is_new_user:
            print(f"   📝 Creating new memory for {user_id}")
            self.memories[user_id] = {
                "user_id": user_id,
                "first_interaction": datetime.now().isoformat(),
                "interaction_count": 0,
                "messages": [],
                "emotions": [],
                "created_at": datetime.now().isoformat()
            }
        
        user_memory = self.memories[user_id]
        now = datetime.now().isoformat()
        
        # Update counts - START FROM 0 for new users
        current_count = user_memory.get("interaction_count", 0)
        user_memory["interaction_count"] = current_count + 1
        user_memory["last_interaction"] = now
        user_memory["updated_at"] = now
        
        # Store message
        message_entry = {
            "timestamp": now,
            "text": message[:200],
            "emotion": emotion_data.get("emotion"),
            "intensity": emotion_data.get("intensity"),
            "message_number": user_memory["interaction_count"]
        }
        user_memory.setdefault("messages", []).append(message_entry)
        
        # Store emotion
        emotion_entry = {
            "timestamp": now,
            "emotion": emotion_data.get("emotion"),
            "intensity": emotion_data.get("intensity"),
            "confidence": emotion_data.get("confidence", 0.0),
            "interaction_number": user_memory["interaction_count"]
        }
        user_memory.setdefault("emotions", []).append(emotion_entry)
        
        # Keep only last 10 messages/emotions
        for key in ["messages", "emotions"]:
            if len(user_memory.get(key, [])) > 10:
                user_memory[key] = user_memory[key][-10:]
        
        # Save to file
        self._save_memories()
        
        # Get context with FIXED trend calculation
        return self.get_context(user_id)
    
    def get_context(self, user_id: str) -> Dict[str, Any]:
        """
        Get user context with FIXED trend calculation
        """
        is_new_user = user_id not in self.memories
        
        if is_new_user:
            return {
                "has_history": False,
                "user_id": user_id,
                "is_new_user": True,
                "interaction_count": 0,
                "emotional_trend": "first_interaction",
                "user_type": "NEW"
            }
        
        user_memory = self.memories[user_id]
        messages = user_memory.get("messages", [])
        emotions = user_memory.get("emotions", [])
        interaction_count = user_memory.get("interaction_count", 0)
        
        # FIXED: Better trend calculation
        emotional_trend = "stable"
        
        if len(emotions) >= 2:
            # Get last 2 emotions
            last_emotion = emotions[-1]["emotion"]
            prev_emotion = emotions[-2]["emotion"]
            
            # Define emotion "goodness" levels
            emotion_levels = {
                "happiness": 3,      # Best
                "neutral": 2,        # Good
                "sadness": 1,        # Bad
                "anxiety": 1,        # Bad
                "anger": 1,          # Bad
                "crisis": 0          # Worst
            }
            
            last_level = emotion_levels.get(last_emotion, 1)
            prev_level = emotion_levels.get(prev_emotion, 1)
            
            if last_level > prev_level:
                emotional_trend = "improving"
            elif last_level < prev_level:
                emotional_trend = "declining"
            else:
                emotional_trend = "stable"
        
        elif len(emotions) == 1:
            emotional_trend = "first_emotion_recorded"
        
        # Determine user type based on interactions
        if interaction_count == 1:
            user_type = "NEW_FIRST_TIME"
        elif interaction_count <= 3:
            user_type = "NEW_REGULAR"
        else:
            user_type = "RETURNING_REGULAR"
        
        return {
            "has_history": True,
            "user_id": user_id,
            "is_new_user": False,
            "interaction_count": interaction_count,
            "emotional_trend": emotional_trend,
            "last_emotion": emotions[-1]["emotion"] if emotions else None,
            "last_intensity": emotions[-1]["intensity"] if emotions else None,
            "message_count": len(messages),
            "user_type": user_type,
            "first_interaction": user_memory.get("first_interaction"),
            "days_since_first": self._days_since(user_memory.get("first_interaction"))
        }
    
    def _days_since(self, timestamp: str) -> int:
        """Calculate days since timestamp"""
        try:
            from datetime import datetime
            if not timestamp:
                return 0
            past = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            now = datetime.now()
            return (now - past).days
        except:
            return 0

# Create global instance
memory_agent = MemoryAgent()

# Optional: Add a clear function for testing
def clear_memories_for_testing():
    """Call this to start fresh for testing"""
    memory_agent._clear_old_memories()

    # Add this at bottom of memory_agent.py temporarily
if __name__ == "__main__":
    memory_agent._clear_old_memories()