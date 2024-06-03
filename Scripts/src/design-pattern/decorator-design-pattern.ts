// Component Interface
interface Coffee {
    cost(): number;
    description(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
    cost(): number {
        return 5;
    }

    description(): string {
        return 'Simple Coffee';
    }
}

// Decorator Abstract Class
abstract class CoffeeDecorator implements Coffee {
    protected decoratedCoffee: Coffee;

    constructor(coffee: Coffee) {
        this.decoratedCoffee = coffee;
    }

    cost(): number {
        return this.decoratedCoffee.cost();
    }

    description(): string {
        return this.decoratedCoffee.description();
    }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    cost(): number {
        return super.cost() + 2; // Adding milk costs 2 units more
    }

    description(): string {
        return super.description() + ', Milk';
    }
}

class SugarDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    cost(): number {
        return super.cost() + 1; // Adding sugar costs 1 unit more
    }

    description(): string {
        return super.description() + ', Sugar';
    }
}

// Client Code
const myCoffee = new SimpleCoffee();
console.log(myCoffee.description() + ' - Cost: ' + myCoffee.cost());

const milkCoffee = new MilkDecorator(myCoffee);
console.log(milkCoffee.description() + ' - Cost: ' + milkCoffee.cost());

const milkSugarCoffee = new SugarDecorator(milkCoffee);
console.log(milkSugarCoffee.description() + ' - Cost: ' + milkSugarCoffee.cost());
