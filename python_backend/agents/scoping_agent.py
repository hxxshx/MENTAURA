import re
from typing import Dict, Any, List

class ScopingAgent:
    """
    Agent responsible for input scoping.
    Determines if a message is relevant to mental wellness or if it's out of scope.
    """
    
    def __init__(self):
        # Structured scoping categories for better accuracy
        self.scope_definitions = {
            "mental_wellness": [
                'anxious', 'anxiety', 'sad', 'sadness', 'depressed', 'depression',
                'stress', 'stressed', 'lonely', 'loneliness', 'hopeless', 'worthless',
                'wellness', 'mental health', 'emotion', 'feeling', 'help', 'support',
                'suicide', 'die', 'kill myself', 'hurt', 'pain', 'struggle',
                'therapy', 'counseling', 'meditation', 'sleep', 'academic', 'exam',
                'family', 'friend', 'relationship', 'grief', 'trauma', 'panic',
                'motivation', 'burnt out', 'exhausted', 'worry', 'worried',
                'happy', 'joy', 'excited', 'good', 'bad', 'okay', 'fine', 'identity',
                'self-esteem', 'confidence', 'burnout', 'pressure', 'overwhelmed'
            ],
            "greetings_smalltalk": [
                'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
                'how are you', 'howdy', 'thanks', 'thank you', 'bye', 'goodbye',
                'morning', 'evening', 'night'
            ],
            "out_of_scope": {
                "patterns": [
                    r'weather', r'joke', r'math', r'calculator', r'calculate',
                    r'recipe', r'cook', r'game', r'play', r'news', r'politics',
                    r'stock', r'price', r'bitcoin', r'crypto', r'history',
                    r'who is', r'what is', r'where is', r'how to make',
                    r'how to build', r'coding', r'programming', r'science',
                    r'sports', r'football', r'cricket', r'movie', r'song'
                ],
                "question_triggers": ['what', 'where', 'when', 'who', 'how', 'why']
            }
        }

    def is_in_scope(self, message: str) -> bool:
        """
        Check if the message is within the mental wellness scope.
        """
        msg_lower = message.lower().strip()
        words = msg_lower.split()
        
        # 1. Immediate allowance for greetings and small talk
        if any(greet in msg_lower for greet in self.scope_definitions["greetings_smalltalk"]):
            return True
            
        # 2. Check for mental health keywords (highest priority)
        if any(keyword in msg_lower for keyword in self.scope_definitions["mental_wellness"]):
            return True
            
        # 3. Check for explicit out-of-scope patterns
        for pattern in self.scope_definitions["out_of_scope"]["patterns"]:
            if re.search(pattern, msg_lower):
                # If there's an out-of-scope pattern AND no mental health keywords, it's out
                return False
        
        # 4. Handle general questions
        # If it looks like a general question and has no mental health keywords
        if any(msg_lower.startswith(q) for q in self.scope_definitions["out_of_scope"]["question_triggers"]):
            return False

        # 5. Length-based heuristics for short messages
        if len(words) <= 2:
            # Allow common one-word responses
            if msg_lower in ['yes', 'no', 'maybe', 'sure', 'fine', 'ok', 'okay']:
                return True
            # If it's a short message not captured above, better to be safe and check
            return True

        # Default: If unsure, allow it to be processed by other agents
        return True

    def get_invalid_input_message(self) -> str:
        return "I am here to support you with your mental wellness, emotional well-being, and academic-related stress. Please ask me something related to these topics, and I'll be happy to help! For things like general knowledge, weather, or jokes, I might not be the best assistant."

# Create global instance
scoping_agent = ScopingAgent()
