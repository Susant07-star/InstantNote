# InstantNote Project Guidance

## Read first

Before changing product behavior or architecture, read:

- [Product brief](docs/02-problem-and-product.md)
- [Technology plan](docs/03-technology.md)
- [Development roadmap and review gates](docs/04-development-roadmap.md)
- [Hackathon requirements](docs/01-hackathon.md)

Use the project-local skills in `.agents/skills/` for applicable Expo and Supabase work. Verify library behavior against the Expo SDK version in the project and current official documentation; the scaffold does not yet pin an SDK.

## Interface quality

- Aim for a polished, native-feeling **field notebook for developing ideas**: calm, editorial, warm, and focused on the user's own captures. It should feel deliberately art-directed, not like a generic AI dashboard.
- Use a restrained paper-and-ink foundation with one natural brand accent and a sparing capture/status accent. Define the actual palette, type scale, spacing, radii, and motion as shared theme tokens when the app is scaffolded; do not scatter one-off styles across screens.
- Let original photos, recordings, and the user's words lead. Make AI suggestions clearly secondary and labeled. Keep the capture action immediately obvious without letting it overwhelm browsing and returning to ideas.
- Avoid template-like screens: repeated cards around every element, generic gradients or glass, decorative blobs, excessive shadows, emoji icons, filler metrics, and generic AI sparkle motifs. Use a consistent native icon family and purposeful, restrained motion.
- Use `ui-ux-pro-max` for product-specific design research and `expo-design-system` plus `expo-native-ui` for implementation. Treat generated recommendations as candidates: check that they actually fit a mobile idea-capture app and the detected Expo SDK before adopting them.
- Meet platform touch-target guidance (44pt on iOS, 48dp on Android), maintain accessible contrast and readable type, respect safe areas and reduced motion, and provide clear feedback for recording, saving, offline, error, and retry states.

## Product and data principles

- Build a phone-first idea capture app. Never start microphone or camera capture without a clear user action, and make active recording and stopping obvious.
- Save original audio and media to durable app storage and persist their metadata locally before starting AI work. Offline or AI failures must not discard a capture.
- Keep original user words and media intact. Clearly distinguish editable AI descriptions and suggestions from the user's own content.
- Treat voice plus photo as the reliable core flow. Test simultaneous muted video and microphone capture on a real Android device before making it part of the core experience.
- Keep first-version ideas and media local. Do not add accounts, cloud sync, broad research, or project-management features unless the user changes scope.

## Architecture and privacy

- The planned stack is Expo, React Native, and TypeScript, using Expo Camera, Audio, FileSystem, SQLite, and Network as appropriate. Do not substitute a website-first or Capacitor approach.
- Install Expo-compatible packages with `npx expo install` after the app is scaffolded; do not guess package versions or add dependencies before confirming the SDK.
- Call Meta services through a private Supabase Edge Function. Never put Meta API keys or other server secrets in the mobile bundle or `EXPO_PUBLIC_` variables.
- Do not connect an external MCP to an unscoped account. Configure Supabase MCP only after a project reference exists, scoped to that project and read-only unless the user explicitly authorizes more access.

## Implementation and verification

- Follow [the development roadmap](docs/04-development-roadmap.md) exactly: one small slice at a time; no combining slices or proceeding past a user-review gate.
- Split phases into small, coherent feature chunks, each with one observable outcome. Decide chunk size by behavior and its verification needs, not by changed file or line count.
- After each feature chunk, run its focused automated checks, report the exact results, provide concise device/manual verification steps, and stop for the user's confirmation before editing again. Mark roadmap status accurately; automated checks alone do not count as user verification.
- Follow the numbered build order and per-step checks in [the technology plan](docs/03-technology.md). Complete one step and pause for user review before starting the next.
- Prefer a real Android phone for camera and microphone validation. A simulator cannot establish that the capture hardware flow works.
- Inspect available scripts and tests before running commands; this scaffold currently has no app manifest, dependencies, or test scripts.
- Keep local originals when uploads or AI calls fail, surface errors, and provide a user-visible retry path.
