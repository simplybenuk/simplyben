import type { ReactNode } from 'react';

type GameViewportProps = {
  children: ReactNode;
  className?: string;
  accent?: 'warm' | 'cold' | 'void';
};

export function GameViewport({ children, className, accent = 'warm' }: GameViewportProps) {
  const classes = ['game-shell', `game-shell--${accent}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <main className="app-shell">
      <div className={classes}>{children}</div>
    </main>
  );
}
