/** @format */

import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import LottieView from "lottie-react-native";
import styled from "styled-components";

const SplashView = styled(SafeView)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const SplashScreen = ({ setIsLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  return (
    <SplashView>
      <LottieView
        autoPlay
        autoSize
        source={{
          uri: "https://lottie.host/ee777ab4-b025-4395-a401-ab09cfb5043e/5ytIYi3chy.json",
        }}
      />
    </SplashView>
  );
};
