/** @format */

import { useState } from "react";
import { Alert } from "react-native";

const createInitialSpeakers = (field) =>
  Array.from({ length: 5 }, (_, index) => ({
    no: index + 1,
    isOn: false,
    [field]: "",
  }));

const showAlert = () => {
  Alert.alert("Alert", "Please choose atleast one speaker to proceed", [
    { text: "ok" },
  ]);
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

/**
 * Shared state + actions for a list of five toggleable speakers.
 * `field` controls the payload property name ("text" | "voice") so both
 * the AI-speaker and personal-voice flows keep their persisted shapes.
 */
export const useSpeakerList = ({ field = "text" } = {}) => {
  const [speakers, setSpeakers] = useState(() => createInitialSpeakers(field));

  const toggleHandler = (speakerNo, audio) => {
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.no === speakerNo
          ? {
              ...speaker,
              isOn: speaker.isOn ? false : true,
              [field]: speaker.isOn ? "" : audio,
            }
          : speaker
      )
    );
  };

  const allCurrentlyOn = speakers.every((speaker) => speaker.isOn);

  const toggleHandlerAll = (audio) => {
    const nextIsOn = !allCurrentlyOn;
    setSpeakers((prevSpeakers) =>
      prevSpeakers.map((speaker) => ({
        ...speaker,
        isOn: nextIsOn,
        [field]: speaker.isOn ? "" : audio,
      }))
    );
  };

  const resetSpeakers = () => {
    setSpeakers(createInitialSpeakers(field));
  };

  const replaceSpeakers = (nextSpeakers) => {
    setSpeakers(nextSpeakers);
  };

  return {
    speakers,
    toggleHandler,
    toggleHandlerAll,
    showAlert,
    showSuccessAlert,
    resetSpeakers,
    replaceSpeakers,
  };
};
