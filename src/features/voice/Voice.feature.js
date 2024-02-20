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
                  />
                  <View style={{ height: 10 }} />
                </>
              );
            })}
        </ScrollView>
      </VoiceScreenView>
    </SafeView>
  );
};
