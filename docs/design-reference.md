# InstantNote design reference

## Direction

A calm, premium field notebook for capturing a thought and returning to it. Keep the interface clean and quietly editorial: warm paper surfaces, readable ink, one restrained botanical accent, and a small capture-state accent. Let the person's words and references lead; AI suggestions remain clearly secondary.

The UI/UX Pro Max style lookup favored Minimalism & Swiss Style for its clean, spacious, functional tool interfaces. The product lookup returned no matching notes or idea-capture archetype, so this direction is a product-specific interpretation rather than a claimed catalog match. A generated marketing-storytelling pattern and unrelated palettes were deliberately excluded.

Use the system sans-serif for legibility, native rendering, offline use, and dependable Android support. Do not add a font download or icon package for this reference. Avoid generic gradients, decorative effects, emoji icons, and a card around every section.

## Capture-ready screen

```text
+----------------------------------+
|                                  |
|  instantNote              Ideas  |
|                                  |
|                                  |
|  Make room for                   |
|  the thought.                    |
|                                  |
|  A short line of calm guidance   |
|  about saving the thought with   |
|  the reference that sparked it.  |
|                                  |
|                                  |
|             [ mic ]              |
|        Start a voice note        |
|                                  |
|                                  |
|  Your ideas                      |
|  Return to a thought when        |
|  you are ready.                  |
|                                  |
+----------------------------------+
```

The microphone is a clearly labeled, prominent action, at least 48 dp high, with visible pressed/disabled feedback. Showing this screen never requests microphone access or starts recording. "Ideas" is a separate, clearly named way to browse saved captures, not a competing capture button.

## Saved-ideas screen

```text
+----------------------------------+
|                                  |
|  Ideas                           |
|  Your thoughts, kept close.      |
|                                  |
|  [ Search your ideas          ]  |
|                                  |
|  RECENT                          |
|  28 Oct                          |
|  A transition that follows music |
|  Original voice + 2 references   |
|  Saved on this device            |
|  ------------------------------  |
|  27 Oct                          |
|  A calmer way to show progress   |
|  Original voice                  |
|                                  |
|                    [ New idea ]  |
+----------------------------------+
```

Use a simple list with quiet separators, not a stack of elevated cards. Keep each entry anchored by its title, date, and original-content indicator. Show empty, loading, and error states distinctly when local storage is introduced. Search filters actual saved ideas when implemented.

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

The first reference covers two static screens only. Recording, permissions, storage, navigation, AI, and animation behavior are separate roadmap slices.
