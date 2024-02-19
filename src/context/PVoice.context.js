/** @format */

import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState();
  const [myRecording, setMyRecording] = useState();
  const [recordingDuration, setRecordingDuration] = useState({
    duration: 0,
    timerId: null,
  });
  const [recordingTime, setRecordingTime] = useState(null);
  const [recordedSounds, setRecordedSounds] = useState([]);

  useEffect(() => {
    return () => {
      clearInterval(recordingDuration.timerId); // Cleanup on component unmount
    };
  }, []);

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

      // Start the timer
      const timerId = setInterval(() => {
        setRecordingDuration((prevDuration) => ({
          ...prevDuration,
          duration: prevDuration.duration + 1000, // Increment by 1 second (1000 milliseconds)
        }));
      }, 1000); // Update every second

      // Store the timer reference in a state
      setRecordingDuration((prevDuration) => ({
        ...prevDuration,
        timerId: timerId,
      }));

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
      setRecording(false);
      setMyRecording(sound);

      // Clear the interval timer
      clearInterval(recordingDuration.timerId);

      // Save the recorded sound to the array
      setRecordedSounds((prevRecordedSounds) => [
        ...prevRecordedSounds,
        { sound, duration: recordingDuration.duration / 1000 },
      ]);

      // Save the array of recorded sounds to AsyncStorage
      await AsyncStorage.setItem(
        "recordedSounds",
        JSON.stringify([
          ...recordedSounds,
          { sound, duration: recordingDuration.duration / 1000 },
        ])
      );
      console.log(recordedSounds);
      console.log(recordingDuration.duration);
      console.log("Recording stopped and sound created");
      // Set recording time to current time
      setRecordingTime(new Date().getTime());
      // Reset the recording duration
      setRecordingDuration({ duration: 0, timerId: null });
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function playRecording(index) {
    try {
      if (recordedSounds[index] && recordedSounds[index].sound) {
        console.log(`Playing recording at index ${index}..`);
        await recordedSounds[index].sound.replayAsync(); // Replay the sound at the specified index
        console.log("Recording playing");
      } else {
        console.error(`No recording found at index ${index}`);
      }
    } catch (err) {
      console.error("Error playing recording", err);
    }
  }

  async function clearRecordedSounds() {
    try {
      await AsyncStorage.removeItem("recordedSounds");
      setRecordedSounds([]);
      console.log("Recorded sounds cleared");
    } catch (error) {
      console.error("Error clearing recorded sounds:", error);
    }
  }

  useEffect(() => {
    // Load recorded sounds from AsyncStorage on component mount
    const loadRecordedSounds = async () => {
      try {
        const recordedSoundsString = await AsyncStorage.getItem(
          "recordedSounds"
        );
        if (recordedSoundsString) {
          const recordedSoundsArray = JSON.parse(recordedSoundsString);
          setRecordedSounds(recordedSoundsArray);
        }
      } catch (error) {
        console.error(
          "Error loading recorded sounds from AsyncStorage:",
          error
        );
      }
    };

    loadRecordedSounds();
  }, []);

  const contextValue = {
    recordingDuration: recordingDuration.duration,
    myRecording,
    recording,
    startRecording,
    stopRecording,
    playRecording,
    recordingTime,
    recordedSounds,
    clearRecordedSounds,
  };

  return (
    <PVoiceContext.Provider value={{ ...contextValue }}>
      {children}
    </PVoiceContext.Provider>
  );
};
