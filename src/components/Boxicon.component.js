/** @format */

import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import LottieView from "lottie-react-native";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";

const BoxiconView = styled(View)`
  background-color: ${color.primary};
  padding: 20px 80px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AnimationView = styled(LottieView)`
  z-index: 99;
  width: 150px;
  height: 170px;
`;

const TextView = styled(View)`
  padding: 10px 0px;
  display: flex;
  align-items: center;
`;

const BoxText = styled(Text)`
  color: ${color.white};
  font-size: 18px;
  font-family: "OverlockSC_400Regular";
  font-weight: 800;
`;

export default function Boxicon({ url, text }) {
  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <BoxiconView>
      <AnimationView
        autoPlay
        loop
        autoSize
        source={{
          uri: url,
        }}
      />
      <TextView>
        <BoxText>{text}</BoxText>
      </TextView>
    </BoxiconView>
  );
}
