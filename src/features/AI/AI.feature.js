/** @format */

import React, { useContext, useEffect, useState } from "react";
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
  AiScrollView,
  NextButton,
  AiTextInputView,
} from "./AI.style";
import { Loading } from "../../utils/loading";
import { Alert, View } from "react-native";
import PresetComponent from "../../components/preset.component";
import { AiContext } from "../../context/AI.context";
import { Text } from "react-native";
export const AiScreen = ({ navigation }) => {
  const {
    text,
    setText,
    audio,
    saveloading,
    presetArray,
    save,
    speak,
    clearPreset,
    handleDelete,
  } = useContext(AiContext);

  let [fontsLoaded] = useFonts({
    OverlockSC_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Check if any preset has isActive: true
  const isAnyPresetActive = presetArray.some((item) => item.isActive);

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <AiScreenView>
        <AiText> Enter your annoucnement</AiText>
        <Text>
          Note** - All the input text will be translated & converted to bangla
          audio
        </Text>
        <AiTextInputView>
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
        </AiTextInputView>

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
              style={{ marginBottom: 5, width: "80%" }}
              onPress={() => save(toString(text))}>
              <AiInputText>Generate audio</AiInputText>
            </AiInputButton>
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
              clearPreset();
            }}
            style={{
              marginBottom: 10,
              width: "80%",
              backgroundColor: color.red,
            }}>
            <AiInputText>Clear List</AiInputText>
          </AiInputButton>
        </View>

        <AiVoiceText>AI Genareted Annoucnements</AiVoiceText>

        <AiScrollView Vertical={true}>
          {presetArray.length !== 0 ? (
            presetArray.map((item, index) => (
              <PresetComponent
                key={index}
                speak={speak}
                text={item.text}
                handleDelete={() => handleDelete(index)}
                index={index}
                isActive={item.isActive}
                time={item.updateTime}
              />
            ))
          ) : (
            <AiVoiceText style={{ textAlign: "center", fontSize: 15 }}>
              No Preset Annoucement Added here ☺
            </AiVoiceText>
          )}
        </AiScrollView>

        <NextButton
          onPress={() => {
            if (isAnyPresetActive) {
              navigation.navigate("Speaker Screen");
            } else {
              Alert.alert(
                "Alert",
                "No active Sound to announce.Click on any sound to activate it.",
                [{ text: "OK" }]
              );
            }
          }}
          hasAudio={Boolean(isAnyPresetActive)} // Pass the audio prop here
        >
          <AiInputText>Next Step</AiInputText>
        </NextButton>
      </AiScreenView>
    </SafeView>
  );
};
