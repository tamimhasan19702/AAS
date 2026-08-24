/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";
import { RecorderButton } from "../../components/RecorderButton.component";
import { PlayVoice } from "../../components/playVoice.component";
import { color } from "../../utils/colors";
import {
  uploadRecording,
  convertToMp3,
} from "../../services/audioConvert.service";

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
  background-color: ${({ hasRecording }) =>
    hasRecording ? color.primary : color.gray} !important;
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
  const [converted, setConverted] = useState(false);
  const {
    recording,
    startRecording,
    stopRecording,
    playRecording,
    recordedSounds,
    clearRecordedSounds,
    deleteRecordedSound,
    finalRecording,
    setUrl,
    setConvertedUrl,
  } = useContext(PVoiceContext);

  useEffect(() => {
    if (!finalRecording) return;

    let cancelled = false;
    const processRecording = async () => {
      try {
        // Upload the raw recording to Firebase Storage and swap it in the DB
        const uploadedUrl = await uploadRecording(finalRecording);
        if (cancelled) return;
        setUrl(uploadedUrl);

        // Convert to MP3, store in Storage/DB and wait for a streamable URL
        const mp3Url = await convertToMp3(uploadedUrl);
        if (cancelled) return;
        setConvertedUrl(mp3Url);
        setConverted(true);
      } catch (error) {
        console.error("Error processing recording:", error);
      }
    };

    processRecording();
    return () => {
      cancelled = true;
    };
  }, [finalRecording, setUrl, setConvertedUrl]);

  const isAnyRecordActive = recordedSounds.some((item) => item.isActive);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <RecorderButton
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
              const { duration, time, isActive } = soundItem;
              const reverseIndex = recordedSounds.length - index;
              return (
                <PlayVoice
                  key={soundItem.time || index}
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
                Clear List
              </VoiceScreenText>
            </VoiceBottomButton>
            <VoiceBottomButton
              onPress={() => {
                if (isAnyRecordActive && converted) {
                  navigation.navigate("Speaker Voice");
                } else if (!converted) {
                  Alert.alert(
                    "Alert",
                    "Audio conversion is still in progress. Please wait.",
                    [{ text: "OK" }]
                  );
                } else {
                  Alert.alert(
                    "Alert",
                    "No active Recording. Click on any sound to activate it.",
                    [{ text: "OK" }]
                  );
                }
              }}
              hasRecording={Boolean(isAnyRecordActive && converted)}
              style={{
                backgroundColor:
                  isAnyRecordActive && converted ? color.primary : color.gray,
              }}>
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
