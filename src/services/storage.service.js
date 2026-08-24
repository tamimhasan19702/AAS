/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  RECORDED_SOUNDS: "recordedSounds",
};

export const loadJson = async (key, fallback = null) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Error loading "${key}" from storage:`, error);
    return fallback;
  }
};

export const saveJson = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving "${key}" to storage:`, error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing "${key}" from storage:`, error);
  }
};
