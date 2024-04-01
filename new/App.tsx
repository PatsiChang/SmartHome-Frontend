import { StyleSheet, Text, View } from 'react-native';
import {Stack} from "expo-router";
import React from "react";

export default function App() {
  return (
      <Stack initialRouteName="/" />
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
