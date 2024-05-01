/** @format */

import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Timer = ({ initialTime, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, initialTime * 1000); // Convert initialTime to milliseconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [initialTime, onFinish]); // useEffect dependencies

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatNumber = (num) => {
      return num < 10 ? "0" + num : num.toString();
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  return (
    <View>
      <Text style={{ color: "white", fontSize: 12 }}>
        {formatTime(initialTime)}
      </Text>
    </View>
  );
};

export default Timer;
