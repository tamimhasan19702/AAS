/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";

const PresetView = styled(View)`
  padding: 10px;
  background-color: ${color.primary};
  margin: 5px;
  border-radius: 5px;
`;

const PresetText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
`;
export default function PresetComponent({ speak, text }) {
  return (
    <PresetView>
      <TouchableOpacity
        onPress={() => {
          speak(text);
        }}>
        <View>
          <PresetText>{text}</PresetText>
        </View>
      </TouchableOpacity>
    </PresetView>
  );
}
