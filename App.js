/** @format */

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { AiContextProvider } from "./src/context/AI.context";
import { SpeakerProvider } from "./src/context/Speaker.context";
import { PVoiceContextProvider } from "./src/context/PVoice.context";
import { PSpeakerProvider } from "./src/context/PSpeaker.context";
import { ScheduleProvider } from "./src/context/Schedule.context";

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
