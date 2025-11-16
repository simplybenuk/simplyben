const avatarSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="portraitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5f0d8" />
        <stop offset="50%" stop-color="#ffe4a8" />
        <stop offset="100%" stop-color="#d2c4ff" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="28" fill="#050505" />
    <circle cx="100" cy="92" r="56" fill="url(#portraitGlow)" opacity="0.75" />
    <path
      d="M60 150 C80 124 120 124 140 150 L140 170 L60 170 Z"
      fill="#101010"
      stroke="#f5f0d8"
      stroke-width="3"
      opacity="0.85"
    />
    <circle cx="78" cy="96" r="6" fill="#050505" />
    <circle cx="122" cy="96" r="6" fill="#050505" />
    <path d="M80 120 Q100 132 120 120" fill="none" stroke="#050505" stroke-width="4" stroke-linecap="round" />
  </svg>
`;

const avatarPortrait = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;

type AvatarSceneProps = {
  onPress: () => void;
  presses: number;
  required: number;
};

export function AvatarScene({ onPress, presses, required }: AvatarSceneProps) {
  const remaining = Math.max(required - presses, 0);
  const statusMessage =
    remaining > 0
      ? `You have tapped ${presses} of ${required} times.`
      : 'The avatar stops resisting. The light collapses.';

  return (
    <>
      <button
        type="button"
        className="avatar-scene__button"
        onClick={onPress}
        aria-describedby="avatar-instructions avatar-status"
      >
        <img src={avatarPortrait} alt="A portrait, perfectly still." loading="lazy" />
        <span id="avatar-instructions" className="sr-only">
          Tap or press the portrait until the silence breaks. Pointer, touch, keyboard—all are welcome.
        </span>
        <span id="avatar-status" className="sr-only" aria-live="polite">
          {statusMessage}
        </span>
      </button>
      <p className="avatar-scene__whisper">The static hums. {remaining ? 'Keep insisting.' : 'The hum dies.'}</p>
    </>
  );
}
