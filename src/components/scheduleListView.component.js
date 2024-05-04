/** @format */

import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { color } from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScheduleContext } from "../context/Schedule.context";
import { PresetLoading } from "../utils/presetLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ref, set, onValue, get } from "firebase/database";
import { FIREBASEDATABASE } from "../../firebase.config";

const Schedule = styled(View)`
  width: 380px;
  background-color: ${color.primary};
  padding: 12px;
  border-radius: 5px;
  margin: 5px;
`;

const ScheduleView = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScheduleInput = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function ScheduleListViewComponent({
  text,
  time,
  speak = () => {},
}) {
  const { scheduleListView, setScheduleListView, schedSpeakers } =
    useContext(ScheduleContext);
  const [loading, setLoading] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const handlePlayClick = () => {
    console.log(scheduleListView);
    speak(text);
  };

  const onFinish = () => {
    Alert.alert("The Schedule timer has finished!!");
    setTimerFinished(true);
    console.log(schedSpeakers);
    set(ref(FIREBASEDATABASE, "speakers"), schedSpeakers);
    setTimeout(() => {
      handleDelete();
    }, 1000);
  };

  const handleDelete = () => {
    setScheduleListView("");
  };

  return (
    <Schedule>
      <ScheduleView>
        <ScheduleInput>
          {loading ? (
            <PresetLoading />
          ) : (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}>
              <Text style={{ fontSize: 20, color: "white", marginBottom: 10 }}>
                {timerFinished ? "Timer Finished" : "Time left: "}
              </Text>
              <CountdownCircleTimer
                style={{ width: 20, height: 20 }}
                isPlaying
                duration={time}
                colors={["#00FF00", "#82FF82", "#FFC800", "#FF0000", "#FF0000"]}
                colorsTime={[20, 15, 10, 5, 0]}
                onComplete={onFinish}>
                {({ remainingTime }) => (
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {remainingTime} s
                  </Text>
                )}
              </CountdownCircleTimer>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: 30,
                }}>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={handlePlayClick}>
                  <MaterialCommunityIcons
                    name="play"
                    size={35}
                    color={color.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={handleDelete}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={35}
                    color={color.white}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, color: "white" }}>
                  Generated Audio 🔊
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    marginTop: 10,
                  }}>
                  {text}
                </Text>
              </View>
            </View>
          )}
        </ScheduleInput>
      </ScheduleView>
    </Schedule>
  );
}
