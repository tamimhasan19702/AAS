/** @format */

import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { color } from "../../utils/colors";
import ScheduleListViewComponent from "../../components/scheduleListView.component";
import { ScheduleContext } from "../../context/Schedule.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  flex: 1;
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

  // const loadStoredScheduleListView = async () => {
  //   try {
  //     const storedScheduleListView = await AsyncStorage.getItem(
  //       "scheduleListView"
  //     );
  //     if (storedScheduleListView !== null) {
  //       const parsedScheduleListView = JSON.parse(storedScheduleListView);
  //       setScheduleListView(parsedScheduleListView);
  //     } else {
  //       setScheduleListView([]);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error retrieving scheduleListView from AsyncStorage:",
  //       error
  //     );
  //   }
  // };

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <ScheduleView>
        <ScheduleText>Scheduled Announcement List</ScheduleText>
        {scheduleListView.length > 0 ? (
          <ScrollView>
            {scheduleListView.map((item, index) => (
              <ScheduleListViewComponent
                key={index}
                index={index}
                text={item.audio}
                timer={item.timeDuration}
                speak={scheduleSpeak}
              />
            ))}
          </ScrollView>
        ) : (
          <View>
            <Text>No Schedule has been added yet 😃</Text>
          </View>
        )}
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
