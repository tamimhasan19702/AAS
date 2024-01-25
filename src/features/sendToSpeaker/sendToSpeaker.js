/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";
import { SpeakerContext } from "../../context/Speaker.context";

const SendToSpeakerView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SendToSpeaker = ({ navigation }) => {
  const { speakers } = useContext(SpeakerContext);
  console.log(speakers);
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} route={"Speaker Screen"} />
      <SendToSpeakerView>
        <Text>{speakers[0].text}</Text>
        <Text>{speakers[1].text}</Text>
        <Text>{speakers[2].text}</Text>
        <Text>{speakers[3].text}</Text>
        <Text>{speakers[4].text}</Text>
      </SendToSpeakerView>
    </SafeView>
  );
};
