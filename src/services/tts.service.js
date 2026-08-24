/** @format */

const TTS_BASE_URL =
  process.env.EXPO_PUBLIC_TTS_API_URL ||
  "https://aas-backend-git-main-tamimhasan19702s-projects.vercel.app/";

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(new Error("Audio response is null or empty"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Fetches synthesized speech for the given text from the TTS backend.
 * Wire format preserved: the text param is wrapped in literal quotes.
 *
 * @returns {Promise<{dataUrl: string, durationMs: number}>}
 */
export const synthesizeSpeech = async (textToConvert) => {
  if (!textToConvert) {
    throw new Error("Text to convert is null or empty");
  }

  const startTime = performance.now();
  const response = await fetch(
    `${TTS_BASE_URL}/speech?text="${encodeURIComponent(textToConvert)}"`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const dataUrl = await blobToDataUrl(await response.blob());
  return { dataUrl, durationMs: performance.now() - startTime };
};
