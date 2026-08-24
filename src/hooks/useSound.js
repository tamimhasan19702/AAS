/** @format */

import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

/**
 * Owns a single Audio.Sound instance for the lifetime of the calling
 * component/provider and cleans it up on unmount.
 */
export const useSound = () => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Audio.Sound();
    const sound = soundRef.current;
    return () => {
      sound.unloadAsync().catch(() => {});
      if (soundRef.current === sound) {
        soundRef.current = null;
      }
    };
  }, []);

  const playDataUrl = async (dataUrl) => {
    if (!soundRef.current) return;
    await soundRef.current.unloadAsync();
    await soundRef.current.loadAsync({ uri: dataUrl });
    await soundRef.current.playAsync();
  };

  return { playDataUrl };
};
