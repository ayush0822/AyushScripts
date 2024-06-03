// Constructor function for Animal

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

// Constructor function for Dog
function Dog(name, breed) {
    Animal.call(this, name); // Call the parent constructor with the current context
    this.breed = breed;
}

// Setting up the prototype chain
Dog.prototype = Object.create(Animal.prototype); // Dog inherits from Animal
Dog.prototype.constructor = Dog; // Set the constructor property to Dog

// Adding a method to the Dog prototype
Dog.prototype.bark = function() {
    console.log(`${this.name} barks.`);
};

// Creating an instance of Dog
const beagle = new Dog('Beagle', 'Hound');

// Accessing properties and methods through the prototype chain
beagle.speak(); // Output: Beagle makes a noise.
beagle.bark(); // Output: Beagle barks.
