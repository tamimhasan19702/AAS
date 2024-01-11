/** @format */

import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: #fff;
`;
