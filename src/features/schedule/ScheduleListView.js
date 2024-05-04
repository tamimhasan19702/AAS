/** @format */

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

import styled from "styled-components";
import { ScheduleContext } from "../../context/Schedule.context";
import { color } from "../../utils/colors";
import PresetComponent from "../../components/preset.component";
import ScheduleListViewComponent from "../../components/scheduleListView.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  flex: 1;
`;

const ScheduleListViewModal = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
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
  const { scheduleListView, scheduleSpeak, setScheduleListView } =
    useContext(ScheduleContext);

  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        const storedSchedule = await AsyncStorage.getItem("scheduleListView");
        if (storedSchedule) {
          setScheduleListView(JSON.parse(storedSchedule));
        }
      } catch (error) {
        console.error(
          "Error loading scheduleListView from AsyncStorage",
          error
        );
      }
    };

    loadScheduleData();
  }, []);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <ScheduleView>
        <ScheduleListViewModal>
          <ScheduleText>Scheduled Announcement </ScheduleText>
          {scheduleListView ? (
            <ScheduleListViewComponent
              text={scheduleListView.audio}
              time={scheduleListView.timeDuration}
              speak={scheduleSpeak}
            />
          ) : (
            <View>
              <Text>No Schedule has been added yet 😃</Text>
            </View>
          )}
        </ScheduleListViewModal>
      </ScheduleView>
      <ScheduleButton
        onPress={() => {
          navigation.navigate("Schedule Screen");
        }}
        style={{ alignSelf: "center" }}>
        <ScheduleButtonText>Add Schedule</ScheduleButtonText>
      </ScheduleButton>
    </SafeView>
  );
};

export default ScheduleListView;

const styles = StyleSheet.create({});
