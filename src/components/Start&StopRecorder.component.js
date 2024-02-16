/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import styled from "styled-components";
import { color } from "../utils/colors";
import { Entypo } from "@expo/vector-icons";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";
import { PVoiceContext } from "../context/PVoice.context";

const StartStopRecorderView = styled(View)`
  background-color: ${color.primary};
  padding: 40px 40px;
  border-radius: 5px;
  align-items: center;
  gap: 15px;
`;

const StartStopRecorderText = styled(Text)`
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
  font-size: 20px;
  text-align: center;
`;

const AnimationView = styled(LottieView)`
  width: 100px;
  height: 100px;
`;

export const StartStopRecorder = ({ title, onPress }) => {
  const { recording } = useContext(PVoiceContext);
  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <StartStopRecorderView>
        {recording ? (
          <AnimationView
            autoPlay
            loop
            source={{
              uri: "https://lottie.host/efc551a9-981c-4672-8e78-62b6ad459853/9WbbqQZPVq.json",
            }}
          />
        ) : (
          <Entypo name="mic" size={50} color="white" />
        )}
        <StartStopRecorderText>{title}</StartStopRecorderText>
      </StartStopRecorderView>
    </TouchableOpacity>
  );
};
