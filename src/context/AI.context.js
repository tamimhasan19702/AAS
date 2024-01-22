/** @format */

import React, { createContext, useState } from "react";
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
        set(ref(FIREBASEDATABASE, "audioText"), {
          audioText: prevText,
        });
        convertTextToSpeech(prevText);
        setAudio("");
        setSaveLoading(false);
        return ""; // Return the updated state value
      });
    }, loadTime);
  };

  const speak = () => {
    setSpeakLoading(true);
    setTimeout(() => {
      convertTextToSpeech(audio);
      setSpeakLoading(false);
      setAudio("");
    }, loadTime);
  };

  const saveAndSpeak = ({ presetText }) => {
    setPresetLoading(true);
    setTimeout(() => {
      setPresetArray((prevArray) => {
        set(ref(FIREBASEDATABASE, "audioText"), {
          audioText: presetText || prevArray[prevArray.length - 1] || "",
        });
        convertTextToSpeech(
          presetText || prevArray[prevArray.length - 1] || ""
        );
        setAudio("");
        setPresetLoading(false);
        return [
          ...prevArray,
          presetText || prevArray[prevArray.length - 1] || "",
        ]; // Return the updated state value
      });
    }, loadTime);
  };
  const PresetSave = () => {
    if (text === "") {
      return null;
    }
    setPresetArray((prevArray) => {
      const updatedArray = [...prevArray, text];
      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
      return updatedArray; // Return the updated state value
    });
    setText("");
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
    updateAudioText,
    getArrayFromFirebase,
    presetLoading,
    save,
    speak,
    saveAndSpeak,
    PresetSave,
    clearPreset,
    handleDelete,
  };

  return (
    <AiContext.Provider value={contextValue}>{children}</AiContext.Provider>
  );
};
