// Fixed Booking functionality
let currentStep = 1;
let bookingData = {};
let selectedCounselor = null;
let selectedTime = null;
let bookedSessions = [];
let isMuted = false;
let isVideoOn = true;
let isChatOpen = false;
let currentActiveSession = null;


let localStream = null;
let localVideoElement = null;
let remoteVideoElement = null;
let remoteAutoplayUnlockHandler = null;

// Initialize booking page
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing booking system...');
    initializePage();
    setupEventListeners();
    loadDynamicContent();
});

function initializePage() {
    // Set minimum date to today
    const dateInput = document.getElementById('sessionDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Check for scheduled sessions
    checkScheduledSessions();

    // Initialize next button state
    setTimeout(() => {
        checkStep1Completion();
    }, 100);
}

function setupEventListeners() {
    console.log('Setting up event listeners...');

    // Counselor selection
    document.querySelectorAll('.counselor-card').forEach(card => {
        card.addEventListener('click', function () {
            selectCounselor(this);
        });
    });

    // Time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function () {
            selectTimeSlot(this);
        });
    });

    // Date change
    const dateInput = document.getElementById('sessionDate');
    if (dateInput) {
        dateInput.addEventListener('change', function () {
            updateAvailableSlots();
            checkStep3Completion();
        });
    }

    // Privacy option change
    document.querySelectorAll('input[name="privacy"]').forEach(input => {
        input.addEventListener('change', function () {
            checkStep3Completion();
        });
    });

    // Form validation - ENHANCED AND FIXED
    const step1Inputs = document.querySelectorAll('#bookingStep1 input, #bookingStep1 textarea');
    step1Inputs.forEach(input => {
        input.addEventListener('input', function () {
            console.log('Input event triggered for:', input.id || input.name, 'Value:', input.value);
            checkStep1Completion();
        });
        input.addEventListener('change', function () {
            console.log('Change event triggered for:', input.id || input.name, 'Value:', input.value);
            checkStep1Completion();
        });
        input.addEventListener('keyup', function () {
            console.log('Keyup event triggered for:', input.id || input.name, 'Value:', input.value);
            checkStep1Completion();
        });
    });

    // Initial check after a delay
    setTimeout(() => {
        console.log('Running initial validation check...');
        checkStep1Completion();
    }, 200);
}

function loadDynamicContent() {
    // Load booked sessions in upcoming sessions
    loadUpcomingSessions();

    // Check for previous sessions
    const completedSessions = bookedSessions.filter(session => session.status === 'completed');

    if (completedSessions.length > 0) {
        loadPreviousSessions();
    }

    // Check other dynamic content
    const hasRecordings = true;

    if (hasRecordings) {
        loadRecordings();
    }
}

// Modal functions
function openBookingModal() {
    console.log('Opening booking modal...');
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
    }

    // Reset to step 1 and check validation
    setTimeout(() => {
        console.log('Modal opened, checking validation...');
        checkStep1Completion();
    }, 150);
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
    resetBookingForm();
}

function resetBookingForm() {
    currentStep = 1;
    bookingData = {};
    selectedCounselor = null;
    selectedTime = null;

    // Reset step visibility
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    const step1 = document.getElementById('bookingStep1');
    if (step1) step1.classList.add('active');

    // Reset step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    const stepIndicator1 = document.getElementById('step1');
    if (stepIndicator1) stepIndicator1.classList.add('active');

    // Reset form inputs
    document.querySelectorAll('#bookingModal input, #bookingModal textarea').forEach(input => {
        input.value = '';
    });

    // Reset selections
    document.querySelectorAll('.counselor-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Reset all next buttons
    resetAllButtons();
}

function resetAllButtons() {
    const buttons = ['nextBtn1', 'nextBtn2', 'nextBtn3'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.disabled = true;
            btn.classList.add('disabled');
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
    });
}

// Step navigation functions
function nextStep(step) {
    console.log('Attempting to go to next step from:', step);

    if (validateStep(step)) {
        console.log('Step validation passed, moving to next step');
        saveStepData(step);

        // Update step indicators
        const currentStepEl = document.getElementById(`step${step}`);
        const nextStepEl = document.getElementById(`step${step + 1}`);

        if (currentStepEl) {
            currentStepEl.classList.remove('active');
            currentStepEl.classList.add('completed');
        }
        if (nextStepEl) {
            nextStepEl.classList.add('active');
        }

        // Update step content
        const currentStepContent = document.getElementById(`bookingStep${step}`);
        const nextStepContent = document.getElementById(`bookingStep${step + 1}`);

        if (currentStepContent) currentStepContent.classList.remove('active');
        if (nextStepContent) nextStepContent.classList.add('active');

        currentStep = step + 1;

        // If moving to summary step, populate it
        if (step + 1 === 4) {
            populateSummary();
        }
    } else {
        console.log('Step validation failed - cannot proceed to next step');
    }
}

function prevStep(step) {
    // Update step indicators
    const currentStepEl = document.getElementById(`step${step}`);
    const prevStepEl = document.getElementById(`step${step - 1}`);

    if (currentStepEl) currentStepEl.classList.remove('active');
    if (prevStepEl) {
        prevStepEl.classList.remove('completed');
        prevStepEl.classList.add('active');
    }

    // Update step content
    const currentStepContent = document.getElementById(`bookingStep${step}`);
    const prevStepContent = document.getElementById(`bookingStep${step - 1}`);

    if (currentStepContent) currentStepContent.classList.remove('active');
    if (prevStepContent) prevStepContent.classList.add('active');

    currentStep = step - 1;
}

function validateStep(step) {
    switch (step) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        default:
            return true;
    }
}

function validateStep1() {
    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const age = document.getElementById('age')?.value || '';
    const email = document.getElementById('email')?.value.trim() || '';

    console.log('Validating step 1:', { fullName, age, email });

    if (!fullName) {
        console.log('Validation failed: Missing full name');
        showValidationError('Please enter your full name.');
        return false;
    }

    if (!age) {
        console.log('Validation failed: Missing age');
        showValidationError('Please enter your age.');
        return false;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
        console.log('Validation failed: Invalid age', ageNum);
        showValidationError('Age must be between 13 and 100 years for our services.');
        return false;
    }

    if (!email) {
        console.log('Validation failed: Missing email');
        showValidationError('Please enter your email address.');
        return false;
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Validation failed: Invalid email format');
        showValidationError('Please enter a valid email address.');
        return false;
    }

    console.log('Step 1 validation passed!');
    clearValidationError();
    return true;
}

function validateStep2() {
    if (!selectedCounselor) {
        showValidationError('Please select a counselor.');
        return false;
    }
    clearValidationError();
    return true;
}

function validateStep3() {
    const sessionDate = document.getElementById('sessionDate')?.value || '';
    const privacyOption = document.querySelector('input[name="privacy"]:checked');

    if (!sessionDate) {
        showValidationError('Please select a session date.');
        return false;
    }

    if (!selectedTime) {
        showValidationError('Please select a time slot.');
        return false;
    }

    if (!privacyOption) {
        showValidationError('Please select a privacy option.');
        return false;
    }

    clearValidationError();
    return true;
}

function showValidationError(message) {
    // Remove any existing error messages
    clearValidationError();

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        background: #fee;
        border: 1px solid #fcc;
        color: #c33;
        padding: 12px;
        border-radius: 8px;
        margin: 16px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        animation: fadeIn 0.3s ease;
    `;

    // Add to current step
    const currentStepEl = document.getElementById(`bookingStep${currentStep}`);
    if (currentStepEl) {
        currentStepEl.insertBefore(errorDiv, currentStepEl.querySelector('.step-navigation'));
    }
}

function clearValidationError() {
    document.querySelectorAll('.validation-error').forEach(error => error.remove());
}

function saveStepData(step) {
    switch (step) {
        case 1:
            bookingData.fullName = document.getElementById('fullName')?.value.trim() || '';
            bookingData.age = document.getElementById('age')?.value || '';
            bookingData.email = document.getElementById('email')?.value.trim() || '';
            bookingData.phone = document.getElementById('phone')?.value.trim() || '';
            bookingData.concerns = document.getElementById('concerns')?.value.trim() || '';
            break;
        case 2:
            bookingData.counselor = selectedCounselor;
            break;
        case 3:
            bookingData.sessionDate = document.getElementById('sessionDate')?.value || '';
            bookingData.sessionTime = selectedTime;
            bookingData.privacy = document.querySelector('input[name="privacy"]:checked')?.value || '';
            break;
    }
    console.log('Saved step data:', bookingData);
}

// Selection functions
function selectCounselor(card) {
    document.querySelectorAll('.counselor-card').forEach(c => {
        c.classList.remove('selected');
    });
    card.classList.add('selected');
    selectedCounselor = card.dataset.counselor;

    checkStep2Completion();
    console.log('Selected counselor:', selectedCounselor);
}

function selectTimeSlot(slot) {
    if (slot.classList.contains('unavailable')) return;

    document.querySelectorAll('.time-slot').forEach(s => {
        s.classList.remove('selected');
    });
    slot.classList.add('selected');
    selectedTime = slot.dataset.time;

    console.log('Selected time:', selectedTime);
    checkStep3Completion();
}

function updateAvailableSlots() {
    // Reset all slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('unavailable', 'selected');

        // Randomly make some slots unavailable (simulate real booking system)
        if (Math.random() > 0.7) {
            slot.classList.add('unavailable');
        }
    });

    selectedTime = null;
    checkStep3Completion();
}

// ENHANCED: Step completion checks
function checkStep1Completion() {
    console.log('Checking step 1 completion...');

    const fullNameElement = document.getElementById('fullName');
    const ageElement = document.getElementById('age');
    const emailElement = document.getElementById('email');

    if (!fullNameElement || !ageElement || !emailElement) {
        console.log('Required elements not found');
        return;
    }

    const fullName = fullNameElement.value?.trim() || '';
    const age = ageElement.value || '';
    const email = emailElement.value?.trim() || '';

    console.log('Current values:', {
        fullName: fullName,
        age: age,
        email: email,
        fullNameLength: fullName.length,
        ageNum: parseInt(age),
        emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    });

    // Check all validation conditions - FIXED AGE VALIDATION
    const hasFullName = fullName.length > 0;
    const hasValidAge = age && !isNaN(parseInt(age)) && parseInt(age) >= 13 && parseInt(age) <= 100;
    const hasValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValid = hasFullName && hasValidAge && hasValidEmail;

    console.log('Validation status:', {
        hasFullName,
        hasValidAge,
        hasValidEmail,
        isValid,
        ageValue: parseInt(age),
        isAgeInRange: parseInt(age) >= 13 && parseInt(age) <= 100
    });

    updateNextButton('nextBtn1', isValid);

    // Show real-time feedback for age
    if (age && (isNaN(parseInt(age)) || parseInt(age) < 13 || parseInt(age) > 100)) {
        showAgeWarning();
    } else {
        clearAgeWarning();
    }
}

function checkStep2Completion() {
    const isValid = selectedCounselor != null;
    updateNextButton('nextBtn2', isValid);
    console.log('Step 2 completion:', { selectedCounselor, isValid });
}

function checkStep3Completion() {
    const sessionDate = document.getElementById('sessionDate')?.value || '';
    const privacyOption = document.querySelector('input[name="privacy"]:checked');

    const isComplete = sessionDate && selectedTime && privacyOption;
    updateNextButton('nextBtn3', isComplete);

    console.log('Step 3 completion:', { sessionDate, selectedTime, privacyOption: !!privacyOption, isComplete });
}

function updateNextButton(buttonId, isValid) {
    const nextBtn = document.getElementById(buttonId);
    if (nextBtn) {
        nextBtn.disabled = !isValid;
        if (isValid) {
            nextBtn.classList.remove('disabled');
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.pointerEvents = 'auto';
        } else {
            nextBtn.classList.add('disabled');
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.style.pointerEvents = 'none'; // This prevents any click events
        }
        console.log(`Button ${buttonId} - disabled: ${!isValid}`);
    } else {
        console.log(`Button ${buttonId} not found!`);
    }
}

function showAgeWarning() {
    // Remove existing warning
    clearAgeWarning();

    const ageField = document.getElementById('age');
    if (ageField) {
        const warning = document.createElement('div');
        warning.className = 'age-warning';
        warning.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>Age must be between 13 and 100 years</span>
        `;
        warning.style.cssText = `
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 8px 12px;
            border-radius: 6px;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
        `;

        ageField.parentNode.appendChild(warning);
    }
}

function clearAgeWarning() {
    document.querySelectorAll('.age-warning').forEach(warning => warning.remove());
}

function populateSummary() {
    const counselorNames = {
        'dr-sarah': 'Dr. Sarah Johnson',
        'dr-michael': 'Dr. Michael Chen',
        'dr-emma': 'Dr. Emma Wilson',
        'dr-james': 'Dr. James Rodriguez',
        'dr-lisa': 'Dr. Lisa Thompson',
        'dr-david': 'Dr. David Kumar',
        'dr-maria': 'Dr. Maria Garcia',
        'dr-robert': 'Dr. Robert Lee',
        'dr-priya': 'Dr. Priya Sharma'
    };

    const timeLabels = {
        '09:00': '9:00 AM',
        '10:00': '10:00 AM',
        '11:00': '11:00 AM',
        '14:00': '2:00 PM',
        '15:00': '3:00 PM',
        '16:00': '4:00 PM'
    };

    const privacyLabels = {
        'share': 'Share personal information',
        'anonymous': 'Keep session anonymous'
    };

    const summaryHTML = `
        <div class="summary-item">
            <span class="summary-label">Name:</span>
            <span class="summary-value">${bookingData.fullName}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Age:</span>
            <span class="summary-value">${bookingData.age}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Email:</span>
            <span class="summary-value">${bookingData.email}</span>
        </div>
        ${bookingData.phone ? `
        <div class="summary-item">
            <span class="summary-label">Phone:</span>
            <span class="summary-value">${bookingData.phone}</span>
        </div>` : ''}
        <div class="summary-item">
            <span class="summary-label">Counselor:</span>
            <span class="summary-value">${counselorNames[bookingData.counselor] || bookingData.counselor}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Date:</span>
            <span class="summary-value">${new Date(bookingData.sessionDate).toLocaleDateString()}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Time:</span>
            <span class="summary-value">${timeLabels[bookingData.sessionTime] || bookingData.sessionTime}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Privacy:</span>
            <span class="summary-value">${privacyLabels[bookingData.privacy] || bookingData.privacy}</span>
        </div>
        ${bookingData.concerns ? `
        <div class="summary-item">
            <span class="summary-label">Concerns:</span>
            <span class="summary-value">${bookingData.concerns}</span>
        </div>` : ''}
    `;

    const summaryContainer = document.getElementById('summaryDetails');
    if (summaryContainer) {
        summaryContainer.innerHTML = summaryHTML;
    }
}

// Booking confirmation
function confirmBooking() {
    console.log('Confirming booking with data:', bookingData);

    const newSession = {
        id: Date.now(),
        ...bookingData,
        status: 'upcoming',
        bookedAt: new Date().toISOString()
    };

    bookedSessions.push(newSession);

    // Show success modal
    closeBookingModal();

    setTimeout(() => {
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.add('active');
        }
    }, 300);

    // Update upcoming sessions display
    loadUpcomingSessions();
}

// Success modal functions
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
    }
}

function bookAnother() {
    closeSuccessModal();
    setTimeout(() => {
        openBookingModal();
    }, 100);
}

// Load upcoming sessions
function loadUpcomingSessions() {
    const upcomingContainer = document.getElementById('upcomingPreview');
    if (!upcomingContainer) return;

    if (bookedSessions.length === 0) {
        upcomingContainer.innerHTML = `
            <div class="no-upcoming">
                <p>No upcoming sessions</p>
                <button class="service-btn" onclick="openBookingModal()">
                    <span>Schedule Session</span>
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        return;
    }

    const upcomingSessions = bookedSessions.filter(session => session.status === 'upcoming');

    if (upcomingSessions.length === 0) {
        upcomingContainer.innerHTML = `
            <div class="no-upcoming">
                <p>No upcoming sessions</p>
                <button class="service-btn" onclick="openBookingModal()">
                    <span>Schedule Session</span>
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        return;
    }

    const sessionHTML = upcomingSessions.map(session => `
        <div class="upcoming-item">
            <div class="upcoming-date">${new Date(session.sessionDate).toLocaleDateString()} at ${session.sessionTime}</div>
            <div class="upcoming-counselor">with ${session.counselor}</div>
            <div class="session-actions">
                <button class="mini-btn" onclick="joinSession('${session.id}')">
                    <i class="fas fa-video"></i> Join
                </button>
                <button class="mini-btn cancel" onclick="cancelSession('${session.id}')">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `).join('');

    upcomingContainer.innerHTML = sessionHTML;
}

// Load previous sessions
function loadPreviousSessions() {
    const previousContainer = document.getElementById('sessionsPreview');
    if (!previousContainer) return;

    const completedSessions = bookedSessions.filter(session => session.status === 'completed');

    if (completedSessions.length === 0) {
        previousContainer.innerHTML = `
            <div class="no-sessions">
                <p>No previous sessions found</p>
                <button class="service-btn" onclick="openBookingModal()">
                    <span>Book Your First Session</span>
                    <i class="fas fa-calendar-plus"></i>
                </button>
            </div>
        `;
        return;
    }

    const counselorNames = {
        'dr-sarah': 'Dr. Karthik Raja',
        'dr-michael': 'Dr. Lakshmi Priya',
        'dr-emma': 'Dr. Revathi',
        'dr-james': 'Dr. Senthil Kumar',
        'dr-lisa': 'Dr. Aravind Swamy',
        'dr-david': 'Dr. Siva Kumar',
        'dr-maria': 'Dr. Ranjith',
        'dr-robert': 'Dr. Keerthana',
        'dr-priya': 'Dr. Priya Darshini'
    };

    const sessionHTML = completedSessions.map(session => `
        <div class="previous-item">
            <div class="session-info">
                <div class="session-date">
                    <i class="fas fa-calendar-check"></i>
                    ${new Date(session.sessionDate).toLocaleDateString()}
                </div>
                <div class="session-counselor">
                    <i class="fas fa-user-md"></i>
                    ${counselorNames[session.counselor] || session.counselor}
                </div>
            </div>
            <div class="session-actions-mini">
                    <i class="fas fa-file-alt"></i> details
                </button>
            </div>
        </div>
    `).join('');

    previousContainer.innerHTML = sessionHTML;
}

// Session Recordings
let sessionRecordings = [];

function loadRecordings() {
    const recordingsContainer = document.getElementById('recordingsPreview');
    if (!recordingsContainer) return;

    if (sessionRecordings.length === 0) {
        recordingsContainer.innerHTML = `
            <div class="no-recordings">
                <p>No recorded sessions available</p>
                <button class="service-btn secondary" disabled>
                    <span>No Recordings</span>
                    <i class="fas fa-video-slash"></i>
                </button>
            </div>
        `;
        return;
    }

    const counselorNames = {
        'dr-sarah': 'Dr. Karthik Raja',
        'dr-michael': 'Dr. Lakshmi Priya',
        'dr-emma': 'Dr. Revathi',
        'dr-james': 'Dr. Senthil Kumar',
        'dr-lisa': 'Dr. Aravind Swamy',
        'dr-david': 'Dr. Siva Kumar',
        'dr-maria': 'Dr. Ranjith',
        'dr-robert': 'Dr. Keerthana',
        'dr-priya': 'Dr. Priya Darshini'
    };

    const recordingsHTML = sessionRecordings.map(recording => `
        <div class="previous-item"> <!-- Reusing previous-item style for consistency -->
            <div class="session-info">
                <div class="session-date">
                    <i class="fas fa-video"></i>
                    ${new Date(recording.date).toLocaleDateString()}
                </div>
                <div class="session-counselor">
                    <i class="fas fa-user-md"></i>
                    ${counselorNames[recording.counselor] || recording.counselor}
                </div>
            </div>
            <div class="session-actions-mini">
                <button class="mini-btn" onclick="playRecording(${recording.id})">
                    <i class="fas fa-play"></i> Play
                </button>
                <button class="mini-btn secondary" onclick="downloadRecording(${recording.id})">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    `).join('');

    recordingsContainer.innerHTML = recordingsHTML;
}

function playRecording(id) {
    console.log('Playing recording:', id);
    alert('Playing recording ' + id + ' (Demo feature)');
}

function downloadRecording(id) {
    console.log('Downloading recording:', id);
    alert('Downloading recording ' + id + ' (Demo feature)');
}

function viewSessionDetails(sessionId) {
    console.log('Viewing session details for:', sessionId);
    alert('Session details feature coming soon! (Demo ID: ' + sessionId + ')');
}

// Session management functions
function joinSession(sessionId) {
    console.log('Joining session:', sessionId);
    const session = bookedSessions.find(s => s.id == sessionId);
    if (session) {
        currentActiveSession = session;
        console.log('Active session set:', currentActiveSession);
    }
    openLiveSessionModal();
}

function cancelSession(sessionId) {
    if (confirm('Are you sure you want to cancel this session?')) {
        bookedSessions = bookedSessions.filter(session => session.id !== parseInt(sessionId));
        loadUpcomingSessions();
        console.log('Session cancelled:', sessionId);
    }
}

function checkScheduledSessions() {
    const scheduledBtn = document.getElementById('scheduledBtn');
    if (!scheduledBtn) return;

    const hasScheduledSessions = bookedSessions.some(session => session.status === 'upcoming');

    if (hasScheduledSessions) {
        scheduledBtn.disabled = false;
        scheduledBtn.style.opacity = '1';
    } else {
        scheduledBtn.disabled = true;
        scheduledBtn.style.opacity = '0.5';
    }
}

// Live Session Functions
function joinInstantSession() {
    console.log('Joining instant session...');

    // Pick a random counselor for instant session
    const counselors = ['dr-sarah', 'dr-michael', 'dr-emma', 'dr-james', 'dr-lisa', 'dr-david', 'dr-maria', 'dr-robert', 'dr-priya'];
    const randomCounselor = counselors[Math.floor(Math.random() * counselors.length)];

    // Create a temporary session object for instant sessions
    currentActiveSession = {
        id: Date.now(),
        fullName: "User", // dynamic if user info is available
        counselor: randomCounselor,
        sessionDate: new Date().toISOString(),
        sessionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'instant'
    };
    console.log('Active session set (instant):', currentActiveSession);
    openLiveSessionModal();
}

function joinScheduledSession() {
    const upcomingSessions = bookedSessions.filter(session => session.status === 'upcoming');

    if (upcomingSessions.length === 0) {
        alert('You have no scheduled sessions. Please book a session first.');
        return;
    }

    // Join the first upcoming session
    currentActiveSession = upcomingSessions[0];
    console.log('Joining scheduled session:', currentActiveSession);
    openLiveSessionModal();
}

function openLiveSessionModal() {
    const liveModal = document.getElementById('liveSessionModal');
    if (liveModal) {
        liveModal.classList.add('active');
        initializeVideoConference();
    }
}

function closeLiveSessionModal() {
    const liveModal = document.getElementById('liveSessionModal');
    if (liveModal) {
        liveModal.classList.remove('active');
        cleanupVideoConference();
    }
}

// WebRTC Camera and Microphone Functions
async function startCameraAndMicrophone() {
    try {
        console.log('Requesting camera and microphone access...');

        // Request both video and audio
        localStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        console.log('Camera and microphone access granted');

        // Set the stream to the video element
        if (localVideoElement) {
            localVideoElement.srcObject = localStream;
            localVideoElement.style.width = '100%';
            localVideoElement.style.height = '100%';
            localVideoElement.style.objectFit = 'cover';
            localVideoElement.style.borderRadius = '8px';
        }

        // Update control buttons to reflect current state
        updateControlButtons();

        // Show success message
        showMediaStatus('Camera and microphone started successfully', 'success');

    } catch (error) {
        console.error('Error accessing camera and microphone:', error);
        handleMediaError(error);
    }
}

function handleMediaError(error) {
    let errorMessage = 'Unable to access camera and microphone. ';

    switch (error.name) {
        case 'NotAllowedError':
            errorMessage += 'Please allow camera and microphone access and refresh the page.';
            break;
        case 'NotFoundError':
            errorMessage += 'No camera or microphone found on this device.';
            break;
        case 'NotReadableError':
            errorMessage += 'Camera or microphone is being used by another application.';
            break;
        case 'OverconstrainedError':
            errorMessage += 'Camera or microphone constraints cannot be satisfied.';
            break;
        default:
            errorMessage += 'An unknown error occurred.';
    }

    showMediaStatus(errorMessage, 'error');

    // Fallback to placeholder
    const localVideoContainer = document.querySelector('.local-video');
    if (localVideoContainer) {
        localVideoContainer.innerHTML = `
        < div class="video-placeholder error" >
                <i class="fas fa-video-slash"></i>
                <span>Camera Unavailable</span>
            </div >
        `;
    }
}

function showMediaStatus(message, type) {
    // Remove existing status messages
    const existingStatus = document.querySelector('.media-status');
    if (existingStatus) {
        existingStatus.remove();
    }

    // Create status message
    const statusDiv = document.createElement('div');
    statusDiv.className = `media - status ${type} `;
    statusDiv.innerHTML = `
        < i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}" ></i >
            <span>${message}</span>
    `;

    // Style the status message
    statusDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    padding: 12px 16px;
    border - radius: 8px;
    display: flex;
    align - items: center;
    gap: 8px;
    font - size: 14px;
    z - index: 10000;
    box - shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(statusDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 5000);
}

function initializeVideoConference() {
    console.log('Initializing video conference...');

    // Create video element for local stream
    const localVideoContainer = document.querySelector('.local-video');
    if (localVideoContainer) {
        // Remove placeholder and add actual video element
        localVideoContainer.innerHTML = '<video id="localVideo" autoplay muted playsinline></video>';
        localVideoElement = document.getElementById('localVideo');

        // Start camera and microphone
        startCameraAndMicrophone();
    }

    // Initialize counselor display name
    const counselorNames = {
        'dr-sarah': 'Dr. Karthik Raja',
        'dr-michael': 'Dr. Lakshmi Priya',
        'dr-emma': 'Dr. Revathi',
        'dr-james': 'Dr. Senthil Kumar',
        'dr-lisa': 'Dr. Aravind Swamy',
        'dr-david': 'Dr. Siva Kumar',
        'dr-maria': 'Dr. Ranjith',
        'dr-robert': 'Dr. Keerthana',
        'dr-priya': 'Dr. Priya Darshini'
    };

    let counselorNameDisplay = 'Dr. Sarah Johnson'; // Default fallback
    if (currentActiveSession && currentActiveSession.counselor) {
        counselorNameDisplay = counselorNames[currentActiveSession.counselor] || currentActiveSession.counselor;
    }

    // Update remote video placeholder if video is not available or before video loads
    const remotePlaceholder = document.querySelector('.remote-video .video-placeholder span');
    if (remotePlaceholder) {
        remotePlaceholder.textContent = counselorNameDisplay;
    }

    // Inject counselor demo video into remote video area
    const remoteVideoContainer = document.querySelector('.remote-video');
    if (remoteVideoContainer) {
        // ... (existing video injection logic) ...
        remoteVideoContainer.innerHTML = '<video id="remoteVideo" src="/videos/generated-video-2.mp4" autoplay playsinline></video>';
        remoteVideoElement = document.getElementById('remoteVideo');
        if (remoteVideoElement) {
            remoteVideoElement.style.width = '100%';
            remoteVideoElement.style.height = '100%';
            remoteVideoElement.style.objectFit = 'cover';
            remoteVideoElement.style.borderRadius = '8px';
            remoteVideoElement.loop = false;
            // Try to play with audio
            remoteVideoElement.muted = false;
            remoteVideoElement.volume = 1.0;
            const tryPlayWithSound = () => {
                const p = remoteVideoElement.play();
                if (p && typeof p.then === 'function') {
                    p.catch(() => {
                        // If blocked by autoplay policy, attach a one-time unlock on first user interaction
                        const modalEl = document.getElementById('liveSessionModal');
                        remoteAutoplayUnlockHandler = function () {
                            if (!remoteVideoElement) return;
                            remoteVideoElement.muted = false;
                            remoteVideoElement.volume = 1.0;
                            remoteVideoElement.play().finally(() => {
                                // No need to keep the handler after one attempt
                            });
                        };
                        if (modalEl) {
                            modalEl.addEventListener('pointerdown', remoteAutoplayUnlockHandler, { once: true });
                        } else {
                            document.addEventListener('pointerdown', remoteAutoplayUnlockHandler, { once: true });
                        }
                        showMediaStatus('Tap anywhere to enable counselor audio', 'error');
                    });
                }
            };
            tryPlayWithSound();

            // Ensure it does not replay after finishing
            remoteVideoElement.addEventListener('ended', function () {
                // Keep it paused at the last frame
                remoteVideoElement.pause();
            }, { once: true });
        }
    }

    // toggleChat();
}

function cleanupVideoConference() {
    console.log('Cleaning up video conference...');

    // Stop all tracks in the stream
    if (localStream) {
        localStream.getTracks().forEach(track => {
            track.stop();
        });
        localStream = null;
    }

    // Reset video element
    if (localVideoElement) {
        localVideoElement.srcObject = null;
        localVideoElement = null;
    }

    // Reset local video container to placeholder
    const localVideoContainer = document.querySelector('.local-video');
    if (localVideoContainer) {
        localVideoContainer.innerHTML = `
        < div class="video-placeholder" >
                <i class="fas fa-user"></i>
                <span>You</span>
            </div >
        `;
    }

    // Reset remote video
    if (remoteVideoElement) {
        remoteVideoElement.srcObject = null;
        remoteVideoElement = null;
    }
    // Remove any pending autoplay unlock handler
    const modalEl = document.getElementById('liveSessionModal');
    if (remoteAutoplayUnlockHandler) {
        if (modalEl) modalEl.removeEventListener('pointerdown', remoteAutoplayUnlockHandler, { once: true });
        document.removeEventListener('pointerdown', remoteAutoplayUnlockHandler, { once: true });
        remoteAutoplayUnlockHandler = null;
    }
    const remoteVideoContainer = document.querySelector('.remote-video');
    if (remoteVideoContainer) {
        remoteVideoContainer.innerHTML = `
            <div class="video-placeholder">
                <i class="fas fa-user-md"></i>
                <span id="counselorName">Dr. Sarah Johnson</span>
            </div>
        `;
    }

    isMuted = false;
    isVideoOn = true;
    isChatOpen = true;
    updateControlButtons();
}

function toggleMute() {
    isMuted = !isMuted;
    console.log('Mute toggled:', isMuted);

    // Control audio track
    if (localStream) {
        const audioTracks = localStream.getAudioTracks();
        audioTracks.forEach(track => {
            track.enabled = !isMuted;
        });
    }

    updateControlButtons();
}

function toggleVideo() {
    isVideoOn = !isVideoOn;
    console.log('Video toggled:', isVideoOn);

    // Control video track
    if (localStream) {
        const videoTracks = localStream.getVideoTracks();
        videoTracks.forEach(track => {
            track.enabled = isVideoOn;
        });
    }

    // Show/hide video element
    if (localVideoElement) {
        localVideoElement.style.display = isVideoOn ? 'block' : 'none';
    }

    updateControlButtons();
}

function toggleChat() {
    isChatOpen = !isChatOpen;
    const chatPanel = document.querySelector('.chat-panel');
    if (chatPanel) {
        if (isChatOpen) {
            chatPanel.classList.add('active');
        } else {
            chatPanel.classList.remove('active');
        }
    }
    console.log('Chat toggled:', isChatOpen);
    updateControlButtons();
}

function endSession() {
    if (confirm('Are you sure you want to end the session?')) {
        closeLiveSessionModal();

        if (currentActiveSession) {
            console.log('Ending active session:', currentActiveSession);

            // 1. Move to Previous Sessions (Update status)
            const existingIndex = bookedSessions.findIndex(s => s.id == currentActiveSession.id);
            if (existingIndex !== -1) {
                // Update existing scheduled session
                bookedSessions[existingIndex].status = 'completed';
            } else {
                // Add temp instant session to history
                const completedSession = {
                    ...currentActiveSession,
                    status: 'completed'
                };
                bookedSessions.push(completedSession);
            }

            // 2. Generate Recording
            const newRecording = {
                id: Date.now() + 1, // Ensure unique ID
                date: new Date().toISOString(),
                counselor: currentActiveSession.counselor,
                duration: Math.floor(Math.random() * 30 + 15) + " mins", // Random duration 15-45 mins
                size: Math.floor(Math.random() * 100 + 50) + " MB" // Random size 50-150 MB
            };

            sessionRecordings.unshift(newRecording);

            // 3. Refresh UI
            console.log('Refreshing UI...');
            loadUpcomingSessions();
            loadPreviousSessions();
            loadRecordings();

            // Clear active session
            currentActiveSession = null;
        }

        console.log('Session ended');
    }
}

function updateControlButtons() {
    const muteBtn = document.querySelector('.control-btn[onclick="toggleMute()"]');
    const videoBtn = document.querySelector('.control-btn[onclick="toggleVideo()"]');
    const chatBtn = document.querySelector('.control-btn[onclick="toggleChat()"]');

    if (muteBtn) {
        muteBtn.classList.toggle('active', isMuted);
        muteBtn.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
    }

    if (videoBtn) {
        videoBtn.classList.toggle('active', !isVideoOn);
        videoBtn.innerHTML = isVideoOn ? '<i class="fas fa-video"></i>' : '<i class="fas fa-video-slash"></i>';
    }

    if (chatBtn) {
        chatBtn.classList.toggle('active', isChatOpen);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('sessionChatMessages');

    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message user';
    messageElement.innerHTML = `< strong > You:</strong > ${message} `;
    chatMessages.appendChild(messageElement);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const responseElement = document.createElement('div');
        responseElement.className = 'chat-message counselor';
        responseElement.innerHTML = '<strong>Dr. Sarah Johnson:</strong> Thank you for sharing. How are you feeling about that?';
        chatMessages.appendChild(responseElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    console.log('Message sent:', message);
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendChatMessage();
    }
});

function callEmergency(number) {
    if (confirm(`This will initiate a call to ${number}.Continue ? `)) {
        console.log(`Calling emergency number: ${number} `);
        alert(`Emergency call to ${number} would be initiated.This is a demo.`);
    }
}

// Initialize everything
console.log('Booking system script loaded');

// Export functions for global access
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.confirmBooking = confirmBooking;
window.closeSuccessModal = closeSuccessModal;
window.bookAnother = bookAnother;
window.joinInstantSession = joinInstantSession;
window.joinScheduledSession = joinScheduledSession;
window.openLiveSessionModal = openLiveSessionModal;
window.closeLiveSessionModal = closeLiveSessionModal;
window.toggleMute = toggleMute;
window.toggleVideo = toggleVideo;
window.toggleChat = toggleChat;
window.endSession = endSession;
window.sendChatMessage = sendChatMessage;
window.callEmergency = callEmergency;
window.joinSession = joinSession;
window.cancelSession = cancelSession;
