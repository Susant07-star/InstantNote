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

## Checks

```sh
npm run typecheck
npx expo config --type public
```

The blank TypeScript scaffold does not currently include a lint or test runner.

## Project baseline

- Expo SDK 58, React Native, and TypeScript.
- npm with `package-lock.json`; use `npm ci` for a reproducible install.
- Expo Router is the selected navigation approach for routed screens. Its dependency is intentionally deferred until the route shell is introduced.
- Until then, `App.tsx` is the app entry point.