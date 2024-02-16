/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  ProgressBarAndroidBase,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { PVoiceContext } from "../context/PVoice.context";
import { PresetLoading } from "../utils/presetLoading";

const PlayVoiceView = styled(View)`
  width: 350px;
`;

const PlayVoiceButton = styled(TouchableOpacity)`
  background-color: ${color.primary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
`;
const PlayVoiceText = styled(Text)`
  color: ${color.white};
`;

const PlayVoiceLeftView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;
const PlayVoiceRightView = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayVoice = ({ title, onPress }) => {
  const {
    myRecording,
    recording,
    Sound,
    startRecording,
    stopRecording,
    recordingDuration,
    playRecording,
    recordingTime,
  } = useContext(PVoiceContext);
  const recordingDate = new Date(parseInt(recordingTime)).toLocaleDateString(
    "en-US"
  );
  const formattedTime = new Date(parseInt(recordingTime)).toLocaleString(
    "en-US",
    { hour: "numeric", minute: "numeric", hour12: true }
  );
  return (
    <PlayVoiceView>
      <PlayVoiceButton onPress={onPress}>
        <PlayVoiceLeftView>
          <AntDesign name="caretright" size={30} color="white" />
          <PlayVoiceText>{title}</PlayVoiceText>
        </PlayVoiceLeftView>
        <PlayVoiceRightView>
          <PlayVoiceText>
            {formattedTime} - {recordingDate}
          </PlayVoiceText>
          <PlayVoiceText>
            {recordingDuration ? recordingDuration : "00:00:00"}
          </PlayVoiceText>
        </PlayVoiceRightView>
      </PlayVoiceButton>
    </PlayVoiceView>
  );
};
