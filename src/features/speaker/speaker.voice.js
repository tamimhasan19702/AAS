/** @format */

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { SpeakerComponent } from "../../components/speaker.component";
import styled from "styled-components";
import { color } from "../../utils/colors";
import { PSpeakerContext } from "../../context/PSpeaker.context";
import { PVoiceContext } from "../../context/PVoice.context";
import { set, ref } from "firebase/database";
import { FIREBASEDATABASE } from "../../../firebase.config";

const SpeakerText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
  font-family: "OverlockSC_400Regular";
`;

const AllSpeakerButton = styled(TouchableOpacity)`
  width: 90%;
  background-color: ${color.primary};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
const NextSpeakerButton = styled(TouchableOpacity)`
  width: 90%;
  background-color: ${({ allSpeakersOn }) =>
    allSpeakersOn ? color.primary : color.gray};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  flex-direction: row;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const AllSpeakerText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
  width: 100%;
`;

const AllSpeakerView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const SpeakerVoice = ({ navigation }) => {
  const { finalRecording, url, deleteActiveRecordedSound, convertedUrl } =
    useContext(PVoiceContext);
  const { resetPsSpeakers } = useContext(PSpeakerContext);
  const [loading, setLoading] = useState(false);
  const {
    pspeakers,
    toggleHandlerPS,
    toggleHandlerAllPS,
    showAlert,
    showSuccessAlert,
  } = useContext(PSpeakerContext);

  console.log(pspeakers);
  const allSpeakersOn = pspeakers.some((s) => s.isOn);

  const handleNextStepPress = async () => {
    if (allSpeakersOn) {
      setLoading(true); // Set loading to true

      // Simulate a delay (replace this with your asynchronous operation)
      setTimeout(async () => {
        console.log(pspeakers);
        try {
          set(ref(FIREBASEDATABASE, "RecordSpeakers"), pspeakers);
          setLoading(false);
          showSuccessAlert(navigation);
          resetPsSpeakers();
          deleteActiveRecordedSound();
          // Upload the final recording to Firebase Storage
        } catch (err) {
          console.log(err);
        }
      }, 3000);
    }
  };

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} route={"Voice Screen"} />
      <SpeakerText>Personal Voice Screen</SpeakerText>
      <ScrollView>
        {pspeakers.map((speaker) => (
          <SpeakerComponent
            key={speaker.no}
            No={speaker.no}
            isOn={speaker.isOn}
            toggleHandler={() => toggleHandlerPS(speaker.no, convertedUrl)}
          />
        ))}
      </ScrollView>
      <AllSpeakerView>
        <AllSpeakerButton>
          <AllSpeakerText onPress={() => toggleHandlerAllPS(convertedUrl)}>
            Turn {pspeakers.every((speaker) => speaker.isOn) ? "Off" : "On"} All
          </AllSpeakerText>
        </AllSpeakerButton>
        <NextSpeakerButton
          allSpeakersOn={allSpeakersOn}
          onPress={allSpeakersOn ? handleNextStepPress : showAlert}>
          <AllSpeakerText>Send to Speaker</AllSpeakerText>
        </NextSpeakerButton>
      </AllSpeakerView>
      {loading && (
        <Overlay>
          <ActivityIndicator
            animating={true}
            color={color.white}
            size="large"
          />
        </Overlay>
      )}
    </SafeView>
  );
};
