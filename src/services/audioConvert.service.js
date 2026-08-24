/** @format */

import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { get, set } from "firebase/database";
import { FIREBASESTORAGE, FIREBASEDATABASE } from "../../firebase.config";
import { FIREBASE_PATHS } from "../constants/firebasePaths";

const CONVERT_BASE_URL =
  process.env.EXPO_PUBLIC_CONVERT_API_URL || "https://aas-backend.vercel.app";

/**
 * Deletes an object in Firebase Storage pointed to by a download URL stored
 * at the given database path. Silently ignores "object not found".
 */
export const deleteExistingStorageObject = async (dbPath) => {
  try {
    const snapshot = await get(ref(FIREBASEDATABASE, dbPath));
    if (!snapshot.exists()) return;

    const existingUrl = snapshot.val();
    try {
      await deleteObject(ref(FIREBASESTORAGE, existingUrl));
    } catch (error) {
      if (error.code !== "storage/object-not-found") {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Error deleting existing object for "${dbPath}":`, error);
    throw error;
  }
};

/**
 * Uploads the local recording (3gp) to Firebase Storage, replacing the
 * previously stored recording. Returns the download URL.
 */
export const uploadRecording = async (fileUri) => {
  await deleteExistingStorageObject(`${FIREBASE_PATHS.RECORDINGS}/url`);

  const storageRef = ref(
    FIREBASESTORAGE,
    `${FIREBASE_PATHS.RECORDINGS}/${Date.now()}.3gp`
  );
  const response = await fetch(fileUri);
  const blob = await response.blob();
  await uploadBytes(storageRef, blob);

  const url = await getDownloadURL(storageRef);
  await set(ref(FIREBASEDATABASE, FIREBASE_PATHS.RECORDINGS), { url });
  return url;
};

const waitForStreamableUrl = async (mp3StorageRef) => {
  const maxAttempts = 10;
  const interval = 3000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const mp3DownloadUrl = await getDownloadURL(mp3StorageRef);
      const urlResponse = await fetch(mp3DownloadUrl);
      if (urlResponse.ok) {
        await set(ref(FIREBASEDATABASE, FIREBASE_PATHS.CONVERTED), {
          url: mp3DownloadUrl,
        });
        return mp3DownloadUrl;
      }
    } catch {
      // File not ready yet - retry below
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error("Failed to retrieve streamable URL after multiple attempts.");
};

/**
 * Converts the uploaded recording (3gp) to MP3 via the conversion backend,
 * uploads it to Firebase Storage and stores its URL in the Realtime DB.
 * Returns the streamable MP3 download URL.
 */
export const convertToMp3 = async (firebaseUrl) => {
  try {
    await deleteExistingStorageObject(`${FIREBASE_PATHS.CONVERTED}/url`);

    const response = await fetch(`${CONVERT_BASE_URL}/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl: firebaseUrl }),
    });

    if (!response.ok) {
      throw new Error(`Failed to convert file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const mp3StorageRef = ref(
      FIREBASESTORAGE,
      `${FIREBASE_PATHS.CONVERTED}/converted_file_audio.mp3`
    );
    const metadata = { contentType: "audio/mp3" };
    await uploadBytes(mp3StorageRef, blob, metadata);

    await set(ref(FIREBASEDATABASE, FIREBASE_PATHS.CONVERTED), {
      url: await getDownloadURL(mp3StorageRef),
    });

    return await waitForStreamableUrl(mp3StorageRef);
  } catch (error) {
    console.error("Error during MP3 file conversion:", error);
    throw error;
  }
};
