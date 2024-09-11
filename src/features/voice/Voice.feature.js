/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { PVoiceContext } from "../../context/PVoice.context";
import { StartStopRecorder } from "../../components/Start&StopRecorder.component";
import { PlayVoice } from "../../components/playVoice.component";
import { color } from "../../utils/colors";
import { FIREBASESTORAGE, FIREBASEDATABASE } from "../../../firebase.config";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { set, ref as refDB, get } from "firebase/database";

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
  } = useContext(PVoiceContext);

  useEffect(() => {
    if (finalRecording) {
      const uploadFile = async () => {
        try {
          // Fetch the existing recording URL from Firebase Database
          const existingRecordingRef = refDB(
            FIREBASEDATABASE,
            "recordings/url"
          );
          const existingRecordingSnapshot = await get(existingRecordingRef);

          if (existingRecordingSnapshot.exists()) {
            const existingUrl = existingRecordingSnapshot.val();

            // Delete the existing recording from Firebase Storage
            const existingStorageRef = ref(FIREBASESTORAGE, existingUrl);
            await deleteObject(existingStorageRef);
            console.log("Deleted existing recording");
          }

          // Upload the new recording to Firebase Storage
          const storageRef = ref(
            FIREBASESTORAGE,
            `recordings/${Date.now()}.3gp`
          );
          const response = await fetch(finalRecording);
          const blob = await response.blob();

          await uploadBytes(storageRef, blob);
          const url = await getDownloadURL(storageRef);

          setUrl(url);
          console.log("File available at", url);

          // Update Firebase Database with the new recording URL
          await set(refDB(FIREBASEDATABASE, "recordings"), {
            url: url,
          });
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      uploadFile();
    }
  }, [finalRecording]);
  console.log(recordedSounds);

  const isAnyRecordActive = recordedSounds.some((item) => item.isActive);
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
              const { sound, duration, Time, isActive } = soundItem;

              const reverseIndex = recordedSounds.length - index;
              return (
                <PlayVoice
                  key={index}
                  title={`Play Recording ${reverseIndex}`}
                  onPress={() => playRecording(index)}
                  duration={duration}
                  time={Time}
                  handleDelete={() => deleteRecordedSound(index)}
                  isActive={isActive}
                  sound={sound}
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
              onPress={() => {
                if (isAnyRecordActive) {
                  navigation.navigate("Speaker Voice");
                } else {
                  Alert.alert(
                    "Alert",
                    "No active Recording.Click on any sound to activate it.",
                    [{ text: "OK" }]
                  );
                }
              }}
              hasRecording={Boolean(isAnyRecordActive)}>
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
