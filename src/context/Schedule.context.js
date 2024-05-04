/** @format */

import { createContext, useEffect, useState } from "react";
import { FIREBASEDATABASE } from "../../firebase.config";
import { Audio } from "expo-av";
import { ref, set, onValue, get } from "firebase/database";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleAudio, setScheduleAudio] = useState("");
  const [scheduleListView, setScheduleListView] = useState("");
  const [loadTime, setLoadTime] = useState(0);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [selectedTimeDuration, setSelectedTimeDuration] = useState(0);

  const [schedSpeakers, setSchedSpeakers] = useState([
    { no: 1, isOn: false, text: "" },
    { no: 2, isOn: false, text: "" },
    { no: 3, isOn: false, text: "" },
    { no: 4, isOn: false, text: "" },
    { no: 5, isOn: false, text: "" },
  ]);

  const sound = new Audio.Sound();

  const updateScheduleText = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "scheduleText"));

      setScheduleAudio(snapshot.val()?.audioText || "");
    } catch (error) {
      console.error("Error updating audio text:", error);
    }
  };

  const convertTextToSpeech = async (textToConvert) => {
    try {
      if (!textToConvert) {
        console.error("Text to convert is null or empty");
        return;
      }
      const startTime = performance.now();
      const isLive = true;
      const baseUrl = isLive
        ? "https://aas-backend-git-main-tamimhasan19702s-projects.vercel.app/"
        : "http://http://192.168.63.129:3000/";
      const response = await fetch(
        `${baseUrl}/speech?text=${encodeURIComponent(textToConvert)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const audioResponse = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        if (!reader.result) {
          console.error("Audio response is null or empty");
          return;
        }
        const base64Data = reader.result;
        await sound.unloadAsync(); // Unload any previous audio
        await sound.loadAsync({ uri: base64Data }); // Load the new audio
        await sound.playAsync(); // Play the audio

        const endTime = performance.now();
        setLoadTime(endTime - startTime);
      };
      reader.readAsDataURL(audioResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleSave = async () => {
    const trimmedText = scheduleText.trim();

    if (!trimmedText) {
      Alert.alert("No Text Entered", "Please enter text to convert to audio.");
      return;
    }

    setScheduleLoading(true);

    setTimeout(() => {
      convertTextToSpeech(trimmedText);

      set(ref(FIREBASEDATABASE, "scheduleText"), {
        audioText: trimmedText,
      });

      setScheduleAudio(trimmedText);

      setScheduleText("");

      setScheduleLoading(false);
    }, loadTime);

    await AsyncStorage.setItem("scheduleAudio", JSON.stringify(scheduleAudio));
  };

  const scheduleSpeak = async (text) => {
    convertTextToSpeech(text);
  };

  const toggleHandler = (speakerNo, audio) => {
    setSchedSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.no === speakerNo
          ? {
              ...speaker,
              isOn: speaker.isOn ? false : true,
              text: speaker.isOn ? "" : audio,
            }
          : speaker
      )
    );
  };

  const handleTimeDurationChange = (duration) => {
    setSelectedTimeDuration(duration);
  };

  const ScheduleAction = async (navigation) => {
    if (!schedSpeakers) {
      console.error("schedSpeakers is null or undefined");
      return;
    }

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

    try {
      // Update the text property of selected speakers
      const updatedSpeakers = schedSpeakers.map((speaker) =>
        speaker.isOn ? { ...speaker, text: scheduleAudio } : speaker
      );

      setSchedSpeakers(updatedSpeakers);

      // Navigate to the Schedule ListView screen
      navigation.navigate("Schedule ListView");

      // Set the scheduleListView state with the selected duration and audio
      setScheduleListView({
        timeDuration: selectedTimeDuration,
        audio: scheduleAudio,
      });
    } catch (error) {
      console.error("Error updating speakers and navigating", error);
    }
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
