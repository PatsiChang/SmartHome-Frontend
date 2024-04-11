import { darkTheme, lightTheme } from "@/app/stylesheet";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);

export const useStyle = (name: string): any => {
    const theme = useTheme();
    if (theme.themeValue == "darkTheme") {
        // console.log("1: ", name, darkTheme()[name]);
        return darkTheme()[name];
    } else {
        // console.log("2 : ", name, lightTheme()[name]);
        return lightTheme()[name];
    }
}