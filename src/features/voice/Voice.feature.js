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

const VoiceScreenText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;

export const VoiceScreen = ({ navigation }) => {
  const {
    recording,
    startRecording,
    stopRecording,
    playRecording,
    recordedSounds,
    clearRecordedSounds,
    deleteRecordedSound,
  } = useContext(PVoiceContext);
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <StartStopRecorder
          title={
            recording ? "Press to Stop Recording" : "Press to Start Recording"
          }
          onPress={recording ? stopRecording : startRecording}
        />
        {recordedSounds.length > 0 && (
          <TouchableOpacity onPress={clearRecordedSounds}>
            <Text>clear Voice</Text>
          </TouchableOpacity>
        )}
        <ScrollView>
          {recordedSounds.length > 0 ? (
            recordedSounds.map((soundItem, index) => {
              const { sound, duration, time } = soundItem;
              const reverseIndex = recordedSounds.length - index;
              return (
                <>
                  <PlayVoice
                    key={index}
                    title={`Play Recording ${reverseIndex}`}
                    onPress={() => playRecording(index)}
                    duration={duration}
                    time={time}
                    handleDelete={() => deleteRecordedSound(index)}
                  />
                  <View style={{ height: 10 }} />
                </>
              );
            })
          ) : (
            <VoiceScreenText> No New Recording Found!! ☺</VoiceScreenText>
          )}
        </ScrollView>
      </VoiceScreenView>
    </SafeView>
  );
};
