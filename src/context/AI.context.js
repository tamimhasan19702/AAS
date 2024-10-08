/** @format */

import React, { createContext, useState, useCallback, useEffect } from "react";
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
      // https://aas-backend-git-main-tamimhasan19702s-projects.vercel.app/
      // const spareApi =
      //   "https://aas-backend-copy-hze8iz77e-tareqs-projects-4295e8be.vercel.app/";
      const baseUrl = isLive
        ? "https://aas-backend-git-main-tamimhasan19702s-projects.vercel.app/"
        : "http://192.168.0.107:3000/";
      const response = await fetch(
        `${baseUrl}/speech?text="${encodeURIComponent(textToConvert)}"`
      );

      const audioResponse = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        await sound.unloadAsync();
        await sound.loadAsync({ uri: base64Data });
        await sound.playAsync();

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

        setAudio(newText);

        // Convert text to speech
        convertTextToSpeech(newText);

        // Get the current date and time
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");

        // Format the date and time string
        const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}`;

        // Update preset array in Firebase
        const updatedPresetArray = [
          { text: newText, isActive: true, updateTime: formattedTime }, // Include updateTime for the new item
          ...presetArray.map((item) => ({ ...item, isActive: false })),
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

      // Update audio text in Firebase
      set(ref(FIREBASEDATABASE, "audioText"), {
        audioText: presetText || "",
      });

      setPresetArray((prevArray) => {
        const updatedArray = prevArray.map((item) => ({
          text: item.text,
          isActive: item.text === presetText,
          updateTime: item.updateTime,
        }));
        set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
        setAudio("");
        setPresetLoading(false);
        return updatedArray;
      });
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

  const deleteActivePreset = () => {
    setPresetArray((prevArray) => {
      const updatedArray = prevArray.filter((item) => !item.isActive);
      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
      return updatedArray; // Return the updated state value
    });
  };

  useEffect(() => {
    updateAudioText();
    getArrayFromFirebase();
  }, [audio]);

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
    deleteActivePreset,
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
