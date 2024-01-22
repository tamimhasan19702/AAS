/** @format */

import React, { createContext, useState } from "react";

export const SpeakerContext = createContext();

export const SpeakerProvider = ({ children }) => {
  const [speakers, setSpeakers] = useState([
    { no: 1, isOn: false },
    { no: 2, isOn: false },
    { no: 3, isOn: false },
    { no: 4, isOn: false },
    { no: 5, isOn: false },
  ]);

  const toggleHandler = (speakerNo) => {
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.no === speakerNo ? { ...speaker, isOn: !speaker.isOn } : speaker
      )
    );
  };

  const toggleHandlerAll = () => {
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) => ({
        ...speaker,
        isOn: !speakers.every((s) => s.isOn),
      }))
    );
  };

  return (
    <SpeakerContext.Provider
      value={{ speakers, toggleHandler, toggleHandlerAll }}>
      {children}
    </SpeakerContext.Provider>
  );
};
