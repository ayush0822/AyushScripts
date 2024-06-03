// Product interface
interface Product {
  operation(): void;
}

// Concrete Products
class ConcreteProduct1 implements Product {
  operation(): void {
    console.log("ConcreteProduct1 operation");
  }
}

class ConcreteProduct2 implements Product {
  operation(): void {
    console.log("ConcreteProduct2 operation");
  }
}

// Factory class
class Factory {
  createProduct(productType: string): Product | null {
    switch (productType) {
      case "Product1":
        return new ConcreteProduct1();
      case "Product2":
        return new ConcreteProduct2();
      default:
        console.error("Invalid product type");
        return null;
    }
  }
}

// Client
class Client {
  private factory: Factory;

  constructor() {
    this.factory = new Factory();
  }

  public run(productType: string): void {
    const product = this.factory.createProduct(productType);
    if (product) {
      product.operation();
    }
  }
}

// Usage
const client = new Client();

client.run("Product1"); // Output: ConcreteProduct1 operation
client.run("Product2"); // Output: ConcreteProduct2 operation
client.run("InvalidProduct"); // Output: Invalid product type
