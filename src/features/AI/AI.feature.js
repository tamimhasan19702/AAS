/** @format */

import React, { useEffect, useState } from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

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
} from "./AI.style";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { ref, set, onValue } from "firebase/database";
import * as Speech from "expo-speech";

export const AiScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState([]);
  console.log(audio);

  useEffect(() => {
    onValue(ref(FIREBASEDATABASE, "audioText"), (snapshot) => {
      setAudio(snapshot.val().audioText);
    });
  }, []);

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
    Speech.speak(audio, {});
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
        <AiInputButton onPress={save}>
          <AiInputText>Save</AiInputText>
        </AiInputButton>
        {audio ? (
          <AiInputText onPress={speak}>speak</AiInputText>
        ) : (
          <Text>Please</Text>
        )}
      </AiScreenView>
    </SafeView>
  );
};
