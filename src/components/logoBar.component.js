/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  return (
    <LogoBarView>
      <TouchableOpacity onPress={() => link.navigate(route)}>
        <ContentView>
          <MaterialCommunityIcons name={icon} size={24} color="white" />
          <LogoText>AAS</LogoText>
        </ContentView>
      </TouchableOpacity>
    </LogoBarView>
  );
};
