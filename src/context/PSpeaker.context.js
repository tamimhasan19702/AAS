/** @format */

import React, { createContext, useState } from "react";
import { Alert } from "react-native";
export const PSpeakerContext = createContext();

export const PSpeakerProvider = ({ children }) => {
  const [pspeakers, setPSpeakers] = useState([
    { no: 1, isOn: false, text: "" },
    { no: 2, isOn: false, text: "" },
    { no: 3, isOn: false, text: "" },
    { no: 4, isOn: false, text: "" },
    { no: 5, isOn: false, text: "" },
  ]);
  return (
    <PSpeakerContext.Provider value={{}}>{children}</PSpeakerContext.Provider>
  );
};
