/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Loading } from "../utils/loading";
import { PresetLoading } from "../utils/presetLoading";
import { AiContext } from "../context/AI.context";

const Speaker = styled(View)`
  width: 400px;
  background-color: ${color.primary};
  padding: 12px;
  border-radius: 5px;
  margin: 5px;
`;

const SpeakerView = styled(View)`
  display: flex;
  flex-direction: column;
`;

const SpeakerBoxText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
  overflow: scroll;
`;

const SpeakerInput = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SpeakerText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;
export const SpeakerComponent = () => {
  return (
    <>
      <SpeakerText>Choose which speaker you want to use</SpeakerText>
      <Speaker>
        <SpeakerView>
          <SpeakerInput>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons name="play" size={35} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons name="delete" size={26} color="white" />
            </TouchableOpacity>
          </SpeakerInput>
          <SpeakerBoxText>speaker</SpeakerBoxText>
        </SpeakerView>
      </Speaker>
    </>
  );
};
