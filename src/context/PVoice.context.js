/** @format */

import React, { createContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { STORAGE_KEYS, loadJson, saveJson, removeItem } from "../services/storage.service";

export const PVoiceContext = createContext();

export const PVoiceContextProvider = ({ children }) => {
  const [recording, setRecording] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState({
    duration: 0,
    timerId: null,
  });
  const [recordingTime, setRecordingTime] = useState(null);
  const [recordedSounds, setRecordedSounds] = useState([]);
  const [finalRecording, setFinalRecording] = useState(null);
  const [url, setUrl] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState("");
  const recordingStartedAtRef = useRef(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access microphone not granted");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      recordingStartedAtRef.current = Date.now();

      // Tick the on-screen duration every second while recording
      const timerId = setInterval(() => {
        setRecordingDuration((prev) => ({
          ...prev,
          duration: prev.duration + 1000,
        }));
      }, 1000);
      setRecordingDuration({ duration: 0, timerId });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      clearInterval(recordingDuration.timerId);

      const soundUri = recording.getURI();
      const timeNow = Date.now();
      // Derive the real elapsed duration instead of relying on tick counts
      const durationSeconds = recordingStartedAtRef.current
        ? Math.round((timeNow - recordingStartedAtRef.current) / 1000)
        : Math.round(recordingDuration.duration / 1000);

      setRecording(null);
      setRecordingTime(timeNow);

      const updatedSounds = [
        {
          sound: soundUri,
          duration: durationSeconds,
          time: timeNow,
          isActive: true,
        },
        ...recordedSounds.map((item) => ({ ...item, isActive: false })),
      ];
      setRecordedSounds(updatedSounds);
      setFinalRecording(soundUri);
      await saveJson(STORAGE_KEYS.RECORDED_SOUNDS, updatedSounds);

      setRecordingDuration({ duration: 0, timerId: null });
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const persistAndSetActive = async (sounds, activeIndex) => {
    const updated = sounds.map((item, i) => ({
      ...item,
      isActive: i === activeIndex,
    }));
    await saveJson(STORAGE_KEYS.RECORDED_SOUNDS, updated);
    setRecordedSounds(updated);
    return updated;
  };

  const playRecording = async (index) => {
    try {
      const storedSounds = await loadJson(STORAGE_KEYS.RECORDED_SOUNDS, []);
      const target = storedSounds[index];
      if (!target || !target.sound) {
        console.error(`No recording found at index ${index}`);
        return;
      }

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: target.sound });
      await soundObject.playAsync();

      await persistAndSetActive(storedSounds, index);
      setFinalRecording(target.sound);
    } catch (err) {
      console.error("Error playing recording", err);
    }
  };

  const clearRecordedSounds = async () => {
    try {
      await removeItem(STORAGE_KEYS.RECORDED_SOUNDS);
      setRecordedSounds([]);
    } catch (error) {
      console.error("Error clearing recorded sounds:", error);
    }
  };

  const deleteRecordedSound = async (index) => {
    try {
      const updatedSounds = [...recordedSounds];
      updatedSounds.splice(index, 1);
      setRecordedSounds(updatedSounds);
      await saveJson(STORAGE_KEYS.RECORDED_SOUNDS, updatedSounds);
    } catch (error) {
      console.error("Error deleting recorded sound:", error);
    }
  };

  const deleteActiveRecordedSound = () => {
    const index = recordedSounds.findIndex((item) => item.isActive);
    if (index !== -1) {
      deleteRecordedSound(index);
    }
  };

  useEffect(() => {
    const loadRecordedSounds = async () => {
      const stored = await loadJson(STORAGE_KEYS.RECORDED_SOUNDS, []);
      if (stored.length > 0) {
        setRecordedSounds(stored);
      }
    };
    loadRecordedSounds();
  }, []);

  // Always clear the running duration interval when it changes/unmounts
  useEffect(() => {
    return () => {
      if (recordingDuration.timerId) {
        clearInterval(recordingDuration.timerId);
      }
    };
  }, [recordingDuration.timerId]);

  return (
    <PVoiceContext.Provider
      value={{
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
        convertedUrl,
        setConvertedUrl,
      }}>
      {children}
    </PVoiceContext.Provider>
  );
};
