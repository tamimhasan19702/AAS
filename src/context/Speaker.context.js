/** @format */

import React, { createContext, useState } from "react";

export const SpeakerContext = createContext();

export const SpeakerProvider = ({ children }) => {
  const [speakers, setSpeakers] = useState([
    { no: 1, isOn: false, text: "" },
    { no: 2, isOn: false, text: "" },
    { no: 3, isOn: false, text: "" },
    { no: 4, isOn: false, text: "" },
    { no: 5, isOn: false, text: "" },
  ]);

  const toggleHandler = (speakerNo, audio) => {
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.no === speakerNo
          ? {
              ...speaker,
              isOn: speaker.isOn ? false : true,
              text: speaker.isOn ? "" : audio,
            }
          : speaker
      )
    );
  };

  const toggleHandlerAll = (audio) => {
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) => ({
        ...speaker,
        isOn: !speakers.every((s) => s.isOn),
        text: speaker.isOn ? audio : "",
      }))
    );
  };

  return (
    <SpeakerContext.Provider
      value={{
        speakers,
        toggleHandler,
        toggleHandlerAll,
      }}>
      {children}
    </SpeakerContext.Provider>
  );
};
