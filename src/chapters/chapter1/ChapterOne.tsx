import { GameViewport } from '../../components/GameViewport';
import { usePersistentState } from '../../hooks/usePersistentState';
import { AvatarScene } from './components/AvatarScene';
import { BlackoutScene } from './components/BlackoutScene';
import { TorchScene } from './components/TorchScene';

type ChapterOneStage = 'avatar' | 'blackout' | 'torch';

interface ChapterOneProgress {
  stage: ChapterOneStage;
  avatarClicks: number;
  blackoutClicks: number;
}

const STORAGE_KEY = 'chapter1_state';
const AVATAR_REQUIRED = 5;
const BLACKOUT_REQUIRED = 9;

const createInitialState = (): ChapterOneProgress => ({
  stage: 'avatar',
  avatarClicks: 0,
  blackoutClicks: 0,
});

export function ChapterOne() {
  const [progress, setProgress] = usePersistentState<ChapterOneProgress>(STORAGE_KEY, createInitialState);

  const goToStage = (stage: ChapterOneStage, overrides?: Partial<ChapterOneProgress>) => {
    setProgress((current) => ({
      ...current,
      ...(overrides ?? {}),
      stage,
    }));
  };

  const handleAvatarPress = () => {
    if (progress.stage !== 'avatar') {
      return;
    }

    const nextCount = progress.avatarClicks + 1;
    if (nextCount >= AVATAR_REQUIRED) {
      goToStage('blackout', { avatarClicks: nextCount, blackoutClicks: progress.blackoutClicks });
      return;
    }

    setProgress({ ...progress, avatarClicks: nextCount });
  };

  const handleBlackoutPress = () => {
    if (progress.stage !== 'blackout') {
      return;
    }

    const nextCount = progress.blackoutClicks + 1;
    if (nextCount >= BLACKOUT_REQUIRED) {
      goToStage('torch', { blackoutClicks: nextCount });
      return;
    }

    setProgress({ ...progress, blackoutClicks: nextCount });
  };

  const resetChapter = () => {
    setProgress(createInitialState());
  };

  return (
    <GameViewport accent={progress.stage === 'torch' ? 'void' : 'warm'}>
      <section className={`chapter-one chapter-one--${progress.stage}`}>
        <div className="chapter-one__hud">
          <button type="button" className="hud-button" onClick={resetChapter}>
            Reset memory
          </button>
        </div>
        <div className="chapter-one__content" aria-live="polite">
          {progress.stage === 'avatar' && (
            <AvatarScene onPress={handleAvatarPress} presses={progress.avatarClicks} required={AVATAR_REQUIRED} />
          )}
          {progress.stage === 'blackout' && (
            <BlackoutScene onPress={handleBlackoutPress} presses={progress.blackoutClicks} required={BLACKOUT_REQUIRED} />
          )}
          {progress.stage === 'torch' && <TorchScene />}
        </div>
      </section>
    </GameViewport>
  );
}
