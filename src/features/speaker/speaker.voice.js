/** @format */

import React, { useContext } from "react";
import { set, ref } from "firebase/database";
import { PVoiceContext } from "../../context/PVoice.context";
import { PSpeakerContext } from "../../context/Speakers.context";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { FIREBASE_PATHS } from "../../constants/firebasePaths";
import { ROUTES } from "../../constants/routes";
import { SpeakerPickerScreen } from "./SpeakerPickerScreen.component";

export const SpeakerVoice = ({ navigation }) => {
  const { convertedUrl, deleteActiveRecordedSound } = useContext(PVoiceContext);
  const {
    speakers: pspeakers,
    toggleHandler: toggleHandlerPS,
    toggleHandlerAll: toggleHandlerAllPS,
    showAlert,
    showSuccessAlert,
    resetSpeakers,
  } = useContext(PSpeakerContext);

  const handleSend = async () => {
    await set(ref(FIREBASEDATABASE, FIREBASE_PATHS.RECORD_SPEAKERS), pspeakers);
    showSuccessAlert(navigation);
    resetSpeakers();
    deleteActiveRecordedSound();
  };

  return (
    <SpeakerPickerScreen
      navigation={navigation}
      title="Personal Voice Screen"
      backRoute={ROUTES.VOICE_SCREEN}
      speakers={pspeakers}
      onToggleSpeaker={(speakerNo) => toggleHandlerPS(speakerNo, convertedUrl)}
      onToggleAll={() => toggleHandlerAllPS(convertedUrl)}
      onSend={handleSend}
      onBlockedSend={showAlert}
    />
  );
};
