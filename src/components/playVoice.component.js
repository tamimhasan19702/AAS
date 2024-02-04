/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { PVoiceContext } from "../context/PVoice.context";
import { ProgressBar, MD3Colors } from "react-native-paper";

const PlayVoiceView = styled(View)`
  width: 90%;
`;

const PlayVoiceButton = styled(TouchableOpacity)`
  background-color: ${color.primary};
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
`;
const PlayVoiceText = styled(Text)`
  color: ${color.white};
`;

export const PlayVoice = ({ title, onPress }) => {
  const {
    myRecording,
    recording,
    sound,
    startRecording,
    stopRecording,
    recordingDuration,
    playRecording,
  } = useContext(PVoiceContext);
  return (
    <PlayVoiceView>
      <PlayVoiceButton onPress={onPress}>
        <AntDesign name="caretright" size={30} color="white" />
        <PlayVoiceText>{title}</PlayVoiceText>
        <ProgressBar progress={0.5} color={MD3Colors.error50} />
      </PlayVoiceButton>
    </PlayVoiceView>
  );
};
