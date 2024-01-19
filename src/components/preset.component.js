/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PresetView = styled(View)`
  padding: 10px;
  background-color: ${color.primary};
  margin: 5px;
  border-radius: 5px;
`;

const PresetText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
  width: 90%;
`;

const PresetInput = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;
export default function PresetComponent({ speak, text, setText }) {
  return (
    <PresetView>
      <TouchableOpacity
        onPress={() => {
          speak(text);
        }}>
        <PresetInput>
          <MaterialCommunityIcons
            name="speaker-wireless"
            size={24}
            color="white"
          />
          <PresetText>{text}</PresetText>
        </PresetInput>
      </TouchableOpacity>
    </PresetView>
  );
}
