type BlackoutSceneProps = {
  onPress: () => void;
  presses: number;
  required: number;
};

export function BlackoutScene({ onPress, presses, required }: BlackoutSceneProps) {
  const remaining = Math.max(required - presses, 0);
  return (
    <div className="blackout-scene" role="presentation">
      <button
        className="blackout-scene__button"
        type="button"
        onClick={onPress}
        aria-label="Tap to feel for the next passage"
      >
        <span className="sr-only" aria-live="polite">
          {remaining > 0
            ? `You strike the void. ${remaining} more pulses linger.`
            : 'A seam opens in the dark.'}
        </span>
      </button>
      <div className="blackout-scene__grain" aria-hidden="true" />
      <p className="blackout-scene__caption" aria-hidden="true">
        Breathe. There is still form.
      </p>
    </div>
  );
}
