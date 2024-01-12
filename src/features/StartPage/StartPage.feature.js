/** @format */

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import Boxicon from "../../components/Boxicon.component";

const StartPageView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BoxContainer = styled(View)`
  margin: 20px 0px;
`;

export const StartPage = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <StartPageView>
        <BoxContainer>
          <TouchableOpacity onPress={() => navigation.navigate("AI Screen")}>
            <Boxicon
              url={
                "https://lottie.host/74778103-22fb-4aa0-9586-941a88745311/sPcr0Y232O.json"
              }
              text={"AI Voice"}
            />
          </TouchableOpacity>
        </BoxContainer>
        <BoxContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Voice Screen")}>
            <Boxicon
              url={
                "https://lottie.host/a4715a7c-91a8-4a5b-9f04-6f261b334afd/Ma1gBgxNr0.json"
              }
              text={"Own Voice"}
            />
          </TouchableOpacity>
        </BoxContainer>
      </StartPageView>
    </SafeView>
  );
};
