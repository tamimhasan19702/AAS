/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScheduleContext } from "../context/Schedule.context";
import { Timer } from "../utils/timer";

// styles
const Schedule = styled(View)`
  width: 380px;
  background-color: ${color.primary};
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
  flex-direction: row;
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
export default function ScheduleListViewComponent({ index, onFinish }) {
  const { handleDelete, scheduleSpeak, scheduleListView } =
    useContext(ScheduleContext);

  const [timerFinished, setTimerFinished] = useState(false);

  const isActive = true;

  const handlePlayClick = () => {
    scheduleSpeak(scheduleListView[index].audio);
  };

  const handleFinish = () => {
    setTimerFinished(true); // Update local state to indicate finish
    setTimeout(() => {
      handleDelete(index); // Delete the item after the specified duration
    }, scheduleListView[index].timeDuration * 1000);
  };

  return (
    <Schedule isActive={isActive}>
      <ScheduleView>
        <ScheduleInput>
          <ActiveView>
            <TouchableOpacity onPress={handlePlayClick}>
              <MaterialCommunityIcons name="play" size={30} color="white" />
            </TouchableOpacity>
            <ActiveText>{scheduleListView[index].audio}</ActiveText>
          </ActiveView>
          <TimeView>
            {timerFinished ? (
              <TimeText>Finished</TimeText>
            ) : (
              <Timer initialTime={20} onFinish={handleFinish} />
            )}
            <TouchableOpacity
              onPress={() => {
                handleDelete(index);
              }}>
              <MaterialCommunityIcons name="delete" size={26} color="white" />
            </TouchableOpacity>
          </TimeView>
        </ScheduleInput>
      </ScheduleView>
    </Schedule>
  );
}
