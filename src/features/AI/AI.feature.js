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

  const sound = new Audio.Sound();

  const convertTextToSpeech = async (textToConvert) => {
    try {
      const response = await fetch(
        "http://192.168.0.107:3000/speech?text=" +
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

  const PresetSave = ({ Inputtext }) => {
    setText(Inputtext);
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
            style={{ marginBottom: 10 }}
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
            onPress={() => {}}
            style={{ marginBottom: 10, width: "40%" }}>
            <AiInputText>Save as Preset</AiInputText>
          </AiInputButton>
          <AiInputButton
            onPress={() => {}}
            style={{ marginBottom: 10, width: "40%" }}>
            <AiInputText>Clear Preset</AiInputText>
          </AiInputButton>
        </View>

        <AiVoiceText>Preset Annoucnements</AiVoiceText>

        <AiScrollView Vertical={true}>
          <PresetComponent
            speak={speak}
            text={
              "hello class this is your chairman sir here. please bring your laptop to the computer lab as soon as possible"
            }
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={
              "Please Submit all of your classwork and assignements to your respective teacher"
            }
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={
              "Class representative from all the batch please contact me as soon as possible"
            }
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={
              "this department is surrounded by CC tv camera and projector. please be on time"
            }
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={
              "Everyone please submit your project to your respective teacher. Please be on time"
            }
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={"Good bye everyone. Have a nice day."}
            setText={setText}
          />
          <PresetComponent
            speak={speak}
            text={
              "Welcome to the Department of Electrical and Electronic Enginneering of University of Chittagong"
            }
            setText={PresetSave}
          />
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
          style={{ margin: 10 + 0 }}>
          <AiInputText>Next</AiInputText>
        </AiInputButton>
      </AiScreenView>
    </SafeView>
  );
};
