/** @format */

import React, { createContext, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ref, set, get } from "firebase/database";
import { FIREBASEDATABASE } from "../../firebase.config";
import { FIREBASE_PATHS } from "../constants/firebasePaths";
import { synthesizeSpeech } from "../services/tts.service";
import { useSound } from "../hooks/useSound";
import { useSpeakerList } from "../hooks/useSpeakerList";
import { ROUTES } from "../constants/routes";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleAudio, setScheduleAudio] = useState("");
  const [scheduleListView, setScheduleListView] = useState("");
  const [loadTime, setLoadTime] = useState(0);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedTimeDuration, setSelectedTimeDuration] = useState(0);
  const {
    speakers: schedSpeakers,
    toggleHandler,
    replaceSpeakers,
  } = useSpeakerList({ field: "text" });
  const { playDataUrl } = useSound();

  const updateScheduleText = useCallback(async () => {
    try {
      const snapshot = await get(
        ref(FIREBASEDATABASE, FIREBASE_PATHS.SCHEDULE_TEXT)
      );
      setScheduleAudio(snapshot.val()?.audioText || "");
    } catch (error) {
      console.error("Error updating schedule text:", error);
    }
  }, []);

  useEffect(() => {
    updateScheduleText();
  }, [updateScheduleText]);

  const convertTextToSpeech = async (textToConvert) => {
    const { dataUrl, durationMs } = await synthesizeSpeech(textToConvert);
    await playDataUrl(dataUrl);
    setLoadTime(durationMs);
  };

  const scheduleSave = async () => {
    const trimmedText = scheduleText.trim();

    if (!trimmedText) {
      Alert.alert("No Text Entered", "Please enter text to convert to audio.");
      return;
    }

    setScheduleLoading(true);

    setTimeout(() => {
      set(ref(FIREBASEDATABASE, FIREBASE_PATHS.SCHEDULE_TEXT), {
        audioText: trimmedText,
      });

      setScheduleAudio(trimmedText);
      setScheduleText("");

      convertTextToSpeech(trimmedText)
        .catch((error) =>
          console.error("Error converting text to speech:", error)
        )
        .finally(() => setScheduleLoading(false));
    }, loadTime);
  };

  const scheduleSpeak = async (text) => {
    try {
      await convertTextToSpeech(text);
    } catch (error) {
      console.error("Error speaking schedule audio:", error);
    }
  };

  const handleTimeDurationChange = (duration) => {
    setSelectedTimeDuration(duration);
  };

  const ScheduleAction = async (navigation) => {
    const selectedSpeakers = schedSpeakers.filter((speaker) => speaker.isOn);

    if (selectedSpeakers.length === 0) {
      Alert.alert("Alert", "Please choose a speaker to proceed", [
        { text: "OK" },
      ]);
      return;
    }

    if (
      selectedTimeDuration === null ||
      selectedTimeDuration === undefined ||
      selectedTimeDuration === 0
    ) {
      Alert.alert("Alert", "Please select a valid time duration to proceed", [
        { text: "OK" },
      ]);
      return;
    }

    if (!scheduleAudio) {
      Alert.alert("Alert", "No audio generated to announce", [{ text: "OK" }]);
      return;
    }

    // Update the text property of selected speakers
    const updatedSpeakers = schedSpeakers.map((speaker) =>
      speaker.isOn ? { ...speaker, text: scheduleAudio } : speaker
    );
    replaceSpeakers(updatedSpeakers);

    setScheduleListView({
      timeDuration: selectedTimeDuration,
      audio: scheduleAudio,
    });
    navigation.navigate(ROUTES.SCHEDULE_LIST_VIEW);
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleText,
        setScheduleText,
        scheduleAudio,
        scheduleListView,
        setScheduleListView,
        scheduleSave,
        scheduleLoading,
        scheduleSpeak,
        schedSpeakers,
        toggleHandler,
        handleTimeDurationChange,
        selectedTimeDuration,
        ScheduleAction,
        updateScheduleText,
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
