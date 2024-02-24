/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PresetLoading } from "../utils/presetLoading";

const PlayVoiceView = styled(View)`
  background-color: ${(props) =>
    props.isActive ? color.green : color.primary};
  width: 380px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const PlayVoiceButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2px;
`;

const PlayVoiceTime = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayVoice = ({
  title,
  onPress,
  duration,
  time,
  handleDelete,
  isActive,
}) => {
  const [loading, setLoading] = useState(false);
  const recordingDate = new Date(parseInt(time)).toLocaleDateString("en-US");
  const formattedTime = new Date(parseInt(time)).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handlePlayClick = () => {
    setLoading(true);
    setTimeout(() => {
      onPress();
      setLoading(false);
    }, 2000);
  };

  return (
    <PlayVoiceView isActive={isActive}>
      <PlayVoiceLeftView>
        {loading ? (
          <PresetLoading />
        ) : (
          <PlayVoiceButton onPress={handlePlayClick}>
            <AntDesign name="caretright" size={30} color="white" />
            <PlayVoiceText>{isActive ? "Active Now" : title}</PlayVoiceText>
          </PlayVoiceButton>
        )}
      </PlayVoiceLeftView>
      <PlayVoiceRightView>
        <PlayVoiceTime>
          <PlayVoiceText>
            {recordingDate} - {formattedTime}
          </PlayVoiceText>
          <PlayVoiceText>
            Duration - {duration ? duration : "00:00:00"}s
          </PlayVoiceText>
        </PlayVoiceTime>

        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons name="delete" size={26} color="white" />
        </TouchableOpacity>
      </PlayVoiceRightView>
    </PlayVoiceView>
  );
};
