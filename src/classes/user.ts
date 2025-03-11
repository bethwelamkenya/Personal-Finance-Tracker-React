export class User {
    id: string;
    name: string;
    email: string;
    salt: string;
    passwordHash: string;
    createdAt: Date;

    constructor(
        id: string,
        name: string = "",
        email: string,
        salt: string,
        passwordHash: string,
        createdAt: Date = new Date(),
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.salt = salt;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }

    // Convert JSON to BankAccount instance
    static fromJson(json: any): User | null {
        if (!json.id || !json.email || !json.passwordHash){
            return null
        }
        return new User(
            json.id,
            json.name ?? "",
            json.email,
            json.salt,
            json.passwordHash,
            new Date(json.createdAt),
        );
    }

    // Convert BankAccount instance to JSON
    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            salt: this.salt,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt.toISOString(),
        };
    }
}
