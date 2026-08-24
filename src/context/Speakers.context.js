/** @format */

import React, { createContext } from "react";
import { useSpeakerList } from "../hooks/useSpeakerList";

// Both speaker flows share identical state/actions; they differ only in the
// payload field name ("text" for AI announcements, "voice" for recordings).

export const SpeakerContext = createContext();

export const SpeakerProvider = ({ children }) => {
  const value = useSpeakerList({ field: "text" });
  return (
    <SpeakerContext.Provider value={value}>{children}</SpeakerContext.Provider>
  );
};

export const PSpeakerContext = createContext();

export const PSpeakerProvider = ({ children }) => {
  const value = useSpeakerList({ field: "voice" });
  return (
    <PSpeakerContext.Provider value={value}>
      {children}
    </PSpeakerContext.Provider>
  );
};
