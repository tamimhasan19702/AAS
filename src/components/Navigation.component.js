/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../features/splash/splash.feature.js";
import { AccountFeature } from "../features/account/account.feature.js";
import { StartPage } from "../features/StartPage/StartPage.feature.js";

const Stack = createNativeStackNavigator();
export const Navigation = () => {
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
};
