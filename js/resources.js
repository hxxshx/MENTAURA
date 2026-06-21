// Resources JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initResources();
    // Add this inside the existing DOMContentLoaded event listener
    setTimeout(() => {
        if (document.getElementById('savedEntriesContainer')) {
            loadSavedEntries();
        }
    }, 1000);

});

function initResources() {
    initMobileMenu();
    initResourceTabs();
    initVideoFilters();
    initLanguageDropdown();
    initResourceCards();
    initSelfCareTracker();
    loadResourcesData();
    // The meditation section will auto-initialize via its own script
}


// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Resource Tabs Navigation
// Resource Tabs Navigation - FIXED VERSION
function initResourceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resourceContents = document.querySelectorAll('.resource-content');

    // Hide all content sections initially except the first one
    resourceContents.forEach((content, index) => {
        if (index === 0) {
            content.classList.add('active');
            content.style.display = 'block';
        } else {
            content.classList.remove('active');
            content.style.display = 'none';
        }
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and hide all content
            tabBtns.forEach(tab => tab.classList.remove('active'));
            resourceContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Add active class to clicked tab and show corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            }

            // Add smooth scroll to top of content
            document.querySelector('.resources-content-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}


// Video Language Filters
function initVideoFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetLang = this.getAttribute('data-lang');

            // Remove active class from all filter buttons
            filterBtns.forEach(filter => filter.classList.remove('active'));
            this.classList.add('active');

            // Filter video cards
            videoCards.forEach(card => {
                if (targetLang === 'all' || card.getAttribute('data-lang') === targetLang) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Language Dropdown
function initLanguageDropdown() {
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const currentLang = document.getElementById('currentLang');

    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            languageMenu.classList.toggle('show');
        });

        // Language selection
        languageMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const selectedLang = e.target.getAttribute('data-lang');
                currentLang.textContent = e.target.textContent;
                languageMenu.classList.remove('show');

                // Here you would implement actual language switching
                console.log('Language switched to:', selectedLang);
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
            languageMenu.classList.remove('show');
        });
    }
}

// Resource Cards Interactions
function initResourceCards() {
    // Video card interactions - YouTube videos are now embedded directly
    // No need for click handlers as videos play directly in the iframe

    // Article card interactions
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function () {
            const articleTitle = this.querySelector('h3').textContent;
            readArticle(articleTitle);
        });
    });

    // Add hover effects
    document.querySelectorAll('.video-card, .article-card, .game-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Self Care Tracker
// Self Care Tracker - UPDATED VERSION
function initSelfCareTracker() {
    const checkboxes = document.querySelectorAll('.activity-checkboxes input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateTrackerProgress();

            // Add visual feedback
            const label = this.parentElement;
            if (this.checked) {
                label.style.color = 'var(--primary-color)';
                label.style.fontWeight = '600';
            } else {
                label.style.color = '';
                label.style.fontWeight = '';
            }
        });
    });

    // Load saved data
    loadTrackerData();

    // Load and display saved activities
    setTimeout(() => displaySavedTrackerData(), 1000);
}


function updateTrackerProgress() {
    const totalActivities = document.querySelectorAll('.activity-checkboxes input[type="checkbox"]').length;
    const completedActivities = document.querySelectorAll('.activity-checkboxes input[type="checkbox"]:checked').length;
    const progress = (completedActivities / totalActivities) * 100;

    // Update progress indicator if exists
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    console.log(`Self-care progress: ${progress.toFixed(1)}% (${completedActivities}/${totalActivities})`);
}

function saveTrackerData() {
    const trackerData = {
        date: new Date().toDateString(),
        activities: {}
    };

    document.querySelectorAll('.activity-checkboxes input[type="checkbox"]').forEach(checkbox => {
        const activityName = checkbox.parentElement.textContent.trim();
        trackerData.activities[activityName] = checkbox.checked;
    });

    // Save to localStorage
    localStorage.setItem(`selfCareTracker_${trackerData.date}`, JSON.stringify(trackerData));

    // Show success message
    showNotification('Self-care activities saved successfully!', 'success');
    console.log('Tracker data saved:', trackerData);

    // Update the saved activities display
    displaySavedTrackerData();
}

// ADD THIS NEW FUNCTION
function displaySavedTrackerData() {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem(`selfCareTracker_${today}`);

    // Find or create the display container
    let displayContainer = document.getElementById('saved-tracker-display');
    if (!displayContainer) {
        // Create display container after the tracker
        const trackerSection = document.querySelector('.self-care-tracker');
        if (trackerSection) {
            displayContainer = document.createElement('div');
            displayContainer.id = 'saved-tracker-display';
            displayContainer.className = 'saved-tracker-display';
            trackerSection.appendChild(displayContainer);
        }
    }

    if (savedData && displayContainer) {
        const trackerData = JSON.parse(savedData);
        const completedActivities = Object.entries(trackerData.activities)
            .filter(([activity, completed]) => completed)
            .map(([activity]) => activity);

        if (completedActivities.length > 0) {
            displayContainer.innerHTML = `
                <div class="saved-activities-header">
                    <h4><i class="fas fa-check-circle"></i> Today's Completed Activities</h4>
                    <span class="activity-count">${completedActivities.length} activities completed</span>
                </div>
                <div class="saved-activities-list">
                    ${completedActivities.map(activity => `
                        <div class="saved-activity-item">
                            <i class="fas fa-check"></i>
                            <span>${activity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="saved-activities-actions">
                    <button class="saved-activity-btn" onclick="viewPastTrackerData()">
                        <i class="fas fa-history"></i> View Past Activities
                    </button>
                    <button class="saved-activity-btn" onclick="clearTodaysData()">
                        <i class="fas fa-trash"></i> Clear Today's Data
                    </button>
                </div>
            `;
        } else {
            displayContainer.innerHTML = `
                <div class="no-activities-message">
                    <i class="fas fa-info-circle"></i>
                    <p>No activities completed yet today. Check off activities above to track your progress!</p>
                </div>
            `;
        }
    }
}

// ADD THIS NEW FUNCTION
function viewPastTrackerData() {
    const pastDataModal = document.createElement('div');
    pastDataModal.id = 'past-tracker-modal';
    pastDataModal.className = 'past-tracker-modal-overlay';

    // Get past 7 days of data
    const pastData = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        const data = localStorage.getItem(`selfCareTracker_${dateString}`);
        if (data) {
            const parsedData = JSON.parse(data);
            pastData.push({
                date: dateString,
                ...parsedData
            });
        }
    }

    pastDataModal.innerHTML = `
        <div class="past-tracker-modal-content">
            <div class="past-tracker-header">
                <h3>Past Self-Care Activities</h3>
                <button class="modal-close" onclick="closePastTrackerModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="past-tracker-body">
                ${pastData.length > 0 ? pastData.map(dayData => {
        const completedActivities = Object.entries(dayData.activities)
            .filter(([activity, completed]) => completed)
            .map(([activity]) => activity);

        return `
                        <div class="past-day-card">
                            <div class="past-day-header">
                                <h4>${dayData.date}</h4>
                                <span class="past-day-count">${completedActivities.length} completed</span>
                            </div>
                            <div class="past-day-activities">
                                ${completedActivities.length > 0 ?
                completedActivities.map(activity => `
                                        <span class="past-activity-tag">${activity}</span>
                                    `).join('') :
                '<p class="no-activities">No activities recorded</p>'
            }
                            </div>
                        </div>
                    `;
    }).join('') : '<p class="no-data">No past data available</p>'}
            </div>
        </div>
    `;

    document.body.appendChild(pastDataModal);
    document.body.style.overflow = 'hidden';

    // Close on outside click
    pastDataModal.addEventListener('click', (e) => {
        if (e.target === pastDataModal) {
            closePastTrackerModal();
        }
    });
}

// ADD THIS NEW FUNCTION
function closePastTrackerModal() {
    const modal = document.getElementById('past-tracker-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// ADD THIS NEW FUNCTION
function clearTodaysData() {
    if (confirm('Are you sure you want to clear today\'s self-care data?')) {
        const today = new Date().toDateString();
        localStorage.removeItem(`selfCareTracker_${today}`);

        // Uncheck all checkboxes
        document.querySelectorAll('.activity-checkboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            const label = checkbox.parentElement;
            label.style.color = '';
            label.style.fontWeight = '';
        });

        // Clear display
        const displayContainer = document.getElementById('saved-tracker-display');
        if (displayContainer) {
            displayContainer.innerHTML = '';
        }

        updateTrackerProgress();
        showNotification('Today\'s self-care data cleared!', 'success');
    }
}


function loadTrackerData() {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('selfCareTracker_' + today);

    if (savedData) {
        const trackerData = JSON.parse(savedData);

        document.querySelectorAll('.activity-checkboxes input[type="checkbox"]').forEach(checkbox => {
            const activityName = checkbox.parentElement.textContent.trim();
            if (trackerData.activities[activityName]) {
                checkbox.checked = true;
                checkbox.parentElement.style.color = 'var(--primary-color)';
                checkbox.parentElement.style.fontWeight = '600';
            }
        });

        updateTrackerProgress();
    }
}

// Load tracker data and display saved activities on page load
function loadTrackerData() {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem(`selfCareTracker_${today}`);

    if (savedData) {
        const trackerData = JSON.parse(savedData);

        document.querySelectorAll('.activity-checkboxes input[type="checkbox"]').forEach(checkbox => {
            const activityName = checkbox.parentElement.textContent.trim();
            if (trackerData.activities[activityName]) {
                checkbox.checked = true;
                checkbox.parentElement.style.color = 'var(--primary-color)';
                checkbox.parentElement.style.fontWeight = '600';
            }
        });

        updateTrackerProgress();
        // Display saved data
        setTimeout(() => displaySavedTrackerData(), 500);
    }
}

// Game Functions
function startGame(gameType) {
    const gameModal = document.getElementById('gameModal');
    const gameTitle = document.getElementById('gameTitle');
    const gameContent = document.getElementById('gameContent');

    gameModal.classList.remove('hidden');

    switch (gameType) {
        case 'memory':
            gameTitle.textContent = 'Memory Boost Game';
            gameContent.innerHTML = createMemoryGame();
            break;
        case 'breathing':
            gameTitle.textContent = 'Breathing Exercise';
            gameContent.innerHTML = createBreathingExercise();
            break;
        case 'mood':
            gameTitle.textContent = 'Mood Tracker';
            gameContent.innerHTML = createMoodTracker();
            break;
        case 'focus':
            gameTitle.textContent = 'Focus Flow';
            gameContent.innerHTML = createFocusGame();
            break;
        case 'stress':
            gameTitle.textContent = 'Stress Buster';
            gameContent.innerHTML = createStressBuster();
            break;
        case 'mindful':
            gameTitle.textContent = 'Mindful Moments';
            gameContent.innerHTML = createMindfulExercise();
            break;
    }
}

function createMemoryGame() {
    return `
        <div class="memory-game">
            <div class="game-instructions">
                <p>Click on the cards to reveal patterns. Match pairs to improve your memory!</p>
            </div>
            <div class="memory-grid">
                <div class="memory-card" data-card="1"><span>🧠</span></div>
                <div class="memory-card" data-card="1"><span>🧠</span></div>
                <div class="memory-card" data-card="2"><span>💚</span></div>
                <div class="memory-card" data-card="2"><span>💚</span></div>
                <div class="memory-card" data-card="3"><span>🌟</span></div>
                <div class="memory-card" data-card="3"><span>🌟</span></div>
                <div class="memory-card" data-card="4"><span>🌸</span></div>
                <div class="memory-card" data-card="4"><span>🌸</span></div>
            </div>
            <div class="game-stats">
                <span>Moves: <span id="moveCount">0</span></span>
                <span>Matches: <span id="matchCount">0</span></span>
            </div>
        </div>
    `;
}

function createBreathingExercise() {
    return `
        <div class="breathing-exercise">
            <div class="breathing-instructions">
                <p>Follow the circle to practice deep breathing. Inhale as it expands, exhale as it contracts.</p>
            </div>
            <div class="breathing-circle">
                <div class="circle-animation" id="breathingCircle">
                    <div class="breath-text" id="breathText">Click Start</div>
                </div>
            </div>
            <div class="breathing-controls">
                <button class="btn btn-primary" onclick="startBreathing()">Start</button>
                <button class="btn btn-secondary" onclick="stopBreathing()">Stop</button>
            </div>
            <div class="breathing-progress">
                <span>Cycles completed: <span id="cycleCount">0</span></span>
            </div>
        </div>
    `;
}

function createMoodTracker() {
    return `
        <div class="mood-tracker">
            <div class="mood-question">
                <h3>How are you feeling right now?</h3>
            </div>
            <div class="mood-options">
                <button class="mood-btn" data-mood="excellent" onclick="selectMood('excellent')">
                    <span class="mood-emoji">😁</span>
                    <span>Excellent</span>
                </button>
                <button class="mood-btn" data-mood="good" onclick="selectMood('good')">
                    <span class="mood-emoji">😊</span>
                    <span>Good</span>
                </button>
                <button class="mood-btn" data-mood="okay" onclick="selectMood('okay')">
                    <span class="mood-emoji">😐</span>
                    <span>Okay</span>
                </button>
                <button class="mood-btn" data-mood="down" onclick="selectMood('down')">
                    <span class="mood-emoji">😔</span>
                    <span>Down</span>
                </button>
                <button class="mood-btn" data-mood="struggling" onclick="selectMood('struggling')">
                    <span class="mood-emoji">😟</span>
                    <span>Struggling</span>
                </button>
            </div>
            <div class="mood-notes">
                <textarea placeholder="What's contributing to this mood? (optional)" rows="3"></textarea>
            </div>
            <button class="btn btn-primary" onclick="saveMood()">Save Mood Entry</button>
        </div>
    `;
}

function createFocusGame() {
    return `
        <div class="focus-game">
            <div class="focus-instructions">
                <p>Focus on the center dot. Click only when it turns green!</p>
            </div>
            <div class="focus-area">
                <div class="focus-dot" id="focusDot"></div>
            </div>
            <div class="focus-stats">
                <span>Score: <span id="focusScore">0</span></span>
                <span>Accuracy: <span id="focusAccuracy">100%</span></span>
            </div>
            <div class="focus-controls">
                <button class="btn btn-primary" onclick="startFocusGame()">Start Focus Challenge</button>
            </div>
        </div>
    `;
}

function createStressBuster() {
    return `
        <div class="stress-buster">
            <div class="stress-activities">
                <h3>Choose a quick stress relief activity:</h3>
                <div class="activity-grid">
                    <button class="activity-btn" onclick="startActivity('popping')">
                        <i class="fas fa-circle"></i>
                        <span>Bubble Popping</span>
                    </button>
                    <button class="activity-btn" onclick="startActivity('coloring')">
                        <i class="fas fa-palette"></i>
                        <span>Digital Coloring</span>
                    </button>
                    <button class="activity-btn" onclick="startActivity('sounds')">
                        <i class="fas fa-music"></i>
                        <span>Calming Sounds</span>
                    </button>
                    <button class="activity-btn" onclick="startActivity('stretching')">
                        <i class="fas fa-stretch"></i>
                        <span>Quick Stretches</span>
                    </button>
                </div>
            </div>
            <div id="stressActivity" class="stress-activity-area">
                <p>Select an activity above to get started!</p>
            </div>
        </div>
    `;
}

function createMindfulExercise() {
    return `
        <div class="mindful-exercise">
            <div class="mindful-options">
                <h3>Choose a mindfulness practice:</h3>
                <div class="mindful-practices">
                    <button class="practice-btn" onclick="startPractice('5senses')">
                        <i class="fas fa-eye"></i>
                        <span>5 Senses Exercise</span>
                    </button>
                    <button class="practice-btn" onclick="startPractice('bodycan')">
                        <i class="fas fa-body"></i>
                        <span>Body Scan</span>
                    </button>
                    <button class="practice-btn" onclick="startPractice('gratitude')">
                        <i class="fas fa-heart"></i>
                        <span>Gratitude Moment</span>
                    </button>
                </div>
            </div>
            <div id="mindfulContent" class="mindful-content">
                <p>Choose a practice above to begin your mindful moment.</p>
            </div>
        </div>
    `;
}

// Meditation Functions
function playMeditation(sessionId) {
    console.log(`Playing meditation session: ${sessionId}`);

    // Here you would integrate with an audio player
    const sessions = {
        'morning-5': {
            title: '5-Minute Morning Meditation',
            duration: '5:00',
            description: 'Start your day with calm and focus'
        },
        'body-scan': {
            title: 'Body Scan Relaxation',
            duration: '10:00',
            description: 'Release tension throughout your body'
        },
        'breathing-basics': {
            title: 'Breathing Basics',
            duration: '7:00',
            description: 'Learn fundamental breathing techniques'
        }
        // Add more sessions...
    };

    const session = sessions[sessionId];
    if (session) {
        showNotification(`Starting: ${session.title}`, 'info');
        // Implement audio player here
    }
}

// Journaling Functions
function startJournaling(promptType) {
    const journalModal = document.getElementById('journalModal');
    const journalTitle = document.getElementById('journalTitle');
    const journalPrompt = document.getElementById('journalPrompt');

    const prompts = {
        'gratitude-daily': {
            title: 'Daily Gratitude',
            prompt: 'What are three things you\'re grateful for today? Take a moment to think about why each one is meaningful to you.'
        },
        'gratitude-weekly': {
            title: 'Weekly Reflection',
            prompt: 'Looking back at this week, what positive moments, achievements, or experiences stand out to you?'
        },
        'mood-tracker': {
            title: 'Mood Check-in',
            prompt: 'How are you feeling right now? What emotions are you experiencing, and what might be contributing to these feelings?'
        },
        'anxiety-process': {
            title: 'Anxiety Processing',
            prompt: 'What\'s causing you worry or anxiety today? What are some practical steps you could take to address these concerns?'
        },
        'daily-goals': {
            title: 'Daily Intentions',
            prompt: 'What do you want to accomplish today? What would make today feel successful and fulfilling for you?'
        },
        'monthly-review': {
            title: 'Monthly Review',
            prompt: 'Reflect on the past month. What progress have you made? What challenges did you face? What goals do you want to set for next month?'
        },
        'family-reflect': {
            title: 'Family Dynamics',
            prompt: 'How are your family relationships affecting your mental health right now? What patterns do you notice?'
        },
        'friendship-value': {
            title: 'Friendship Growth',
            prompt: 'What do you value most in your friendships? How can you be a better friend, and what do you need from your relationships?'
        }
    };

    const selectedPrompt = prompts[promptType];
    if (selectedPrompt) {
        journalTitle.textContent = selectedPrompt.title;
        journalPrompt.textContent = selectedPrompt.prompt;
        document.getElementById('journalText').value = '';
        journalModal.classList.remove('hidden');
    }
}

function saveJournalEntry() {
    const journalText = document.getElementById('journalText').value;
    const journalTitle = document.getElementById('journalTitle').textContent;

    if (!journalText.trim()) {
        showNotification('Please write something before saving.', 'warning');
        return;
    }

    const entry = {
        title: journalTitle.replace(' (Editing)', ''),
        content: journalText,
        date: new Date().toISOString(),
        wordCount: journalText.split(' ').length
    };

    try {
        const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');

        if (typeof window.editingIndex !== 'undefined') {
            existingEntries[window.editingIndex] = entry;
            delete window.editingIndex;
            showNotification('Journal entry updated successfully!', 'success');
        } else {
            existingEntries.push(entry);
            showNotification('Journal entry saved successfully!', 'success');
        }

        localStorage.setItem('journalEntries', JSON.stringify(existingEntries));
        closeJournalModal();

        if (document.getElementById('savedEntriesContainer')) {
            loadSavedEntries();
        }

    } catch (error) {
        console.error('Error saving entry:', error);
        showNotification('Error saving journal entry', 'error');
    }
}
// Load and display saved journal entries
function loadSavedEntries() {
    const entriesContainer = document.getElementById('savedEntriesContainer');
    const entriesList = document.getElementById('entriesList');
    const noEntriesMessage = document.getElementById('noEntriesMessage');

    if (!entriesContainer) return;

    try {
        const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');

        if (existingEntries.length === 0) {
            noEntriesMessage.style.display = 'block';
            entriesList.style.display = 'none';
            return;
        }

        noEntriesMessage.style.display = 'none';
        entriesList.style.display = 'block';
        entriesList.innerHTML = '';

        existingEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

        existingEntries.forEach((entry, index) => {
            const entryCard = createEntryCard(entry, index);
            entriesList.appendChild(entryCard);
        });

    } catch (error) {
        console.error('Error loading saved entries:', error);
        showNotification('Error loading saved entries', 'error');
    }
}

function createEntryCard(entry, index) {
    const entryCard = document.createElement('div');
    entryCard.className = 'journal-entry-card';
    entryCard.innerHTML = `
        <div class="entry-header">
            <h4 class="entry-title">${entry.title}</h4>
            <span class="entry-date">${new Date(entry.date).toLocaleDateString()}</span>
        </div>
        <div class="entry-content">
            <p class="entry-preview">${entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content}</p>
        </div>
        <div class="entry-actions">
            <button class="entry-btn view-btn" onclick="viewFullEntry(${index})">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="entry-btn edit-btn" onclick="editEntry(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="entry-btn delete-btn" onclick="deleteEntry(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return entryCard;
}

function editEntry(index) {
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const entry = existingEntries[index];

    if (!entry) return;

    const journalModal = document.getElementById('journalModal');
    const journalTitle = document.getElementById('journalTitle');
    const journalText = document.getElementById('journalText');

    if (journalModal && journalTitle && journalText) {
        journalTitle.textContent = entry.title + ' (Editing)';
        journalText.value = entry.content;
        window.editingIndex = index;
        journalModal.classList.remove('hidden');
    }
}

function deleteEntry(index) {
    if (!confirm('Delete this journal entry?')) return;

    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    existingEntries.splice(index, 1);
    localStorage.setItem('journalEntries', JSON.stringify(existingEntries));
    loadSavedEntries();
    showNotification('Entry deleted successfully', 'success');
}

function exportAllEntries() {
    try {
        const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        if (existingEntries.length === 0) {
            showNotification('No entries to export', 'warning');
            return;
        }

        let exportText = `MY JOURNAL ENTRIES\n${'='.repeat(60)}\n\n`;
        exportText += `Exported: ${new Date().toLocaleDateString()}\n`;
        exportText += `Total Entries: ${existingEntries.length}\n\n`;

        existingEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        existingEntries.forEach((entry, index) => {
            exportText += `ENTRY ${index + 1}: ${entry.title}\n`;
            exportText += `Date: ${new Date(entry.date).toLocaleDateString()}\n`;
            exportText += `${entry.content}\n\n${'='.repeat(60)}\n\n`;
        });

        const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `journal_entries_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showNotification(`Exported ${existingEntries.length} entries successfully!`, 'success');
    } catch (error) {
        showNotification('Export failed. Please try again.', 'error');
    }
}

// Template Downloads functionality is handled below in the specialized downloadTemplate function

function viewFullEntry(index) {
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const entry = existingEntries[index];
    if (!entry) {
        showNotification('Entry not found', 'error');
        return;
    }
    const modal = createEntryViewModal(entry);
    document.body.appendChild(modal);
}

function createEntryViewModal(entry) {
    const modal = document.createElement('div');
    modal.className = 'entry-view-modal';
    modal.innerHTML = `
        <div class="entry-view-content">
            <div class="entry-view-header">
                <h2>${entry.title}</h2>
                <button class="close-entry-view" onclick="closeEntryView()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="entry-view-body">
                <p>${entry.content.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `;
    return modal;
}

function closeEntryView() {
    const modal = document.querySelector('.entry-view-modal');
    if (modal) modal.remove();
}



// Self Care Guide Functions
// Self Care Guide Functions - UPDATED VERSION
function viewGuide(guideType) {
    console.log('Viewing guide', guideType);

    const guides = {
        'hygiene-routine': {
            title: 'Personal Hygiene Routine Guide',
            content: `
                <div class="guide-content">
                    <h3>Daily Hygiene Essentials</h3>
                    <div class="guide-section">
                        <h4>Morning Routine (15-20 minutes)</h4>
                        <ul>
                            <li><strong>Oral Care:</strong> Brush teeth for 2 minutes, use mouthwash</li>
                            <li><strong>Face Washing:</strong> Use gentle cleanser, pat dry</li>
                            <li><strong>Hair Care:</strong> Brush/comb, style as needed</li>
                            <li><strong>Deodorant:</strong> Apply after showering</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Shower Routine (10-15 minutes)</h4>
                        <ul>
                            <li><strong>Frequency:</strong> Daily or every other day</li>
                            <li><strong>Water Temperature:</strong> Warm, not hot</li>
                            <li><strong>Body Wash:</strong> Use gentle, moisturizing soap</li>
                            <li><strong>Hair Washing:</strong> 2-3 times per week or as needed</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Skin Care Basics</h4>
                        <ul>
                            <li><strong>Moisturizing:</strong> Apply after shower while skin is damp</li>
                            <li><strong>Sun Protection:</strong> Use SPF 30+ daily</li>
                            <li><strong>Hand Hygiene:</strong> Wash frequently, especially before meals</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Evening Routine (10 minutes)</h4>
                        <ul>
                            <li><strong>Face Cleansing:</strong> Remove makeup, wash with cleanser</li>
                            <li><strong>Oral Care:</strong> Brush teeth, floss</li>
                            <li><strong>Foot Care:</strong> Clean and dry feet thoroughly</li>
                        </ul>
                    </div>
                    
                    <div class="guide-tips">
                        <h4>Mental Health Benefits</h4>
                        <p>Maintaining good hygiene helps boost self-confidence, reduces anxiety, and creates a positive daily structure that supports overall mental wellness.</p>
                    </div>
                </div>
            `
        },
        'sleep-hygiene': {
            title: 'Sleep Hygiene Guide',
            content: `
                <div class="guide-content">
                    <h3>Creating Better Sleep Habits</h3>
                    <div class="guide-section">
                        <h4>Sleep Schedule</h4>
                        <ul>
                            <li><strong>Consistent Bedtime:</strong> Go to bed at the same time every night</li>
                            <li><strong>Wake Time:</strong> Wake up at the same time daily, even weekends</li>
                            <li><strong>Sleep Duration:</strong> Aim for 7-9 hours per night</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Sleep Environment</h4>
                        <ul>
                            <li><strong>Temperature:</strong> Keep room between 60-67°F (15-19°C)</li>
                            <li><strong>Darkness:</strong> Use blackout curtains or eye mask</li>
                            <li><strong>Quiet:</strong> Use earplugs or white noise machine</li>
                            <li><strong>Comfortable Bedding:</strong> Invest in quality mattress and pillows</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Pre-Sleep Routine (1 hour before bed)</h4>
                        <ul>
                            <li><strong>Screen Time:</strong> Turn off devices 1 hour before bed</li>
                            <li><strong>Relaxing Activities:</strong> Reading, gentle stretching, meditation</li>
                            <li><strong>Avoid:</strong> Caffeine, large meals, intense exercise</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'nutrition-guide': {
            title: 'Nutrition & Hydration Guide',
            content: `
                <div class="guide-content">
                    <h3>Nourishing Body and Mind</h3>
                    <div class="guide-section">
                        <h4>Daily Nutrition Basics</h4>
                        <ul>
                            <li><strong>Balanced Meals:</strong> Include protein, healthy fats, and complex carbs</li>
                            <li><strong>Regular Eating:</strong> Eat every 3-4 hours to maintain energy</li>
                            <li><strong>Portion Control:</strong> Use the plate method (½ vegetables, ¼ protein, ¼ carbs)</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Hydration Guidelines</h4>
                        <ul>
                            <li><strong>Water Intake:</strong> 8-10 glasses per day</li>
                            <li><strong>Morning Hydration:</strong> Drink water immediately upon waking</li>
                            <li><strong>Limit:</strong> Caffeine, alcohol, and sugary drinks</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Brain-Boosting Foods</h4>
                        <ul>
                            <li><strong>Omega-3s:</strong> Fish, walnuts, chia seeds</li>
                            <li><strong>Antioxidants:</strong> Berries, dark leafy greens</li>
                            <li><strong>Complex Carbs:</strong> Whole grains, sweet potatoes</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'emotional-boundaries': {
            title: 'Emotional Boundaries Guide',
            content: `
                <div class="guide-content">
                    <h3>Protecting Your Mental Space</h3>
                    <div class="guide-section">
                        <h4>Understanding Boundaries</h4>
                        <ul>
                            <li><strong>Definition:</strong> Limits that protect your emotional well-being</li>
                            <li><strong>Purpose:</strong> Maintain healthy relationships and self-respect</li>
                            <li><strong>Types:</strong> Physical, emotional, time, and digital boundaries</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Setting Healthy Boundaries</h4>
                        <ul>
                            <li><strong>Learn to Say No:</strong> Practice polite but firm refusal</li>
                            <li><strong>Communicate Clearly:</strong> Express your needs directly</li>
                            <li><strong>Be Consistent:</strong> Maintain boundaries even when challenged</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Common Boundary Violations</h4>
                        <ul>
                            <li><strong>Emotional Dumping:</strong> People constantly venting without reciprocation</li>
                            <li><strong>Guilt Tripping:</strong> Manipulation to make you feel bad for setting limits</li>
                            <li><strong>Time Demands:</strong> Others expecting immediate responses or availability</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'stress-management': {
            title: 'Stress Management Guide',
            content: `
                <div class="guide-content">
                    <h3>Daily Stress Relief Techniques</h3>
                    <div class="guide-section">
                        <h4>Immediate Stress Relief (1-5 minutes)</h4>
                        <ul>
                            <li><strong>Deep Breathing:</strong> 4-7-8 breathing technique</li>
                            <li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li>
                            <li><strong>Grounding:</strong> 5-4-3-2-1 sensory technique</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Daily Stress Prevention</h4>
                        <ul>
                            <li><strong>Time Management:</strong> Use calendars, set realistic goals</li>
                            <li><strong>Regular Exercise:</strong> 30 minutes of movement daily</li>
                            <li><strong>Mindfulness Practice:</strong> 10-minute daily meditation</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Long-term Stress Reduction</h4>
                        <ul>
                            <li><strong>Lifestyle Changes:</strong> Improve sleep, nutrition, and exercise</li>
                            <li><strong>Support Systems:</strong> Build strong social connections</li>
                            <li><strong>Professional Help:</strong> Consider therapy or counseling</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'positive-self-talk': {
            title: 'Positive Self-Talk Guide',
            content: `
                <div class="guide-content">
                    <h3>Developing a Kinder Inner Voice</h3>
                    <div class="guide-section">
                        <h4>Identifying Negative Patterns</h4>
                        <ul>
                            <li><strong>Catastrophizing:</strong> Imagining worst-case scenarios</li>
                            <li><strong>All-or-Nothing:</strong> Seeing things in black and white</li>
                            <li><strong>Self-Blame:</strong> Taking responsibility for everything</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Reframing Techniques</h4>
                        <ul>
                            <li><strong>Evidence Checking:</strong> Ask "Is this thought realistic?"</li>
                            <li><strong>Perspective Taking:</strong> "What would I tell a friend?"</li>
                            <li><strong>Growth Mindset:</strong> Replace "I can't" with "I'm learning"</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Daily Affirmation Practice</h4>
                        <ul>
                            <li><strong>Morning Affirmations:</strong> Start day with positive statements</li>
                            <li><strong>Gratitude Practice:</strong> List 3 things you're grateful for</li>
                            <li><strong>Self-Compassion:</strong> Treat yourself with kindness</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'healthy-relationships': {
            title: 'Healthy Relationships Guide',
            content: `
                <div class="guide-content">
                    <h3>Building Supportive Connections</h3>
                    <div class="guide-section">
                        <h4>Communication Skills</h4>
                        <ul>
                            <li><strong>Active Listening:</strong> Give full attention, avoid interrupting</li>
                            <li><strong>I-Statements:</strong> Express feelings without blame</li>
                            <li><strong>Empathy:</strong> Try to understand others' perspectives</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Conflict Resolution</h4>
                        <ul>
                            <li><strong>Stay Calm:</strong> Take breaks when emotions run high</li>
                            <li><strong>Focus on Issues:</strong> Address behavior, not personality</li>
                            <li><strong>Seek Solutions:</strong> Work together to find compromises</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Relationship Maintenance</h4>
                        <ul>
                            <li><strong>Quality Time:</strong> Regular one-on-one interactions</li>
                            <li><strong>Express Appreciation:</strong> Acknowledge others' contributions</li>
                            <li><strong>Respect Boundaries:</strong> Honor others' limits and needs</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'environment-care': {
            title: 'Environment Care Guide',
            content: `
                <div class="guide-content">
                    <h3>Creating Supportive Spaces</h3>
                    <div class="guide-section">
                        <h4>Home Environment</h4>
                        <ul>
                            <li><strong>Decluttering:</strong> Remove unnecessary items weekly</li>
                            <li><strong>Cleaning Routine:</strong> Daily tidying, weekly deep clean</li>
                            <li><strong>Organization Systems:</strong> Everything has a designated place</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Creating Calm Spaces</h4>
                        <ul>
                            <li><strong>Natural Light:</strong> Open curtains, use bright bulbs</li>
                            <li><strong>Plants:</strong> Add greenery for air quality and mood</li>
                            <li><strong>Comfortable Seating:</strong> Create cozy relaxation areas</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Digital Environment</h4>
                        <ul>
                            <li><strong>Screen Time Limits:</strong> Set boundaries on device usage</li>
                            <li><strong>Social Media Cleanse:</strong> Unfollow negative accounts</li>
                            <li><strong>Tech-Free Zones:</strong> Designate areas without devices</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'selfcare-scheduling': {
            title: 'Self-Care Scheduling Guide',
            content: `
                <div class="guide-content">
                    <h3>Making Time for Yourself</h3>
                    <div class="guide-section">
                        <h4>Daily Self-Care (5-30 minutes)</h4>
                        <ul>
                            <li><strong>Morning Ritual:</strong> Meditation, stretching, or journaling</li>
                            <li><strong>Lunch Break:</strong> Step outside, eat mindfully</li>
                            <li><strong>Evening Wind-down:</strong> Bath, reading, or music</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Weekly Self-Care (1-3 hours)</h4>
                        <ul>
                            <li><strong>Hobby Time:</strong> Engage in enjoyable activities</li>
                            <li><strong>Social Connection:</strong> Meet with friends or family</li>
                            <li><strong>Nature Time:</strong> Walk in park, garden, or hike</li>
                        </ul>
                    </div>
                    
                    <div class="guide-section">
                        <h4>Monthly Self-Care (Half or full day)</h4>
                        <ul>
                            <li><strong>Solo Adventure:</strong> Museum, movie, or new restaurant</li>
                            <li><strong>Spa Day:</strong> At-home or professional treatments</li>
                            <li><strong>Digital Detox:</strong> Disconnect from technology</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };

    const guide = guides[guideType];

    if (guide) {
        showNotification(`Opening ${guide.title}...`, 'info');

        // Create and show the guide modal
        createGuideModal(guide);
    } else {
        showNotification('Guide not found!', 'error');
    }
}

// Create Guide Modal Function - ADD THIS NEW FUNCTION
function createGuideModal(guide) {
    // Remove any existing guide modal
    const existingModal = document.getElementById('guide-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'guide-modal';
    modal.className = 'guide-modal-overlay';

    modal.innerHTML = `
        <div class="guide-modal-content">
            <div class="guide-modal-header">
                <h2 class="guide-modal-title">${guide.title}</h2>
                <button class="guide-modal-close" onclick="closeGuideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="guide-modal-body">
                ${guide.content}
            </div>
            <div class="guide-modal-footer">
                <button class="guide-btn guide-btn-primary" onclick="downloadGuideAsPDF('${guide.title}')">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="guide-btn guide-btn-secondary" onclick="closeGuideModal()">
                    Close
                </button>
            </div>
        </div>
    `;

    // Add to body
    document.body.appendChild(modal);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
        const closeBtn = modal.querySelector('.guide-modal-close');
        if (closeBtn) closeBtn.focus();
    }, 300);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGuideModal();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeGuideModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Close Guide Modal Function - ADD THIS NEW FUNCTION
function closeGuideModal() {
    const modal = document.getElementById('guide-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Download Guide as PDF Function - ADD THIS NEW FUNCTION
function downloadGuideAsPDF(title) {
    const modal = document.querySelector('.guide-modal-content');
    if (!modal) return;

    // Get the guide content
    const content = modal.querySelector('.guide-modal-body').innerHTML;

    // Convert to text format for download
    const textContent = content
        .replace(/<h3>/g, '\n=== ')
        .replace(/<\/h3>/g, ' ===\n')
        .replace(/<h4>/g, '\n--- ')
        .replace(/<\/h4>/g, ' ---\n')
        .replace(/<li>/g, '• ')
        .replace(/<\/li>/g, '\n')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, ': ')
        .replace(/<[^>]*>/g, '')
        .replace(/\n\s*\n/g, '\n\n');

    const fullContent = `${title}\n${'='.repeat(title.length)}\n\n${textContent}\n\nGenerated by MentAura - ${new Date().toLocaleDateString()}`;

    // Create download
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('Guide downloaded successfully!', 'success');
}


// Video Player Functions
function playVideo(videoTitle) {
    console.log(`Playing video: ${videoTitle}`);
    showNotification(`Video is now embedded and ready to play: ${videoTitle}`, 'info');
    // YouTube videos are now embedded directly in the page
    // Users can click play on the iframe to start watching
}

// Article Reader Functions
function readArticle(articleTitle) {
    displayFullArticle(articleTitle);
}

function displayFullArticle(articleTitle) {
    const article = articlesData[articleTitle];
    if (!article) {
        showNotification('Article content not found', 'error');
        return;
    }

    // Create modal if it doesn't exist
    let modal = document.getElementById('article-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'article-modal';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        document.body.appendChild(modal);
    }

    // Modal content
    modal.innerHTML = `
        <div class="article-modal-content" style="
            background: #fff;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <div class="article-header" style="
                padding: 20px 30px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, var(--primary-color, #c4b5fd), var(--secondary-color, #f9a8d4));
                color: white;
            ">
                <div class="article-title-info">
                    <span class="article-badge" style="
                        background: rgba(255,255,255,0.2);
                        padding: 4px 10px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        margin-bottom: 5px;
                        display: inline-block;
                    ">${article.category}</span>
                    <h2 style="margin: 0; font-size: 1.5rem; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${articleTitle}</h2>
                </div>
                <button id="modal-close-btn" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                "><i class="fas fa-times"></i></button>
            </div>
            
            <div class="article-meta-bar" style="
                padding: 10px 30px;
                background: #f8f9fa;
                border-bottom: 1px solid #eee;
                display: flex;
                gap: 20px;
                font-size: 0.9rem;
                color: #666;
            ">
                <span><i class="fas fa-user-circle"></i> ${article.author}</span>
                <span><i class="fas fa-clock"></i> ${article.readTime}</span>
            </div>

            <div class="article-body" style="
                padding: 30px;
                overflow-y: auto;
                line-height: 1.8;
                color: #333;
                font-size: 1.05rem;
            ">
                ${article.content}
            </div>
            
            <div class="article-footer" style="
                padding: 15px 30px;
                border-top: 1px solid #eee;
                text-align: right;
            ">
                <button id="modal-footer-close-btn" style="
                    background: var(--primary-color, #6366f1);
                    color: white;
                    border: none;
                    padding: 10px 25px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: transform 0.2s;
                ">Close Article</button>
            </div>
        </div>
    `;

    // Force button priority with z-index
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.style.position = 'relative';
        closeBtn.style.zIndex = '1000';
        closeBtn.onclick = closeArticleModal;
    }

    const footerCloseBtn = document.getElementById('modal-footer-close-btn');
    if (footerCloseBtn) {
        footerCloseBtn.onclick = closeArticleModal;
    }

    // Show modal
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.querySelector('.article-modal-content').style.transform = 'translateY(0)';
    });

    // Close on click outside
    modal.onclick = (e) => {
        if (e.target === modal) closeArticleModal();
    };

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Global function to close modal
function closeArticleModal() {
    console.log('Closing article modal');
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.querySelector('.article-modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }
}

// Attach to window just in case inline handlers are needed elsewhere
window.closeArticleModal = closeArticleModal;


// Modal Functions
// Article contents data object for 6 comprehensive articles
const articlesData = {
    "Understanding Anxiety Disorders": {
        author: "Dr. Sarah Khan",
        readTime: "8 min read",
        category: "Psychology",
        content: `
            <p>Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. These disorders are characterized by excessive fear, worry, or nervousness that interferes with daily activities and relationships.</p>
            
            <h4>Types of Anxiety Disorders</h4>
            <p><strong>Generalized Anxiety Disorder (GAD):</strong> Persistent and excessive worry about various aspects of life, even when there's little or no reason to worry.</p>
            <p><strong>Panic Disorder:</strong> Recurrent panic attacks accompanied by intense physical symptoms like heart palpitations, sweating, and shortness of breath.</p>
            <p><strong>Social Anxiety Disorder:</strong> Intense fear of social situations due to concerns about being judged or embarrassed.</p>
            <p><strong>Specific Phobias:</strong> Irrational fear of specific objects or situations, such as heights, flying, or spiders.</p>
            
            <h4>Common Symptoms</h4>
            <p>Physical symptoms may include rapid heartbeat, sweating, trembling, fatigue, and difficulty concentrating. Emotional symptoms often involve excessive worry, restlessness, irritability, and feeling overwhelmed.</p>
            
            <h4>Causes and Risk Factors</h4>
            <p>Anxiety disorders result from a complex interaction of genetic predisposition, brain chemistry imbalances, personality factors, and life experiences. Traumatic events, chronic stress, and certain medical conditions can also trigger or worsen anxiety.</p>
            
            <h4>Treatment Options</h4>
            <p><strong>Cognitive Behavioral Therapy (CBT):</strong> Helps identify and change negative thought patterns and behaviors.</p>
            <p><strong>Medications:</strong> Anti-anxiety medications and antidepressants can help manage symptoms.</p>
            <p><strong>Lifestyle Changes:</strong> Regular exercise, adequate sleep, stress management, and avoiding caffeine and alcohol can significantly improve symptoms.</p>
            <p><strong>Mindfulness and Relaxation:</strong> Techniques like meditation, deep breathing, and progressive muscle relaxation can provide relief.</p>
        `
    },
    "The Science of Happiness": {
        author: "Dr. Ahmad Ali",
        readTime: "12 min read",
        category: "Wellness",
        content: `
            <p>Happiness is more than just a fleeting emotion—it's a state of well-being that encompasses living a good life with meaning and deep satisfaction. Scientific research has revealed fascinating insights about what makes us truly happy and how we can cultivate lasting happiness.</p>
            
            <h4>The Neuroscience of Happiness</h4>
            <p>Our brains are wired with complex systems that influence our happiness levels. Key neurotransmitters like serotonin, dopamine, and endorphins play crucial roles in regulating mood and creating feelings of pleasure and satisfaction.</p>
            
            <h4>The Happiness Set Point Theory</h4>
            <p>Research suggests that about 50% of our happiness is determined by genetics, 10% by circumstances, and 40% by our actions and mindset. This means we have significant control over our happiness levels through our choices and behaviors.</p>
            
            <h4>Key Factors for Lasting Happiness</h4>
            <p><strong>Strong Relationships:</strong> Social connections are the strongest predictor of happiness. Quality relationships provide support, meaning, and joy.</p>
            <p><strong>Gratitude Practice:</strong> Regularly acknowledging what we're thankful for rewires our brains to focus on positive aspects of life.</p>
            <p><strong>Acts of Kindness:</strong> Helping others creates a "helper's high" and contributes to our sense of purpose and connection.</p>
            <p><strong>Flow Activities:</strong> Engaging in activities that challenge us appropriately and fully absorb our attention creates states of flow that enhance well-being.</p>
            
            <h4>Practical Strategies</h4>
            <p><strong>Mindfulness Meditation:</strong> Regular practice increases awareness and acceptance while reducing negative rumination.</p>
            <p><strong>Exercise:</strong> Physical activity releases endorphins and provides numerous mental health benefits.</p>
            <p><strong>Goal Setting:</strong> Working toward meaningful goals gives life direction and purpose.</p>
            <p><strong>Savoring:</strong> Intentionally enjoying positive experiences amplifies their impact on our well-being.</p>
        `
    },
    "Building Healthy Relationships": {
        author: "Dr. Fatima Sheikh",
        readTime: "10 min read",
        category: "Relationships",
        content: `
            <p>Healthy relationships form the foundation of a fulfilling life. They provide support, love, and meaning while contributing significantly to our mental and physical well-being. Building and maintaining these connections requires intentional effort and specific skills.</p>
            
            <h4>Characteristics of Healthy Relationships</h4>
            <p><strong>Trust:</strong> The foundation of any strong relationship, built through consistency, honesty, and reliability over time.</p>
            <p><strong>Communication:</strong> Open, honest, and respectful dialogue that allows both parties to express their thoughts and feelings safely.</p>
            <p><strong>Respect:</strong> Acknowledging each other's boundaries, opinions, and individual worth, even during disagreements.</p>
            <p><strong>Support:</strong> Being there for each other during both challenging and celebratory times.</p>
            
            <h4>Effective Communication Skills</h4>
            <p><strong>Active Listening:</strong> Fully focusing on what the other person is saying without planning your response or making assumptions.</p>
            <p><strong>"I" Statements:</strong> Expressing your feelings and needs without blaming or attacking the other person.</p>
            <p><strong>Empathy:</strong> Trying to understand and validate the other person's perspective and emotions.</p>
            <p><strong>Non-Verbal Communication:</strong> Being aware of body language, tone of voice, and facial expressions.</p>
            
            <h4>Conflict Resolution</h4>
            <p>Healthy relationships don't avoid conflict but handle it constructively. Focus on the specific issue rather than attacking the person. Take breaks when emotions run high, and always work toward solutions that respect both parties' needs.</p>
            
            <h4>Setting Boundaries</h4>
            <p>Healthy boundaries protect your well-being while respecting others. They involve being clear about your needs, saying no when necessary, and maintaining your individual identity within the relationship.</p>
            
            <h4>Nurturing Long-term Connections</h4>
            <p>Regularly express appreciation and gratitude. Make time for shared activities and individual interests. Show physical affection appropriately, and continue to grow as individuals while supporting each other's development.</p>
        `
    },
    "Sleep and Mental Health": {
        author: "Dr. Rajesh Sharma",
        readTime: "6 min read",
        category: "Sleep",
        content: `
            <p>Sleep is not a luxury—it's a fundamental biological need that directly impacts our mental health, emotional regulation, and cognitive function. Quality sleep is essential for processing emotions, consolidating memories, and maintaining psychological well-being.</p>
            
            <h4>The Sleep-Mental Health Connection</h4>
            <p>During sleep, our brains process the day's experiences, regulate neurotransmitters, and clear toxins. Poor sleep disrupts these processes, leading to increased risk of depression, anxiety, and other mental health challenges.</p>
            
            <h4>Understanding Sleep Cycles</h4>
            <p>A complete sleep cycle lasts about 90 minutes and includes four stages: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Each stage plays a unique role in mental restoration and emotional processing.</p>
            
            <h4>Common Sleep Disorders</h4>
            <p><strong>Insomnia:</strong> Difficulty falling asleep or staying asleep, often related to stress, anxiety, or poor sleep habits.</p>
            <p><strong>Sleep Apnea:</strong> Interrupted breathing during sleep, leading to poor sleep quality and daytime fatigue.</p>
            <p><strong>Restless Leg Syndrome:</strong> Uncomfortable sensations in the legs that interfere with falling asleep.</p>
            
            <h4>Sleep Hygiene Tips</h4>
            <p><strong>Consistent Schedule:</strong> Go to bed and wake up at the same time every day, including weekends.</p>
            <p><strong>Sleep Environment:</strong> Keep your bedroom cool, dark, and quiet. Invest in comfortable bedding.</p>
            <p><strong>Pre-Sleep Routine:</strong> Develop calming activities like reading, gentle stretching, or meditation before bed.</p>
            <p><strong>Limit Stimulants:</strong> Avoid caffeine, nicotine, and large meals close to bedtime.</p>
            <p><strong>Technology Boundaries:</strong> Reduce screen time at least one hour before sleep, as blue light can interfere with melatonin production.</p>
            
            <h4>When to Seek Help</h4>
            <p>If sleep problems persist despite good sleep hygiene, consult a healthcare provider. Chronic sleep issues may require professional evaluation and treatment to prevent long-term mental health consequences.</p>
        `
    },
    "Exercise for Mental Health": {
        author: "Dr. Priya Patel",
        readTime: "9 min read",
        category: "Wellness",
        content: `
            <p>Physical activity is one of the most powerful tools for improving mental health. Exercise acts as a natural antidepressant, anxiety reducer, and mood booster while providing numerous cognitive benefits that enhance overall psychological well-being.</p>
            
            <h4>The Science Behind Exercise and Mental Health</h4>
            <p>Exercise triggers the release of endorphins, often called "feel-good" hormones, which create feelings of happiness and euphoria. It also increases the production of BDNF (Brain-Derived Neurotrophic Factor), which supports brain health and neuroplasticity.</p>
            
            <h4>Mental Health Benefits</h4>
            <p><strong>Reduced Depression:</strong> Regular exercise can be as effective as medication for mild to moderate depression.</p>
            <p><strong>Anxiety Relief:</strong> Physical activity helps burn off stress hormones and reduces physical tension.</p>
            <p><strong>Improved Self-Esteem:</strong> Achieving fitness goals and feeling stronger boosts confidence and self-worth.</p>
            <p><strong>Better Sleep:</strong> Exercise helps regulate circadian rhythms and promotes deeper, more restorative sleep.</p>
            <p><strong>Cognitive Enhancement:</strong> Regular activity improves memory, focus, and executive function.</p>
            
            <h4>Types of Beneficial Exercise</h4>
            <p><strong>Aerobic Exercise:</strong> Activities like walking, running, cycling, and swimming that increase heart rate and breathing.</p>
            <p><strong>Strength Training:</strong> Weight lifting or resistance exercises that build muscle and bone strength.</p>
            <p><strong>Yoga:</strong> Combines physical movement with mindfulness and breathing techniques.</p>
            <p><strong>Dance:</strong> Provides cardiovascular benefits while being enjoyable and social.</p>
            <p><strong>Team Sports:</strong> Offer physical activity plus social connection and support.</p>
            
            <h4>Getting Started</h4>
            <p>Begin with small, achievable goals like a 10-minute daily walk. Gradually increase duration and intensity. Choose activities you enjoy to increase adherence. Even light exercise provides mental health benefits, so don't feel pressured to do high-intensity workouts.</p>
            
            <h4>Overcoming Barriers</h4>
            <p>Start small when motivation is low. Use exercise as a form of self-care rather than punishment. Find accountability through friends, apps, or fitness communities. Remember that some movement is always better than none.</p>
        `
    },
    "Mindfulness in Daily Life": {
        author: "Dr. Zara Ahmed",
        readTime: "7 min read",
        category: "Mindfulness",
        content: `
            <p>Mindfulness is the practice of maintaining moment-to-moment awareness of our thoughts, feelings, bodily sensations, and surrounding environment with openness and acceptance. This ancient practice, now backed by extensive scientific research, offers profound benefits for mental health and overall well-being.</p>
            
            <h4>Understanding Mindfulness</h4>
            <p>Mindfulness involves paying attention to the present moment without judgment. It's about observing our experiences as they unfold rather than getting caught up in regrets about the past or worries about the future.</p>
            
            <h4>Scientific Benefits</h4>
            <p><strong>Stress Reduction:</strong> Mindfulness activates the parasympathetic nervous system, reducing cortisol levels and promoting relaxation.</p>
            <p><strong>Improved Focus:</strong> Regular practice strengthens attention and concentration abilities.</p>
            <p><strong>Emotional Regulation:</strong> Helps create space between thoughts and reactions, allowing for more thoughtful responses.</p>
            <p><strong>Reduced Rumination:</strong> Breaks cycles of negative thinking that contribute to depression and anxiety.</p>
            <p><strong>Enhanced Self-Awareness:</strong> Increases understanding of personal patterns and triggers.</p>
            
            <h4>Simple Mindfulness Techniques</h4>
            <p><strong>Breath Awareness:</strong> Focus on the sensation of breathing, noticing each inhale and exhale without trying to change it.</p>
            <p><strong>Body Scan:</strong> Systematically notice sensations throughout your body from head to toe.</p>
            <p><strong>Mindful Walking:</strong> Pay attention to the physical sensations of walking and your surroundings.</p>
            <p><strong>5-4-3-2-1 Grounding:</strong> Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.</p>
            
            <h4>Integrating Mindfulness into Daily Activities</h4>
            <p><strong>Mindful Eating:</strong> Pay attention to flavors, textures, and the experience of nourishing your body.</p>
            <p><strong>Mindful Listening:</strong> Give your full attention to conversations without planning what to say next.</p>
            <p><strong>Mindful Technology Use:</strong> Be intentional about when and how you use devices, taking regular breaks.</p>
            
            <h4>Starting Your Practice</h4>
            <p>Begin with just 5 minutes daily. Use apps or guided meditations if helpful. Be patient and kind with yourself—the mind naturally wanders, and noticing this is part of the practice. Consistency matters more than duration.</p>
        `
    }
};

// Function to display full article content
// Function to display full article content
function displayFullArticle(title) {
    const article = articlesData[title];
    if (!article) {
        showNotification(`Article "${title}" not found`, 'error');
        return;
    }

    // Create or get the article reader container
    let articleReader = document.getElementById('article-reader');
    if (!articleReader) {
        articleReader = document.createElement('div');
        articleReader.id = 'article-reader';
        articleReader.className = 'article-reader-container';
        document.body.appendChild(articleReader);
    }

    // Display the full article in modal format
    articleReader.innerHTML = `
        <div class="article-modal-content">
            <div class="article-header">
                <button id="closeArticleBtn" class="close-article-btn" aria-label="Close article">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="article-title">${title}</h2>
                <div class="article-meta">
                    <span class="article-category">${article.category}</span>
                    <span class="article-author">By ${article.author}</span>
                    <span class="article-read-time"><i class="fas fa-clock"></i> ${article.readTime}</span>
                </div>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
            <div class="article-footer">
                <button id="shareArticleBtn" class="share-article-btn">
                    <i class="fas fa-share"></i> Share Article
                </button>
                <button id="saveArticleBtn" class="save-article-btn">
                    <i class="fas fa-bookmark"></i> Save for Later
                </button>
            </div>
        </div>
    `;

    // Show the article reader modal
    articleReader.style.display = 'flex';
    articleReader.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Close modal when clicking outside the content
    articleReader.addEventListener('click', (e) => {
        if (e.target === articleReader) {
            closeArticleModal();
        }
    });

    // Get all the interactive elements
    const closeBtn = document.getElementById('closeArticleBtn');
    const shareBtn = document.getElementById('shareArticleBtn');
    const saveBtn = document.getElementById('saveArticleBtn');

    // Close button functionality
    closeBtn.addEventListener('click', closeArticleModal);

    // Share button functionality
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `Check out this mental health article: ${title}`,
                url: window.location.href
            }).then(() => {
                showNotification('Article shared successfully!', 'success');
            }).catch((error) => {
                console.log('Error sharing article:', error);
                // Fallback to clipboard
                copyToClipboard();
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            copyToClipboard();
        }

        function copyToClipboard() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showNotification('Article link copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Unable to copy link', 'error');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showNotification('Article link copied to clipboard!', 'success');
                } catch (err) {
                    showNotification('Unable to copy link', 'error');
                }
                document.body.removeChild(textArea);
            }
        }
    });

    // Save button functionality
    saveBtn.addEventListener('click', () => {
        try {
            // Get existing saved articles from localStorage
            const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');

            if (!savedArticles.includes(title)) {
                // Add new article to saved list
                savedArticles.push(title);
                localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

                // Update button appearance
                saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
                saveBtn.classList.add('saved');
                saveBtn.disabled = true;

                // Show success notification
                showNotification('Article saved successfully!', 'success');
            } else {
                // Article already saved
                showNotification('Article already saved', 'info');
            }
        } catch (error) {
            console.error('Error saving article:', error);
            showNotification('Error saving article', 'error');
        }
    });

    // Check if article is already saved and update button accordingly
    try {
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        if (savedArticles.includes(title)) {
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
            saveBtn.classList.add('saved');
            saveBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error checking saved articles:', error);
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyDown);

    // Focus management for accessibility
    setTimeout(() => {
        closeBtn.focus();
    }, 300);
}

// Function to close article modal
function closeArticleModal() {
    const articleReader = document.getElementById('article-reader');
    if (articleReader) {
        // Hide modal with animation
        articleReader.style.display = 'none';
        articleReader.classList.remove('show');

        // Restore background scrolling
        document.body.style.overflow = 'auto';

        // Clean up the modal content
        setTimeout(() => {
            articleReader.innerHTML = '';
        }, 300);
    }

    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyDown);
}

// Handle keyboard navigation
function handleKeyDown(e) {
    const articleReader = document.getElementById('article-reader');
    if (!articleReader || articleReader.style.display === 'none') return;

    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeArticleModal();
            break;

        case 'Tab':
            // Ensure tab navigation stays within modal
            const focusableElements = articleReader.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
            break;
    }
}

// Utility function to check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Function to get saved articles (with error handling)
function getSavedArticles() {
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available');
        return [];
    }

    try {
        return JSON.parse(localStorage.getItem('savedArticles') || '[]');
    } catch (error) {
        console.error('Error parsing saved articles:', error);
        return [];
    }
}

// Function to save article (with error handling)
function saveArticleToStorage(title) {
    if (!isLocalStorageAvailable()) {
        showNotification('Unable to save - storage not available', 'error');
        return false;
    }

    try {
        const savedArticles = getSavedArticles();
        if (!savedArticles.includes(title)) {
            savedArticles.push(title);
            localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving article:', error);
        showNotification('Error saving article', 'error');
        return false;
    }
}

// Add CSS styles for article reader (inject into page)
// Add CSS styles for article reader (inject into page)
const articleReaderStyles = `
<style>
/* Modal Overlay */
.article-reader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, 
        rgba(74, 44, 111, 0.7) 0%, 
        rgba(139, 44, 90, 0.7) 25%, 
        rgba(30, 58, 138, 0.7) 50%, 
        rgba(76, 29, 149, 0.7) 75%, 
        rgba(190, 24, 93, 0.7) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    animation: modalFadeIn 0.4s ease-out;
}

/* Article Modal Content - Fixed height container */
.article-modal-content {
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.25) 0%, 
        rgba(255, 255, 255, 0.15) 50%, 
        rgba(255, 255, 255, 0.1) 100%);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 32px;
    width: 90%;
    max-width: 1000px;
    height: 90vh;
    max-height: 700px;
    box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.25),
        0 12px 25px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Header Section - Fixed size */
.article-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: var(--gray-800, #2a1f3d);
    padding: 2rem 3rem 1.5rem;
    position: relative;
    flex-shrink: 0;
    border-radius: 32px 32px 0 0;
    border-bottom: 1px solid rgba(184, 181, 255, 0.2);
}

/* Close Button */
.close-article-btn {
    position: absolute;
    top: 1.5rem;
    right: 2.5rem;
    width: 40px;
    height: 40px;
    background: rgba(184, 181, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(184, 181, 255, 0.3);
    border-radius: 50%;
    color: var(--gray-600, #7a7396);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.3s ease;
    z-index: 10;
}

.close-article-btn:hover {
    background: rgba(184, 181, 255, 0.2);
    color: var(--primary-color, #B8B5FF);
    transform: scale(1.05);
}

/* Article Title */
.article-title {
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    font-weight: 700;
    font-family: var(--font-display, 'Poppins', sans-serif);
    padding-right: 60px;
    line-height: 1.2;
    color: var(--gray-800, #2a1f3d);
    text-align: center;
}

.article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
}

.article-category {
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF), var(--secondary-color, #FFB5E8));
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(184, 181, 255, 0.3);
}

.article-author, .article-read-time {
    color: var(--gray-600, #7a7396);
    font-size: 0.85rem;
    font-weight: 500;
}

/* Scrollable Content Area - This is the key fix */
.article-body {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem 3rem;
    line-height: 1.7;
    color: var(--gray-800, #2a1f3d);
    font-size: 1rem;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    min-height: 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(184, 181, 255, 0.5) rgba(184, 181, 255, 0.1);
}

/* Custom Scrollbar Styles */
.article-body::-webkit-scrollbar {
    width: 10px;
}

.article-body::-webkit-scrollbar-track {
    background: rgba(184, 181, 255, 0.1);
    border-radius: 10px;
    margin: 5px;
}

.article-body::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF), var(--secondary-color, #FFB5E8));
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.article-body::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--primary-dark, #9A96F0), var(--secondary-dark, #FF9FDD));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.article-body::-webkit-scrollbar-corner {
    background: transparent;
}

/* Content Typography */
.article-body h4 {
    color: var(--primary-color, #B8B5FF);
    margin: 1.5rem 0 0.8rem 0;
    font-size: 1.2rem;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.3rem;
}

.article-body h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color, #B8B5FF), transparent);
    border-radius: 2px;
}

.article-body p {
    margin-bottom: 1.2rem;
    text-align: justify;
}

.article-body strong {
    color: var(--primary-color, #B8B5FF);
    font-weight: 700;
    background: rgba(184, 181, 255, 0.1);
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
}

/* Footer Section - Fixed at bottom */
.article-footer {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.5rem 3rem 2rem;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    border-top: 1px solid rgba(184, 181, 255, 0.2);
    flex-shrink: 0;
    border-radius: 0 0 32px 32px;
}

/* Action Buttons */
.share-article-btn, .save-article-btn {
    flex: 1;
    min-width: 180px;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF) 0%, var(--secondary-color, #FFB5E8) 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    font-family: var(--font-primary, 'Inter', sans-serif);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 6px 20px rgba(184, 181, 255, 0.4);
    position: relative;
    overflow: hidden;
}

.share-article-btn::before, .save-article-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
}

.share-article-btn:hover::before, .save-article-btn:hover::before {
    left: 100%;
}

.share-article-btn:hover, .save-article-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(184, 181, 255, 0.5);
    background: linear-gradient(135deg, var(--primary-dark, #9A96F0) 0%, var(--secondary-dark, #FF9FDD) 100%);
}

.save-article-btn.saved {
    background: linear-gradient(135deg, var(--success-color, #B5FFB8) 0%, #10b981 100%);
    box-shadow: 0 6px 20px rgba(181, 255, 184, 0.4);
}

.save-article-btn.saved:hover {
    background: linear-gradient(135deg, #10b981 0%, var(--success-color, #B5FFB8) 100%);
    box-shadow: 0 10px 25px rgba(181, 255, 184, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
    .article-reader-container {
        padding: 15px;
    }
    
    .article-modal-content {
        width: 95%;
        height: 95vh;
        max-height: none;
        border-radius: 24px;
    }
    
    .article-header {
        padding: 1.5rem 2rem 1rem;
        border-radius: 24px 24px 0 0;
    }
    
    .close-article-btn {
        top: 1rem;
        right: 1.5rem;
        width: 35px;
        height: 35px;
    }
    
    .article-title {
        font-size: 1.5rem;
        padding-right: 50px;
    }
    
    .article-meta {
        gap: 0.8rem;
    }
    
    .article-body {
        padding: 1.5rem 2rem;
        font-size: 0.95rem;
    }
    
    .article-footer {
        padding: 1.2rem 2rem 1.5rem;
        flex-direction: column;
        border-radius: 0 0 24px 24px;
    }
    
    .share-article-btn, .save-article-btn {
        width: 100%;
        min-width: auto;
    }
}

@media (max-width: 480px) {
    .article-reader-container {
        padding: 10px;
    }
    
    .article-modal-content {
        width: 98%;
        height: 98vh;
        border-radius: 20px;
    }
    
    .article-header {
        padding: 1.2rem 1.5rem 0.8rem;
        border-radius: 20px 20px 0 0;
    }
    
    .close-article-btn {
        width: 32px;
        height: 32px;
        font-size: 14px;
    }
    
    .article-title {
        font-size: 1.3rem;
    }
    
    .article-body {
        padding: 1.2rem 1.5rem;
        font-size: 0.9rem;
    }
    
    .article-footer {
        padding: 1rem 1.5rem;
        border-radius: 0 0 20px 20px;
    }
}

/* Smooth Animations */
@keyframes modalFadeIn {
    from {
        opacity: 0;
        backdrop-filter: blur(0px);
    }
    to {
        opacity: 1;
        backdrop-filter: blur(20px);
    }
}

@keyframes modalSlideUp {
    from {
        transform: translateY(60px) scale(0.95);
        opacity: 0;
    }
    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

/* Button active state */
.share-article-btn:active, .save-article-btn:active {
    transform: scale(0.95);
    transition: transform 0.1s;
}
</style>
`;

// ═══════════════════════════════════════════════════════════════════
// ADD THIS RIGHT AFTER THE EXISTING `articleReaderStyles` VARIABLE
// ═══════════════════════════════════════════════════════════════════

const journalEntriesStyles = `
/* Saved Journal Entries Section */
.saved-journal-entries {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    margin: 2rem 0;
    border: 1px solid rgba(184, 181, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.saved-journal-entries h3 {
    color: var(--primary-color, #B8B5FF);
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.journal-entry-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    border: 1px solid rgba(184, 181, 255, 0.3);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
}

.journal-entry-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184, 181, 255, 0.2);
    border-color: rgba(184, 181, 255, 0.5);
}

.entry-actions {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.entry-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.view-btn {
    background: linear-gradient(135deg, #B8B5FF, #E8E6FF);
    color: var(--gray-800, #2a1f3d);
}

.edit-btn {
    background: linear-gradient(135deg, #FFB5E8, #FFEEF8);
    color: var(--gray-800, #2a1f3d);
}

.delete-btn {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
}

.entries-btn {
    background: linear-gradient(135deg, #B8B5FF 0%, #FFB5E8 100%);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Entry View Modal */
.entry-view-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(74, 44, 111, 0.7) 0%, rgba(190, 24, 93, 0.7) 100%);
    backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.entry-view-content {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
}
`;

// Inject Guide Modal Styles - ADD THIS AFTER EXISTING STYLES
const guideModalStyles = `
<style id="guide-modal-styles">
/* Guide Modal Styles */
.guide-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(74, 44, 111, 0.8) 0%, rgba(190, 24, 93, 0.8) 100%);
    backdrop-filter: blur(20px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: modalFadeIn 0.3s ease-out;
}

.guide-modal-content {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    width: 90%;
    max-width: 900px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.guide-modal-header {
    background: rgba(255, 255, 255, 0.95);
    padding: 2rem 2.5rem 1.5rem;
    border-bottom: 1px solid rgba(184, 181, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.guide-modal-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-color, #B8B5FF);
    font-family: var(--font-display, 'Poppins', sans-serif);
}

.guide-modal-close {
    width: 40px;
    height: 40px;
    background: rgba(184, 181, 255, 0.1);
    border: 1px solid rgba(184, 181, 255, 0.3);
    border-radius: 50%;
    color: var(--gray-600, #7a7396);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.3s ease;
}

.guide-modal-close:hover {
    background: rgba(184, 181, 255, 0.2);
    color: var(--primary-color, #B8B5FF);
    transform: scale(1.05);
}

.guide-modal-body {
    padding: 2rem 2.5rem;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
}

.guide-content h3 {
    color: var(--primary-color, #B8B5FF);
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
}

.guide-section {
    margin-bottom: 2rem;
    background: rgba(184, 181, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    border-left: 4px solid var(--primary-color, #B8B5FF);
}

.guide-section h4 {
    color: var(--gray-800, #2a1f3d);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
}

.guide-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.guide-section li {
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.5;
    color: var(--gray-700, #4a4a6a);
}

.guide-section li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--primary-color, #B8B5FF);
    font-weight: bold;
    font-size: 1.2rem;
}

.guide-section li strong {
    color: var(--primary-color, #B8B5FF);
    font-weight: 600;
}

.guide-tips {
    background: linear-gradient(135deg, rgba(255, 181, 232, 0.1) 0%, rgba(184, 181, 255, 0.1) 100%);
    border-radius: 16px;
    padding: 1.5rem;
    margin-top: 1.5rem;
    border: 1px solid rgba(184, 181, 255, 0.2);
}

.guide-tips h4 {
    color: var(--secondary-color, #FFB5E8);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
}

.guide-tips p {
    color: var(--gray-700, #4a4a6a);
    line-height: 1.6;
    margin: 0;
}

.guide-modal-footer {
    background: rgba(255, 255, 255, 0.95);
    padding: 1.5rem 2.5rem 2rem;
    border-top: 1px solid rgba(184, 181, 255, 0.2);
    display: flex;
    gap: 1rem;
    flex-shrink: 0;
}

.guide-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-primary, 'Inter', sans-serif);
}

.guide-btn-primary {
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF) 0%, var(--secondary-color, #FFB5E8) 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(184, 181, 255, 0.4);
}

.guide-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(184, 181, 255, 0.5);
}

.guide-btn-secondary {
    background: rgba(184, 181, 255, 0.1);
    color: var(--gray-700, #4a4a6a);
    border: 1px solid rgba(184, 181, 255, 0.3);
}

.guide-btn-secondary:hover {
    background: rgba(184, 181, 255, 0.2);
}

/* Saved Tracker Display Styles */
.saved-tracker-display {
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(184, 181, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.saved-activities-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.saved-activities-header h4 {
    color: var(--primary-color, #B8B5FF);
    margin: 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.activity-count {
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF), var(--secondary-color, #FFB5E8));
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.saved-activities-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.saved-activity-item {
    background: rgba(184, 181, 255, 0.1);
    padding: 0.8rem 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border: 1px solid rgba(184, 181, 255, 0.2);
}

.saved-activity-item i {
    color: var(--success-color, #10b981);
    font-size: 1.1rem;
}

.saved-activity-item span {
    color: var(--gray-700, #4a4a6a);
    font-weight: 500;
}

.saved-activities-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.saved-activity-btn {
    padding: 0.7rem 1.2rem;
    background: linear-gradient(135deg, var(--primary-color, #B8B5FF), var(--secondary-color, #FFB5E8));
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.saved-activity-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(184, 181, 255, 0.4);
}

.no-activities-message {
    text-align: center;
    padding: 2rem;
    color: var(--gray-600, #7a7396);
}

.no-activities-message i {
    font-size: 2rem;
    color: var(--primary-color, #B8B5FF);
    margin-bottom: 1rem;
}

/* Past Tracker Modal */
.past-tracker-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(74, 44, 111, 0.8) 0%, rgba(190, 24, 93, 0.8) 100%);
    backdrop-filter: blur(20px);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.past-tracker-modal-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(25px);
    border-radius: 24px;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.past-tracker-header {
    padding: 2rem 2.5rem 1rem;
    border-bottom: 1px solid rgba(184, 181, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.past-tracker-header h3 {
    margin: 0;
    color: var(--primary-color, #B8B5FF);
    font-size: 1.5rem;
}

.past-tracker-body {
    padding: 2rem 2.5rem;
    overflow-y: auto;
    flex: 1;
}

.past-day-card {
    background: rgba(184, 181, 255, 0.05);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-left: 4px solid var(--primary-color, #B8B5FF);
}

.past-day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.past-day-header h4 {
    margin: 0;
    color: var(--gray-800, #2a1f3d);
}

.past-day-count {
    background: rgba(184, 181, 255, 0.2);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--primary-color, #B8B5FF);
}

.past-day-activities {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.past-activity-tag {
    background: rgba(51, 62, 57, 0.1);
    color: var(--success-color, #415c49ff);
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid rgba(27, 109, 44, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
    .guide-modal-content {
        width: 95%;
        max-height: 90vh;
    }
    
    .guide-modal-header,
    .guide-modal-body,
    .guide-modal-footer {
        padding: 1.5rem;
    }
    
    .guide-modal-title {
        font-size: 1.5rem;
    }
    
    .saved-activities-list {
        grid-template-columns: 1fr;
    }
    
    .saved-activities-actions {
        flex-direction: column;
    }
}
</style>
`;

// Inject the guide modal styles
if (!document.getElementById('guide-modal-styles')) {
    document.head.insertAdjacentHTML('beforeend', guideModalStyles);
}

// Add this right after the existing articleReader styles injection
if (!document.getElementById('journal-entries-styles')) {
    const journalStyleElement = document.createElement('style');
    journalStyleElement.id = 'journal-entries-styles';
    journalStyleElement.innerHTML = journalEntriesStyles;
    document.head.appendChild(journalStyleElement);
}


// Inject styles into page
if (!document.getElementById('article-reader-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'article-reader-styles';
    styleElement.innerHTML = articleReaderStyles;
    document.head.appendChild(styleElement);
}

function closeGameModal() {
    document.getElementById('gameModal').classList.add('hidden');
}

function closeJournalModal() {
    document.getElementById('journalModal').classList.add('hidden');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        'success': 'var(--secondary-color)',
        'error': 'var(--error-color)',
        'warning': 'var(--warning-color)',
        'info': 'var(--primary-color)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function loadResourcesData() {
    // Load any dynamic content
    console.log('Resources data loaded');
}

// Game-specific functions
let breathingInterval;
let breathingCycles = 0;

function startBreathing() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathText');
    const cycleCounter = document.getElementById('cycleCount');

    let isInhaling = true;
    breathingCycles = 0;

    breathingInterval = setInterval(() => {
        if (isInhaling) {
            circle.style.transform = 'scale(1.5)';
            text.textContent = 'Inhale';
            setTimeout(() => {
                isInhaling = false;
                circle.style.transform = 'scale(1)';
                text.textContent = 'Exhale';
                breathingCycles++;
                cycleCounter.textContent = breathingCycles;
            }, 2000);
        } else {
            isInhaling = true;
        }
    }, 4000);

    text.textContent = 'Inhale';
    circle.style.transform = 'scale(1.5)';
}

function stopBreathing() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        const circle = document.getElementById('breathingCircle');
        const text = document.getElementById('breathText');
        circle.style.transform = 'scale(1)';
        text.textContent = 'Session Ended';
    }
}

function selectMood(mood) {
    // Remove previous selections
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to current mood
    event.target.closest('.mood-btn').classList.add('selected');

    console.log('Selected mood:', mood);
}

function saveMood() {
    const selectedMood = document.querySelector('.mood-btn.selected');
    const notes = document.querySelector('.mood-notes textarea').value;

    if (selectedMood) {
        const moodData = {
            mood: selectedMood.getAttribute('data-mood'),
            notes: notes,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const existingMoods = JSON.parse(localStorage.getItem('moodEntries') || '[]');
        existingMoods.push(moodData);
        localStorage.setItem('moodEntries', JSON.stringify(existingMoods));

        showNotification('Mood entry saved successfully!', 'success');
        closeGameModal();
    } else {
        showNotification('Please select a mood first.', 'warning');
    }
}
// CSS Styles for New Games Grid
function injectGameStyles() {
    const gameStyles = `
        <style id="mental-health-games-styles">
            /* Games Grid Container */
            .games-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                padding: 2rem 0;
                max-width: 1400px;
                margin: 0 auto;
            }

            /* Individual Game Cards */
            .game-card {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.25) 0%, 
                    rgba(255, 255, 255, 0.15) 50%, 
                    rgba(255, 255, 255, 0.1) 100%);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 24px;
                padding: 2rem;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.1),
                    0 4px 16px rgba(0, 0, 0, 0.05),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4);
                cursor: pointer;
            }

            .game-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(184, 181, 255, 0.1), 
                    transparent);
                transition: left 0.6s;
            }

            .game-card:hover::before {
                left: 100%;
            }

            .game-card:hover {
                transform: translateY(-8px);
                border-color: rgba(184, 181, 255, 0.5);
                box-shadow: 
                    0 16px 48px rgba(184, 181, 255, 0.2),
                    0 8px 24px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6);
            }

            /* Game Icon Container */
            .game-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #B8B5FF, #FFB5E8);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                box-shadow: 
                    0 8px 24px rgba(184, 181, 255, 0.3),
                    inset 0 2px 4px rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
            }

            .game-icon i {
                font-size: 2rem;
                color: white;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }

            .game-card:hover .game-icon {
                transform: scale(1.1);
                box-shadow: 
                    0 12px 32px rgba(184, 181, 255, 0.4),
                    inset 0 2px 4px rgba(255, 255, 255, 0.4);
            }

            /* Game Content */
            .game-content {
                text-align: center;
                position: relative;
            }

            .game-content h3 {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--gray-800, #2a1f3d);
                margin: 0 0 1rem 0;
                font-family: var(--font-display, 'Poppins', sans-serif);
            }

            .game-content p {
                color: var(--gray-600, #7a7396);
                font-size: 1rem;
                line-height: 1.6;
                margin: 0 0 1.5rem 0;
                opacity: 0.9;
            }

            /* Game Meta Information */
            .game-meta {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                margin: 1.5rem 0;
                flex-wrap: wrap;
            }

            .game-meta span {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.85rem;
                color: var(--gray-600, #7a7396);
                background: rgba(184, 181, 255, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                border: 1px solid rgba(184, 181, 255, 0.2);
                backdrop-filter: blur(10px);
                font-weight: 500;
            }

            .game-meta i {
                font-size: 0.9rem;
                color: var(--primary-color, #B8B5FF);
            }

            /* Game Button */
            .game-btn {
                background: linear-gradient(135deg, #B8B5FF 0%, #FFB5E8 100%);
                border: none;
                color: white;
                padding: 1rem 2rem;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                box-shadow: 
                    0 6px 20px rgba(184, 181, 255, 0.4),
                    0 2px 8px rgba(0, 0, 0, 0.1);
                font-family: var(--font-primary, 'Inter', sans-serif);
                min-width: 140px;
                letter-spacing: 0.3px;
            }

            .game-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.3), 
                    transparent);
                transition: left 0.6s;
            }

            .game-btn:hover::before {
                left: 100%;
            }

            .game-btn:hover {
                transform: translateY(-3px);
                background: linear-gradient(135deg, #9A96F0 0%, #FF9FDD 100%);
                box-shadow: 
                    0 10px 30px rgba(184, 181, 255, 0.5),
                    0 4px 16px rgba(0, 0, 0, 0.15);
            }

            .game-btn:active {
                transform: translateY(-1px);
                transition: transform 0.1s;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .games-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    padding: 1.5rem 1rem;
                }

                .game-card {
                    padding: 1.5rem;
                    border-radius: 20px;
                }

                .game-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 16px;
                }

                .game-icon i {
                    font-size: 1.8rem;
                }

                .game-content h3 {
                    font-size: 1.3rem;
                }

                .game-meta {
                    gap: 1rem;
                }

                .game-meta span {
                    font-size: 0.8rem;
                    padding: 0.4rem 0.8rem;
                }

                .game-btn {
                    padding: 0.9rem 1.8rem;
                    font-size: 0.95rem;
                }
            }

            @media (max-width: 480px) {
                .games-grid {
                    padding: 1rem 0.5rem;
                }

                .game-card {
                    padding: 1.2rem;
                    border-radius: 16px;
                }

                .game-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 14px;
                }

                .game-icon i {
                    font-size: 1.6rem;
                }

                .game-content h3 {
                    font-size: 1.2rem;
                }

                .game-content p {
                    font-size: 0.9rem;
                }

                .game-meta {
                    flex-direction: column;
                    gap: 0.8rem;
                }

                .game-btn {
                    width: 100%;
                    padding: 0.8rem 1.5rem;
                }
            }

            /* Animation for cards loading */
            @keyframes gameCardSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .game-card {
                animation: gameCardSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            .game-card:nth-child(1) { animation-delay: 0.1s; }
            .game-card:nth-child(2) { animation-delay: 0.2s; }
            .game-card:nth-child(3) { animation-delay: 0.3s; }
            .game-card:nth-child(4) { animation-delay: 0.4s; }
            .game-card:nth-child(5) { animation-delay: 0.5s; }

            /* Loading State */
            .games-grid.loading .game-card {
                opacity: 0.5;
                pointer-events: none;
            }
        </style>
    `;

    // Inject styles if not already present
    if (!document.getElementById('mental-health-games-styles')) {
        document.head.insertAdjacentHTML('beforeend', gameStyles);
    }
}

// Your existing fullscreen game functions...
function openFullscreenGame(gameKey) {
    let url = '';
    let title = '';
    let gameId = '';

    switch (gameKey) {
        case 'puzzle':
            url = 'puzzle/public/index.html';
            title = 'Memory Master';
            gameId = 'memory_puzzle';
            break;
        case 'breathing_app':
            url = 'breathing_app/public/index.html';
            title = 'Breathing Buddy';
            gameId = 'breathing_exercise';
            break;
        case 'emotion_compass':
            url = 'emotion_compass/public/index.html';
            title = 'Emotion Compass';
            gameId = 'emotion_tracker';
            break;
        case 'snake':
            url = 'snake/public/index.html';
            title = 'Wellness Fish';
            gameId = 'wellness_fish';
            break;
        case 'balloon_pop':
            url = 'balloon_pop/public/index.html';
            title = 'Balloon Pop Zen';
            gameId = 'balloon_pop';
            break;
        default:
            alert('Game not found!');
            return;
    }

    // Log game start for analytics
    logGameStart(gameId, title);

    // Create fullscreen overlay
    createFullscreenGameOverlay(url, title, gameId);
}

// Create fullscreen game overlay
function createFullscreenGameOverlay(url, title, gameId) {
    // Remove any existing fullscreen overlay
    const existingOverlay = document.getElementById('fullscreenGameOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.id = 'fullscreenGameOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 10000;
        display: flex;
        flex-direction: column;
    `;

    // Create header with title and close button
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    `;

    closeButton.addEventListener('click', () => {
        logGameEnd(gameId);
        overlay.remove();
    });

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = 'rgba(255,255,255,0.3)';
    });

    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'rgba(255,255,255,0.2)';
    });

    header.appendChild(titleElement);
    header.appendChild(closeButton);

    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.style.cssText = `
        flex: 1;
        position: relative;
        overflow: auto;
        display: flex;
        flex-direction: column;
    `;

    // Special handling for snake game
    if (url.includes('snake')) {
        iframeContainer.style.cssText += `
            overflow-y: auto;
            min-height: 0;
        `;
    }

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        background: white;
        overflow: auto;
    `;
    iframe.allowFullscreen = true;

    // Special handling for snake game to ensure controls are visible
    if (url.includes('snake')) {
        iframe.style.cssText += `
            min-height: 100vh;
            overflow-y: auto;
        `;
    }

    iframeContainer.appendChild(iframe);

    overlay.appendChild(header);
    overlay.appendChild(iframeContainer);

    // Add to body
    document.body.appendChild(overlay);

    // Handle escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            logGameEnd(gameId);
            overlay.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };

    document.addEventListener('keydown', handleEscape);

    // Handle iframe load errors
    iframe.addEventListener('error', () => {
        console.error('Failed to load game:', url);
        showNotification('Failed to load game. Please try again.', 'error');
        overlay.remove();
    });
}

// Log game start for analytics and tracking
function logGameStart(gameId, gameTitle) {
    const gameSession = {
        gameId: gameId,
        gameTitle: gameTitle,
        startTime: new Date().toISOString(),
        userId: getUserId(),
        sessionId: generateSessionId()
    };

    // Store session data
    sessionStorage.setItem('currentGameSession', JSON.stringify(gameSession));

    // Send to backend
    fetch('/api/games/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameSession)
    }).catch(error => {
        console.log('Backend not available, storing locally:', error);
        // Store locally if backend is not available
        const localGames = JSON.parse(localStorage.getItem('gameSessions') || '[]');
        localGames.push(gameSession);
        localStorage.setItem('gameSessions', JSON.stringify(localGames));
    });

    console.log('Game started:', gameSession);
}

// Log game end
function logGameEnd(gameId) {
    const currentSession = JSON.parse(sessionStorage.getItem('currentGameSession') || '{}');

    if (currentSession.gameId === gameId) {
        const gameEndData = {
            ...currentSession,
            endTime: new Date().toISOString(),
            duration: Math.floor((new Date() - new Date(currentSession.startTime)) / 1000)
        };

        // Send to backend
        fetch('/api/games/end', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameEndData)
        }).catch(error => {
            console.log('Backend not available, storing locally:', error);
            // Store locally if backend is not available
            const localGames = JSON.parse(localStorage.getItem('gameSessions') || '[]');
            const sessionIndex = localGames.findIndex(session => session.sessionId === currentSession.sessionId);
            if (sessionIndex !== -1) {
                localGames[sessionIndex] = gameEndData;
                localStorage.setItem('gameSessions', JSON.stringify(localGames));
            }
        });

        // Clear current session
        sessionStorage.removeItem('currentGameSession');

        console.log('Game ended:', gameEndData);
    }
}

// Utility functions
function getUserId() {
    // Get user ID from localStorage or generate anonymous ID
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Legacy function for backward compatibility
function openGamePage(gameKey) {
    openFullscreenGame(gameKey);
}

// Download Template Function - for Journaling section using jsPDF
function downloadTemplate(templateType) {
    console.log(`Downloading template: ${templateType}`);

    const templates = {
        'weekly-planner': {
            title: 'Weekly Mental Health Planner',
            description: 'Structured template for weekly self-care planning',
            sections: [
                'Weekly Goal:',
                'Monday:',
                'Tuesday:',
                'Wednesday:',
                'Thursday:',
                'Friday:',
                'Saturday:',
                'Sunday:',
                'Reflections for the week:'
            ]
        },
        'emotion-worksheet': {
            title: 'Emotion Processing Worksheet',
            description: 'Guide for working through difficult emotions',
            sections: [
                'Describe the event:',
                'What emotions am I feeling right now? (Intensity 1-10)',
                'Where do I feel this in my body?',
                'What is the thought behind this emotion?',
                'Is this thought a fact or an interpretation?',
                'A more balanced perspective is:',
                'What do I need right now (e.g., rest, connection, movement)?'
            ]
        },
        'goal-framework': {
            title: 'Goal Setting Framework',
            description: 'Comprehensive goal planning and tracking sheet',
            sections: [
                'Specific Goal:',
                'Why is this goal important to me?',
                'What does success look like?',
                'Potential obstacles:',
                'Strategies to overcome them:',
                'Action Steps:',
                '   1. ',
                '   2. ',
                '   3. ',
                'Target Completion Date:'
            ]
        }
    };

    const template = templates[templateType];
    if (template) {
        showNotification(`Preparing download: ${template.title}`, 'info');

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Set styles
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.setTextColor(74, 44, 111); // Dark Purple

            // Header
            doc.text(template.title, 20, 25);

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(template.description, 20, 35);

            // Divider
            doc.setDrawColor(184, 181, 255);
            doc.setLineWidth(0.5);
            doc.line(20, 40, 190, 40);

            // Content
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);

            let yPos = 55;
            template.sections.forEach(section => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFont('helvetica', 'bold');
                doc.text(section, 20, yPos);

                // Add blank lines for user to write
                doc.setDrawColor(220, 220, 220);
                doc.line(20, yPos + 8, 190, yPos + 8);

                yPos += 20;
            });

            // Footer
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text('Generated by MentAura - Your Mental Wellness Companion', 20, 285);

            // Save the PDF
            doc.save(`${template.title.toLowerCase().replace(/ /g, '_')}.pdf`);
            showNotification(`Downloaded: ${template.title}`, 'success');
        } catch (error) {
            console.error('Error generating PDF:', error);
            showNotification('Error generating PDF. Please try again.', 'error');
            // Fallback for no library or other issues
            alert(`${template.title} template content:\n\n` + template.sections.join('\n\n'));
        }
    } else {
        showNotification('Template not found', 'error');
    }
}

// Read Article Function - for Articles section


// Initialize game styles when page loads
document.addEventListener('DOMContentLoaded', function () {
    injectGameStyles();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

