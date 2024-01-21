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
import { FIREBASEDATABASE, FIREBASEFIRESTORE } from "../../../firebase.config";
import { ref, set, onValue, get } from "firebase/database";
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
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export const AiScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [saveloading, setSaveLoading] = useState(false);
  const [speakloading, setSpeakLoading] = useState(false);
  const [presetArray, setPresetArray] = useState([]);
  const [presetLoading, setPresetLoading] = useState(false);

  console.log(`presetArray: ${presetArray}`);

  const sound = new Audio.Sound();

  const updateAudioText = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "audioText"));
      const responseText = snapshot.val()?.audioText || "";
      setAudio(responseText);
    } catch (error) {
      console.error("Error updating audio text:", error);
    }
  };

  const getArrayFromFirebase = async () => {
    try {
      const snapshot = await get(ref(FIREBASEDATABASE, "presetArray"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPresetArray(data);
      }
    } catch (error) {
      console.error("Error getting array from Firebase:", error);
    }
  };

  useEffect(() => {
    updateAudioText();
    getArrayFromFirebase();
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
      setText((prevText) => {
        set(ref(FIREBASEDATABASE, "audioText"), {
          audioText: prevText,
        });
        convertTextToSpeech(prevText);
        setAudio("");
        setSaveLoading(false);
        return ""; // Return the updated state value
      });
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

  const saveAndSpeak = ({ presetText }) => {
    setPresetLoading(true);
    setTimeout(() => {
      setPresetArray((prevArray) => {
        set(ref(FIREBASEDATABASE, "audioText"), {
          audioText: presetText || prevArray[prevArray.length - 1] || "",
        });
        convertTextToSpeech(
          presetText || prevArray[prevArray.length - 1] || ""
        );
        setAudio("");
        setPresetLoading(false);
        return [
          ...prevArray,
          presetText || prevArray[prevArray.length - 1] || "",
        ]; // Return the updated state value
      });
    }, 1000);
  };
  const PresetSave = () => {
    setPresetArray((prevArray) => {
      set(ref(FIREBASEDATABASE, "presetArray"), [...prevArray, text]);
      return [...prevArray, text]; // Return the updated state value
    });
    setText("");
  };

  const clearPreset = () => {
    setPresetArray((prevArray) => {
      set(ref(FIREBASEDATABASE, "presetArray"), []);
      return []; // Return the updated state value
    });
  };

  const handleDelete = (index) => {
    setPresetArray((prevArray) => {
      const updatedArray = prevArray
        .slice(0, index)
        .concat(prevArray.slice(index + 1));
      set(ref(FIREBASEDATABASE, "presetArray"), updatedArray);
      return updatedArray; // Return the updated state value
    });
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            width: "100%",
          }}>
          {saveloading ? (
            <Loading />
          ) : (
            <AiInputButton
              style={{ marginBottom: 5, width: "60%" }}
              onPress={() => save(toString(text))}>
              <AiInputText>Save</AiInputText>
            </AiInputButton>
          )}

          {audio && (
            <>
              {speakloading ? (
                <Loading /> // Replace with your loading component
              ) : (
                <AiInputButton
                  onPress={() => speak(audio)}
                  style={{ marginBottom: 5, width: "20%" }}>
                  <MaterialCommunityIcons
                    name="speaker-wireless"
                    size={30}
                    color="white"
                    style={{ textAlign: "center" }}
                  />
                </AiInputButton>
              )}
            </>
          )}
        </View>

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
                text={item}
                handleDelete={() => handleDelete(index)}
                index={index}
                presetLoading={presetLoading}
              />
            ))
          ) : (
            <AiVoiceText style={{ textAlign: "center", fontSize: 15 }}>
              No Preset Annoucement Added here ☺
            </AiVoiceText>
          )}
        </AiScrollView>

        <AiInputButton
          onPress={() => navigation.navigate("Speaker Screen")}
          style={{ marginTop: 5, marginBottom: 5 }}>
          <AiInputText>Next</AiInputText>
        </AiInputButton>
      </AiScreenView>
    </SafeView>
  );
};
