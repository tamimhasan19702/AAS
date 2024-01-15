/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AiScreen } from "../../features/AI/AI.feature";
import { VoiceScreen } from "../../features/voice/Voice.feature";
import { StartPage } from "../../features/StartPage/StartPage.feature";
import { NortificationScreen } from "../../features/Nortification/Nortfication.feature";
import { SpeakerScreen } from "../../features/speaker/speaker.feature";

const Stack = createNativeStackNavigator();
export const InternalNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start Screen" component={StartPage} />
      <Stack.Screen name="AI Screen" component={AiScreen} />
      <Stack.Screen name="Voice Screen" component={VoiceScreen} />
      <Stack.Screen
        name="Nortification Screen"
        component={NortificationScreen}
      />
      <Stack.Screen name="Speaker Screen" component={SpeakerScreen} />
    </Stack.Navigator>
  );
};
