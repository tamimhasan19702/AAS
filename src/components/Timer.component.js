/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

const TimerComponent = () => {
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
    <View
      style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, color: "#202020" }}>
        {timerDuration !== 0 ? "Timer set for" : "No timer set"}
      </Text>
      {timerDuration !== 0 && (
        <Text style={{ fontSize: 24, marginTop: 10 }}>
          {formatTime(timerDuration)}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowTimerPicker(true)}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 16,
              overflow: "hidden",
              color: "black",
            }}>
            Set Time ⏲️
          </Text>
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
            }}
            onCancel={() => setShowTimerPicker(false)}
            modalTitle="Set Timer"
            closeOnOverlayPress
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimerComponent;
