/** @format */

import { View, Text, Image, TouchableOpacity } from "react-native";
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
`;

const LogoText = styled(Text)`
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
  font-size: 20px;
`;

const ContentView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 20%;
`;

export const LogoBar = ({ link }) => {
  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LogoBarView>
      <TouchableOpacity onPress={() => link("Start Screen")}>
        <ContentView>
          <MaterialCommunityIcons
            name="speaker-wireless"
            size={24}
            color="white"
          />
          <LogoText>AAC</LogoText>
        </ContentView>
      </TouchableOpacity>
    </LogoBarView>
  );
};
