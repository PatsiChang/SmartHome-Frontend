import { StyleSheet, Text, View } from 'react-native';
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ThemeContext } from './context/ThemeContext';

export default function App() {
  const [themeValue, setThemeValue] = useState<"darkTheme" | "lightTheme">("darkTheme");

  return (
    <ThemeContext.Provider value={{ themeValue }}>
      <Stack initialRouteName="/" />
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
