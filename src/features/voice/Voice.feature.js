/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";
import { Audio } from "expo-av";
import { PVoiceContext } from "../../context/PVoice.context";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const {
    recording,
    sound,
    startRecording,
    stopRecording,
    playSound,
    stopSound,
    myRecord,
  } = useContext(PVoiceContext);

  useEffect(() => {
    // Cleanup function to stop sound when component unmounts
    return async () => {
      await stopSound();
      if (recording) {
        await recording.stopAndUnloadAsync();
      }
    };
  }, [recording, sound]);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <Text>VoiceScreen</Text>
        <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
        <Button title="play sound" onPress={() => playSound(myRecord)} />
        <Button title="stop sound" onPress={stopSound} />
      </VoiceScreenView>
    </SafeView>
  );
};
