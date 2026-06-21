// Enhanced Admin Dashboard JavaScript with Complete Functionality
document.addEventListener('DOMContentLoaded', function () {
    initAdmin();
});

// Sample data storage
let adminData = {
    clients: [
        { id: 1, firstName: 'Lakshmi', lastName: 'Narayanan', email: 'lakshmi.n@email.com', phone: '555-0101', status: 'active', lastSession: '2 days ago', totalSessions: 12, age: 28, gender: 'female' },
        { id: 2, firstName: 'Arjun', lastName: 'Reddy', email: 'arjun.r@email.com', phone: '555-0102', status: 'active', lastSession: 'Today, 2:00 PM', totalSessions: 8, age: 35, gender: 'male' },
        { id: 3, firstName: 'Priya', lastName: 'Krishnan', email: 'priya.k@email.com', phone: '555-0103', status: 'pending', lastSession: '1 week ago', totalSessions: 3, age: 24, gender: 'female' },
        { id: 4, firstName: 'Karthik', lastName: 'Iyer', email: 'karthik.i@email.com', phone: '555-0104', status: 'active', lastSession: '3 days ago', totalSessions: 15, age: 42, gender: 'male' },
        { id: 5, firstName: 'Anjali', lastName: 'Menon', email: 'anjali.m@email.com', phone: '555-0105', status: 'inactive', lastSession: '2 months ago', totalSessions: 6, age: 31, gender: 'female' },
        { id: 6, firstName: 'Anonymous', lastName: 'User', email: 'hidden@mentaura.com', phone: '000-0000', status: 'active', lastSession: '1 day ago', totalSessions: 4, age: 0, gender: 'prefer-not-to-say' },
        { id: 7, firstName: 'Anonymous', lastName: 'User', email: 'hidden@mentaura.com', phone: '000-0000', status: 'pending', lastSession: 'Never', totalSessions: 0, age: 0, gender: 'prefer-not-to-say' }
    ],
    appointments: [
        { id: 1, clientName: 'Lakshmi Narayanan', date: '2025-09-20', time: '09:00', duration: 60, type: 'individual', mode: 'video-call', status: 'confirmed' },
        { id: 2, clientName: 'Arjun Reddy', date: '2025-09-20', time: '11:30', duration: 45, type: 'follow-up', mode: 'in-person', status: 'confirmed' },
        { id: 3, clientName: 'Karthik Iyer', date: '2025-09-20', time: '14:15', duration: 60, type: 'consultation', mode: 'video-call', status: 'pending' },
        { id: 4, clientName: 'Priya Krishnan', date: '2025-09-21', time: '10:00', duration: 60, type: 'individual', mode: 'video-call', status: 'confirmed' }
    ],
    messages: [
        { id: 1, clientName: 'Priya Krishnan', message: "I've been feeling much better since our last session...", time: '5 min ago', unread: true, urgent: false },
        { id: 2, clientName: 'Lakshmi Narayanan', message: 'Thank you for the resources you shared!', time: '2 hours ago', unread: false, urgent: false },
        { id: 3, clientName: 'Arjun Reddy', message: "Can we reschedule tomorrow's appointment?", time: '1 day ago', unread: false, urgent: true }
    ],
    forumPosts: [
        { id: 1, title: 'Managing Anxiety During Work Hours', category: 'anxiety', replies: 23, created: '2 hours ago', status: 'published' },
        { id: 2, title: 'Sleep Hygiene Tips for Better Mental Health', category: 'wellness', replies: 15, created: '1 day ago', status: 'published' },
        { id: 3, title: 'Building Resilience in Challenging Times', category: 'wellness', replies: 31, created: '3 days ago', status: 'published' }
    ],
    activities: [] // Will be loaded from localStorage
};

let currentPage = {
    clients: 1,
    appointments: 1,
    messages: 1
};

function initAdmin() {
    initMobileMenu();
    initSearchFunctionality();
    initActionButtons();
    initQuickActions();
    initNotifications();
    initModalHandlers();
    initFormHandlers();
    loadDashboardData();
    initRealTimeUpdates();
    populateSelectOptions();
}

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

function initSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');

    searchInputs.forEach(input => {
        input.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const clientList = document.querySelector('.client-list');
            const clients = clientList.querySelectorAll('.client-item');

            clients.forEach(client => {
                const clientName = client.querySelector('h4').textContent.toLowerCase();
                if (clientName.includes(searchTerm)) {
                    client.style.display = 'flex';
                } else {
                    client.style.display = 'none';
                }
            });
        });
    });
}

function initActionButtons() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.btn-action')) {
            const button = e.target.closest('.btn-action');
            const action = button.getAttribute('title');
            const clientName = button.getAttribute('data-client') ||
                button.closest('.client-item')?.querySelector('h4')?.textContent ||
                button.closest('.chat-item')?.querySelector('h4')?.textContent;

            switch (action) {
                case 'View Profile':
                    handleViewProfile(clientName);
                    break;
                case 'Send Message':
                    openChatModal(clientName);
                    break;
                case 'Schedule Appointment':
                    openScheduleAppointmentModal(clientName);
                    break;
                case 'Reply':
                    openChatModal(clientName);
                    break;
            }
        }
    });
}

function initQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');

    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

function initNotifications() {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.remove('unread');
            const messageCount = this.querySelector('.message-count');
            if (messageCount) {
                messageCount.style.display = 'none';
            }
            updateNotificationBadge();
        });
    });
}

function initModalHandlers() {
    // View All buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-view-all')) {
            const modalType = e.target.getAttribute('data-modal');
            openModal(modalType);
        }
    });

    // Modal close buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('admin-modal')) {
            closeModal(e.target.id);
        }
    });

    // Settings tabs
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('settings-tab')) {
            const tabName = e.target.getAttribute('data-tab');
            switchSettingsTab(tabName);
        }
    });

    // Message filters
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.getAttribute('data-filter');
            filterMessages(filter);

            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

function initFormHandlers() {
    // Add Client Form
    const addClientForm = document.getElementById('addClientForm');
    if (addClientForm) {
        addClientForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleAddClient();
        });
    }

    // Schedule Appointment Form
    const scheduleAppointmentForm = document.getElementById('scheduleAppointmentForm');
    if (scheduleAppointmentForm) {
        scheduleAppointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleScheduleAppointment();
        });
    }

    // Create Report Form
    const createReportForm = document.getElementById('createReportForm');
    if (createReportForm) {
        createReportForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleCreateReport();
        });
    }

    // Send Reminder Form
    const sendReminderForm = document.getElementById('sendReminderForm');
    if (sendReminderForm) {
        sendReminderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleSendReminder();
        });
    }

    // Create Forum Post Form
    const createForumPostForm = document.getElementById('createForumPostForm');
    if (createForumPostForm) {
        createForumPostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleCreateForumPost();
        });
    }

    // Chat input
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatMessage');

    if (chatInput && sendChatBtn) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });

        sendChatBtn.addEventListener('click', sendChatMessage);
    }
}

function openModal(modalType) {
    let modalId = '';

    switch (modalType) {
        case 'allClients':
            modalId = 'allClientsModal';
            loadAllClients();
            break;
        case 'fullSchedule':
            modalId = 'fullScheduleModal';
            loadFullSchedule();
            break;
        case 'allMessages':
            modalId = 'allMessagesModal';
            loadAllMessages();
            break;
        case 'forumPosts':
            modalId = 'forumPostsModal';
            loadForumPosts();
            break;
        case 'allActivity':
            modalId = 'allActivityModal';
            loadAllActivity();
            break;
    }

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleQuickAction(action) {
    switch (action) {
        case 'addClient':
            openModal('addClientModal');
            break;
        case 'scheduleAppointment':
            openModal('scheduleAppointmentModal');
            break;
        case 'createReport':
            openModal('createReportModal');
            break;
        case 'sendReminder':
            openModal('sendReminderModal');
            break;
        case 'settings':
            openModal('settingsModal');
            break;
    }

    const modal = document.getElementById(getModalId(action));
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function getModalId(action) {
    const modalMap = {
        'addClient': 'addClientModal',
        'scheduleAppointment': 'scheduleAppointmentModal',
        'createReport': 'createReportModal',
        'sendReminder': 'sendReminderModal',
        'settings': 'settingsModal'
    };
    return modalMap[action] || '';
}

function loadAllClients() {
    const tableBody = document.getElementById('allClientsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    adminData.clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.firstName} ${client.lastName}</td>
            <td><span class="status-badge ${client.status}">${client.status}</span></td>
            <td>${client.lastSession}</td>
            <td>${client.totalSessions}</td>
            <td>
                <button class="btn-action" onclick="handleViewProfile('${client.firstName} ${client.lastName}')" title="View Profile">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action" onclick="openChatModal('${client.firstName} ${client.lastName}')" title="Message">
                    <i class="fas fa-message"></i>
                </button>
                <button class="btn-action" onclick="openScheduleAppointmentModal('${client.firstName} ${client.lastName}')" title="Schedule">
                    <i class="fas fa-calendar-plus"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadFullSchedule() {
    const calendar = document.getElementById('scheduleCalendar');
    if (!calendar) return;

    calendar.innerHTML = '';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = ['16', '17', '18', '19', '20', '21', '22'];

    days.forEach((day, index) => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'calendar-day';
        dayColumn.innerHTML = `
            <div class="day-header">
                <div class="day-name">${day}</div>
                <div class="day-date">${dates[index]}</div>
            </div>
            <div class="day-appointments" id="day-${index}">
                <!-- Appointments for this day -->
            </div>
        `;
        calendar.appendChild(dayColumn);
    });

    // Add sample appointments
    adminData.appointments.forEach(apt => {
        const dayIndex = new Date(apt.date).getDay() - 1; // Monday = 0
        const dayContainer = document.getElementById(`day-${dayIndex}`);
        if (dayContainer && dayIndex >= 0) {
            const aptElement = document.createElement('div');
            aptElement.className = `appointment-block ${apt.status}`;
            aptElement.innerHTML = `
                <div class="apt-time">${apt.time}</div>
                <div class="apt-client">${apt.clientName}</div>
                <div class="apt-type">${apt.type}</div>
            `;
            dayContainer.appendChild(aptElement);
        }
    });
}

function loadAllMessages() {
    const messagesList = document.getElementById('allMessagesList');
    if (!messagesList) return;

    messagesList.innerHTML = '';

    adminData.messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.className = `message-item ${msg.unread ? 'unread' : ''} ${msg.urgent ? 'urgent' : ''}`;
        msgElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
                ${msg.urgent ? '<span class="urgent-indicator">!</span>' : ''}
            </div>
            <div class="message-content">
                <div class="message-header">
                    <h4>${msg.clientName}</h4>
                    <span class="message-time">${msg.time}</span>
                </div>
                <p class="message-preview">${msg.message}</p>
                ${msg.unread ? '<span class="unread-indicator">New</span>' : ''}
            </div>
            <div class="message-actions">
                <button class="btn-action" onclick="openChatModal('${msg.clientName}')" title="Reply">
                    <i class="fas fa-reply"></i>
                </button>
            </div>
        `;
        messagesList.appendChild(msgElement);
    });
}

function loadForumPosts() {
    const tableBody = document.getElementById('forumPostsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    adminData.forumPosts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td><span class="category-badge ${post.category}">${post.category}</span></td>
            <td>${post.replies}</td>
            <td>${post.created}</td>
            <td><span class="status-badge ${post.status}">${post.status}</span></td>
            <td>
                <button class="btn-action" onclick="editForumPost(${post.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action" onclick="deleteForumPost(${post.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadAllActivity() {
    const activityLog = document.getElementById('allActivityLog');
    if (!activityLog) return;

    activityLog.innerHTML = '';

    adminData.activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-log-item';
        activityElement.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-details">
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityLog.appendChild(activityElement);
    });
}

function getActivityIcon(type) {
    const icons = {
        'client': 'fa-user',
        'appointment': 'fa-calendar',
        'message': 'fa-message',
        'forum': 'fa-comments'
    };
    return icons[type] || 'fa-circle';
}

function openChatModal(clientName) {
    const modal = document.getElementById('chatModal');
    const clientNameSpan = document.getElementById('chatClientName');
    const chatMessages = document.getElementById('chatMessages');

    if (modal && clientNameSpan && chatMessages) {
        clientNameSpan.textContent = clientName;

        // Load sample chat messages
        chatMessages.innerHTML = `
            <div class="chat-message client-message">
                <div class="message-content">
                    <p>I've been feeling much better since our last session. The techniques you taught me are really helping.</p>
                    <span class="message-timestamp">10:30 AM</span>
                </div>
            </div>
            <div class="chat-message counselor-message">
                <div class="message-content">
                    <p>That's wonderful to hear! I'm so glad the mindfulness exercises are working for you. How are you finding the breathing techniques?</p>
                    <span class="message-timestamp">10:32 AM</span>
                </div>
            </div>
            <div class="chat-message client-message">
                <div class="message-content">
                    <p>They're amazing! I use them especially during stressful moments at work.</p>
                    <span class="message-timestamp">10:35 AM</span>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Focus on input
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }, 100);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (chatInput && chatMessages && chatInput.value.trim()) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message counselor-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${chatInput.value}</p>
                <span class="message-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';

        showNotification('Message sent successfully!', 'success');
    }
}

function openScheduleAppointmentModal(clientName = '') {
    const modal = document.getElementById('scheduleAppointmentModal');
    const clientSelect = document.getElementById('appointmentClient');

    if (modal && clientSelect) {
        if (clientName) {
            // Find and select the specific client
            for (let option of clientSelect.options) {
                if (option.text === clientName) {
                    option.selected = true;
                    break;
                }
            }
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function openCreatePostModal() {
    const modal = document.getElementById('createForumPostModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function populateSelectOptions() {
    // Populate client selects
    const clientSelects = ['appointmentClient', 'reportClient', 'reminderClient'];

    clientSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select && selectId !== 'reminderClient') {
            adminData.clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id;
                option.textContent = `${client.firstName} ${client.lastName}`;
                select.appendChild(option);
            });
        } else if (select && selectId === 'reminderClient') {
            adminData.clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id;
                option.textContent = `${client.firstName} ${client.lastName}`;
                select.appendChild(option);
            });
        }
    });
}

function handleAddClient() {
    const form = document.getElementById('addClientForm');
    const formData = new FormData(form);

    const newClient = {
        id: adminData.clients.length + 1,
        firstName: document.getElementById('clientFirstName').value,
        lastName: document.getElementById('clientLastName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        age: document.getElementById('clientAge').value,
        gender: document.getElementById('clientGender').value,
        status: 'active',
        lastSession: 'Never',
        totalSessions: 0
    };

    adminData.clients.push(newClient);

    showNotification('New client added successfully!', 'success');
    closeModal('addClientModal');
    form.reset();

    // Update stats
    updateClientCount();
}

function handleScheduleAppointment() {
    const clientId = document.getElementById('appointmentClient').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const duration = document.getElementById('appointmentDuration').value;
    const type = document.getElementById('appointmentType').value;
    const mode = document.getElementById('appointmentMode').value;
    const notes = document.getElementById('appointmentNotes').value;

    const client = adminData.clients.find(c => c.id == clientId);

    const newAppointment = {
        id: adminData.appointments.length + 1,
        clientName: `${client.firstName} ${client.lastName}`,
        date: date,
        time: time,
        duration: parseInt(duration),
        type: type,
        mode: mode,
        status: 'confirmed',
        notes: notes
    };

    adminData.appointments.push(newAppointment);

    showNotification('Appointment scheduled successfully!', 'success');
    closeModal('scheduleAppointmentModal');
    document.getElementById('scheduleAppointmentForm').reset();

    // Add to activity log
    addActivity('appointment', `Appointment scheduled: ${client.firstName} ${client.lastName} - ${date} ${time}`);
}

function handleCreateReport() {
    const type = document.getElementById('reportType').value;
    const clientId = document.getElementById('reportClient').value;
    const date = document.getElementById('reportDate').value;
    const title = document.getElementById('reportTitle').value;
    const content = document.getElementById('reportContent').value;
    const recommendations = document.getElementById('reportRecommendations').value;

    const client = adminData.clients.find(c => c.id == clientId);

    showNotification('Report created successfully!', 'success');
    closeModal('createReportModal');
    document.getElementById('createReportForm').reset();

    // Add to activity log
    addActivity('report', `Report created: ${title} for ${client.firstName} ${client.lastName}`);
}

function handleSendReminder() {
    const clientId = document.getElementById('reminderClient').value;
    const type = document.getElementById('reminderType').value;
    const method = document.getElementById('reminderMethod').value;
    const dateTime = document.getElementById('reminderDateTime').value;
    const subject = document.getElementById('reminderSubject').value;
    const message = document.getElementById('reminderMessage').value;

    let clientName = 'All Clients';
    if (clientId !== 'all') {
        const client = adminData.clients.find(c => c.id == clientId);
        clientName = `${client.firstName} ${client.lastName}`;
    }

    showNotification(`Reminder scheduled for ${clientName}!`, 'success');
    closeModal('sendReminderModal');
    document.getElementById('sendReminderForm').reset();

    // Add to activity log
    addActivity('reminder', `Reminder scheduled: ${subject} for ${clientName}`);
}

function handleCreateForumPost() {
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;
    const tags = document.getElementById('postTags').value;
    const pinned = document.getElementById('postPinned').checked;

    const newPost = {
        id: adminData.forumPosts.length + 1,
        title: title,
        category: category,
        content: content,
        tags: tags.split(',').map(tag => tag.trim()),
        pinned: pinned,
        replies: 0,
        created: 'Just now',
        status: 'published'
    };

    adminData.forumPosts.unshift(newPost);

    showNotification('Forum post published successfully!', 'success');
    closeModal('createForumPostModal');
    document.getElementById('createForumPostForm').reset();

    // Add to activity log
    addActivity('forum', `Forum post published: "${title}"`);

    // Update forum stats
    updateForumCount();
}

// Analytics removed
console.log('Analytics section removed.');

function switchSettingsTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.settings-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Settings`).classList.add('active');
}

function filterMessages(filter) {
    const messagesList = document.getElementById('allMessagesList');
    if (!messagesList) return;

    const messages = messagesList.querySelectorAll('.message-item');

    messages.forEach(message => {
        let show = true;

        switch (filter) {
            case 'unread':
                show = message.classList.contains('unread');
                break;
            case 'urgent':
                show = message.classList.contains('urgent');
                break;
            case 'all':
            default:
                show = true;
                break;
        }

        message.style.display = show ? 'flex' : 'none';
    });
}

function handleViewProfile(clientName) {
    // Clean up name if it comes from the quick action button logic which might pass extra text
    clientName = clientName.trim();

    // Find client
    // Note: In a real app we'd use ID, but here we're relying on Name string or passed ID logic if we updated it.
    // adminData.clients has firstName/lastName.
    const client = adminData.clients.find(c => `${c.firstName} ${c.lastName}` === clientName);

    if (!client) {
        showNotification('Client details not found.', 'error');
        return;
    }

    const isAnonymous = client.firstName === 'Anonymous';

    // Populate Modal
    document.getElementById('profileName').textContent = isAnonymous ? 'Anonymous User' : `${client.firstName} ${client.lastName}`;
    document.getElementById('profileStatus').textContent = client.status;
    document.getElementById('profileStatus').className = `status-badge ${client.status}`;

    document.getElementById('profileEmail').textContent = isAnonymous ? 'Not available (Anonymous)' : client.email;
    document.getElementById('profilePhone').textContent = isAnonymous ? 'Not available' : client.phone;
    document.getElementById('profileAge').textContent = isAnonymous ? 'N/A' : client.age;
    document.getElementById('profileGender').textContent = isAnonymous ? 'Hidden' : client.gender;
    document.getElementById('profileLastSession').textContent = client.lastSession;
    document.getElementById('profileTotalSessions').textContent = client.totalSessions;

    // Notes
    const notesEl = document.getElementById('profileNotes');
    if (isAnonymous) {
        notesEl.innerHTML = '<p><em>This user has chosen to remain anonymous. Identifying details are hidden.</em></p>';
    } else {
        notesEl.innerHTML = '<p>Patient is responding well to treatment. Next session scheduled for follow-up on recent progress.</p>';
    }

    // Buttons
    const msgBtn = document.getElementById('profileMessageBtn');
    const scheduleBtn = document.getElementById('profileScheduleBtn');

    msgBtn.onclick = () => {
        closeModal('clientProfileModal');
        openChatModal(isAnonymous ? 'Anonymous User' : `${client.firstName} ${client.lastName}`);
    };

    scheduleBtn.onclick = () => {
        closeModal('clientProfileModal');
        openScheduleAppointmentModal(isAnonymous ? 'Anonymous User' : `${client.firstName} ${client.lastName}`);
    };

    // Open Modal
    const modal = document.getElementById('clientProfileModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function addActivity(type, description) {
    const newActivity = {
        type: type,
        description: description,
        time: 'Just now'
    };

    // Add to local data
    adminData.activities.unshift(newActivity);

    // Save to localStorage
    try {
        const savedActivities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
        savedActivities.unshift(newActivity);
        // Keep only last 50 activities in storage
        if (savedActivities.length > 50) {
            savedActivities.length = 50;
        }
        localStorage.setItem('adminActivities', JSON.stringify(savedActivities));
    } catch (e) {
        console.error('Error saving activity:', e);
    }

    // Update the activity timeline on dashboard
    const timeline = document.getElementById('activityTimeline');
    if (timeline) {
        const newActivityElement = document.createElement('div');
        newActivityElement.className = 'activity-item';
        newActivityElement.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${getActivityIcon(type)}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${description}</strong></p>
                <span class="activity-time">Just now</span>
            </div>
        `;

        timeline.insertBefore(newActivityElement, timeline.firstChild);

        // Keep only latest 4 activities visible
        const activities = timeline.querySelectorAll('.activity-item');
        if (activities.length > 4) {
            timeline.removeChild(activities[activities.length - 1]);
        }

        // Highlight new activity
        newActivityElement.style.background = 'var(--accent-light)';
        setTimeout(() => {
            newActivityElement.style.background = '';
            newActivityElement.style.transition = 'background 0.3s ease';
        }, 2000);
    }
}

function updateClientCount() {
    const totalClientsElement = document.getElementById('totalClients');
    if (totalClientsElement) {
        totalClientsElement.textContent = adminData.clients.length;
    }
}

function updateForumCount() {
    const forumPostsElement = document.getElementById('forumPosts');
    if (forumPostsElement) {
        forumPostsElement.textContent = adminData.forumPosts.length;
    }
}

function loadDashboardData() {
    // Load activities from localStorage
    try {
        const savedActivities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
        if (savedActivities.length > 0) {
            adminData.activities = savedActivities;
        } else {
            // Default activities if storage is empty
            adminData.activities = [
                { type: 'client', description: 'New client registered: Priya Krishnan', time: '10 minutes ago' },
                { type: 'appointment', description: 'Appointment scheduled: Arjun Reddy - Tomorrow 2:00 PM', time: '1 hour ago' },
                { type: 'forum', description: 'Forum post published: "Managing Stress at Work"', time: '3 hours ago' },
                { type: 'message', description: 'Message received: From Lakshmi Narayanan', time: '5 hours ago' }
            ];
            localStorage.setItem('adminActivities', JSON.stringify(adminData.activities));
        }
    } catch (e) {
        console.error('Error loading activities:', e);
        // Fallback defaults
        adminData.activities = [
            { type: 'client', description: 'New client registered: Priya Krishnan', time: '10 minutes ago' },
            { type: 'appointment', description: 'Appointment scheduled: Arjun Reddy - Tomorrow 2:00 PM', time: '1 hour ago' },
            { type: 'forum', description: 'Forum post published: "Managing Stress at Work"', time: '3 hours ago' },
            { type: 'message', description: 'Message received: From Lakshmi Narayanan', time: '5 hours ago' }
        ];
    }

    // Populate timeline
    const timeline = document.getElementById('activityTimeline');
    if (timeline) {
        timeline.innerHTML = ''; // Clear existing
        // Show top 4
        adminData.activities.slice(0, 4).forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.innerHTML = `
                <div class="activity-icon">
                    <i class="fas ${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${activity.description}</strong></p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            timeline.appendChild(activityElement);
        });
    }

    updateStats();
    updateNotificationBadge();
}

function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-content-compact h3');

    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/,/g, ''));
        animateNumber(stat, 0, finalValue, 1500);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function updateNotificationBadge() {
    const unreadCount = adminData.messages.filter(msg => msg.unread).length;
    const notificationBadge = document.querySelector('.notification-badge');

    if (notificationBadge) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

function initRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time updates
        if (Math.random() > 0.9) {
            const randomActivity = [
                { type: 'message', description: 'New message received from client', time: 'Just now' },
                { type: 'client', description: 'New client registered', time: 'Just now' },
                { type: 'appointment', description: 'Appointment confirmed', time: 'Just now' }
            ];

            const activity = randomActivity[Math.floor(Math.random() * randomActivity.length)];
            addActivity(activity.type, activity.description);
        }
    }, 30000); // Every 30 seconds
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#EF4444' :
            type === 'success' ? '#10B981' :
                'var(--primary-color)'};
        color: white;
        padding: 12px 20px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Language dropdown functionality
document.addEventListener('DOMContentLoaded', function () {
    const languageBtn = document.getElementById('languageBtn');
    const languageMenu = document.getElementById('languageMenu');
    const currentLang = document.getElementById('currentLang');

    if (languageBtn && languageMenu) {
        languageBtn.addEventListener('click', function () {
            languageMenu.classList.toggle('show');
        });

        languageMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const selectedLang = e.target.textContent.split(' ')[0];
                currentLang.textContent = e.target.getAttribute('data-lang').toUpperCase();
                languageMenu.classList.remove('show');
                showNotification(`Language changed to ${selectedLang}`, 'success');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!languageBtn.contains(e.target)) {
                languageMenu.classList.remove('show');
            }
        });
    }
});

// Additional utility functions
function editForumPost(postId) {
    showNotification('Opening post editor...', 'info');
    // Implement edit functionality
}

function deleteForumPost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        adminData.forumPosts = adminData.forumPosts.filter(post => post.id !== postId);
        loadForumPosts();
        showNotification('Post deleted successfully!', 'success');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initAdmin();
});
