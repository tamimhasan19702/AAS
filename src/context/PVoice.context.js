/** @format */

import React, { createContext, useState } from "react";
import { Audio } from "expo-av";
export const PVoiceContext = createContext();

export const PVoiceContextProvider = ({ children }) => {
  const contextValue = {};

  return (
    <PVoiceContext.Provider value={{ ...contextValue }}>
      {children}
    </PVoiceContext.Provider>
  );
};
