// User Management:
// * User registration and authentication.
// * User profile management.
// Reservation Management:
// * Search for available trains/flights.
// * Book tickets.
// * Cancel reservations.
// * View booking history.
// Payment Management:
// * Process payments for reservations.
// * Refund management for cancellations.
// Schedule Management:
// * Manage train/flight schedules.
// * View train/flight schedules.
// Notification Management:
// * Notify users of booking confirmations, cancellations, and schedule changes.


// User API:
// * POST /users: Register a new user.
// * POST /auth/login: Authenticate a user.
// * PUT /users/{userId}: Update user profile.
// * GET /users/{userId}: Get user profile.
// Reservation API:
// * GET /reservations/search: Search for available trains/flights.
// * POST /reservations: Book a reservation.
// * DELETE /reservations/{reservationId}: Cancel a reservation.
// * GET /reservations/user/{userId}: Get user's booking history.
// Payment API:
// * POST /payments: Process a payment.
// * POST /payments/refund: Process a refund.
// Schedule API:
// * GET /schedules: Get train/flight schedules.
// * POST /schedules: Add a new schedule.
// * PUT /schedules/{scheduleId}: Update a schedule.
// * DELETE /schedules/{scheduleId}: Delete a schedule.
// Notification API:
// * GET /notifications: Get notifications for the user.
// * POST /notifications: Send a notification.


// +-----------------+           +------------------+          +------------------+
// |     User        |           |  Reservation     |          |     Schedule     |
// +-----------------+           +------------------+          +------------------+
// | - id: string    | <-------- | - id: string     | <--------| - id: string     |
// | - username: string| 1     n | - userId: string | 1     n  | - type: string   |
// | - email: string |           | - scheduleId: string|       | - origin: string |
// | - password: string|         | - status: string |          | - destination: string|
// | - profile: string|          | - paymentId: string |       | - departureTime: Date|
// +-----------------+           +------------------+          +------------------+
//         ^                            ^                             ^
//         |                            |                             |
// +-----------------+           +------------------+          +------------------+
// |  Payment       |           |  Notification     |          |   Train/Flight   |
// +-----------------+           +------------------+          +------------------+
// | - id: string    | <-------- | - id: string     | <--------| - id: string     |
// | - amount: number| 1     n   | - userId: string | 1     n  | - type: string   |
// | - status: string|           | - message: string|          | - name: string   |
// | - reservationId: string|    | - status: string |          | - capacity: number|
// +-----------------+           +------------------+          +------------------+


class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public profile: string
    ) {}
}


class Reservation {
    constructor(
        public id: string,
        public userId: string,
        public scheduleId: string,
        public status: string,
        public paymentId: string
    ) {}
}


class Payment {
    constructor(
        public id: string,
        public amount: number,
        public status: string,
        public reservationId: string
    ) {}
}


class Schedule {
    constructor(
        public id: string,
        public type: string, // "train" or "flight"
        public origin: string,
        public destination: string,
        public departureTime: Date,
        public arrivalTime: Date
    ) {}
}


class Notification {
    constructor(
        public id: string,
        public userId: string,
        public message: string,
        public status: string // "unread" or "read"
    ) {}
}

class TrainFlight {
    constructor(
        public id: string,
        public type: string, // "train" or "flight"
        public name: string,
        public capacity: number
    ) {}
}


class UserAPI {
    private users: Map<string, User> = new Map();

    registerUser(username: string, email: string, password: string, profile: string): User {
        const id = `user_${this.users.size + 1}`;
        const user = new User(id, username, email, password, profile);
        this.users.set(id, user);
        return user;
    }

    authenticateUser(email: string, password: string): User | undefined {
        return Array.from(this.users.values()).find(user => user.email === email && user.password === password);
    }

    updateUser(userId: string, username?: string, email?: string, profile?: string): void {
        const user = this.users.get(userId);
        if (user) {
            if (username) user.username = username;
            if (email) user.email = email;
            if (profile) user.profile = profile;
        } else {
            throw new Error("User not found");
        }
    }

    getUser(userId: string): User | undefined {
        return this.users.get(userId);
    }
}


class ReservationAPI {
    private reservations: Map<string, Reservation> = new Map();

    searchSchedules(type: string, origin: string, destination: string, departureDate: Date): Schedule[] {
        // Implement search logic
        return [];
    }

    bookReservation(userId: string, scheduleId: string, paymentId: string): Reservation {
        const id = `reservation_${this.reservations.size + 1}`;
        const reservation = new Reservation(id, userId, scheduleId, 'confirmed', paymentId);
        this.reservations.set(id, reservation);
        return reservation;
    }

    cancelReservation(reservationId: string): void {
        const reservation = this.reservations.get(reservationId);
        if (reservation) {
            reservation.status = 'cancelled';
        } else {
            throw new Error("Reservation not found");
        }
    }

    getUserReservations(userId: string): Reservation[] {
        return Array.from(this.reservations.values()).filter(reservation => reservation.userId === userId);
    }
}


class PaymentAPI {
    private payments: Map<string, Payment> = new Map();

    processPayment(amount: number, reservationId: string): Payment {
        const id = `payment_${this.payments.size + 1}`;
        const payment = new Payment(id, amount, 'completed', reservationId);
        this.payments.set(id, payment);
        return payment;
    }

    processRefund(paymentId: string): void {
        const payment = this.payments.get(paymentId);
        if (payment) {
            payment.status = 'refunded';
        } else {
            throw new Error("Payment not found");
        }
    }
}


class ScheduleAPI {
    private schedules: Map<string, Schedule> = new Map();

    getSchedules(): Schedule[] {
        return Array.from(this.schedules.values());
    }

    addSchedule(type: string, origin: string, destination: string, departureTime: Date, arrivalTime: Date): Schedule {
        const id = `schedule_${this.schedules.size + 1}`;
        const schedule = new Schedule(id, type, origin, destination, departureTime, arrivalTime);
        this.schedules.set(id, schedule);
        return schedule;
    }

    updateSchedule(scheduleId: string, type?: string, origin?: string, destination?: string, departureTime?: Date, arrivalTime?: Date): void {
        const schedule = this.schedules.get(scheduleId);
        if (schedule) {
            if (type) schedule.type = type;
            if (origin) schedule.origin = origin;
            if (destination) schedule.destination = destination;
            if (departureTime) schedule.departureTime = departureTime;
            if (arrivalTime) schedule.arrivalTime = arrivalTime;
        } else {
            throw new Error("Schedule not found");
        }
    }

    deleteSchedule(scheduleId: string): void {
        if (!this.schedules.delete(scheduleId)) {
            throw new Error("Schedule not found");
        }
    }
}


class NotificationAPI {
    private notifications: Map<string, Notification> = new Map();

    getNotifications(userId: string): Notification[] {
        return Array.from(this.notifications.values()).filter(n => n.userId === userId);
    }

    sendNotification(userId: string, message: string): Notification {
        const id = `notification_${this.notifications.size + 1}`;
        const notification = new Notification(id, userId, message, 'unread');
        this.notifications.set(id, notification);
        return notification;
    }
}
