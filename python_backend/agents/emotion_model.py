"""
Custom Emotion Analysis ML Model
TF-IDF + Logistic Regression for emotion classification
YOUR ORIGINAL CUSTOM MODEL
"""
import pickle
import numpy as np
from typing import Dict, Any, List, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

class EmotionClassifier:
    """Custom ML model for emotion classification - LOGISTIC REGRESSION + TF-IDF"""
    
    def __init__(self):
        self.model = None
        self.emotions = ['sadness', 'anxiety', 'anger', 'happiness', 'neutral']
        self.intensity_levels = ['low', 'medium', 'high', 'crisis', 'emergency']
        self.is_trained = False
        
    def preprocess_text(self, text: str) -> str:
        """Clean and preprocess text"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize and remove stopwords
        try:
            tokens = word_tokenize(text)
            stop_words = set(stopwords.words('english'))
            tokens = [word for word in tokens if word not in stop_words]
            text = ' '.join(tokens)
        except:
            # Fallback simple tokenization
            pass
            
        return text
    
    def create_model(self):
        """Create the ML pipeline - LOGISTIC REGRESSION + TF-IDF"""
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(
                max_features=5000,
                ngram_range=(1, 3),  # Increased to capture phrases
                preprocessor=self.preprocess_text
            )),
            ('clf', LogisticRegression(
                max_iter=2000,  # Increased iterations
                random_state=42,
                class_weight='balanced',
                C=0.5  # Regularization
            ))
        ])
    
    def generate_training_data(self):
        """
        Generate training data with EXPANDED keywords and crisis phrases
        """
        # Emotion keywords mapping - EXPANDED with crisis/stress words
        emotion_keywords = {
            'sadness': [
                # Basic sadness
                'sad', 'depressed', 'unhappy', 'cry', 'tears', 'hopeless', 
                'lonely', 'miserable', 'grief', 'heartbroken', 'empty',
                'worthless', 'useless', 'hopeless', 'blue', 'dejected',
                
                # Student/Academic specific sadness
                'failed my exam', 'didnt get the grade', 'exam result was bad',
                'rejected from internship', 'placement went poorly',
                'failing my semester', 'cant keep with my studies',
                'imposter syndrome', 'dont belong here', 'not smart enough',
                
                # Suicide/crisis phrases
                'want to die', 'kill myself', 'end my life', 'suicide',
                'no reason to live', 'end it all', 'can\'t live anymore',
                'rather be dead', 'want to disappear', 'life is pointless',
                'nothing matters', 'no hope left', 'can\'t take it anymore',
                
                # Strong depression
                'deeply depressed', 'severely sad', 'extremely unhappy',
                'crying all day', 'never felt worse', 'total despair',
                
                # Variations
                'feel sad', 'feeling sad', 'very sad', 'so sad', 
                'extremely sad', 'really sad', 'quite sad', 'pretty sad',

                # Added: Depression and Mental Health Struggles
                'depressed mood', 'loss of interest', 'fatigue', 'insomnia', 'hypersomnia',
                'feelings of worthlessness', 'guilt', 'difficulty concentrating', 'indecisiveness',
                'thoughts of death', 'suicidal ideation', 'self-harm', 'cutting', 'hurting myself',
                'empty inside', 'numb', 'can\'t feel anything', 'lost hope', 'giving up',
                'mental health struggles', 'struggling with depression', 'my mental health is bad',
                'need therapy', 'need help for depression', 'seeing a therapist',
                'medication for depression', 'antidepressants', 'psychiatrist',
                'can\'t get out of bed', 'lack of motivation', 'no energy', 'isolating myself',
                'withdrawing from friends', 'social isolation', 'feeling alone', 'alone in this',
                'dark thoughts', 'negative thoughts', 'overthinking', 'ruminating',
                'constant sadness', 'persistent low mood', 'chronic depression',
                'major depressive disorder', 'clinical depression', 'bipolar depression',
                'seasonal affective disorder', 'postpartum depression',
                'struggling to cope', 'can\'t cope anymore', 'overwhelmed by sadness',
                'heavy heart', 'broken spirit', 'shattered', 'crushed', 'devastated',
                'pointless existence', 'meaningless life', 'what\'s the point',
                'tired of fighting', 'giving up on life', 'ready to quit',
                'no future', 'bleak outlook', 'despair', 'anguish', 'torment',
                'suffering', 'pain inside', 'emotional pain', 'hurting',
                'can\'t stop crying', 'crying spells', 'burst into tears',
                'loss of appetite', 'overeating', 'weight loss', 'weight gain',
                'sleep problems', 'waking up early', 'difficulty falling asleep',
                'agitation', 'restlessness', 'slowed movements',
                'lack of pleasure', 'anhedonia', 'nothing brings me joy',
                'feeling trapped', 'stuck', 'no way out', 'cornered',
                'burden to others', 'guilty for being sad', 'ashamed of my feelings',
                'hiding my sadness', 'pretending to be okay', 'wearing a mask',
                'exhausted', 'drained', 'worn out', 'burnt out',
                'can\'t focus', 'brain fog', 'memory problems',
                'self-critical', 'self-blame', 'hating myself', 'disgusted with myself',
                'feeling numb', 'emotionally numb', 'dead inside',
                'lost myself', 'don\'t know who I am anymore', 'identity crisis',
                'existential crisis', 'questioning everything',
                'feeling disconnected', 'detached', 'alienated',
                'no one understands', 'alone in my struggle', 'isolated',
                'wish I wasn\'t here', 'wish I hadn\'t been born',
                'just want it to end', 'want peace', 'want relief',
                'can\'t escape this feeling', 'trapped in my mind',
                'darkness', 'shadows', 'gloom', 'desolate',
                'broken', 'shattered', 'damaged', 'ruined',
                'unfixable', 'beyond repair', 'too far gone',
                'a heavy weight', 'a dark cloud', 'a deep hole',
                'drowning', 'sinking', 'suffocating',
                'can\'t see the light', 'no light at the end of the tunnel',
                'lost my way', 'adrift', 'wandering',
                'empty shell', 'hollow', 'void',
                'a constant battle', 'fighting myself', 'inner turmoil',
                'struggling daily', 'every day is a fight',
                'just want to disappear', 'fade away', 'vanish',
                'no energy to live', 'too tired to exist',
            ],
            'anxiety': [
                # Basic anxiety
                'anxious', 'worried', 'nervous', 'stressed', 'overwhelmed', 
                'panic', 'fear', 'scared', 'tense', 'restless', 'afraid',
                'apprehensive', 'jittery', 'unsettled',
                
                # Stress Management specific
                'stress management', 'manage my stress', 'need to relax',
                'too much pressure', 'feeling the tension', 'stress relief',
                'how to handle stress', 'stressing out',
                
                # Academic/Career anxiety
                'exam stress', 'finals are coming', 'so much to study',
                'deadline is tomorrow', 'presentation tomorrow', 'public speaking',
                'job interview tomorrow', 'career anxiety', 'future is scary',
                'placements are starting', 'unprepared for exams',
                
                # Crisis/emergency anxiety
                'panic attack', 'anxiety attack', 'mental breakdown',
                'can\'t breathe', 'heart racing', 'going to faint',
                'losing control', 'terrified', 'petrified', 'horrified',
                'emergency help', 'urgent help', 'immediate help',
                
                # Extreme stress
                'extremely stressed', 'severely anxious', 'overwhelming fear',
                'constant worry', 'neverending anxiety', 'can\'t function',
                
                # Variations
                'feel anxious', 'feeling anxious', 'very anxious', 
                'so anxious', 'extremely anxious', 'really anxious',
            ],
            'anger': [
                # Basic anger
                'angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated',
                'rage', 'resentful', 'bitter', 'hostile', 'hate', 'pissed',
                
                # Contextual anger
                'unfair grading', 'professor was mean', 'friends ignored me',
                'group project issues', 'lazy teammates', 'argument with parents',
                'fights with friends', 'feeling betrayed',
                
                # Extreme anger
                'blind rage', 'uncontrollable anger', 'violent thoughts',
                'want to scream', 'blood boiling', 'seeing red',
                'can\'t control anger', 'explosive anger', 'rage attack',
                
                # Variations
                'feel angry', 'feeling angry', 'very angry', 'so angry',
                'extremely angry', 'really angry',
            ],
            'happiness': [
                # Basic happiness
                'happy', 'joy', 'excited', 'glad', 'pleased', 'delighted',
                'content', 'cheerful', 'optimistic', 'grateful', 'elated',
                'proud', 'accomplished', 'satisfied',
                
                # Student achievement
                'aced my exam', 'got the internship', 'placement success',
                'finished my project', 'good grades', 'made a new friend',
                'understood the topic', 'graduation', 'passed my finals',
                
                # Extreme happiness
                'overjoyed', 'ecstatic', 'thrilled', 'blissful', 'jubilant',
                'euphoric', 'on cloud nine', 'over the moon', 'walking on air',
                
                # Variations
                'feel happy', 'feeling happy', 'very happy', 'so happy',
                'extremely happy', 'really happy',
            ],
            'neutral': [
                # Neutral states
                'okay', 'fine', 'alright', 'normal', 'regular', 'usual',
                'typical', 'standard', 'average', 'moderate', 'steady',
                
                # Conversation fillers/simple answers
                'yes', 'no', 'maybe', 'not sure', 'i guess', 'its fine',
                'nothing much', 'just chilling', 'studying', 'at the library',
                'working on stuff', 'going to class',
                
                # Variations
                'feel okay', 'feeling okay', 'doing okay', 'pretty okay',
                'nothing special', 'same as usual', 'could be worse', 'hanging in there',
            ]
        }
        
        # Generate training samples
        texts = []
        labels = []
        
        for emotion, keywords in emotion_keywords.items():
            for keyword in keywords:
                # Create natural sentence patterns with intensity variations
                patterns = []
                
                # For crisis/stress words, add more intense patterns
                if any(crisis_word in keyword for crisis_word in 
                      ['die', 'suicide', 'kill', 'panic', 'attack', 'emergency', 'urgent']):
                    patterns = [
                        f"I want to {keyword}",
                        f"I need to {keyword}",
                        f"Thinking about {keyword}",
                        f"Can't stop thinking about {keyword}",
                        f"Seriously considering {keyword}",
                        f"Planning to {keyword}",
                        f"{keyword.capitalize()} is my only option",
                        f"I have to {keyword}",
                    ]
                else:
                    patterns = [
                        f"I feel {keyword}",
                        f"I am {keyword}",
                        f"I'm {keyword}",
                        f"Feeling {keyword} today",
                        f"Really {keyword} right now",
                        f"So {keyword} lately",
                        f"Extremely {keyword}",
                        f"Very {keyword}",
                        f"Quite {keyword}",
                        f"Pretty {keyword}",
                        f"Kind of {keyword}",
                        f"A bit {keyword}",
                        f"Always {keyword}",
                        f"Never been so {keyword}",
                        f"Honestly {keyword}",
                        f"Truthfully {keyword}",
                        f"To be honest, {keyword}",
                        f"Lately I've been {keyword}"
                    ]
                
                texts.extend(patterns)
                labels.extend([emotion] * len(patterns))
        
        return texts, labels
    
    def train(self):
        """Train the model with LOGISTIC REGRESSION + TF-IDF"""
        print("🧠 Training Emotion Analysis Model with LOGISTIC REGRESSION + TF-IDF...")
        
        # Create model
        self.create_model()
        
        # Generate training data
        texts, labels = self.generate_training_data()
        
        print(f"📊 Generated {len(texts)} training samples")
        print(f"📈 Class distribution: {np.unique(labels, return_counts=True)}")
        
        # Train the model
        print("🤖 Training classifier...")
        self.model.fit(texts, labels)
        self.is_trained = True
        
        # Test accuracy
        accuracy = self.model.score(texts, labels)
        print(f"✅ Model trained with accuracy: {accuracy:.2%}")
        
        return accuracy
    
    def predict(self, text: str) -> Dict[str, Any]:
        """Predict emotion and intensity from text"""
        if not self.is_trained:
            self.train()
        
        # Predict emotion
        emotion = self.model.predict([text])[0]
        
        # Get prediction probabilities
        probs = self.model.predict_proba([text])[0]
        confidence = max(probs)
        
        # Determine intensity with CRISIS PRIORITY
        intensity = self._determine_intensity(text, confidence, emotion, probs)
        
        return {
            "emotion": emotion,
            "intensity": intensity,
            "confidence": float(confidence),
            "probabilities": {self.emotions[i]: float(probs[i]) for i in range(len(self.emotions))}
        }
    
    def _determine_intensity(self, text: str, confidence: float, 
                           emotion: str, probabilities: np.ndarray) -> str:
        """Determine intensity with STRONG crisis/stress detection"""
        text_lower = text.lower()
        
        # ========== 🚨 CRISIS DETECTION (HIGHEST PRIORITY) ==========
        crisis_phrases = [
            'kill myself', 'want to die', 'wanna die', 'end my life', 'commit suicide',
            'end it all', 'can\'t live', 'rather be dead', 'no reason to live',
            'suicide', 'take my life', 'end myself', 'kill me', 'wanna end it',
            'want to end it', 'killing myself', 'killing me'
        ]
        
        for phrase in crisis_phrases:
            if phrase in text_lower:
                return 'crisis'  # Highest intensity
        
        # ========== 🆘 EMERGENCY DETECTION ==========
        emergency_phrases = [
            'help me', 'emergency', 'urgent help', 'need help now',
            'immediately', 'right now', 'can\'t take it', 'going to hurt',
            'panic attack', 'anxiety attack', 'mental breakdown',
            'can\'t breathe', 'heart attack', 'going crazy', 'suffocating',
            'please help', 'save me', 'urgent'
        ]
        
        for phrase in emergency_phrases:
            if phrase in text_lower:
                return 'emergency'
        
        # ========== EXTREME STRESS DETECTION ==========
        extreme_words = [
            'extremely', 'incredibly', 'unbearably', 'uncontrollably',
            'severely', 'terribly', 'horribly', 'desperately'
        ]
        
        extreme_emotion_words = {
            'sadness': ['devastated', 'heartbroken', 'miserable', 'hopeless'],
            'anxiety': ['terrified', 'petrified', 'panicked', 'overwhelmed'],
            'anger': ['furious', 'enraged', 'infuriated', 'outraged'],
            'happiness': ['ecstatic', 'overjoyed', 'thrilled', 'euphoric']
        }
        
        # Check for extreme words + emotion words
        for extreme_word in extreme_words:
            if extreme_word in text_lower:
                for emotion_type, words in extreme_emotion_words.items():
                    for word in words:
                        if word in text_lower and emotion == emotion_type:
                            return 'high'
        
        # ========== CONFIDENCE-BASED INTENSITY ==========
        if confidence > 0.85:
            return 'high'
        elif confidence > 0.65:
            # Check for strong modifiers
            strong_modifiers = ['very', 'really', 'so', 'quite', 'pretty']
            if any(modifier in text_lower for modifier in strong_modifiers):
                return 'high'
            return 'medium'
        elif confidence > 0.45:
            return 'medium'
        elif confidence > 0.3:
            # Check for weak modifiers
            weak_modifiers = ['a bit', 'slightly', 'kind of', 'sort of', 'a little']
            if any(modifier in text_lower for modifier in weak_modifiers):
                return 'low'
            return 'medium'
        else:
            return 'low'
    
    def _simple_get_keywords(self, text: str, n: int = 3) -> List[str]:
        """Simple fallback keyword extraction with aggressive filtering"""
        ignore = {
            "i", "me", "my", "feel", "feeling", "am", "is", "a", "an", "the", "like", "it", "so", "very", "want", "to", 
            "since", "even", "just", "really", "could", "would", "should", "been", "was", "were", "have", "had", 
            "about", "with", "this", "that", "there", "their", "they", "some", "someone", "something", "sometimes",
            "feeling", "really", "anxious", "sad", "angry", "happy"
        }
        words = text.lower().split()
        return [w.strip('?!.,') for w in words if w not in ignore and len(w) > 3][:n]

    def get_top_keywords(self, text: str, n: int = 3) -> List[str]:
        """
        Extract the most significant keywords from text using the trained TF-IDF model.
        This provides a 'Real AI' understanding of what the user is talking about.
        """
        if not self.is_trained or self.model is None:
            # Fallback to simple filtering if model isn't ready
            ignore = {
                "i", "me", "my", "feel", "feeling", "am", "is", "a", "an", "the", "like", "it", "so", "very", "want", "to", 
                "since", "even", "just", "really", "could", "would", "should", "been", "was", "were", "have", "had", 
                "about", "with", "this", "that", "there", "their", "they", "some", "someone", "something", "sometimes"
            }
            words = text.lower().split()
            return [w.strip('?!.,') for w in words if w not in ignore and len(w) > 3][:n]
            
        try:
            tfidf = self.model.named_steps['tfidf']
            feature_names = tfidf.get_feature_names_out()
            
            # Transform the single text
            transformed = tfidf.transform([text])
            
            # Get scores for this text
            scores = transformed.toarray()[0]
            
            # Get top indices
            top_indices = scores.argsort()[-10:][::-1] # Get more to filter
            
            ignore = {
                "i", "me", "my", "feel", "feeling", "am", "is", "a", "an", "the", "like", "it", "so", "very", "want", "to", 
                "since", "even", "just", "really", "could", "would", "should", "been", "was", "were", "have", "had", 
                "about", "with", "this", "that", "there", "their", "they", "some", "someone", "something", "sometimes",
                "im", "ive", "id", "ill", "dont", "cant", "youre", "hes", "shes", "theyre", "well",
                "feeling really", "really anxious", "feeling anxious", "really sad", "feeling sad",
                "need", "needed", "please", "kindly", "want", "wanted", "give", "tell", "show", "help",
                "management", "technique", "techniques", "method", "methods", "strategy", "strategies",
                "support", "advice", "suggestion", "suggestions", "information"
            }
            
            # Get keywords with non-zero scores and NOT in ignore list
            keywords = []
            for i in top_indices:
                if scores[i] > 0:
                    word = feature_names[i]
                    if word not in ignore and len(word) > 2:
                        keywords.append(word)
                        if len(keywords) >= n:
                            break
            
            # If no TF-IDF hits, fallback to simple words
            if not keywords:
                return self._simple_get_keywords(text, n)
                
            return keywords
        except Exception as e:
            print(f"   ⚠️ Keyword extraction error: {e}")
            return []

    def save_model(self, filepath: str = "emotion_model.pkl"):
        """Save trained model to file"""
        with open(filepath, 'wb') as f:
            pickle.dump(self.model, f)
        print(f"💾 Model saved to {filepath}")
    
    def load_model(self, filepath: str = "emotion_model.pkl"):
        """Load trained model from file"""
        with open(filepath, 'rb') as f:
            self.model = pickle.load(f)
        self.is_trained = True
        print(f"📂 Model loaded from {filepath}")

# Create global instance
emotion_classifier = EmotionClassifier()

# Force training with improved data on first run
if __name__ == "__main__":
    print("🧪 Testing LOGISTIC REGRESSION Emotion Model...")
    
    # Train with expanded data
    accuracy = emotion_classifier.train()
    
    # Test critical cases
    test_cases = [
        ("I want to kill myself", "CRISIS sadness"),
        ("I'm having a panic attack", "EMERGENCY anxiety"),
        ("I feel extremely elated today", "HIGH happiness"),
        ("I'm a bit sad", "LOW sadness"),
        ("I'm so angry I could scream", "HIGH anger"),
        ("Help me it's urgent", "EMERGENCY anxiety"),
        ("I'm feeling okay", "MEDIUM neutral"),
    ]
    
    print("\n" + "="*60)
    print("🧪 TESTING CRITICAL CASES:")
    print("="*60)
    
    for text, expected in test_cases:
        result = emotion_classifier.predict(text)
        print(f"\n📝 Text: '{text}'")
        print(f"🎯 Expected: {expected}")
        print(f"✅ Got: {result['emotion']} ({result['intensity']})")
        print(f"📊 Confidence: {result['confidence']:.2f}")
        
        # Show probabilities
        print("📈 Probabilities:")
        for emotion, prob in result['probabilities'].items():
            if prob > 0.1:
                print(f"  - {emotion}: {prob:.3f}")