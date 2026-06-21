// Meditation Section JavaScript with Inline Video Player
document.addEventListener('DOMContentLoaded', function () {
    console.log('Meditation resources loaded');
    initMeditationResources();
    initResourceTabs(); // Initialize tab switching functionality
});

function initMeditationResources() {
    console.log('Initializing meditation resources...');
    injectMeditationStyles();
    initMeditationVideoModal();
    console.log('Meditation resources initialized successfully');
}

// Inject CSS styles for meditation section
function injectMeditationStyles() {
    // Updated CSS styles for meditation section
    const meditationStyles = `
    <style id="meditation-styles">
    /* Meditation Section Styles */
    .meditation-categories {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .meditation-category {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(184, 181, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .meditation-category h3 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.4rem;
        font-weight: 600;
    }

    .meditation-sessions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .session-card {
        /* Changed to pastel pink background like the original design */
        background: linear-gradient(135deg, 
            rgba(255, 182, 193, 0.3), 
            rgba(255, 192, 203, 0.25), 
            rgba(255, 218, 225, 0.3)
        );
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 182, 193, 0.4);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 182, 193, 0.2);
    }

    .session-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(255, 182, 193, 0.4);
        border-color: rgba(255, 182, 193, 0.6);
        background: linear-gradient(135deg, 
            rgba(255, 182, 193, 0.4), 
            rgba(255, 192, 203, 0.35), 
            rgba(255, 218, 225, 0.4)
        );
    }

    .session-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        flex-shrink: 0;
    }

    .session-info {
        flex: 1;
    }

    .session-info h4 {
        color: var(--gray-800);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .session-info p {
        color: var(--gray-600);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }

    .session-info .duration {
        background: rgba(184, 181, 255, 0.2);
        color: var(--primary-color);
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .session-btn {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        flex-shrink: 0;
    }

    .session-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(184, 181, 255, 0.4);
    }

    /* Video Modal Styles */
    .meditation-video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
    }

    .meditation-video-modal.active {
        display: flex;
    }

    .video-modal-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 90vw;
        max-height: 90vh;
        width: 800px;
        position: relative;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(184, 181, 255, 0.2);
    }

    .modal-title {
        /* Changed modal title color to black */
        color: #000000;
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray-600);
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background: rgba(184, 181, 255, 0.2);
        color: var(--primary-color);
    }

    .video-container {
        width: 100%;
        height: 400px;
        border-radius: 15px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .video-container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .video-info {
        text-align: center;
    }

    .video-description {
        color: var(--gray-600);
        margin-bottom: 1rem;
        line-height: 1.5;
    }

    .video-duration {
        background: rgba(184, 181, 255, 0.2);
        color: var(--primary-color);
        padding: 0.5rem 1rem;
        border-radius: 15px;
        display: inline-block;
        font-weight: 500;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .meditation-sessions {
            grid-template-columns: 1fr;
        }
        
        .session-card {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
            padding: 1.2rem;
        }
        
        .video-modal-content {
            margin: 1rem;
            padding: 1.5rem;
            width: calc(100% - 2rem);
        }
        
        .video-container {
            height: 250px;
        }
        
        .modal-title {
            font-size: 1.1rem;
        }
    }

    /* Animation for opening modal */
    .meditation-video-modal {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .meditation-video-modal.active {
        opacity: 1;
    }

    .video-modal-content {
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .meditation-video-modal.active .video-modal-content {
        transform: scale(1);
    }
    </style>
`;


    // Inject styles into head
    if (!document.getElementById('meditation-styles')) {
        document.head.insertAdjacentHTML('beforeend', meditationStyles);
    }
}

// Initialize video modal
function initMeditationVideoModal() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('meditationVideoModal')) {
        const modalHTML = `
            <div id="meditationVideoModal" class="meditation-video-modal">
                <div class="video-modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalVideoTitle">Meditation Video</h3>
                        <button class="modal-close" onclick="closeMeditationModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="video-container" id="modalVideoContainer">
                        <!-- Video will be inserted here -->
                    </div>
                    <div class="video-info">
                        <p class="video-description" id="modalVideoDescription"></p>
                        <span class="video-duration" id="modalVideoDuration"></span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Close modal when clicking outside
        document.getElementById('meditationVideoModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeMeditationModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMeditationModal();
            }
        });
    }
}

// Meditation data with YouTube embed URLs
const meditationData = {
    'morning-5': {
        title: '5-Minute Morning Meditation',
        description: 'Start your day with calm and focus. A gentle introduction to meditation practice.',
        duration: '5 min',
        youtubeId: 'YD5W5eZy90c'
    },
    'body-scan': {
        title: 'Body Scan Relaxation',
        description: 'Release tension throughout your body with this guided body scan practice.',
        duration: '10 min',
        youtubeId: 'aH72AScs0qk'
    },
    'breathing-basics': {
        title: 'Breathing Basics',
        description: 'Learn fundamental breathing techniques to manage stress and anxiety.',
        duration: '7 min',
        youtubeId: 'LiUnFJ8P4gM'
    },
    'deep-mindfulness': {
        title: 'Deep Mindfulness',
        description: 'Extended awareness practice for deeper meditation experience.',
        duration: '20 min',
        youtubeId: 'Jyy0ra2WcQQ'
    },
    'loving-kindness': {
        title: 'Loving-Kindness Meditation',
        description: 'Cultivate compassion and love for yourself and others.',
        duration: '15 min',
        youtubeId: 'sDi40FQcaIU'
    },
    'chakra-balance': {
        title: 'Chakra Balancing',
        description: 'Align your energy centers for holistic wellbeing.',
        duration: '25 min',
        youtubeId: 'D8eplSV1wus'
    },
    'bedtime': {
        title: 'Bedtime Relaxation',
        description: 'Prepare your mind for restful sleep with this calming meditation.',
        duration: '12 min',
        youtubeId: 'HMOfD3VSbQ4'
    },
    'sleep-stories': {
        title: 'Sleep Stories',
        description: 'Peaceful narratives to help you drift into deep, restful sleep.',
        duration: '30 min',
        youtubeId: 'I6jP5oLdKpY'
    },
    'night-body-scan': {
        title: 'Night Time Body Scan',
        description: 'Release the day\'s tension and prepare for restorative sleep.',
        duration: '18 min',
        youtubeId: 'lu_cLaBTXio'
    }
};

// Modified playMeditation function to show videos inline
function playMeditation(sessionId) {
    console.log('Playing meditation:', sessionId);

    const meditation = meditationData[sessionId];
    if (!meditation) {
        console.error('Meditation not found:', sessionId);
        return;
    }

    // Update modal content
    document.getElementById('modalVideoTitle').textContent = meditation.title;
    document.getElementById('modalVideoDescription').textContent = meditation.description;
    document.getElementById('modalVideoDuration').textContent = meditation.duration;

    // Create embedded YouTube iframe
    const videoContainer = document.getElementById('modalVideoContainer');
    videoContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${meditation.youtubeId}?autoplay=1&rel=0&modestbranding=1"
            title="${meditation.title}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;

    // Show modal
    const modal = document.getElementById('meditationVideoModal');
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show notification
    showMeditationNotification(`Now playing: ${meditation.title}`);
}

// Close meditation modal
function closeMeditationModal() {
    const modal = document.getElementById('meditationVideoModal');
    modal.classList.remove('active');

    // Stop video by clearing container
    document.getElementById('modalVideoContainer').innerHTML = '';

    // Restore body scroll
    document.body.style.overflow = '';

    console.log('Meditation modal closed');
}

// Show meditation notification
function showMeditationNotification(message) {
    // Remove existing notification if present
    const existingNotification = document.getElementById('meditationNotification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.id = 'meditationNotification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        z-index: 10001;
        font-weight: 600;
        box-shadow: 0 6px 20px rgba(184, 181, 255, 0.4);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Mobile Menu (keeping existing functionality)
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Resource Tabs (keeping existing functionality)  
function initResourceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resourceContents = document.querySelectorAll('.resource-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            tabBtns.forEach(tab => tab.classList.remove('active'));
            resourceContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Language Dropdown (keeping existing functionality)
function initLanguageDropdown() {
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const currentLang = document.getElementById('currentLang');

    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            languageMenu.classList.toggle('show');
        });

        languageMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const selectedLang = e.target.getAttribute('data-lang');
                currentLang.textContent = e.target.textContent;
                languageMenu.classList.remove('show');
            }
        });

        document.addEventListener('click', function () {
            languageMenu.classList.remove('show');
        });
    }
}