# InstantNote: Capture and Develop Ideas

## The problem

People get useful thoughts while watching something, working, studying, or out in the world. They may not have time to type. They take a photo, save a video, or make a note, then later forget what caught their attention or what they wanted to do with it.

The problem is not only capturing a thought. It is keeping the thought and its context together, then helping the person return to it and make progress.

## What InstantNote does

InstantNote is a phone-first app for quickly capturing a thought with the photo, video, or other reference that goes with it. AI helps turn that capture into an idea the user can develop later.

The app can adapt to different interests: making videos, coding, studying, design, or something else. These are examples, not separate apps.

## How capture should work

1. When the app opens, show the Capture tab with a large, centered microphone button. Do not start recording until the user taps it.
2. Tapping the microphone opens a focused capture panel. While recording, show a moving sound display and buttons to take a photo or record a short video.
3. Add each photo or video to a timeline in the order it was captured, alongside the voice recording. Let the user stop, save, or leave capture and continue into their saved ideas.
4. Save the original recording and media before asking AI to process them. If processing is slow or fails, do not lose the capture.

The first version should use a capture panel inside the app rather than a phone-wide floating window. A true system overlay can add phone-specific setup and permissions; it is not needed to demonstrate fast capture.

## Navigation and manual ideas

- Keep **Capture** and **Ideas** as the two primary tabs at the top of the app.
- The main screen does not repeat the app name. A leading drawer control opens a panel whose top row has a sidebar icon, a generic circular placeholder mark, and the title “InstantNote” until the final logo is ready.
- On the Ideas tab, a trailing three-dot menu offers List, Card, and Grid view choices, following the supplied right-side menu reference. Hide it on Capture.
- Put local idea search and a pencil compose action at the bottom of the Ideas screen, following the approved [WhatsApp design reference](./WhatsApp%20Image%202026-10-28%20at%203.47.00%20PM.jpeg). Follow its layout and hierarchy, while retaining the app's system-responsive light and dark themes.
- The pencil action opens a manual text editor. Saving creates a local idea containing the user's exact text, without requiring audio, a reference, or AI processing. Keep the text intact and editable.
- Search filters locally saved idea titles and user-authored text as the person types. It offers an easy clear action and distinct empty-library/no-match states; it does not send private idea text to a service.
- Rich formatting for notes (including headings, bold, italic, and bulleted/numbered lists) is a later editor phase; the initial composer stores plain text.

## Personal context

During first use, ask what the person is mainly working on, such as video making, coding, or studying. Let them choose "something else" or skip this step. They should also be able to name a project, change their answer, or leave an idea without a project.

This context should help AI make suggestions that fit the user's work. It should not force every capture into a category.

## What the user gets back

After capture, InstantNote creates an editable Idea File containing:

- **Your original thought:** the recording and transcript, which the user can correct.
- **Your references:** the photos, video, or links captured with the thought.
- **What you noticed:** a short description of the relevant part of the reference.
- **Why it matters to you:** the user's purpose or project, which they can correct.
- **Your possible idea:** a suggestion for how to use or adapt the reference in the user's own work.
- **One next step:** a small action the user could try.

Clearly mark the user's own words separately from AI descriptions and suggestions. The user can edit, accept, or reject suggestions. AI must not replace the original thought or media.

## Why it is different

Microphones, cameras, timelines, and AI summaries are not unique on their own. The intended difference is connecting **what the user captured**, **why it mattered to them**, and **what they might do with it**.

For example, someone saves a video transition and says, "I like how this changes with the music. I want to try that feeling in my cooking video." InstantNote should help turn that reference and intention into a small idea for the user's own video, not just summarize the clip.

This difference still needs to be tested. The demo should show an idea that is more useful than a saved link or a generic summary.

## Returning to an idea

Users should be able to search, reopen, and add another thought or attachment later. Keep new thoughts in a simple timeline so the original capture and previous changes remain available. Search should include manually typed ideas locally, and later include user-authored transcripts and thoughts. AI should not silently join separate ideas or rewrite the user's earlier words.

## What to build first

- A phone-sized Capture screen with a large microphone button, top-level Capture/Ideas tabs, and a drawer containing the app name and temporary logo mark.
- A concise Ideas screen with a local search field, a pencil action for manual text entry, and saved ideas presented in a readable, grouped list.
- Local manual idea creation, saving, reopening, editing, and search before expanding into media capture.
- A later rich-text editing phase for headings, emphasis, and lists, while preserving existing plain-text notes and local search.
- Voice recording with a visible sound display.
- Photo capture during the recording, added to the capture timeline.
- Saving and reopening a capture, including after leaving the app.
- A useful, editable Idea File based on both the user's words and reference.
- A small amount of optional personal context, such as what the user is working on.
- Search and a way to add a later thought.

Test short video capture early. Include it in the first version if it works reliably with voice and photos; otherwise, finish the voice-and-photo flow first and use a short video in the demo only if it is dependable.

Leave long videos, broad web research, generated images, automatic connections between ideas, and project-management features for later.

## Risks to handle

- **Recording without the user's intention:** only record after a clear tap; show when recording is active and provide a clear stop button.
- **Losing a spontaneous thought:** save the raw recording and media before AI processing.
- **AI misunderstanding the reference or purpose:** show the original capture next to the draft and make corrections easy.
- **A generic result:** ask what the user wants to do with the reference and make the suggestion specific to that goal.
- **Too many features for the deadline:** finish one complete capture, save, reopen, and develop flow before expanding it.

## A simple test

Try the app with a real video, screenshot, or idea you have saved. Check whether it keeps the original context and gives you a useful next step for your own work. If it only makes a summary, the main product idea is not working yet.