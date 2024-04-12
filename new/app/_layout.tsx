import { StyleSheet } from 'react-native';
import React, { useState } from "react";
import { ThemeContext } from '@/context/ThemeContext';
import RouterWrapper from '@/components/basic/navigation/RouterWrapper';
export default function AppRoot() {
    const [themeValue, setThemeValue] = useState<"darkTheme" | "lightTheme">("darkTheme");

    return (
        <ThemeContext.Provider value={{ themeValue }}>
            <RouterWrapper />
        </ThemeContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
