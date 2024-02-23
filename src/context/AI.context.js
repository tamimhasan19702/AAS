/** @format */

import React, { createContext, useState, useCallback } from "react";
import { Audio } from "expo-av";
import { ref, set, onValue, get } from "firebase/database";
import { FIREBASEDATABASE } from "../../firebase.config";

export const AiContext = createContext();

export const AiContextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);
  const [presetArray, setPresetArray] = useState([]);
  const [presetLoading, setPresetLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  const sound = new Audio.Sound();

  const updateAudioText = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "audioText"));
      const responseText = snapshot.val()?.audioText || "";
      setAudio(responseText);
    } catch (error) {
      console.error("Error updating audio text:", error);
    }
  };

  const getArrayFromFirebase = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "presetArray"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPresetArray(data);
      }
    } catch (error) {
      console.error("Error getting array from Firebase:", error);
    }
  };

  const convertTextToSpeech = async (textToConvert) => {
    try {
      const startTime = performance.now();
      const isLive = true;
      const baseUrl = isLive
        ? "https://azure-rhinoceros-tutu.cyclic.app"
        : "http://http://192.168.63.129:3000/";
      const response = await fetch(
        `${baseUrl}/speech?text=${encodeURIComponent(textToConvert)}`
      );
      const audioResponse = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
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

  const save = () => {
    setSaveLoading(true);
    setTimeout(() => {
      setText((prevText) => {
        const newText = prevText.trim();
        if (newText === "") {
          setSaveLoading(false);
          return "";
        }

        // Update audio text in Firebase
        set(ref(FIREBASEDATABASE, "audioText"), {
          audioText: newText,
        });

        // Convert text to speech
        convertTextToSpeech(newText);

        // Find the index of the active item
        const activeIndex = presetArray.findIndex((item) => item.isActive);

        // Update preset array in Firebase
        const updatedPresetArray = [
          { text: newText, isActive: true },
          ...presetArray.map((item, index) => ({
            ...item,
            isActive: index === activeIndex ? false : item.isActive,
          })),
        ];
        set(ref(FIREBASEDATABASE, "presetArray"), updatedPresetArray);

        setPresetArray(updatedPresetArray);
        setSaveLoading(false);
        return ""; // Return the updated state value
      });
    }, loadTime);
  };

  const speak = async ({ presetText }) => {
    setPresetLoading(true);
    try {
      await convertTextToSpeech(presetText || ""); // Convert text to speech immediately

      // Update preset array in Firebase
      const updatedArray = presetArray.map((item) => ({
        text: item.text,
        isActive: item.text === presetText,
      }));
      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);

      // Update audio text in Firebase
      set(ref(FIREBASEDATABASE, "audioText"), {
        audioText: presetText,
      });

      setAudio("");
      setPresetLoading(false);
      setPresetArray(updatedArray);
    } catch (error) {
      console.error("Error converting text to speech:", error);
      setPresetLoading(false);
    }
  };

  const clearPreset = () => {
    setPresetArray((prevArray) => {
      set(ref(FIREBASEDATABASE, "presetArray"), []);
      return []; // Return the updated state value
    });
  };

  const handleDelete = (index) => {
    setPresetArray((prevArray) => {
      const updatedArray = prevArray
        .slice(0, index)
        .concat(prevArray.slice(index + 1));
      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
      return updatedArray; // Return the updated state value
    });
  };

  const contextValue = {
    text,
    setText,
    audio,
    saveloading,
    speakloading,
    presetArray,
    loadTime,
    updateAudioText,
    getArrayFromFirebase,
    presetLoading,
    save,
    speak,
    clearPreset,
    handleDelete,
  };

  return (
    <AiContext.Provider
      value={{
        ...contextValue,
      }}>
      {children}
    </AiContext.Provider>
  );
};
