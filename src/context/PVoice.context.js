/** @format */

import React, { createContext, useState } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [myRecording, setMyRecording] = useState();
  const [recordingDuration, setRecordingDuration] = useState(0);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Requesting permission..");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      console.log(recording);
      setRecording(recording);

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const { sound } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      setRecording(false);
      setMyRecording(sound); // Save the sound in myRecording state
      console.log("Recording stopped and sound created");
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function playRecording() {
    try {
      if (myRecording) {
        console.log("Playing recording..");
        await myRecording.replayAsync(); // Replay the sound
        console.log("Recording playing");
      }
    } catch (err) {
      console.error("Error playing recording", err);
    }
  }
  const contextValue = {
    recordingDuration,
    myRecording,
    recording,
    sound,
    startRecording,
    stopRecording,
    playRecording,
  };

  return (
    <PVoiceContext.Provider value={{ ...contextValue }}>
      {children}
    </PVoiceContext.Provider>
  );
};
