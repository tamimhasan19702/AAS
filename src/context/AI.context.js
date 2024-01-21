/** @format */

import React, { createContext, useContext, useState } from "react";

export const AiContext = createContext();

export const AiContextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);
  const [presetArray, setPresetArray] = useState([]);
  const [presetLoading, setPresetLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);

  const contextValue = {
    text,
    setText,
    audio,
    setAudio,
    saveloading,
    setSaveLoading,
    speakloading,
    setSpeakLoading,
    presetArray,
    setPresetArray,
    presetLoading,
    setPresetLoading,
    loadTime,
    setLoadTime,
  };

  return (
    <AiContext.Provider value={contextValue}>{children}</AiContext.Provider>
  );
};
