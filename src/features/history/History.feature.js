/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";

const HistoryView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const HistoryScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <HistoryView>
        <Text>HistoryScreen</Text>
      </HistoryView>
    </SafeView>
  );
};
