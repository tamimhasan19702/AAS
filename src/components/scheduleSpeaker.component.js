/** @format */

import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styled } from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScheduleSpeakerView = styled(View)`
  padding: 10px;
  background-color: ${({ toggleSpeaker }) => {
    return toggleSpeaker ? color.primary : color.gray;
  }};
  height: 150px;
  width: 130px;
  margin: 10px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ScheduleSpeakerText = styled(Text)`
  color: ${color.white};
`;

const ScheduleSpeaker = ({ No, isOn, toggleHandler }) => {
  return (
    <ScheduleSpeakerView toggleSpeaker={isOn}>
      {isOn ? (
        <TouchableOpacity onPress={toggleHandler}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "start",
              justifyContent: "center",
            }}>
            <MaterialCommunityIcons name="speaker" size={50} color="white" />
            <MaterialCommunityIcons
              name="circle"
              size={15}
              color="green"
              style={{ marginTop: 5 }}
            />
          </View>

          <ScheduleSpeakerText>Active Speaker - {No} </ScheduleSpeakerText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleHandler}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "start",
              justifyContent: "center",
            }}>
            <MaterialCommunityIcons name="speaker" size={50} color="white" />
            <MaterialCommunityIcons
              name="circle"
              size={15}
              color="white"
              style={{ marginTop: 5 }}
            />
          </View>
          <ScheduleSpeakerText>inactive Speaker {No} </ScheduleSpeakerText>
        </TouchableOpacity>
      )}
    </ScheduleSpeakerView>
  );
};

export default ScheduleSpeaker;
