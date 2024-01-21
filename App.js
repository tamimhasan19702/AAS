/** @format */

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { AiContextProvider } from "./src/context/AI.context";

export default function App() {
  return (
    <>
      <AiContextProvider>
        <Navigation />
        <ExpoStatusBar style="auto" />
      </AiContextProvider>
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
