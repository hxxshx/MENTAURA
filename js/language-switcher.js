// Enhanced Language Switcher for MentAura
// Complete multilingual support with fallback translation system
// Supports: English, Hindi, and Kashmiri

// Language Data Object containing all translations
const languageData = {
    'en': {
        // Navigation
        'nav_home': 'Home',
        'nav_services': 'Services',
        'nav_ai_chat': 'AI Chat',
        'nav_book_session': 'Book Session',
        'nav_resources': 'Resources',
        'nav_community': 'Community',
        'nav_admin': 'Admin Dashboard',
        'btn_signup': 'Sign Up',
        'btn_login': 'Login',
        'btn_logout': 'Logout',

        // Homepage
        'hero_title': 'MENTAURA',
        'hero_tagline': 'Your Mental Health Journey Starts Here',
        'hero_subtitle': 'Professional counseling, AI-powered support, and a supportive community to help you thrive.',
        'hero_location': 'Jammu & Kashmir',
        'btn_book_session': 'Book a Session',
        'btn_try_ai': 'Try AI Chat',

        // Services Section
        'services_title': 'Our Services',
        'service_counseling_title': 'Professional Counseling',
        'service_counseling_desc': 'One-on-one sessions with licensed mental health professionals tailored to your needs.',
        'service_ai_title': 'AI-Powered Support',
        'service_ai_desc': '24/7 AI chatbot providing immediate support and guidance whenever you need it.',
        'service_community_title': 'Community Forum',
        'service_community_desc': 'Connect with others on similar journeys in our supportive and moderated community.',
        'service_resources_title': 'Mental Health Resources',
        'service_resources_desc': 'Access to articles, guides, and tools to support your mental wellness journey.',
        'service_admin_title': 'Admin Dashboard',
        'service_admin_desc': 'Comprehensive management tools for administrators to monitor and manage the platform.',
        'service_learn_more': 'Learn More',
        'service_try_now': 'Try Now',
        'service_join_community': 'Join Community',
        'service_explore_resources': 'Explore Resources',
        'service_access_dashboard': 'Access Dashboard',

        // Features Section
        'features_title': 'Why Choose MentAura?',
        'feature_privacy_title': 'Privacy & Security',
        'feature_privacy_desc': 'Your data is protected with enterprise-grade security and complete confidentiality.',
        'feature_scheduling_title': 'Flexible Scheduling',
        'feature_scheduling_desc': 'Book sessions at your convenience with our flexible scheduling system.',
        'feature_mobile_title': 'Mobile Friendly',
        'feature_mobile_desc': 'Access support anywhere, anytime with our mobile-optimized platform.',
        'feature_licensed_title': 'Licensed Professionals',
        'feature_licensed_desc': 'All our counselors are licensed and experienced mental health professionals.',

        // CTA Section
        'cta_title': 'Ready to Start Your Mental Health Journey?',
        'cta_subtitle': 'Take the first step towards better mental health today.',
        'cta_book_first': 'Book Your First Session',
        'cta_try_ai_support': 'Try AI Support',

        // Footer
        'footer_tagline': 'Your trusted partner in mental health and wellness.',
        'footer_support': 'Support',
        'footer_help_center': 'Help Center',
        'footer_contact_us': 'Contact Us',
        'footer_privacy_policy': 'Privacy Policy',
        'footer_terms_service': 'Terms of Service',
        'footer_contact_info': 'Contact Info',
        'footer_copyright': '© 2025 MentAura. All rights reserved.',

        // Modal Forms
        'modal_login_title': 'Login',
        'modal_signup_title': 'Sign Up',
        'modal_email': 'Email',
        'modal_password': 'Password',
        'modal_full_name': 'Full Name',
        'modal_confirm_password': 'Confirm Password',
        'modal_login_btn': 'Login',
        'modal_signup_btn': 'Sign Up',
        'modal_no_account': "Don't have an account?",
        'modal_create_one': 'Create one',
        'modal_have_account': 'Already have an account?',

        // AI Chat Page
        'ai_chat_title': 'AI Mental Health Assistant',
        'ai_status': 'Online • Ready to help',
        'ai_welcome_title': 'Welcome to MentAura AI!',
        'ai_welcome_desc': "I'm here to provide mental health support and guidance. I can help with anxiety, stress, depression, relationships, and general wellness. How are you feeling today?",
        'ai_chat_placeholder': 'Share what\'s on your mind... I\'m here to listen and help.',
        'ai_capability_support': 'Mental Health Support',
        'ai_capability_listening': 'Active Listening',
        'ai_capability_guidance': 'Personalized Guidance',
        'ai_capability_resources': 'Resource Recommendations',
        'quick_start_topics': 'Quick Start Topics',
        'feeling_anxious': 'Feeling Anxious',
        'depression_support': 'Depression Support',
        'stress_management': 'Stress Management',
        'relationship_issues': 'Relationship Issues',
        'sleep_problems': 'Sleep Problems',
        'build_habits': 'Build Habits',
        'try_asking': 'Try asking about:',
        'managing_anxiety': 'Managing anxiety',
        'self_care_tips': 'Self-care tips',
        'coping_strategies': 'Coping strategies',
        'recent_conversations': 'Recent Conversations',
        'quick_resources': 'Quick Resources',
        'mental_health_articles': 'Mental Health Articles',
        'evidence_guides': 'Evidence-based guides and tips',
        'book_professional': 'Book Professional Session',
        'schedule_therapists': 'Schedule with licensed therapists',
        'community_support': 'Community Support',
        'connect_others': 'Connect with others on similar journeys',
        'help_center': 'Help Center',
        'faqs_support': 'FAQs and support documentation',
        'crisis_support': 'Crisis Support',
        'crisis_desc': "If you're in immediate danger or having thoughts of self-harm, please reach out for help immediately.",
        'emergency_services': 'Emergency Services',
        'crisis_text_line': 'Crisis Text Line',
        'text_home': 'Text HOME to 741741',
        'suicide_prevention': 'National Suicide Prevention',

        // Booking Page
        'booking_title': 'Book Session',
        'book_new_session': 'Book Session',
        'book_new_desc': 'Schedule a new counseling session with our professional therapists. Free and confidential support.',
        'book_now': 'Book Now',
        'live_session': 'Live Session',
        'live_session_desc': 'Join live sessions instantly with available counselors or enter your scheduled session at the right time.',
        'join_instant': 'Join Instant Session',
        'join_scheduled': 'Join Scheduled Session',
        'upcoming_sessions': 'Upcoming Sessions',
        'upcoming_desc': 'View all your booked sessions that are yet to be attended. Manage your schedule effectively.',
        'schedule_session': 'Schedule Session',
        'previous_sessions': 'Previous Sessions',
        'previous_desc': 'View details of your past counseling sessions and track your mental health journey.',
        'book_first_session': 'Book Your First Session',
        'session_recordings': 'Session Recordings',
        'recordings_desc': 'Access recordings of your previous sessions for reference and reflection with your consent.',
        'no_recordings': 'No Recordings',
        'emergency_911': 'Emergency 911',
        'crisis_line_988': 'Crisis Line 988',

        // Resources Page
        'resources_title': 'Mental Health Resources',
        'resources_videos': 'Videos',
        'resources_articles': 'Articles',
        'resources_games': 'Mental Games',
        'resources_meditation': 'Meditation',
        'resources_journaling': 'Journaling',
        'resources_hygiene': 'Self Care',
        'video_resources_title': 'Multilingual Video Resources',
        'video_resources_desc': 'Watch helpful videos in your preferred language to overcome stress, anxiety, and psychological challenges',
        'all_languages': 'All Languages',
        'language_english': 'English',
        'language_urdu': 'Urdu',
        'language_hindi': 'Hindi',
        'language_kashmiri': 'Kashmiri',
        'language_dogri': 'Dogri',
        'filter_by_language': 'Filter by Language:',
        'articles_section_title': 'Mental Health Articles',
        'articles_section_desc': 'Evidence-based articles and guides for mental wellness',
        'meditation_section_title': 'Guided Meditation',
        'meditation_section_desc': 'Peaceful meditation sessions for stress relief and mindfulness',
        'games_section_title': 'Mental Wellness Games',
        'games_section_desc': 'Interactive activities to boost cognitive function and mood',
        'journaling_section_title': 'Journaling Tools',
        'journaling_section_desc': 'Structured prompts and templates for emotional reflection',
        'self_care_section_title': 'Self-Care Resources',
        'self_care_section_desc': 'Practical tips and routines for daily mental health maintenance',

        // Forum Page
        'forum_title': 'Community Forum',
        'forum_subtitle': 'Connect with others on their mental health journey',
        'forum_desc': 'Share experiences, find support, and build meaningful connections in our safe community.',
        'new_post': 'New Post',
        'private_chat': 'Private Chat',
        'recent_posts': 'Recent Posts',
        'discussion_categories': 'Discussion Categories',
        'community_guidelines': 'Community Guidelines',
        'members': 'Members',
        'posts': 'Posts',
        'replies': 'Replies',
        'general_discussion': 'General Discussion',
        'anxiety_support': 'Anxiety Support',
        'depression_help': 'Depression Help',
        'relationship_advice': 'Relationship Advice',
        'self_improvement': 'Self Improvement',
        'success_stories': 'Success Stories',

        // Help Center
        'help_title': 'Help Center',
        'help_subtitle': 'Find answers to frequently asked questions and get support.',
        'back_to_home': 'Back to Home',
        'faq_title': 'Frequently Asked Questions',
        'still_need_help': 'Still need help?',
        'contact_support': 'Contact Us',

        // Contact Page
        'contact_title': 'Contact Us',
        'contact_subtitle': 'Get in touch with our support team.',
        'send_query': 'Send Us Your Query',
        'contact_full_name': 'Full Name',
        'contact_email': 'Email Address',
        'contact_subject': 'Subject',
        'contact_message': 'Message',
        'send_message': 'Send Message',

        // Admin Dashboard
        'admin_title': 'ADMIN DASHBOARD',
        'counsellor_management': 'Counsellor Management Portal',
        'admin_desc': 'Monitor clients, manage appointments, track interactions, and post to community forums.',
        'total_clients': 'Total Clients',
        'todays_appointments': 'Today\'s Appointments',
        'active_chats': 'Active Chat Sessions',
        'forum_posts': 'Forum Posts',
        'client_management': 'Client Management',
        'todays_schedule': 'Today\'s Schedule',
        'active_conversations': 'Active Conversations',
        'community_forum': 'Community Forum',
        'quick_actions': 'Quick Actions',
        'recent_activity': 'Recent Activity',

        // Privacy Policy Page
        'privacy_title': 'Privacy Policy',
        'privacy_subtitle': 'How we collect, use, and protect your information',
        'last_updated': 'Last updated',

        // Terms of Service Page
        'terms_title': 'Terms of Service',
        'terms_subtitle': 'Terms and conditions for using MentAura services'
    },

    'hi': {
        // Navigation
        'nav_home': 'होम',
        'nav_services': 'सेवाएं',
        'nav_ai_chat': 'एआई चैट',
        'nav_book_session': 'सत्र बुक करें',
        'nav_resources': 'संसाधन',
        'nav_community': 'समुदाय',
        'nav_admin': 'एडमिन डैशबोर्ड',
        'btn_signup': 'साइन अप',
        'btn_login': 'लॉगिन',
        'btn_logout': 'लॉगआउट',

        // Homepage
        'hero_title': 'मेंटऔरा',
        'hero_tagline': 'आपकी मानसिक स्वास्थ्य यात्रा यहाँ शुरू होती है',
        'hero_subtitle': 'पेशेवर परामर्श, एआई-संचालित सहायता, और एक सहायक समुदाय आपको फलने-फूलने में मदद करने के लिए।',
        'hero_location': 'जम्मू कश्मीर',
        'btn_book_session': 'सत्र बुक करें',
        'btn_try_ai': 'एआई चैट आज़माएं',

        // Services Section
        'services_title': 'हमारी सेवाएं',
        'service_counseling_title': 'पेशेवर परामर्श',
        'service_counseling_desc': 'लाइसेंसशुदा मानसिक स्वास्थ्य पेशेवरों के साथ व्यक्तिगत सत्र जो आपकी आवश्यकताओं के अनुरूप हों।',
        'service_ai_title': 'एआई-संचालित सहायता',
        'service_ai_desc': '24/7 एआई चैटबॉट जो जब भी आपको जरूरत हो तत्काल सहायता और मार्गदर्शन प्रदान करता है।',
        'service_community_title': 'कम्युनिटी फोरम',
        'service_community_desc': 'हमारे सहायक और नियंत्रित समुदाय में समान यात्रा पर अन्य लोगों से जुड़ें।',
        'service_resources_title': 'मानसिक स्वास्थ्य संसाधन',
        'service_resources_desc': 'आपकी मानसिक कल्याण यात्रा का समर्थन करने के लिए लेख, गाइड और टूल तक पहुंच।',
        'service_admin_title': 'एडमिन डैशबोर्ड',
        'service_admin_desc': 'प्लेटफॉर्म की निगरानी और प्रबंधन के लिए व्यापक प्रबंधन उपकरण।',
        'service_learn_more': 'और जानें',
        'service_try_now': 'अभी आज़माएं',
        'service_join_community': 'समुदाय में शामिल हों',
        'service_explore_resources': 'संसाधन देखें',
        'service_access_dashboard': 'डैशबोर्ड तक पहुंच',

        // Features Section
        'features_title': 'मेंटऔरा क्यों चुनें?',
        'feature_privacy_title': 'गोपनीयता और सुरक्षा',
        'feature_privacy_desc': 'आपका डेटा एंटरप्राइज़-ग्रेड सुरक्षा और पूर्ण गोपनीयता के साथ सुरक्षित है।',
        'feature_scheduling_title': 'लचीला शेड्यूलिंग',
        'feature_scheduling_desc': 'हमारे लचीले शेड्यूलिंग सिस्टम के साथ अपनी सुविधा के अनुसार सत्र बुक करें।',
        'feature_mobile_title': 'मोबाइल फ्रेंडली',
        'feature_mobile_desc': 'हमारे मोबाइल-अनुकूलित प्लेटफॉर्म के साथ कहीं भी, कभी भी सहायता प्राप्त करें।',
        'feature_licensed_title': 'लाइसेंसशुदा पेशेवर',
        'feature_licensed_desc': 'हमारे सभी काउंसलर लाइसेंसशुदा और अनुभवी मानसिक स्वास्थ्य पेशेवर हैं।',

        // CTA Section
        'cta_title': 'अपनी मानसिक स्वास्थ्य यात्रा शुरू करने के लिए तैयार हैं?',
        'cta_subtitle': 'आज ही बेहतर मानसिक स्वास्थ्य की दिशा में पहला कदम उठाएं।',
        'cta_book_first': 'अपना पहला सत्र बुक करें',
        'cta_try_ai_support': 'एआई सहायता आज़माएं',

        // Footer
        'footer_tagline': 'मानसिक स्वास्थ्य और कल्याण में आपका भरोसेमंद साझेदार।',
        'footer_support': 'सहायता',
        'footer_help_center': 'हेल्प सेंटर',
        'footer_contact_us': 'संपर्क करें',
        'footer_privacy_policy': 'गोपनीयता नीति',
        'footer_terms_service': 'सेवा की शर्तें',
        'footer_contact_info': 'संपर्क जानकारी',
        'footer_copyright': '© 2025 मेंटऔरा। सभी अधिकार सुरक्षित।',

        // Modal Forms
        'modal_login_title': 'लॉगिन',
        'modal_signup_title': 'साइन अप',
        'modal_email': 'ईमेल',
        'modal_password': 'पासवर्ड',
        'modal_full_name': 'पूरा नाम',
        'modal_confirm_password': 'पासवर्ड की पुष्टि करें',
        'modal_login_btn': 'लॉगिन',
        'modal_signup_btn': 'साइन अप',
        'modal_no_account': 'कोई खाता नहीं है?',
        'modal_create_one': 'एक बनाएं',
        'modal_have_account': 'पहले से खाता है?',

        // AI Chat Page
        'ai_chat_title': 'एआई मानसिक स्वास्थ्य सहायक',
        'ai_status': 'ऑनलाइन • मदद के लिए तैयार',
        'ai_welcome_title': 'मेंटऔरा एआई में आपका स्वागत है!',
        'ai_welcome_desc': 'मैं मानसिक स्वास्थ्य सहायता और मार्गदर्शन प्रदान करने के लिए यहाँ हूँ। मैं चिंता, तनाव, अवसाद, रिश्ते और सामान्य कल्याण में मदद कर सकता हूँ। आज आप कैसा महसूस कर रहे हैं?',
        'ai_chat_placeholder': 'अपने मन की बात साझा करें... मैं सुनने और मदद करने के लिए यहाँ हूँ।',
        'ai_capability_support': 'मानसिक स्वास्थ्य सहायता',
        'ai_capability_listening': 'सक्रिय श्रवण',
        'ai_capability_guidance': 'व्यक्तिगत मार्गदर्शन',
        'ai_capability_resources': 'संसाधन सिफारिशें',
        'quick_start_topics': 'त्वरित प्रारंभ विषय',
        'feeling_anxious': 'चिंतित महसूस करना',
        'depression_support': 'अवसाद सहायता',
        'stress_management': 'तनाव प्रबंधन',
        'relationship_issues': 'रिश्ते की समस्याएं',
        'sleep_problems': 'नींद की समस्याएं',
        'build_habits': 'आदतें बनाना',
        'try_asking': 'पूछने की कोशिश करें:',
        'managing_anxiety': 'चिंता का प्रबंधन',
        'self_care_tips': 'स्व-देखभाल के सुझाव',
        'coping_strategies': 'मुकाबला रणनीतियां',
        'recent_conversations': 'हाल की बातचीत',
        'quick_resources': 'त्वरित संसाधन',
        'mental_health_articles': 'मानसिक स्वास्थ्य लेख',
        'evidence_guides': 'साक्ष्य-आधारित गाइड और सुझाव',
        'book_professional': 'पेशेवर सत्र बुक करें',
        'schedule_therapists': 'लाइसेंसशुदा चिकित्सकों के साथ शेड्यूल करें',
        'community_support': 'समुदायिक सहायता',
        'connect_others': 'समान यात्रा पर अन्य लोगों से जुड़ें',
        'help_center': 'हेल्प सेंटर',
        'faqs_support': 'अक्सर पूछे जाने वाले प्रश्न और सहायता दस्तावेज',
        'crisis_support': 'संकट सहायता',
        'crisis_desc': 'यदि आप तत्काल खतरे में हैं या आत्महत्या के विचार आ रहे हैं, तो तुरंत मदद के लिए संपर्क करें।',
        'emergency_services': 'आपातकालीन सेवाएं',
        'crisis_text_line': 'क्राइसिस टेक्स्ट लाइन',
        'text_home': '741741 पर HOME भेजें',
        'suicide_prevention': 'राष्ट्रीय आत्महत्या रोकथाम',

        // Booking Page
        'booking_title': 'सत्र बुक करें',
        'book_new_session': 'सत्र बुक करें',
        'book_new_desc': 'हमारे पेशेवर चिकित्सकों के साथ एक नया परामर्श सत्र निर्धारित करें। निःशुल्क और गोपनीय सहायता।',
        'book_now': 'अभी बुक करें',
        'live_session': 'लाइव सत्र',
        'live_session_desc': 'उपलब्ध काउंसलर के साथ तुरंत लाइव सत्र में शामिल हों या सही समय पर अपने निर्धारित सत्र में प्रवेश करें।',
        'join_instant': 'तत्काल सत्र में शामिल हों',
        'join_scheduled': 'निर्धारित सत्र में शामिल हों',
        'upcoming_sessions': 'आगामी सत्र',
        'upcoming_desc': 'अपने सभी बुक किए गए सत्र देखें जिनमें अभी भी भाग लेना है। अपने शेड्यूल को प्रभावी रूप से प्रबंधित करें।',
        'schedule_session': 'सत्र निर्धारित करें',
        'previous_sessions': 'पिछले सत्र',
        'previous_desc': 'अपने पिछले परामर्श सत्रों का विवरण देखें और अपनी मानसिक स्वास्थ्य यात्रा को ट्रैक करें।',
        'book_first_session': 'अपना पहला सत्र बुक करें',
        'session_recordings': 'सत्र रिकॉर्डिंग',
        'recordings_desc': 'आपकी सहमति से संदर्भ और चिंतन के लिए अपने पिछले सत्रों की रिकॉर्डिंग तक पहुंच।',
        'no_recordings': 'कोई रिकॉर्डिंग नहीं',
        'emergency_911': 'आपातकाल 911',
        'crisis_line_988': 'संकट हेल्पलाइन 988',

        // Resources Page
        'resources_title': 'मानसिक स्वास्थ्य संसाधन',
        'resources_videos': 'वीडियो',
        'resources_articles': 'लेख',
        'resources_games': 'मानसिक खेल',
        'resources_meditation': 'ध्यान',
        'resources_journaling': 'जर्नलिंग',
        'resources_hygiene': 'स्व-देखभाल',
        'video_resources_title': 'बहुभाषी वीडियो संसाधन',
        'video_resources_desc': 'तनाव, चिंता और मनोवैज्ञानिक चुनौतियों पर काबू पाने के लिए अपनी पसंदीदा भाषा में उपयोगी वीडियो देखें',
        'all_languages': 'सभी भाषाएं',
        'language_english': 'अंग्रेजी',
        'language_urdu': 'उर्दू',
        'language_hindi': 'हिंदी',
        'language_kashmiri': 'कश्मीरी',
        'language_dogri': 'डोगरी',
        'filter_by_language': 'भाषा के अनुसार फ़िल्टर करें:',
        'articles_section_title': 'मानसिक स्वास्थ्य लेख',
        'articles_section_desc': 'मानसिक कल्याण के लिए साक्ष्य-आधारित लेख और गाइड',
        'meditation_section_title': 'निर्देशित ध्यान',
        'meditation_section_desc': 'तनाव राहत और माइंडफुलनेस के लिए शांतिपूर्ण ध्यान सत्र',
        'games_section_title': 'मानसिक कल्याण खेल',
        'games_section_desc': 'संज्ञानात्मक कार्यों और मूड को बढ़ाने के लिए इंटरैक्टिव गतिविधियां',
        'journaling_section_title': 'जर्नलिंग उपकरण',
        'journaling_section_desc': 'भावनात्मक चिंतन के लिए संरचित संकेत और टेम्प्लेट',
        'self_care_section_title': 'स्व-देखभाल संसाधन',
        'self_care_section_desc': 'दैनिक मानसिक स्वास्थ्य रखरखाव के लिए व्यावहारिक सुझाव और दिनचर्या',

        // Forum Page
        'forum_title': 'कम्युनिटी फोरम',
        'forum_subtitle': 'अपनी मानसिक स्वास्थ्य यात्रा पर दूसरों से जुड़ें',
        'forum_desc': 'अनुभव साझा करें, सहायता पाएं, और हमारे सुरक्षित समुदाय में सार्थक संबंध बनाएं।',
        'new_post': 'नई पोस्ट',
        'private_chat': 'निजी चैट',
        'recent_posts': 'हाल की पोस्टें',
        'discussion_categories': 'चर्चा श्रेणियां',
        'community_guidelines': 'समुदायिक दिशानिर्देश',
        'members': 'सदस्य',
        'posts': 'पोस्टें',
        'replies': 'उत्तर',
        'general_discussion': 'सामान्य चर्चा',
        'anxiety_support': 'चिंता सहायता',
        'depression_help': 'अवसाद सहायता',
        'relationship_advice': 'रिश्ते की सलाह',
        'self_improvement': 'आत्म-सुधार',
        'success_stories': 'सफलता की कहानियां',

        // Help Center
        'help_title': 'हेल्प सेंटर',
        'help_subtitle': 'अक्सर पूछे जाने वाले प्रश्नों के उत्तर खोजें और सहायता प्राप्त करें।',
        'back_to_home': 'होम पर वापस',
        'faq_title': 'अक्सर पूछे जाने वाले प्रश्न',
        'still_need_help': 'अभी भी सहायता चाहिए?',
        'contact_support': 'संपर्क करें',

        // Contact Page
        'contact_title': 'संपर्क करें',
        'contact_subtitle': 'हमारी सहायता टीम से संपर्क करें।',
        'send_query': 'हमें अपनी क्वेरी भेजें',
        'contact_full_name': 'पूरा नाम',
        'contact_email': 'ईमेल पता',
        'contact_subject': 'विषय',
        'contact_message': 'संदेश',
        'send_message': 'संदेश भेजें',

        // Admin Dashboard
        'admin_title': 'एडमिन डैशबोर्ड',
        'counsellor_management': 'काउंसलर प्रबंधन पोर्टल',
        'admin_desc': 'ग्राहकों की निगरानी करें, अपॉइंटमेंट प्रबंधित करें, इंटरैक्शन ट्रैक करें, और समुदायिक फोरम पर पोस्ट करें।',
        'total_clients': 'कुल ग्राहक',
        'todays_appointments': 'आज के अपॉइंटमेंट',
        'active_chats': 'सक्रिय चैट सत्र',
        'forum_posts': 'फोरम पोस्ट',
        'client_management': 'ग्राहक प्रबंधन',
        'todays_schedule': 'आज का शेड्यूल',
        'active_conversations': 'सक्रिय बातचीत',
        'community_forum': 'कम्युनिटी फोरम',
        'quick_actions': 'त्वरित कार्य',
        'recent_activity': 'हाल की गतिविधि',

        // Privacy Policy Page
        'privacy_title': 'गोपनीयता नीति',
        'privacy_subtitle': 'हम आपकी जानकारी कैसे एकत्रित, उपयोग और सुरक्षित करते हैं',
        'last_updated': 'अंतिम बार अपडेट किया गया',

        // Terms of Service Page
        'terms_title': 'सेवा की शर्तें',
        'terms_subtitle': 'मेंटऔरा सेवाओं का उपयोग करने के नियम और शर्तें'
    },

    'ta': {
        // Navigation (Tamil)
        'nav_home': 'முகப்பு',
        'nav_services': 'சேவைகள்',
        'nav_ai_chat': 'AI அரட்டை',
        'nav_book_session': 'அமர்வு முன்பதிவு',
        'nav_resources': 'வளங்கள்',
        'nav_community': 'சமூகம்',
        'nav_admin': 'நிர்வாக குழு',
        'btn_signup': 'பதிவு செய்க',
        'btn_login': 'உள்நுழைய',
        'btn_logout': 'வெளியேறு',

        // Homepage
        'hero_title': 'MENTAURA',
        'hero_tagline': 'உங்கள் மனநல பயணம் இங்கே தொடங்குகிறது',
        'hero_subtitle': 'தொழில்முறை ஆலோசனை, AI-ஆற்றல் ஆதரவு மற்றும் நீங்கள் சிறந்து விளங்க உதவும் ஆதரவான சமூகம்.',
        'hero_location': 'ஜம்மு & காஷ்மீர்',
        'btn_book_session': 'அமர்வை முன்பதிவு செய்யுங்கள்',
        'btn_try_ai': 'AI அரட்டையை முயற்சிக்கவும்',

        // Services Section
        'services_title': 'எங்கள் சேவைகள்',
        'service_counseling_title': 'தொழில்முறை ஆலோசனை',
        'service_counseling_desc': 'உங்கள் தேவைகளுக்கு ஏற்ற உரிமம் பெற்ற மனநல நிபுணர்களுடன் ஒருவருக்கொருவர் அமர்வுகள்.',
        'service_ai_title': 'AI-ஆற்றல் ஆதரவு',
        'service_ai_desc': 'உங்களுக்குத் தேவைப்படும் போதெல்லாம் உடனடி ஆதரவையும் வழிகாட்டுதலையும் வழங்கும் 24/7 AI சாட்போட்.',
        'service_community_title': 'சமூக மன்றம்',
        'service_community_desc': 'எங்கள் ஆதரவான மற்றும் நிர்வகிக்கப்பட்ட சமூகத்தில் இதேபோன்ற பயணங்களில் மற்றவர்களுடன் இணைந்திருங்கள்.',
        'service_resources_title': 'மனநல வளங்கள்',
        'service_resources_desc': 'உங்கள் மனநல பயணத்தை ஆதரிக்க கட்டுரைகள், வழிகாட்டிகள் மற்றும் கருவிகளுக்கான அணுகல்.',
        'service_admin_title': 'நிர்வாக டாஷ்போர்டு',
        'service_admin_desc': 'நிர்வாகிகள் தளத்தை கண்காணிக்கவும் நிர்வகிக்கவும் விரிவான மேலாண்மை கருவிகள்.',
        'service_learn_more': 'மேலும் அறிக',
        'service_try_now': 'இப்போது முயற்சிக்கவும்',
        'service_join_community': 'சமூகத்தில் சேரவும்',
        'service_explore_resources': 'வளங்களை ஆராயுங்கள்',
        'service_access_dashboard': 'டாஷ்போர்டை அணுகவும்',

        // Features Section
        'features_title': 'MentAura ஐ ஏன் தேர்வு செய்ய வேண்டும்?',
        'feature_privacy_title': 'தனியுரிமை & பாதுகாப்பு',
        'feature_privacy_desc': 'உங்கள் தரவு நிறுவன அளவிலான பாதுகாப்பு மற்றும் முழுமையான ரகசியத்தன்மையுடன் பாதுகாக்கப்படுகிறது.',
        'feature_scheduling_title': 'நெகிழ்வான திட்டமிடல்',
        'feature_scheduling_desc': 'எங்கள் நெகிழ்வான திட்டமிடல் அமைப்புடன் உங்கள் வசதிக்கேற்ப அமர்வுகளை முன்பதிவு செய்யுங்கள்.',
        'feature_mobile_title': 'மொபைல் நட்பு',
        'feature_mobile_desc': 'எங்கள் மொபைல்-உகந்த தளத்தின் மூலம் எங்கும், எந்த நேரத்திலும் ஆதரவை அணுகவும்.',
        'feature_licensed_title': 'உரிமம் பெற்ற வல்லுநர்கள்',
        'feature_licensed_desc': 'எங்கள் ஆலோசகர்கள் அனைவரும் உரிமம் பெற்ற மற்றும் அனுபவம் வாய்ந்த மனநல நிபுணர்கள்.',

        // CTA Section
        'cta_title': 'உங்கள் மனநல பயணத்தைத் தொடங்க தயாரா?',
        'cta_subtitle': 'சிறந்த மன ஆரோக்கியத்தை நோக்கி முதல் படியை இன்று எடுக்கவும்.',
        'cta_book_first': 'உங்கள் முதல் அமர்வை முன்பதிவு செய்யுங்கள்',
        'cta_try_ai_support': 'AI ஆதரவை முயற்சிக்கவும்',

        // Footer
        'footer_tagline': 'மனநலம் மற்றும் ஆரோக்கியத்தில் உங்கள் நம்பகமான கூட்டாளர்.',
        'footer_support': 'ஆதரவு',
        'footer_help_center': 'உதவி மையம்',
        'footer_contact_us': 'எங்களை தொடர்பு கொள்ள',
        'footer_privacy_policy': 'தனியுரிமை கொள்கை',
        'footer_terms_service': 'சேவை விதிமுறைகள்',
        'footer_contact_info': 'தொடர்பு தகவல்',
        'footer_copyright': '© 2025 MentAura. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

        // Modal Forms
        'modal_login_title': 'உள்நுழைய',
        'modal_signup_title': 'பதிவு செய்க',
        'modal_email': 'மின்னஞ்சல்',
        'modal_password': 'கடவுச்சொல்',
        'modal_full_name': 'முழு பெயர்',
        'modal_confirm_password': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
        'modal_login_btn': 'உள்நுழைய',
        'modal_signup_btn': 'பதிவு செய்க',
        'modal_no_account': 'கணக்கு இல்லையா?',
        'modal_create_one': 'ஒ ஒன்றை உருவாக்குங்கள்',
        'modal_have_account': 'ஏற்கனவே கணக்கு உள்ளதா?'
    },

    'te': {
        // Navigation (Telugu)
        'nav_home': 'హోమ్',
        'nav_services': 'సేవలు',
        'nav_ai_chat': 'AI చాట్',
        'nav_book_session': 'సెషన్ బుక్ చేయండి',
        'nav_resources': 'వనరులు',
        'nav_community': 'కమ్యూనిటీ',
        'nav_admin': 'అడ్మిన్ డాష్‌బోర్డ్',
        'btn_signup': 'సైన్ అప్',
        'btn_login': 'లాగిన్',
        'btn_logout': 'లాగౌట్',

        // Homepage
        'hero_title': 'MENTAURA',
        'hero_tagline': 'మీ మానసిక ఆరోగ్య ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది',
        'hero_subtitle': 'వృత్తిపరమైన కౌన్సెలింగ్, AI-ఆధారిత మద్దతు మరియు మీరు అభివృద్ధి చెందడానికి సహాయపడే సహాయక సంఘం.',
        'hero_location': 'జమ్మూ & కాశ్మీర్',
        'btn_book_session': 'సెషన్ బుక్ చేయండి',
        'btn_try_ai': 'AI చాట్‌ని ప్రయత్నించండి',

        // Services Section
        'services_title': 'మా సేవలు',
        'service_counseling_title': 'వృత్తిపరమైన కౌన్సెలింగ్',
        'service_counseling_desc': 'మీ అవసరాలకు అనుగుణంగా లైసెన్స్ పొందిన మానసిక ఆరోగ్య నిపుణులతో వన్-ఆన్-వన్ సెషన్‌లు.',
        'service_ai_title': 'AI-ఆధారిత మద్దతు',
        'service_ai_desc': '24/7 AI చాట్‌బాట్ మీకు అవసరమైనప్పుడు తక్షణ మద్దతు మరియు మార్గదర్శకత్వాన్ని అందిస్తుంది.',
        'service_community_title': 'కమ్యూనిటీ ఫోరమ్',
        'service_community_desc': 'మా సహాయక మరియు మోడరేట్ చేయబడిన సంఘంలో ఇలాంటి ప్రయాణాలలో ఇతరులతో కనెక్ట్ అవ్వండి.',
        'service_resources_title': 'మానసిక ఆరోగ్య వనరులు',
        'service_resources_desc': 'మీ మానసిక క్షేమ ప్రయాణానికి మద్దతుగా కథనాలు, గైడ్‌లు మరియు సాధనాలకు యాక్సెస్.',
        'service_admin_title': 'అడ్మిన్ డాష్‌బోర్డ్',
        'service_admin_desc': 'ప్లాట్‌ఫారమ్‌ను పర్యవేక్షించడానికి మరియు నిర్వహించడానికి నిర్వాహకుల కోసం సమగ్ర నిర్వహణ సాధనాలు.',
        'service_learn_more': 'మరింత తెలుసుకోండి',
        'service_try_now': 'ఇప్పుడే ప్రయత్నించండి',
        'service_join_community': 'కమ్యూనిటీలో చేరండి',
        'service_explore_resources': 'వనరులను అన్వేషించండి',
        'service_access_dashboard': 'డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి',

        // Features Section
        'features_title': 'MentAura ని ఎందుకు ఎంచుకోవాలి?',
        'feature_privacy_title': 'గోప్యత & భద్రత',
        'feature_privacy_desc': 'మీ డేటా ఎంటర్‌ప్రైజ్-గ్రేడ్ భద్రత మరియు పూర్తి గోప్యతతో రక్షించబడింది.',
        'feature_scheduling_title': 'ఫ్లెక్సిబుల్ షెడ్యూలింగ్',
        'feature_scheduling_desc': 'మా ఫ్లెక్సిబుల్ షెడ్యూలింగ్ సిస్టమ్‌తో మీ సౌలభ్యం మేరకు సెషన్‌లను బుక్ చేసుకోండి.',
        'feature_mobile_title': 'మొబైల్ ఫ్రెండ్లీ',
        'feature_mobile_desc': 'మా మొబైల్-ఆప్టిమైజ్ చేసిన ప్లాట్‌ఫారమ్‌తో ఎక్కడైనా, ఎప్పుడైనా మద్దతును పొందండి.',
        'feature_licensed_title': 'లైసెన్స్ పొందిన నిపుణులు',
        'feature_licensed_desc': 'మా కౌన్సిలర్లందరూ లైసెన్స్ పొందిన మరియు అనుభవజ్ఞులైన మానసిక ఆరోగ్య నిపుణులు.',

        // CTA Section
        'cta_title': 'మీ మానసిక ఆరోగ్య ప్రయాణాన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?',
        'cta_subtitle': 'ఈ రోజే మెరుగైన మానసిక ఆరోగ్యం వైపు మొదటి అడుగు వేయండి.',
        'cta_book_first': 'మీ మొదటి సెషన్‌ను బుక్ చేయండి',
        'cta_try_ai_support': 'AI మద్దతును ప్రయత్నించండి',

        // Footer
        'footer_tagline': 'మానసిక ఆరోగ్యం మరియు శ్రేయస్సులో మీ విశ్వసనీయ భాగస్వామి.',
        'footer_support': 'మద్దతు',
        'footer_help_center': 'సహాయ కేంద్రం',
        'footer_contact_us': 'మమ్మల్ని సంప్రదించండి',
        'footer_privacy_policy': 'గోప్యతా విధానం',
        'footer_terms_service': 'సేవా నిబంధనలు',
        'footer_contact_info': 'సంప్రదింపు సమాచారం',
        'footer_copyright': '© 2025 MentAura. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',

        // Modal Forms
        'modal_login_title': 'లాగిన్',
        'modal_signup_title': 'సైన్ అప్',
        'modal_email': 'ఇమెయిల్',
        'modal_password': 'పాస్‌వర్డ్',
        'modal_full_name': 'పూర్తి పేరు',
        'modal_confirm_password': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
        'modal_login_btn': 'లాగిన్',
        'modal_signup_btn': 'సైన్ అప్',
        'modal_no_account': 'ఖాతా లేదా?',
        'modal_create_one': 'ఒకటి సృష్టించండి',
        'modal_have_account': 'ఇప్పటికే ఖాతా ఉందా?'
    },

    'kn': {
        // Navigation (Kannada)
        'nav_home': 'ಮುಖಪುಟ',
        'nav_services': 'ಸೇವೆಗಳು',
        'nav_ai_chat': 'AI ಚಾಟ್',
        'nav_book_session': 'ಸೆಷನ್ ಕಾಯ್ದಿರಿಸಿ',
        'nav_resources': 'ಸಂಪನ್ಮೂಲಗಳು',
        'nav_community': 'ಸಮುದಾಯ',
        'nav_admin': 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        'btn_signup': 'ಸೈನ್ ಅಪ್',
        'btn_login': 'ಲಾಗಿನ್',
        'btn_logout': 'ಲಾಗೌಟ್',

        // Homepage
        'hero_title': 'MENTAURA',
        'hero_tagline': 'ನಿಮ್ಮ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
        'hero_subtitle': 'ವೃತ್ತಿಪರ ಸಮಾಲೋಚನೆ, AI-ಚಾಲಿತ ಬೆಂಬಲ ಮತ್ತು ನೀವು ಏಳಿಗೆ ಹೊಂದಲು ಸಹಾಯ ಮಾಡುವ ಬೆಂಬಲ ಸಮುದಾಯ.',
        'hero_location': 'ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ',
        'btn_book_session': 'ಸೆಷನ್ ಕಾಯ್ದಿರಿಸಿ',
        'btn_try_ai': 'AI ಚಾಟ್ ಪ್ರಯತ್ನಿಸಿ',

        // Services Section
        'services_title': 'ನಮ್ಮ ಸೇವೆಗಳು',
        'service_counseling_title': 'ವೃತ್ತಿಪರ ಸಮಾಲೋಚನೆ',
        'service_counseling_desc': 'ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಪರವಾನಗಿ ಪಡೆದ ಮಾನಸಿಕ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಸೆಷನ್‌ಗಳು.',
        'service_ai_title': 'AI-ಚಾಲಿತ ಬೆಂಬಲ',
        'service_ai_desc': 'ನಿಮಗೆ ಅಗತ್ಯವಿರುವಾಗ ತಕ್ಷಣದ ಬೆಂಬಲ ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುವ 24/7 AI ಚಾಟ್‌ಬಾಟ್.',
        'service_community_title': 'ಸಮುದಾಯ ವೇದಿಕೆ',
        'service_community_desc': 'ನಮ್ಮ ಬೆಂಬಲಿತ ಮತ್ತು ಮಾಡರೇಟ್ ಮಾಡಲಾದ ಸಮುದಾಯದಲ್ಲಿ ಇದೇ ರೀತಿಯ ಪ್ರಯಾಣದಲ್ಲಿರುವ ಇತರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
        'service_resources_title': 'ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಂಪನ್ಮೂಲಗಳು',
        'service_resources_desc': 'ನಿಮ್ಮ ಮಾನಸಿಕ ಯೋಗಕ್ಷೇಮ ಪ್ರಯಾಣವನ್ನು ಬೆಂಬಲಿಸಲು ಲೇಖನಗಳು, ಮಾರ್ಗದರ್ಶಿಗಳು ಮತ್ತು ಪರಿಕರಗಳಿಗೆ ಪ್ರವೇಶ.',
        'service_admin_title': 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        'service_admin_desc': 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ಮತ್ತು ನಿರ್ವಹಿಸಲು ನಿರ್ವಾಹಕರಿಗೆ ಸಮಗ್ರ ನಿರ್ವಹಣಾ ಪರಿಕರಗಳು.',
        'service_learn_more': 'ನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
        'service_try_now': 'ಈಗ ಪ್ರಯತ್ನಿಸಿ',
        'service_join_community': 'ಸಮುದಾಯವನ್ನು ಸೇರಿ',
        'service_explore_resources': 'ಸಂಪನ್ಮೂಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
        'service_access_dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ',

        // Features Section
        'features_title': 'MentAura ಅನ್ನು ಏಕೆ ಆರಿಸಬೇಕು?',
        'feature_privacy_title': 'ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ',
        'feature_privacy_desc': 'ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಎಂಟರ್‌ಪ್ರೈಸ್-ಗ್ರೇಡ್ ಭದ್ರತೆ ಮತ್ತು ಸಂಪೂರ್ಣ ಗೌಪ್ಯತೆಯೊಂದಿಗೆ ರಕ್ಷಿಸಲಾಗಿದೆ.',
        'feature_scheduling_title': 'ಹೊಂದಿಕೊಳ್ಳುವ ವೇಳಾಪಟ್ಟಿ',
        'feature_scheduling_desc': 'ನಮ್ಮ ಹೊಂದಿಕೊಳ್ಳುವ ವೇಳಾಪಟ್ಟಿ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ಸೆಷನ್‌ಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ.',
        'feature_mobile_title': 'ಮೊಬೈಲ್ ಸ್ನೇಹಿ',
        'feature_mobile_desc': 'ನಮ್ಮ ಮೊಬೈಲ್-ಆಪ್ಟಿಮೈಸ್ಡ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನೊಂದಿಗೆ ಎಲ್ಲಿಯಾದರೂ, ಯಾವಾಗ ಬೇಕಾದರೂ ಬೆಂಬಲವನ್ನು ಪ್ರವೇಶಿಸಿ.',
        'feature_licensed_title': 'ಪರವಾನಗಿ ಪಡೆದ ವೃತ್ತಿಪರರು',
        'feature_licensed_desc': 'ನಮ್ಮ ಎಲ್ಲಾ ಸಲಹೆಗಾರರು ಪರವಾನಗಿ ಪಡೆದ ಮತ್ತು ಅನುಭವಿ ಮಾನಸಿಕ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರು.',

        // CTA Section
        'cta_title': 'ನಿಮ್ಮ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
        'cta_subtitle': 'ಉತ್ತಮ ಮಾನಸಿಕ ಆರೋಗ್ಯದ ಕಡೆಗೆ ಮೊದಲ ಹೆಜ್ಜೆಯನ್ನಿಂದು ಇರಿಸಿ.',
        'cta_book_first': 'ನಿಮ್ಮ ಮೊದಲ ಸೆಷನ್ ಕಾಯ್ದಿರಿಸಿ',
        'cta_try_ai_support': 'AI ಬೆಂಬಲವನ್ನು ಪ್ರಯತ್ನಿಸಿ',

        // Footer
        'footer_tagline': 'ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮದಲ್ಲಿ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಪಾಲುದಾರ.',
        'footer_support': 'ಬೆಂಬಲ',
        'footer_help_center': 'ಸಹಾಯ ಕೇಂದ್ರ',
        'footer_contact_us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
        'footer_privacy_policy': 'ಗೌಪ್ಯತೆ ನೀತಿ',
        'footer_terms_service': 'ಸೇವಾ ನಿಯಮಗಳು',
        'footer_contact_info': 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
        'footer_copyright': '© 2025 MentAura. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',

        // Modal Forms
        'modal_login_title': 'ಲಾಗಿನ್',
        'modal_signup_title': 'ಸೈನ್ ಅಪ್',
        'modal_email': 'ಇಮೇಲ್',
        'modal_password': 'ಪಾಸ್‌ ವರ್ಡ್',
        'modal_full_name': 'ಪೂರ್ಣ ಹೆಸರು',
        'modal_confirm_password': 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
        'modal_login_btn': 'ಲಾಗಿನ್',
        'modal_signup_btn': 'ಸೈನ್ ಅಪ್',
        'modal_no_account': 'ಖಾತೆ ಇಲ್ಲವೇ?',
        'modal_create_one': 'ಒಂದನ್ನು ರಚಿಸಿ',
        'modal_have_account': 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?'
    },

    'ml': {
        // Navigation (Malayalam)
        'nav_home': 'ഹോം',
        'nav_services': 'സേവനങ്ങൾ',
        'nav_ai_chat': 'AI ചാറ്റ്',
        'nav_book_session': 'സെഷൻ ബുക്ക് ചെയ്യുക',
        'nav_resources': 'വിഭവങ്ങൾ',
        'nav_community': 'കമ്മ്യൂണിറ്റി',
        'nav_admin': 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
        'btn_signup': 'സൈൻ അപ്പ്',
        'btn_login': 'ലോഗിൻ',
        'btn_logout': 'ലോഗൗട്ട്',

        // Homepage
        'hero_title': 'MENTAURA',
        'hero_tagline': 'നിങ്ങളുടെ മാനസികാരോഗ്യ യാത്ര ഇവിടെ തുടങ്ങുന്നു',
        'hero_subtitle': 'പ്രൊഫഷണൽ കൗൺസിലിംഗ്, AI- പവർഡ് സപ്പോർട്ട്, നിങ്ങൾ വളരാൻ സഹായിക്കുന്ന ഒരു സഹായകരമായ കമ്മ്യൂണിറ്റി.',
        'hero_location': 'ജമ്മു & കശ്മീർ',
        'btn_book_session': 'ഒരു സെഷൻ ബുക്ക് ചെയ്യുക',
        'btn_try_ai': 'AI ചാറ്റ് പരീക്ഷിക്കുക',

        // Services Section
        'services_title': 'ഞങ്ങളുടെ സേവനങ്ങൾ',
        'service_counseling_title': 'പ്രൊഫഷണൽ കൗൺസിലിംഗ്',
        'service_counseling_desc': 'നിങ്ങളുടെ ആവശ്യങ്ങൾക്കനുസരിച്ച് ലൈസൻസുള്ള മാനസികാരോഗ്യ വിദഗ്ധരുമായുള്ള വൺ-ഓൺ-വൺ സെഷനുകൾ.',
        'service_ai_title': 'AI-പവർഡ് സപ്പോർട്ട്',
        'service_ai_desc': 'നിങ്ങൾക്ക് ആവശ്യമുള്ളപ്പോഴെല്ലാം ഉടനടി പിന്തുണയും മാർഗ്ഗനിർദ്ദേശവും നൽകുന്ന 24/7 AI ചാറ്റ്ബോട്ട്.',
        'service_community_title': 'കമ്മ്യൂണിറ്റി ഫോറം',
        'service_community_desc': 'ഞങ്ങളുടെ പിന്തുണയുള്ളതും നിയന്ത്രിതവുമായ കമ്മ്യൂണിറ്റിയിൽ സമാനമായ യാത്രകളിൽ മറ്റുള്ളവരുമായി ബന്ധപ്പെടുക.',
        'service_resources_title': 'മാനസികാരോഗ്യ വിഭവങ്ങൾ',
        'service_resources_desc': 'നിങ്ങളുടെ മാനസികാരോഗ്യ യാത്രയെ പിന്തുണയ്ക്കുന്നതിനുള്ള ലേഖനങ്ങൾ, ഗൈഡുകൾ, ഉപകരണങ്ങൾ എന്നിവയിലേക്കുള്ള ആക്സസ്.',
        'service_admin_title': 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
        'service_admin_desc': 'പ്ലാറ്റ്‌ഫോം നിരീക്ഷിക്കുന്നതിനും നിയന്ത്രിക്കുന്നതിനുമുള്ള അഡ്മിനിസ്ട്രേറ്റർമാർക്കുള്ള സമഗ്രമായ മാനേജ്‌മെന്റ് ടൂളുകൾ.',
        'service_learn_more': 'കൂടുതലറിയുക',
        'service_try_now': 'ഇപ്പോൾ ശ്രമിക്കുക',
        'service_join_community': 'കമ്മ്യൂണിറ്റിയിൽ ചേരുക',
        'service_explore_resources': 'വിഭവങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക',
        'service_access_dashboard': 'ഡാഷ്ബോർഡ് ആക്സസ് ചെയ്യുക',

        // Features Section
        'features_title': 'MentAura തിരഞ്ഞെടുക്കുന്നത് എന്തുകൊണ്ട്?',
        'feature_privacy_title': 'സ്വകാര്യതയും സുരക്ഷയും',
        'feature_privacy_desc': 'നിങ്ങളുടെ ഡാറ്റ എന്റർപ്രൈസ്-ഗ്രേഡ് സുരക്ഷയും പൂർണ്ണമായ രഹസ്യപ്പട്ടികയും ഉപയോഗിച്ച് പരിരക്ഷിച്ചിരിക്കുന്നു.',
        'feature_scheduling_title': 'ഫ്ലെക്സിബിൾ ഷെഡ്യൂളിംഗ്',
        'feature_scheduling_desc': 'ഞങ്ങളുടെ ഫ്ലെക്സിബിൾ ഷെഡ്യൂളിംഗ് സിസ്റ്റം ഉപയോഗിച്ച് നിങ്ങളുടെ സൗകര്യാർത്ഥം സെഷനുകൾ ബുക്ക് ചെയ്യുക.',
        'feature_mobile_title': 'മൊബൈൽ ഫ്രണ്ട്ലി',
        'feature_mobile_desc': 'ഞങ്ങളുടെ മൊബൈൽ ഒപ്റ്റിമൈസ് ചെയ്ത പ്ലാറ്റ്ഫോം ഉപയോഗിച്ച് എവിടെനിന്നും എപ്പോൾ വേണമെങ്കിലും പിന്തുണ ആക്സസ് ചെയ്യുക.',
        'feature_licensed_title': 'ലൈസൻസുള്ള പ്രൊഫഷണലുകൾ',
        'feature_licensed_desc': 'ഞങ്ങളുടെ എല്ലാ കൗൺസിലർമാരും ലൈസൻസുള്ളവരും പരിചയസമ്പന്നരായ മാനസികാരോഗ്യ വിദഗ്ധരുമാണ്.',

        // CTA Section
        'cta_title': 'നിങ്ങളുടെ മാനസികാരോഗ്യ യാത്ര ആരംഭിക്കാൻ തയ്യാറാണോ?',
        'cta_subtitle': 'മികച്ച മാനസികാരോഗ്യത്തിലേക്കുള്ള ആദ്യ ചുവടുവെപ്പ് ഇന്ന് തന്നെ നടത്തുക.',
        'cta_book_first': 'നിങ്ങളുടെ ആദ്യ സെഷൻ ബുക്ക് ചെയ്യുക',
        'cta_try_ai_support': 'AI പിന്തുണ പരീക്ഷിക്കുക',

        // Footer
        'footer_tagline': 'മാനസികാരോഗ്യത്തിലും ക്ഷേമത്തിലും നിങ്ങളുടെ വിശ്വസ്ത പങ്കാളി.',
        'footer_support': 'പിന്തുണ',
        'footer_help_center': 'സഹായ കേന്ദ്രം',
        'footer_contact_us': 'ഞങ്ങളെ ബന്ധപ്പെടുക',
        'footer_privacy_policy': 'സ്വകാര്യത നയം',
        'footer_terms_service': 'സേവന നിബന്ധനകൾ',
        'footer_contact_info': 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ',
        'footer_copyright': '© 2025 MentAura. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',

        // Modal Forms
        'modal_login_title': 'ലോഗിൻ',
        'modal_signup_title': 'സൈൻ അപ്പ്',
        'modal_email': 'ഇമെയിൽ',
        'modal_password': 'പാസ്‌വേഡ്',
        'modal_full_name': 'പൂർണ്ണ നാമം',
        'modal_confirm_password': 'പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക',
        'modal_login_btn': 'ലോഗിൻ',
        'modal_signup_btn': 'സൈൻ അപ്പ്',
        'modal_no_account': 'അക്കൗണ്ട് ഇല്ലേ?',
        'modal_create_one': 'ഒരെണ്ണം സൃഷ്ടിക്കുക',
        'modal_have_account': 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?'
    }
};

// Enhanced Language Manager Class with comprehensive fallback system
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        // Get saved language from localStorage
        const savedLanguage = localStorage.getItem('mentaura_language');
        if (savedLanguage && languageData[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }

        // Apply saved language immediately
        this.applyLanguage(this.currentLanguage);

        // Update language dropdown display
        this.updateLanguageDisplay();

        // Set up language dropdown listeners
        this.setupLanguageDropdown();
    }

    setupLanguageDropdown() {
        const languageBtn = document.getElementById('languageBtn');
        const languageMenu = document.getElementById('languageMenu');

        // Toggle dropdown
        if (languageBtn) {
            languageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                languageMenu.classList.toggle('show');
            });
        }

        // Language selection
        if (languageMenu) {
            languageMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' && e.target.dataset.lang) {
                    e.preventDefault();
                    const selectedLang = e.target.dataset.lang;

                    // Only process supported languages
                    if (['en', 'hi', 'ta', 'te', 'kn', 'ml'].includes(selectedLang)) {
                        this.switchLanguage(selectedLang);

                        // Close dropdown
                        languageMenu.classList.remove('show');
                    }
                }
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (languageMenu && languageBtn && !languageBtn.contains(e.target) && !languageMenu.contains(e.target)) {
                languageMenu.classList.remove('show');
            }
        });
    }

    switchLanguage(langCode) {
        if (languageData[langCode]) {
            this.currentLanguage = langCode;
            localStorage.setItem('mentaura_language', langCode);
            this.applyLanguage(langCode);
            this.updateLanguageDisplay();
        }
    }

    updateLanguageDisplay() {
        const currentLangDisplay = document.getElementById('currentLang');
        if (currentLangDisplay) {
            const langNames = {
                'en': 'EN',
                'hi': 'हि',
                'ta': 'TA',
                'te': 'TE',
                'kn': 'KN',
                'ml': 'ML'
            };
            currentLangDisplay.textContent = langNames[this.currentLanguage] || 'EN';
        }
    }

    applyLanguage(langCode) {
        const translations = languageData[langCode];
        if (!translations) return;

        // Update document language
        document.documentElement.lang = langCode;

        // PRIMARY: Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        // FALLBACK: Force update elements without data-translate attributes
        this.forceUpdateElements(translations);

        // Update page title
        this.updatePageTitle(translations);

        // No RTL needed for these languages
        document.documentElement.dir = 'ltr';
        document.body.classList.remove('rtl-mode');
    }

    forceUpdateElements(translations) {
        // Force update navigation elements
        this.forceUpdateNavigation(translations);

        // Force update footer elements
        this.forceUpdateFooter(translations);

        // Force update page-specific content
        this.forceUpdatePageContent(translations);

        // Force update common elements
        this.forceUpdateCommonElements(translations);
    }

    forceUpdateNavigation(translations) {
        // Navigation links - by text matching
        const navTextMap = {
            'Home': 'nav_home',
            'होम': 'nav_home',
            'முகப்பு': 'nav_home',
            'హోమ్': 'nav_home',
            'ಮುಖಪುಟ': 'nav_home',
            'ഹോം': 'nav_home',
            'Services': 'nav_services',
            'सेवाएं': 'nav_services',
            'சேவைகள்': 'nav_services',
            'సేవలు': 'nav_services',
            'ಸೇವೆಗಳು': 'nav_services',
            'സേവനങ്ങൾ': 'nav_services',
            'AI Chat': 'nav_ai_chat',
            'एआई चैट': 'nav_ai_chat',
            'AI அரட்டை': 'nav_ai_chat',
            'AI చాట్': 'nav_ai_chat',
            'AI ಚಾಟ್': 'nav_ai_chat',
            'AI ചാറ്റ്': 'nav_ai_chat',
            'Book Session': 'nav_book_session',
            'सत्र बुक करें': 'nav_book_session',
            'அமர்வு முன்பதிவு': 'nav_book_session',
            'సెషన్ బుక్ చేయండి': 'nav_book_session',
            'ಸೆಷನ್ ಕಾಯ್ದಿರಿಸಿ': 'nav_book_session',
            'സെഷൻ ബുക്ക് ചെയ്യുക': 'nav_book_session',
            'Resources': 'nav_resources',
            'संसाधन': 'nav_resources',
            'வளங்கள்': 'nav_resources',
            'వనరులు': 'nav_resources',
            'ಸಂಪನ್ಮೂಲಗಳು': 'nav_resources',
            'വിഭവങ്ങൾ': 'nav_resources',
            'Community': 'nav_community',
            'समुदाय': 'nav_community',
            'சமூகம்': 'nav_community',
            'కమ్యూనిటీ': 'nav_community',
            'ಸಮುದಾಯ': 'nav_community',
            'കമ്മ്യൂണിറ്റി': 'nav_community',
            'Admin Dashboard': 'nav_admin',
            'एडमिन डैशबोर्ड': 'nav_admin',
            'நிர்வாக குழு': 'nav_admin',
            'అడ్మిన్ డాష్‌బోర్డ్': 'nav_admin',
            'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್': 'nav_admin',
            'അഡ്മിൻ ഡാഷ്ബോർഡ്': 'nav_admin'
        };

        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const currentText = link.textContent.trim();
            if (navTextMap[currentText] && translations[navTextMap[currentText]]) {
                link.textContent = translations[navTextMap[currentText]];
            }
        });

        // Update auth buttons
        const signupButtons = document.querySelectorAll('.btn-signup, #signupBtn');
        signupButtons.forEach(btn => {
            if (translations['btn_signup']) {
                btn.textContent = translations['btn_signup'];
            }
        });

        const loginButtons = document.querySelectorAll('.btn-login, #loginBtn');
        loginButtons.forEach(btn => {
            if (translations['btn_login']) {
                btn.textContent = translations['btn_login'];
            }
        });
    }

    forceUpdateFooter(translations) {
        // Footer content mapping
        const footerTextMap = {
            'Your trusted partner in mental health and wellness.': 'footer_tagline',
            'मानसिक स्वास्थ्य और कल्याण में आपका भरोसेमंद साझेदार।': 'footer_tagline',
            'உங்கள் மனநல பயணம் இங்கே தொடங்குகிறது': 'footer_tagline',
            'Support': 'footer_support',
            'सहायता': 'footer_support',
            'Help Center': 'footer_help_center',
            'हेल्प सेंटर': 'footer_help_center',
            'Contact Us': 'footer_contact_us',
            'संपर्क करें': 'footer_contact_us',
            'Privacy Policy': 'footer_privacy_policy',
            'गोपनीयता नीति': 'footer_privacy_policy',
            'Terms of Service': 'footer_terms_service',
            'सेवा की शर्तें': 'footer_terms_service',
            'Contact Info': 'footer_contact_info',
            'संपर्क जानकारी': 'footer_contact_info'
        };

        // Update all footer elements
        document.querySelectorAll('footer *').forEach(element => {
            const text = element.textContent.trim();
            if (footerTextMap[text] && translations[footerTextMap[text]]) {
                element.textContent = translations[footerTextMap[text]];
            }
        });

        // Update copyright specifically
        const copyrightSelectors = [
            '.footer-bottom p',
            '.footer-copyright',
            '[data-translate="footer_copyright"]'
        ];

        copyrightSelectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element && translations['footer_copyright']) {
                element.textContent = translations['footer_copyright'];
            }
        });

        // Update MentAura brand name
        const brandElements = document.querySelectorAll('.footer-logo span, .footer-brand span');
        brandElements.forEach(brand => {
            if (translations['hero_title']) {
                brand.textContent = translations['hero_title'];
            }
        });
    }

    forceUpdatePageContent(translations) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        switch (currentPage) {
            case 'index.html':
            case '':
                this.forceUpdateHomepage(translations);
                break;
            case 'chatbot.html':
                this.forceUpdateChatbot(translations);
                break;
            case 'booking.html':
                this.forceUpdateBooking(translations);
                break;
            case 'resources.html':
                this.forceUpdateResources(translations);
                break;
            case 'forum.html':
                this.forceUpdateForum(translations);
                break;
            case 'admin.html':
                this.forceUpdateAdmin(translations);
                break;
        }
    }

    forceUpdateHomepage(translations) {
        // Hero section
        const heroSelectors = [
            'h1, .hero-title',
            '.hero-tagline',
            '.hero-subtitle',
            '.hero-location'
        ];
        const heroKeys = ['hero_title', 'hero_tagline', 'hero_subtitle', 'hero_location'];

        heroSelectors.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element && translations[heroKeys[index]]) {
                element.textContent = translations[heroKeys[index]];
            }
        });

        // Services section
        const servicesTitle = document.querySelector('.services .section-title, .services h2');
        if (servicesTitle && translations['services_title']) {
            servicesTitle.textContent = translations['services_title'];
        }

        // Features section
        const featuresTitle = document.querySelector('.features .section-title, .features h2');
        if (featuresTitle && translations['features_title']) {
            featuresTitle.textContent = translations['features_title'];
        }

        // Feature cards
        const featureTextMap = {
            'Privacy & Security': 'feature_privacy_title',
            'गोपनीयता और सुरक्षा': 'feature_privacy_title',
            'پرائیویسی تہ سیکیورٹی': 'feature_privacy_title',
            'Flexible Scheduling': 'feature_scheduling_title',
            'लचीला शेड्यूलिंग': 'feature_scheduling_title',
            'لچکدار شیڈولنگ': 'feature_scheduling_title',
            'Mobile Friendly': 'feature_mobile_title',
            'मोबाइल फ्रेंडली': 'feature_mobile_title',
            'موبائل دوست': 'feature_mobile_title',
            'Licensed Professionals': 'feature_licensed_title',
            'लाइसेंसशुदा पेशेवर': 'feature_licensed_title',
            'لائسنس یافتہ پیشہ ور': 'feature_licensed_title'
        };

        // Update feature cards
        document.querySelectorAll('.feature-card h3').forEach(title => {
            const text = title.textContent.trim();
            if (featureTextMap[text] && translations[featureTextMap[text]]) {
                title.textContent = translations[featureTextMap[text]];
            }
        });

        // CTA section
        const ctaTitle = document.querySelector('.cta h2');
        if (ctaTitle && translations['cta_title']) {
            ctaTitle.textContent = translations['cta_title'];
        }

        const ctaSubtitle = document.querySelector('.cta p');
        if (ctaSubtitle && translations['cta_subtitle']) {
            ctaSubtitle.textContent = translations['cta_subtitle'];
        }
    }

    forceUpdateChatbot(translations) {
        // AI status
        const statusElements = document.querySelectorAll('.ai-status, .status-text, .online-status');
        statusElements.forEach(status => {
            if (translations['ai_status']) {
                status.textContent = translations['ai_status'];
            }
        });

        // Welcome title and description
        const welcomeTitle = document.querySelector('h4, .welcome-title');
        if (welcomeTitle && translations['ai_welcome_title']) {
            welcomeTitle.textContent = translations['ai_welcome_title'];
        }

        // Capabilities
        const capabilityTextMap = {
            'Mental Health Support': 'ai_capability_support',
            'मानसिक स्वास्थ्य सहायता': 'ai_capability_support',
            'Active Listening': 'ai_capability_listening',
            'सक्रिय श्रवण': 'ai_capability_listening',
            'Personalized Guidance': 'ai_capability_guidance',
            'व्यक्तिगत मार्गदर्शन': 'ai_capability_guidance',
            'Resource Recommendations': 'ai_capability_resources',
            'संसाधन सिफारिशें': 'ai_capability_resources'
        };

        document.querySelectorAll('.capability-item span, .capability-text').forEach(cap => {
            const text = cap.textContent.trim();
            if (capabilityTextMap[text] && translations[capabilityTextMap[text]]) {
                cap.textContent = translations[capabilityTextMap[text]];
            }
        });

        // Quick topics
        const topicTextMap = {
            'Feeling Anxious': 'feeling_anxious',
            'चिंतित महसूस करना': 'feeling_anxious',
            'Depression Support': 'depression_support',
            'अवसाद सहायता': 'depression_support',
            'Stress Management': 'stress_management',
            'तनाव प्रबंधन': 'stress_management',
            'Relationship Issues': 'relationship_issues',
            'रिश्ते की समस्याएं': 'relationship_issues',
            'Sleep Problems': 'sleep_problems',
            'नींद की समस्याएं': 'sleep_problems',
            'Build Habits': 'build_habits',
            'आदतें बनाना': 'build_habits'
        };

        document.querySelectorAll('.topic-btn, .quick-topic').forEach(topic => {
            const text = topic.textContent.trim();
            if (topicTextMap[text] && translations[topicTextMap[text]]) {
                topic.textContent = translations[topicTextMap[text]];
            }
        });
    }

    forceUpdateBooking(translations) {
        // Service box headers
        const serviceTextMap = {
            'Book Session': 'book_new_session',
            'सत्र बुक करें': 'book_new_session',
            'سیشن بُک کریو': 'book_new_session',
            'Live Session': 'live_session',
            'लाइव सत्र': 'live_session',
            'لائیو سیشن': 'live_session',
            'Upcoming Sessions': 'upcoming_sessions',
            'आगामी सत्र': 'upcoming_sessions',
            'آئندہ سیشنز': 'upcoming_sessions',
            'Previous Sessions': 'previous_sessions',
            'पिछले सत्र': 'previous_sessions',
            'پرانہ سیشنز': 'previous_sessions',
            'Session Recordings': 'session_recordings',
            'सत्र रिकॉर्डिंग': 'session_recordings',
            'سیشن ریکارڈنگز': 'session_recordings',
            'Crisis Support': 'crisis_support',
            'संकट सहायता': 'crisis_support',
            'بحران مدد': 'crisis_support'
        };

        document.querySelectorAll('.service-box h3').forEach(title => {
            const text = title.textContent.trim();
            if (serviceTextMap[text] && translations[serviceTextMap[text]]) {
                title.textContent = translations[serviceTextMap[text]];
            }
        });
    }

    forceUpdateResources(translations) {
        // Main title
        const titleSelectors = [
            '.resources-title-centered',
            '.page-title',
            'h1'
        ];

        titleSelectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element && translations['resources_title']) {
                element.textContent = translations['resources_title'];
            }
        });

        // Tab buttons
        const tabTextMap = {
            'Videos': 'resources_videos',
            'वीडियो': 'resources_videos',
            'ویڈیوز': 'resources_videos',
            'Articles': 'resources_articles',
            'लेख': 'resources_articles',
            'مضامین': 'resources_articles',
            'Mental Games': 'resources_games',
            'मानसिक खेल': 'resources_games',
            'ذہنی کھیل': 'resources_games',
            'Meditation': 'resources_meditation',
            'ध्यान': 'resources_meditation',
            'مراقبہ': 'resources_meditation',
            'Journaling': 'resources_journaling',
            'जर्नलिंग': 'resources_journaling',
            'جرنلنگ': 'resources_journaling',
            'Self Care': 'resources_hygiene',
            'स्व-देखभाल': 'resources_hygiene',
            'خود کی دیکھ بھال': 'resources_hygiene'
        };

        document.querySelectorAll('.tab-btn span').forEach(tab => {
            const text = tab.textContent.trim();
            if (tabTextMap[text] && translations[tabTextMap[text]]) {
                tab.textContent = translations[tabTextMap[text]];
            }
        });
    }

    forceUpdateForum(translations) {
        // Forum description
        const forumDesc = document.querySelector('.forum-description p, .forum-subtitle');
        if (forumDesc && translations['forum_desc']) {
            forumDesc.textContent = translations['forum_desc'];
        }
    }

    forceUpdateAdmin(translations) {
        // Admin description
        const adminDesc = document.querySelector('.admin-description-compact h2');
        if (adminDesc && translations['counsellor_management']) {
            adminDesc.textContent = translations['counsellor_management'];
        }
    }

    forceUpdateCommonElements(translations) {
        // Update buttons by text content
        const buttonTextMap = {
            'Book a Session': 'btn_book_session',
            'सत्र बुक करें': 'btn_book_session',
            'سیشن بُک کریو': 'btn_book_session',
            'Try AI Chat': 'btn_try_ai',
            'एआई चैट आज़माएं': 'btn_try_ai',
            'اے آئی چیٹ کریو': 'btn_try_ai',
            'Book Your First Session': 'cta_book_first',
            'अपना पहला सत्र बुक करें': 'cta_book_first',
            'پنن پہلو سیشن بُک کریو': 'cta_book_first',
            'Try AI Support': 'cta_try_ai_support',
            'एआई सहायता आज़माएं': 'cta_try_ai_support',
            'اے آئی مدد کریو': 'cta_try_ai_support'
        };

        document.querySelectorAll('button, .btn, a').forEach(btn => {
            const text = btn.textContent.trim();
            if (buttonTextMap[text] && translations[buttonTextMap[text]]) {
                btn.textContent = translations[buttonTextMap[text]];
            }
        });

        // Update input placeholders by current placeholder text
        const placeholderMap = {
            'Share what\'s on your mind... I\'m here to listen and help.': 'ai_chat_placeholder',
            'अपने मन की बात साझा करें... मैं सुनने और मदद करने के लिए यहाँ हूँ।': 'ai_chat_placeholder',
            'پنن دل کی بات بانٹیو... بہ سننے تہ مدد کرنے کے لئے یتے چھس۔': 'ai_chat_placeholder'
        };

        document.querySelectorAll('input, textarea').forEach(input => {
            const placeholder = input.placeholder;
            if (placeholderMap[placeholder] && translations[placeholderMap[placeholder]]) {
                input.placeholder = translations[placeholderMap[placeholder]];
            }
        });
    }

    updatePageTitle(translations) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageTitles = {
            'index.html': 'hero_title',
            'chatbot.html': 'ai_chat_title',
            'booking.html': 'booking_title',
            'resources.html': 'resources_title',
            'forum.html': 'forum_title',
            'admin.html': 'admin_title',
            'help-center.html': 'help_title',
            'contact.html': 'contact_title',
            'privacy-policy.html': 'privacy_title',
            'terms-of-service.html': 'terms_title'
        };

        const titleKey = pageTitles[currentPage];
        if (titleKey && translations[titleKey]) {
            document.title = `${translations[titleKey]} - MentAura`;
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getTranslation(key) {
        return languageData[this.currentLanguage][key] || languageData['en'][key] || key;
    }
}

// Initialize Language Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    console.log('Enhanced Language Manager initialized successfully!');
});

// Add enhanced CSS styles
const enhancedStyles = `
/* Enhanced Language Dropdown Styles */
.language-dropdown {
    position: relative;
    z-index: 1000;
}

.language-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.language-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.language-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    min-width: 120px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.language-menu.show {
    max-height: 200px;
    opacity: 1;
    transform: translateY(0);
}

.language-menu a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.language-menu a:last-child {
    border-bottom: none;
}

.language-menu a:hover {
    background-color: #f5f5f5;
}

/* RTL Mode Enhanced Styles */
.rtl-mode {
    direction: rtl;
    text-align: right;
}

.rtl-mode .nav-menu {
    flex-direction: row-reverse;
}

.rtl-mode .language-dropdown {
    left: auto;
    right: 0;
}

.rtl-mode .language-menu {
    left: auto;
    right: 0;
}

.rtl-mode .nav-auth-buttons {
    order: -1;
    margin-left: 20px;
    margin-right: 0;
}

.rtl-mode .hero-buttons,
.rtl-mode .cta-buttons {
    flex-direction: row-reverse;
}

.rtl-mode .services-grid,
.rtl-mode .features-grid {
    direction: rtl;
}

.rtl-mode .footer-content {
    direction: rtl;
    text-align: right;
}

.rtl-mode input,
.rtl-mode textarea,
.rtl-mode select {
    text-align: right;
}

.rtl-mode .service-card,
.rtl-mode .feature-card {
    text-align: right;
}

/* Mobile responsive */
@media (max-width: 768px) {
    .language-menu {
        min-width: 100px;
        left: -20px;
    }

    .rtl-mode .language-menu {
        right: -20px;
        left: auto;
    }

    .language-btn {
        padding: 6px 10px;
        font-size: 14px;
    }
}
`;

// Inject enhanced styles
if (!document.querySelector('#enhanced-language-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'enhanced-language-styles';
    styleSheet.textContent = enhancedStyles;
    document.head.appendChild(styleSheet);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, languageData };
}
