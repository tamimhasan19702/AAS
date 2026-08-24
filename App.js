/** @format */

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { useFonts, OverlockSC_400Regular } from "@expo-google-fonts/overlock-sc";
import { Navigation } from "./src/components/Navigation";
import { AiContextProvider } from "./src/context/AI.context";
import {
  PSpeakerProvider,
  SpeakerProvider,
} from "./src/context/Speakers.context";
import { PVoiceContextProvider } from "./src/context/PVoice.context";
import { ScheduleProvider } from "./src/context/Schedule.context";

export default function App() {
  // Fonts are loaded once here instead of in every component
  const [fontsLoaded] = useFonts({ OverlockSC_400Regular });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ScheduleProvider>
        <PSpeakerProvider>
          <PVoiceContextProvider>
            <AiContextProvider>
              <SpeakerProvider>
                <Navigation />
                <ExpoStatusBar style="auto" />
              </SpeakerProvider>
            </AiContextProvider>
          </PVoiceContextProvider>
        </PSpeakerProvider>
      </ScheduleProvider>
    </>
  );
}
