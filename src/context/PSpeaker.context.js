/** @format */

import React, { createContext, useState } from "react";
import { Alert } from "react-native";
export const PSpeakerContext = createContext();

export const PSpeakerProvider = ({ children }) => {
  const [pspeakers, setPSpeakers] = useState([
    { no: 1, isOn: false, voice: "" },
    { no: 2, isOn: false, voice: "" },
    { no: 3, isOn: false, voice: "" },
    { no: 4, isOn: false, voice: "" },
    { no: 5, isOn: false, voice: "" },
  ]);

  const resetPsSpeakers = () => {
    setPSpeakers([
      { no: 1, isOn: false, voice: "" },
      { no: 2, isOn: false, voice: "" },
      { no: 3, isOn: false, voice: "" },
      { no: 4, isOn: false, voice: "" },
      { no: 5, isOn: false, voice: "" },
    ]);
  };

  const toggleHandlerPS = (speakerNo, audio) => {
    setPSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.no === speakerNo
          ? {
              ...speaker,
              isOn: speaker.isOn ? false : true,
              voice: speaker.isOn ? "" : audio,
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

  const toggleHandlerAllPS = (audio) => {
    setPSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) => ({
        ...speaker,
        isOn: !pspeakers.every((s) => s.isOn),
        voice: speaker.isOn ? audio : "",
      }))
    );
  };

  return (
    <PSpeakerContext.Provider
      value={{
        pspeakers,
        toggleHandlerPS,
        toggleHandlerAllPS,
        showAlert,
        showSuccessAlert,
        resetPsSpeakers,
      }}>
      {children}
    </PSpeakerContext.Provider>
  );
};
