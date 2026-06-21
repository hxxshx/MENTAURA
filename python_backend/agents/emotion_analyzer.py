"""
Emotion Analysis Agent - Uses custom ML model
"""
from models.emotion_model import emotion_classifier

class EmotionAnalysisAgent:
    def __init__(self):
        print("🧠 Initializing Emotion Analysis Agent...")
        # Train or load model
        self.classifier = emotion_classifier
        self.classifier.train()  # Train on startup
        
    def analyze_emotion(self, text: str) -> dict:
        """Analyze emotion from text using ML model"""
        print(f"   Analyzing emotion for: '{text[:50]}...'")
        
        # Get prediction from ML model
        result = self.classifier.predict(text)
        
        print(f"   → Detected: {result['emotion']} ({result['intensity']}) "
              f"confidence: {result['confidence']:.2%}")
        
        return {
            "emotion": result["emotion"],
            "intensity": result["intensity"],
            "confidence": result["confidence"],
            "raw_text": text
        }
    
    def batch_analyze(self, texts: list) -> list:
        """Analyze multiple texts"""
        return [self.analyze_emotion(text) for text in texts]

# Create global instance
emotion_agent = EmotionAnalysisAgent()