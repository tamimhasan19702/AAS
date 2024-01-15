/** @format */

import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeView } from "../../utils/safeAreaView";
import styled from "styled-components";
import { LogoBar } from "../../components/logoBar.component";
import axios from "axios";
import { OPEN_AI_API_KEY } from "../../../firebase.config";

const VoiceScreenView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const VoiceScreen = ({ navigation }) => {
  const [response, setResponse] = useState("");
  const fetchAIResponse = async () => {
    const apiKey = OPEN_AI_API_KEY;
    const prompt = "Once upon a time";
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: prompt,
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };
  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <VoiceScreenView>
        <Button title="Generate AI Text" onPress={fetchAIResponse} />
        <Text>{response}</Text>
      </VoiceScreenView>
    </SafeView>
  );
};
