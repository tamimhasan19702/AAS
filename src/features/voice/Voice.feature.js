/** @format */

import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import axios from "axios";
import { Audio } from "expo-av";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const [audioData, setAudioData] = useState(null);
  const sound = new Audio.Sound();

  const convertTextToSpeech = async () => {
    const textToConvert = "boka choda tamim";
    try {
      const response = await fetch(
        "http://192.168.0.106:3000/speech?text=" +
          encodeURIComponent(textToConvert)
      );
      console.log("Backend server called successfully");
      const audioResponse = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        await sound.unloadAsync(); // Unload any previous audio
        await sound.loadAsync({ uri: base64Data }); // Load the new audio
        await sound.playAsync(); // Play the audio
      };
      reader.readAsDataURL(audioResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    convertTextToSpeech();
    return () => {
      sound.unloadAsync(); // Unload the audio when the component unmounts
    };
  }, []);

  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <VoiceScreenView>
        <Text>VoiceScreen</Text>
        <TouchableOpacity onPress={convertTextToSpeech}>
          <Button title="Convert Text to Speech" />
        </TouchableOpacity>
        {audioData ? <Text>{audioData}</Text> : <Text>Loading...</Text>}
      </VoiceScreenView>
    </SafeView>
  );
};
