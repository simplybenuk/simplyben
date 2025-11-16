const STORAGE_KEY = 'chapter1_state';
const AVATAR_REQUIRED = 5;
const BLACKOUT_REQUIRED = 9;
const TOUCH_OFFSET = { x: 0, y: -48 };

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

const glyphs = [
  { label: '05°', detail: 'LISTEN FOR THE NAME' },
  { label: 'IRIS', detail: 'the watcher remembers' },
  { label: '13', detail: 'knocks will stir the light' },
  { label: 'north', detail: 'WRITE THE WORD THAT BLOOMS' },
  { label: 'south', detail: 'THE PASSAGE ASKS FOR IRIS' },
  { label: 'east', detail: 'look for a door named after the iris' },
  { label: 'west', detail: 'when asked, whisper iris' },
];

const defaultState = () => ({
  stage: 'avatar',
  avatarClicks: 0,
  blackoutClicks: 0,
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function loadState() {
  const fallback = defaultState();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored);
    return { ...fallback, ...parsed };
  } catch (error) {
    console.warn('Unable to load chapter progress', error);
    return fallback;
  }
}

function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to persist chapter progress', error);
  }
}

function createAvatarScene(onPress, presses, required) {
  const fragment = document.createDocumentFragment();
  const remaining = Math.max(required - presses, 0);
  const statusMessage = remaining > 0
    ? `You have tapped ${presses} of ${required} times.`
    : 'The avatar stops resisting. The light collapses.';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'avatar-scene__button';
  button.setAttribute('aria-describedby', 'avatar-instructions avatar-status');
  button.addEventListener('click', onPress);

  const img = document.createElement('img');
  img.src = avatarPortrait;
  img.alt = 'A portrait, perfectly still.';
  img.loading = 'lazy';
  button.append(img);

  const instructions = document.createElement('span');
  instructions.id = 'avatar-instructions';
  instructions.className = 'sr-only';
  instructions.textContent = 'Tap or press the portrait until the silence breaks. Pointer, touch, keyboard—all are welcome.';
  button.append(instructions);

  const status = document.createElement('span');
  status.id = 'avatar-status';
  status.className = 'sr-only';
  status.setAttribute('aria-live', 'polite');
  status.textContent = statusMessage;
  button.append(status);

  const whisper = document.createElement('p');
  whisper.className = 'avatar-scene__whisper';
  whisper.textContent = `The static hums. ${remaining ? 'Keep insisting.' : 'The hum dies.'}`;

  fragment.append(button, whisper);
  return fragment;
}

function createBlackoutScene(onPress, presses, required) {
  const container = document.createElement('div');
  container.className = 'blackout-scene';
  container.setAttribute('role', 'presentation');

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'blackout-scene__button';
  button.setAttribute('aria-label', 'Tap to feel for the next passage');
  button.addEventListener('click', onPress);

  const remaining = Math.max(required - presses, 0);
  const status = document.createElement('span');
  status.className = 'sr-only';
  status.setAttribute('aria-live', 'polite');
  status.textContent = remaining > 0
    ? `You strike the void. ${remaining} more pulses linger.`
    : 'A seam opens in the dark.';
  button.append(status);

  const grain = document.createElement('div');
  grain.className = 'blackout-scene__grain';
  grain.setAttribute('aria-hidden', 'true');

  const caption = document.createElement('p');
  caption.className = 'blackout-scene__caption';
  caption.setAttribute('aria-hidden', 'true');
  caption.textContent = 'Breathe. There is still form.';

  container.append(button, grain, caption);
  return container;
}

function createSigilBlock() {
  const sigil = document.createElement('div');
  sigil.className = 'torch-content__sigil';
  sigil.setAttribute('aria-hidden', 'true');
  sigil.innerHTML = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M100 20 L150 60 L100 100 L50 60 Z" fill="none" stroke="currentColor" stroke-width="2"></path>
      <circle cx="100" cy="120" r="26" fill="none" stroke="currentColor" stroke-width="2"></circle>
      <path d="M74 150 Q100 180 126 150" fill="none" stroke="currentColor" stroke-width="2"></path>
    </svg>`;
  return sigil;
}

function setTorchPosition(node, x, y) {
  node.style.setProperty('--torch-x', `${x}%`);
  node.style.setProperty('--torch-y', `${y}%`);
  node.style.setProperty('--torch-radius', 'clamp(120px, 20vmin, 320px)');
}

function createTorchScene() {
  const container = document.createElement('div');
  container.className = 'torch-scene';
  container.tabIndex = 0;
  container.setAttribute('role', 'application');
  container.setAttribute('aria-label', 'Move the light to read the message');

  const instructions = document.createElement('p');
  instructions.className = 'torch-instructions';
  instructions.setAttribute('aria-hidden', 'true');
  instructions.textContent = 'Hold & sweep';

  const content = document.createElement('div');
  content.className = 'torch-content';
  content.setAttribute('aria-hidden', 'true');

  const glyphNodes = glyphs.map((glyph) => {
    const block = document.createElement('div');
    block.className = 'torch-content__glyph';

    const label = document.createElement('strong');
    label.textContent = glyph.label;
    block.append(label);

    const detail = document.createElement('span');
    detail.textContent = glyph.detail;
    block.append(detail);
    return block;
  });

  glyphNodes.forEach((node, index) => {
    content.append(node);
    if (index === 4) {
      content.append(createSigilBlock());
    }
  });

  const overlay = document.createElement('div');
  overlay.className = 'torch-overlay';

  const srCopy = document.createElement('p');
  srCopy.className = 'sr-only';
  srCopy.textContent = 'The torch reveals a repeated clue: the word “Iris” is the key to the next chapter.';

  container.append(instructions, content, srCopy, overlay);

  let position = { x: 50, y: 50 };
  setTorchPosition(container, position.x, position.y);

  const moveTorch = (clientX, clientY, pointerType) => {
    const rect = container.getBoundingClientRect();
    const offsetX = pointerType === 'touch' ? TOUCH_OFFSET.x : 0;
    const offsetY = pointerType === 'touch' ? TOUCH_OFFSET.y : 0;
    const x = clamp(((clientX - rect.left + offsetX) / rect.width) * 100, 4, 96);
    const y = clamp(((clientY - rect.top + offsetY) / rect.height) * 100, 4, 96);
    position = { x, y };
    setTorchPosition(container, position.x, position.y);
  };

  container.addEventListener('pointerdown', (event) => {
    container.focus();
    container.setPointerCapture?.(event.pointerId);
    moveTorch(event.clientX, event.clientY, event.pointerType);
  });

  container.addEventListener('pointermove', (event) => {
    event.preventDefault();
    moveTorch(event.clientX, event.clientY, event.pointerType);
  });

  container.addEventListener('pointerup', (event) => {
    container.releasePointerCapture?.(event.pointerId);
  });

  container.addEventListener('pointerleave', () => {
    position = { x: 50, y: 50 };
    setTorchPosition(container, position.x, position.y);
  });

  container.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const step = event.shiftKey ? 8 : 3;
    if (event.key === 'ArrowUp') position.y = clamp(position.y - step, 2, 98);
    if (event.key === 'ArrowDown') position.y = clamp(position.y + step, 2, 98);
    if (event.key === 'ArrowLeft') position.x = clamp(position.x - step, 2, 98);
    if (event.key === 'ArrowRight') position.x = clamp(position.x + step, 2, 98);
    setTorchPosition(container, position.x, position.y);
  });

  return container;
}

function initChapterOne() {
  const viewport = document.querySelector('[data-game-shell]');
  const contentNode = document.querySelector('[data-chapter-content]');
  const resetButton = document.querySelector('[data-reset]');

  if (!viewport || !contentNode || !resetButton) {
    return;
  }

  let state = loadState();
  const updateAndRender = (updates) => {
    state = { ...state, ...updates };
    persistState(state);
    render();
  };

  const goToStage = (stage, overrides = {}) => {
    updateAndRender({ ...overrides, stage });
  };

  const handleAvatarPress = () => {
    if (state.stage !== 'avatar') {
      return;
    }

    const nextCount = state.avatarClicks + 1;
    if (nextCount >= AVATAR_REQUIRED) {
      goToStage('blackout', { avatarClicks: nextCount, blackoutClicks: state.blackoutClicks });
      return;
    }

    updateAndRender({ avatarClicks: nextCount });
  };

  const handleBlackoutPress = () => {
    if (state.stage !== 'blackout') {
      return;
    }

    const nextCount = state.blackoutClicks + 1;
    if (nextCount >= BLACKOUT_REQUIRED) {
      goToStage('torch', { blackoutClicks: nextCount });
      return;
    }

    updateAndRender({ blackoutClicks: nextCount });
  };

  const reset = () => {
    state = defaultState();
    persistState(state);
    render();
  };

  resetButton.addEventListener('click', reset);

  function render() {
    viewport.classList.remove('game-shell--warm', 'game-shell--void');
    viewport.classList.add(state.stage === 'torch' ? 'game-shell--void' : 'game-shell--warm');

    contentNode.innerHTML = '';
    if (state.stage === 'avatar') {
      contentNode.append(createAvatarScene(handleAvatarPress, state.avatarClicks, AVATAR_REQUIRED));
    } else if (state.stage === 'blackout') {
      contentNode.append(createBlackoutScene(handleBlackoutPress, state.blackoutClicks, BLACKOUT_REQUIRED));
    } else {
      contentNode.append(createTorchScene());
    }
  }

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChapterOne);
} else {
  initChapterOne();
}
