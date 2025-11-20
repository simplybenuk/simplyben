import avatarPortrait from '../../../../img/avatar.jpg';

type AvatarSceneProps = {
  onPress?: () => void;
};

export function AvatarScene({ onPress }: AvatarSceneProps = {}) {
  return (
    <button
      type="button"
      className="avatar-scene__button"
      onClick={onPress}
      aria-describedby="avatar-instructions"
    >
      <img src={avatarPortrait} alt="A portrait." loading="lazy" />
      <span id="avatar-instructions" className="sr-only">
        Tap or press the portrait.
      </span>
    </button>
  );
}
