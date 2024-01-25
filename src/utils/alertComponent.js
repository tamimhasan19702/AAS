/** @format */

import { View, StyleSheet, Button, Alert } from "react-native";
import React from "react";

const showAlert = () => console.log("alert");

export const AlertComponent = () => {
  return (
    <View style={styles.container}>
      <Button title="Show alert" onPress={showAlert} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
