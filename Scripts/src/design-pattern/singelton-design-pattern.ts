class Singleton {
  private static instance: Singleton;

  // Private constructor to prevent direct class instantiation
  private constructor() {
    // Initialize any necessary properties here
  }

  // Static method to control the access to the singleton instance
  public static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }

  // Example method
  public showMessage(): void {
    console.log("Hello, I'm a singleton instance!");
  }
}


const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

singleton1.showMessage(); // Output: Hello, I'm a singleton instance!

// Check if both instances are the same
console.log(singleton1 === singleton2); // Output: true
