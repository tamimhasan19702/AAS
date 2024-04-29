/** @format */

import { color } from "./colors";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export const Timer = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        // Update state asynchronously
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }

    return () => clearInterval(timer);
  }, [timeLeft, onFinish]);

  // Rendering the current timeLeft
  return (
    <View>
      <Text style={{ color: color.white, fontSize: 16 }}>{timeLeft}</Text>
    </View>
  );
};
