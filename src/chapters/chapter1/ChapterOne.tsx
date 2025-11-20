import { AvatarScene } from './components/AvatarScene';

export function ChapterOne() {
  return (
    <main className="chapter-one chapter-one--avatar" aria-live="polite">
      <div className="chapter-one__content">
        <AvatarScene />
      </div>
    </main>
  );
}
