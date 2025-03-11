import {CurrencyType} from "./currency_type";

export class SavingsGoal {
    id: string;
    accountNumber: string;
    goalName: string;
    targetAmount: number;
    savedAmount: number;
    currency: string;
    createdAt: Date;
    userEmail: string;

    constructor(
        id: string,
        accountNumber: string,
        goalName: string,
        targetAmount: number,
        savedAmount: number = 0,
        currency: string = CurrencyType.USD.code,
        createdAt: Date = new Date(),
        userEmail: string
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.goalName = goalName;
        this.targetAmount = targetAmount;
        this.savedAmount = savedAmount;
        this.currency = currency;
        this.createdAt = createdAt;
        this.userEmail = userEmail;
    }

    // Convert JSON to SavingGoal instance
    static fromJson(json: any): SavingsGoal {
        return new SavingsGoal(
            json.id,
            json.accountNumber,
            json.goalName,
            json.targetAmount ?? 0,
            json.savedAmount ?? 0,
            json.currency ?? CurrencyType.USD.code,
            new Date(json.createdAt),
            json.userEmail
        );
    }

    // Convert SavingGoal instance to JSON
    toJson(): any {
        return {
            id: this.id,
            accountNumber: this.accountNumber,
            goalName: this.goalName,
            targetAmount: this.targetAmount,
            savedAmount: this.savedAmount,
            currency: this.currency,
            createdAt: this.createdAt.toISOString(),
            userEmail: this.userEmail,
        };
    }
}
