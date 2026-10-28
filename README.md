# InstantNote

InstantNote is a phone-first notebook for capturing ideas with voice and photos. The first version keeps captures and media on the device; short video is deferred until it passes a real-device test.

## Development setup

Requires Node.js and npm. Install the exact dependencies from the committed lockfile:

```sh
npm ci
```

Start the Expo development server:

```sh
npm start
```

Open the project in Expo Go on an Android phone connected to the same network, then scan the terminal QR code.

The capture screen's voice button is only a preview: it does not request microphone access or start recording. Ideas supports manually typed notes saved locally with SQLite and on-device search; rich-text formatting and media capture are planned for later phases.

## Checks

```sh
npm run typecheck
npx expo config --type public
```

The project does not currently include a lint or test runner.

## Project baseline

- Expo SDK 58, React Native, and TypeScript.
- npm with `package-lock.json`; use `npm ci` for a reproducible install.
- Expo Router provides file-based app navigation; routes are in `app/`.
- The package entry point is `expo-router/entry`; shared components and theme tokens live in `components/` and `theme/`.