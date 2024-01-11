/** @format */

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/components/Navigation";

export default function App() {
  return (
    <>
      <Navigation />
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
