/** @format */

import React, { createContext, useState } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isPlaying, setIsPlaying] = useState(false);
  const [myRecord, setMyRecord] = useState(null);
  console.log(myRecord);
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
      setMyRecord(uri);
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

      // Automatically turn off the sound after playing once
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } catch (error) {
      console.error("Error playing sound", error);
    }
  }

  async function stopSound() {
    try {
      if (sound && isPlaying) {
        console.log("Stopping sound..");
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error stopping sound", error);
    }
  }

  const contextValue = {
    recording,
    sound,
    startRecording,
    stopRecording,
    playSound,
    stopSound,
    myRecord,
  };

  return (
    <PVoiceContext.Provider value={{ ...contextValue }}>
      {children}
    </PVoiceContext.Provider>
  );
};
