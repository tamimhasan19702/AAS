/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";
import { StartStopRecorder } from "../../components/Start&StopRecorder.component";
import { PlayVoice } from "../../components/playVoice.component";

const VoiceScreenView = styled(View)`
  margin-top: 20px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
`;

export const VoiceScreen = ({ navigation }) => {
  const { recording, sound, startRecording, stopRecording, playRecording } =
    useContext(PVoiceContext);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <StartStopRecorder
          title={
            recording ? "Press for Stop Recording" : "Press for Start Recording"
          }
          onPress={recording ? stopRecording : startRecording}
        />
        {sound && <PlayVoice title="Play Recording" onPress={playRecording} />}
      </VoiceScreenView>
    </SafeView>
  );
};
