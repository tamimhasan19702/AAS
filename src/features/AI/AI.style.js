/** @format */
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components";
import { color } from "../../utils/colors";
import { TextInput } from "react-native-paper";

export const AiScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
  flex: 1;
`;

export const AiText = styled(Text)`
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;

export const AiInputField = styled(TextInput)`
  width: 100%;
  margin: 10px 0px;
  padding: 10px 0px;
  text-vertical-align: top;
`;

export const AiInputButton = styled(TouchableOpacity)`
  width: 80%;
  background-color: ${color.primary};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const AiInputText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;

export const AiVoiceText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;

export const AiScrollView = styled(ScrollView)`
  margin: 0px 10px;
`;

export const TextContainer = styled(View)`
  margin-bottom: 10px;
  width: 100%;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;

export const VoiceText = styled(Text)`
  text-align: center;
  font-size: 15px;
`;

export const NextButton = styled(AiInputButton)`
  background-color: ${({ hasAudio }) =>
    hasAudio ? color.primary : color.gray} !important;
  margin-top: 5px;
  margin-bottom: 5px;
`;
export const AiTextInputView = styled(View)`
  width: 80%;
`;
