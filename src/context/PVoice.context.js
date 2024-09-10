/** @format */

import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PVoiceContext = createContext();

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(null);
  const [finalRecording, setFinalRecording] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState({
    duration: 0,
    timerId: null,
  });
  const [recordingTime, setRecordingTime] = useState(null);
  const [recordedSounds, setRecordedSounds] = useState([]);
  const [sound, setSound] = useState(null);

  // Start recording
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        console.log("Starting recording..");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        console.log("Recording started");

        // Start the timer
        const timerId = setInterval(() => {
          setRecordingDuration((prevDuration) => ({
            ...prevDuration,
            duration: prevDuration.duration + 1000, // Increment by 1 second
          }));
        }, 1000);

        setRecordingDuration((prevDuration) => ({
          ...prevDuration,
          timerId,
        }));
      } else {
        console.error("Recording permission not granted");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // Stop recording
  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      setRecording(null);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setFinalRecording(uri);

      clearInterval(recordingDuration.timerId);

      // Set recording time to current time
      const Time = new Date().getTime();
      setRecordingTime(Time);

      const newRecordedSounds = [
        {
          sound: uri, // file path of the recorded audio
          duration: recordingDuration.duration / 1000, // in seconds
          Time,
          isActive: true,
        },
        ...recordedSounds.map((sound) => ({ ...sound, isActive: false })),
      ];

      setRecordedSounds(newRecordedSounds);

      await AsyncStorage.setItem(
        "recordedSounds",
        JSON.stringify(newRecordedSounds)
      );

      setRecordingDuration({ duration: 0, timerId: null });
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  // Play recorded sound
  async function playRecording(index) {
    try {
      const recordedSoundsString = await AsyncStorage.getItem("recordedSounds");
      if (recordedSoundsString) {
        const recordedSoundsArray = JSON.parse(recordedSoundsString);
        const filePath = recordedSoundsArray[index]?.sound;
        if (filePath) {
          console.log(`Playing recording at index ${index}..`);

          // Unload previous sound if playing
          if (sound) {
            await sound.unloadAsync();
          }

          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: filePath },
            { shouldPlay: true }
          );
          setSound(newSound);
        } else {
          console.error(`No recording found at index ${index}`);
        }
      } else {
        console.error("No recordedSounds found in AsyncStorage");
      }
    } catch (err) {
      console.error("Error playing recording", err);
    }
  }

  // Clear recorded sounds
  async function clearRecordedSounds() {
    try {
      await AsyncStorage.removeItem("recordedSounds");
      setRecordedSounds([]);
      console.log("Recorded sounds cleared");
    } catch (error) {
      console.error("Error clearing recorded sounds:", error);
    }
  }

  // Delete recorded sound
  async function deleteRecordedSound(index) {
    try {
      const updatedSounds = [...recordedSounds];
      updatedSounds.splice(index, 1);
      setRecordedSounds(updatedSounds);
      await AsyncStorage.setItem(
        "recordedSounds",
        JSON.stringify(updatedSounds)
      );
    } catch (error) {
      console.error("Error deleting recorded sound:", error);
    }
  }

  const deleteActiveRecordedSound = () => {
    const index = recordedSounds.findIndex((sound) => sound.isActive);
    if (index !== -1) {
      deleteRecordedSound(index);
    }
  };

  useEffect(() => {
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
    clearInterval(recordingDuration.timerId);

    return () => {
      // Unload sound to free up memory
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const contextValue = {
    recordingDuration: recordingDuration.duration,
    finalRecording,
    recording,
    startRecording,
    stopRecording,
    playRecording,
    recordingTime,
    recordedSounds,
    clearRecordedSounds,
    deleteRecordedSound,
    deleteActiveRecordedSound,
  };

  return (
    <PVoiceContext.Provider value={contextValue}>
      {children}
    </PVoiceContext.Provider>
  );
};
