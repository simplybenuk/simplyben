import { GameViewport } from '../../components/GameViewport';
import { AvatarScene } from './components/AvatarScene';

export function ChapterOne() {
  return (
    <GameViewport accent="warm">
      <section className="chapter-one chapter-one--avatar">
        <div className="chapter-one__content" aria-live="polite">
          <AvatarScene />
        </div>
      </section>
    </GameViewport>
  );
}
