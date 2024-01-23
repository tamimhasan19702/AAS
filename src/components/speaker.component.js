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
  background-color: ${({ toggleSpeaker }) => {
    return toggleSpeaker ? color.primary : color.gray;
  }};
  padding: 12px;
  border-radius: 10px;
  margin: 5px;
`;

const SpeakerView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const SpeakerBoxText = styled(Text)`
  color: ${color.white};
  font-size: 20px;
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
export const SpeakerComponent = ({ No, isOn, toggleHandler }) => {
  return (
    <>
      <Speaker toggleSpeaker={isOn}>
        <SpeakerInput>
          {isOn ? (
            <TouchableOpacity onPress={toggleHandler}>
              <SpeakerView>
                <MaterialCommunityIcons
                  name="speaker"
                  size={35}
                  color="white"
                />
                <SpeakerBoxText>Turn On</SpeakerBoxText>
              </SpeakerView>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleHandler}>
              <SpeakerView>
                <MaterialCommunityIcons
                  name="speaker-off"
                  size={35}
                  color="white"
                />
                <SpeakerBoxText>Turn Off</SpeakerBoxText>
              </SpeakerView>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => {}}>
            <SpeakerView>
              <SpeakerBoxText>Speaker No {No}</SpeakerBoxText>
              <MaterialCommunityIcons
                name="arrow-right-circle"
                size={26}
                color="white"
              />
            </SpeakerView>
          </TouchableOpacity>
        </SpeakerInput>
      </Speaker>
    </>
  );
};
