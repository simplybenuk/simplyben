import { GameViewport } from './GameViewport';

export function OutOfBounds() {
  return (
    <GameViewport accent="void">
      <section className="out-of-bounds" aria-live="polite">
        <p>There is only static out here.</p>
        <p className="out-of-bounds__hint">Return to <span className="out-of-bounds__hash">#/</span> when you’re ready.</p>
      </section>
    </GameViewport>
  );
}
