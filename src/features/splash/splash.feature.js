/** @format */

import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import LottieView from "lottie-react-native";
import styled from "styled-components";
import { Loading } from "../../utils/loading";
import { Image, Text } from "react-native";

const SplashView = styled(SafeView)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LottieViewSplash = styled(LottieView)`
  width: 70%;
  height: 70%;
`;

export const SplashScreen = ({ setIsLoading }) => {
  return (
    <SplashView>
      <LottieViewSplash
        autoPlay
        loop={false}
        source={{
          uri: "https://lottie.host/ee777ab4-b025-4395-a401-ab09cfb5043e/5ytIYi3chy.json",
        }}
        onAnimationFinish={() => setIsLoading(false)}
      />
    </SplashView>
  );
};
