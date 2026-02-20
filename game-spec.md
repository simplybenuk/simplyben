# Personal Site Game – High-Level Spec

## 1. Concept

This site is a **point-and-click, puzzle-driven journey**, not a portfolio.

- The player starts at a simple entry scene (e.g. a door, then a profile picture).
- Interactions trigger hidden states, transitions, and new “chapters”.
- The game should be easy to extend over time with new chapters and mechanics.
- The site is **not** about explaining me; it's about curiosity, atmosphere, and discovery.

No public nav. No obvious “About / Blog / Contact” structure. The game *is* the site.

---

## 2. Platform, Hosting & Stack

### 2.1 Hosting

- The site **must be deployable on GitHub Pages**.
- That means:
  - The build output is a **static bundle** (HTML + JS + CSS, no server-side code).
  - All routing is handled **client-side**.
  - No server-rendering or backend dependencies.

### 2.2 Recommended Stack (baseline for Codex / AI tools)

- **Framework:** React
- **Language:** TypeScript
- **Build tool:** Vite
- **Routing:** React Router using **HashRouter** (or another hash-based router)
  - This avoids GitHub Pages 404 issues on refresh / deep links.
  - Example root: `https://username.github.io/repo-name/#/` for Chapter 1.

Rationale:
- Very common stack, well supported by AI tools.
- Easy to keep modular, small components and scenes.
- Vite + React + TS builds a static SPA that works cleanly on GitHub Pages.

(If a different stack is chosen later, it must still: build to static files, support client-side routing, and work on GitHub Pages without server config.)

---

## 3. Structure

### 3.1 Chapters vs Puzzles

- **Chapters** are the top-level units and can map to routes:
  - `#/` → Chapter 1
  - `#/chapter2` → Chapter 2 (Signal Relay)
  - `#/chapter3` → Next Chapter (Pending)
- **Puzzles** live *inside* chapters as **state**, not separate URLs.

Goal:
- Players *can* bookmark a chapter.
- They **cannot** just guess URLs like `#/puzzle7` or `#/chapter500` and skip all the work.

### 3.2 Scene / State Model (per chapter)

Each chapter should be driven by a small state machine. Example (Chapter 1):

- `avatar` – initial screen with a profile picture in the centre.
- `blackout` – screen goes fully black after certain interaction.
- `torch` – user unlocks a movable “torch” spotlight and reveals hidden content.
- Future states can be added (e.g. “tear in reality”, “new room”, etc.).

Requirements:

- State transitions are handled by a central chapter controller.
- Puzzles should be extendable without rewriting the whole chapter.

---

## 4. Core Mechanics (Initial)

### 4.1 Avatar Click Sequence (Chapter 1)

- Start with a single profile image in the centre.
- Clicking/tapping the avatar increments an internal counter.
- After N clicks (e.g. 5), the scene transitions to **blackout** mode.
- Before blackout, the avatar can have minor animations (wiggle, flicker, glitch) but this is optional flavour.

### 4.2 Blackout → Torch Unlock

- In **blackout**, the screen is completely black.
- User clicks/taps multiple times with no immediate feedback (builds tension).
- After another N clicks (e.g. 7–13), the user unlocks a **torch** mode:
  - Cursor/finger controls a circular spotlight revealing a small area.
  - Everything outside the circle remains black.

### 4.3 Torch Behaviour

- Desktop:
  - Torch follows the pointer position smoothly.
- Mobile:
  - Torch should work without the finger covering the entire visible area.
  - Acceptable approaches:
    - Torch fixed in the centre; user drags to move the scene.
    - Torch offset from the touch point (e.g. light appears slightly above the finger).
    - Tap-to-move torch is acceptable if simpler.

Implementation guidelines:

- Use a single interaction layer based on **pointer events** so mouse and touch share logic.
- The torch effect can be implemented using CSS masks, SVG, or canvas; keep it encapsulated.

### 4.4 Hidden Content (No Spoilers)

- The torch reveals **hidden content** (text, symbol, shape, etc.) in Chapter 1.
- The exact content is intentionally *not* defined in this spec to avoid hardcoding spoilers here.
- The hidden content **may**:
  - Provide a clue for a later chapter.
  - Be a standalone, cryptic message.
  - Unlock a transition to another scene or chapter.

---

## 5. UX & Visual Guidelines

- The game area should behave like a **fullscreen “canvas”**:
  - Use a fixed aspect ratio (e.g. 4:3 or 16:9) inside the window.
  - Letterbox with black bars as needed; never crop interactive elements.
- Touch targets must be large enough for mobile (minimum ~40–48 px).
- Avoid hover-only clues; everything important must be discoverable by tap/torch/drag.
- No default browser scroll inside the play area:
  - Use a container with `overflow: hidden` for the main game viewport.

---

## 6. Progression & Saving

- Local progression should be stored per device (e.g. `localStorage`):
  - Example: `chapter1_state`, `chapter2_state`, etc.
- Optional (future):
  - Generate simple “progress codes” players can use to unlock later chapters on a different device.

No user accounts, no backend required for the initial versions.

---

## 7. Extensibility

The system must make it easy to add:

- New chapters (new routes, new state machines).
- New mechanics (e.g. sliders, draggable objects, doors, code entry).
- New visual assets and sound effects.

Chapters should be **mostly independent modules**:
- Shared utilities for input handling, rendering layers, and common effects (e.g. torch, fade, glitch).
- Each chapter implements its own scene logic and puzzle flow.

---

## 8. Non-Goals (For Now)

- No need for SEO-friendly content pages.
- No need for CMS integration.
- No user login or account system.
- No need for perfect accessibility *yet*, though:
  - Basic keyboard focus traps and an “exit to normal site” could be considered later.