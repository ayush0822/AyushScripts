// Concrete Products
var ConcreteProduct1 = /** @class */ (function () {
    function ConcreteProduct1() {
    }
    ConcreteProduct1.prototype.operation = function () {
        console.log("ConcreteProduct1 operation");
    };
    return ConcreteProduct1;
}());
var ConcreteProduct2 = /** @class */ (function () {
    function ConcreteProduct2() {
    }
    ConcreteProduct2.prototype.operation = function () {
        console.log("ConcreteProduct2 operation");
    };
    return ConcreteProduct2;
}());
// Factory class
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.createProduct = function (productType) {
        switch (productType) {
            case "Product1":
                return new ConcreteProduct1();
            case "Product2":
                return new ConcreteProduct2();
            default:
                console.error("Invalid product type");
                return null;
        }
    };
    return Factory;
}());
// Client
var Client = /** @class */ (function () {
    function Client() {
        this.factory = new Factory();
    }
    Client.prototype.run = function (productType) {
        var product = this.factory.createProduct(productType);
        if (product) {
            product.operation();
        }
    };
    return Client;
}());
// Usage
var client = new Client();
client.run("Product1"); // Output: ConcreteProduct1 operation
client.run("Product2"); // Output: ConcreteProduct2 operation
client.run("InvalidProduct"); // Output: Invalid product type
