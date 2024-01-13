/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import * as Speech from "expo-speech";
import { TextInput } from "react-native-paper";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";
import { color } from "../../utils/colors";

const AiScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

const AiText = styled(Text)`
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
  font-family: "OverlockSC_400Regular";
`;

const AiInputField = styled(TextInput)`
  width: 80%;
  min-height: 100px;
  margin: 10px 0px;
  padding: 10px 0px;
  text-vertical-align: top;
`;

const AiInputButton = styled(TouchableOpacity)`
  width: 80%;
  background-color: ${color.primary};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
`;

const AiInputText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;

export const AiScreen = ({ navigation }) => {
  const [text, setText] = React.useState("");

  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const speak = async () => {
    options = {
      pitch: 0.5,
      rate: 0.8,
    };
    Speech.speak(text, {
      ...options,
    });
  };
  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <AiScreenView>
        <AiText>Please enter your text to be Announced</AiText>
        <AiInputField
          placeholder="Please Enter Text Here"
          value={text}
          onChangeText={setText}
          underlineColor={color.primary}
          mode="outlined"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
        />
        <AiInputButton onPress={speak}>
          <AiInputText>Speak!</AiInputText>
        </AiInputButton>
      </AiScreenView>
    </SafeView>
  );
};
