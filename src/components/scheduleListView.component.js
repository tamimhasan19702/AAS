/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Timer from "../utils/timer";

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
`;

const ScheduleText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
  overflow: scroll;
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

const TimeView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const TimeText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
`;
export default function ScheduleListViewComponent({
  text,
  index,
  isActive = true,
  timer = 0,
  speak = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const handlePlayClick = () => {
    console.log(timer);
    speak(text);
  };

  return (
    <Schedule isActive={isActive}>
      <ScheduleView>
        <ScheduleInput>
          {loading ? (
            <ScheduleLoading />
          ) : (
            <ActiveView>
              <TouchableOpacity onPress={handlePlayClick}>
                <MaterialCommunityIcons name="play" size={35} color="white" />
              </TouchableOpacity>
              <ActiveText>{text}</ActiveText>
            </ActiveView>
          )}
          <TimeView>
            {<Timer initialTime={timer} />}
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons name="delete" size={26} color="white" />
            </TouchableOpacity>
          </TimeView>
        </ScheduleInput>
        <ScheduleText></ScheduleText>
      </ScheduleView>
    </Schedule>
  );
}
