/** @format */

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";
import { SpeakerComponent } from "../../components/speaker.component";
import { color } from "../../utils/colors";

const SpeakerText = styled(Text)`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
  font-family: "OverlockSC_400Regular";
`;

const AllSpeakerButton = styled(TouchableOpacity)`
  width: 90%;
  background-color: ${color.primary};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const NextSpeakerButton = styled(TouchableOpacity)`
  width: 90%;
  background-color: ${({ allSpeakersOn }) =>
    allSpeakersOn ? color.primary : color.gray};
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  flex-direction: row;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const AllSpeakerText = styled(Text)`
  text-align: center;
  font-size: 20px;
  color: ${color.white};
  font-family: "OverlockSC_400Regular";
  width: 100%;
`;

const AllSpeakerView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

/**
 * Shared "pick speakers and send" screen used by both the AI announcement
 * flow (speaker.feature) and the personal voice flow (speaker.voice).
 */
export const SpeakerPickerScreen = ({
  navigation,
  title,
  backRoute,
  speakers,
  onToggleSpeaker,
  onToggleAll,
  onSend,
  onBlockedSend,
}) => {
  const [sending, setSending] = useState(false);
  const anySpeakerOn = speakers.some((speaker) => speaker.isOn);

  const handleSendPress = async () => {
    if (!anySpeakerOn) {
      onBlockedSend();
      return;
    }
    try {
      setSending(true);
      await onSend();
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} route={backRoute} />
      <SpeakerText>{title}</SpeakerText>
      <ScrollView>
        {speakers.map((speaker) => (
          <SpeakerComponent
            key={speaker.no}
            No={speaker.no}
            isOn={speaker.isOn}
            toggleHandler={() => onToggleSpeaker(speaker.no)}
          />
        ))}
      </ScrollView>
      <AllSpeakerView>
        <AllSpeakerButton>
          <AllSpeakerText onPress={onToggleAll}>
            Turn {speakers.every((speaker) => speaker.isOn) ? "Off" : "On"} All
          </AllSpeakerText>
        </AllSpeakerButton>
        <NextSpeakerButton allSpeakersOn={anySpeakerOn} onPress={handleSendPress}>
          <AllSpeakerText>Send to Speaker</AllSpeakerText>
        </NextSpeakerButton>
      </AllSpeakerView>
      {sending && (
        <Overlay>
          <ActivityIndicator animating color={color.white} size="large" />
        </Overlay>
      )}
    </SafeView>
  );
};
