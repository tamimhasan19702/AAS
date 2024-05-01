/** @format */

import { createContext, useState } from "react";
import { FIREBASEDATABASE } from "../../firebase.config";
import { Audio } from "expo-av";
import { ref, set, onValue, get } from "firebase/database";
import { Alert } from "react-native";

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
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
