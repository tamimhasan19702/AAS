/** @format */
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { color } from "../../utils/colors";
import { TextInput } from "react-native-paper";

export const AiScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

export const AiText = styled(Text)`
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
  font-family: "OverlockSC_400Regular";
`;

export const AiInputField = styled(TextInput)`
  width: 80%;
  min-height: 100px;
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
`;

export const AiInputText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;
