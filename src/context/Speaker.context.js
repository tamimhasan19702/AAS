/** @format */

import React, { createContext, useState } from "react";
import { Alert } from "react-native";
export const SpeakerContext = createContext();

export const SpeakerProvider = ({ children }) => {
  const [speakers, setSpeakers] = useState([
    { no: 1, isOn: false, text: "" },
    { no: 2, isOn: false, text: "" },
    { no: 3, isOn: false, text: "" },
    { no: 4, isOn: false, text: "" },
    { no: 5, isOn: false, text: "" },
  ]);
  const [pspeakers, setPSpeakers] = useState([
    { no: 1, isOn: false, voice: "" },
    { no: 2, isOn: false, voice: "" },
    { no: 3, isOn: false, voice: "" },
    { no: 4, isOn: false, voice: "" },
    { no: 5, isOn: false, voice: "" },
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

  const showAlert = () => {
    Alert.alert(
      "Alert",
      "Please choose atleast one speaker to proceed",
      [{ text: "ok" }],
      {
        style: "custom",
        backgroundColor: "lightcoral",
        color: "black",
      }
    );
  };

  const showSuccessAlert = (navigation) => {
    Alert.alert(
      "Success",
      "Data sent to database Successfully",
      [
        {
          text: "Back to home",
          onPress: () => {
            navigation.navigate("Start Screen");
          },
        },
      ],
      { cancelable: false }
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
        pspeakers,
        toggleHandler,
        toggleHandlerAll,
        showAlert,
        showSuccessAlert,
      }}>
      {children}
    </SpeakerContext.Provider>
  );
};
