# InstantNote Development Roadmap

This roadmap turns the product brief and technology plan into small, reviewable implementation slices. It is intentionally ordered around proving that a capture is safe and useful before adding AI or optional features.

## How AI agents must work

1. Work on **one numbered slice only**. Do not start the next slice, combine phases, or continue after a successful check without the user's review.
2. Before editing, state the slice, expected behavior, likely affected areas, and the checks to run.
3. Split phases into small, coherent feature chunks, each with one observable outcome. Choose chunk boundaries based on behavior and verification, not file count or line count. A chunk may require any number of files or lines when that is necessary to complete the feature correctly.
4. Make the smallest coherent change. Avoid placeholder screens, speculative dependencies, broad refactors, invented API behavior, and unrelated cleanup.
5. After editing, run the narrowest relevant automated check (for example lint, type-check, unit test, or a focused build). Report the exact command and result. Do not claim a device behavior was tested if it was only type-checked.
6. After the feature chunk's automated checks pass, give the user short, numbered manual verification steps: device/setup needed, exact action, expected result, and what failure to report. **Wait for the user's result before making another code change.** If the user cannot run a device check, ask whether to defer that check or proceed with the stated limitation.
7. If a check fails, fix only the failure within the same slice, rerun it, and present the final manual check. Never hide a failed check or silently continue.
8. Keep the slice status in this roadmap current: mark it `IN PROGRESS` before editing, `WAITING FOR USER` after automated checks pass, and `DONE` only after the user confirms the manual check or explicitly accepts deferring it. Do not mark later slices complete out of order.

## Product-wide acceptance rules

- The user starts all recording with a deliberate action and can always tell when recording is active and how to stop it.
- The original recording, media, and user's words are never overwritten by an AI result.
- Local media and its database record are saved before AI processing. Offline, permission, upload, and AI errors are visible and do not discard the capture.
- AI output is an editable draft, labeled separately from user-authored content. It must connect the user's intent to the reference, not merely summarize it.
- The interface follows one shared visual system. It feels like a calm, premium field notebook for developing ideas—not a generic AI dashboard. Captures and user words lead; AI suggestions are secondary.
- Recording, saving, offline, error, retry, empty, and loading states are designed, not left blank. Maintain accessible contrast, readable type, safe areas, reduced-motion behavior, and platform-appropriate touch targets.
- Video is optional until the real-device go/no-go test passes. Voice plus photo remains the dependable first-version path.

## Phase 0 — Confirm the working agreement

**No app code in this phase.**

- [x] **0.1 Product and device check — `DONE`.** Android phone available for testing; Android first with iOS to be decided later; voice plus photo is the core flow and video waits for device testing. The user will arrange Meta model access (credits are available) and a Supabase project for the later backend phase. Do not request or commit secrets in chat or source.
- [x] **0.2 Design direction approval — `DONE`.** The user approved a clean, premium, professional direction. Create and review the specific capture/saved-ideas design reference in Phase 2 before UI implementation, following [AGENTS.md](../AGENTS.md).

**Gate:** User approves the product/device assumptions and design direction. No credentials are required to begin local-only work.

## Phase 1 — Create a runnable app foundation

- [x] **1.1 Scaffold and launch — `DONE`.** Generated and reviewed the minimal Expo + React Native + TypeScript app. The user confirmed the starter screen loads in Expo Go on the Android phone without a red screen.
  - Automated: install from the generated lockfile; run the scaffold's type-check/lint/build checks that exist.
  - Manual: start the app, open it in Expo Go on the agreed Android phone, and confirm the starter screen loads without a red screen.
- [x] **1.2 Baseline and dependency record — `DONE`.** Confirmed Expo SDK `~58.0.20` / SDK 58.0.0, Node.js 22.20.0, npm 10.9.3, the blank TypeScript app structure, and Expo Router as the planned navigation choice. Defer router packages until routed screens are introduced; the blank root app does not need a navigation dependency. Added the repeatable `npm run typecheck` script. The scaffold has no lint or test runner yet. The user cold-closed and reopened Expo Go on the Android phone and confirmed there was no red screen.
  - Automated: `npm ci --no-audit --no-fund`; `npm run typecheck`; `npx expo config --type public`. Lint/test commands are not available in the blank template.
  - Manual: on the Android phone, cold-close Expo Go and reopen InstantNote from the project list or scan the current Expo QR code; confirm the starter screen loads without a red screen.

**Gate:** A minimal app starts on the target phone and there is a known, repeatable check command. Pause for user review.

## Phase 2 — Establish the product's visual language

- [ ] **2.1 Design reference and tokens — `NOT STARTED`.** Create one small approved reference for the capture-ready and saved-ideas screens. Define semantic color, spacing, typography, radius, elevation, and motion tokens in one theme entry point. Choose actual font/icon assets only when licensing, platform support, and offline behavior are confirmed.
  - Automated: type-check theme exports; check color contrast for text and controls.
  - Manual: inspect the reference on a phone-sized viewport in light mode and, if supported, dark mode. Confirm it feels calm/editorial and not like a generic AI template.
- [ ] **2.2 Shared primitives — `NOT STARTED`.** Implement only the first needed primitives (for example primary action, icon action, section heading, and status message) using the theme. Do not build a speculative component library.
  - Automated: type-check; run focused component tests if the chosen setup supports them.
  - Manual: check touch targets (44pt iOS / 48dp Android), text legibility, pressed/disabled feedback, and spacing.
- [ ] **2.3 App shell and capture-ready screen — `NOT STARTED`.** Build the static first screen and a simple saved-ideas entry point from the approved design reference. The microphone action is visible but does not record yet.
  - Automated: lint/type-check; test screen rendering.
  - Manual: launch on device; verify safe areas, hierarchy, navigation affordances, and that microphone permission/recording does not start on opening.

**Gate:** User approves a consistent visual foundation before functional screens expand. Later screens must reuse these tokens and primitives.

## Phase 3 — Prove phone capture capabilities

- [ ] **3.1 Permission and audio spike — `NOT STARTED`.** Add the smallest focused microphone permission and short-recording test behind an explicit tap. Do not add SQLite or AI yet.
  - Automated: lint/type-check and focused permission-state tests where possible.
  - Manual: grant permission, record briefly, stop, and confirm playback; deny permission and confirm a clear explanation and retry path; verify no recording starts without a tap.
- [ ] **3.2 Photo capture spike — `NOT STARTED`.** Add a focused photo permission/capture test, separate from the full capture flow.
  - Automated: lint/type-check.
  - Manual: grant/deny camera permission, take a photo, and verify the preview and failure state on the phone.
- [ ] **3.3 Muted video + microphone go/no-go — `NOT STARTED`.** Test short muted video while the separate microphone recording is active. Keep this isolated and disposable until reliable.
  - Automated: lint/type-check.
  - Manual: on the real Android phone, record both together, stop, and play each file. Repeat once. Confirm video has no microphone audio and voice is present in the separate file.
  - Decision: only if both repeated tests pass, mark video eligible for later integration. Otherwise document the device limitation and continue voice-plus-photo only; never silently record unwanted video sound.

**Gate:** User confirms media quality and the video decision. A simulator-only result cannot pass the video gate.

## Phase 4 — Save captures safely on-device

- [ ] **4.1 Capture data model — `NOT STARTED`.** Define the smallest typed model for an idea, original voice recording, ordered attachment, transcript, AI draft, and processing state. Keep user-authored and AI-authored fields distinct.
  - Automated: type-check and unit tests for required fields/order/state transitions.
  - Manual: review a sample record shape; confirm it can represent voice-only, voice-plus-photo, later thoughts, and failed AI processing without replacing originals.
- [ ] **4.2 SQLite persistence — `NOT STARTED`.** Add the minimal local schema and repository operations for creating, loading, updating, and deleting an idea. No network calls.
  - Automated: migration/schema tests and CRUD tests against a local test database.
  - Manual: create and reopen a sample idea after restarting the app.
- [ ] **4.3 Durable media file storage — `NOT STARTED`.** Move a captured file from temporary cache into app document storage and persist its local URI. Define deletion/cleanup behavior.
  - Automated: file-copy and missing-file error tests.
  - Manual: save a photo/audio file, force-close/reopen, play/view it, then delete the idea and confirm its app-owned file is removed.
- [ ] **4.4 Save-state and recovery — `NOT STARTED`.** Add visible local saving/saved/error status and recover incomplete records without deleting their originals.
  - Automated: tests for save failure, interrupted state, and recovery.
  - Manual: interrupt or simulate a failed save; confirm the UI reports the issue and offers retry rather than showing success.

**Gate:** A local record and its original files survive app restart and can be deleted. User manually verifies before building the full capture screen.

## Phase 5 — Complete voice-plus-photo capture

- [ ] **5.1 Voice recording flow — `NOT STARTED`.** Connect the approved capture UI to explicit start/stop, recording indication, elapsed time/level display, and local save. Keep this slice to voice only.
  - Automated: state-transition tests, lint, and type-check.
  - Manual: start/stop repeatedly, navigate away if allowed, and confirm the saved recording is still available.
- [ ] **5.2 Add photo during recording — `NOT STARTED`.** Capture a photo while voice is active; add it to the same idea in order without interrupting or silently stopping audio.
  - Automated: timeline-order and error tests; lint/type-check.
  - Manual: take multiple photos during a recording, stop, and confirm audio and photos are present in capture order.
- [ ] **5.3 Capture review and retry — `NOT STARTED`.** Show the user's originals, save state, and retryable local failures. Do not introduce AI.
  - Automated: loading/error/empty/content and retry tests.
  - Manual: turn on airplane mode, capture and reopen a voice-plus-photo idea, and confirm all originals remain accessible.

**Gate:** The complete voice-plus-photo flow works offline and after restart on the phone. User approval required.

## Phase 6 — Browse, revisit, and develop ideas locally

- [ ] **6.1 Saved ideas list — `NOT STARTED`.** Build a content-led list from real local records, including designed loading, empty, and error states. Avoid dashboard metrics and repeated decorative cards.
  - Automated: list sorting and empty-state tests.
  - Manual: verify empty, one-item, and multi-item states on device; reopen an idea.
- [ ] **6.2 Idea detail and edits — `NOT STARTED`.** Show original thought/media separately from editable transcript and later AI fields. Preserve previous user text on save failures.
  - Automated: edit persistence and failed-save tests.
  - Manual: edit the transcript, restart the app, and verify the edit persisted while original audio remained available.
- [ ] **6.3 Add a later thought and attachment — `NOT STARTED`.** Append to the selected idea's timeline without changing earlier thoughts or silently merging separate ideas.
  - Automated: append/order/association tests.
  - Manual: add a later thought to one idea and confirm a second idea remains unchanged.
- [ ] **6.4 Local text search and delete confirmation — `NOT STARTED`.** Search saved titles/transcripts locally and provide explicit confirmation before destructive deletion.
  - Automated: search matching and deletion tests.
  - Manual: search for a known phrase, clear search, cancel deletion, then confirm deletion of a test idea and its files.

**Gate:** A user can capture, leave, find, reopen, edit, append to, and delete an idea without network access.

## Phase 7 — Optional personal context

- [ ] **7.1 First-use context prompt — `NOT STARTED`.** Offer a few broad interests, "something else," and skip. Do not block capture.
  - Automated: onboarding state and skip tests.
  - Manual: try choose, skip, close, and relaunch paths.
- [ ] **7.2 Edit context and optional project name — `NOT STARTED`.** Let a person change or remove their context and leave ideas unassigned.
  - Automated: persistence and unassigned-idea tests.
  - Manual: change/remove context and create an unassigned idea.

**Gate:** Context remains optional, editable, and never forces categories. User review required.

## Phase 8 — Add the private AI service

- [ ] **8.1 Backend setup decision — `NOT STARTED`.** Confirm the Supabase project, region, account access, Meta API documentation/eligibility, and a secure secrets workflow. Keep credentials out of source, chat, logs, screenshots, and mobile `EXPO_PUBLIC_` variables.
  - Manual: user confirms the Supabase project and approved secret provisioning method before any remote resource is changed.
- [ ] **8.2 Minimal Edge Function boundary — `NOT STARTED`.** Add one authenticated/appropriately protected request boundary with input limits, explicit errors, and no secret in client code. Do not call Meta yet.
  - Automated: function tests for valid, invalid, oversized, and unauthorized requests.
  - Manual: invoke only a non-sensitive test request; verify expected response and error without revealing secrets.
- [ ] **8.3 Meta transcription integration — `NOT STARTED`.** Verify current official Meta API requirements and actual Expo recording format first. Add one transcription request and keep local original untouched. Convert audio only if verified necessary.
  - Automated: request validation and mocked provider success/failure tests.
  - Manual: test with a short consenting sample; correct the transcript; confirm original audio remains and failed requests are retryable.
- [ ] **8.4 Structured Idea File draft — `NOT STARTED`.** Send the user's corrected/uncorrected transcript and selected reference to the model. Validate a typed response for observation, why it matters, possible idea, and one next step. Do not auto-accept or overwrite user text.
  - Automated: schema validation, malformed response, and provider error tests.
  - Manual: try one real reference tied to a specific goal; confirm suggestions are relevant, editable, and clearly identified as AI.

**Gate:** User approves privacy, the live provider behavior, and a useful Idea File before any background queue is added.

## Phase 9 — Offline AI queue and recovery

- [ ] **9.1 Persist AI job states — `NOT STARTED`.** Add a minimal local pending/processing/succeeded/failed state and ensure every queued item points to an already-saved local capture.
  - Automated: state-transition and duplicate-job tests.
  - Manual: queue without a connection and confirm the original idea remains readable.
- [ ] **9.2 Foreground retry and progress — `NOT STARTED`.** Retry when the app opens/returns to foreground and when the user explicitly retries. Do not promise background execution.
  - Automated: retry, duplicate submission, and failure-retention tests.
  - Manual: queue offline, restore connectivity, reopen the app, and observe one processing attempt and a clear result.
- [ ] **9.3 AI draft review/edit — `NOT STARTED`.** Show AI suggestions beside original captures, allow edit/accept/reject, and save edits locally.
  - Automated: accept/reject/edit persistence tests.
  - Manual: reject one suggestion, edit another, restart, and verify the decision persisted without changing the original.

**Gate:** Offline capture and foreground retry are dependable; failed jobs never erase user data.

## Phase 10 — Video, only if approved by device evidence

- [ ] **10.1 Optional short video capture — `NOT STARTED`.** Implement only if Phase 3's repeated real-device go/no-go passed. Limit duration/file size and preserve explicit user start/stop.
  - Automated: video state, duration limit, cleanup, and failure tests.
  - Manual: capture and reopen a short clip with separate voice audio; confirm duration and playback.
- [ ] **10.2 Optional video understanding — `NOT STARTED`.** Add only after verified provider documentation and a cost/latency test. Keep photo as fallback and never block the voice-plus-photo flow.
  - Automated: provider failure and fallback tests.
  - Manual: compare one short clip draft with the photo-based path; accept only if reliable and materially useful.

**Gate:** If hardware or model behavior is unreliable, explicitly defer video and protect the finished core flow.

## Phase 11 — Quality, demo, and release readiness

- [ ] **11.1 Accessibility and visual consistency pass — `NOT STARTED`.** Audit every implemented screen against the approved design tokens, native control patterns, contrast, screen-reader labels, dynamic text, touch targets, safe areas, and reduced motion.
  - Automated: lint/type-check and available accessibility checks.
  - Manual: walk all screens on the target phone with larger text and screen reader where available; verify no clipped controls or ambiguous recording state.
- [ ] **11.2 Failure-path regression — `NOT STARTED`.** Test denied permissions, interrupted capture, low storage, airplane mode, app restart, missing file, failed upload, malformed AI result, and delete behavior.
  - Automated: run all focused tests and the full project test suite.
  - Manual: execute the real-device failure checklist and confirm no capture is lost.
- [ ] **11.3 Demo rehearsal and submission check — `NOT STARTED`.** Prepare one realistic end-to-end demo showing capture intent, saved reference, specific idea suggestion, and next step. Check current official hackathon submission rules; do not infer requirements from old notes.
  - Automated: final project checks and production bundle/build appropriate to the target.
  - Manual: rehearse on the actual device from a clean launch, including a recovery path if AI is offline.

**Final gate:** User approves the end-to-end behavior, visual quality, privacy posture, and demo. Only then consider store submission, cloud sync, accounts, or other post-hackathon work.

## Explicitly out of scope for the first version

System-wide floating capture overlays, long-form video, always-on/background recording, accounts, cloud backup/sync, collaboration, broad web research, generated images, automatic linking/merging of ideas, payments, project-management features, and semantic search. Revisit only after the final gate or explicit user reprioritization.
