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
  listAll,
  deleteObject,
} from "firebase/storage";
import { set, ref as refDB, get } from "firebase/database";
import VideoToAudio from "video-to-audio";

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

  const convertToMp3 = async (firebaseUrl) => {
    try {
      // Fetch the existing MP3 file URL from Firebase Database
      const existingMp3Ref = refDB(FIREBASEDATABASE, "converted/url");
      const existingMp3Snapshot = await get(existingMp3Ref);

      if (existingMp3Snapshot.exists()) {
        const existingMp3Url = existingMp3Snapshot.val();

        // Delete the existing MP3 file from Firebase Storage
        try {
          const existingMp3StorageRef = ref(FIREBASESTORAGE, existingMp3Url);
          await deleteObject(existingMp3StorageRef);
        } catch (error) {
          if (error.code === "storage/object-not-found") {
            console.log("No existing MP3 file found in Firebase Storage.");
          } else {
            throw error; // Other errors should be re-thrown
          }
        }
      } else {
        console.log("No existing MP3 file found in Realtime Database.");
      }

      // Convert the 3GP file to MP3
      const response = await fetch("https://aas-backend.vercel.app/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileUrl: firebaseUrl }),
      });

      const blob = await response.blob();
      const mp3FileName = `converted_file_${Date.now()}.mp3`;
      const mp3StorageRef = ref(FIREBASESTORAGE, `converted/${mp3FileName}`);
      await uploadBytes(mp3StorageRef, blob);
      const mp3DownloadUrl = await getDownloadURL(mp3StorageRef);
      setConverted(true);
      // Update Firebase Database with the new MP3 file URL
      await set(refDB(FIREBASEDATABASE, "converted"), {
        url: mp3DownloadUrl,
      });
      setConvertedUrl(mp3DownloadUrl);
    } catch (error) {
      console.error("Error during MP3 file conversion:", error);
    }
  };

  useEffect(() => {
    if (finalRecording) {
      console.log("Fin ", finalRecording);
      console.log("recorded ", recordedSounds);
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

            try {
              // Attempt to delete the existing recording from Firebase Storage
              const existingStorageRef = ref(FIREBASESTORAGE, existingUrl);
              await deleteObject(existingStorageRef);
              console.log("Deleted existing recording");
            } catch (error) {
              // If the object doesn't exist, handle the error
              if (error.code === "storage/object-not-found") {
                console.log("No existing recording found in Firebase Storage.");
              } else {
                throw error; // Other errors should still be thrown
              }
            }
          }

          // Proceed to upload the new recording
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

          await convertToMp3(url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      uploadFile();
    }
  }, [finalRecording]);

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
              const { sound, duration, time, isActive } = soundItem;
              console.log(soundItem);
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
