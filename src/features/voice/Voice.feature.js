/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <VoiceScreenView>
        <Text>VoiceScreen</Text>
      </VoiceScreenView>
    </SafeView>
  );
};
