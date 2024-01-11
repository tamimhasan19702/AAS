/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import Boxicon from "../../components/Boxicon.component";

const StartPageView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StartPage = () => {
  return (
    <SafeView>
      <LogoBar />
      <StartPageView>
        <Boxicon />
      </StartPageView>
    </SafeView>
  );
};
