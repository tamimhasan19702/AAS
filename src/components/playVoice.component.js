/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PresetLoading } from "../utils/presetLoading";
import { formatTimestamp } from "../utils/date";

const PlayVoiceView = styled(View)`
  background-color: ${(props) =>
    props.isActive ? color.green : color.primary};
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 5px;
  padding: 15px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const PlayVoiceText = styled(Text)`
  color: ${color.white};

  font-family: "OverlockSC_400Regular";
`;

const PlayVoiceLeftView = styled(View)`
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
`;
const PlayVoiceRightView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
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

  const handlePlayClick = async () => {
    try {
      setLoading(true);
      await onPress();
    } finally {
      setLoading(false);
    }
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
            Recording Date - {formatTimestamp(time)}
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
