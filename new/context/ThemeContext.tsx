import { createContext } from "react";

export interface ThemeContextType {
    themeValue: "darkTheme" | "lightTheme",
}
export const ThemeContext = createContext<ThemeContextType>({
    themeValue: "darkTheme",
});

