# simplyben

A point-and-click puzzle story disguised as a personal site. The experience is intentionally minimal: one chapter at a time, no traditional navigation, and everything rendered client-side so it can ship to GitHub Pages without a server.

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for the build toolchain
- [React Router](https://reactrouter.com/) using a `HashRouter` so refreshes work on GitHub Pages

The build output is a static bundle (`dist/`) that can be uploaded to GitHub Pages or served by any static host. All puzzle state lives on the client (localStorage) so no backend is required.

## Chapter 1

Chapter 1 acts as the scaffolding for future chapters:

1. **Avatar scene** – A portrait demands several deliberate presses before it will react.
2. **Blackout** – The entire viewport turns into an empty void that only responds after more prodding.
3. **Torch mode** – Unlocks a pointer/touch driven spotlight revealing hidden glyphs and clues for future chapters.

The chapter logic is isolated inside `src/chapters/chapter1` with a small state machine so new chapters can reuse the same structure.

Player progress for each chapter is stored locally (e.g. `localStorage.chapter1_state`) so returning visitors resume where they left off. A small “Reset memory” control lets you start the sequence again during development/testing.

## Chapter 2

Chapter 2 now lives at `chapter2/index.html` as a standalone static puzzle called **Signal Relay**.

- You must replay short direction sequences across 3 rounds.
- It supports keyboard input (Arrow keys / WASD) and touch input via on-screen controls, so it is playable on desktop and mobile.
- Completing the puzzle advances to `/chapter3/`.

## Next Chapter (Pending)

The former Chapter 2 placeholder has moved to `chapter3/index.html` and now acts as the current end-of-story holding page.

The Chapter 1 maze (`chapter1/index.html`) still links to `/chapter2/`, so the main path remains connected.

## Development

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:5173> by default. Because the router uses hash-based URLs, you can refresh without worrying about 404s.

Additional static chapter entry points are available at:

- <http://localhost:5173/chapter1/>
- <http://localhost:5173/chapter2/>
- <http://localhost:5173/chapter3/>

To create a production build:

```bash
npm run build
```

The compiled assets live in `dist/`. Deploy that folder to GitHub Pages (or any static host) along with the generated `CNAME` file so the custom domain keeps working.
