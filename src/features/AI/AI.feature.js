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
  AiTextPreset,
  AiScrollView,
} from "./AI.style";
import { FIREBASEDATABASE } from "../../../firebase.config";
import { ref, set, onValue } from "firebase/database";
import { Loading } from "../../utils/loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PresetComponent from "../../components/preset.component";

export const AiScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);
  const [presetArray, setPresetArray] = useState([]);

  const sound = new Audio.Sound();

  useEffect(() => {
    onValue(ref(FIREBASEDATABASE, "audioText"), (snapshot) => {
      const responseText = snapshot.val()?.audioText || "";
      setAudio(responseText);
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

  const convertTextToSpeech = async (textToConvert) => {
    try {
      const response = await fetch(
        "https://azure-rhinoceros-tutu.cyclic.app/speech?text=" +
          encodeURIComponent(textToConvert)
      );
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
  const speak = (textAudio) => {
    setSpeakLoading(true);
    setTimeout(() => {
      convertTextToSpeech(textAudio);
      setSpeakLoading(false);
      setAudio("");
    }, 1000);
  };

  const saveAndSpeak = ({ presetText }) => {
    set(ref(FIREBASEDATABASE, "audioText"), {
      audioText: presetText,
    });
    setText("");
    setSpeakLoading(true);
    setTimeout(() => {
      convertTextToSpeech(presetText);
      setSpeakLoading(false);
      setAudio("");
    }, 1000);
  };
  const PresetSave = () => {
    setPresetArray((prevArray) => [...prevArray, text]);
    return presetArray;
  };

  const clearPreset = () => {
    setPresetArray([]);
    return presetArray;
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

        {saveloading ? (
          <Loading />
        ) : (
          <AiInputButton
            style={{ marginBottom: 5 }}
            onPress={() => save(toString(text))}>
            <AiInputText>Save</AiInputText>
          </AiInputButton>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            width: "100%",
          }}>
          <AiInputButton
            onPress={() => {
              PresetSave();
            }}
            style={{ marginBottom: 10, width: "40%" }}>
            <AiInputText>Save as Preset</AiInputText>
          </AiInputButton>
          <AiInputButton
            onPress={() => {
              clearPreset();
            }}
            style={{ marginBottom: 10, width: "40%" }}>
            <AiInputText>Clear Preset</AiInputText>
          </AiInputButton>
        </View>

        <AiVoiceText>Preset Annoucnements</AiVoiceText>

        <AiScrollView Vertical={true}>
          {presetArray.length !== 0 ? (
            presetArray.map((item, index) => (
              <PresetComponent
                key={index}
                saveAndSpeak={saveAndSpeak}
                text={
                  "hello class this is your chairman sir here. please bring your laptop to the computer lab as soon as possible"
                }
              />
            ))
          ) : (
            <Text>No Presets</Text>
          )}
        </AiScrollView>

        {audio && (
          <>
            {speakloading ? (
              <Loading /> // Replace with your loading component
            ) : (
              <AiInputButton
                onPress={() => speak(audio)}
                style={{ margin: 5 + 0 }}>
                <MaterialCommunityIcons
                  name="speaker-wireless"
                  size={30}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <AiInputText>Play the AI Generatred Audio</AiInputText>
              </AiInputButton>
            )}
          </>
        )}

        <AiInputButton
          onPress={() => navigation.navigate("Speaker Screen")}
          style={{ marginTop: 5, marginBottom: 5 }}>
          <AiInputText>Next</AiInputText>
        </AiInputButton>
      </AiScreenView>
    </SafeView>
  );
};
