// Functional Requirements:
// 1. User Management:
//     * Register new users.
//     * Authenticate and authorize users.
//     * Update user profile details.
//     * Add/remove contacts.

// 2. Chat Management:
//     * Send and receive messages.
//     * Create group chats.
//     * Add/remove participants from group chats.
//     * Mark messages as read/unread.

// 3. Media Sharing:
//     * Share images, videos, and files in chats.
//     * Download shared media.

// 4. Notification Management:
//     * Notify users of new messages.
//     * Notify users of changes in group chats.

// 5. Status Updates:
//     * Post and view status updates (e.g., text, image, video).

// 6. Search:
//     * Search for users and messages.

// User API:
// POST /users/register: Register a new user.
// POST /users/login: Authenticate a user.
// PUT /users/{userId}: Update user profile.
// POST /users/{userId}/contacts: Add a new contact.
// DELETE /users/{userId}/contacts/{contactId}: Remove a contact.

// Chat API:
// POST /chats: Start a new chat.
// POST /chats/{chatId}/messages: Send a message in a chat.
// GET /chats/{chatId}/messages: Get messages from a chat.
// POST /chats/groups: Create a new group chat.
// POST /chats/groups/{groupId}/participants: Add a participant to a group chat.
// DELETE /chats/groups/{groupId}/participants/{participantId}: Remove a participant from a group chat.

// Media API:
// POST /media/upload: Upload media to a chat.
// GET /media/{mediaId}/download: Download shared media.

// Notification API:
// GET /notifications: Get notifications for the user.
// POST /notifications/read: Mark notifications as read.

// Status API:
// POST /status: Post a new status update.
// GET /status/{userId}: View status updates of a user.





// +-----------------+          +------------------+          +------------------+
// |     User        |          |       Chat       |          |      Message     |
// +-----------------+          +------------------+          +------------------+
// | - id: string    |<-------->| - id: string     |<-------->| - id: string     |
// | - name: string  |1       n | - participants:  |1       n | - senderId: string|
// | - email: string |          |   string[]       |          | - content: string |
// | - password: string|       | - messages: Message[]        | - timestamp: Date |
// | - contacts: string[] |     +------------------+          | - status: string  |
// +-----------------+                                     +------------------+
//        ^                                                |      Media       |
//        |                                                +------------------+
//        |                                                | - id: string     |
//        |                                                | - chatId: string |
//        |                                                | - url: string    |
//        |                                                | - type: string   |
//        +------------------+                             +------------------+
//        |    Notification   |
//        +------------------+
//        | - id: string     |
//        | - userId: string |
//        | - message: string|
//        | - status: string |
//        +------------------+
//               ^
//               |
//               |
//     +------------------+
//     |     Status       |
//     +------------------+
//     | - id: string     |
//     | - userId: string |
//     | - content: string|
//     | - timestamp: Date|
//     +------------------+

class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public contacts: string[] = []
    ) {}
}

class Message {
    constructor(
        public id: string,
        public senderId: string,
        public content: string,
        public timestamp: Date,
        public status: string
    ) {}
}

class Chat {
    constructor(
        public id: string,
        public participants: string[],
        public messages: Message[] = []
    ) {}
}

class Media {
    constructor(
        public id: string,
        public chatId: string,
        public url: string,
        public type: string
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

class Status {
    constructor(
        public id: string,
        public userId: string,
        public content: string,
        public timestamp: Date
    ) {}
}

// User API
class UserAPI {
    private users: Map<string, User> = new Map();

    registerUser(name: string, email: string, password: string): User {
        const id = `user_${this.users.size + 1}`;
        const user = new User(id, name, email, password);
        this.users.set(id, user);
        return user;
    }

    loginUser(email: string, password: string): User | undefined {
        for (const user of this.users.values()) {
            if (user.email === email && user.password === password) {
                return user;
            }
        }
        return undefined;
    }

    updateUser(userId: string, name?: string, email?: string, password?: string): void {
        const user = this.users.get(userId);
        if (user) {
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = password;
        } else {
            throw new Error("User not found");
        }
    }

    addContact(userId: string, contactId: string): void {
        const user = this.users.get(userId);
        if (user && this.users.has(contactId)) {
            user.contacts.push(contactId);
        } else {
            throw new Error("User or contact not found");
        }
    }

    removeContact(userId: string, contactId: string): void {
        const user = this.users.get(userId);
        if (user) {
            user.contacts = user.contacts.filter(id => id !== contactId);
        } else {
            throw new Error("User not found");
        }
    }
}

// Chat API
class ChatAPI {
    private chats: Map<string, Chat> = new Map();

    startChat(participants: string[]): Chat {
        const id = `chat_${this.chats.size + 1}`;
        const chat = new Chat(id, participants, []);
        this.chats.set(id, chat);
        return chat;
    }

    sendMessage(chatId: string, senderId: string, content: string): Message {
        const chat = this.chats.get(chatId);
        if (chat) {
            const id = `message_${chat.messages.length + 1}`;
            const message = new Message(id, senderId, content, new Date(), "sent");
            chat.messages.push(message);
            return message;
        } else {
            throw new Error("Chat not found");
        }
    }

    getMessages(chatId: string): Message[] {
        const chat = this.chats.get(chatId);
        if (chat) {
            return chat.messages;
        } else {
            throw new Error("Chat not found");
        }
    }

    createGroup(participants: string[]): Chat {
        return this.startChat(participants);
    }

    addParticipant(chatId: string, participantId: string): void {
        const chat = this.chats.get(chatId);
        if (chat && !chat.participants.includes(participantId)) {
            chat.participants.push(participantId);
        } else {
            throw new Error("Chat or participant not found");
        }
    }

    removeParticipant(chatId: string, participantId: string): void {
        const chat = this.chats.get(chatId);
        if (chat) {
            chat.participants = chat.participants.filter(id => id !== participantId);
        } else {
            throw new Error("Chat not found");
        }
    }
}

// Media API
class MediaAPI {
    private mediaStore: Map<string, Media> = new Map();

    uploadMedia(chatId: string, url: string, type: string): Media {
        const id = `media_${this.mediaStore.size + 1}`;
        const media = new Media(id, chatId, url, type);
        this.mediaStore.set(id, media);
        return media;
    }

    downloadMedia(mediaId: string): Media | undefined {
        return this.mediaStore.get(mediaId);
    }
}

// Notification API
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

// Status API
class StatusAPI {
    private statuses: Map<string, Status> = new Map();

    postStatus(userId: string, content: string): Status {
        const id = `status_${this.statuses.size + 1}`;
        const status = new Status(id, userId, content, new Date());
        this.statuses.set(id, status);
        return status;
    }

    getStatus(userId: string): Status[] {
        return Array.from(this.statuses.values()).filter(s => s.userId === userId);
    }
}
