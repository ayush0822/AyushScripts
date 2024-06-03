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
// Parent Class
var Animal = /** @class */ (function () {
    // Constructor
    function Animal(name) {
        this.name = name;
    }
    // Method
    Animal.prototype.makeSound = function () {
        console.log("".concat(this.name, " makes a sound"));
        return;
    };
    return Animal;
}());
// Child Class
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    // Constructor
    function Dog(name, dogInput) {
        // Call the parent class constructor
        var _this = _super.call(this, name) || this;
        _this.dogVariable = dogInput;
        return _this;
    }
    // Override the parent class method
    // makeSound(): void {
    //     console.log(`${this.name} barks`);
    // }
    // Additional methods can be added here
    Dog.prototype.fetch = function () {
        console.log("".concat(this.name, " is fetching a ball"));
    };
    Dog.prototype.printDogVariable = function () {
        console.log(this.dogVariable.makeSound());
    };
    return Dog;
}(Animal));
// Usage
var genericAnimal = new Animal('Generic Animal');
genericAnimal.makeSound(); // Output: Generic Animal makes a sound
var dog = new Dog('Rex', new Animal('Generic Animal'));
dog.makeSound(); // Output: Rex barks
dog.fetch(); // Output: Rex is fetching a ball
dog.printDogVariable();
