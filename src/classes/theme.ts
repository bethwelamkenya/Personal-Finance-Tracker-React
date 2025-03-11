export enum Theme {
    LIGHT = "light",
    DARK = "dark",
    AMOLED = "amoled",
    SOLARIZED = "solarized",
    NORD = "nord",
    DRACULA = "dracula",
    GRUVBOX = "gruvbox",
    MATERIAL = "material",
    MATERIAL_DARK = "material-dark",
    MONOKAI = "monokai"
}

// Helper function to validate themes
export const isValidTheme = (theme: string): theme is Theme => {
    return Object.values(Theme).includes(theme as Theme);
};
