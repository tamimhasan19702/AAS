/** @format */

import React, { useState } from "react";
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
