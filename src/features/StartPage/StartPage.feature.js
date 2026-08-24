/** @format */

import { View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import Boxicon from "../../components/Boxicon.component";
import { ROUTES } from "../../constants/routes";

const StartPageView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BoxContainer = styled(View)`
  margin: 20px 0px;
`;

const LOTTIE_AI_VOICE =
  "https://lottie.host/74778103-22fb-4aa0-9586-941a88745311/sPcr0Y232O.json";
const LOTTIE_RECORDED_VOICE =
  "https://lottie.host/a4715a7c-91a8-4a5b-9f04-6f261b334afd/Ma1gBgxNr0.json";

export const StartPage = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"speaker-wireless"} />
      <StartPageView>
        <BoxContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.AI_SCREEN)}>
            <Boxicon url={LOTTIE_AI_VOICE} text={"AI Voice"} />
          </TouchableOpacity>
        </BoxContainer>
        <BoxContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.VOICE_SCREEN)}>
            <Boxicon url={LOTTIE_RECORDED_VOICE} text={"Recorded Voice"} />
          </TouchableOpacity>
        </BoxContainer>
      </StartPageView>
    </SafeView>
  );
};
