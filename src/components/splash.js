/** @format */

import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeView } from "../utils/safeAreaView";
import LottieView from "lottie-react-native";

export const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 5000);

  if (!timePassed) {
    return (
      <SafeView style={styles.splash}>
        <Text style={styles.text}>Splash Screen</Text>
      </SafeView>
    );
  }
  navigation.navigate("Account page");
  return null;
};

const styles = StyleSheet.create({
  splash: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  text: {
    fontSize: 20,
  },
});
