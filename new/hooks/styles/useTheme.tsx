import { darkTheme, lightTheme } from "@/app/stylesheet";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);

export const useStyle = (name: string): any => {
    const theme = useTheme();
    if (theme.themeValue == "darkTheme") {
        return darkTheme()[name];
    } else {
        return lightTheme()[name];
    }
}