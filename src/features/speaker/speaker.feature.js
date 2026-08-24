/** @format */

import React, { useContext } from "react";
import { set, ref } from "firebase/database";
import { AiContext } from "../../context/AI.context";
import { SpeakerContext } from "../../context/Speakers.context";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { FIREBASE_PATHS } from "../../constants/firebasePaths";
import { ROUTES } from "../../constants/routes";
import { SpeakerPickerScreen } from "./SpeakerPickerScreen.component";

export const SpeakerScreen = ({ navigation }) => {
  const { audio, deleteActivePreset } = useContext(AiContext);
  const {
    speakers,
    toggleHandler,
    toggleHandlerAll,
    showAlert,
    showSuccessAlert,
    resetSpeakers,
  } = useContext(SpeakerContext);

  const handleSend = async () => {
    await set(ref(FIREBASEDATABASE, FIREBASE_PATHS.SPEAKERS), speakers);
    showSuccessAlert(navigation);
    resetSpeakers();
    deleteActivePreset();
  };

  return (
    <SpeakerPickerScreen
      navigation={navigation}
      title="Choose which speaker you want to use"
      backRoute={ROUTES.AI_SCREEN}
      speakers={speakers}
      onToggleSpeaker={(speakerNo) => toggleHandler(speakerNo, audio)}
      onToggleAll={() => toggleHandlerAll(audio)}
      onSend={handleSend}
      onBlockedSend={showAlert}
    />
  );
};
