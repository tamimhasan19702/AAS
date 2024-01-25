/** @format */

import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";
import { useNavigation } from "@react-navigation/native";

const LogoBarView = styled(View)`
  background-color: ${color.primary};
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
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
`;

export const LogoBar = ({ link, icon, route = "Start Screen" }) => {
  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogoClick = (prop) => {
    link.navigate(prop);
  };

  return (
    <LogoBarView>
      <TouchableOpacity onPress={() => handleLogoClick(route)}>
        <ContentView>
          <MaterialCommunityIcons name={icon} size={24} color="white" />
          <LogoText>AAS</LogoText>
        </ContentView>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => link.navigate("Nortification Screen")}>
        <View>
          <MaterialCommunityIcons name="bell" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </LogoBarView>
  );
};
