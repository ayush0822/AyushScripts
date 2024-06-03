class BankAccount {
    customerName: string;
    private accountNumber: number;
    balance: number;

    constructor(customerName: string, balance: number = 0) {
        this.customerName = customerName;
        this.accountNumber = Date.now();
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log("", this.accountNumber);
    }

    withdraw(amount: number): void {
        this.balance -= amount;
    }
}

// Example usage
const rakeshAccount = new BankAccount('Rakesh K', 1000);
const johnAccount = new BankAccount('John Doe');
rakeshAccount.deposit(5000);
johnAccount.deposit(1000);
rakeshAccount.withdraw(2000);
console.log(rakeshAccount, johnAccount);

const accounts: BankAccount[] = [];

