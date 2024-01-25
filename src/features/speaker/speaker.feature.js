/** @format */

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { SpeakerComponent } from "../../components/speaker.component";
import styled from "styled-components";
import { color } from "../../utils/colors";
import { SpeakerContext } from "../../context/Speaker.context";
import { AiContext } from "../../context/AI.context";
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

export const SpeakerScreen = ({ navigation }) => {
  const { audio } = useContext(AiContext);
  const { speakers, toggleHandler, toggleHandlerAll } =
    useContext(SpeakerContext);
  console.log(speakers);
  const allSpeakersOn = speakers.some((s) => s.isOn);
  const handleNextStepPress = () => {
    if (allSpeakersOn) {
      navigation.navigate("Send Speaker");
    }
  };

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} route={"AI Screen"} />
      <SpeakerText>Choose which speaker you want to use</SpeakerText>
      <ScrollView>
        {speakers.map((speaker) => (
          <SpeakerComponent
            key={speaker.no}
            No={speaker.no}
            isOn={speaker.isOn}
            toggleHandler={() => toggleHandler(speaker.no, audio)}
          />
        ))}
      </ScrollView>
      <AllSpeakerView>
        <AllSpeakerButton>
          <AllSpeakerText onPress={() => toggleHandlerAll(audio)}>
            Turn {speakers.every((speaker) => speaker.isOn) ? "Off" : "On"} All
          </AllSpeakerText>
        </AllSpeakerButton>
        <NextSpeakerButton
          allSpeakersOn={allSpeakersOn}
          onPress={allSpeakersOn ? handleNextStepPress : () => null}>
          <AllSpeakerText>Next Step</AllSpeakerText>
        </NextSpeakerButton>
      </AllSpeakerView>
    </SafeView>
  );
};
