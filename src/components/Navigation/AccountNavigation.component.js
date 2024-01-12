/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../../features/splash/splash.feature.js";
import { AccountFeature } from "../../features/account/account.feature.js";
import { StartPage } from "../../features/StartPage/StartPage.feature.js";
import { AiScreen } from "../../features/AI/AI.feature.js";
import { VoiceScreen } from "../../features/voice/Voice.feature.js";

const Stack = createNativeStackNavigator();
export const AccountNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Start Screen" component={StartPage} />
        <Stack.Screen
          name="AI Screen"
          component={AiScreen}
          options={{
            animationTypeForReplace: "push",
            animationEnabled: true,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Voice Screen"
          component={VoiceScreen}
          options={{
            animationTypeForReplace: "push",
            animationEnabled: true,
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
