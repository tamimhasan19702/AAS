/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../utils/safeAreaView";
import styled from "styled-components";

const StartPageView = styled(SafeView)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function StartPage() {
  return (
    <SafeView>
      <Text>StartPage</Text>
    </SafeView>
  );
}
