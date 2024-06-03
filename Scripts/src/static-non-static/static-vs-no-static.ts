class Counter {
  // Static variable to keep track of the count
  static count = 0;
  private count2 = 0;
  constructor() {
    Counter.count++; // Increment the static count when a new instance is created
    this.count2++;
  }

  // Static method to get the current count
  public getCount() {
    Counter.count++;
    this.count2++;
    return {
      staticVar: Counter.count,
      nonStaticVar: this.count2,
    };
  }


  public static getCounts() {
    this.count++;
    new Counter().count2++;
    return {
      staticVar: this.count,
      nonStaticVar: new Counter().count2,
    };
  }
}

const instance1 = new Counter();
const instance2 = new Counter();
const instance3 = Counter.getCounts();
console.log(instance1.getCount());
console.log();
