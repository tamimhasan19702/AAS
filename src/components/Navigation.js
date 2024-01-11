/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../features/splash/splash.feature";
import { AccountFeature } from "../features/account/account.feature";
import StartPage from "./StartPage";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Account page" component={StartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
