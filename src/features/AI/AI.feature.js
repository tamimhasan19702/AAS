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
  AiVoiceText,
} from "./AI.style";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { ref, set, onValue } from "firebase/database";
import * as Speech from "expo-speech";
import { Loading } from "../../utils/loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

export const AiScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);

  const sound = new Audio.Sound();

  const convertTextToSpeech = async (textToConvert) => {
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
    onValue(ref(FIREBASEDATABASE, "audioText"), (snapshot) => {
      const responseText = snapshot.val()?.audioText || "";
      setAudio(responseText);
      console.log(audio.length);
    });
    return () => {
      sound.unloadAsync(); // Unload the audio when the component unmounts
    };
  }, [audio]);

  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const save = () => {
    setSaveLoading(true);
    setTimeout(() => {
      set(ref(FIREBASEDATABASE, "audioText"), {
        audioText: text,
      });
      setText("");
      setSaveLoading(false);
    }, 2000);
  };
  const speak = () => {
    setSpeakLoading(true);
    setTimeout(() => {
      convertTextToSpeech(audio);
      setSpeakLoading(false);
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
        {!text && (
          <AiVoiceText>
            Please save your text to generate a AI Voice
          </AiVoiceText>
        )}

        {saveloading ? (
          <Loading />
        ) : (
          <AiInputButton onPress={save} style={{ marginBottom: 10 }}>
            <AiInputText>Save</AiInputText>
          </AiInputButton>
        )}

        {audio && (
          <>
            <AiVoiceText>Generated AI Voice</AiVoiceText>
            {speakloading ? (
              <Loading /> // Replace with your loading component
            ) : (
              <AiInputButton onPress={speak}>
                <MaterialCommunityIcons
                  name="speaker-wireless"
                  size={30}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <AiInputText>Play the Audio</AiInputText>
              </AiInputButton>
            )}
          </>
        )}

        <AiInputButton
          onPress={() => navigation.navigate("Speaker Screen")}
          style={{ marginTop: 30 }}>
          <AiInputText>Next</AiInputText>
        </AiInputButton>
      </AiScreenView>
    </SafeView>
  );
};
