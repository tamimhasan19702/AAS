/** @format */

import { View, Button, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";
import { color } from "../../utils/colors";
import { PVoiceContext } from "../../context/PVoice.context";
import HistoryBoxComponent from "../../components/historyBox.component";

const HistoryView = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

export const HistoryScreen = ({ navigation }) => {
  const { presetArray } = useContext(AiContext);
  const { recordedSounds } = useContext(PVoiceContext);

  const [histories, setHistories] = useState([
    ...presetArray,
    ...recordedSounds,
  ]);

  console.log(histories);

  const clearHistory = () => {
    setHistories([]);
  };
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <HistoryView>
        {histories.map((history) => (
          <View
            key={history.id}
            style={{
              marginBottom: 10,
              backgroundColor: color.primary,
              width: "90%",
              elevation: 5,
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <HistoryBoxComponent history={history} />
          </View>
        ))}
        {histories.length !== 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: color.white,
              paddingVertical: 20,
              width: "80%",
              elevation: 9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              display: "flex",
              alignSelf: "flex - end",
            }}
            onPress={() => clearHistory()}>
            <Text>Clear History</Text>
          </TouchableOpacity>
        ) : (
          <Text>No History found at this moment 😅</Text>
        )}
      </HistoryView>
    </SafeView>
  );
};
