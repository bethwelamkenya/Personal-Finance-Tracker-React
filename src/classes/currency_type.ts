export class CurrencyType {
    static readonly USD = new CurrencyType("USD", "$");
    static readonly EUR = new CurrencyType("EUR", "€");
    static readonly GBP = new CurrencyType("GBP", "£");
    static readonly JPY = new CurrencyType("JPY", "¥");
    static readonly AUD = new CurrencyType("AUD", "A$");
    static readonly CAD = new CurrencyType("CAD", "C$");
    static readonly CHF = new CurrencyType("CHF", "Fr.");
    static readonly CNY = new CurrencyType("CNY", "¥");
    static readonly SEK = new CurrencyType("SEK", "kr");
    static readonly NZD = new CurrencyType("NZD", "NZ$");

    private constructor(public readonly code: string, public readonly symbol: string) {}

    static find(code: string): CurrencyType | undefined {
        return Object.values(CurrencyType).find((currency) => currency.code === code);
    }
}

// export default CurrencyType;
