/** @format */

import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { color } from "../../utils/colors";
import { TextInput } from "react-native-paper";
import TimerComponent from "../../components/Timer.component";
import { Loading } from "../../utils/loading";
import { ScheduleContext } from "../../context/Schedule.context";
import ScheduleComponent from "../../components/schedule.component";
import ScheduleSpeaker from "../../components/scheduleSpeaker.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  background-color: ${({ enabled }) => (enabled ? color.primary : color.gray)};
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
    scheduleText,
    setScheduleText,
    scheduleSave,
    scheduleLoading,
    scheduleAudio,
    scheduleSpeak,
    schedSpeakers,
    toggleHandler,
    handleTimeDurationChange,
    selectedTimeDuration,
    scheduleListView,
    setScheduleListView,
    ScheduleAction,
    updateScheduleText,
  } = useContext(ScheduleContext);

  useEffect(() => {
    updateScheduleText();
    console.log(scheduleAudio, "scheduleAudio");
  }, []);

  return (
    <SafeView>
      <LogoBar
        link={navigation}
        icon={"arrow-left"}
        route="Schedule ListView"
      />
      <ScheduleView>
        <ScheduleText>Schedule Annoucnements</ScheduleText>
        <Text>
          Note** - All the input text will be translated & converted to bangla
          audio
        </Text>
        <ScheduleInputView>
          <ScheduleInputField
            placeholder="Please Enter Text Here"
            value={scheduleText}
            onChangeText={setScheduleText}
            underlineColor={color.primary}
            mode="outlined"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
          />
          {scheduleLoading ? (
            <Loading />
          ) : (
            <ScheduleInputButton
              style={{ backgroundColor: color.primary }}
              onPress={() => scheduleSave(scheduleText)}>
              <ScheduleInputText>Generate Audio</ScheduleInputText>
            </ScheduleInputButton>
          )}

          {scheduleAudio ? (
            <ScheduleComponent speak={scheduleSpeak} text={scheduleAudio} />
          ) : (
            <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10 }}>
              Enter your Text and Please Generate Audio
            </Text>
          )}
          <TimerComponent onTimeSelect={handleTimeDurationChange} />
        </ScheduleInputView>
        <Text style={{ padding: 10, fontSize: 15 }}>
          {" "}
          Scroll horizontal to select the Speakers 👉
        </Text>

        <ScrollView horizontal style={{ width: "80%" }}>
          {schedSpeakers.map((speaker) => (
            <ScheduleSpeaker
              key={speaker.no}
              No={speaker.no}
              isOn={speaker.isOn}
              toggleHandler={() => toggleHandler(speaker.no, speaker.text)}
            />
          ))}
        </ScrollView>

        <ScheduleInputButton
          style={{ marginBottom: 5, width: "80%" }}
          onPress={() => {
            ScheduleAction(navigation);
          }}
          enabled={
            selectedTimeDuration !== 0 &&
            schedSpeakers.some((speaker) => speaker.isOn) &&
            scheduleAudio
          }>
          <ScheduleInputText>Schedule</ScheduleInputText>
        </ScheduleInputButton>
      </ScheduleView>
    </SafeView>
  );
};
