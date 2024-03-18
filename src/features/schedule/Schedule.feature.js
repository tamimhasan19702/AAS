/** @format */

import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { color } from "../../utils/colors";
import { TextInput } from "react-native-paper";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
`;

const ScheduleText = styled(Text)`
  font-weight: 400;
  font-size: 25px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;

const ScheduleInputView = styled(View)`
  width: 80%;
`;

const ScheduleInputField = styled(TextInput)`
  width: 100%;
  margin: 10px 0px;
  padding: 10px 0px;
  text-vertical-align: top;
`;

export const ScheduleScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <ScheduleView>
        <ScheduleText>Schedule a Annoucnements</ScheduleText>
        <ScheduleInputView>
          <ScheduleInputField
            placeholder="Please Enter Text Here"
            onChangeText={() => {}}
            underlineColor={color.primary}
            mode="outlined"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
        </ScheduleInputView>
      </ScheduleView>
    </SafeView>
  );
};
