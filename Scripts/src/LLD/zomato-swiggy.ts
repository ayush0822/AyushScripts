// User Management:
// * Register new users (customers and restaurant owners).
// * Authenticate and authorize users.
// * Update user profile details.

// Restaurant Management:
// * Add and manage restaurant details.
// * Add, update, and delete menu items.
// * Track restaurant orders.

// Order Management:
// * Place an order.
// * Update order status (e.g., placed, confirmed, prepared, delivered, canceled).
// * Track order history.

// Delivery Management:
// * Assign delivery personnel to orders.
// * Track delivery status and location.
// * Update delivery status.

// Payment Management:
// * Process payments for orders.
// * Handle different payment methods (e.g., credit card, PayPal).


// Review and Rating:
// * Allow customers to rate and review restaurants.
// * View reviews and ratings.




// User API:

// POST /users/register: Register a new user.
// POST /users/login: Authenticate a user.
// PUT /users/{userId}: Update user profile.
// Restaurant API:

// POST /restaurants: Add a new restaurant.
// PUT /restaurants/{restaurantId}: Update restaurant details.
// DELETE /restaurants/{restaurantId}: Delete a restaurant.
// POST /restaurants/{restaurantId}/menu: Add a new menu item.
// PUT /restaurants/{restaurantId}/menu/{menuItemId}: Update a menu item.
// DELETE /restaurants/{restaurantId}/menu/{menuItemId}: Delete a menu item.
// Order API:

// POST /orders: Place a new order.
// PUT /orders/{orderId}: Update an existing order.
// GET /orders/{orderId}: Get details of a specific order.
// GET /orders: Get a list of all orders.
// Delivery API:

// POST /deliveries: Assign delivery personnel to an order.
// PUT /deliveries/{deliveryId}: Update delivery status.
// GET /deliveries/{deliveryId}: Get details of a specific delivery.
// GET /deliveries: Get a list of all deliveries.
// Payment API:

// POST /payments: Process a new payment.
// GET /payments/{paymentId}: Get details of a specific payment.
// GET /payments: Get a list of all payments.
// Review API:

// POST /reviews: Add a new review.
// GET /reviews/{reviewId}: Get details of a specific review.
// GET /reviews: Get a list of all reviews.




// +------------------+
// |      User        |
// +------------------+
// | - id: string     |
// | - name: string   |
// | - email: string  |
// | - password: string|
// | - type: string   | (customer/restaurant owner)
// +------------------+
//           |
//           |
//           |
// +------------------+
// |   Restaurant     |
// +------------------+
// | - id: string     |
// | - ownerId: string|
// | - name: string   |
// | - address: string|
// +------------------+
//           |
//           |
//           |
// +------------------+
// |      Menu        |
// +------------------+
// | - id: string     |
// | - restaurantId: string |
// | - name: string   |
// | - description: string |
// | - price: number  |
// +------------------+
//           |
//           |
//           |
// +------------------+
// |      Order       |
// +------------------+
// | - id: string     |
// | - customerId: string|
// | - restaurantId: string|
// | - status: string |
// | - items: Map<Menu, number> |
// +------------------+
//           |
//           |
//           |
// +------------------+
// |    Delivery      |
// +------------------+
// | - id: string     |
// | - orderId: string|
// | - deliveryPersonId: string |
// | - status: string |
// | - location: string |
// +------------------+
//           |
//           |
//           |
// +------------------+
// |    Payment       |
// +------------------+
// | - id: string     |
// | - orderId: string|
// | - amount: number |
// | - method: string |
// +------------------+
//           |
//           |
//           |
// +------------------+
// |    Review        |
// +------------------+
// | - id: string     |
// | - orderId: string|
// | - userId: string |
// | - rating: number |
// | - comment: string|
// +------------------+


// User Class
class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public type: string // "customer" or "restaurantOwner"
    ) {}
}

// Restaurant Class
class Restaurant {
    constructor(
        public id: string,
        public ownerId: string,
        public name: string,
        public address: string
    ) {}
}

// Menu Class
class Menu {
    constructor(
        public id: string,
        public restaurantId: string,
        public name: string,
        public description: string,
        public price: number
    ) {}
}

// Order Class
class Order {
    constructor(
        public id: string,
        public customerId: string,
        public restaurantId: string,
        public status: string, // "placed", "confirmed", "prepared", "delivered", "canceled"
        public items: Map<Menu, number> // menu item and quantity
    ) {}
}

// Delivery Class
class Delivery {
    constructor(
        public id: string,
        public orderId: string,
        public deliveryPersonId: string,
        public status: string, // "assigned", "picked up", "in transit", "delivered"
        public location: string
    ) {}
}

// Payment Class
class Payment {
    constructor(
        public id: string,
        public orderId: string,
        public amount: number,
        public method: string // e.g., "credit card", "PayPal"
    ) {}
}

// Review Class
class Review {
    constructor(
        public id: string,
        public orderId: string,
        public userId: string,
        public rating: number,
        public comment: string
    ) {}
}

// User API class
class UserAPI {
    private users: Map<string, User> = new Map();

    registerUser(name: string, email: string, password: string, type: string): User {
        const id = `user_${this.users.size + 1}`;
        const user = new User(id, name, email, password, type);
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

    updateUser(id: string, name: string, email: string, password: string): void {
        const user = this.users.get(id);
        if (user) {
            user.name = name;
            user.email = email;
            user.password = password;
        } else {
            throw new Error("User not found");
        }
    }
}

// Restaurant API class
class RestaurantAPI {
    private restaurants: Map<string, Restaurant> = new Map();

    addRestaurant(ownerId: string, name: string, address: string): Restaurant {
        const id = `restaurant_${this.restaurants.size + 1}`;
        const restaurant = new Restaurant(id, ownerId, name, address);
        this.restaurants.set(id, restaurant);
        return restaurant;
    }

    updateRestaurant(id: string, name: string, address: string): void {
        const restaurant = this.restaurants.get(id);
        if (restaurant) {
            restaurant.name = name;
            restaurant.address = address;
        } else {
            throw new Error("Restaurant not found");
        }
    }

    deleteRestaurant(id: string): void {
        this.restaurants.delete(id);
    }
}

// Menu API class
class MenuAPI {
    private menus: Map<string, Menu> = new Map();

    addMenuItem(restaurantId: string, name: string, description: string, price: number): Menu {
        const id = `menu_${this.menus.size + 1}`;
        const menu = new Menu(id, restaurantId, name, description, price);
        this.menus.set(id, menu);
        return menu;
    }

    updateMenuItem(id: string, name: string, description: string, price: number): void {
        const menu = this.menus.get(id);
        if (menu) {
            menu.name = name;
            menu.description = description;
            menu.price = price;
        } else {
            throw new Error("Menu item not found");
        }
    }

    deleteMenuItem(id: string): void {
        this.menus.delete(id);
    }
}

// Order API class
class OrderAPI {
    private orders: Map<string, Order> = new Map();

    placeOrder(customerId: string, restaurantId: string, items: Map<Menu, number>): Order {
        const id = `order_${this.orders.size + 1}`;
        const order = new Order(id, customerId, restaurantId, "placed", items);
        this.orders.set(id, order);
        return order;
    }

    updateOrderStatus(orderId: string, status: string): void {
        const order = this.orders.get(orderId);
        if (order) {
            order.status = status;
        } else {
            throw new Error("Order not found");
        }
    }

    getOrder(orderId: string): Order | undefined {
        return this.orders.get(orderId);
    }

    listOrders(): Order[] {
        return Array.from(this.orders.values());
    }
}

// Delivery API class
class DeliveryAPI {
    private deliveries: Map<string, Delivery> = new Map();

    assignDelivery(orderId: string, deliveryPersonId: string): Delivery {
        const id = `delivery_${this.deliveries.size + 1}`;
        const delivery = new Delivery(id, orderId, deliveryPersonId, "assigned", "");
        this.deliveries.set(id, delivery);
        return delivery;
    }

    updateDeliveryStatus(deliveryId: string, status: string, location: string): void {
        const delivery = this.deliveries.get(deliveryId);
        if (delivery) {
            delivery.status = status;
            delivery.location = location;
        } else {
            throw new Error("Delivery not found");
        }
    }

    getDelivery(deliveryId: string): Delivery | undefined {
        return this.deliveries.get(deliveryId);
    }

    listDeliveries(): Delivery[] {
        return Array.from(this.deliveries.values());
    }
}

// Payment API class
class PaymentAPI {
    private payments: Map<string, Payment> = new Map();

    processPayment(orderId: string, amount: number, method: string): Payment {
        const id = `payment_${this.payments.size + 1}`;
        const payment = new Payment(id, orderId, amount, method);
        this.payments.set(id, payment);
        return payment;
    }

    getPayment(paymentId: string): Payment | undefined {
        return this.payments.get(paymentId);
    }

    listPayments(): Payment[] {
        return Array.from(this.payments.values());
    }
}

// Review API class
class ReviewAPI {
    private reviews: Map<string, Review> = new Map();

    addReview(orderId: string, userId: string, rating: number, comment: string): Review {
        const id = `review_${this.reviews.size + 1}`;
        const review = new Review(id, orderId, userId, rating, comment);
        this.reviews.set(id, review);
        return review;
    }

    getReview(reviewId: string): Review | undefined {
        return this.reviews.get(reviewId);
    }

    listReviews(): Review[] {
        return Array.from(this.reviews.values());
    }
}


