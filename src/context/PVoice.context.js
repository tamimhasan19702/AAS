/** @format */

import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { FFmpegKit } from "ffmpeg-kit-react-native";

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState();
  const [finalRecording, setFinalRecording] = useState();
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
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        {
          format: "wav", // Specify the format as WAV
          sampleRate: 44100, // Optional: specify the sample rate
          bitrate: 128000, // Optional: specify the bitrate
        }
      );
      await recording.startAsync();

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

      // Get the URI of the recorded audio file (3GP format)
      const sound = await recording.getURI();
      console.log("Sound URI:", sound);

      if (!sound) {
        console.error("No sound recorded. Please try again.");
        return;
      }

      setRecording(false);

      // Clear the interval timer
      clearInterval(recordingDuration.timerId);

      // Set recording time to current time
      const Time = new Date().getTime();
      setRecordingTime(Time);

      // Update the recorded sounds with the new recording as active
      const newRecordedSounds = [
        {
          sound,
          duration: recordingDuration.duration / 1000,
          Time,
          isActive: true,
        },
        ...recordedSounds.map((sound) => ({ ...sound, isActive: false })),
      ];
      setRecordedSounds(newRecordedSounds);

      // Save the final recording URI
      setFinalRecording(sound);

      // Save the array of recorded sounds to AsyncStorage
      await AsyncStorage.setItem(
        "recordedSounds",
        JSON.stringify(newRecordedSounds)
      );

      console.log("Recording stopped and sound created");

      // Reset the recording duration
      setRecordingDuration({ duration: 0, timerId: null });
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
          await soundObject.playAsync();
          console.log("Recording playing");

          // Update isActive for the played recording
          setRecordedSounds((prevRecordedSounds) =>
            prevRecordedSounds.map((item, i) => ({
              ...item,
              isActive: i === index,
            }))
          );
          //saving a final recording
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
      // Make a copy of the recordedSounds array
      const updatedSounds = [...recordedSounds];
      // Remove the element at the specified index
      updatedSounds.splice(index, 1);
      // Update the recordedSounds state with the modified array
      setRecordedSounds(updatedSounds);
      // Update AsyncStorage with the modified array
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
    clearInterval(recordingDuration.timerId);
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
    url,
    setUrl,
    deleteActiveRecordedSound,
  };

  return (
    <PVoiceContext.Provider value={{ ...contextValue }}>
      {children}
    </PVoiceContext.Provider>
  );
};
