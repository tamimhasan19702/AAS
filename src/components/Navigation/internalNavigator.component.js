/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AiScreen } from "../../features/AI/AI.feature";
import { VoiceScreen } from "../../features/voice/Voice.feature";
import { StartPage } from "../../features/StartPage/StartPage.feature";

import { SpeakerScreen } from "../../features/speaker/speaker.feature";
import { SpeakerVoice } from "../../features/speaker/speaker.voice";
import { ROUTES } from "../../constants/routes";

const Stack = createNativeStackNavigator();
export const InternalNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.START_SCREEN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.START_SCREEN} component={StartPage} />
      <Stack.Screen name={ROUTES.AI_SCREEN} component={AiScreen} />
      <Stack.Screen name={ROUTES.VOICE_SCREEN} component={VoiceScreen} />
      <Stack.Screen name={ROUTES.SPEAKER_SCREEN} component={SpeakerScreen} />
      <Stack.Screen name={ROUTES.SPEAKER_VOICE} component={SpeakerVoice} />
    </Stack.Navigator>
  );
};
