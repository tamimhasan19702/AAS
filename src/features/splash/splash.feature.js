/** @format */

import React, { useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import LottieView from "lottie-react-native";
import styled from "styled-components";

const SplashView = styled(SafeView)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 2800);

  if (!timePassed) {
    return (
      <SplashView>
        <LottieView
          autoPlay
          loop
          autoSize
          source={{
            uri: "https://lottie.host/ee777ab4-b025-4395-a401-ab09cfb5043e/5ytIYi3chy.json",
          }}
        />
      </SplashView>
    );
  }
  navigation.navigate("Start Screen");
  return null;
};
