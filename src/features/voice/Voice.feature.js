/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const { recording, sound, startRecording, stopRecording, playRecording } =
    useContext(PVoiceContext);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <Text>VoiceScreen</Text>
        <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
        {sound && <Button title="Play Recording" onPress={playRecording} />}
      </VoiceScreenView>
    </SafeView>
  );
};
