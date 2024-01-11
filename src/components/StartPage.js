/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../utils/safeAreaView";
import styled from "styled-components";
import LogoBar from "./logoBar";

const StartPageView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function StartPage() {
  return (
    <SafeView>
      <LogoBar />
      <StartPageView>
        <Text>StartPage</Text>
      </StartPageView>
    </SafeView>
  );
}
