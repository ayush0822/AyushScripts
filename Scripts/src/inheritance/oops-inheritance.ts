// Parent Class
class Animal {
    // Properties
     name: string;

    // Constructor
    constructor(name: string) {
        this.name = name;
    }

    // Method
    makeSound(): void {
        console.log(`${this.name} makes a sound`);
        return ;
    }
}

// Child Class
class Dog extends Animal {
    // Additional properties can be added here

    private dogVariable: Animal;
    // Constructor
    constructor(name: string, dogInput: Animal) {
        // Call the parent class constructor
        super(name);
        this.dogVariable = dogInput;
    }

    // Override the parent class method
    // makeSound(): void {
    //     console.log(`${this.name} barks`);

    // }

    // Additional methods can be added here
    fetch(): void {
        console.log(`${this.name} is fetching a ball`);
    }


    printDogVariable(): void {
        console.log(this.dogVariable.makeSound());
    }

}

// Usage
const genericAnimal = new Animal('Generic Animal');
genericAnimal.makeSound(); // Output: Generic Animal makes a sound

const dog = new Dog('Rex', new Animal('Generic Animal'));
dog.makeSound(); // Output: Rex barks
dog.fetch(); // Output: Rex is fetching a ball
dog.printDogVariable();


