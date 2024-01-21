/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Loading } from "../utils/loading";
import { PresetLoading } from "../utils/presetLoading";

const PresetView = styled(View)`
  padding: 12px;
  background-color: ${color.primary};
  margin: 5px;
  border-radius: 5px;
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
`;
export default function PresetComponent({
  saveAndSpeak,
  text,
  handleDelete,
  index,
  presetLoading,
  loadTime = 2000,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set loading to false when presetLoading changes
    setLoading(false);
  }, [presetLoading]);

  const handlePlayClick = () => {
    setLoading(true); // Set loading to true when the play button is clicked
    setTimeout(() => {
      saveAndSpeak({ presetText: text });
      setLoading(false); // Set loading to false after the delay
    }, loadTime); // 1-second delay
  };

  return (
    <>
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
            <MaterialCommunityIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </PresetInput>
        <PresetText>{text}</PresetText>
      </PresetView>
    </>
  );
}
