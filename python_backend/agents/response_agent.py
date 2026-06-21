"""
Agent 5: Response Generation Agent
Transforms wellness strategies into empathetic, user-friendly communication
"""
import random
from typing import Dict, Any, List
from datetime import datetime

class ResponseGenerationAgent:
    def __init__(self):
        print("💬 Initializing Response Generation Agent...")
        
        # Tone profiles for different emotional states
        self.tone_profiles = {
            "crisis": {
                "style": "calm_urgent_compassionate",
                "pace": "slow_deliberate",
                "warmth": "high",
                "formality": "medium",
                "key_phrases": [
                    "I hear the pain in your words",
                    "Your safety is most important",
                    "Let's get you connected with support"
                ]
            },
            "emergency": {
                "style": "calm_clear_compassionate",
                "pace": "moderate",
                "warmth": "high",
                "formality": "medium",
                "key_phrases": [
                    "I sense this is urgent",
                    "You're not alone in this",
                    "Help is available right now"
                ]
            },
            "high_anxiety": {
                "style": "calm_reassuring_grounding",
                "pace": "slow",
                "warmth": "medium_high",
                "formality": "low",
                "key_phrases": [
                    "Let's slow things down together",
                    "One breath at a time",
                    "You're safe here"
                ]
            },
            "high_sadness": {
                "style": "gentle_compassionate_validating",
                "pace": "very_slow",
                "warmth": "very_high",
                "formality": "low",
                "key_phrases": [
                    "That sounds really heavy",
                    "Thank you for sharing this with me",
                    "You don't have to carry this alone"
                ]
            },
            "high_anger": {
                "style": "neutral_validating_deescalating",
                "pace": "moderate",
                "warmth": "medium",
                "formality": "medium",
                "key_phrases": [
                    "It makes sense you'd feel that way",
                    "Anger often points to something important",
                    "Let's explore what's underneath"
                ]
            },
            "positive": {
                "style": "warm_celebratory_engaging",
                "pace": "moderate",
                "warmth": "high",
                "formality": "low",
                "key_phrases": [
                    "That's wonderful to hear!",
                    "I'm genuinely happy for you",
                    "What's contributing to this good feeling?"
                ]
            },
            "neutral": {
                "style": "calm_supportive_curious",
                "pace": "moderate",
                "warmth": "medium",
                "formality": "low",
                "key_phrases": [
                    "I'm here with you",
                    "What's on your mind today?",
                    "Thanks for checking in"
                ]
            }
        }
        
        # Strategy-specific response templates
        self.strategy_templates = self._initialize_templates()
        
        # Personalization database
        self.personalization_phrases = {
            "new_user": [
                "Welcome, I'm here for you",
                "Thank you for reaching out",
                "This is a safe space to share"
            ]
        }
        
        print("✅ Response Generation Agent initialized")
    
    def _initialize_templates(self) -> Dict[str, List[str]]:
        """Initialize response templates for each wellness strategy"""
        return {
            # Crisis/Emergency strategies
            "crisis_intervention": [
                "🚨 I hear the immense pain in your words. Your safety is the absolute priority right now. Please reach out immediately to: 988 Suicide & Crisis Lifeline or AASRA: 91-9820466726. You matter, and help is available right now.",
                "🚨 This sounds extremely serious. I'm here with you, but please contact emergency support immediately. You don't have to face this alone. Help is available 24/7 at Kiran Helpline: 1800-599-0019.",
                "🚨 I'm deeply concerned about what you've shared. Your life has value, and there are people trained to help you through this. Please call for support right now."
            ],
            
            # Anxiety strategies
            "grounding_technique": [
                "When thoughts feel overwhelming, grounding can help. Let's try this together: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. What's the first thing you notice?",
                "Anxiety can make the world feel shaky. Let's anchor ourselves. Feel your feet on the floor. Notice your breath. What's one thing you can see in detail right now?",
                "Racing thoughts can be exhausting. Try this grounding exercise with me: Describe what you're experiencing through your senses, starting with what you can see."
            ],
            
            "breathing_exercise": [
                "Let's breathe together. Inhale slowly for 4 seconds... hold for 7... exhale completely for 8. Repeat this 4 times with me. Notice how your body responds.",
                "Your breath can be an anchor in stormy thoughts. Try: 4 seconds in, 7 hold, 8 out. We'll do this together. Ready? Inhale... 1... 2... 3... 4...",
                "When anxiety peaks, breathing helps regulate your nervous system. Let's try the 4-7-8 technique. I'll guide you through it step by step."
            ],
            
            # Sadness strategies
            "compassionate_listening": [
                "I hear how difficult this is for you. That sounds really heavy to carry. You don't have to hold it all alone. I'm here to listen.",
                "Thank you for sharing this with me. Feeling {emotion} in this situation makes complete sense. I'm holding space for whatever you're experiencing.",
                "That sounds incredibly challenging. It takes courage to share these feelings. I'm here with you, without judgment."
            ],
            
            # Academic support
            "academic_support": [
                "Academic pressure can feel incredibly heavy. Try the 'Pomodoro Technique' today: focus on your work for just 25 minutes, then take a mandatory 5-minute break. It makes the mountain of work feel like small, manageable hills.",
                "If you're feeling overwhelmed by a big project, try 'Task-Splitting': break it down into the smallest possible actions (like 'open document' or 'write one sentence'). What's the smallest first step you can take right now?",
                "When exams feel like they define you, remember that your worth is independent of your marks. Try 'Active Recall' or 'Feynman Technique' to build confidence in your knowledge."
            ],
            
            # Relationship support
            "relationship_support": [
                "Relationship tension is exhausting. If you're planning a difficult conversation, try using 'I-statements' (e.g., 'I feel worried when...' rather than 'You always...'). It keeps the focus on your needs rather than blame.",
                "Navigating social conflict is hard. If things feel heated, try the '24-hour rule' – wait a full day before responding to a difficult message. This gives your emotional brain time to cool down.",
                "It's okay to feel hurt by people you care about. Remember that boundaries aren't walls to keep people out, but gates to keep yourself safe. What's one boundary that might help you feel more at peace?"
            ],
            
            # Work stress
            "work_stress_management": [
                "Work stress often comes from a lack of perceived control. Try the 'Eisenhower Matrix': categorize your tasks into 'Urgent/Important' and 'Not Urgent/Important'. Focusing only on the truly important can lower your stress.",
                "If work is following you home, try a 'Shutdown Ritual'. At the end of the day, spend 5 minutes writing down your top 3 tasks for tomorrow, then physically close your laptop.",
                "When the pressure is high, remember 'Digital Boundaries': can you turn off work notifications for just one hour this evening? Your rest is a requirement for your productivity."
            ],
            
            # Loneliness
            "loneliness_intervention": [
                "Loneliness is your social hunger signal, and it's completely valid. Try a 'Micro-Social Goal': can you make one small, low-stakes interaction today, like saying hello to a neighbor or sending a single 'thinking of you' text?",
                "When we feel isolated, we often retreat further. Try 'Passive Connection': just being in a public space, like a library or park, can sometimes lower the feeling of being 'alone'.",
                "Reaching out is a brave move. If you're looking for deeper connection, exploring a hobby or community interest can be a great bridge. What's one thing you've always been curious to learn about?"
            ],
            
            # Depression
            "depression_support": [
                "I hear the heavy weight you're carrying. When depression feels overwhelming, try 'Opposite Action': if your mood tells you to stay in bed, try just sitting up and placing your feet on the floor. Small, contrary actions can start to shift the momentum.",
                "Depression can make smallest tasks feel impossible. Try 'Micro-Goal Setting': focus only on the next 15 minutes. What is one tiny thing—like washing a single dish or stepping outside for fresh air—that you could do right now?",
                "You are not your depression; you are the person experiencing it. Try a 'Compassion Break': acknowledge that this is a moment of suffering, and it's okay to be gentle with yourself. You don't have to 'fix' it all today."
            ],
            
            # Sleep
            "sleep_support": [
                "Sleep struggles often start long before your head hits the pillow. Try the '10-3-2-1-0 Rule': no caffeine 10 hours before bed, no food 3 hours before, no work 2 hours before, and no screens 1 hour before.",
                "If you're lying awake with racing thoughts, try the '15-minute rule': if you can't sleep after 15 minutes, get out of bed and do something boring in low light (like reading a dull book) until you feel sleepy.",
                "Try a 'Brain Dump' before bed: write down every single worry or to-do item on a piece of paper. Getting them out of your head onto paper signals to your brain that it's safe to let go."
            ],
            
            # Stress Management (General)
            "stress_management": [
                "For immediate stress relief, box breathing is incredibly effective: Inhale for 4, hold for 4, exhale for 4, and hold for 4. This simple rhythm resets your nervous system and helps you regain focus.",
                "When you're overwhelmed, try 'time-blocking' your next hour: pick just one task and set a timer for 25 minutes. Focusing on one thing at a time reduces the mental 'noise' that leads to stress.",
                "If your mind is racing, 'Progressive Muscle Relaxation' can help. Tense and then release each muscle group starting from your toes up to your jaw. It physically signals to your brain that it's okay to relax."
            ],
            
            "behavioral_activation": [
                "When we're feeling down, small actions can create momentum. What's one tiny, achievable thing you could do today? Even something as small as making your bed or drinking a glass of water.",
                "Sometimes the hardest part is starting. What feels like the smallest step forward right now? We can build from there together.",
                "Action can shift perspective. What's one thing you usually enjoy, even if it doesn't feel appealing right now? Could we try it in a very small way?"
            ],
            
            # Anger strategies
            "emotional_labeling": [
                "It makes complete sense you'd feel {emotion} about that. That's a valid human response to what you're experiencing.",
                "I hear the {emotion} in what you're sharing. That emotion is telling us something important about what matters to you.",
                "Feeling {emotion} right now is understandable. Anger often points to boundaries being crossed or values being challenged."
            ],
            
            "deescalation_technique": [
                "When anger feels hot, sometimes stepping back helps. Let's count backwards from 10 slowly... 10... 9... 8... Notice how your body feels as we count.",
                "Anger needs space to cool down before we explore it. Take a pause with me. Breathe in... and out... What do you notice in your body right now?",
                "Let's create some distance from the heat of the emotion. Imagine placing the anger in a box for just a moment. What's underneath it?"
            ],
            
            # Positive strategies
            "positive_reinforcement": [
                "That's wonderful to hear! What's contributing to this positive feeling? Savoring good moments builds emotional resilience.",
                "I'm genuinely happy for you! Celebrating positive emotions is so important. What's been helpful in creating this good feeling?",
                "It's great you're noticing and sharing positive feelings! What aspects of today have felt particularly good?"
            ],
            
            "gratitude_practice": [
                "It's good to hear you're feeling okay. What's one thing you're grateful for today, no matter how small?",
                "Noticing what's going well can be powerful. What's been good recently, even in small ways?",
                "Shifting focus to appreciation can build positivity. What's something you appreciate about today?"
            ],
            
            # Neutral strategies
            "exploratory_questioning": [
                "I'm here with you. What's been occupying your thoughts lately?",
                "Thanks for checking in. What would feel helpful to explore right now?",
                "I'm listening. What's on your mind today?"
            ],
            
            "mindfulness_invitation": [
                "Let's take a mindful pause together. Notice your breath without trying to change it. What sensations do you feel?",
                "Sometimes just noticing how we feel can be helpful. What do you notice in your body or mind right now, without judgment?",
                "Mindfulness can create space between us and our thoughts. Let's practice noticing together for a moment."
            ],
            
            # General Support
            "general_support": [
                "I hear that you're going through a lot right now. I'm here to listen and support you in whatever way feels best. Would you like to talk more about what's on your mind?",
                "Thank you for sharing these feelings with me. It sounds like things have been difficult lately, and I want you to know you're not alone. I'm here for you.",
                "It takes a lot of strength to acknowledge these feelings. I'm here to support you. What's been the heaviest part of this for you today?"
            ],
            
            # Default/fallback
            "active_listening": [
                "I'm here to listen and support you. Would you like to tell me more about what's on your mind?",
                "Thank you for sharing. I'm here whenever you need to talk.",
                "I'm listening. What would be helpful to discuss right now?"
            ]
        }
    
    def _get_expanded_templates(self, valence: str = "neutral") -> Dict[str, List[str]]:
        """Provides a wider variety of opening and connecting phrases based on emotion valence"""
        templates = {
            "validation_starters": {
                "positive": [
                    "That's such a bright spot in your day!",
                    "I'm so glad to hear you're feeling this way.",
                    "It's wonderful to celebrate these moments with you.",
                    "Thank you for sharing this bit of joy with me.",
                    "It sounds like things are really looking up!",
                    "I'm genuinely thrilled for you!",
                    "That's a fantastic achievement.",
                    "You should be really proud of that."
                ],
                "negative": [
                    "I hear you, and it's completely valid to feel this way.",
                    "Thank you for opening up about this; I'm here with you.",
                    "It sounds like you're navigating a lot right now.",
                    "I can sense how much this is weighing on you.",
                    "That sounds like an incredibly challenging situation to be in.",
                    "I'm sorry things are so tough right now; I'm here to listen.",
                    "That sounds really exhausting to carry alone.",
                    "It's okay to not be okay right now."
                ],
                "neutral": [
                    "I'm here with you, listening to whatever is on your mind.",
                    "Thank you for checking in and sharing what's going on.",
                    "I'm listening, and I'm ready to explore this with you.",
                    "It's good to hear from you today.",
                    "I'm holding space for you and your thoughts.",
                    "What's been on your mind lately?",
                    "I'm here to support you in whatever way feels best.",
                    "Thanks for trusting me with your thoughts today."
                ]
            },
            "context_bridges": {
                "positive": [
                    "Seeing how {topic} is bringing you some {emotion} is truly great.",
                    "It's lovely to hear about {topic} and the {emotion} you're experiencing.",
                    "I can see why {topic} is making you feel {emotion} right now.",
                    "Your {emotion} regarding {topic} is wonderful to witness!",
                    "It's great that {topic} is such a positive part of your experience.",
                    "Celebrating your {emotion} about {topic} is a highlight for me too."
                ],
                "negative": [
                    "Especially when it comes to {topic}, it makes total sense that you'd feel {emotion}.",
                    "Dealing with {topic} can be so draining, and I hear the {emotion} you're feeling.",
                    "I can see why {topic} is on your mind; it's a lot to navigate.",
                    "Your feelings about {topic} are completely valid.",
                    "It's okay to feel {emotion} while you're working through things with {topic}.",
                    "I hear the {emotion} in your voice when you talk about {topic}."
                ],
                "neutral": [
                    "It's interesting to hear your perspective on {topic}.",
                    "I'm noticing how {topic} is figuring into your thoughts today.",
                    "Let's explore what {topic} means for you right now.",
                    "I hear you mentioning {topic}, and I'm here to listen.",
                    "Thank you for sharing more about {topic}.",
                    "I'm curious to hear more about how {topic} has been affecting you."
                ]
            },
            "advice_transitions": {
                "positive": [
                    "To keep this momentum going, here is a thought:",
                    "One way to really savor this feeling is to consider this:",
                    "I'd love to suggest a small way to build on this experience:",
                    "While things are going well, it might be nice to keep this in mind:",
                    "Maybe we can take a moment to reflect on what's working:"
                ],
                "negative": [
                    "One thing that might help ease some of that pressure is to try this:",
                    "When things feel this heavy, it sometimes helps to consider a small shift:",
                    "Perhaps we could try a small step together, like this:",
                    "I'd like to suggest something that might offer a bit of relief:",
                    "Maybe we can look at this from a different angle together:"
                ],
                "neutral": [
                    "If you'd like, we could explore a small exercise together:",
                    "One thought to consider as we talk about this is:",
                    "Maybe we could take a moment to look at this more closely:",
                    "I'm wondering if it might be helpful to try this:",
                    "If you're up for it, we could try a simple step:"
                ]
            }
        }
        
        return {
            "validation_starters": templates["validation_starters"].get(valence, templates["validation_starters"]["neutral"]),
            "context_bridges": templates["context_bridges"].get(valence, templates["context_bridges"]["neutral"]),
            "advice_transitions": templates["advice_transitions"].get(valence, templates["advice_transitions"]["neutral"])
        }
    
    def _select_tone_profile(self, emotion: str, intensity: str, is_crisis: bool = False) -> Dict[str, Any]:
        """Select appropriate tone profile for the situation"""
        if is_crisis:
            return self.tone_profiles["crisis"]
        
        if intensity in ["crisis", "emergency"]:
            return self.tone_profiles["emergency"]
        
        if intensity == "high":
            if emotion == "anxiety":
                return self.tone_profiles["high_anxiety"]
            elif emotion == "sadness":
                return self.tone_profiles["high_sadness"]
            elif emotion == "anger":
                return self.tone_profiles["high_anger"]
        
        if emotion in ["happiness", "joy", "love"]:
            return self.tone_profiles["positive"]
        
        return self.tone_profiles["neutral"]
    
    def _personalize_response(self, response: str, context: Dict[str, Any]) -> str:
        """Add personalization based on user context"""
        user_id = context.get("user_id", "")
        user_type = context.get("user_type", "NEW")
        
        personalized_response = response
        
        # Add user name if available and appropriate (concise)
        if user_id and user_id != "default_user" and len(user_id) < 20 and not user_id.startswith("user_"):
            personalized_response = f"{user_id}, {personalized_response[0].lower()}{personalized_response[1:]}"
        
        # Add greeting ONLY for new users or general helpfulness (no history references)
        if user_type == "NEW" and random.random() < 0.7:
            greeting = random.choice(self.personalization_phrases["new_user"])
            personalized_response = f"{greeting}. {personalized_response}"
        
        return personalized_response
    
    def _add_emotion_context(self, response: str, emotion_data: Dict[str, Any]) -> str:
        """Enhance response with emotion-specific context"""
        emotion = emotion_data.get("emotion", "")
        intensity = emotion_data.get("intensity", "")
        
        # Replace emotion placeholders
        if "{emotion}" in response:
            response = response.replace("{emotion}", emotion)
        
        # Add intensity markers (subtle)
        if intensity == "crisis":
            response = f"🚨 {response}"
        
        return response

    
    def _add_follow_up_question(self, response: str, strategy: str, 
                               tone_profile: Dict[str, Any]) -> str:
        """Add engaging follow-up question"""
        follow_ups = {
            "crisis": [
                " Can you tell me what's been making things feel unbearable?",
                " What would help you feel safer right now?",
                " Is there someone you trust that you can reach out to?"
            ],
            "grounding_technique": [
                " How did that feel for you?",
                " What did you notice during that exercise?",
                " Would you like to try another grounding technique?"
            ],
            "breathing_exercise": [
                " How does your body feel after that?",
                " Would you like to try another round together?",
                " What did you notice about your breath?"
            ],
            "compassionate_listening": [
                " Would you like to share more about what's been difficult?",
                " What's been the hardest part of this for you?",
                " How long have you been carrying this?"
            ],
            "emotional_labeling": [
                " What do you think your {emotion} is trying to tell you?",
                " How does it feel to name that emotion?",
                " What might need to change for this feeling to shift?"
            ],
            "positive_reinforcement": [
                " How can you nurture this positive feeling?",
                " What would help you hold onto this good moment?",
                " What else has been going well lately?"
            ],
            "default": [
                " How does that sound to you?",
                " What are your thoughts on this?",
                " Would you like to explore this further?",
                " What else is on your mind today?",
                " How can I best support you with this?"
            ]
        }
        
        # Select appropriate follow-up
        if strategy in follow_ups:
            follow_up = random.choice(follow_ups[strategy])
        else:
            follow_up = random.choice(follow_ups["default"])
        
        # Prevent double questions
        trimmed_response = response.strip()
        if trimmed_response.endswith("?") or trimmed_response.endswith("?\"") or trimmed_response.endswith("'?"):
            return response
            
        return f"{trimmed_response} {follow_up.strip()}"
    
        if not final_response.endswith(('.', '!', '?', '"')):
            final_response += "."
            
        return {
            "response": final_response,
            "strategy_used": strategy,
            "tone_style": tone_profile["style"],
            "personalized": context_data.get("has_history", False),
            "emotion_aware": True,
            "contains_follow_up": not is_crisis and intensity not in ["crisis", "emergency"],
            "agent": "DynamicWeavingAgent",
            "ml_bridged": bool(ml_keywords),
            "timestamp": datetime.now().isoformat()
        }

    def generate_response(self, user_message: str, emotion_data: Dict[str, Any], 
                         strategy_data: Dict[str, Any], context_data: Dict[str, Any],
                         ml_keywords: List[str] = None) -> Dict[str, Any]:
        """
        New 'Dynamic Contextual Weaving' Response Generation.
        Moves away from fixed templates to a more fluid, keyword-driven synthesis.
        """
        emotion = emotion_data.get("emotion", "neutral")
        intensity = emotion_data.get("intensity", "medium")
        strategy = strategy_data.get("strategy", "active_listening")
        is_crisis = strategy_data.get("is_crisis", False)
        
        # 1. Handle Crisis/Emergency (Prioritize Safety & Directness)
        if is_crisis or intensity in ["crisis", "emergency"]:
            return self._generate_crisis_response(strategy_data, emotion_data, context_data)

        # 2. Extract context for weaving
        keywords = ml_keywords or []
        primary_topic = keywords[0] if keywords else "what you're going through"
        
        # Determine valence
        valence = "neutral"
        if emotion in ["happiness", "joy", "excited", "grateful"]:
            valence = "positive"
        elif emotion in ["sadness", "anxiety", "anger", "fear", "frustration"]:
            valence = "negative"
            
        # 3. Build Response Components
        expand = self._get_expanded_templates(valence)
        
        # Component A: Empathetic Validation
        starter = random.choice(expand["validation_starters"])
        
        # Component B: Contextual Bridge
        bridge_template = random.choice(expand["context_bridges"])
        bridge = bridge_template.format(topic=primary_topic, emotion=emotion)
        
        # Component C: Strategy-Based Advice
        # Get advice from Wellness Agent or fallback to local templates
        is_howto = strategy_data.get("is_howto", False)
        is_eradicate = strategy_data.get("is_eradicate", False)
        
        advice_list = []
        
        # Primary advice
        primary_advice = strategy_data.get("response_template", "")
        if not primary_advice and strategy in self.strategy_templates:
            primary_advice = random.choice(self.strategy_templates[strategy])
        if primary_advice:
            advice_list.append(primary_advice)
            
        # If how-to/techniques requested, add 1-2 more techniques from the same or related strategies
        if is_howto and len(advice_list) < 3:
            # Try to get more templates from the same strategy
            alt_templates = []
            if strategy in self.strategy_templates:
                alt_templates = [t for t in self.strategy_templates[strategy] if t not in advice_list]
                
            # Diversify if no more templates in current strategy
            if not alt_templates:
                if valence == "negative":
                    related = ["grounding_technique", "breathing_exercise", "mindfulness_invitation"]
                    for rel_strat in related:
                        if rel_strat != strategy:
                            alt_templates.extend(self.strategy_templates.get(rel_strat, []))
            
            # Add up to 2 extra techniques
            random.shuffle(alt_templates)
            for extra in alt_templates[:2]:
                if extra not in advice_list:
                    advice_list.append(extra)

        # Merge advice
        if len(advice_list) > 1:
            advice_text = " Here are a few things you could try: " + " ".join([a.strip() for a in advice_list])
            if is_eradicate:
                advice_text = " While we can't always 'eradicate' feelings instantly, we can certainly manage them together. " + advice_text
        else:
            advice_text = advice_list[0] if advice_list else ""
        
        # Clean advice text (remove emojis and existing validations to avoid stuttering)
        advice_text = advice_text.replace("🚨 ", "").replace("⚠️ ", "")
        
        # Component D: Transition & Advice Merge
        transition = random.choice(expand["advice_transitions"])
        if is_howto:
            transition = "I've gathered a few suggestions that might help."
        
        # Step 4: Final Synthesis (The 'Weave')
        if advice_text.lower().startswith("i hear") or advice_text.lower().startswith("thank you") or is_howto:
            final_draft = f"{bridge} {advice_text}"
        else:
            final_draft = f"{starter} {bridge} {transition} {advice_text}"

        # 5. Personalization & Follow-up
        personalized = self._personalize_response(final_draft, context_data)
        tone_profile = self._select_tone_profile(emotion, intensity)
        final_response = self._add_follow_up_question(personalized, strategy, tone_profile)
        
        # 6. Cleanup & Format
        final_response = self._cleanup_formatting(final_response)
        
        return {
            "response": final_response,
            "strategy_used": strategy,
            "tone_style": tone_profile["style"],
            "personalized": context_data.get("has_history", False),
            "agent": "DynamicWeavingAgent",
            "ml_bridged": bool(ml_keywords),
            "timestamp": datetime.now().isoformat()
        }

    def _generate_crisis_response(self, strategy_data, emotion_data, context_data) -> Dict[str, Any]:
        """Special direct handling for high-risk situations"""
        response = strategy_data.get("response_template", "I'm very concerned about you. Please reach out to emergency services or a crisis helpline immediately.")
        return {
            "response": response,
            "strategy_used": strategy_data.get("strategy", "crisis_intervention"),
            "tone_style": "crisis",
            "personalized": False,
            "agent": "CrisisSafetyAgent",
            "timestamp": datetime.now().isoformat()
        }

    def _cleanup_formatting(self, text: str) -> str:
        """Final cleanup of sentence casing and punctuation"""
        text = text.strip()
        # Fix double spaces
        text = " ".join(text.split())
        # Fix casing
        if text and text[0].islower():
            text = text[0].upper() + text[1:]
        # Ensure ending punctuation
        if not text.endswith(('.', '!', '?', '"')):
            text += "."
        return text

    def _bridge_context(self, response: str, user_message: str, ml_keywords: List[str] = None) -> str:
        """
        Universal Contextual Bridging: Uses ML keywords to ground response in reality.
        """
        # Use ML keywords if available, otherwise fallback to basic extraction
        keywords = ml_keywords
        if not keywords:
            ignore = {
                "i", "me", "my", "feel", "feeling", "am", "is", "a", "an", "the", "like", "it", "so", "very", "want", "to",
                "since", "even", "just", "really", "could", "would", "should", "been", "was", "were", "have", "had", 
                "about", "with", "this", "that", "there", "their", "they", "some", "someone", "something", "sometimes",
                "im", "ive", "id", "ill", "dont", "cant", "youre", "hes", "shes", "theyre", "well",
                "need", "needed", "please", "kindly", "want", "wanted", "give", "tell", "show", "help",
                "management", "technique", "techniques", "method", "methods", "strategy", "strategies",
                "support", "advice", "suggestion", "suggestions", "information"
            }
            words = user_message.lower().split()
            keywords = [w.strip('?!.,') for w in words if w not in ignore and len(w) > 3]
        
        if not keywords:
            return response
            
        # Cleanup keywords
        significant = list(dict.fromkeys(keywords))[:3]
        
        # Variety of bridges for less robotic feel
        bridges = [
            f"I understand that {', '.join(significant)} is weighing on you right now, and ",
            f"I hear you mentioning things like {', '.join(significant)}, which sounds truly heavy, and ",
            f"It makes sense that you're feeling this way, especially with everything around {significant[0]} going on, and ",
            f"Thank you for sharing about {significant[0]}; I can see why that's on your mind, and "
        ]
        context_phrase = random.choice(bridges)
            
        # Insert bridging after the first validation sentence
        sentences = response.split('. ', 1)
        if len(sentences) > 1:
            return f"{sentences[0]}. {context_phrase}{sentences[1][0].lower() + sentences[1][1:]}"
        
        return f"{context_phrase}{response[0].lower() + response[1:]}"
    

# Create global instance
response_agent = ResponseGenerationAgent()

# Test function
def test_response_generator():
    """Test the response generation agent"""
    print("\n" + "="*60)
    print("🧪 TESTING RESPONSE GENERATION AGENT (Agent 5)")
    print("="*60)
    
    test_cases = [
        {
            "user_message": "I'm having a panic attack",
            "emotion_data": {"emotion": "anxiety", "intensity": "emergency", "confidence": 0.9},
            "strategy_data": {"strategy": "breathing_exercise", "is_crisis": False},
            "context_data": {"user_id": "test_user", "has_history": False, "user_type": "NEW"}
        },
        {
            "user_message": "I feel hopeless and alone",
            "emotion_data": {"emotion": "sadness", "intensity": "high", "confidence": 0.85},
            "strategy_data": {"strategy": "compassionate_listening", "is_crisis": False},
            "context_data": {"user_id": "returning_user", "has_history": True, "user_type": "RETURNING_REGULAR", "interaction_count": 5}
        },
        {
            "user_message": "how to kill myself",
            "emotion_data": {"emotion": "sadness", "intensity": "crisis", "confidence": 0.95},
            "strategy_data": {
                "strategy": "crisis_intervention",
                "response_template": "I'm really sorry you're feeling this much pain. Please contact AASRA: 91-9820466726 immediately.",
                "is_crisis": True
            },
            "context_data": {"user_id": "crisis_user", "has_history": False}
        },
        {
            "user_message": "I'm so happy I got the job!",
            "emotion_data": {"emotion": "happiness", "intensity": "high", "confidence": 0.88},
            "strategy_data": {"strategy": "positive_reinforcement", "is_crisis": False},
            "context_data": {"user_id": "happy_user", "has_history": True, "interaction_count": 3}
        }
    ]
    
    for i, test in enumerate(test_cases, 1):
        print(f"\n📝 Test Case {i}:")
        print(f"   User: '{test['user_message']}'")
        print(f"   Emotion: {test['emotion_data']['emotion']} ({test['emotion_data']['intensity']})")
        print(f"   Strategy: {test['strategy_data']['strategy']}")
        
        result = response_agent.generate_response(
            test["user_message"],
            test["emotion_data"],
            test["strategy_data"],
            test["context_data"]
        )
        
        print(f"   🎭 Tone: {result['tone_style']}")
        print(f"   💬 Response: {result['response']}")
        print(f"   📊 Personalized: {result['personalized']}")

if __name__ == "__main__":
    test_response_generator()