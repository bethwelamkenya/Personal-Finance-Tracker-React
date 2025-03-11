import {TransactionType} from "./transaction_type";
import {CurrencyType} from "./currency_type";

export class Transaction {
    id: string;
    accountNumber: string;
    type: string;
    goalName: string;
    amount: number;
    targetAccountNumber: string;
    targetGoalName: string;
    targetUserEmail: string;
    currency: string;
    timestamp: Date;
    userEmail: string;

    constructor(
        id: string,
        accountNumber: string,
        type: string = TransactionType.DEPOSIT,
        goalName: string,
        targetAccountNumber: string,
        targetGoalName: string,
        targetUserEmail: string,
        amount: number = 0,
        currency: string = CurrencyType.USD.code,
        timestamp: Date = new Date(),
        userEmail: string
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.type = type;
        this.goalName = goalName;
        this.amount = amount;
        this.targetAccountNumber = targetAccountNumber;
        this.targetGoalName = targetGoalName;
        this.targetUserEmail = targetUserEmail;
        this.currency = currency;
        this.timestamp = timestamp;
        this.userEmail = userEmail;
    }

    // Convert JSON to Transaction instance
    static fromJson(json: any): Transaction {
        return new Transaction(
            json.id,
            json.accountNumber,
            json.type,
            json.goalName,
            json.targetAccountNumber,
            json.targetGoalName,
            json.targetUserEmail,
            json.amount ?? 0,
            json.currency ?? CurrencyType.USD.code,
            new Date(json.timestamp),
            json.userEmail
        );
    }

    // Convert Transaction instance to JSON
    toJson(): any {
        return {
            id: this.id,
            accountNumber: this.accountNumber,
            type: this.type,
            goalName: this.goalName,
            targetAccountNumber: this.targetAccountNumber,
            targetGoalName: this.targetGoalName,
            targetUserEmail: this.targetUserEmail,
            amount: this.amount,
            currency: this.currency,
            timestamp: this.timestamp.toISOString(),
            userEmail: this.userEmail,
        };
    }
}
