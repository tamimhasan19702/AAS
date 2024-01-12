/** @format */

import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";

const LogoBarView = styled(View)`
  background-color: ${color.primary};
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const LogoText = styled(Text)`
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
  font-size: 20px;
`;

export const LogoBar = () => {
  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LogoBarView>
      <MaterialCommunityIcons name="speaker-wireless" size={24} color="white" />
      <LogoText>AAC</LogoText>
    </LogoBarView>
  );
};
