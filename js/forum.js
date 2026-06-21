// Enhanced Forum JavaScript - Fixed Modal Issues
let deletePostId = null;
let selectedChatUser = null;
let chatMessages = [];

// Sample data for posts and comments - FIXED DATA STRUCTURE
const postsData = {
    1: {
        id: 1,
        title: "Feeling overwhelmed with work stress",
        content: "I've been struggling with work stress lately and it's really starting to affect my sleep and overall mood. I wake up in the middle of the night thinking about deadlines, and during the day I feel constantly on edge. My manager has been putting a lot of pressure on our team, and I feel like I can't keep up with the demands.\n\nHas anyone else experienced this kind of work-related anxiety? What strategies have you found helpful for managing stress in a high-pressure environment? I'm open to any suggestions - whether it's relaxation techniques, ways to communicate with management, or just general coping strategies. I really don't want this to continue affecting my personal life and relationships.\n\nThank you for listening and for any advice you might have.",
        author: "Lakshmi N.",
        category: "anxiety",
        time: "2 hours ago",
        replies: 12,
        likes: 24,
        comments: [
            {
                id: 1,
                author: "Arjun R.",
                time: "1 hour ago",
                text: "I completely understand what you're going through. I experienced similar work stress last year. What helped me was setting clear boundaries - I started turning off work notifications after 7 PM and practiced deep breathing exercises during breaks. Have you considered talking to HR about the workload?",
                likes: 5
            },
            {
                id: 2,
                author: "Dr. Anjali M.",
                time: "45 minutes ago",
                text: "Work-related stress can significantly impact both physical and mental health. Some evidence-based techniques that might help: progressive muscle relaxation, time-blocking for tasks, and the 4-7-8 breathing technique. Consider keeping a stress journal to identify specific triggers. If symptoms persist, speaking with a mental health professional can provide personalized strategies.",
                likes: 18,
                verified: true
            },
            {
                id: 3,
                author: "Anonymous",
                time: "30 minutes ago",
                text: "Thank you for sharing this. I'm going through something similar and it helps to know I'm not alone. The meditation app Headspace has some specific work stress sessions that I've found really helpful during lunch breaks.",
                likes: 3
            }
        ]
    },
    2: {
        id: 2,
        title: "Meditation has changed my life",
        content: "After 3 months of daily meditation, I can honestly say it's been transformative. Here's what I've learned and experienced during this journey.\n\nI started with just 5 minutes a day using a simple breathing app. At first, my mind was racing constantly - I couldn't sit still for even those 5 minutes. But I stuck with it, and gradually increased the time.\n\nNow I meditate for 20 minutes every morning, and the changes have been remarkable. My anxiety levels have dropped significantly, I sleep better, and I feel more present in my daily interactions. I'm less reactive to stressful situations and more able to respond thoughtfully.\n\nFor anyone considering starting meditation, my advice is to start small and be patient with yourself. It's called a 'practice' for a reason!",
        author: "Arjun R.",
        category: "wellness",
        time: "4 hours ago",
        replies: 8,
        likes: 15,
        comments: []
    },
    3: {
        id: 3,
        title: "Relationship boundaries - need advice",
        content: "I'm having trouble setting boundaries with my family. They always seem to overstep and I feel guilty when I try to say no...",
        author: "Karthik I.",
        category: "relationships",
        time: "6 hours ago",
        replies: 15,
        likes: 8,
        comments: []
    },
    4: {
        id: 4,
        title: "One year therapy anniversary!",
        content: "Today marks one year since I started therapy. I wanted to share my journey and encourage anyone who's hesitant to take that first step...",
        author: "Priya K.",
        category: "success",
        time: "1 day ago",
        replies: 23,
        likes: 45,
        comments: []
    },
    5: {
        id: 5,
        title: "Finding hope in dark times",
        content: "I wanted to share some strategies that have helped me during my darkest moments with depression...",
        author: "Rahul R.",
        category: "depression",
        time: "2 days ago",
        replies: 18,
        likes: 32,
        comments: []
    }
};

const categoryPostsData = {
    general: [
        { id: 101, title: "New to the community - hello everyone!", author: "NewUser123", time: "1 hour ago", replies: 15, category: "general", excerpt: "Hi everyone! I'm new here and excited to connect with others on similar journeys. Looking forward to learning from all of you!" },
        { id: 102, title: "Weekly check-in thread", author: "Moderator", time: "3 hours ago", replies: 42, category: "general", excerpt: "How has your week been? Share your highs and lows with the community. Remember, we're all here to support each other." },
        { id: 103, title: "What's helping you today?", author: "PositiveVibes", time: "5 hours ago", replies: 28, category: "general", excerpt: "Let's share the small things that are making today a little brighter. Sometimes it's the little victories that count most." }
    ],
    anxiety: [
        { id: 201, title: "Managing social anxiety at work", author: "WorkStressed", time: "2 hours ago", replies: 18, category: "anxiety", excerpt: "I've been having trouble with presentations and team meetings. The physical symptoms are getting worse and it's affecting my performance." },
        { id: 202, title: "Breathing exercises that actually work", author: "CalmMind", time: "4 hours ago", replies: 25, category: "anxiety", excerpt: "Here are some breathing techniques that have genuinely helped me manage my anxiety attacks. The 4-7-8 method has been a game changer." },
        { id: 203, title: "Panic attacks during meetings", author: "Anonymous", time: "6 hours ago", replies: 12, category: "anxiety", excerpt: "I need advice on how to handle panic attacks at work without drawing attention to myself. Has anyone found discrete coping strategies?" }
    ],
    depression: [
        { id: 301, title: "Small wins matter", author: "ProgressMatter", time: "1 hour ago", replies: 22, category: "depression", excerpt: "Celebrating the little victories that keep me going. Today I managed to shower, make my bed, and have a proper meal. That's huge for me right now." },
        { id: 302, title: "Getting out of bed was hard today", author: "TakingItSlow", time: "3 hours ago", replies: 35, category: "depression", excerpt: "Some days are harder than others, but I made it. Even small steps forward are still progress. Sharing in case others need to hear this too." },
        { id: 303, title: "Therapy milestone reached!", author: "GrowingStrong", time: "8 hours ago", replies: 48, category: "depression", excerpt: "Just hit 6 months of consistent therapy and wanted to share my journey. It's been challenging but so worth it. There is light at the end." }
    ],
    relationships: [
        { id: 401, title: "Setting boundaries with family", author: "BoundarySeeker", time: "30 minutes ago", replies: 8, category: "relationships", excerpt: "Learning to say no to family members without feeling guilty has been one of the hardest things for me. Any tips on maintaining healthy boundaries?" },
        { id: 402, title: "Communication in romantic relationships", author: "LoveGrows", time: "2 hours ago", replies: 16, category: "relationships", excerpt: "How do you handle difficult conversations with your partner? I tend to shut down or get defensive, and I want to do better." },
        { id: 403, title: "Making friends as an adult", author: "SocialGrowth", time: "5 hours ago", replies: 31, category: "relationships", excerpt: "It's challenging to build new friendships after college. Where do you meet like-minded people and how do you maintain those connections?" }
    ],
    wellness: [
        { id: 501, title: "Morning routine that changed everything", author: "EarlyBird", time: "1 hour ago", replies: 14, category: "wellness", excerpt: "My 5 AM routine has transformed my mental health. Sharing what works for me - meditation, journaling, and gentle movement before the day begins." },
        { id: 502, title: "Exercise and mental health connection", author: "FitMind", time: "4 hours ago", replies: 27, category: "wellness", excerpt: "The science behind why movement improves mood is fascinating. Even a 10-minute walk can make such a difference in my day." },
        { id: 503, title: "Nutrition for better mood", author: "HealthyEats", time: "7 hours ago", replies: 19, category: "wellness", excerpt: "Foods that have actually improved my mental wellbeing. It's amazing how much diet affects mood and energy levels." }
    ],
    success: [
        { id: 601, title: "6 months anxiety-free!", author: "Survivor", time: "2 hours ago", replies: 56, category: "success", excerpt: "Sharing my journey and what finally worked for me. It took time and multiple approaches, but I'm finally in a good place." },
        { id: 602, title: "Started therapy and it's amazing", author: "BraveStep", time: "1 day ago", replies: 38, category: "success", excerpt: "For anyone hesitant about therapy - here's my experience after 3 months. Best decision I ever made for my mental health." },
        { id: 603, title: "Overcame my biggest fear today", author: "Fearless", time: "2 days ago", replies: 29, category: "success", excerpt: "Public speaking used to terrify me, but today I gave a presentation to 50 people and felt confident throughout. Growth is possible!" }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    initForum();
});

function initForum() {
    initMobileMenu();
    initLanguageDropdown();
    initCategoryNavigation();
    initNewPostModal();
    initPostInteractions();
    initCharacterCount();
    initHorizontalScroll();
    initPrivateChat();
    loadForumData();
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

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
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

        languageMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const selectedLang = e.target.getAttribute('data-lang');
                currentLang.textContent = e.target.textContent;
                languageMenu.classList.remove('show');

                console.log('Language switched to:', selectedLang);
            }
        });

        document.addEventListener('click', function () {
            languageMenu.classList.remove('show');
        });
    }
}

// FIXED Modal Functions
function showPostDetail(postId) {
    console.log('Showing post detail for ID:', postId); // Debug log
    const post = postsData[postId];
    if (!post) {
        console.log('Post not found for ID:', postId); // Debug log
        return;
    }

    // Update post detail content
    document.getElementById('detailPostCategory').textContent = getCategoryName(post.category);
    document.getElementById('detailPostCategory').className = `post-category-large ${post.category}`;
    document.getElementById('detailPostTitle').textContent = post.title;
    document.getElementById('detailAuthorName').textContent = post.author;
    document.getElementById('detailPostTime').textContent = post.time;
    document.getElementById('detailPostContent').textContent = post.content;

    // Load comments
    loadComments(post.comments || []);

    // Show modal - FIXED
    const modal = document.getElementById('postDetailModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex'; // Ensure display is set
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now'); // Debug log
    } else {
        console.log('Modal element not found'); // Debug log
    }
}

function closePostDetailModal() {
    const modal = document.getElementById('postDetailModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function showCategoryPosts(category) {
    console.log('Showing category posts for:', category); // Debug log
    const categoryInfo = {
        'general': { name: 'General Discussion', description: 'Share your thoughts, experiences, and connect with the community' },
        'anxiety': { name: 'Anxiety Support', description: 'Find support and share coping strategies for anxiety' },
        'depression': { name: 'Depression Support', description: 'A safe space to discuss depression and find hope' },
        'relationships': { name: 'Relationships', description: 'Discuss relationship challenges and healthy communication' },
        'wellness': { name: 'Wellness & Self-Care', description: 'Share tips and experiences about mental wellness' },
        'success': { name: 'Success Stories', description: 'Celebrate victories and inspire others with your journey' }
    };

    const info = categoryInfo[category];
    if (!info) return;

    // Update modal content
    document.getElementById('modalCategoryTitle').textContent = info.name;
    document.getElementById('modalCategoryDescription').textContent = info.description;

    // Load category posts
    const postsList = document.getElementById('modalCategoryPostsList');
    const posts = categoryPostsData[category] || [];

    postsList.innerHTML = posts.map(post => `
        <div class="category-post-item" onclick="showPostDetail(${post.id})">
            <div class="category-post-header">
                <h4 class="category-post-title">${post.title}</h4>
                <p class="category-post-excerpt">${post.excerpt}</p>
                <div class="category-post-meta">
                    <span class="post-author"><i class="fas fa-user"></i> ${post.author}</span>
                    <span class="post-time"><i class="fas fa-clock"></i> ${post.time}</span>
                    <span class="post-replies"><i class="fas fa-comments"></i> ${post.replies} replies</span>
                </div>
            </div>
        </div>
    `).join('');

    // Show modal - FIXED
    const modal = document.getElementById('categoryPostsModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex'; // Ensure display is set
        document.body.style.overflow = 'hidden';
        console.log('Category modal should be visible now'); // Debug log
    } else {
        console.log('Category modal element not found'); // Debug log
    }
}

function closeCategoryPostsModal() {
    const modal = document.getElementById('categoryPostsModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function loadComments(comments) {
    const commentsList = document.getElementById('commentsList');

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-card">
            <div class="comment-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.time}</span>
                    ${comment.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Therapist</span>' : ''}
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions-bar">
                    <button class="comment-action-btn">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                    <button class="comment-action-btn">
                        <i class="fas fa-reply"></i>
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Horizontal Scroll for Posts
function initHorizontalScroll() {
    const scrollContainer = document.querySelector('.posts-horizontal-scroll');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');

    if (scrollContainer) {
        function updateScrollButtons() {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            leftBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            leftBtn.disabled = scrollLeft <= 0;

            rightBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0.5';
            rightBtn.disabled = scrollLeft >= maxScroll;
        }

        scrollContainer.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons();

        window.addEventListener('resize', updateScrollButtons);
    }
}

function scrollPosts(direction) {
    const scrollContainer = document.querySelector('.posts-horizontal-scroll');
    const cardWidth = 320;
    const scrollAmount = cardWidth * 2;

    if (direction === 'left') {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Category Navigation
function initCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            navigateToCategory(category);
        });

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

function navigateToCategory(category) {
    showLoadingState();

    setTimeout(() => {
        hideLoadingState();
        showCategoryPosts(category);
    }, 800);
}

// Post Interactions
function initPostInteractions() {
    const postCards = document.querySelectorAll('.post-card-horizontal');

    postCards.forEach(post => {
        post.addEventListener('click', function (e) {
            // Prevent event if clicking delete button
            if (e.target.closest('.post-delete-btn')) {
                e.stopPropagation();
                return;
            }

            const postId = this.getAttribute('data-post-id');
            console.log('Post clicked, ID:', postId); // Debug log
            showPostDetail(parseInt(postId)); // Ensure it's a number
        });

        post.addEventListener('mouseenter', function () {
            if (!this.classList.contains('deleting')) {
                this.style.transform = 'translateY(-3px)';
            }
        });

        post.addEventListener('mouseleave', function () {
            if (!this.classList.contains('deleting')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Comments functionality
function addComment() {
    const commentText = document.getElementById('commentText').value.trim();
    const isAnonymous = document.getElementById('anonymousComment').checked;

    if (!commentText) {
        showNotification('Please enter a comment before posting.', 'warning');
        return;
    }

    const commentHtml = `
        <div class="comment-card">
            <div class="comment-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${isAnonymous ? 'Anonymous' : 'Current User'}</span>
                    <span class="comment-time">Just now</span>
                </div>
                <p class="comment-text">${commentText}</p>
                <div class="comment-actions-bar">
                    <button class="comment-action-btn">
                        <i class="fas fa-heart"></i>
                        <span>0</span>
                    </button>
                    <button class="comment-action-btn">
                        <i class="fas fa-reply"></i>
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `;

    const commentsList = document.getElementById('commentsList');
    commentsList.insertAdjacentHTML('afterbegin', commentHtml);

    // Clear form
    document.getElementById('commentText').value = '';
    document.getElementById('anonymousComment').checked = false;

    showNotification('Comment posted successfully!', 'success');
}

// New Post Modal
function initNewPostModal() {
    const newPostForm = document.getElementById('newPostForm');

    if (newPostForm) {
        newPostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitNewPost();
        });
    }
}

function openNewPostModal() {
    const modal = document.getElementById('newPostModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.getElementById('newPostForm').reset();
        updateCharacterCount();
        document.body.style.overflow = 'hidden';
    }
}

function closeNewPostModal() {
    const modal = document.getElementById('newPostModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function submitNewPost() {
    const formData = {
        category: document.getElementById('postCategory').value,
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        anonymous: document.getElementById('postAnonymous').checked,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };

    if (!formData.category || !formData.title.trim() || !formData.content.trim()) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }

    if (formData.title.length > 100 || formData.content.length > 2000) {
        showNotification('Title or content exceeds maximum length.', 'warning');
        return;
    }

    const submitBtn = document.querySelector('#newPostForm .btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        const existingPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
        existingPosts.unshift({
            ...formData,
            author: formData.anonymous ? 'Anonymous' : 'Current User',
            replies: 0
        });
        localStorage.setItem('forumPosts', JSON.stringify(existingPosts));

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        closeNewPostModal();

        showNotification('Your post has been published successfully!', 'success');
        addNewPostToHorizontalScroll(formData);

    }, 2000);
}

function addNewPostToHorizontalScroll(postData) {
    const scrollContainer = document.querySelector('.posts-horizontal-scroll');
    const newPostCard = createHorizontalPostCard({
        ...postData,
        author: postData.anonymous ? 'Anonymous' : 'Current User',
        time: 'Just now',
        replies: 0
    });

    scrollContainer.insertBefore(newPostCard, scrollContainer.firstChild);
    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
}

// Character Count
function initCharacterCount() {
    const postContent = document.getElementById('postContent');

    if (postContent) {
        postContent.addEventListener('input', updateCharacterCount);
    }
}

function updateCharacterCount() {
    const postContent = document.getElementById('postContent');
    const characterCount = document.getElementById('characterCount');

    if (postContent && characterCount) {
        const currentLength = postContent.value.length;
        characterCount.textContent = currentLength;

        if (currentLength > 1800) {
            characterCount.style.color = '#ef4444';
        } else if (currentLength > 1500) {
            characterCount.style.color = '#f59e0b';
        } else {
            characterCount.style.color = 'var(--gray-500)';
        }
    }
}

// Private Chat Functions
function initPrivateChat() {
    const userSearchInput = document.getElementById('userSearchInput');
    if (userSearchInput) {
        userSearchInput.addEventListener('input', function () {
            filterUsers(this.value);
        });
    }

    const chatModeRadios = document.querySelectorAll('input[name="chatMode"]');
    chatModeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            updateChatMode(this.value);
        });
    });
}

function openPrivateChatModal() {
    const modal = document.getElementById('privateChatModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePrivateChatModal() {
    const modal = document.getElementById('privateChatModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function startNewChat() {
    document.getElementById('userSearchInput').focus();
    showNotification('Search for users to start a new conversation', 'info');
}

function filterUsers(searchTerm) {
    const userItems = document.querySelectorAll('.user-item');
    userItems.forEach(item => {
        const userName = item.querySelector('.user-name').textContent.toLowerCase();
        if (userName.includes(searchTerm.toLowerCase()) || searchTerm === '') {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function selectChatUser(userId) {
    selectedChatUser = userId;

    const userItem = document.querySelector(`[onclick="selectChatUser('${userId}')"]`);
    const userName = userItem.querySelector('.user-name').textContent;
    const userStatus = userItem.querySelector('.user-status').textContent;

    document.getElementById('activeChatUser').textContent = userName;
    document.getElementById('activeChatStatus').textContent = userStatus;

    const chatInput = document.getElementById('chatMessageInput');
    const sendBtn = document.querySelector('.send-message-btn');
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.placeholder = `Type a message to ${userName}...`;

    loadChatMessages(userId);

    document.querySelectorAll('.user-item').forEach(item => {
        item.classList.remove('active');
    });
    userItem.classList.add('active');

    showNotification(`Connected to ${userName}`, 'success');
}

function updateChatMode(mode) {
    const statusElement = document.getElementById('activeChatStatus');
    if (mode === 'anonymous') {
        statusElement.textContent = 'Anonymous chat mode - your identity is hidden';
    } else {
        statusElement.textContent = 'Identified chat mode - your profile is visible';
    }
}

function loadChatMessages(userId) {
    const messagesContainer = document.getElementById('chatMessages');

    // Load from localStorage or use defaults
    const key = `chat_${userId}`;
    let messages = [];
    try {
        messages = JSON.parse(localStorage.getItem(key));
    } catch (e) { }

    if (!messages || messages.length === 0) {
        // Defaults if no history
        messages = [
            {
                sender: 'them',
                text: 'Hi there! Thanks for connecting. How are you doing today?',
                time: '2 minutes ago'
            },
            {
                sender: 'me',
                text: 'Hello! I\'m doing okay, thanks for asking. I saw your post about work stress and wanted to reach out.',
                time: '1 minute ago'
            }
        ];
        // Save default initial state
        localStorage.setItem(key, JSON.stringify(messages));
    }

    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageHtml = `
            <div class="chat-message ${message.sender}">
                <div class="message-content">
                    <p>${message.text}</p>
                    <span class="message-time">${message.time}</span>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('chatMessageInput');
    const messageText = messageInput.value.trim();

    if (!messageText) {
        return;
    }

    if (!selectedChatUser) {
        showNotification('Please select a user to chat with first.', 'warning');
        return;
    }

    // Save my message
    const key = `chat_${selectedChatUser}`;
    const myMsg = { sender: 'me', text: messageText, time: 'Just now' };

    // Retrieve existing
    let messages = [];
    try { messages = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { }
    messages.push(myMsg);

    const messagesContainer = document.getElementById('chatMessages');
    const messageHtml = `
        <div class="chat-message me">
            <div class="message-content">
                <p>${messageText}</p>
                <span class="message-time">Just now</span>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHtml);

    messageInput.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const typingHtml = `
            <div class="chat-message them typing">
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            messagesContainer.querySelector('.typing').remove();

            // Generate automated response
            const responses = [
                "That's a great point. Have you tried discussing this with your supervisor?",
                "I understand how you feel. It's important to prioritize your well-being.",
                "Thank you for sharing that. I really appreciate your perspective on this.",
                "Have you considered trying mindfulness exercises? They might help.",
                "I'm here if you need to talk more about this."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const replyMsg = { sender: 'them', text: randomResponse, time: 'Just now' };
            messages.push(replyMsg);
            localStorage.setItem(key, JSON.stringify(messages));

            const responseHtml = `
                <div class="chat-message them">
                    <div class="message-content">
                        <p>${randomResponse}</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', responseHtml);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    }, 1000);

    // Initial save (without reply yet)
    localStorage.setItem(key, JSON.stringify(messages));
}

// Delete Post Functions
function deletePost(postId) {
    deletePostId = postId;
    const modal = document.getElementById('deleteConfirmModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteConfirmModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    deletePostId = null;
}

function confirmDelete() {
    if (deletePostId) {
        const postElement = document.querySelector(`[data-post-id="${deletePostId}"]`);

        if (postElement) {
            postElement.classList.add('deleting');
            postElement.style.transform = 'scale(0.8)';
            postElement.style.opacity = '0.5';

            setTimeout(() => {
                postElement.remove();
                showNotification('Post deleted successfully', 'success');

                const existingPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
                const updatedPosts = existingPosts.filter(post => post.id !== deletePostId);
                localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));

            }, 300);
        }

        closeDeleteModal();
    }
}

// Helper Functions
function createHorizontalPostCard(postData) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card-horizontal';
    postCard.setAttribute('data-post-id', postData.id);

    postCard.innerHTML = `
        <div class="post-header-horizontal">
            <div class="post-category ${postData.category}">${getCategoryName(postData.category)}</div>
            <button class="post-delete-btn" onclick="deletePost(${postData.id})" title="Delete Post">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <h4 class="post-title-horizontal">${postData.title}</h4>
        <p class="post-excerpt-horizontal">${postData.content.substring(0, 100)}...</p>
        <div class="post-meta-horizontal">
            <div class="post-author-horizontal">
                <div class="author-avatar-horizontal">
                    <i class="fas fa-user"></i>
                </div>
                <span class="author-name">${postData.author}</span>
            </div>
            <div class="post-stats-horizontal">
                <span class="post-time">${postData.time}</span>
                <span class="post-replies">
                    <i class="fas fa-reply"></i>
                    ${postData.replies} replies
                </span>
            </div>
        </div>
    `;

    postCard.style.opacity = '0';
    postCard.style.transform = 'translateY(20px)';

    setTimeout(() => {
        postCard.style.opacity = '1';
        postCard.style.transform = 'translateY(0)';
    }, 100);

    postCard.addEventListener('click', function (e) {
        if (!e.target.closest('.post-delete-btn')) {
            showPostDetail(postData.id);
        }
    });

    return postCard;
}

function getCategoryName(category) {
    const categories = {
        'general': 'General Discussion',
        'anxiety': 'Anxiety Support',
        'depression': 'Depression Support',
        'relationships': 'Relationships',
        'wellness': 'Wellness & Self-Care',
        'success': 'Success Stories'
    };

    return categories[category] || 'General Discussion';
}

// Loading States
function showLoadingState() {
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loadingState';
    loadingElement.className = 'loading-overlay';
    loadingElement.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
        </div>
    `;

    document.body.appendChild(loadingElement);
}

function hideLoadingState() {
    const loadingElement = document.getElementById('loadingState');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10002',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '350px',
        wordWrap: 'break-word',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    });

    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': 'var(--primary-color)'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || icons.info;
}

function loadForumData() {
    console.log('Forum data loaded');
    updateForumStats();
}

function updateForumStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const increment = Math.floor(Math.random() * 3);
        if (increment > 0) {
            const newValue = currentValue + increment;
            stat.textContent = newValue.toLocaleString();
        }
    });
}

// Event Listeners - FIXED
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        // Close all modals when clicking overlay
        closeNewPostModal();
        closeDeleteModal();
        closePrivateChatModal();
        closePostDetailModal();
        closeCategoryPostsModal();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeNewPostModal();
        closeDeleteModal();
        closePrivateChatModal();
        closePostDetailModal();
        closeCategoryPostsModal();
    }

    if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'chatMessageInput') {
        e.preventDefault();
        sendMessage();
    }
});

document.addEventListener('input', function (e) {
    if (e.target.id === 'chatMessageInput') {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }
});

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function () {
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
