var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Concrete Component
var SimpleCoffee = /** @class */ (function () {
    function SimpleCoffee() {
    }
    SimpleCoffee.prototype.cost = function () {
        return 5;
    };
    SimpleCoffee.prototype.description = function () {
        return 'Simple Coffee';
    };
    return SimpleCoffee;
}());
// Decorator Abstract Class
var CoffeeDecorator = /** @class */ (function () {
    function CoffeeDecorator(coffee) {
        this.decoratedCoffee = coffee;
    }
    CoffeeDecorator.prototype.cost = function () {
        return this.decoratedCoffee.cost();
    };
    CoffeeDecorator.prototype.description = function () {
        return this.decoratedCoffee.description();
    };
    return CoffeeDecorator;
}());
// Concrete Decorators
var MilkDecorator = /** @class */ (function (_super) {
    __extends(MilkDecorator, _super);
    function MilkDecorator(coffee) {
        return _super.call(this, coffee) || this;
    }
    MilkDecorator.prototype.cost = function () {
        return _super.prototype.cost.call(this) + 2; // Adding milk costs 2 units more
    };
    MilkDecorator.prototype.description = function () {
        return _super.prototype.description.call(this) + ', Milk';
    };
    return MilkDecorator;
}(CoffeeDecorator));
var SugarDecorator = /** @class */ (function (_super) {
    __extends(SugarDecorator, _super);
    function SugarDecorator(coffee) {
        return _super.call(this, coffee) || this;
    }
    SugarDecorator.prototype.cost = function () {
        return _super.prototype.cost.call(this) + 1; // Adding sugar costs 1 unit more
    };
    return SugarDecorator;
}(CoffeeDecorator));
// Client Code
var myCoffee = new SimpleCoffee();
console.log(myCoffee.description() + ' - Cost: ' + myCoffee.cost());
var milkCoffee = new MilkDecorator(myCoffee);
console.log(milkCoffee.description() + ' - Cost: ' + milkCoffee.cost());
var milkSugarCoffee = new SugarDecorator(milkCoffee);
console.log(milkSugarCoffee.description() + ' - Cost: ' + milkSugarCoffee.cost());
