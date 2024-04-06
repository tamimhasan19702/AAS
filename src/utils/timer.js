/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Timer = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            // Stop the timer when timeLeft reaches 0
            clearInterval(timer);
            // Execute onFinish function if provided
            if (typeof onFinish === "function") {
              onFinish();
            }
          }
          return newTime;
        });
      }, 1000);
    } else {
      // Execute onFinish immediately if initialTime is 0 or negative
      if (typeof onFinish === "function") {
        onFinish();
      }
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount
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
