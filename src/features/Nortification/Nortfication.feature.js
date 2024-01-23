/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const NortificationScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <Text>Nortfication Screen</Text>
      </VoiceScreenView>
    </SafeView>
  );
};
