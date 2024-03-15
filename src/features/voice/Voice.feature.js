/** @format */

import { View, Text, TouchableOpacity, Button, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";
import { StartStopRecorder } from "../../components/Start&StopRecorder.component";
import { PlayVoice } from "../../components/playVoice.component";
import { color } from "../../utils/colors";

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

const VoiceBottomView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  gap: 5px;
`;

const VoiceBottomButton = styled(TouchableOpacity)`
  background-color: ${color.primary};
  width: 150px;
  color: ${color.white};
  text-align: center;
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
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
    finalRecording,
  } = useContext(PVoiceContext);
  useEffect(() => {
    console.log("finalRecording updated:", finalRecording);
  }, [finalRecording]);
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

        <VoiceScreenText style={{ fontSize: 25 }}>
          Recording List 🎙
        </VoiceScreenText>
        <ScrollView>
          {recordedSounds.length > 0 ? (
            recordedSounds.map((soundItem, index) => {
              const { sound, duration, time, isActive } = soundItem;
              const reverseIndex = recordedSounds.length - index;
              return (
                <PlayVoice
                  key={index}
                  title={`Play Recording ${reverseIndex}`}
                  onPress={() => playRecording(index)}
                  duration={duration}
                  time={time}
                  handleDelete={() => deleteRecordedSound(index)}
                  isActive={isActive}
                />
              );
            })
          ) : (
            <VoiceScreenText> No New Recording Found!! ☺</VoiceScreenText>
          )}
        </ScrollView>
        {recordedSounds.length > 0 && (
          <VoiceBottomView>
            <VoiceBottomButton
              onPress={clearRecordedSounds}
              style={{ backgroundColor: color.red }}>
              <VoiceScreenText
                style={{
                  color: color.white,
                  fontSize: 16,
                }}>
                clear List
              </VoiceScreenText>
            </VoiceBottomButton>
            <VoiceBottomButton
              onPress={() => navigation.navigate("Speaker Voice")}>
              <VoiceScreenText style={{ color: color.white, fontSize: 16 }}>
                Next Step
              </VoiceScreenText>
            </VoiceBottomButton>
          </VoiceBottomView>
        )}
      </VoiceScreenView>
    </SafeView>
  );
};
