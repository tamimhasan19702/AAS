/** @format */

import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

const ScheduleView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const ScheduleScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <ScheduleView>
        <Text>ScheduleScreen</Text>
      </ScheduleView>
    </SafeView>
  );
};
