/** @format */

import { View, Text, TouchableOpacity, Button, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";
import { StartStopRecorder } from "../../components/Start&StopRecorder.component";
import { PlayVoice } from "../../components/playVoice.component";

const VoiceScreenView = styled(View)`
  margin-top: 30px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: start;
  height: 100%;
  gap: 10px;
`;

export const VoiceScreen = ({ navigation }) => {
  const {
    recording,
    myRecording,
    startRecording,
    stopRecording,
    playRecording,
    recordedSounds,
    clearRecordedSounds,
  } = useContext(PVoiceContext);
  console.log(recordedSounds.length);
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
        {recordedSounds.length > 0 && (
          <TouchableOpacity onPress={clearRecordedSounds}>
            <Text>clear Voice</Text>
          </TouchableOpacity>
        )}
        <ScrollView>
          {recordedSounds.length > 0 &&
            recordedSounds.map((sound, index) => {
              return (
                <PlayVoice
                  key={index}
                  title={`Play Recording ${index + 1}`}
                  onPress={() => playRecording(sound)}
                />
              );
            })}
        </ScrollView>
      </VoiceScreenView>
    </SafeView>
  );
};
