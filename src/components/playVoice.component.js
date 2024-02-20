/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlayVoiceView = styled(View)`
  background-color: ${color.primary};
  width: 380px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
`;
const PlayVoiceText = styled(Text)`
  color: ${color.white};
`;

const PlayVoiceLeftView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;
const PlayVoiceRightView = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayVoiceButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2px;
`;

export const PlayVoice = ({ title, onPress, duration, time, handleDelete }) => {
  const recordingDate = new Date(parseInt(time)).toLocaleDateString("en-US");
  const formattedTime = new Date(parseInt(time)).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <PlayVoiceView>
      <PlayVoiceLeftView>
        <PlayVoiceButton onPress={onPress}>
          <AntDesign name="caretright" size={30} color="white" />
          <PlayVoiceText>{title}</PlayVoiceText>
        </PlayVoiceButton>
      </PlayVoiceLeftView>
      <PlayVoiceRightView>
        <PlayVoiceText>
          {formattedTime} - {recordingDate}
        </PlayVoiceText>
        <PlayVoiceText>
          Duration - {duration ? duration : "00:00:00"}s
        </PlayVoiceText>
      </PlayVoiceRightView>
      <TouchableOpacity onPress={handleDelete}>
        <MaterialCommunityIcons name="delete" size={26} color="white" />
      </TouchableOpacity>
    </PlayVoiceView>
  );
};
