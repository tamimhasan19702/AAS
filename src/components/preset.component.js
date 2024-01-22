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
  background-color: ${color.primary};
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
export default function PresetComponent({
  saveAndSpeak,
  handleDelete,
  index,
  text,
}) {
  const { loadTime, presetLoading } = useContext(AiContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set loading to false when presetLoading changes
    setLoading(false);
  }, [presetLoading]);

  const handlePlayClick = () => {
    setLoading(true);
    setTimeout(() => {
      saveAndSpeak({ presetText: text });
      setLoading(false);
    }, loadTime);
  };

  return (
    <Preset>
      <PresetView>
        <PresetInput>
          {loading ? (
            <PresetLoading />
          ) : (
            <TouchableOpacity onPress={handlePlayClick}>
              <MaterialCommunityIcons name="play" size={35} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <MaterialCommunityIcons name="delete" size={26} color="white" />
          </TouchableOpacity>
        </PresetInput>
        <PresetText>{text}</PresetText>
      </PresetView>
    </Preset>
  );
}
