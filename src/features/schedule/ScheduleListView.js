/** @format */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

import styled from "styled-components";
import { ScheduleContext } from "../../context/Schedule.context";
import { color } from "../../utils/colors";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
`;

const ScheduleListViewModal = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 85%;
`;

const ScheduleText = styled(Text)`
  font-weight: 600;
  font-size: 25px;
  text-align: center;
  padding: 10px 0px;
  font-family: "OverlockSC_400Regular";
`;

const ScheduleButton = styled(TouchableOpacity)`
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
  margin: 5px 0px;
`;

const ScheduleButtonText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;

const ScheduleListView = ({ navigation }) => {
  const { scheduleText, setScheduleText, scheduleAudio, scheduleListView } =
    useContext(ScheduleContext);
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <ScheduleView>
        <ScheduleListViewModal>
          <ScheduleText>Scheduled Announcement list</ScheduleText>
          {scheduleListView.length > 0 ? (
            <View>
              <Text>No Schedule added</Text>
            </View>
          ) : (
            <View>
              <Text>Schedule will beeee added</Text>
            </View>
          )}
        </ScheduleListViewModal>
        <ScheduleButton
          onPress={() => {
            navigation.navigate("Schedule Screen");
          }}>
          <ScheduleButtonText>Add Schedule</ScheduleButtonText>
        </ScheduleButton>
      </ScheduleView>
    </SafeView>
  );
};

export default ScheduleListView;

const styles = StyleSheet.create({});
