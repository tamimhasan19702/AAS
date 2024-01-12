/** @format */

import { View, Text } from "react-native";
import React, { useState } from "react";
import { AccountNavigation } from "./AccountNavigation.component";
import { NavigationContainer } from "@react-navigation/native";
import { VoiceBottomNavigation } from "./VoiceBottomNavigation.component";
import { SplashScreen } from "../../features/splash/splash.feature";

export const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <SplashScreen setIsLoading={setIsLoading} />
  ) : (
    <NavigationContainer>
      <VoiceBottomNavigation />
    </NavigationContainer>
  );
};
