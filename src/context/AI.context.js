/** @format */

import React, { createContext, useState, useCallback, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { FIREBASEDATABASE } from "../../firebase.config";
import { FIREBASE_PATHS } from "../constants/firebasePaths";
import { synthesizeSpeech } from "../services/tts.service";
import { useSound } from "../hooks/useSound";
import { formatCurrentTimestamp } from "../utils/date";

export const AiContext = createContext();

export const AiContextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);
  const [presetArray, setPresetArray] = useState([]);
  const [presetLoading, setPresetLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const { playDataUrl } = useSound();

  const updateAudioText = useCallback(async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, FIREBASE_PATHS.AUDIO_TEXT));
      const responseText = snapshot.val()?.audioText || "";
      setAudio(responseText);
    } catch (error) {
      console.error("Error updating audio text:", error);
    }
  }, []);

  const getArrayFromFirebase = useCallback(async () => {
    try {
      const snapshot = await get(
        ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY)
      );
      if (snapshot.exists()) {
        setPresetArray(snapshot.val());
      }
    } catch (error) {
      console.error("Error getting array from Firebase:", error);
    }
  }, []);

  useEffect(() => {
    updateAudioText();
    getArrayFromFirebase();
  }, [updateAudioText, getArrayFromFirebase]);

  const convertTextToSpeech = async (textToConvert) => {
    const { dataUrl, durationMs } = await synthesizeSpeech(textToConvert);
    await playDataUrl(dataUrl);
    setLoadTime(durationMs);
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
        set(ref(FIREBASEDATABASE, FIREBASE_PATHS.AUDIO_TEXT), {
          audioText: newText,
        });

        setAudio(newText);

        // Convert text to speech (errors are logged inside)
        convertTextToSpeech(newText).catch((error) =>
          console.error("Error converting text to speech:", error)
        );

        // Update preset array in Firebase with the new active preset first
        const updatedPresetArray = [
          { text: newText, isActive: true, updateTime: formatCurrentTimestamp() },
          ...presetArray.map((item) => ({ ...item, isActive: false })),
        ];
        set(ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY), updatedPresetArray);

        setPresetArray(updatedPresetArray);

        setSaveLoading(false);
        return "";
      });
    }, loadTime);
  };

  const speak = async ({ presetText }) => {
    setPresetLoading(true);
    try {
      await convertTextToSpeech(presetText || "");

      // Update audio text in Firebase
      set(ref(FIREBASEDATABASE, FIREBASE_PATHS.AUDIO_TEXT), {
        audioText: presetText || "",
      });

      const updatedArray = presetArray.map((item) => ({
        text: item.text,
        isActive: item.text === presetText,
        updateTime: item.updateTime,
      }));
      set(ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY), updatedArray);
      setPresetArray(updatedArray);
      setAudio("");
    } catch (error) {
      console.error("Error converting text to speech:", error);
    } finally {
      setPresetLoading(false);
    }
  };

  const clearPreset = () => {
    set(ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY), []);
    setPresetArray([]);
  };

  const handleDelete = (index) => {
    const updatedArray = presetArray
      .slice(0, index)
      .concat(presetArray.slice(index + 1));
    set(ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY), updatedArray);
    setPresetArray(updatedArray);
  };

  const deleteActivePreset = () => {
    const updatedArray = presetArray.filter((item) => !item.isActive);
    set(ref(FIREBASEDATABASE, FIREBASE_PATHS.PRESET_ARRAY), updatedArray);
    setPresetArray(updatedArray);
  };

  return (
    <AiContext.Provider
      value={{
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
      }}>
      {children}
    </AiContext.Provider>
  );
};
