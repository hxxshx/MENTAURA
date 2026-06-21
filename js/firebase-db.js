// Firebase Database Helper Functions
class FirebaseDB {
    constructor() {
        this.db = null;
        this.auth = null;
        this.init();
    }

    init() {
        // Wait for Firebase to be available
        const checkFirebase = () => {
            if (window.firebaseDB && window.firebaseAuth) {
                this.db = window.firebaseDB;
                this.auth = window.firebaseAuth;
                console.log('Firebase DB Helper initialized');
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    }

    // User Management
    async saveUserProfile(userId, userData) {
        try {
            await this.db.collection('users').doc(userId).set(userData, { merge: true });
            return { success: true };
        } catch (error) {
            console.error('Error saving user profile:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserProfile(userId) {
        try {
            const doc = await this.db.collection('users').doc(userId).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            } else {
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Booking Management
    async saveBooking(bookingData) {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const booking = {
                ...bookingData,
                userId: user.uid,
                userEmail: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'confirmed'
            };

            const docRef = await this.db.collection('bookings').add(booking);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error saving booking:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserBookings(userId) {
        try {
            const snapshot = await this.db.collection('bookings')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();
            
            const bookings = [];
            snapshot.forEach(doc => {
                bookings.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, data: bookings };
        } catch (error) {
            console.error('Error getting user bookings:', error);
            return { success: false, error: error.message };
        }
    }

    async updateBookingStatus(bookingId, status) {
        try {
            await this.db.collection('bookings').doc(bookingId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating booking:', error);
            return { success: false, error: error.message };
        }
    }

    // Forum Management
    async createForumPost(postData) {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const post = {
                ...postData,
                userId: user.uid,
                author: postData.anonymous ? 'Anonymous' : (user.displayName || user.email.split('@')[0]),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                replies: 0,
                views: 0
            };

            const docRef = await this.db.collection('forumPosts').add(post);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error creating forum post:', error);
            return { success: false, error: error.message };
        }
    }

    async getForumPosts(category = null, limit = 10) {
        try {
            let query = this.db.collection('forumPosts');
            
            if (category) {
                query = query.where('category', '==', category);
            }
            
            const snapshot = await query
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            const posts = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                posts.push({ 
                    id: doc.id, 
                    ...data,
                    createdAt: data.createdAt?.toDate().toLocaleDateString() || 'Just now'
                });
            });
            
            return { success: true, data: posts };
        } catch (error) {
            console.error('Error getting forum posts:', error);
            return { success: false, error: error.message };
        }
    }

    async addForumComment(postId, commentData) {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const comment = {
                ...commentData,
                postId: postId,
                userId: user.uid,
                author: commentData.anonymous ? 'Anonymous' : (user.displayName || user.email.split('@')[0]),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0
            };

            await this.db.collection('forumComments').add(comment);
            
            // Update post reply count
            await this.db.collection('forumPosts').doc(postId).update({
                replies: firebase.firestore.FieldValue.increment(1)
            });
            
            return { success: true };
        } catch (error) {
            console.error('Error adding comment:', error);
            return { success: false, error: error.message };
        }
    }

    async getPostComments(postId) {
        try {
            const snapshot = await this.db.collection('forumComments')
                .where('postId', '==', postId)
                .orderBy('createdAt', 'desc')
                .get();
            
            const comments = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                comments.push({ 
                    id: doc.id, 
                    ...data,
                    createdAt: data.createdAt?.toDate().toLocaleDateString() || 'Just now'
                });
            });
            
            return { success: true, data: comments };
        } catch (error) {
            console.error('Error getting comments:', error);
            return { success: false, error: error.message };
        }
    }

    // Chat Management
    async createChatRoom(user1Id, user2Id) {
        try {
            const chatId = [user1Id, user2Id].sort().join('_');
            const chatData = {
                participants: [user1Id, user2Id],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastMessage: null,
                lastMessageTime: null
            };

            await this.db.collection('chats').doc(chatId).set(chatData, { merge: true });
            return { success: true, chatId: chatId };
        } catch (error) {
            console.error('Error creating chat room:', error);
            return { success: false, error: error.message };
        }
    }

    async sendChatMessage(chatId, messageData) {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('User not authenticated');
            }

            const message = {
                ...messageData,
                senderId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.db.collection('chats').doc(chatId).collection('messages').add(message);
            
            // Update chat with last message info
            await this.db.collection('chats').doc(chatId).update({
                lastMessage: messageData.text,
                lastMessageTime: firebase.firestore.FieldValue.serverTimestamp()
            });

            return { success: true };
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize Firebase DB Helper
window.firebaseDBHelper = new FirebaseDB();
