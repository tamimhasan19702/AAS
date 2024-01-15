/** @format */

import React, { useEffect, useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { Text } from "react-native";
import {
  useFonts,
  OverlockSC_400Regular,
} from "@expo-google-fonts/overlock-sc";
import { color } from "../../utils/colors";
import {
  AiScreenView,
  AiInputField,
  AiInputButton,
  AiInputText,
  AiText,
  AiVoiceText,
} from "./AI.style";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { ref, set, onValue } from "firebase/database";
import * as Speech from "expo-speech";
import { Loading } from "../../utils/loading";

export const AiScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(audio.length);
  useEffect(() => {
    onValue(ref(FIREBASEDATABASE, "audioText"), (snapshot) => {
      const responseText = snapshot.val()?.audioText || "";
      if (audio) {
        setAudio(responseText);
      }
    });
  }, [audio]);

  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const save = () => {
    set(ref(FIREBASEDATABASE, "audioText"), {
      audioText: text,
    });
    setText("");
  };
  const speak = () => {
    setLoading(true);
    setTimeout(() => {
      Speech.speak(audio, {});
      setLoading(false);
      setAudio("");
    }, 1000);
  };

  return (
    <SafeView>
      <LogoBar link={navigation.navigate} />
      <AiScreenView>
        <AiText>Please enter your text to be Announced</AiText>
        <AiInputField
          placeholder="Please Enter Text Here"
          value={text}
          onChangeText={setText}
          underlineColor={color.primary}
          mode="outlined"
          autoFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
        />
        {}
        <AiInputButton onPress={save} style={{ marginBottom: 10 }}>
          <AiInputText>Save</AiInputText>
        </AiInputButton>

        {audio ? (
          <>
            <AiVoiceText>Generated AI Voice</AiVoiceText>
            {loading ? (
              <Loading /> // Replace with your loading component
            ) : (
              <AiInputButton onPress={speak}>
                <AiInputText>Play the Audio</AiInputText>
              </AiInputButton>
            )}
          </>
        ) : (
          <AiVoiceText>
            Please save your text to generate a AI Voice
          </AiVoiceText>
        )}
      </AiScreenView>
    </SafeView>
  );
};
