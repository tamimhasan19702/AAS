/** @format */

import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import axios from "axios";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const [audioData, setAudioData] = useState("");

  const convertTextToSpeech = async () => {
    const textToConvert = "Hello World"; // Replace with the actual text you want to convert

    try {
      const response = await fetch("http://localhost:3000/convert-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToConvert,
        }),
      });

      const data = await response.json();
      setAudioData(data.audioData); // Store the audio data in state or use it as needed
      console.log(data);
    } catch (error) {
      console.error("jotil");
    }
  };

  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <VoiceScreenView>
        <Text>VoiceScreen</Text>
        <Button title="Convert to Speech" onPress={convertTextToSpeech} />
      </VoiceScreenView>
    </SafeView>
  );
};
