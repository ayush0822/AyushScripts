
// 1. User Management:
//     * User registration and authentication.
//     * User profile management.
//     * Follow/unfollow other users.

// 2. Content Management:
//     * Create, update, delete posts (text, images, videos).
//     * Like, comment on posts.
//     * Share posts.

// 3. Feed Management:
//     * Generate and display user feeds.
//     * Display posts from followed users.

// 4. Notification Management:
//     * Notify users of likes, comments, and new followers.
//     * Notify users of post shares.

// 5. Messaging:
//     * Direct messaging between users.
//     * Group chats.

// 6. Search:
//     * Search for users.
//     * Search for posts by tags or keywords.

// Non-Functional Requirements:
// 1. Scalability: Handle a large number of users and posts.
// 2. Performance: Quick response times for user interactions.
// 3. Security: Secure user data and ensure privacy.
// 4. Reliability: Ensure data consistency and high availability.
// Key APIs
// 1. User API:
//     * POST /users: Register a new user.
//     * POST /auth/login: Authenticate a user.
//     * PUT /users/{userId}: Update user profile.
//     * GET /users/{userId}: Get user profile.
// 2. Post API:
//     * POST /posts: Create a new post.
//     * PUT /posts/{postId}: Update an existing post.
//     * DELETE /posts/{postId}: Delete a post.
//     * GET /posts/{postId}: Get post details.
// 3. Feed API:
//     * GET /feed: Get the user's feed.
// 4. Notification API:
//     * GET /notifications: Get notifications for the user.
//     * POST /notifications/read: Mark notifications as read.
// 5. Messaging API:
//     * POST /messages: Send a message.
//     * GET /messages/{conversationId}: Get messages in a conversation.




// +-----------------+           +------------------+          +------------------+
// |     User        |           |      Post        |          |    Notification  |
// +-----------------+           +------------------+          +------------------+
// | - id: string    | <-------- | - id: string     | <--------| - id: string     |
// | - username: string| 1     n | - content: string| 1     n  | - userId: string |
// | - email: string |           | - createdAt: Date|          | - message: string|
// | - profilePic: string|       | - userId: string |          | - status: string |
// | - followers: User[] |       +------------------+          +------------------+
// | - following: User[] |               ^                             ^
// +-----------------+                   |                             |
//         ^                            n |                             | 1
//         |                              |                             |
// +-----------------+           +------------------+          +------------------+
// |  Message       |           |    Comment        |          |      Feed        |
// +-----------------+           +------------------+          +------------------+
// | - id: string    | <-------- | - id: string     | <--------| - id: string     |
// | - content: string| 1     n  | - content: string| 1     n  | - userId: string |
// | - senderId: string|        | - postId: string  |          | - postIds: string[] |
// | - receiverId: string|      | - userId: string  |          +------------------+
// | - createdAt: Date|         | - createdAt: Date |                  
// +-----------------+           +------------------+


class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public profilePic: string,
        public followers: User[] = [],
        public following: User[] = []
    ) {}
}


class Post {
    constructor(
        public id: string,
        public content: string,
        public createdAt: Date,
        public userId: string,
        public comments: Comment[] = [],
        public likes: number = 0
    ) {}
}


class Comment {
    constructor(
        public id: string,
        public content: string,
        public postId: string,
        public userId: string,
        public createdAt: Date
    ) {}
}


class Notification {
    constructor(
        public id: string,
        public userId: string,
        public message: string,
        public status: string
    ) {}
}


class Message {
    constructor(
        public id: string,
        public content: string,
        public senderId: string,
        public receiverId: string,
        public createdAt: Date
    ) {}
}


class Feed {
    constructor(
        public id: string,
        public userId: string,
        public postIds: string[] = []
    ) {}
}


class UserAPI {
    private users: Map<string, User> = new Map();

    registerUser(username: string, email: string, profilePic: string): User {
        const id = `user_${this.users.size + 1}`;
        const user = new User(id, username, email, profilePic);
        this.users.set(id, user);
        return user;
    }

    authenticateUser(email: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.email === email);
    }

    updateUser(userId: string, username?: string, email?: string, profilePic?: string): void {
        const user = this.users.get(userId);
        if (user) {
            if (username) user.username = username;
            if (email) user.email = email;
            if (profilePic) user.profilePic = profilePic;
        } else {
            throw new Error("User not found");
        }
    }

    getUser(userId: string): User | undefined {
        return this.users.get(userId);
    }
}


class PostAPI {
    private posts: Map<string, Post> = new Map();

    createPost(content: string, userId: string): Post {
        const id = `post_${this.posts.size + 1}`;
        const post = new Post(id, content, new Date(), userId);
        this.posts.set(id, post);
        return post;
    }

    updatePost(postId: string, content: string): void {
        const post = this.posts.get(postId);
        if (post) {
            post.content = content;
        } else {
            throw new Error("Post not found");
        }
    }

    deletePost(postId: string): void {
        if (!this.posts.delete(postId)) {
            throw new Error("Post not found");
        }
    }

    getPost(postId: string): Post | undefined {
        return this.posts.get(postId);
    }
}


class FeedAPI {
    private feeds: Map<string, Feed> = new Map();

    getUserFeed(userId: string): Feed | undefined {
        return this.feeds.get(userId);
    }

    addPostToFeed(userId: string, postId: string): void {
        let feed = this.feeds.get(userId);
        if (!feed) {
            feed = new Feed(`feed_${this.feeds.size + 1}`, userId);
            this.feeds.set(userId, feed);
        }
        feed.postIds.push(postId);
    }
}


class NotificationAPI {
    private notifications: Map<string, Notification> = new Map();

    getNotifications(userId: string): Notification[] {
        return Array.from(this.notifications.values()).filter(n => n.userId === userId);
    }

    markNotificationAsRead(notificationId: string): void {
        const notification = this.notifications.get(notificationId);
        if (notification) {
            notification.status = 'read';
        } else {
            throw new Error("Notification not found");
        }
    }
}


class MessageAPI {
    private messages: Map<string, Message> = new Map();

    sendMessage(content: string, senderId: string, receiverId: string): Message {
        const id = `message_${this.messages.size + 1}`;
        const message = new Message(id, content, senderId, receiverId, new Date());
        this.messages.set(id, message);
        return message;
    }

    getMessages(conversationId: string): Message[] {
        return Array.from(this.messages.values()).filter(
            message => (message.senderId === conversationId || message.receiverId === conversationId)
        );
    }
}
