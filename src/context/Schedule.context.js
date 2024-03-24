/** @format */

import { createContext, useState } from "react";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleAudio, setScheduleAudio] = useState("");
  return (
    <ScheduleContext.Provider value={{}}>{children}</ScheduleContext.Provider>
  );
};
