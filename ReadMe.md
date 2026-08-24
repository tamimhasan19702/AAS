<!-- @format -->

# AAS — Advanced Announcing System

Mobile app (React Native + Expo) for a final year project that lets users create text-to-speech or recorded voice announcements and broadcast them to one or more remote speakers. Each speaker is driven by an **ESP32 WiFi module** that listens to **Firebase Realtime Database**, acting as the bridge between this app and the hardware.

## How It Works

```
Mobile App (this repo)
   │
   ├── Text ───────► TTS Backend API ──► audio preview on device
   │                     │
   ├── Mic Recording ► Firebase Storage ──► Convert Backend (3gp → mp3)
   │                     │
   └── Speaker selection + announcement payload
                         │
                         ▼
              Firebase Realtime Database
                         │
                         ▼
              ESP32 WiFi module(s) ──► Speaker(s)
```

1. The user enters text (converted to Bangla speech by the TTS backend) or records their own voice.
2. Generated audio is stored/registered in Firebase (Storage for files, Realtime DB for text, presets, schedules, and speaker state).
3. The user picks target speakers and sends the announcement; the ESP32 modules pick up the change from the Realtime Database and play it.

## Features

- **AI Voice** — enter any text, synthesize speech via the backend TTS service, preview it, and save announcements as reusable presets.
- **Recorded Voice** — record audio with the device microphone, upload it, and auto-convert recordings (3gp → mp3) via the conversion backend.
- **Speaker picker** — toggle individual speakers or all at once before announcing.
- **Schedules** — queue announcements with a configurable duration using a built-in countdown timer.
- **History** — review previously sent announcements.
- State persisted both locally (AsyncStorage) and remotely (Firebase).

## Tech Stack

| Layer            | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| App framework    | [Expo](https://expo.dev) SDK 51, React Native 0.74                |
| Language         | JavaScript (JSX)                                                  |
| Navigation       | React Navigation 6 (bottom tabs + native stack)                   |
| UI               | styled-components, React Native Paper, Lottie animations          |
| Audio            | expo-av (recording/playback), expo-speech                         |
| Backend services | Firebase (Realtime Database + Storage), custom TTS & convert APIs |
| Build/deploy     | EAS Build (Android APK), expo-updates OTA                         |

## Project Structure

```
App.js                        # Root component + context providers
firebase.config.js            # Firebase init from environment variables
src/
├── components/               # Reusable UI components & navigators
│   └── Navigation/           # Bottom tabs, stack navigators
├── constants/                # Routes, frozen Firebase DB paths
├── context/                  # React contexts (AI, Schedule, Speakers, Voice)
├── features/                 # Screens: splash, start page, AI voice,
│   │                         # voice recording, speaker picker, schedule,
│   └── ...                   # history
├── hooks/                    # useSound, useSpeakerList
├── services/                 # TTS API, recording upload/mp3 conversion, storage
└── utils/                    # Colors, helpers, loading views
```

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- An Android device/emulator (the project uses `expo-dev-client`)
- Firebase project with Realtime Database and Storage enabled

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd AAS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file from the example and fill in real values:

   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `EXPO_PUBLIC_FIREBASE_*` — Firebase client config (inlined into the bundle)
   - `EXPO_PUBLIC_TTS_API_URL` — TTS backend base URL
   - `EXPO_PUBLIC_CONVERT_API_URL` — audio conversion backend base URL
   - `OPEN_AI_API_KEY` — server-side only (no `EXPO_PUBLIC_` prefix); route OpenAI calls through your backend instead

4. Start the development build:
   ```bash
   npm run android   # build & run on Android
   # or
   npm start         # start the dev client
   ```

### Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm start`       | Start Expo dev client     |
| `npm run android` | Run on Android            |
| `npm run ios`     | Run on iOS                |
| `npm run web`     | Run in browser            |
| `npm run lint`    | Lint the codebase         |
| `npm run format`  | Format code with Prettier |

### Production Build (EAS)

The project is configured to produce Android APKs:

```bash
eas build -p android --profile production
```

## Hardware Notes

- The ESP32 modules poll the Firebase Realtime Database paths defined in `src/constants/firebasePaths.js` (`audioText`, `presetArray`, `scheduleText`, `speakers`, `recordings`, `converted`, ...). Treat these keys as a frozen schema shared between the app, backends, and firmware.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
