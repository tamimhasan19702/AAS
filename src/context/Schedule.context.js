/** @format */

import { createContext, useState } from "react";
import { FIREBASEDATABASE } from "../../firebase.config";
import { Audio } from "expo-av";
import { ref, set, onValue, get } from "firebase/database";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleAudio, setScheduleAudio] = useState("");
  const [scheduleListView, setScheduleListView] = useState([]);
  const [loadTime, setLoadTime] = useState(0);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const sound = new Audio.Sound();

  const updateScheduleAudioText = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "scheduleText"));
      const responseText = snapshot.val()?.scheduleText || "";
      console.log("scheduleText from Firebase:", responseText);
      setScheduleAudio(responseText);
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
        ? "https://azure-rhinoceros-tutu.cyclic.app"
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
    setScheduleLoading(true);
    setTimeout(() => {
      convertTextToSpeech(scheduleText);
      setScheduleText("");
      set(ref(FIREBASEDATABASE, "scheduleText"), {
        audioText: scheduleText,
      });
      setScheduleLoading(false);
      return "";
      updateScheduleAudioText();
    }, loadTime);
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleText,
        setScheduleText,
        scheduleAudio,
        scheduleListView,
        scheduleSave,
        scheduleLoading,
        scheduleAudio,
        updateScheduleAudioText,
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
