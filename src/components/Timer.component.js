/** @format */

import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const Timer = ({ initialDuration, onTimerEnd }) => {
  const [seconds, setSeconds] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0); // 24-hour format
  const [selectedMinute, setSelectedMinute] = useState(0);

  const convertToSeconds = (hours, minutes) => {
    return hours * 3600 + minutes * 60;
  };

  const handleConfirm = (date) => {
    const current = new Date();
    const selected = new Date(date);

    if (selected > current) {
      const hours = selected.getHours() + (selected.getHours() < 12 ? 0 : 12); // Convert 24-hour to 12-hour
      const minutes = selected.getMinutes();
      setSelectedHour(hours);
      setSelectedMinute(minutes);
      const newDuration = convertToSeconds(hours, minutes);
      setSeconds(newDuration);
    }

    setIsPickerVisible(false);
  };

  const showPicker = () => {
    setIsPickerVisible(true);
  };

  const hidePicker = () => {
    setIsPickerVisible(false);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialDuration);
  };

  return (
    <View>
      <Text>Timer: {seconds} seconds</Text>
      <Button
        title={isActive ? "Pause" : "Start"}
        onPress={isActive ? pauseTimer : startTimer}
      />
      <Button title="Set Duration" onPress={showPicker} />
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
};

export default Timer;
