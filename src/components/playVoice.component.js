/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";

const PlayVoiceView = styled(View)`
  width: 350px;
`;

const PlayVoiceButton = styled(TouchableOpacity)`
  background-color: ${color.primary};

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

export const PlayVoice = ({ title, onPress, duration, time }) => {
  console.log("time", time);
  const recordingDate = new Date(parseInt(time)).toLocaleDateString("en-US");
  const formattedTime = new Date(parseInt(time)).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <PlayVoiceView>
      <PlayVoiceButton onPress={onPress}>
        <PlayVoiceLeftView>
          <AntDesign name="caretright" size={30} color="white" />
          <PlayVoiceText>{title}</PlayVoiceText>
        </PlayVoiceLeftView>
        <PlayVoiceRightView>
          <PlayVoiceText>
            {formattedTime} - {recordingDate}
          </PlayVoiceText>
          <PlayVoiceText>
            Duration - {duration ? duration : "00:00:00"}s
          </PlayVoiceText>
        </PlayVoiceRightView>
      </PlayVoiceButton>
    </PlayVoiceView>
  );
};
