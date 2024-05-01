/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Timer from "../utils/timer";
import { ScheduleContext } from "../context/Schedule.context";
import { PresetLoading } from "../utils/presetLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Schedule = styled(View)`
  width: 380px;
  background-color: ${({ isActive }) =>
    isActive ? color.green : color.primary};
  padding: 12px;
  border-radius: 5px;
  margin: 5px;
`;

const ScheduleView = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScheduleInput = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ActiveView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  width: 75%;
  padding: 0px 3px;
`;

const ActiveText = styled(Text)`
  color: ${color.white};
  font-size: 18px;
  font-family: "OverlockSC_400Regular";
`;

const TimeView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 15%;
`;

const TimeText = styled(Text)`
  color: ${color.white};
  font-size: 13px;
  font-family: "OverlockSC_400Regular";
`;
export default function ScheduleListViewComponent({
  text,
  time,
  isActive = true,
  speak = () => {},
}) {
  const { scheduleListView, setScheduleListView } = useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const handlePlayClick = () => {
    console.log(scheduleListView);
    speak(text);
  };

  const onFinish = () => {
    setTimerFinished(true);
  };

  const handleDelete = () => {
    setScheduleListView("");
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
              {isActive && <ActiveText>Generated Audio 🔊</ActiveText>}
            </ActiveView>
          )}
        </ScheduleInput>
        <Text>{text}</Text>
      </ScheduleView>
    </Schedule>
  );
}
