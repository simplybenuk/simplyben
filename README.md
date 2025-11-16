# simplyben

A point-and-click puzzle story disguised as a personal site. Everything is plain HTML, CSS, and vanilla JavaScript so GitHub Pages can serve it directly without a build step. Progress is saved to `localStorage` so the chapter remembers where you left off.

## Chapter 1 flow

1. **Avatar** – Tap the portrait several times before it yields.
2. **Blackout** – Prod the void until a seam opens.
3. **Torch** – Sweep a spotlight (pointer, touch, or keyboard) to reveal the repeated "Iris" clue.

The chapter UI is rendered inside `index.html`, styled by `style.css`, and orchestrated by `js/avatar-puzzle.js`. The script manages a tiny state machine and persists it via `localStorage.chapter1_state` so replaying is as simple as clearing storage for that key.

## Working locally

No tooling is required—open `index.html` in any modern browser. If you prefer using a local web server (recommended for pointer/touch testing), you can run something as simple as:

```bash
python3 -m http.server 4173
```

…and then visit <http://localhost:4173>.

## Deployment

Commit the static files (including the `CNAME` record) directly to `main` and let GitHub Pages serve them. Because there is no bundler, what you see locally is exactly what ships.
