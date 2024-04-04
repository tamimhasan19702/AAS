/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Timer = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && !timerFinished) {
      if (typeof onFinish === "function") {
        onFinish();
      }
      setTimerFinished(true);
    }

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, timeLeft, onFinish, timerFinished]);

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
