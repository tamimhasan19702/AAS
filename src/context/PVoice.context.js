/** @format */
import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(null);
  const [finalRecording, setFinalRecording] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState({
    duration: 0,
    timerId: null,
  });
  const [recordingTime, setRecordingTime] = useState(null);
  const [recordedSounds, setRecordedSounds] = useState([]);
  const [url, setUrl] = useState(null);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access microphone not granted");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);

      // Start the timer
      const timerId = setInterval(() => {
        setRecordingDuration((prevDuration) => ({
          ...prevDuration,
          duration: prevDuration.duration + 1000, // Increment by 1 second
        }));
      }, 1000);
      setRecordingDuration((prevDuration) => ({ ...prevDuration, timerId }));

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording...");
      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

        const soundUri = recording.getURI();
        console.log("Sound URI:", soundUri);

        setRecording(null);
        clearInterval(recordingDuration.timerId); // Clear the timer

        const timeNow = new Date().getTime();
        setRecordingTime(timeNow);

        const newRecordedSounds = [
          {
            sound: soundUri,
            duration: recordingDuration.duration / 1000,
            time: timeNow,
            isActive: true,
          },
          ...recordedSounds.map((sound) => ({ ...sound, isActive: false })),
        ];
        setRecordedSounds(newRecordedSounds);
        setFinalRecording(soundUri);

        await AsyncStorage.setItem(
          "recordedSounds",
          JSON.stringify(newRecordedSounds)
        );

        console.log("Recording stopped and sound created");
        setRecordingDuration({ duration: 0, timerId: null });
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  async function playRecording(index) {
    try {
      // Retrieve recordedSounds from AsyncStorage
      const recordedSoundsString = await AsyncStorage.getItem("recordedSounds");
      if (recordedSoundsString) {
        const recordedSoundsArray = JSON.parse(recordedSoundsString);
        console.log("recordedSounds from AsyncStorage:", recordedSoundsArray);

        if (recordedSoundsArray[index] && recordedSoundsArray[index].sound) {
          console.log(`Playing recording at index ${index}..`);

          const soundObject = new Audio.Sound();
          await soundObject.loadAsync({
            uri: recordedSoundsArray[index].sound,
          });

          // Play the recording
          await soundObject.playAsync();
          console.log("Recording playing");

          // Update the isActive status of all recordings
          const updatedRecordedSounds = recordedSoundsArray.map((item, i) => ({
            ...item,
            isActive: i === index, // Set isActive to true only for the played recording
          }));

          // Save the updated recorded sounds to AsyncStorage
          await AsyncStorage.setItem(
            "recordedSounds",
            JSON.stringify(updatedRecordedSounds)
          );

          // Update the recordedSounds state
          setRecordedSounds(updatedRecordedSounds);

          // Set the finalRecording to the current recording
          setFinalRecording(recordedSoundsArray[index].sound);
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

  async function clearRecordedSounds() {
    try {
      await AsyncStorage.removeItem("recordedSounds");
      setRecordedSounds([]);
      console.log("Recorded sounds cleared");
    } catch (error) {
      console.error("Error clearing recorded sounds:", error);
    }
  }

  async function deleteRecordedSound(index) {
    try {
      const updatedSounds = [...recordedSounds];
      updatedSounds.splice(index, 1);
      setRecordedSounds(updatedSounds);
      await AsyncStorage.setItem(
        "recordedSounds",
        JSON.stringify(updatedSounds)
      );
      console.log(`Deleted recording at index ${index}`);
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

    return () => {
      if (recordingDuration.timerId) clearInterval(recordingDuration.timerId);
    };
  }, [recordingDuration.timerId]);

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
    url,
    setUrl,
    deleteActiveRecordedSound,
  };

  return (
    <PVoiceContext.Provider value={contextValue}>
      {children}
    </PVoiceContext.Provider>
  );
};
