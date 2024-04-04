/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { TimerPickerModal } from "react-native-timer-picker";
import { color } from "../utils/colors";

const Container = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #202020;
`;

const TimerText = styled.Text`
  font-size: 24px;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
  margin-top: 10px;
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

const ButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
`;

const TimerComponent = ({ onTimeSelect }) => {
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);

  const formatTime = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min `;
    }
    if (seconds >= 0) {
      formattedTime += `${seconds} sec`;
    }

    return formattedTime.trim(); // Trim to remove any leading/trailing whitespace
  };

  return (
    <Container>
      <Title>{timerDuration !== 0 ? "Timer set for" : "No timer set"}</Title>
      {timerDuration !== 0 && (
        <TimerText>{formatTime(timerDuration)}</TimerText>
      )}
      <Button activeOpacity={0.7} onPress={() => setShowTimerPicker(true)}>
        <ButtonText>Set Time ⏲️</ButtonText>
      </Button>
      <TimerPickerModal
        visible={showTimerPicker}
        setIsVisible={setShowTimerPicker}
        onConfirm={(pickedDuration) => {
          const durationInSeconds =
            pickedDuration.hours * 3600 +
            pickedDuration.minutes * 60 +
            pickedDuration.seconds;
          setTimerDuration(durationInSeconds);
          setShowTimerPicker(false);
          onTimeSelect(durationInSeconds);
        }}
        onCancel={() => setShowTimerPicker(false)}
        modalTitle="Set Timer"
        closeOnOverlayPress
      />
    </Container>
  );
};

export default TimerComponent;
