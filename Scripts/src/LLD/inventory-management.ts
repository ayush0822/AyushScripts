// 1. Item Management:
//     * Add new items to the inventory.
//     * Update existing items (e.g., price, quantity, location).
//     * Delete items from the inventory.
// 2. Inventory Tracking:
//     * Track the quantity of each item.
//     * Alert when an item is low in stock.
// 3. Order Management:
//     * Create new orders.
//     * Update order status (e.g., processing, shipped, delivered).
//     * Track order history.
// 4. Supplier Management:
//     * Add and manage suppliers.
//     * Link items to suppliers.
// 5. Reporting:
//     * Generate reports for inventory status.
//     * Generate sales reports.
// 6. Warehouse Location Management:
//     * Track and manage the location of each item within the warehouse.
//     * Update item locations when items are moved within the warehouse.


// Non-Functional Requirements:
// 1. Scalability: The system should handle a large number of items and transactions.
// 2. Performance: Quick response times for API calls.
// 3. Security: Proper authentication and authorisation mechanisms.
// 4. Reliability: Ensure data consistency and system availability.I


// Key APIs
// 1. Item API:
//     * POST /items: Add a new item.
//     * PUT /items/{itemId}: Update an existing item.
//     * DELETE /items/{itemId}: Delete an item.
//     * GET /items/{itemId}: Get specific item details.
//     * GET /items: Get a list of all items.
// 2. Order API:
//     * POST /orders: Create a new order.
//     * PUT /orders/{orderId}: Update an existing order.
//     * GET /orders/{orderId}: Get details of a specific order.
//     * GET /orders: Get a list of all orders.
// 3. Inventory API:
//     * GET /inventory: Get the current inventory status.
//     * GET /inventory/low-stock: Get items that are low in stock.
// 4. Supplier API:
//     * POST /suppliers: Add a new supplier.
//     * PUT /suppliers/{supplierId}: Update an existing supplier.
//     * GET /suppliers/{supplierId}: Get details of a specific supplier.
//     * GET /suppliers: Get a list of all suppliers.
// 5. Reporting API:
//     * GET /reports/inventory: Generate an inventory status report.
//     * GET /reports/sales: Generate a sales report.



// Class Diagram
// Here's a high-level class diagram to visualize the system components and their relationships:
// plaintext
// Copy code
//     +------------------+
//     |      Item        |
//     +------------------+
//     | - id: string     |
//     | - name: string   |
//     | - price: number  |
//     | - quantity: number|
//     | - location: string|
//     | - supplierId: string|
//     +------------------+
//               |
//               |
//               |
//     +------------------+
//     |    Inventory     |
//     +------------------+
//     | - items: Map<string, Item>|
//     +------------------+
//               |
//               |
//               |
//     +------------------+
//     |      Order       |
//     +------------------+
//     | - id: string     |
//     | - items: Map<Item, number>|
//     | - status: string |
//     +------------------+
//               |
//               |
//               |
//     +------------------+
//     |    Supplier      |
//     +------------------+
//     | - id: string     |
//     | - name: string   |
//     | - contactInfo: string|
//     +------------------+
//               |
//               |
//               |
//     +------------------+
//     |    Reporting     |
//     +------------------+
//     | - generateInventoryReport()|
//     | - generateSalesReport()|
//     +------------------+





// Class Design in TypeScript


// Item Class
class Item {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public quantity: number,
        public location: string,
        public supplierId: string
    ) {}
}



// Supplier Class
class Supplier {
    constructor(
        public id: string,
        public name: string,
        public contactInfo: string
    ) {}
}



// Inventory Class
class Inventory {
    private items: Map<string, Item> = new Map();

    addItem(item: Item): void {
        this.items.set(item.id, item);
    }

    updateItem(item: Item): void {
        if (this.items.has(item.id)) {
            this.items.set(item.id, item);
        } else {
            throw new Error("Item not found");
        }
    }

    deleteItem(itemId: string): void {
        this.items.delete(itemId);
    }

    getItem(itemId: string): Item | undefined {
        return this.items.get(itemId);
    }

    getLowStockItems(threshold: number): Item[] {
        return Array.from(this.items.values()).filter(item => item.quantity < threshold);
    }

    getInventoryStatus(): Map<string, Item> {
        return this.items;
    }
}



// Order Class
class Order {
    constructor(
        public id: string,
        public items: Map<Item, number>,
        public status: string
    ) {}
}



// Order API class
class OrderAPI {
    private orders: Map<string, Order> = new Map();

    createOrder(id: string, items: Map<Item, number>): Order {
        const order = new Order(id, items, "Processing");
        this.orders.set(id, order);
        return order;
    }

    updateOrder(id: string, status: string): void {
        const order = this.orders.get(id);
        if (order) {
            order.status = status;
        } else {
            throw new Error("Order not found");
        }
    }

    getOrder(id: string): Order | undefined {
        return this.orders.get(id);
    }

    getOrders(): Order[] {
        return Array.from(this.orders.values());
    }
}



// Reporting Class
class Reporting {
    constructor(
        private inventory: Inventory,
        private orders: OrderAPI
    ) {}

    generateInventoryReport(): string {
        const report = Array.from(this.inventory.getInventoryStatus().values()).map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            location: item.location,
            supplierId: item.supplierId
        }));
        return JSON.stringify(report, null, 2);
    }

    generateSalesReport(): string {
        const report = this.orders.getOrders().map(order => ({
            orderId: order.id,
            items: Array.from(order.items.entries()).map(([item, quantity]) => ({
                itemId: item.id,
                itemName: item.name,
                quantity: quantity
            })),
            status: order.status
        }));
        return JSON.stringify(report, null, 2);
    }
}

