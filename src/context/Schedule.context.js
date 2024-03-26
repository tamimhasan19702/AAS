/** @format */

import { createContext, useState } from "react";

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [scheduleText, setScheduleText] = useState("");
  const [scheduleAudio, setScheduleAudio] = useState("");
  const [scheduleListView, setScheduleListView] = useState([]);
  return (
    <ScheduleContext.Provider
      value={{
        scheduleText,
        setScheduleText,
        scheduleAudio,
        scheduleListView,
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
