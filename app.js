const lockScreen = document.getElementById('lockScreen');
const birthdayPage = document.getElementById('birthdayPage');
const unlockForm = document.getElementById('unlockForm');
const pinInput = document.getElementById('pinInput');
const pinDots = [...document.querySelectorAll('#pinDots span')];
const pinMessage = document.getElementById('pinMessage');
const phone = document.getElementById('phone');
const giftButton = document.getElementById('giftButton');
const giftAction = document.getElementById('giftAction');
const revealNote = document.getElementById('revealNote');
const storyLink = document.getElementById('storyLink');
const storySection = document.getElementById('cerita');
const letterSection = document.getElementById('surat');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');

function updateDots() {
  const count = pinInput.value.replace(/\D/g, '').length;
  pinDots.forEach((dot, index) => dot.classList.toggle('filled', index < count));
  if (pinMessage.textContent) pinMessage.textContent = '';
}

pinInput.addEventListener('input', () => {
  pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 8);
  updateDots();
});

document.querySelectorAll('[data-digit]').forEach((key) => {
  key.addEventListener('click', () => {
    if (pinInput.value.length < 8) {
      pinInput.value += key.dataset.digit;
      updateDots();
    }
  });
});

document.getElementById('deleteKey').addEventListener('click', () => {
  pinInput.value = pinInput.value.slice(0, -1);
  updateDots();
});

unlockForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pinInput.value === '14102006') {
    lockScreen.hidden = true;
    birthdayPage.hidden = false;
    window.scrollTo(0, 0);
    makePetals();
    return;
  }

  pinMessage.textContent = pinInput.value.length < 8
    ? 'Isi delapan angka tanggalnya dulu, ya.'
    : 'Belum tepat. Coba ingat tanggal istimewanya lagi.';
  pinInput.value = '';
  pinDots.forEach((dot) => dot.classList.remove('filled'));
  phone.classList.remove('shake');
  void phone.offsetWidth;
  phone.classList.add('shake');
});

function makePetals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rain = document.getElementById('petalRain');
  if (rain.childElementCount) return;
  for (let index = 0; index < 13; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${(index * 29 + 13) % 100}%`;
    petal.style.setProperty('--duration', `${15 + (index % 5) * 2.4}s`);
    petal.style.setProperty('--delay', `${-index * 2.1}s`);
    rain.appendChild(petal);
  }
}

function renderMemories() {
  const memoryList = document.getElementById('memoryList');
  const memories = window.BIRTHDAY_CONTENT?.memories || [];

  if (!memories.length) {
    const empty = document.createElement('p');
    empty.className = 'memory-empty';
    empty.textContent = 'Belum ada cerita. Tambahkan kenangan kalian di content.js.';
    memoryList.appendChild(empty);
    return;
  }

  memories.forEach((memory, index) => {
    const article = document.createElement('article');
    article.className = 'memory';

    const frame = document.createElement('div');
    frame.className = 'photo-frame';
    const stage = document.createElement('div');
    stage.className = 'photo-stage';
    const photoState = document.createElement('div');
    photoState.className = 'photo-empty';
    photoState.innerHTML = '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 56V31m0 14c-10 0-17-5-18-12 9-1 16 3 18 12Zm0-9c9-1 16-7 17-14-9 0-16 5-17 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M32 11c-9-12-20 3-8 10-13 2-7 17 4 11 1 12 16 11 17-1 12 5 17-9 5-13C56 7 42 3 38 15c-1-6-3-8-6-4Z" stroke="currentColor" stroke-width="1.5"/><circle cx="36" cy="23" r="5" stroke="currentColor" stroke-width="1.5"/></svg>';
    const stateTitle = document.createElement('span');
    const stateDetail = document.createElement('small');
    photoState.append(stateTitle, stateDetail);
    stage.appendChild(photoState);

    if (memory.photo) {
      stateTitle.textContent = 'Menyiapkan fotonya...';
      stateDetail.textContent = '';
      photoState.classList.add('photo-loading');
      const image = document.createElement('img');
      image.alt = memory.alt || memory.title;
      image.hidden = true;
      image.addEventListener('load', () => {
        photoState.hidden = true;
        image.hidden = false;
      });
      image.addEventListener('error', () => {
        photoState.classList.remove('photo-loading');
        stateTitle.textContent = 'Foto belum bisa dibuka';
        stateDetail.textContent = 'Periksa nama file di content.js.';
      });
      stage.appendChild(image);
      image.src = memory.photo;
    } else {
      stateTitle.textContent = 'Tempat foto kalian';
      stateDetail.textContent = 'Tambahkan foto asli di content.js';
    }

    const caption = document.createElement('span');
    caption.className = 'photo-caption';
    caption.textContent = memory.caption || 'kenangan kita';
    frame.append(stage, caption);

    const copy = document.createElement('div');
    copy.className = 'memory-copy';
    const number = document.createElement('span');
    number.className = 'memory-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const title = document.createElement('h3');
    title.textContent = memory.title || 'Cerita kita';
    const story = document.createElement('p');
    story.textContent = memory.story || memory.prompt || 'Tulis cerita kalian di content.js.';
    copy.append(number, title, story);
    if (!memory.story) {
      const tag = document.createElement('span');
      tag.className = 'memory-placeholder-tag';
      tag.textContent = 'Ruang untuk kisah kalian';
      copy.appendChild(tag);
    }
    article.append(frame, copy);
    memoryList.appendChild(article);
  });
}

renderMemories();

const romanceAudio = document.getElementById('romanceAudio');
const musicStatus = document.getElementById('musicStatus');
let musicWasChosen = false;

function updateMusicButton() {
  const playing = !romanceAudio.paused && !romanceAudio.ended;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Jeda musik romantis' : 'Putar musik romantis');
  musicLabel.textContent = playing ? 'Jeda musik' : 'Putar musik';
}

function showMusicFailure() {
  updateMusicButton();
  if (romanceAudio.error) {
    musicLabel.textContent = 'Musik tidak tersedia';
    musicStatus.textContent = 'Berkas musik tidak bisa dibuka. Periksa assets/romance.wav.';
  } else {
    musicLabel.textContent = 'Ketuk untuk musik';
    musicStatus.textContent = 'Browser menahan musik. Ketuk tombol musik untuk mencoba lagi.';
  }
}

function startMusic() {
  musicStatus.textContent = '';
  romanceAudio.volume = .85;
  try {
    const playback = romanceAudio.play();
    updateMusicButton();
    if (playback) playback.catch(showMusicFailure);
  } catch {
    showMusicFailure();
  }
}

romanceAudio.addEventListener('playing', updateMusicButton);
romanceAudio.addEventListener('pause', updateMusicButton);
romanceAudio.addEventListener('error', showMusicFailure);
musicToggle.addEventListener('click', () => {
  musicWasChosen = true;
  if (romanceAudio.paused) startMusic();
  else {
    romanceAudio.pause();
    updateMusicButton();
  }
});

let giftOpened = false;
let giftOpening = false;
giftButton.addEventListener('click', () => {
  if (giftOpening) return;
  giftOpening = true;
  giftButton.disabled = true;
  giftButton.setAttribute('aria-label', 'Kado sedang dibuka');
  giftButton.classList.remove('is-bursting', 'is-blooming');
  giftAction.textContent = 'siap-siap, pitanya akan beterbangan...';

  if (!musicWasChosen && romanceAudio.paused) startMusic();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function finishReveal() {
    if (!giftOpened) {
      document.querySelector('.hero-description').textContent = 'Bunganya sudah mekar untukmu. Kalau sudah siap, ada cerita kecil yang menunggu di bawah.';
      storySection.hidden = false;
      letterSection.hidden = false;
      storyLink.hidden = false;
      revealNote.classList.add('visible');
    }
    giftOpened = true;
    giftOpening = false;
    giftButton.disabled = false;
    giftButton.setAttribute('aria-expanded', 'true');
    giftButton.setAttribute('aria-label', 'Ulangi kejutan pita dan bunga');
    giftAction.innerHTML = 'sentuh untuk ulangi kejutan <span aria-hidden="true">↗</span>';
  }

  function bloom() {
    giftButton.classList.add('is-blooming');
    giftAction.textContent = 'bunganya sedang muncul...';
    if (reducedMotion) finishReveal();
    else window.setTimeout(finishReveal, 1100);
  }

  function burst() {
    giftButton.classList.add('is-bursting');
    giftAction.textContent = 'pita beterbangan...';
    if (reducedMotion) bloom();
    else window.setTimeout(bloom, 1500);
  }

  if (giftOpened && !reducedMotion) window.setTimeout(burst, 300);
  else burst();
});
