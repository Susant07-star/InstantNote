# Technology for InstantNote

## The recommendation

Build InstantNote as a phone app with **Expo, React Native, and TypeScript**. Expo lets us build Android and iPhone versions from one project. Do not build a website first and then wrap it with Capacitor: the main experience depends on using the phone's camera, microphone, and offline storage together. A website can be considered later as a companion. For the hackathon, test on a real Android phone first if that is the device you can access; a phone simulator cannot fully test the camera and microphone.

## What we will use

- **Expo and React Native:** build the app screens and support phone features without maintaining separate Android and iPhone apps.
- **TypeScript:** catch common coding mistakes while building and make AI-generated changes easier to check.
- **Expo Router:** provide the app drawer and route structure. Use two clear top-level Capture and Ideas tabs; confirm the SDK 58-compatible implementation and install any required Expo-compatible packages with `npx expo install`.
- **Expo Camera (`expo-camera`):** show the camera, take photos, and record short videos with the video's own sound turned off.
- **Expo Audio (`expo-audio`):** record the microphone as a separate audio file and show recording status or audio levels. This records nearby sound as well as the user's voice; it does not isolate speech.
- **Expo FileSystem (`expo-file-system`):** move captured media into permanent app storage. Camera and audio files may start in temporary cache storage, which the phone can clear.
- **Expo SQLite (`expo-sqlite`):** save Idea Files, transcripts, media file locations, and later thoughts on the device so ideas remain after the app closes.
- **Expo Network (`expo-network`):** notice when the device may have regained a connection and check for captures waiting for AI processing.
- **Meta Model API:** use Muse Voice Transcribe for speech-to-text and Muse Spark for the user's text plus photo/video understanding and Idea File draft.
- **Supabase Edge Function:** a small private server endpoint that calls Meta. Keep the Meta API key on the server, never inside the phone app.

## How one capture works

1. The phone saves the microphone recording and each photo or silent video in the app's permanent storage.
2. SQLite saves the capture, the order and times of the media, and a status such as **Waiting for internet**.
3. If there is no internet, the user can still view and edit the saved capture. AI processing waits.
4. When internet is available and the app is open, it finds waiting captures and sends the needed files to the private server endpoint. It keeps the local originals if an upload or AI request fails, and retries later.
5. The server sends the separate microphone recording to Meta for transcription, then sends the transcript and visual media to Muse Spark for a structured draft.
6. The app saves the returned draft beside the original capture. The user can correct or reject it.

Save locally before calling AI. If the internet or AI call fails, the user's capture should still be there. "Offline-first" means capture and saved ideas work without internet; AI transcription and idea writing still need internet. The first version should retry when the app is opened or returns to the foreground, not promise that processing will always happen in the background. A Wi-Fi or mobile-data connection does not always mean the internet is actually reachable, so retry failed requests too.

Manual text ideas are the first local persistence slice: save the user's exact text in SQLite without requiring media or AI. Search stays on-device and filters saved idea titles and user-authored text. Extend this same record and repository for voice, media, transcripts, and AI drafts later; do not introduce a second storage system for typed notes.

## Important limits to test

- Expo Camera has a `mute` option for video, and Expo Audio can record a separate microphone track. The official docs do not promise that muted video and a separate audio recording will work together on every phone.
- First test: record microphone audio while recording a muted short video, stop both, and check that both files saved and play correctly. Test on a real Android phone. If it fails, keep voice-plus-photo as the core flow and add video as a separate capture; do not silently fall back to recording unwanted video sound.
- The microphone records nearby sounds too. If the product requires only the user's speech and no other ambient sound, voice isolation is a separate feature and should be left out of the hackathon build.
- Expo's regular audio recording may create an M4A file. Meta's file transcription endpoint requires mono, 16-bit WAV at 16 kHz or 24 kHz. Verify the recording format early and add a conversion step only if needed.
- Meta's dedicated transcription guide lists 25 languages but not Nepali. Do not promise Nepali voice transcription until it has been tested. Let users type or edit the transcript.
- Photo and video captures may initially be stored in a temporary cache. Move files to the app's document storage before treating them as saved. Local data stays on that phone and is lost if the app is removed, so cloud backup can be a later feature.
- Keep video short to reduce upload time and processing risk. Do not build background recording or a phone-wide floating window for the first version.

## Keep the first build small

For the hackathon, start with local SQLite for manually typed ideas and local search, then extend it with local media files and a small on-device waiting queue for AI jobs. Skip accounts, cloud syncing, shared projects, payments, and semantic search. Add online backup only if the capture-to-Idea-File experience is already working.

Use Meta's Standard mode for personal recordings. Keep the API key on the server. Provide a way to delete a capture and its files. If the app later stores private ideas in the cloud, add sign-in, access controls, and a clear privacy policy before inviting real users.

## Build and test order

1. Start a blank Expo app and run it on a real phone.
2. Build the visual shell from the approved references: top-level Capture/Ideas tabs, a drawer with a leading sidebar control, “InstantNote” title and generic circular placeholder, and no app-name text on the main capture screen. Add the trailing three-dot Ideas view menu with List/Card/Grid choices. Keep the existing system-responsive light/dark palettes.
3. Define a minimal local text-idea record and repository in SQLite. Save the user's original text without requiring media or AI; verify create, read, update, and delete locally.
4. Add the pencil composer, connect it to local save, and display saved ideas. Verify that a manually typed idea survives force-close and restart, and that a failed save remains visible and retryable.
5. Add on-device search for saved titles and user-authored text. Verify matches, no results, clearing the query, and that searches work offline.
6. In a separate rich-text editor phase, add headings, bold, italic, and bulleted/numbered lists. Preserve and reopen formatting, keep existing plain-text notes editable, and retain local search over note content.
7. Test the microphone permission and a short voice recording.
8. Test taking a photo during voice recording; save both, turn on airplane mode, and verify they remain available after closing and reopening the app.
9. Test muted video plus separate microphone recording at the same time. This is the first go/no-go test for video capture.
10. Extend the local record and repository for ordered attachments and durable media files, with a visible waiting-for-internet state. Restore internet and test that failed processing remains saved for another try.
11. Add the private server endpoint and verify it can call Meta without exposing the API key in the app.
12. Add transcription, then photo/video understanding and Idea File generation.
13. Test the complete flow, including no internet, denied permissions, interrupted recording, and a failed AI call.

Work on one numbered task at a time. After each task, run its check and pause for the user's review before starting the next one.

## Official documentation

- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo Audio](https://docs.expo.dev/versions/latest/sdk/audio/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [Expo Network](https://docs.expo.dev/versions/latest/sdk/network/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Meta models](https://dev.meta.ai/docs/models)
- [Meta speech-to-text](https://dev.meta.ai/docs/speech-to-text)
- [Meta image understanding](https://dev.meta.ai/docs/image-understanding)
- [Meta video understanding](https://dev.meta.ai/docs/video-understanding)
- [Capacitor Camera](https://capacitorjs.com/docs/apis/camera)
- [Capacitor Filesystem](https://capacitorjs.com/docs/apis/filesystem)