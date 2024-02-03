/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";
import { Audio } from "expo-av";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isPlaying, setIsPlaying] = useState(false);

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      await playSound(uri); // Play the recorded sound
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function playSound(uri) {
    try {
      console.log("Loading sound..");
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      console.log("Playing sound..");
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound", error);
    }
  }

  async function stopSound() {
    try {
      if (sound) {
        if (isPlaying) {
          console.log("Stopping sound..");
          await sound.stopAsync();
        } else {
          console.log("Resuming sound..");
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Error stopping sound", error);
    }
  }

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
        <Button
          title={isPlaying ? "Stop Sound" : "Start Sound"}
          onPress={stopSound}
        />
      </VoiceScreenView>
    </SafeView>
  );
};
