/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

export const SpeakerScreen = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <Text>speaker</Text>
    </SafeView>
  );
};
