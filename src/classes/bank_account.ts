import {CurrencyType} from "./currency_type";

export class BankAccount {
    id: string;
    accountNumber: string;
    holderName: string;
    bankName: string;
    balance: number;
    currency: string;
    createdAt: Date;
    userEmail: string;

    constructor(
        id: string,
        accountNumber: string,
        holderName: string,
        bankName: string,
        balance: number = 0,
        currency: string = CurrencyType.USD.code,
        createdAt: Date = new Date(),
        userEmail: string
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.bankName = bankName;
        this.balance = balance;
        this.currency = currency;
        this.createdAt = createdAt;
        this.userEmail = userEmail;
    }

    // Convert JSON to BankAccount instance
    static fromJson(json: any): BankAccount {
        return new BankAccount(
            json.id,
            json.accountNumber,
            json.holderName,
            json.bankName,
            json.balance ?? 0,
            json.currency ?? CurrencyType.USD.code,
            new Date(json.createdAt),
            json.userEmail
        );
    }

    // Convert BankAccount instance to JSON
    toJson(): any {
        return {
            id: this.id,
            accountNumber: this.accountNumber,
            holderName: this.holderName,
            bankName: this.bankName,
            balance: this.balance,
            currency: this.currency,
            createdAt: this.createdAt.toISOString(),
            userEmail: this.userEmail,
        };
    }
}
