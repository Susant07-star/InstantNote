# InstantNote design reference

## Direction

A calm, premium field notebook for capturing a thought and returning to it. Keep the interface clean and quietly editorial: warm paper surfaces, readable ink, one restrained botanical accent, and a small capture-state accent. Let the person's words and references lead; AI suggestions remain clearly secondary.

The UI/UX Pro Max style lookup favored Minimalism & Swiss Style for its clean, spacious, functional tool interfaces. The product lookup returned no matching notes or idea-capture archetype, so this direction is a product-specific interpretation rather than a claimed catalog match. A generated marketing-storytelling pattern and unrelated palettes were deliberately excluded.

Use the system sans-serif for legibility, native rendering, offline use, and dependable Android support. Use `expo-symbols` for SF Symbols on iOS and `@expo/vector-icons` MaterialIcons on Android. Avoid generic gradients, decorative effects, emoji icons, and a card around every section.

Every screen should feel polished and visually consistent while adapting to small and large phones, tablets, landscape orientation, and system text scaling. The approved [WhatsApp reference image](./WhatsApp%20Image%202026-10-28%20at%203.47.00%20PM.jpeg) informs navigation and content hierarchy, not the palette: keep the app's current system-responsive light and dark themes. Separate the header from the screen body with one subtle, theme-aware divider.

## App navigation and drawer

```text
+----------------------------------+
| [panel]       Capture | Ideas    |
+----------------------------------+
|                                  |
|          Active screen           |
|                                  |
+----------------------------------+
```

Use two compact top-level tabs, **Capture** and **Ideas**, with a leading side-panel control and a trailing three-dot view menu matching the supplied right-side menu reference. The header has a subtle bottom divider. On phones, include the live top safe-area inset in the header layout so controls never sit under the status bar; apply the same safe-area handling to the drawer and overlays. Do not show the app name in the main screen. Opening the drawer shows a leading sidebar control, the title “InstantNote,” and a generic circular placeholder mark that can later be replaced with the final logo. Keep the existing light/dark theme behavior; the reference's black background is not a request to force dark mode.

## Capture screen

```text
+----------------------------------+
| [panel]       Capture | Ideas     |
+----------------------------------+
|                                  |
|                                  |
|               (mic)              |
|                                  |
|                                  |
+----------------------------------+
```

The capture screen contains no app-name text or promotional copy. Its primary action is a large, centered circular microphone button with an accessible label and clear pressed feedback. It remains a non-recording preview until the recording slice is implemented.

## Saved-ideas screen

```text
+----------------------------------+
| [panel]       Capture | Ideas [⋮]|
+----------------------------------+
|                                  |
|       Previous 7 Days            |
|   [ idea title and short text ]  |
|                                  |
|       Previous 30 Days           |
|   [ idea title and short text ]  |
|                                  |
| [ Search ideas...         ] [pencil] |
+----------------------------------+
```

Follow the reference's grouped idea list and bottom search/compose controls without copying its colors. Keep idea rows content-led and restrained, not a stack of decorative cards. Grouping by recency is optional until actual dates exist. On the empty state, show only a concise “No ideas yet” message; do not add explanatory preview text. Search is local and filters titles and user-authored text. When the library has ideas but a query matches none, show a distinct no-match message and a clear-search action. The pencil opens a manual text composer; saving preserves the user's exact text locally, with no AI rewrite. Rich note formatting is planned as a separate later roadmap slice.

## Drawer

```text
+-------------------------+
|  (generic circle)       |
| [sidebar] (circle)      |
|  InstantNote            |
|                         |
+-------------------------+
```

The drawer is opened with the leading side-panel control. Its first row places a sidebar icon on the left, followed by a generic circular placeholder and the “InstantNote” title. Use a simple placeholder until a final logo is provided. Keep the app name in the drawer rather than repeating it in the main screen content. On Ideas only, the trailing three-dot control opens a compact menu for switching between List, Card, and Grid view; indicate the current selection and keep the menu usable on narrow screens. Hide it on Capture while reserving its header space so the tabs stay aligned.

## Shared tokens

The source of truth is [`theme/`](../theme/). Every screen should use semantic palette names, a four-point spacing rhythm, named type styles, a consistent corner scale, minimal elevation, and short state feedback. Light and dark palettes are intentionally designed as related tones rather than inverted colors.

| Purpose | Light | Dark |
| --- | --- | --- |
| Background | `#F7F6F2` | `#181B18` |
| Surface | `#FFFDF8` | `#222722` |
| Main text | `#242821` | `#F2F1E9` |
| Secondary text | `#575E55` | `#C1C7BE` |
| Natural accent | `#365C46` | `#A7C6A7` |
| Capture state | `#A84F3A` | `#F09581` |

Spacing uses 4/8/12/16/24/32/48/64 dp. Keep text at or above the body size, let system text scaling grow content naturally, use continuous corners, and design touch targets at least 48 dp on Android and 44 pt on iOS. Use a single icon family with visible text labels for primary actions. Keep controls inside system safe areas and preserve readable contrast in both themes.

The reference defines the shell and Ideas-screen hierarchy. Typed-idea storage, composing, and local search are planned as early slices; recording, camera permissions, media storage, and AI remain separate later slices.
