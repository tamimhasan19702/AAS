/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PresetLoading } from "../utils/presetLoading";

const Schedule = styled(View)`
  width: 100%;
  background-color: ${(props) =>
    props.isActive ? color.green : color.primary};
  padding: 12px;
  border-radius: 5px;
  margin-top: 10px;
`;

const ScheduleView = styled(View)`
  display: flex;
  flex-direction: column;
`;

const ScheduleText = styled(Text)`
  color: ${color.white};
  font-size: 18px;
  font-family: "OverlockSC_400Regular";
  overflow: scroll;
  margin-left: 10px;
`;

const ScheduleInput = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ActiveView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ActiveText = styled(Text)`
  color: ${color.white};
  font-size: 23px;
  font-family: "OverlockSC_400Regular";
`;

export default function ScheduleComponent({ speak, text, isActive = true }) {
  const [loading, setLoading] = useState(false);

  const handlePlayClick = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(text);
      speak(text);
      setLoading(false);
    }, 2000);
  };

  return (
    <Schedule isActive={isActive}>
      <ScheduleView>
        <ScheduleInput>
          {loading ? (
            <PresetLoading />
          ) : (
            <ActiveView>
              <TouchableOpacity onPress={handlePlayClick}>
                <MaterialCommunityIcons name="play" size={35} color="white" />
              </TouchableOpacity>
              {isActive && <ActiveText>Converted Audio 🔊</ActiveText>}
            </ActiveView>
          )}
        </ScheduleInput>
        <ScheduleText>{text}</ScheduleText>
      </ScheduleView>
    </Schedule>
  );
}
