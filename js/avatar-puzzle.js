const REQUIRED_PRESSES = 5;

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.avatar-button');
  if (!button) return;

  const statusEl = document.getElementById('avatar-status');
  const avatarImage = button.querySelector('img');
  let presses = 0;
  let portalOpened = false;

  const updateStatus = () => {
    if (!statusEl || portalOpened) return;
    const remaining = Math.max(REQUIRED_PRESSES - presses, 0);
    statusEl.textContent = remaining
      ? `You have pressed ${presses} of ${REQUIRED_PRESSES} times.`
      : 'Portal unlocked. Brace for departure.';
  };

  const togglePressAnimation = () => {
    button.classList.add('avatar-button--active');
    window.setTimeout(() => {
      button.classList.remove('avatar-button--active');
    }, 200);
  };

  const openPortal = () => {
    if (portalOpened) return;
    portalOpened = true;
    button.classList.add('avatar-button--vanish');
    document.body.classList.add('black-hole');
    button.setAttribute('aria-label', 'Portal unlocked.');
    if (avatarImage) {
      avatarImage.setAttribute('aria-hidden', 'true');
      avatarImage.setAttribute('hidden', '');
    }
    if (statusEl) {
      statusEl.textContent = 'Portal unlocked. Welcome to the void.';
    }
  };

  button.addEventListener('click', () => {
    if (portalOpened) return;

    presses += 1;
    togglePressAnimation();
    updateStatus();

    if (presses >= REQUIRED_PRESSES) {
      openPortal();
    }
  });

  updateStatus();
});
