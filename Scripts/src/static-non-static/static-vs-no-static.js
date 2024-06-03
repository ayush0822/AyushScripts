var Counter = /** @class */ (function () {
    function Counter() {
        this.count2 = 0;
        Counter.count++; // Increment the static count when a new instance is created
        this.count2++;
    }
    // Static method to get the current count
    Counter.prototype.getCount = function () {
        Counter.count++;
        this.count2++;
        return {
            staticVar: Counter.count,
            nonStaticVar: this.count2,
        };
    };
    Counter.getCounts = function () {
        Counter.count++;
        new Counter().count2++;
        return {
            staticVar: Counter.count,
            nonStaticVar: new Counter().count2,
        };
    };
    // Static variable to keep track of the count
    Counter.count = 0;
    return Counter;
}());
var instance1 = new Counter();
var instance2 = new Counter();
console.log(instance1.getCount());
console.log(instance2.getCount());
