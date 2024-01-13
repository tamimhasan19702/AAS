/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { Button } from "react-native";
import * as Speech from "expo-speech";

const AiScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const AiScreen = ({ navigation }) => {
  const speak = () => {
    const thingToSay = "hello world";
    Speech.speak(thingToSay);
  };
  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <AiScreenView>
        <Text>AiScreen</Text>
        <Button title="Speak!" onPress={speak} />
      </AiScreenView>
    </SafeView>
  );
};
