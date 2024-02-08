/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { PVoiceContext } from "../context/PVoice.context";
import { PresetLoading } from "../utils/presetLoading";
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
  const totalRecordingDuration = 60; // Assuming total recording duration is 60 seconds, you can change this according to your requirement

  // UseState to hold animated value
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Calculate progress for each second
    const interval = setInterval(() => {
      setAnimatedProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 20
      );
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <PlayVoiceView>
      <PlayVoiceButton onPress={onPress}>
        <AntDesign name="caretright" size={30} color="white" />

        <PlayVoiceText>{title}</PlayVoiceText>
        {/* Use Animated progress value */}
        <ProgressBar progress={animatedProgress / 100} color={"white"} />
      </PlayVoiceButton>
    </PlayVoiceView>
  );
};
