/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { color } from "../../utils/colors";
import { TextInput } from "react-native-paper";
import TimerComponent from "../../components/Timer.component";
import { AiContext } from "../../context/AI.context";
import { Loading } from "../../utils/loading";

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
const ScheduleInputButton = styled(TouchableOpacity)`
  width: 100%;
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

const ScheduleInputText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;

export const ScheduleScreen = ({ navigation }) => {
  const {
    text,
    setText,
    audio,
    saveloading,
    presetArray,
    updateAudioText,
    getArrayFromFirebase,
    save,
    speak,
    clearPreset,
    handleDelete,
  } = useContext(AiContext);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <ScheduleView>
        <ScheduleText>Schedule Annoucnements</ScheduleText>
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
          {saveloading ? (
            <Loading />
          ) : (
            <ScheduleInputButton onPress={() => save(toString(text))}>
              <ScheduleInputText>Generate Audio</ScheduleInputText>
            </ScheduleInputButton>
          )}

          <TimerComponent />
        </ScheduleInputView>
      </ScheduleView>
    </SafeView>
  );
};
