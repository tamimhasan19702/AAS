/** @format */

import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";

import { ScheduleContext } from "../../context/Schedule.context";
import { color } from "../../utils/colors";
import { PVoiceContext } from "../../context/PVoice.context";

const HistoryView = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-top: 20px;
`;

export const HistoryScreen = ({ navigation }) => {
  const { presetArray, audio, getArrayFromFirebase } = useContext(AiContext);
  const { recordedSounds } = useContext(PVoiceContext);
  const { scheduleHistory } = useContext(ScheduleContext);

  const [histories, setHistories] = useState([]);
  console.log(scheduleHistory);
  useEffect(() => {
    setHistories([...presetArray, ...recordedSounds]);
  }, []);
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <HistoryView>
        {histories.map((history) => (
          <View key={history.id}>
            <Text>{history?.text || "Recorded Voice"}</Text>
          </View>
        ))}
      </HistoryView>
    </SafeView>
  );
};
