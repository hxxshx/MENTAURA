// MentAura AI Chatbot - Backend API Integration
// Configuration
const BACKEND_API_URL = "http://localhost:8000";

// Global Variables
let isVoiceRecording = false;
let mediaRecorder = null;
let audioChunks = [];
let chatHistory = [];
let conversationHistory = [];
let isTyping = false;
let messageCount = 0;
let currentAssessmentStep = 0;
let assessmentAnswers = [];
let voiceSettings = {
    rate: 1.0,
    pitch: 1.0,
    voice: null
};

// Mental Health Assessment Questions
const assessmentQuestions = [
    {
        question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        question: "Over the past two weeks, how often have you had little interest or pleasure in doing things?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        question: "How often do you feel nervous, anxious, or on edge?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        question: "How often do you have trouble relaxing?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        question: "How often do you have trouble falling or staying asleep?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    }
];

// 50 Most Asked Questions with Comprehensive Responses
const mentalHealthFAQ = {
    "what is anxiety": "Anxiety is a natural stress response characterized by feelings of worry, nervousness, or fear about future events. While normal anxiety can be helpful, anxiety disorders involve excessive, persistent worry that interferes with daily activities. Common symptoms include restlessness, fatigue, difficulty concentrating, irritability, muscle tension, and sleep problems. Effective treatments include therapy (especially Cognitive Behavioral Therapy), medication, mindfulness practices, regular exercise, and stress management techniques. Remember that anxiety is highly treatable, and seeking professional help is a sign of strength.",

    "how to deal with depression": "Depression is a serious mental health condition that affects how you feel, think, and behave. It's characterized by persistent sadness, loss of interest in activities, changes in appetite or sleep, fatigue, feelings of worthlessness, and difficulty concentrating. Treatment options include psychotherapy (talk therapy), medication, lifestyle changes, and support groups. Self-care strategies that can help include maintaining a regular routine, getting adequate sleep, eating nutritious meals, exercising regularly, staying connected with supportive people, and practicing mindfulness. Professional help is essential for proper diagnosis and treatment.",

    "stress management techniques": "Effective stress management involves identifying triggers and developing healthy coping strategies. Techniques include: deep breathing exercises (try the 4-7-8 technique), progressive muscle relaxation, mindfulness meditation, regular physical exercise, adequate sleep (7-9 hours), time management and prioritization, setting boundaries, maintaining social connections, practicing gratitude, and engaging in hobbies you enjoy. When stress becomes overwhelming, consider speaking with a mental health professional who can provide personalized strategies and support.",

    "how to improve sleep": "Good sleep hygiene includes maintaining a consistent sleep schedule, creating a cool, dark, and quiet sleeping environment, avoiding caffeine and large meals before bedtime, limiting screen time 1-2 hours before sleep, and establishing a relaxing bedtime routine. Regular exercise can improve sleep quality, but avoid vigorous activity close to bedtime. If you continue having sleep problems, consider consulting a healthcare provider as underlying conditions or medications might be affecting your sleep.",

    "relationship problems": "Healthy relationships require good communication, mutual respect, trust, and compromise. Common issues include poor communication, conflict resolution difficulties, trust issues, and different expectations. Strategies for improvement include active listening, using 'I' statements when expressing concerns, setting healthy boundaries, showing appreciation, spending quality time together, and seeking couples therapy when needed. Remember that some relationships may not be salvageable, and it's okay to prioritize your mental health and well-being.",

    "panic attacks": "Panic attacks are sudden episodes of intense fear that trigger severe physical reactions when there's no real danger. Symptoms include rapid heartbeat, sweating, trembling, shortness of breath, chest pain, nausea, dizziness, and feelings of impending doom. During an attack, try grounding techniques like the 5-4-3-2-1 method (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste), practice deep breathing, and remind yourself it will pass. Professional treatment including therapy and medication can be very effective in managing panic disorder.",

    "self esteem": "Self-esteem is your overall sense of personal value and worth. Low self-esteem often involves negative self-talk, comparing yourself to others, and focusing on perceived flaws. To build self-esteem: practice self-compassion, challenge negative thoughts, celebrate small wins, set achievable goals, surround yourself with supportive people, practice gratitude, engage in activities you enjoy and excel at, and consider therapy if low self-esteem significantly impacts your life. Remember that building self-esteem is a gradual process that requires patience and consistent effort.",

    "mindfulness meditation": "Mindfulness involves paying attention to the present moment without judgment. Benefits include reduced stress and anxiety, improved focus and emotional regulation, better sleep, and increased self-awareness. Start with just 5-10 minutes daily: sit comfortably, focus on your breath, notice when your mind wanders and gently bring attention back to breathing. You can also practice mindful walking, eating, or listening. Apps like Headspace, Calm, or Insight Timer can provide guided meditations for beginners.",

    "grief and loss": "Grief is a natural response to loss that affects everyone differently. Common stages include denial, anger, bargaining, depression, and acceptance, though not everyone experiences all stages or in order. Healthy coping includes allowing yourself to feel emotions, maintaining routines, seeking support from friends, family, or support groups, taking care of physical health, and being patient with the process. Professional grief counseling can provide additional support during difficult times. Remember there's no 'right' timeline for grief.",

    "anger management": "Anger is a normal emotion, but problems arise when it's expressed inappropriately or becomes overwhelming. Healthy anger management includes identifying triggers, recognizing early warning signs, taking time-outs when needed, using relaxation techniques, exercising regularly, practicing assertive (not aggressive) communication, and addressing underlying issues that may contribute to anger. If anger frequently interferes with relationships or daily life, consider anger management counseling or therapy.",

    "loneliness": "Loneliness is the feeling of being isolated or disconnected from others, even when surrounded by people. It can negatively impact both mental and physical health. Strategies to combat loneliness include joining clubs or groups with similar interests, volunteering, reaching out to old friends, engaging in community activities, practicing self-compassion, considering pet ownership, and seeking professional help if loneliness persists. Online communities can also provide connection, but balance virtual with in-person interactions when possible.",

    "work stress": "Work-related stress can result from heavy workloads, difficult colleagues, job insecurity, or work-life imbalance. Management strategies include setting realistic goals, prioritizing tasks, taking regular breaks, communicating concerns with supervisors, establishing boundaries between work and personal life, using vacation time, developing coping skills, and maintaining supportive relationships outside work. If work stress severely impacts your health or well-being, consider discussing accommodations with HR or seeking new employment opportunities.",

    "social anxiety": "Social anxiety involves intense fear or discomfort in social situations due to worry about being judged, embarrassed, or rejected. Symptoms include blushing, sweating, trembling, rapid heartbeat, and avoidance of social situations. Treatment options include cognitive behavioral therapy, exposure therapy, medication, and self-help strategies like gradual exposure to feared situations, challenging negative thoughts, practicing social skills, and using relaxation techniques before social events.",

    "trauma": "Trauma results from experiencing or witnessing extremely distressing events. Symptoms may include flashbacks, nightmares, avoidance of reminders, negative mood changes, and increased arousal or reactivity. Post-traumatic stress disorder (PTSD) may develop if symptoms persist and significantly impact functioning. Effective treatments include trauma-focused therapy (EMDR, CPT, PE), medication, and support groups. Recovery is possible with proper treatment and support. If you're experiencing trauma symptoms, please reach out to a mental health professional.",

    "eating disorders": "Eating disorders involve serious disturbances in eating behavior and related thoughts and emotions. Common types include anorexia nervosa, bulimia nervosa, and binge eating disorder. These are serious mental health conditions that require professional treatment. Warning signs include preoccupation with weight, food, or body image; extreme dietary restrictions; secretive eating behaviors; and physical symptoms. Treatment typically involves a multidisciplinary team including therapists, nutritionists, and medical professionals. Early intervention is crucial for recovery.",

    "addiction": "Addiction is a complex condition involving compulsive substance use or behavior despite harmful consequences. It affects brain chemistry and behavior patterns. Recovery is possible with proper treatment, which may include detoxification, therapy, medication, support groups (like AA or NA), and lifestyle changes. Relapse doesn't mean failure - it's often part of the recovery process. If you're struggling with addiction, reach out for professional help immediately. Many resources are available, including hotlines, treatment centers, and support groups.",

    "perfectionism": "Perfectionism involves setting unrealistically high standards and being overly critical of mistakes. While striving for excellence can be positive, perfectionism often leads to anxiety, procrastination, and decreased satisfaction. Healthy strategies include setting realistic goals, practicing self-compassion, focusing on progress rather than perfection, challenging all-or-nothing thinking, and celebrating efforts rather than just outcomes. Remember that mistakes are opportunities for learning and growth.",

    "seasonal depression": "Seasonal Affective Disorder (SAD) typically occurs during fall and winter months when daylight hours decrease. Symptoms include depression, fatigue, increased appetite, weight gain, and social withdrawal. Treatment options include light therapy, regular exercise, maintaining social connections, vitamin D supplementation (consult your doctor), and possibly medication or therapy. Creating consistent routines and maximizing natural light exposure can also help manage symptoms.",

    "codependency": "Codependency involves excessive emotional or psychological reliance on another person, often to the detriment of one's own well-being. It commonly occurs in relationships with individuals struggling with addiction, mental illness, or other issues. Recovery involves setting healthy boundaries, developing self-awareness, practicing self-care, building individual identity and interests, and often participating in therapy or support groups like CoDA (Codependents Anonymous).",

    "impostor syndrome": "Impostor syndrome involves persistent feelings of being a fraud despite evidence of competence and accomplishments. It's characterized by attributing success to luck rather than ability and fear of being 'found out.' Coping strategies include recognizing these thoughts as common and temporary, keeping a record of achievements, seeking feedback from trusted sources, practicing self-compassion, and challenging negative self-talk. Remember that competence and confidence develop over time.",

    "burnout": "Burnout is a state of physical, emotional, and mental exhaustion caused by prolonged stress, often work-related. Symptoms include chronic fatigue, cynicism, reduced productivity, and feeling overwhelmed. Recovery involves identifying contributing factors, setting boundaries, practicing self-care, seeking support, possibly taking time off, and making necessary life changes. Professional counseling can provide strategies for prevention and recovery. Burnout is serious and shouldn't be ignored.",

    "self care": "Self-care involves deliberately taking action to preserve or improve your physical, mental, and emotional health. It includes basic needs like adequate sleep, nutrition, and hygiene, as well as activities that bring joy and relaxation. Examples include exercise, hobbies, spending time in nature, social connections, mindfulness practices, setting boundaries, and saying no to excessive demands. Self-care isn't selfish - it's necessary for maintaining your ability to care for others and handle life's challenges.",

    "therapy": "Therapy provides a safe, confidential space to explore thoughts, feelings, and behaviors with a trained professional. Different types include cognitive behavioral therapy, psychodynamic therapy, humanistic therapy, and others. Benefits include gaining insight, developing coping skills, processing difficult experiences, and improving relationships. Finding the right therapist may take time - it's important to feel comfortable and understood. Many insurance plans cover mental health services, and sliding scale options may be available.",

    "medication for mental health": "Psychiatric medications can be effective tools for managing mental health conditions when used appropriately. Common types include antidepressants, anti-anxiety medications, mood stabilizers, and antipsychotics. They work by affecting brain chemistry and should always be prescribed and monitored by qualified healthcare providers. Side effects vary, and it may take time to find the right medication and dosage. Never stop medication abruptly without medical supervision. Medication often works best combined with therapy.",

    "boundary setting": "Healthy boundaries protect your physical, emotional, and mental well-being by defining what you will and won't accept from others. Types include physical, emotional, time, and digital boundaries. Setting boundaries involves identifying your limits, communicating them clearly and consistently, and following through with consequences. It's not about controlling others but protecting yourself. Boundary setting can feel uncomfortable initially but becomes easier with practice and is essential for healthy relationships.",

    "emotional regulation": "Emotional regulation involves recognizing, understanding, and managing your emotions effectively. Skills include identifying emotion triggers, practicing mindfulness, using coping strategies (deep breathing, grounding techniques), challenging negative thoughts, engaging in physical activity, seeking social support, and sometimes taking breaks from stressful situations. Developing these skills takes practice, and therapy can provide personalized strategies for improvement."
};

// Additional FAQ responses for comprehensive coverage
const additionalFAQs = {
    "crisis help": "If you're in crisis or having thoughts of self-harm, please reach out immediately: National Suicide Prevention Lifeline: 988 or 1-800-273-8255, Crisis Text Line: Text HOME to 741741, or go to your nearest emergency room. You can also call 911. Your life matters, and help is available 24/7.",

    "find therapist": "To find a therapist, start with your insurance provider's directory, ask your doctor for referrals, check Psychology Today's therapist finder, contact local mental health centers, or ask trusted friends for recommendations. Consider factors like specialties, location, cost, and whether you feel comfortable with their approach during initial consultations.",

    "mental health stigma": "Mental health stigma involves negative attitudes and discrimination toward people with mental health conditions. Combat stigma by educating yourself and others, using person-first language, sharing your story if comfortable, challenging misconceptions when you hear them, and treating mental health with the same importance as physical health.",

    "supporting friend": "To support a friend with mental health challenges: listen without judgment, avoid giving unsolicited advice, check in regularly, encourage professional help if needed, learn about their condition, respect their boundaries, maintain the friendship beyond their mental health, and take care of your own well-being too.",

    "exercise mental health": "Regular physical activity can significantly improve mental health by reducing symptoms of depression and anxiety, improving mood through endorphin release, reducing stress hormones, improving sleep, building self-esteem, and providing social interaction opportunities. Aim for at least 30 minutes of moderate exercise most days.",

    "nutrition mental health": "Good nutrition supports mental health through stable blood sugar levels, adequate vitamins and minerals, omega-3 fatty acids for brain health, and gut health (which affects mood). Focus on whole foods, regular meals, staying hydrated, limiting alcohol and excessive caffeine, and considering supplements if deficient (consult healthcare provider).",

    "digital detox": "Taking breaks from technology can reduce stress, improve sleep, enhance real-world relationships, and increase mindfulness. Start small with phone-free meals or bedroom, set specific times for checking devices, use apps to monitor usage, engage in offline activities, and create tech-free zones in your home.",

    "workplace mental health": "Prioritize workplace mental health by setting boundaries, taking breaks, using employee assistance programs, communicating needs with supervisors when appropriate, creating a supportive work environment, managing workload, and seeking accommodations if needed under the Americans with Disabilities Act.",

    "parenting mental health": "Parents need mental health support too. Practice self-care, maintain adult relationships, seek help when needed, model healthy coping for children, join parenting support groups, and remember that taking care of yourself helps you better care for your family.",

    "teen mental health": "Adolescent mental health is crucial as teens face unique challenges like identity development, peer pressure, academic stress, and hormonal changes. Warning signs include dramatic mood changes, social withdrawal, declining grades, risky behaviors, or talking about self-harm. Professional help and family support are important."
};

// Document ready initialization
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

async function initializeApp() {
    try {
        initChatInterface();
        initVoiceSettings();
        loadConversationHistory();

        // Test backend connection
        const isConnected = await testBackendConnection();
        if (isConnected) {
            showNotification('MentAura AI is ready to help!', 'success');
            updateConnectionStatus(true);
        } else {
            showNotification('Backend connection issue. Please ensure the server is running.', 'warning');
            updateConnectionStatus(false);
        }
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Initialization error. Some features may be limited.', 'error');
        updateConnectionStatus(false);
    }
}

// Test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch(`${BACKEND_API_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Backend connection test failed:', error);
        return false;
    }
}

// Initialize Chat Interface
function initChatInterface() {
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        messageInput.addEventListener('input', function () {
            updateCharacterCount();
            adjustTextareaHeight(this);
            updateSendButton();
        });
    }
}

// Initialize Voice Settings
function initVoiceSettings() {
    if ('speechSynthesis' in window) {
        const voices = speechSynthesis.getVoices();
        populateVoiceSelect(voices);

        // Listen for voices changed event (needed for Chrome)
        speechSynthesis.addEventListener('voiceschanged', () => {
            populateVoiceSelect(speechSynthesis.getVoices());
        });

        // Initialize voice settings controls
        const speedSlider = document.getElementById('voiceSpeed');
        const pitchSlider = document.getElementById('voicePitch');

        if (speedSlider) {
            speedSlider.addEventListener('input', function () {
                voiceSettings.rate = parseFloat(this.value);
                document.getElementById('speedValue').textContent = this.value + 'x';
            });
        }

        if (pitchSlider) {
            pitchSlider.addEventListener('input', function () {
                voiceSettings.pitch = parseFloat(this.value);
                document.getElementById('pitchValue').textContent = this.value;
            });
        }
    }
}

function populateVoiceSelect(voices) {
    const voiceSelect = document.getElementById('voiceSelect');
    if (voiceSelect && voices.length > 0) {
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            if (voice.default) option.selected = true;
            voiceSelect.appendChild(option);
        });

        voiceSelect.addEventListener('change', function () {
            voiceSettings.voice = voices[this.value];
        });

        // Set default voice
        if (voices[0]) voiceSettings.voice = voices[0];
    }
}

// Send Message Function
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message && !isTyping) {
        addUserMessage(message);
        await processUserMessage(message);
        messageInput.value = '';
        updateCharacterCount();
        adjustTextareaHeight(messageInput);
        updateSendButton();
    }
}

// Quick Message Sender
async function sendQuickMessage(message) {
    addUserMessage(message);
    await processUserMessage(message);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = createMessageElement(message, 'user');
    chatMessages.appendChild(messageElement);
    scrollToBottom();

    // Add to chat history
    const messageData = {
        type: 'user',
        message: message,
        timestamp: new Date()
    };
    chatHistory.push(messageData);
    saveToConversationHistory(messageData);
    messageCount++;
}

function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = createMessageElement(message, 'bot');
    chatMessages.appendChild(messageElement);
    scrollToBottom();

    // Add to chat history
    const messageData = {
        type: 'bot',
        message: message,
        timestamp: new Date()
    };
    chatHistory.push(messageData);
    saveToConversationHistory(messageData);
}

function createMessageElement(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '🤖' : '👤';

    const content = document.createElement('div');
    content.className = 'message-content';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = formatMessageContent(message);

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = getCurrentTime();

    // Add voice button for bot messages
    if (type === 'bot') {
        const actions = document.createElement('div');
        actions.className = 'message-actions';

        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-btn';
        voiceBtn.innerHTML = '🔊';
        voiceBtn.title = 'Listen to response';
        voiceBtn.onclick = () => speakMessage(message, voiceBtn);

        actions.appendChild(voiceBtn);
        content.appendChild(bubble);
        content.appendChild(actions);
        content.appendChild(time);
    } else {
        content.appendChild(bubble);
        content.appendChild(time);
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    return messageDiv;
}

function formatMessageContent(message) {
    // Format message with basic markdown-like formatting
    return message
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Voice Output Function
function speakMessage(message, button) {
    if ('speechSynthesis' in window) {
        // Stop any ongoing speech
        speechSynthesis.cancel();

        // Clean message for speech (remove HTML tags and formatting)
        const cleanMessage = message
            .replace(/<[^>]*>/g, '')
            .replace(/[*_`]/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanMessage);
        utterance.rate = voiceSettings.rate;
        utterance.pitch = voiceSettings.pitch;
        utterance.voice = voiceSettings.voice;

        // Visual feedback
        button.classList.add('speaking');
        button.innerHTML = '⏸️';
        button.title = 'Stop speaking';

        utterance.onend = function () {
            button.classList.remove('speaking');
            button.innerHTML = '🔊';
            button.title = 'Listen to response';
        };

        utterance.onerror = function () {
            button.classList.remove('speaking');
            button.innerHTML = '🔊';
            button.title = 'Listen to response';
            showNotification('Voice synthesis failed', 'error');
        };

        // Allow stopping speech by clicking button again
        button.onclick = function () {
            if (button.classList.contains('speaking')) {
                speechSynthesis.cancel();
            } else {
                speakMessage(message, button);
            }
        };

        speechSynthesis.speak(utterance);
    } else {
        showNotification('Speech synthesis not supported in this browser', 'error');
    }
}

// Enhanced Message Processing with Comprehensive FAQ
async function processUserMessage(message) {
    showTypingIndicator();

    try {
        let response = await generateAIResponse(message);

        // Add realistic delay for better UX
        setTimeout(() => {
            hideTypingIndicator();
            addBotMessage(response);
        }, 1000 + Math.random() * 1500);

    } catch (error) {
        console.error("Error processing message:", error);
        hideTypingIndicator();
        addBotMessage("I apologize, but I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, remember that I'm here to support you, and if this is an emergency, please contact 988 (Suicide & Crisis Lifeline) immediately.");
    }
}

// Enhanced AI Response Generation with Backend API
async function generateAIResponse(userMessage) {
    try {
        // Call backend /chat endpoint
        const response = await fetch(`${BACKEND_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                user_id: getCurrentUserId(),
                voice_input: false
            })
        });

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }

        const result = await response.json();

        // Log the backend response for debugging
        console.log('Backend Response:', {
            emotion: result.emotion,
            intensity: result.intensity,
            strategy: result.strategy,
            response_preview: result.response.substring(0, 100)
        });

        return result.response;

    } catch (error) {
        console.error("Backend API error:", error);
        updateConnectionStatus(false);

        // Only use fallback for true errors, not normal operation
        return generateErrorResponse(userMessage, error);
    }
}

// Get current user ID (from localStorage or generate new one)
function getCurrentUserId() {
    let userId = localStorage.getItem('mentaura_user_id');
    if (!userId) {
        userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem('mentaura_user_id', userId);
    }
    return userId;
}

// Error Response Handler
function generateErrorResponse(userMessage, error) {
    const lowerMessage = userMessage.toLowerCase();

    // CRITICAL: Always check for crisis keywords first (safety priority)
    const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'end it all', 'not worth living', 'better off dead', 'want to die'];
    for (const keyword of crisisKeywords) {
        if (lowerMessage.includes(keyword)) {
            return "I'm very concerned about what you've shared. Your life has value, and help is available right now. Please reach out immediately:\n\n🚨 **National Suicide Prevention Lifeline: 988**\n🚨 **Crisis Text Line: Text HOME to 741741**\n🚨 **Emergency Services: 911**\n\nI care about your wellbeing, and there are people trained to help you through this difficult time. You don't have to face this alone.";
        }
    }

    // For non-crisis errors, provide a helpful message
    return "I apologize, but I'm having trouble connecting to my support systems right now. " +
        "This might be a temporary issue. Please try again in a moment.\n\n" +
        "If this is an emergency, please contact:\n" +
        "• 988 (Suicide & Crisis Lifeline)\n" +
        "• 911 (Emergency Services)\n" +
        "• Crisis Text Line: Text HOME to 741741\n\n" +
        "You can also reach out to a trusted friend, family member, or mental health professional.";
}

// Voice Input Functions
async function toggleVoiceInput() {
    const voiceBtn = document.getElementById('voiceBtn');

    if (!isVoiceRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                await processVoiceInput(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            isVoiceRecording = true;
            voiceBtn.classList.add('recording');
            voiceBtn.innerHTML = '🔴';
            voiceBtn.title = 'Stop recording';
            showNotification('Recording started... Click again to stop', 'info');

        } catch (error) {
            console.error('Error accessing microphone:', error);
            showNotification('Unable to access microphone. Please check permissions.', 'error');
        }
    } else {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            isVoiceRecording = false;
            voiceBtn.classList.remove('recording');
            voiceBtn.innerHTML = '🎤';
            voiceBtn.title = 'Voice input';
            showNotification('Processing voice input...', 'info');
        }
    }
}

async function processVoiceInput(audioBlob) {
    try {
        // Use Web Speech API for voice recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                const messageInput = document.getElementById('messageInput');
                messageInput.value = transcript;
                updateCharacterCount();
                updateSendButton();
                showNotification('Voice input ready! You can edit or send.', 'success');
            };

            recognition.onerror = function (event) {
                console.error('Speech recognition error:', event.error);
                showNotification('Could not process voice input. Please try typing instead.', 'error');
            };

            recognition.start();
        } else {
            showNotification('Speech recognition not supported in this browser.', 'error');
        }
    } catch (error) {
        console.error('Error processing voice input:', error);
        showNotification('Error processing voice input.', 'error');
    }
}

// Mental Health Assessment Functions
function startAssessment() {
    currentAssessmentStep = 0;
    assessmentAnswers = [];
    showAssessmentModal();
    displayAssessmentQuestion();
}

function showAssessmentModal() {
    const modal = document.getElementById('assessmentModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeAssessment() {
    const modal = document.getElementById('assessmentModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

function displayAssessmentQuestion() {
    const content = document.getElementById('assessmentContent');

    if (currentAssessmentStep < assessmentQuestions.length) {
        const question = assessmentQuestions[currentAssessmentStep];

        content.innerHTML = `
            <div class="assessment-question">
                <div style="margin-bottom: 1rem;">
                    <span style="color: #6366f1; font-weight: 600;">Question ${currentAssessmentStep + 1} of ${assessmentQuestions.length}</span>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="answer-options">
                    ${question.options.map((option, index) => `
                        <button class="answer-btn" onclick="selectAnswer(${option.score}, '${option.text}')">${option.text}</button>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        displayAssessmentResult();
    }
}

function selectAnswer(score, text) {
    assessmentAnswers.push({ score, text });
    currentAssessmentStep++;
    displayAssessmentQuestion();
}

function displayAssessmentResult() {
    const totalScore = assessmentAnswers.reduce((sum, answer) => sum + answer.score, 0);
    const maxScore = assessmentQuestions.length * 3;

    let riskLevel, icon, title, description, recommendations, className;

    if (totalScore <= maxScore * 0.33) {
        riskLevel = 'Low Risk';
        icon = '💚';
        title = 'Low Risk - Good Mental Health';
        description = 'Your responses suggest that you are currently managing well mentally. You show minimal signs of depression or anxiety symptoms.';
        recommendations = `
            <h4>Recommendations to maintain good mental health:</h4>
            <ul>
                <li>Continue your current self-care practices</li>
                <li>Maintain regular exercise and healthy eating habits</li>
                <li>Keep nurturing your social connections</li>
                <li>Practice stress management techniques</li>
                <li>Continue regular sleep schedule</li>
                <li>Consider occasional mental health check-ins</li>
            </ul>
        `;
        className = 'low-risk';
    } else if (totalScore <= maxScore * 0.66) {
        riskLevel = 'Moderate Risk';
        icon = '💛';
        title = 'Moderate Risk - Some Concerns';
        description = 'Your responses suggest you may be experiencing some mental health challenges that could benefit from attention and possibly professional support.';
        recommendations = `
            <h4>Recommendations for moderate mental health concerns:</h4>
            <ul>
                <li>Consider speaking with a counselor or therapist</li>
                <li>Implement daily stress-reduction activities</li>
                <li>Establish or maintain a regular exercise routine</li>
                <li>Practice mindfulness or meditation</li>
                <li>Reach out to supportive friends or family</li>
                <li>Monitor your symptoms and seek help if they worsen</li>
                <li>Consider joining a support group</li>
            </ul>
        `;
        className = 'moderate-risk';
    } else {
        riskLevel = 'High Risk';
        icon = '❤️';
        title = 'High Risk - Professional Help Recommended';
        description = 'Your responses suggest that you may be experiencing significant mental health challenges. It is strongly recommended that you seek professional help.';
        recommendations = `
            <h4>Immediate recommendations for high-risk concerns:</h4>
            <ul>
                <li><strong>Seek professional help immediately</strong> - contact a therapist, counselor, or your doctor</li>
                <li>Call 988 (Suicide & Crisis Lifeline) if you have thoughts of self-harm</li>
                <li>Reach out to trusted friends or family members</li>
                <li>Avoid isolation - stay connected with others</li>
                <li>Consider inpatient treatment if symptoms are severe</li>
                <li>Remove any means of self-harm from your environment</li>
                <li>Create a safety plan with a mental health professional</li>
            </ul>
        `;
        className = 'high-risk';
    }

    const content = document.getElementById('assessmentContent');
    content.innerHTML = `
        <div class="assessment-result ${className}">
            <div class="result-icon">${icon}</div>
            <div class="result-title">${title}</div>
            <div class="result-description">${description}</div>
            <div class="result-recommendations">${recommendations}</div>
            <div style="margin-top: 1.5rem;">
                <button onclick="closeAssessment()" style="background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; margin-right: 1rem;">Close</button>
                <button onclick="startNewConversation()" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">Talk to AI Assistant</button>
            </div>
        </div>
    `;

    // Save assessment result to conversation history
    saveAssessmentResult(riskLevel, totalScore, maxScore);
}

function saveAssessmentResult(riskLevel, score, maxScore) {
    const assessmentData = {
        type: 'assessment',
        riskLevel: riskLevel,
        score: score,
        maxScore: maxScore,
        timestamp: new Date(),
        title: `Mental Health Assessment - ${riskLevel}`
    };

    saveToConversationHistory(assessmentData);
}

function startNewConversation() {
    closeAssessment();
    const messageInput = document.getElementById('messageInput');
    messageInput.value = "I just completed the mental health assessment. Can you help me understand my results and suggest next steps?";
    updateCharacterCount();
    updateSendButton();
    messageInput.focus();
}

// Conversation History Management
function saveToConversationHistory(messageData) {
    // Get existing conversation history from localStorage
    let conversations = JSON.parse(localStorage.getItem('mentaura_conversations') || '[]');

    // Get today's conversation
    const today = new Date().toDateString();
    let todayConversation = conversations.find(conv => conv.date === today);

    if (!todayConversation) {
        todayConversation = {
            id: generateConversationId(),
            date: today,
            title: generateConversationTitle(messageData),
            messages: [],
            lastActivity: new Date().toISOString()
        };
        conversations.unshift(todayConversation);
    }

    todayConversation.messages.push(messageData);
    todayConversation.lastActivity = new Date().toISOString();

    // Update title if it's a generic one and we have more context
    if (todayConversation.messages.length > 2 && todayConversation.title.startsWith('Conversation')) {
        todayConversation.title = generateConversationTitle(todayConversation.messages[1]);
    }

    // Keep only the most recent 50 conversations
    conversations = conversations.slice(0, 50);

    localStorage.setItem('mentaura_conversations', JSON.stringify(conversations));
    updateRecentConversationsUI();
}

function generateConversationId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateConversationTitle(messageData) {
    if (messageData.type === 'assessment') {
        return messageData.title;
    }

    if (messageData.type === 'user' && messageData.message) {
        const message = messageData.message.toLowerCase();

        if (message.includes('anxiety') || message.includes('anxious')) return 'Anxiety Support Session';
        if (message.includes('depression') || message.includes('depressed')) return 'Depression Support Session';
        if (message.includes('stress')) return 'Stress Management Session';
        if (message.includes('sleep')) return 'Sleep Issues Discussion';
        if (message.includes('relationship')) return 'Relationship Support Session';
        if (message.includes('panic')) return 'Panic Attack Support';
        if (message.includes('self-esteem') || message.includes('confidence')) return 'Self-Esteem Building';

        // Extract first few words as title
        const words = messageData.message.split(' ').slice(0, 4).join(' ');
        return words.length > 30 ? words.substring(0, 27) + '...' : words;
    }

    return `Conversation on ${new Date().toLocaleDateString()}`;
}

function loadConversationHistory() {
    updateRecentConversationsUI();
}

function updateRecentConversationsUI() {
    const conversations = JSON.parse(localStorage.getItem('mentaura_conversations') || '[]');
    const container = document.getElementById('recentConversations');

    if (conversations.length === 0) {
        container.innerHTML = '<p style="color: #64748b; text-align: center; padding: 1rem;">No recent conversations yet</p>';
        return;
    }

    container.innerHTML = conversations.slice(0, 10).map(conv => `
        <div class="conversation-item" onclick="loadConversation('${conv.id}')">
            <div class="conversation-title">${conv.title}</div>
            <div class="conversation-preview">${getConversationPreview(conv)}</div>
            <div class="conversation-time">${formatRelativeTime(conv.lastActivity)}</div>
        </div>
    `).join('');
}

function getConversationPreview(conversation) {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage && lastMessage.message) {
        const preview = lastMessage.message.substring(0, 80);
        return preview.length < lastMessage.message.length ? preview + '...' : preview;
    }
    return `${conversation.messages.length} messages`;
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return then.toLocaleDateString();
}

function loadConversation(conversationId) {
    const conversations = JSON.parse(localStorage.getItem('mentaura_conversations') || '[]');
    const conversation = conversations.find(conv => conv.id === conversationId);

    if (!conversation) {
        showNotification('Conversation not found', 'error');
        return;
    }

    // Clear current chat
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    // Add conversation title
    const titleElement = document.createElement('div');
    titleElement.style.cssText = 'background: #6366f1; color: white; padding: 1rem; margin-bottom: 1rem; border-radius: 12px; text-align: center; font-weight: 600;';
    titleElement.textContent = `📋 Loaded: ${conversation.title}`;
    chatMessages.appendChild(titleElement);

    // Load messages
    conversation.messages.forEach(messageData => {
        if (messageData.type === 'user' || messageData.type === 'bot') {
            const messageElement = createMessageElement(messageData.message, messageData.type);
            chatMessages.appendChild(messageElement);
        } else if (messageData.type === 'assessment') {
            const assessmentElement = document.createElement('div');
            assessmentElement.style.cssText = 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 1rem; margin: 1rem 0; border-radius: 12px; text-align: center;';
            assessmentElement.innerHTML = `
                <strong>🧠 ${messageData.title}</strong><br>
                <small>Score: ${messageData.score}/${messageData.maxScore}</small>
            `;
            chatMessages.appendChild(assessmentElement);
        }
    });

    scrollToBottom();
    showNotification(`Loaded conversation: ${conversation.title}`, 'success');
}

function clearConversationHistory() {
    if (confirm('Are you sure you want to clear all conversation history? This action cannot be undone.')) {
        localStorage.removeItem('mentaura_conversations');
        updateRecentConversationsUI();
        showNotification('Conversation history cleared', 'success');
        closeSettings();
    }
}

// Settings Functions
function showSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Utility Functions
function showTypingIndicator() {
    isTyping = true;
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.add('show');
        scrollToBottom();
    }
}

function hideTypingIndicator() {
    isTyping = false;
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.classList.remove('show');
    }
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

function updateCharacterCount() {
    const messageInput = document.getElementById('messageInput');
    const charCount = document.getElementById('charCount');

    if (messageInput && charCount) {
        const count = messageInput.value.length;
        charCount.textContent = count;

        if (count > 800) {
            charCount.style.color = '#dc2626';
        } else if (count > 600) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = 'var(--gray-500)';
        }
    }
}

function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

function updateSendButton() {
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');

    if (sendBtn && messageInput) {
        const hasContent = messageInput.value.trim().length > 0;
        sendBtn.disabled = !hasContent || isTyping;
        sendBtn.style.opacity = hasContent && !isTyping ? '1' : '0.5';
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function updateConnectionStatus(isConnected) {
    const status = document.getElementById('connectionStatus');
    if (status) {
        if (isConnected) {
            status.innerHTML = '<div class="status-dot"></div>MentAura AI • Online • Ready to help';
            status.style.color = '#10b981';
        } else {
            status.innerHTML = '<div class="status-dot" style="background: #ef4444;"></div>MentAura AI • Offline Mode • Limited Features';
            status.style.color = '#ef4444';
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Close modals when clicking outside
window.onclick = function (event) {
    const assessmentModal = document.getElementById('assessmentModal');
    const settingsModal = document.getElementById('settingsModal');

    if (event.target === assessmentModal) {
        closeAssessment();
    }
    if (event.target === settingsModal) {
        closeSettings();
    }
}