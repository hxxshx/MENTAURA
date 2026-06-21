// Firebase Authentication System - Compat SDK Version

class AuthenticationSystem {
    constructor() {
        this.auth = null;
        this.db = null;
        this.currentUser = null;
        this.initFirebase();
    }

    async initFirebase() {
        // Wait for Firebase to be available
        while (!window.firebaseAuth || !window.firebaseDB) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this.auth = window.firebaseAuth;
        this.db = window.firebaseDB;

        // Setup auth state listener
        this.auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUIBasedOnAuthState(user);
            console.log('Auth state changed:', user ? 'Logged in' : 'Logged out');
        });

        // Initialize DOM elements after a short delay to ensure DOM is ready
        setTimeout(() => this.initializeElements(), 100);
    }

    initializeElements() {
        console.log('Initializing DOM elements...');

        // Modal elements
        this.loginModal = document.getElementById('loginModal');
        this.signupModal = document.getElementById('signupModal');

        // Button elements
        this.loginBtns = document.querySelectorAll('#loginBtn, .login-btn-nav');
        this.signupBtns = document.querySelectorAll('#signupBtn, .signup-btn-nav');
        this.requireLoginBtns = document.querySelectorAll('#bookSessionNav, #aiChatNav, #resourcesNav, #communityNav, #adminNav, #analyticsNav, #bookSessionHero, #aiChatHero, #aiChatService, #bookSessionCTA, #aiChatCTA, #counselingServiceBtn, #communityServiceBtn, #resourcesServiceBtn, #adminServiceBtn');

        // Nav elements
        this.navItems = {
            home: document.getElementById('homeNav'),
            services: document.getElementById('servicesNav'),
            aiChat: document.getElementById('aiChatNav'),
            bookSession: document.getElementById('bookSessionNav'),
            resources: document.getElementById('resourcesNav'),
            community: document.getElementById('communityNav'),
            admin: document.getElementById('adminNav'),
            analytics: document.getElementById('analyticsNav')
        };
        this.navMenu = document.getElementById('navMenu');

        // Hero section buttons (for role-based content switching)
        this.heroButtons = {
            bookSession: document.getElementById('bookSessionHero'),
            aiChat: document.getElementById('aiChatHero')
        };

        // Safety timeout: Force navbar visibility if auth takes too long
        setTimeout(() => {
            if (this.navMenu && !this.navMenu.classList.contains('auth-ready')) {
                console.warn('Auth ready timeout - forcing navbar visibility');
                this.navMenu.classList.add('auth-ready');
            }
        }, 1500);

        // Close buttons
        this.loginCloseBtn = document.getElementById('loginCloseBtn');
        this.signupCloseBtn = document.getElementById('signupCloseBtn');

        // Switch buttons
        this.switchToSignup = document.getElementById('switchToSignup');
        this.switchToLogin = document.getElementById('switchToLogin');

        // Forms
        this.loginForm = document.getElementById('loginForm');
        this.signupForm = document.getElementById('signupForm');

        console.log('Found elements:', {
            loginModal: !!this.loginModal,
            signupModal: !!this.signupModal,
            loginForm: !!this.loginForm,
            signupForm: !!this.signupForm,
            loginBtns: this.loginBtns ? this.loginBtns.length : 0,
            signupBtns: this.signupBtns ? this.signupBtns.length : 0
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Login buttons
        this.loginBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login button clicked');
                this.showLoginModal();
            });
        });

        // Signup buttons
        this.signupBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Signup button clicked');
                this.showSignupModal();
            });
        });

        // Buttons requiring login
        this.requireLoginBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // If it's a link in the nav (like bookSessionNav), we want to prevent default only if NOT logged in
                // OR if we want to handle routing manually.

                if (!this.currentUser) {
                    e.preventDefault();
                    this.showLoginModal();
                }
                // If logged in, let the default href work, unless we need specific logic
                // The original code had logic here, let's preserve it but adapt
                else {
                    if (btn.id.includes('bookSession')) {
                        // Let default happen if href is set, or redirect
                        if (btn.getAttribute('href') === '#') window.location.href = 'booking.html';
                    } else if (btn.id.includes('aiChat')) {
                        if (btn.getAttribute('href') === '#') window.location.href = 'chatbot.html';
                    }
                }
            });
        });

        // Close buttons
        this.loginCloseBtn?.addEventListener('click', () => this.hideAllModals());
        this.signupCloseBtn?.addEventListener('click', () => this.hideAllModals());

        // Switch buttons
        this.switchToSignup?.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switch to signup clicked');
            this.hideAllModals();
            setTimeout(() => this.showSignupModal(), 150);
        });

        this.switchToLogin?.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Switch to login clicked');
            this.hideAllModals();
            setTimeout(() => this.showLoginModal(), 150);
        });

        // Form submissions - CRITICAL FIX
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                console.log('Login form submitted');
                this.handleLogin(e);
            });
        }

        if (this.signupForm) {
            this.signupForm.addEventListener('submit', (e) => {
                console.log('Signup form submitted');
                this.handleSignup(e);
            });
        }

        // Modal outside click
        this.loginModal?.addEventListener('click', (e) => {
            if (e.target === this.loginModal) this.hideAllModals();
        });

        this.signupModal?.addEventListener('click', (e) => {
            if (e.target === this.signupModal) this.hideAllModals();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideAllModals();
        });

        console.log('Event listeners setup complete');
    }

    // Modal Management
    showLoginModal() {
        console.log('Showing login modal');
        this.loginModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    showSignupModal() {
        console.log('Showing signup modal');
        this.signupModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideAllModals() {
        console.log('Hiding all modals');
        this.loginModal?.classList.add('hidden');
        this.signupModal?.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.clearForms();
    }

    clearForms() {
        this.loginForm?.reset();
        this.signupForm?.reset();
        this.clearErrors();
    }

    // Error Management
    showError(elementId, message) {
        console.log('Showing error:', elementId, message);
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        } else {
            alert('Error: ' + message);
        }
    }

    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.add('hidden');
        });
    }

    // Firebase Authentication Methods
    async handleSignup(e) {
        e.preventDefault();
        console.log('handleSignup called');
        this.clearErrors();

        // Get form values
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const category = document.getElementById('signupCategory').value; // Get category

        console.log('Form values:', { name, email, category, password: '***', confirmPassword: '***' });

        // Validation
        if (!this.validateSignupForm(name, email, password, confirmPassword, category)) {
            return;
        }

        try {
            this.showLoadingState('signup');
            console.log('Creating user with email and password...');

            // Create user account
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User created successfully:', user.uid);

            // Update user profile with display name
            await user.updateProfile({
                displayName: name
            });
            console.log('User profile updated');

            // Save user data to Firestore including ROLE
            await this.saveUserToFirestore(user, name, email, category);

            // FIX: Explicitly update navigation with the selected category to prevent
            // race condition where existing listener finds no role in DB yet and defaults to 'user'
            console.log('Force updating navigation for new signup role:', category);

            // Cache role immediately
            localStorage.setItem('user_role', category);

            this.updateNavigation(true, category);
            if (category === 'counselor' || category === 'counsellor') {
                // Ensure protected features are handled for counselor too
                // (Though updateNavigation usually handles visibility)
            }

            this.showSuccess('Account created successfully! Welcome to Mentaura!');
            this.hideAllModals();

        } catch (error) {
            console.error('Signup error:', error);
            this.showError('signupError', this.getFirebaseErrorMessage(error));
        } finally {
            this.hideLoadingState('signup');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        console.log('handleLogin called');
        this.clearErrors();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        console.log('Login attempt for email:', email);

        // Validation
        if (!this.validateLoginForm(email, password)) {
            return;
        }

        try {
            this.showLoadingState('login');

            // Sign in user
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User signed in successfully:', user.uid);

            this.showSuccess(`Welcome back, ${user.displayName || 'User'}!`);
            this.hideAllModals();

        } catch (error) {
            console.error('Login error:', error);
            this.showError('loginError', this.getFirebaseErrorMessage(error));
        } finally {
            this.hideLoadingState('login');
        }
    }

    // Firestore Operations
    async saveUserToFirestore(user, name, email, role) {
        try {
            console.log('Saving user to Firestore...');
            const userRef = this.db.collection('users').doc(user.uid);
            const userDoc = await userRef.get();

            // Only create profile if it doesn't exist
            if (!userDoc.exists) {
                await userRef.set({
                    uid: user.uid,
                    name: name,
                    email: email,
                    role: role, // Save the role (user/counselor)
                    displayName: user.displayName || name,
                    photoURL: user.photoURL || null,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    isActive: true,
                    preferences: {
                        notifications: true,
                        language: 'en'
                    }
                });
                console.log('User profile created in Firestore with role:', role);
            } else {
                // Update last login time
                await userRef.update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('User last login updated');
            }
        } catch (error) {
            console.error('Error saving user to Firestore:', error);
            // Even if firestore fails, we proceed (user is created in auth)
        }
    }

    // Validation Methods
    validateSignupForm(name, email, password, confirmPassword, category) {
        if (!name || name.trim().length < 2) {
            this.showError('signupError', 'Name must be at least 2 characters long.');
            return false;
        }

        if (!category) {
            this.showError('signupError', 'Please select a user category.');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showError('signupError', 'Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            this.showError('signupError', 'Password must be at least 6 characters long.');
            return false;
        }

        if (password !== confirmPassword) {
            this.showError('signupError', 'Passwords do not match.');
            return false;
        }

        return true;
    }

    validateLoginForm(email, password) {
        if (!this.isValidEmail(email)) {
            this.showError('loginError', 'Please enter a valid email address.');
            return false;
        }

        if (!password) {
            this.showError('loginError', 'Please enter your password.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // UI State Management
    async updateUIBasedOnAuthState(user) {
        if (user) {
            // User is logged in
            // STRATEGY: Check LocalStorage first for instant UI, then fetch from Firestore to confirm/update

            let cachedRole = localStorage.getItem('user_role');
            if (cachedRole) {
                console.log('Role found in cache:', cachedRole);
                this.updateNavigation(true, cachedRole);
            }

            try {
                const userDoc = await this.db.collection('users').doc(user.uid).get();
                let role = 'user'; // Default
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    role = userData.role || 'user';
                }
                console.log('User role detected from Firestore:', role);

                // Update cache if different
                if (role !== cachedRole) {
                    localStorage.setItem('user_role', role);
                    this.updateNavigation(true, role); // Update UI with authoritative source
                } else if (!cachedRole) {
                    // If no cache but firestore successful
                    this.updateNavigation(true, role);
                    localStorage.setItem('user_role', role);
                }

                this.updateAuthButtons(true, user);
                this.enableProtectedFeatures();

            } catch (error) {
                console.error('Error fetching user role:', error);

                // If firestore fails, rely on cache if available, else default to 'user'
                if (cachedRole) {
                    this.updateNavigation(true, cachedRole);
                } else {
                    this.updateNavigation(true, 'user');
                }
                this.updateAuthButtons(true, user);
                this.enableProtectedFeatures();
            }
        } else {
            // Not logged in
            localStorage.removeItem('user_role'); // Clear role cache on logout state
            this.updateAuthButtons(false);
            this.updateNavigation(false);
            this.disableProtectedFeatures();
        }
        this.navMenu?.classList.add('auth-ready');
    }

    updateNavigation(isLoggedIn, role = null) {
        if (!this.navItems) return;

        const { home, services, aiChat, bookSession, resources, community, admin, analytics } = this.navItems;

        // Helper to show/hide
        const toggle = (el, show) => {
            if (el) el.parentElement.style.display = show ? 'block' : 'none';
        };

        if (!isLoggedIn) {
            // Guest State
            // Visible: Home, Services, Resources, Community (Public) + AI Chat, Book Session (Protected - trigger modal)
            // Hidden: Admin, Analytics

            toggle(home, true);
            toggle(services, true);
            toggle(resources, true);
            toggle(community, true); // Accessible without login

            toggle(aiChat, true);      // Visible, but triggers login (via event listener)
            toggle(bookSession, true); // Visible, but triggers login (via event listener)

            toggle(admin, true);       // Visible, triggers login
            toggle(analytics, true);   // Visible, triggers login

        } else {
            // Logged In State
            if (role === 'counselor' || role === 'counsellor') {
                // Counsellor State
                // Visible: Admin, Analytics, Community, Home
                // Hidden: Services, AI Chat, Book Session, Resources (Client features)

                toggle(home, true);
                toggle(services, false);
                toggle(aiChat, false);
                toggle(bookSession, false);
                toggle(resources, false); // Counsellors provide resources, don't necessarily consume them here? Or maybe keep true? 
                // User said: "If logged in as counsellor admin dashboard analytics and community alone"
                // So I will hide resources.

                toggle(community, true);
                toggle(admin, true);
                toggle(analytics, true);

                // Update hero section buttons for counsellor
                this.updateHeroButtons('counsellor');

            } else {
                // User (Client) State
                // Visible: Home, AI Chat, Book Session, Resources, Community
                // Hidden: Admin, Analytics

                toggle(home, true);
                toggle(services, false); // Simplified view for logged in user
                toggle(aiChat, true);
                toggle(bookSession, true);
                toggle(resources, true);
                toggle(community, true);

                toggle(admin, false);
                toggle(analytics, false);

                // Restore default hero buttons for regular users
                this.updateHeroButtons('user');
            }
        }

        // Also update for guest state
        if (!isLoggedIn) {
            this.updateHeroButtons('guest');
        }
    }

    updateHeroButtons(role) {
        if (!this.heroButtons || !this.heroButtons.bookSession || !this.heroButtons.aiChat) return;

        const { bookSession, aiChat } = this.heroButtons;

        if (role === 'counselor' || role === 'counsellor') {
            // Change buttons for counsellor
            bookSession.textContent = 'Admin Dashboard';
            bookSession.href = 'admin.html';

            aiChat.textContent = 'View Analytics';
            aiChat.href = 'analytics.html';
        } else {
            // Default buttons for users and guests
            bookSession.textContent = 'Book a Session';
            bookSession.href = '#';

            aiChat.textContent = 'Try AI Chat';
            aiChat.href = '#';
        }
    }

    updateAuthButtons(isLoggedIn, user = null) {
        this.loginBtns?.forEach(btn => {
            if (isLoggedIn) {
                btn.textContent = 'Logout';
                btn.onclick = (e) => {
                    e.preventDefault();
                    this.logout();
                };
            } else {
                btn.textContent = 'Login'; // Changed from Sign In to match request style
                btn.onclick = (e) => {
                    e.preventDefault();
                    this.showLoginModal();
                };
            }
        });

        // Hide signup button if logged in
        this.signupBtns?.forEach(btn => {
            if (isLoggedIn) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'inline-block'; // or block/flex
            }
        });

        // Update user display areas
        const userDisplays = document.querySelectorAll('.user-display');
        userDisplays.forEach(display => {
            if (isLoggedIn && user) {
                display.textContent = `Hello, ${user.displayName || user.email.split('@')[0]}`;
                display.classList.remove('hidden');
            } else {
                display.classList.add('hidden');
            }
        });
    }

    enableProtectedFeatures() {
        const protectedElements = document.querySelectorAll('.protected-feature');
        protectedElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.opacity = '1';
        });
    }

    disableProtectedFeatures() {
        const protectedElements = document.querySelectorAll('.protected-feature');
        protectedElements.forEach(element => {
            // Instead of disabling, we might want them to trigger login (handled by event listeners on specific IDs)
            // But for generic class:
            element.style.pointerEvents = 'none';
            element.style.opacity = '0.5';
        });
    }

    // Loading States
    showLoadingState(type) {
        const button = document.querySelector(`#${type}Form button[type="submit"]`);
        if (button) {
            button.disabled = true;
            button.textContent = 'Processing...';
        }
    }

    hideLoadingState(type) {
        const button = document.querySelector(`#${type}Form button[type="submit"]`);
        if (button) {
            button.disabled = false;
            if (type === 'login') {
                button.textContent = 'Sign In';
            } else if (type === 'signup') {
                button.textContent = 'Sign Up';
            }
        }
    }

    // Utility Methods
    getFirebaseErrorMessage(error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/too-many-requests':
                return 'Too many failed login attempts. Please try again later.';
            default:
                return error.message || 'An error occurred. Please try again.';
        }
    }

    showSuccess(message) {
        alert(message);
    }

    async logout() {
        try {
            await this.auth.signOut();
            this.showSuccess('Logged out successfully!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            this.showError('generalError', 'Error logging out. Please try again.');
        }
    }

    // Public Methods for other scripts
    getCurrentUser() {
        return this.currentUser;
    }

    isUserLoggedIn() {
        return !!this.currentUser;
    }

    async requireAuth() {
        if (!this.currentUser) {
            this.showLoginModal();
            return false;
        }
        return true;
    }
}

// Initialize Authentication System when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Auth System');
    window.authSystem = new AuthenticationSystem();
});

// Make auth system globally available
window.AuthenticationSystem = AuthenticationSystem;
