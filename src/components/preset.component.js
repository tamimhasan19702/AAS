/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Loading } from "../utils/loading";
import { PresetLoading } from "../utils/presetLoading";
import { AiContext } from "../context/AI.context";

const Preset = styled(View)`
  width: 380px;
  background-color: ${(props) =>
    props.isActive ? color.green : color.primary};
  padding: 12px;
  border-radius: 5px;
  margin: 5px;
`;

const PresetView = styled(View)`
  display: flex;
  flex-direction: column;
`;

const PresetText = styled(Text)`
  color: ${color.white};
  font-size: 15px;
  font-family: "OverlockSC_400Regular";
  overflow: scroll;
`;

const PresetInput = styled(View)`
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
export default function PresetComponent({
  speak,
  handleDelete = () => {},
  index = 0,
  text,
  isActive = true,
  time = "00:00",
}) {
  const { loadTime } = useContext(AiContext);
  const [loading, setLoading] = useState(false);

  const handlePlayClick = () => {
    setLoading(true);
    setTimeout(() => {
      speak({ presetText: text });
      setLoading(false);
    }, loadTime);
  };

  return (
    <Preset isActive={isActive}>
      <PresetView>
        <PresetInput>
          {loading ? (
            <PresetLoading />
          ) : (
            <ActiveView>
              <TouchableOpacity onPress={handlePlayClick}>
                <MaterialCommunityIcons name="play" size={35} color="white" />
              </TouchableOpacity>
              {isActive && <ActiveText>Active Now</ActiveText>}
            </ActiveView>
          )}
          <TimeView>
            {time && <TimeText>{time}</TimeText>}
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <MaterialCommunityIcons name="delete" size={26} color="white" />
            </TouchableOpacity>
          </TimeView>
        </PresetInput>
        <PresetText>{text}</PresetText>
      </PresetView>
    </Preset>
  );
}
