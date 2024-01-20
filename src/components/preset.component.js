/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PresetView = styled(View)`
  padding: 12px;
  background-color: ${color.primary};
  margin: 5px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const PresetText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
`;

const PresetInput = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 88%;
`;
export default function PresetComponent({ saveAndSpeak, text, handleDelete }) {
  return (
    <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <PresetView>
        <TouchableOpacity
          onPress={() => {
            saveAndSpeak({ presetText: text });
          }}>
          <MaterialCommunityIcons name="play" size={30} color="white" />
        </TouchableOpacity>
        <PresetInput>
          <PresetText>{text}</PresetText>
          <TouchableOpacity onPress={() => handleDelete()}>
            <MaterialCommunityIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </PresetInput>
      </PresetView>
    </View>
  );
}
