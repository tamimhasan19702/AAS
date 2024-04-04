/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Timer = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        if (typeof onFinish === "function") {
          onFinish();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onFinish]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatNumber = (num) => {
      return num < 10 ? "0" + num : num;
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  return (
    <View>
      <Text style={{ color: "white" }}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

export default Timer;
