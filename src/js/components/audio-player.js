let btn, audio, overlay, enterBtn;
let isPlaying = false;

function init() {
  btn = document.getElementById('audioBtn');
  audio = document.getElementById('audio');
  overlay = document.getElementById('introOverlay');
  enterBtn = document.getElementById('enterBtn');

  // block scrolling while intro overlay is visible
  if (overlay && !overlay.classList.contains('hidden')) {
    document.body.classList.add('no-scroll');
  }

  attachListeners();
}

function attachListeners() {
  // В интро музыка не должна идти — принудительно останавливаем и сбрасываем.
  audio.pause();
  audio.currentTime = 0;
  audio.muted = true;
  audio.autoplay = false;
  audio.removeAttribute('autoplay');
  setPlayState();

  // Слушаем события аудио и синхронизируем состояние кнопки
  audio.addEventListener('play', () => {
    setPauseState();
  });
  audio.addEventListener('pause', () => {
    setPlayState();
  });

  // Пользователь нажал кнопку «открыть» на заставке
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.add('hidden');

      document.getElementById('app').style.display = 'block';
      document.body.classList.remove('intro-open');
      document.body.classList.remove('no-scroll');
      audio.currentTime = 0;
      audio.muted = false;
      audio.play().catch(() => {});
    });
  }

  // Клик по аудио‑кнопке
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Скрываем tooltip при первом клике
      const tooltip = btn.querySelector('[data-tooltip]');
      if (tooltip && !tooltip.classList.contains('hidden')) {
        tooltip.classList.add('hidden');
      }

      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }
}

// when script loads, initialize or wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function setPlayState() {
  isPlaying = false;
  btn.classList.remove('audio-button--pause');
  btn.classList.add('audio-button--play');
}

function setPauseState() {
  isPlaying = true;
  btn.classList.remove('audio-button--play');
  btn.classList.add('audio-button--pause');
}
