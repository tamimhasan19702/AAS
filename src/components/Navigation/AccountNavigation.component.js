/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export const AccountNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start Screen"
      screenOptions={{ headerShown: false }}></Stack.Navigator>
  );
};
