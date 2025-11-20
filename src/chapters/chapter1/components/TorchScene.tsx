import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const TOUCH_OFFSET = { x: 0, y: -48 };

type TorchPosition = {
  x: number;
  y: number;
};

export function TorchScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [torchPosition, setTorchPosition] = useState<TorchPosition>({ x: 50, y: 50 });

  const moveTorch = (clientX: number, clientY: number, pointerType: string) => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const offsetX = pointerType === 'touch' ? TOUCH_OFFSET.x : 0;
    const offsetY = pointerType === 'touch' ? TOUCH_OFFSET.y : 0;

    const x = clamp(((clientX - rect.left + offsetX) / rect.width) * 100, 4, 96);
    const y = clamp(((clientY - rect.top + offsetY) / rect.height) * 100, 4, 96);
    setTorchPosition({ x, y });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    moveTorch(event.clientX, event.clientY, event.pointerType);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    moveTorch(event.clientX, event.clientY, event.pointerType);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handlePointerLeave = () => {
    setTorchPosition({ x: 50, y: 50 });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 8 : 3;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    setTorchPosition((prev) => {
      const next = { ...prev };
      if (event.key === 'ArrowUp') next.y = clamp(prev.y - step, 2, 98);
      if (event.key === 'ArrowDown') next.y = clamp(prev.y + step, 2, 98);
      if (event.key === 'ArrowLeft') next.x = clamp(prev.x - step, 2, 98);
      if (event.key === 'ArrowRight') next.x = clamp(prev.x + step, 2, 98);
      return next;
    });
  };

  const overlayStyle: CSSProperties &
    Record<'--torch-x' | '--torch-y' | '--torch-radius', string> = {
      '--torch-x': `${torchPosition.x}%`,
      '--torch-y': `${torchPosition.y}%`,
      '--torch-radius': 'clamp(120px, 20vmin, 320px)',
    };

  return (
    <div
      ref={containerRef}
      className="torch-scene"
      tabIndex={0}
      role="application"
      aria-label="Move the light to read the message"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <p className="torch-instructions" aria-hidden="true">
        Hold &amp; sweep
      </p>
      <div className="torch-content" aria-hidden="true">
        <div className="torch-content__glyph">
          <strong>05°</strong>
          <span>LISTEN FOR THE NAME</span>
        </div>
        <div className="torch-content__glyph">
          <strong>IRIS</strong>
          <span>the watcher remembers</span>
        </div>
        <div className="torch-content__glyph">
          <strong>13</strong>
          <span>knocks will stir the light</span>
        </div>
        <div className="torch-content__glyph">
          <strong>north</strong>
          <span>WRITE THE WORD THAT BLOOMS</span>
        </div>
        <div className="torch-content__glyph">
          <strong>south</strong>
          <span>THE PASSAGE ASKS FOR IRIS</span>
        </div>
        <div className="torch-content__sigil">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M100 20 L150 60 L100 100 L50 60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="100" cy="120" r="26" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M74 150 Q100 180 126 150" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="torch-content__glyph">
          <strong>east</strong>
          <span>look for a door named after the iris</span>
        </div>
        <div className="torch-content__glyph">
          <strong>west</strong>
          <span>when asked, whisper iris</span>
        </div>
      </div>
      <p className="sr-only">
        The torch reveals a repeated clue: the word "Iris" is the key to the next chapter.
      </p>
      <div className="torch-overlay" style={overlayStyle} />
    </div>
  );
}
