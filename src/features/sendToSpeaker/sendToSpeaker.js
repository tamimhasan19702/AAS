/** @format */

import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import { AiContext } from "../../context/AI.context";
import { SpeakerContext } from "../../context/Speaker.context";
import { FIREBASEDATABASE } from "../../../firebase.config";

const SendToSpeakerView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SendToSpeaker = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const { speakers } = useContext(SpeakerContext);

  const onPress = () => {
    console.log(speakers);
  };

  const onLongPress = () => {
    setPressed(true);
    // Add loading animation logic here
  };

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} route={"Speaker Screen"} />
      <SendToSpeakerView>
        {speakers.map(
          (speaker, index) =>
            speaker.text && <Text key={index}>{speaker.text}</Text>
        )}
        <TouchableOpacity
          onPress={onPress}
          onLongPress={onLongPress}
          onPressOut={() => setPressed(false)}>
          <View
            style={[
              styles.button,
              { backgroundColor: pressed ? "blue" : "gray" },
            ]}>
            <Text>Press and hold me</Text>
          </View>
        </TouchableOpacity>
      </SendToSpeakerView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
