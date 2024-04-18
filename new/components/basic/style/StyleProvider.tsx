import {PropsWithChildren, useEffect, useState} from "react";
import {buildAppStyleSheet} from "@/lib/appStyleApi";
import { StyleContext } from "@/context/StyleContext";
import {getContext, setContext} from "@/lib/globalContextApi";

export interface AppStyleClassProp {
    styleClass ?: string | string[];
}

interface StyleProviderProps extends PropsWithChildren<{}> {
}

export const CONTEXT_KEY_CURRENT_THEME = "currentTheme";
export const CONTEXT_KEY_SET_THEME = "setTheme";

export default function StyleProvider({ children } : StyleProviderProps) {
    const [themeValue, setThemeValue] = useState<string>("darkTheme");
    if (!getContext(CONTEXT_KEY_SET_THEME)) {
        setContext(CONTEXT_KEY_SET_THEME, setThemeValue);
    } else {
        console.warn("cannot register more than one style provider");
    }

    let currentStyle = buildAppStyleSheet(themeValue, "normal");

    useEffect(() => {
        currentStyle = buildAppStyleSheet(themeValue, "normal");
        setContext(CONTEXT_KEY_CURRENT_THEME, themeValue);
    }, [themeValue]);

    return (
        <StyleContext.Provider value={ currentStyle }>
            { children }
        </StyleContext.Provider>
    );
}