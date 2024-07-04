/** @format */

import { View, Button, Text, TouchableOpacity, ScrollView } from "react-native";
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
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

export const HistoryScreen = ({ navigation }) => {
  const { presetArray } = useContext(AiContext);
  const { recordedSounds } = useContext(PVoiceContext);

  const [histories, setHistories] = useState([]);

  useEffect(() => {
    setHistories([...presetArray, ...recordedSounds]);
  }, [presetArray, recordedSounds]);

  console.log(histories);

  const clearHistory = () => {
    setHistories([]);
  };
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <HistoryView>
        <ScrollView style={{ width: "90%", height: "80%" }}>
          {histories.map((history) => (
            <View
              key={history.id}
              style={{
                marginBottom: 10,
                backgroundColor: color.primary,
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <HistoryBoxComponent history={history} />
            </View>
          ))}
        </ScrollView>

        {histories.length !== 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              paddingVertical: 20,

              width: "80%",
              elevation: 9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              display: "flex",
              alignSelf: "flex - end",
              marginBottom: 5,
            }}
            onPress={() => clearHistory()}>
            <Text style={{ color: "white" }}>Clear History</Text>
          </TouchableOpacity>
        ) : (
          <Text>No History found at this moment 😅</Text>
        )}
      </HistoryView>
    </SafeView>
  );
};
