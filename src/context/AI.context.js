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

        // Update preset array in Firebase
        const updatedPresetArray = [newText, ...presetArray];
        set(ref(FIREBASEDATABASE, "presetArray"), updatedPresetArray);

        setPresetArray(updatedPresetArray);
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
  const saveAndSpeak = useCallback(
    ({ presetText }) => {
      setPresetLoading(true);
      convertTextToSpeech(presetText || ""); // Convert text to speech immediately

      setTimeout(() => {
        setPresetArray((prevArray) => {
          const newElement =
            presetText || prevArray[prevArray.length - 1] || "";
          set(ref(FIREBASEDATABASE, "audioText"), { audioText: newElement });
          setAudio("");
          setPresetLoading(false);
          return [...prevArray, newElement];
        });
      }, loadTime);
    },
    [convertTextToSpeech, loadTime]
  );

  const PresetSave = () => {
    if (text === "") {
      return null;
    }

    setPresetArray((prevArray) => {
      const updatedArray = [text, ...prevArray];

      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
      return updatedArray;
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
    loadTime,
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
    <AiContext.Provider
      value={{
        ...contextValue,
      }}>
      {children}
    </AiContext.Provider>
  );
};
