/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "./splash";
import { AccountFeature } from "../features/account/account.feature";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Account page" component={AccountFeature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
