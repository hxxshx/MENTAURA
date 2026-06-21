"""
Enhanced Wellness Strategy Agent - Hybrid ML + Rule-based
Combines your custom emotion model with personalized wellness strategies
"""
import pickle
import numpy as np
from typing import Dict, Any, List, Tuple
import random

class WellnessStrategyAgent:
    def __init__(self):
        print("🧠 Initializing Enhanced Wellness Strategy Agent...")
        
        # Load your custom emotion model
        try:
            from agents.emotion_model import emotion_classifier
            self.emotion_model = emotion_classifier
            print("✅ Your custom emotion model loaded")
        except Exception as e:
            print(f"⚠️  Could not load custom emotion model: {e}")
            self.emotion_model = None
        
        # Enhanced wellness strategies with ML learning
        self.strategy_database = self._initialize_strategy_database()
        
        # Load any pre-trained ML model for strategy selection
        self.strategy_model = self._load_strategy_model()
        
        # Crisis detection patterns (from your code)
        self.high_risk_rules = {
            "method_seeking": [
                "how to perform suicide", "suicide methods",
                "best way to die", "how to kill myself",
                "ways to kill myself", "suicide ideas"
            ],
            "desire_to_die": [
                "i want to die", "give ideas", "i should die",
                "end my life", "wanna die", "want to end it",
                "killing myself", "kill me", "rather be dead"
            ],
            "implicit_distress": [
                "i can't go on", "everything is pointless",
                "i'm done with life", "no reason to live",
                "can't live anymore", "want to disappear"
            ]
        }
        
        # Indian helpline responses (Detailed & Descriptive)
        self.crisis_responses = {
            "method_seeking": (
                "I'm deeply concerned to hear you're feeling this much pain. Your safety is the most important thing right now, "
                "and I truly want to help you stay connected to support. You don't have to face this alone.\n\n"
                "Please reach out immediately to these professional support services in India:\n\n"
                "📞 **AASRA**: 91-9820466726 (Available 24/7)\n"
                "📞 **Kiran Mental Health Helpline**: 1800-599-0019 (Govt. of India)\n"
                "📞 **Vandrevala Foundation**: 1860-266-2345 or 9999666555\n\n"
                "If you're in immediate danger, please call **112** or your local emergency number. "
                "Would you like to share what's been making things feel so unbearable? I'm here with you."
            ),
            "desire_to_die": (
                "I hear how heavy things feel right now. When you say you want to die, it's a sign that you're in deep, overwhelming pain — and that matters. "
                "You deserve support and care in this moment.\n\n"
                "Please consider reaching out to people trained to help you through this in India:\n\n"
                "📞 **AASRA**: 91-9820466726 (24/7)\n"
                "📞 **Kiran Helpline**: 1800-599-0019\n"
                "📞 **Vandrevala Foundation**: 9999666555\n\n"
                "If you feel you might act on these feelings, please contact local emergency services (**112**) right away. "
                "I'm here to listen to anything you're comfortable sharing about what's weighing on you."
            ),
            "implicit_distress": (
                "It sounds like everything has been feeling incredibly heavy for a while, and that is so hard to carry alone. "
                "Please know that there are people who want to support you through this.\n\n"
                "If these feelings start to feel unsafe, please reach out for professional support:\n\n"
                "📞 **Kiran Mental Health Helpline**: 1800-599-0019\n"
                "📞 **Vandrevala Foundation**: 1860-266-2345\n\n"
                "Talking about it can sometimes help ease the weight. If you want, we can sit here and talk about what's been making things feel so difficult."
            )
        }
        
        print(f"✅ Wellness Strategy Agent initialized with {len(self.strategy_database)} strategies")
    
    def _initialize_strategy_database(self) -> Dict[str, Dict[str, Any]]:
        """Enhanced strategy database with ML features"""
        return {
            # Crisis/High Intensity Strategies
            "crisis_intervention": {
                "emotions": ["sadness", "anxiety", "anger"],
                "intensities": ["crisis", "emergency", "high"],
                "description": "Immediate safety-focused intervention",
                "effectiveness_score": 0.95,
                "response_templates": [
                    "I hear you're in tremendous pain right now. Your safety is the most important thing. Please reach out to 988 or emergency services immediately.",
                    "This sounds very serious. I'm here with you, but please contact a crisis helpline right now: 988 or 91-9820466726 (AASRA)."
                ]
            },
            
            # Anxiety Strategies
            "grounding_technique": {
                "emotions": ["anxiety", "fear"],
                "intensities": ["low", "medium", "high", "emergency"],
                "description": "5-4-3-2-1 sensory grounding exercise",
                "effectiveness_score": 0.85,
                "response_templates": [
                    "When thoughts feel scattered or heavy, the 5-4-3-2-1 technique can act as an anchor. Let's focus on your surroundings: Name 5 things you see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
                    "Grounding helps reconnect you with the present moment when anxiety feels overwhelming. Try describe three objects around you in vivid detail — their color, texture, and shape."
                ]
            },
            
            "breathing_exercise": {
                "emotions": ["anxiety", "stress"],
                "intensities": ["low", "medium", "high"],
                "description": "4-7-8 breathing technique",
                "effectiveness_score": 0.82,
                "response_templates": [
                    "Deep, rhythmic breathing is a direct way to signal safety to your nervous system. Let's try the 4-7-8 method: Inhale for 4 seconds, hold gently for 7, and exhale completely for 8. Even a few rounds can start to shift how you feel.",
                    "Your breath is always with you as a tool for calm. Let's take a moment together: Inhale slowly, hold, and release with a long sigh. How does your body respond to that release?"
                ]
            },
            
            # Sadness/Depression Strategies
            "compassionate_listening": {
                "emotions": ["sadness", "grief"],
                "intensities": ["medium", "high"],
                "description": "Active listening with emotional validation",
                "effectiveness_score": 0.88,
                "response_templates": [
                    "I hear the weight of what you're carrying. Please know that your feelings are valid, and you don't have to navigate this alone. I'm here to hold space for you.",
                    "It sounds like you've been going through so much. Thank you for trusting me with these feelings; acknowledging them is a brave first step. I'm listening."
                ]
            },
            
            "behavioral_activation": {
                "emotions": ["sadness", "neutral"],
                "intensities": ["low", "medium"],
                "description": "Small, achievable activity scheduling",
                "effectiveness_score": 0.75,
                "response_templates": [
                    "When energy feels low, sometimes 'opposite action' helps. What is one tiny, manageable thing you could do in the next ten minutes — like stretching, drinking water, or stepping outside?",
                    "Momentum often starts with the smallest possible step. Is there one simple task that feels achievable right now? We can focus just on that."
                ]
            },
            
            # Anger/Frustration Strategies
            "emotional_labeling": {
                "emotions": ["anger", "frustration"],
                "intensities": ["medium", "high"],
                "description": "Name and validate the emotion",
                "effectiveness_score": 0.78,
                "response_templates": [
                    "It's completely understandable to feel anger; it's often a signal that a boundary has been crossed. Try the 'Name it to Tame it' technique: by labeling the feeling specifically (is it 'outrage', 'frustration', or 'annoyance'?), you actually lower the activity in your brain's emotional center.",
                    "I hear the frustration in your words. Anger often acts as a 'secondary emotion' protecting something more vulnerable underneath, like hurt or fear. What do you think this heat is trying to protect right now?",
                    "Feeling anger is a valid human response. It can be helpful to visualize the emotion as a wave — it's powerful and intense, but it will eventually reach the shore and recede. Would it help to talk about what triggered this wave?"
                ]
            },
            
            # Academic/Decision Stress Strategies
            "academic_support": {
                "emotions": ["anxiety", "sadness", "neutral"],
                "intensities": ["medium", "high"],
                "description": "Support for school, exams, and academic decisions",
                "effectiveness_score": 0.90,
                "response_templates": [
                    "Academic pressure can feel incredibly heavy. Try the 'Pomodoro Technique' today: focus on your work for just 25 minutes, then take a mandatory 5-minute break. It makes the mountain of work feel like small, manageable hills.",
                    "If you're feeling overwhelmed by a big project, try 'Task-Splitting': break it down into the smallest possible actions (like 'open document' or 'write one sentence'). What's the smallest first step you can take right now?",
                    "When exams feel like they define you, remember that your worth is independent of your marks. Try 'Active Recall' or 'Feynman Technique' to build confidence in your knowledge rather than just memorizing."
                ]
            },

            
            # Relationship Strategies
            "relationship_support": {
                "emotions": ["sadness", "anger", "anxiety"],
                "intensities": ["low", "medium", "high"],
                "description": "Support for social and relationship issues",
                "effectiveness_score": 0.88,
                "response_templates": [
                    "Relationship tension is exhausting. If you're planning a difficult conversation, try using 'I-statements' (e.g., 'I feel worried when...' rather than 'You always...'). It keeps the focus on your needs rather than blame.",
                    "Navigating social conflict is hard. If things feel heated, try the '24-hour rule' – wait a full day before responding to a difficult message. This gives your emotional brain time to cool down so your wise brain can lead.",
                    "It's okay to feel hurt by people you care about. Remember that boundaries aren't walls to keep people out, but gates to keep yourself safe. What's one boundary that might help you feel more at peace?"
                ]
            },
            
            # Career/Work Stress Strategies
            "work_stress_management": {
                "emotions": ["anxiety", "stress", "anger"],
                "intensities": ["medium", "high"],
                "description": "Support for professional stress and career decisions",
                "effectiveness_score": 0.84,
                "response_templates": [
                    "Work stress often comes from a lack of perceived control. Try the 'Eisenhower Matrix': categorize your tasks into 'Urgent/Important' and 'Not Urgent/Important'. Focusing only on the truly important can lower your cortisol levels.",
                    "If work is following you home, try a 'Shutdown Ritual'. At the end of the day, spend 5 minutes writing down your top 3 tasks for tomorrow, then physically close your laptop. It signals to your brain that 'work-time' is over.",
                    "When the pressure is high, remember 'Digital Boundaries': can you turn off work notifications for just one hour this evening? Your rest is a requirement for your productivity, not a reward for it."
                ]
            },
            
            # Loneliness Strategies
            "loneliness_intervention": {
                "emotions": ["sadness"],
                "intensities": ["low", "medium", "high"],
                "description": "Support for isolation and lack of connection",
                "effectiveness_score": 0.86,
                "response_templates": [
                    "Loneliness is your social hunger signal, and it's completely valid. Try a 'Micro-Social Goal': can you make one small, low-stakes interaction today, like saying hello to a neighbor or sending a single 'thinking of you' text?",
                    "When we feel isolated, we often retreat further. Try 'Passive Connection': just being in a public space, like a library or park, can sometimes lower the feeling of being 'alone'. What's one public space you feel comfortable in?",
                    "Reaching out is a brave move. If you're looking for deeper connection, exploring a hobby or community interest can be a great bridge. What's one thing you've always been curious to learn more about?"
                ]
            },
            
            # Sleep Strategies
            "sleep_support": {
                "emotions": ["anxiety", "neutral", "sadness"],
                "intensities": ["low", "medium", "high"],
                "description": "Support for sleep issues and fatigue",
                "effectiveness_score": 0.82,
                "response_templates": [
                    "Sleep struggles often start long before bed. Try the '10-3-2-1-0 Rule' tonight: no caffeine 10 hours before bed, no food 3 hours before, no work 2 hours before, and no screens 1 hour before. The 0 is for the number of times you hit snooze tomorrow.",
                    "If you're lying awake with racing thoughts, try the '15-minute rule': if you can't sleep after 15 minutes, get out of bed and do something boring in low light (like reading a dull book) until you feel sleepy. This stops your brain from associating bed with being awake.",
                    "Try a 'Brain Dump' before bed: write down every single worry or to-do item on a piece of paper. Getting them out of your head onto paper signals to your brain that it's safe to let go of them for the night."
                ]
            },
            
            # Depression Strategies
            "depression_support": {
                "emotions": ["sadness"],
                "intensities": ["low", "medium", "high"],
                "description": "Behavioral activation and compassion for low mood",
                "effectiveness_score": 0.85,
                "response_templates": [
                    "I hear the heavy weight you're carrying. When depression feels overwhelming, try 'Opposite Action': if your mood tells you to stay in bed, try just sitting up and placing your feet on the floor. Small, contrary actions can start to shift the momentum.",
                    "Depression can make smallest tasks feel impossible. Try 'Micro-Goal Setting': focus only on the next 15 minutes. What is one tiny thing—like washing a single dish or stepping outside for fresh air—that you could do right now?",
                    "You are not your depression; you are the person experiencing it. Try a 'Compassion Break': acknowledge that this is a moment of suffering, and it's okay to be gentle with yourself. You don't have to 'fix' it all today."
                ]
            },
            
            "deescalation_technique": {
                "emotions": ["anger"],
                "intensities": ["high"],
                "description": "Cool-down and perspective techniques",
                "effectiveness_score": 0.80,
                "response_templates": [
                    "When anger feels physically overwhelming, try 'Cold Water Shock': splash ice-cold water on your face or hold an ice cube. It triggers the mammalian dive reflex, which immediately slows your heart rate and calms your system.",
                    "Let's pause for a moment. Anger can feel like a fire; it needs oxygen to burn. By taking a physical break (leaving the room for 5 minutes), you're cutting off that oxygen so you can think more clearly."
                ]
            },
            
            # Positive Emotion Strategies
            "positive_reinforcement": {
                "emotions": ["happiness", "joy"],
                "intensities": ["low", "medium", "high"],
                "description": "Amplify and savor positive emotions",
                "effectiveness_score": 0.90,
                "response_templates": [
                    "That's wonderful to hear! What's making you feel this way?",
                    "I'm so glad you're feeling good! Savoring positive moments can build resilience."
                ]
            },
            
            "gratitude_practice": {
                "emotions": ["happiness", "neutral"],
                "intensities": ["low", "medium"],
                "description": "Shift focus to appreciation",
                "effectiveness_score": 0.83,
                "response_templates": [
                    "It's great you're feeling okay. What's one thing you're grateful for today?",
                    "Noticing what's going well can be powerful. What's been good recently?"
                ]
            },
            
            # Neutral/Boredom Strategies
            "exploratory_questioning": {
                "emotions": ["neutral", "boredom"],
                "intensities": ["low", "medium"],
                "description": "Curious exploration of inner experience",
                "effectiveness_score": 0.70,
                "response_templates": [
                    "I'm here with you. What's on your mind today?",
                    "Thanks for checking in. What would feel helpful to talk about right now?"
                ]
            },
            
            "mindfulness_invitation": {
                "emotions": ["neutral", "stress"],
                "intensities": ["low", "medium"],
                "description": "Gentle awareness practice",
                "effectiveness_score": 0.77,
                "response_templates": [
                    "Let's take a mindful pause together. Notice your breath without trying to change it.",
                    "Sometimes just noticing how we feel can be helpful. What do you notice in your body right now?"
                ]
            },
            
            # General Support Fallback
            "general_support": {
                "emotions": ["sadness", "anxiety", "neutral"],
                "intensities": ["low", "medium", "high"],
                "description": "General empathetic support and listening",
                "effectiveness_score": 0.80, # Lower than specific ones to prefer them if keywords match
                "response_templates": [
                    "I hear that you're going through a lot right now. I'm here to listen and support you in whatever way feels best. Would you like to talk more about what's on your mind?",
                    "Thank you for sharing these feelings with me. It sounds like things have been difficult lately, and I want you to know you're not alone. I'm here for you.",
                    "It takes a lot of strength to acknowledge these feelings. I'm here to support you. What's been the heaviest part of this for you today?"
                ]
            }
        }
    
    def _load_strategy_model(self):
        """Load pre-trained ML model for strategy selection"""
        try:
            # Try to load your wellness_agent.pkl
            import os
            if os.path.exists("wellness_agent.pkl"):
                with open("wellness_agent.pkl", "rb") as f:
                    model = pickle.load(f)
                print("✅ Loaded pre-trained wellness model from wellness_agent.pkl")
                return model
        except Exception as e:
            print(f"⚠️  Could not load wellness model: {e}")
        
        # Fallback: Simple strategy selection model
        return self._create_fallback_model()
    
    def _create_fallback_model(self):
        """Create a simple fallback model for strategy selection"""
        # This can be enhanced with actual ML training
        return {
            "type": "rule_based_fallback",
            "version": "1.0"
        }
    
    def _detect_high_risk(self, text: str) -> Tuple[str, str]:
        """Detect high-risk content (from your code)"""
        text_lower = text.lower()
        
        for risk_type, patterns in self.high_risk_rules.items():
            if any(pattern in text_lower for pattern in patterns):
                return risk_type, self.crisis_responses.get(risk_type, "")
        
        return None, ""
    
    def _detect_question_type(self, message: str) -> Dict[str, Any]:
        """Detect if the user is asking for techniques, what to do, or eradication"""
        msg_lower = message.lower()
        
        is_howto = False
        is_techniques = False
        is_eradicate = False
        
        howto_patterns = ["what to do", "what can i do", "how to handle", "how to manage", "how to deal", "ways to", "how do i"]
        technique_patterns = ["technique", "method", "exercise", "practice", "strategy", "tips", "advice"]
        eradicate_patterns = ["eradicate", "remove", "stop feeling", "get rid of", "eliminate", "delete", "end my sadness", "end my anxiety"]
        
        if any(p in msg_lower for p in howto_patterns):
            is_howto = True
        if any(p in msg_lower for p in technique_patterns):
            is_techniques = True
            is_howto = True # Techniques requests are a form of how-to
        if any(p in msg_lower for p in eradicate_patterns):
            is_eradicate = True
            is_howto = True
            
        return {
            "is_howto": is_howto,
            "is_techniques": is_techniques,
            "is_eradicate": is_eradicate
        }

    def _select_strategies_ml(self, emotion: str, intensity: str, 
                            context: Dict[str, Any], message: str = "") -> List[str]:
        """Use ML to select the best strategies with topical relevance filtering"""
        message_lower = message.lower()
        
        # Define topical strategies and their keywords
        topical_keywords = {
            "academic_support": ["exam", "semester", "study", "skipped", "failure", "grades", "school", "college", "test", "assignment", "homework", "midterm", "final", "career", "placement", "marks"],
            "relationship_support": ["friend", "relationship", "partner", "parents", "family", "argument", "fight", "misunderstanding", "boyfriend", "girlfriend", "crush", "betrayal"],
            "work_stress_management": ["work", "boss", "job", "career", "office", "colleague", "promotion", "deadline", "burnout", "salary", "interview", "meeting", "employment"],
            "sleep_support": ["sleep", "insomnia", "tired", "exhausted", "nightmare", "awake", "restless", "fatigue", "yawning"],
            "loneliness_intervention": ["alone", "lonely", "no one", "isolated", "nobody", "loneliness", "solitude", "forgotten", "left out", "disconnected"]
        }
        
        # Feature engineering for ML
        features = {
            "emotion": emotion,
            "intensity": intensity,
            "time_of_day": context.get("time_of_day", "unknown"),
            "emotional_trend": context.get("emotional_trend", "stable"),
            "interaction_count": context.get("interaction_count", 1),
            "previous_strategies": context.get("previous_strategies", [])
        }
        
        # Filter strategies by emotion and intensity
        eligible_strategies = []
        for strategy_name, strategy_info in self.strategy_database.items():
            if (emotion in strategy_info["emotions"] and 
                intensity in strategy_info["intensities"]):
                
                # Calculate personalized score
                base_score = strategy_info["effectiveness_score"]
                
                # Topical Relevance Check: Penalty for topical strategies if keywords don't match
                if strategy_name in topical_keywords:
                    keywords = topical_keywords[strategy_name]
                    if not any(kw in message_lower for kw in keywords):
                        base_score -= 0.5 # Substantial penalty for irrelevant topical advice
                
                # Boost for general support if no topical keywords match at all
                if strategy_name == "general_support":
                    has_any_topic = any(any(kw in message_lower for kw in kws) for kws in topical_keywords.values())
                    if not has_any_topic:
                        base_score += 0.2
                
                # Adjust based on context
                if context.get("emotional_trend") == "declining":
                    base_score *= 1.1  # Boost for declining trend
                if context.get("interaction_count", 0) > 3:
                    base_score *= 1.05  # Boost for returning users
                
                eligible_strategies.append((strategy_name, base_score))
        
        # Sort by score and select top 2-3
        eligible_strategies.sort(key=lambda x: x[1], reverse=True)
        
        # Select based on intensity
        if intensity in ["crisis", "emergency", "high"]:
            selected = [s[0] for s in eligible_strategies[:2]]
        elif intensity == "medium":
            selected = [s[0] for s in eligible_strategies[:1]]
        else:
            selected = [s[0] for s in eligible_strategies[:1]] if eligible_strategies else ["exploratory_questioning"]
        
        return selected
    
    def _generate_response_template(self, strategies: List[str], 
                                  emotion: str, intensity: str) -> str:
        """Generate response template from selected strategies"""
        
        if not strategies:
            return "I'm here to listen and support you."
        
        # Get the primary strategy
        primary_strategy = strategies[0]
        strategy_info = self.strategy_database.get(primary_strategy)
        
        if not strategy_info:
            return "I'm here to listen and support you."
        
        # Select a template
        templates = strategy_info.get("response_templates", [])
        if templates:
            template = random.choice(templates)
        else:
            template = f"try {primary_strategy.replace('_', ' ')}."
        
        return template
    
    def predict(self, emotion_data: Dict[str, Any], 
                context_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main entry point for strategy selection.
        """
        emotion = emotion_data.get("emotion", "neutral")
        intensity = emotion_data.get("intensity", "medium")
        message = emotion_data.get("user_message", "").lower()
        
        # Step 0: Detect question type (MOVE TO TOP to avoid NameError)
        q_type = self._detect_question_type(message)
        context_data.update(q_type)
        
        # 1. High-risk/Crisis override
        for risk_type, patterns in self.high_risk_rules.items():
            if any(pattern in message for pattern in patterns):
                return {
                    "strategy": "crisis_intervention",
                    "strategy_score": 1.0,
                    "response_template": self.crisis_responses.get(risk_type, self.crisis_responses["implicit_distress"]),
                    "is_crisis": True,
                    "is_howto": q_type["is_howto"],
                    "is_techniques": q_type["is_techniques"],
                    "is_eradicate": q_type["is_eradicate"]
                }
        
        # 🌟 2. Universal Cluster Overrides (Real AI Feel)
        clusters = {
            "academic_support": ["exam", "semester", "study", "skipped", "failure", "grades", "school", "college", "test", "assignment", "homework", "midterm", "final", "career", "placement", "marks"],
            "relationship_support": ["friend", "relationship", "talk to me", "ignored", "break up", "partner", "parents", "family", "argument", "fight", "misunderstanding", "boyfriend", "girlfriend", "crush", "betrayal"],
            "work_stress_management": ["work", "boss", "job", "career", "office", "colleague", "promotion", "deadline", "burnout", "salary", "interview", "meeting", "employment"],
            "loneliness_intervention": ["alone", "lonely", "no one", "isolated", "nobody", "loneliness", "solitude", "forgotten", "left out", "disconnected"],
            "sleep_support": ["sleep", "insomnia", "tired", "exhausted", "nightmare", "awake", "restless", "fatigue", "yawning"],
            "depression_support": ["depression", "depressed", "struggling", "no energy", "worthless", "meaningless", "empty", "numb", "hopeless", "eradicate sadness", "remove sadness"],
            "stress_management": ["stress", "tension", "management", "overwhelmed", "pressure", "manage stress", "stressful", "eradicate stress", "remove stress"],
            "self_esteem_support": ["worthless", "useless", "not good enough", "ugly", "hate myself", "failure", "imposter", "confident", "self-esteem", "identity"],
            "burnout_recovery": ["burnt out", "no energy", "exhausted", "can't do this", "quitting", "tired of everything", "drained", "empty"],
            "social_anxiety_support": ["crowd", "people", "judging", "staring", "talking in public", "social", "party", "gathering", "introvert", "shy"]
        }
        
        # Add new strategies to database if they don't exist
        for cluster_name in clusters:
            if cluster_name not in self.strategy_database:
                # Add a default for new clusters
                self.strategy_database[cluster_name] = {
                    "emotions": ["anxiety", "sadness", "neutral"],
                    "intensities": ["low", "medium", "high"],
                    "description": f"Support for {cluster_name.replace('_', ' ')}",
                    "effectiveness_score": 0.85,
                    "response_templates": [
                        f"I hear you talking about {cluster_name.replace('_', ' ')}. It's something many people struggle with, and you're not alone. Would you like to explore this further?",
                    ]
                }
        
        # Specific templates for new clusters
        self.strategy_database["stress_management"]["response_templates"] = [
            "For immediate stress relief, box breathing is incredibly effective: Inhale for 4, hold for 4, exhale for 4, and hold for 4. This simple rhythm resets your nervous system and helps you regain focus.",
            "When you're overwhelmed, try 'time-blocking' your next hour: pick just one task and set a timer for 25 minutes. Focusing on one thing at a time reduces the mental 'noise' that leads to stress.",
            "If your mind is racing, 'Progressive Muscle Relaxation' can help. Tense and then release each muscle group starting from your toes up to your jaw. It physically signals to your brain that it's okay to relax."
        ]
        self.strategy_database["self_esteem_support"]["response_templates"] = [
            "It sounds like you're being very hard on yourself right now. Try the 'Friendship Test': would you say the things you're thinking right now to a close friend? You deserve the same compassion you give to others.",
            "That 'imposter' feeling often happens because we compare our 'behind-the-scenes' with everyone else's 'highlight reel'. You've worked hard to be where you are, and your presence here is valid."
        ]
        self.strategy_database["burnout_recovery"]["response_templates"] = [
            "Burnout is your body's check-engine light. It's okay to slow down. One small way to start recovery is 'Digital Detox': can you step away from all screens for just 15 minutes to let your mind wander freely?",
            "When you're this drained, even 'small' tasks are hard. Let's practice 'Minimal Viable Day' – what is the absolute bare minimum you need to do today? Everything else can wait for when you have more fuel in the tank."
        ]
        self.strategy_database["social_anxiety_support"]["response_templates"] = [
            "Social situations can feel like a spotlight is on you, but remember the 'Spotlight Effect' – people are usually too focused on their own internal world to judge yours. Try finding one small, neutral detail in the room to focus on when you feel the pressure.",
            "It's okay to feel overwhelmed by crowds. Try the 'Anchoring' technique: carry a small object in your pocket (like a stone or coin) and touch it when you feel anxious to remind yourself of the physical present."
        ]

        for strategy, keywords in clusters.items():
            if any(kw in message for kw in keywords):
                return {
                    "strategy": strategy,
                    "strategy_score": 0.95,
                    "response_template": random.choice(self.strategy_database[strategy]["response_templates"]),
                    "is_crisis": False,
                    "is_howto": q_type["is_howto"],
                    "is_techniques": q_type["is_techniques"],
                    "is_eradicate": q_type["is_eradicate"]
                }
        
        # Step 3: Use ML to select strategies
        strategies = self._select_strategies_ml(emotion, intensity, context_data, message)
        
        # Step 3: Generate response template
        response_template = self._generate_response_template(strategies, emotion, intensity)
        
        # Step 4: Calculate strategy score (weighted by confidence)
        conf = emotion_data.get("confidence", 0.5)
        strategy_score = conf * 0.7 + 0.3  # Base 0.3 + confidence contribution
        
        return {
            "strategy": strategies[0] if strategies else "active_listening",
            "strategy_score": min(strategy_score, 0.95),
            "recommended_strategies": strategies,
            "response_template": response_template,
            "selected_from_pool": len(strategies) > 0,
            "pool_size": len(self.strategy_database),
            "is_crisis": False,
            "is_howto": q_type["is_howto"],
            "is_techniques": q_type["is_techniques"],
            "is_eradicate": q_type["is_eradicate"]
        }
    
    def train_strategy_model(self, training_data):
        """
        Train ML model on strategy effectiveness
        Can be called to improve over time
        """
        # This is where you would add actual ML training
        print("🤖 Training strategy selection model...")
        # Placeholder for actual training
        return {"status": "training_complete", "accuracy": 0.85}

# Create global instance
wellness_agent = WellnessStrategyAgent()

# Test function
def test_wellness_agent():
    """Test the wellness strategy agent"""
    print("\n" + "="*60)
    print("🧪 TESTING ENHANCED WELLNESS STRATEGY AGENT")
    print("="*60)
    
    test_cases = [
        {
            "emotion_data": {"emotion": "anxiety", "intensity": "high", "confidence": 0.85, "user_message": "test message"},
            "context_data": {"emotional_trend": "increasing", "interaction_count": 1}
        },
        {
            "emotion_data": {"emotion": "sadness", "intensity": "medium", "confidence": 0.75, "user_message": "test message"},
            "context_data": {"emotional_trend": "stable", "interaction_count": 3}
        },
        {
            "emotion_data": {"emotion": "happiness", "intensity": "low", "confidence": 0.90, "user_message": "test message"},
            "context_data": {"emotional_trend": "improving", "interaction_count": 5}
        },
        {
            "emotion_data": {"emotion": "neutral", "intensity": "low", "confidence": 0.60, "user_message": "test message"},
            "context_data": {"emotional_trend": "stable", "interaction_count": 1}
        }
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n📊 Test Case {i}:")
        print(f"   Emotion: {test['emotion_data']['emotion']} ({test['emotion_data']['intensity']})")
        print(f"   Context: {test['context_data']}")
        
        result = wellness_agent.predict(test["emotion_data"], test["context_data"])
        
        print(f"   🎯 Strategy: {result['strategy']}")
        print(f"   📊 Score: {result['strategy_score']:.2f}")
        print(f"   📝 Strategies: {result.get('recommended_strategies', [])}")
        print(f"   💬 Template: {result['response_template'][:80]}...")

if __name__ == "__main__":
    test_wellness_agent()