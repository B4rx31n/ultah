const lockScreen = document.getElementById('lockScreen');
const birthdayPage = document.getElementById('birthdayPage');
const unlockForm = document.getElementById('unlockForm');
const pinInput = document.getElementById('pinInput');
const pinDots = [...document.querySelectorAll('#pinDots span')];
const pinMessage = document.getElementById('pinMessage');
const phone = document.getElementById('phone');
const giftButton = document.getElementById('giftButton');
const giftAction = document.getElementById('giftAction');
const memoryPhotoRain = document.getElementById('memoryPhotoRain');
const revealNote = document.getElementById('revealNote');
const storyLink = document.getElementById('storyLink');
const storySection = document.getElementById('cerita');
const letterSection = document.getElementById('surat');
const albumSection = document.getElementById('album');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const romanceAudio = document.getElementById('romanceAudio');
const musicStatus = document.getElementById('musicStatus');
let musicWasChosen = false;

function updateMusicButton() {
  const playing = !romanceAudio.paused && !romanceAudio.ended;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Jeda Love Songs' : 'Putar Love Songs');
  musicLabel.textContent = playing ? 'Jeda lagu' : 'Putar lagu';
}

function showMusicFailure() {
  updateMusicButton();
  if (romanceAudio.error) {
    musicLabel.textContent = 'Lagu tidak tersedia';
    musicStatus.textContent = 'Berkas musik tidak bisa dibuka. Periksa file MP3 di folder music/.';
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

function renderMemoryPhotoRain() {
  const albumPhotos = window.BIRTHDAY_CONTENT?.albumPhotos || [];
  const photoCount = 5;
  const photoCards = Array.from({ length: photoCount }, () => {
    const photo = document.createElement('span');
    photo.className = 'memory-rain-photo';
    const image = document.createElement('img');
    image.alt = '';
    image.decoding = 'async';
    image.hidden = true;
    const placeholder = document.createElement('span');
    placeholder.className = 'memory-rain-photo__placeholder';
    placeholder.textContent = albumPhotos.length ? 'Memuat foto...' : 'Tambahkan foto';
    const caption = document.createElement('span');
    caption.className = 'memory-rain-photo__caption';
    photo.append(image, placeholder, caption);
    memoryPhotoRain.appendChild(photo);
    return { photo, image, placeholder, caption };
  });

  let currentPhotoIndex = 0;
  let cooldownTimer = null;
  let rainIsActive = false;
  let onFirstFallComplete = null;
  let currentBatchToken = 0;
  let finishedPhotoCount = 0;

  function loadPhoto(card, index, xPosition, onReady) {
    const { photo, image, placeholder, caption } = card;
    photo.dataset.index = String(index);
    photo.dataset.xPosition = String(xPosition);
    photo.style.top = `${Math.round(Math.random() * 300 - 100)}px`;
    photo.style.setProperty('--rain-tilt', `${Math.round(Math.random() * 56 - 28)}deg`);
    photo.style.setProperty('--rain-spin', `${Math.round(Math.random() * 360 - 180)}deg`);
    photo.style.setProperty('--rain-delay', `${Math.random() * 1400}ms`);
    photo.style.setProperty('--rain-duration', `${5.5 + Math.random() * 3}s`);
    positionMemoryPhotoRain();
    caption.textContent = `Kenangan ${index + 1}`;
    image.hidden = true;
    placeholder.hidden = false;
    placeholder.textContent = albumPhotos.length ? 'Memuat foto...' : 'Tambahkan foto';

    if (!albumPhotos.length) {
      onReady();
      return;
    }

    let settled = false;
    const settle = (loaded) => {
      if (settled) return;
      settled = true;
      if (loaded) {
        image.hidden = false;
        placeholder.hidden = true;
      } else {
        placeholder.textContent = 'Periksa content.js';
      }
      onReady();
    };
    image.onload = () => settle(true);
    image.onerror = () => settle(false);
    image.src = albumPhotos[index];
    if (image.complete) {
      window.setTimeout(() => settle(image.naturalWidth > 0), 0);
    }
  }

  function startPhotoFall(batchToken) {
    if (!rainIsActive || batchToken !== currentBatchToken) return;
    memoryPhotoRain.classList.remove('is-falling');
    photoCards.forEach(({ photo }) => void photo.offsetWidth);
    finishedPhotoCount = 0;
    memoryPhotoRain.classList.add('is-falling');
  }

  function startPhotoBatch() {
    if (!rainIsActive) return;
    const batchToken = ++currentBatchToken;
    const photoSlots = photoCards.map(() => 0.04 + Math.random() * 0.92);

    let remainingPhotos = photoCards.length;
    photoCards.forEach((card, offset) => {
      const photoIndex = albumPhotos.length
        ? (currentPhotoIndex + offset) % albumPhotos.length
        : currentPhotoIndex + offset;
      loadPhoto(card, photoIndex, photoSlots[offset], () => {
        if (!rainIsActive || batchToken !== currentBatchToken) return;
        remainingPhotos -= 1;
        if (remainingPhotos === 0) startPhotoFall(batchToken);
      });
    });
  }

  photoCards.forEach(({ photo }) => photo.addEventListener('animationend', (event) => {
    if (event.animationName !== 'memory-photo-fall' || !rainIsActive) return;
    finishedPhotoCount += 1;
    if (finishedPhotoCount < photoCards.length) return;

    memoryPhotoRain.classList.remove('is-falling');
    if (onFirstFallComplete) {
      const callback = onFirstFallComplete;
      onFirstFallComplete = null;
      callback();
    }
    if (!rainIsActive) return;

    cooldownTimer = window.setTimeout(() => {
      if (!rainIsActive) return;
      currentPhotoIndex = (currentPhotoIndex + photoCards.length)
        % Math.max(albumPhotos.length, photoCards.length);
      startPhotoBatch();
    }, 15000);
  }));

  function stopPhotoRain() {
    rainIsActive = false;
    currentBatchToken += 1;
    window.clearTimeout(cooldownTimer);
    cooldownTimer = null;
    onFirstFallComplete = null;
    memoryPhotoRain.classList.remove('is-falling');
  }

  function startPhotoRain(onInitialFallComplete) {
    stopPhotoRain();
    rainIsActive = true;
    currentPhotoIndex = 0;
    onFirstFallComplete = onInitialFallComplete;
    startPhotoBatch();
  }

  positionMemoryPhotoRain();
  return { startPhotoRain, stopPhotoRain };
}

function positionMemoryPhotoRain() {
  const viewportWidth = document.documentElement.clientWidth;
  const photoWidth = Math.min(88, Math.max(58, viewportWidth * 0.08));
  const inset = Math.min(24, viewportWidth * 0.06);
  memoryPhotoRain.querySelectorAll('.memory-rain-photo').forEach((photo) => {
    const availableWidth = Math.max(0, viewportWidth - photoWidth - inset * 2);
    const index = Number(photo.dataset.index);
    const drift = Math.round((((index * 53) % 101) - 50) * Math.min(0.48, viewportWidth / 800));
    photo.style.left = `${Math.round(inset + Number(photo.dataset.xPosition) * availableWidth)}px`;
    photo.style.setProperty('--rain-drift', `${drift}px`);
  });
}

const photoRain = renderMemoryPhotoRain();
window.addEventListener('resize', positionMemoryPhotoRain);

let giftOpened = false;
let giftOpening = false;
giftButton.addEventListener('click', () => {
  if (giftOpening) return;
  giftOpening = true;
  giftButton.disabled = true;
  giftButton.setAttribute('aria-label', 'Kado sedang dibuka');
  giftButton.classList.remove('is-bursting', 'is-blooming');
  photoRain.stopPhotoRain();
  giftAction.textContent = 'siap-siap, pitanya akan beterbangan...';

  if (!musicWasChosen && romanceAudio.paused) startMusic();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function finishReveal() {
    if (!giftOpened) {
      document.querySelector('.hero-description').textContent = 'Bunganya sudah mekar untukmu. Kalau sudah siap, ada cerita kecil yang menunggu di bawah.';
      storySection.hidden = false;
      letterSection.hidden = false;
      albumSection.hidden = false;
      storyLink.hidden = false;
      revealNote.classList.add('visible');
    }
    giftOpened = true;
    giftOpening = false;
    giftButton.disabled = false;
    giftButton.setAttribute('aria-expanded', 'true');
    giftButton.setAttribute('aria-label', 'Ulangi kejutan pita, bunga, dan foto');
    giftAction.innerHTML = 'sentuh untuk ulangi kejutan <span aria-hidden="true">↗</span>';
  }

  function bloom() {
    giftButton.classList.add('is-blooming');
    giftAction.textContent = 'bunganya sedang muncul...';
    if (reducedMotion) finishReveal();
    else photoRain.startPhotoRain(finishReveal);
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

function renderAlbum() {
  const albumPhotos = window.BIRTHDAY_CONTENT?.albumPhotos || [];
  const albumContainer = document.getElementById('albumContainer');
  const albumBook = document.getElementById('albumBook');
  const bookPage = document.getElementById('bookPage');
  const bookLeaf = document.getElementById('bookLeaf');
  const leafFront = document.getElementById('leafFront');
  const leafBack = document.getElementById('leafBack');
  const bookTurnShadow = document.getElementById('bookTurnShadow');
  const albumCounter = document.getElementById('albumCounter');
  const albumPrev = document.getElementById('albumPrev');
  const albumNext = document.getElementById('albumNext');

  if (!albumPhotos.length) {
    albumBook.hidden = true;
    const empty = document.createElement('p');
    empty.className = 'album-empty';
    empty.textContent = 'Belum ada foto di album. Tambahkan jalur foto kalian di content.js.';
    albumContainer.prepend(empty);
    albumPrev.hidden = true;
    albumNext.hidden = true;
    albumCounter.textContent = '';
    const hint = albumContainer.querySelector('.album-hint');
    if (hint) hint.hidden = true;
    return;
  }

  const photosPerPage = 9;
  const totalPhotoPages = Math.ceil(albumPhotos.length / photosPerPage);
  const totalPhotoSpreads = Math.ceil(totalPhotoPages / 2);
  const closingView = totalPhotoSpreads + 1;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentView = 0;
  let isTurning = false;

  function photosForView(view) {
    if (view < 1 || view > totalPhotoPages) return [];
    const start = (view - 1) * photosPerPage;
    return albumPhotos.slice(start, start + photosPerPage);
  }

  function buildPhotoFrame(photoIndex) {
    const frame = document.createElement('figure');
    frame.className = 'album-photo-frame';
    const image = document.createElement('img');
    image.alt = `Kenangan ${photoIndex + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.hidden = true;
    const placeholder = document.createElement('span');
    placeholder.className = 'album-photo-frame__placeholder';
    placeholder.textContent = 'Memuat...';
    image.addEventListener('load', () => {
      image.hidden = false;
      placeholder.hidden = true;
    });
    image.addEventListener('error', () => {
      placeholder.classList.add('album-photo-frame__placeholder--error');
      placeholder.textContent = 'Foto belum bisa dibuka';
    });
    image.src = albumPhotos[photoIndex];
    const caption = document.createElement('figcaption');
    caption.className = 'album-photo-frame__caption';
    caption.textContent = `Kenangan ${photoIndex + 1}`;
    frame.append(placeholder, image, caption);
    return frame;
  }

  function renderPhotoPage(container, view) {
    const page = document.createElement('div');
    page.className = 'photo-page';
    const header = document.createElement('span');
    header.className = 'photo-page__header';
    header.textContent = 'Album Kita';
    const grid = document.createElement('div');
    grid.className = 'photo-page__grid';
    const firstIndex = (view - 1) * photosPerPage;
    photosForView(view).forEach((_, offset) => {
      grid.appendChild(buildPhotoFrame(firstIndex + offset));
    });
    const number = document.createElement('span');
    number.className = 'photo-page__number';
    number.textContent = String(view);
    page.append(header, grid, number);
    container.appendChild(page);
  }

  function renderCover(container) {
    const cover = document.createElement('div');
    cover.className = 'book-cover-art';
    const flower = document.createElement('span');
    flower.className = 'book-cover-art__flower';
    flower.setAttribute('aria-hidden', 'true');
    flower.innerHTML = '<svg viewBox="0 0 100 100" fill="none"><g fill="#d98fa1"><ellipse cx="50" cy="28" rx="11" ry="21"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(72 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(144 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(216 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(288 50 50)"/></g><circle cx="50" cy="50" r="10" fill="#c07b92"/></svg>';
    const title = document.createElement('h3');
    title.className = 'book-cover-art__title';
    title.textContent = 'Album Kita';
    const rule = document.createElement('span');
    rule.className = 'book-cover-art__rule';
    const date = document.createElement('span');
    date.className = 'book-cover-art__date';
    date.textContent = '14 Oktober 2006';
    cover.append(flower, title, rule, date);
    container.appendChild(cover);
  }

  function renderClosing(container) {
    const closing = document.createElement('div');
    closing.className = 'book-closing';
    const flower = document.createElement('span');
    flower.className = 'book-closing__flower';
    flower.setAttribute('aria-hidden', 'true');
    flower.innerHTML = '<svg viewBox="0 0 100 100" fill="none"><g fill="currentColor"><ellipse cx="50" cy="28" rx="11" ry="21"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(72 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(144 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(216 50 50)"/><ellipse cx="50" cy="28" rx="11" ry="21" transform="rotate(288 50 50)"/></g><circle cx="50" cy="50" r="10" fill="#fffdf8"/></svg>';
    const text = document.createElement('p');
    text.textContent = 'Terima kasih sudah membuka kenangan kita, halaman demi halaman.';
    const heart = document.createElement('span');
    heart.className = 'book-closing__heart';
    heart.setAttribute('aria-hidden', 'true');
    heart.textContent = '♡';
    closing.append(flower, text, heart);
    container.appendChild(closing);
  }

  function renderFace(container, view) {
    container.replaceChildren();
    container.classList.toggle('face--cover', view === 0);
    if (view === 0) {
      container.classList.remove('face--spread');
      renderCover(container);
    } else if (view === closingView) {
      renderSpread(container, totalPhotoPages, closingView);
    } else {
      const firstPage = (view - 1) * 2 + 1;
      renderSpread(container, firstPage, firstPage + 1 <= totalPhotoPages ? firstPage + 1 : 0);
    }
  }

  function renderSpread(container, leftView, rightView) {
    container.replaceChildren();
    container.classList.remove('face--cover');
    container.classList.add('face--spread');
    const spread = document.createElement('div');
    spread.className = 'book-spread';

    [[leftView, 'left'], [rightView, 'right']].forEach(([view, side]) => {
      const page = document.createElement('div');
      page.className = `book-page__side book-page__side--${side}`;
      if (view === 0) {
        page.classList.add('book-page__side--blank');
      } else if (view === closingView) {
        renderClosing(page);
      } else {
        renderPhotoPage(page, view);
      }
      spread.appendChild(page);
    });

    container.appendChild(spread);
  }

  function renderPage(container, view) {
    container.replaceChildren();
    container.classList.remove('face--cover', 'face--spread');
    if (view === closingView) renderClosing(container);
    else if (view > 0 && view <= totalPhotoPages) renderPhotoPage(container, view);
    else renderBlankPage(container);
  }

  function renderBlankPage(container) {
    container.replaceChildren();
    container.classList.remove('face--cover', 'face--spread');
    const blank = document.createElement('div');
    blank.className = 'book-inside-cover';
    container.appendChild(blank);
  }

  function updateControls() {
    if (currentView === 0) albumCounter.textContent = 'Sampul';
    else if (currentView === closingView) albumCounter.textContent = 'Penutup';
    else {
      const firstPage = (currentView - 1) * 2 + 1;
      const lastPage = Math.min(firstPage + 1, totalPhotoPages);
      albumCounter.textContent = firstPage === lastPage
        ? `${firstPage} / ${totalPhotoPages}`
        : `${firstPage}–${lastPage} / ${totalPhotoPages}`;
    }
    albumPrev.disabled = currentView === 0;
    albumNext.disabled = currentView === closingView;
  }

  function prefetch(view) {
    photosForView(view).forEach((src) => {
      const image = new Image();
      image.src = src;
      if (typeof image.decode === 'function') {
        image.decode().catch(() => {});
      }
    });
  }

  function prefetchSpread(view) {
    if (view < 1 || view > totalPhotoSpreads) return;
    const firstPage = (view - 1) * 2 + 1;
    prefetch(firstPage);
    if (firstPage + 1 <= totalPhotoPages) prefetch(firstPage + 1);
  }

  function resetLeaf() {
    bookLeaf.classList.add('no-transition');
    bookLeaf.classList.remove('is-flipped');
    void bookLeaf.offsetWidth;
    bookLeaf.classList.remove('no-transition');
  }

  function finishTurn(targetView) {
    isTurning = false;
    bookLeaf.classList.remove('is-turning');
    bookLeaf.classList.remove('is-page-turn');
    bookLeaf.classList.remove('is-spread-turn');
    bookTurnShadow.classList.remove('is-on');
    bookLeaf.style.visibility = 'hidden';
    resetLeaf();
    albumBook.classList.toggle('is-cover', targetView === 0);
    renderFace(bookPage, targetView);
    currentView = targetView;
    updateControls();
    prefetchSpread(currentView + 1);
    prefetchSpread(currentView - 1);
  }

  function turnForward() {
    if (isTurning || currentView === closingView) return;
    const targetView = currentView + 1;
    if (reducedMotionQuery.matches) {
      finishTurn(targetView);
      return;
    }
    isTurning = true;
    albumBook.classList.remove('is-cover');
    if (currentView === 0) {
      renderFace(bookPage, targetView);
      renderFace(leafFront, currentView);
      renderBlankPage(leafBack);
      bookLeaf.classList.add('is-page-turn');
    } else {
      renderFace(bookPage, targetView);
      renderFace(leafFront, currentView);
      renderFace(leafBack, targetView);
      bookLeaf.classList.add('is-spread-turn');
    }
    resetLeaf();
    bookLeaf.style.visibility = 'visible';
    bookLeaf.classList.add('is-turning');
    bookTurnShadow.classList.add('is-on');
    void bookLeaf.offsetWidth;
    bookLeaf.classList.add('is-flipped');
    window.setTimeout(() => finishTurn(targetView), 950);
  }

  function turnBackward() {
    if (isTurning || currentView === 0) return;
    const targetView = currentView - 1;
    if (reducedMotionQuery.matches) {
      finishTurn(targetView);
      return;
    }
    isTurning = true;
    if (targetView === 0) {
      renderFace(leafFront, targetView);
      renderPage(leafBack, 1);
      bookLeaf.classList.add('is-page-turn');
    } else {
      renderFace(bookPage, targetView);
      renderFace(leafFront, targetView);
      renderFace(leafBack, currentView);
      bookLeaf.classList.add('is-spread-turn');
    }
    bookLeaf.classList.add('no-transition');
    bookLeaf.classList.add('is-flipped');
    void bookLeaf.offsetWidth;
    bookLeaf.classList.remove('no-transition');
    bookLeaf.style.visibility = 'visible';
    bookLeaf.classList.add('is-turning');
    bookTurnShadow.classList.add('is-on');
    void bookLeaf.offsetWidth;
    bookLeaf.classList.remove('is-flipped');
    window.setTimeout(() => finishTurn(targetView), 950);
  }

  function goToView(view) {
    if (isTurning || view === currentView || view < 0 || view > closingView) return;
    finishTurn(view);
  }

  albumPrev.addEventListener('click', turnBackward);
  albumNext.addEventListener('click', turnForward);

  albumBook.addEventListener('click', (event) => {
    if (isTurning) return;
    if (currentView === 0) {
      turnForward();
      return;
    }
    if (currentView === closingView) {
      turnBackward();
      return;
    }
    const rect = albumBook.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    if (clickX < rect.width * 0.5) turnBackward();
    else turnForward();
  });

  albumBook.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      turnForward();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      turnBackward();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToView(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToView(closingView);
    }
  });

  albumBook.classList.add('is-cover');
  renderFace(bookPage, 0);
  updateControls();
  prefetchSpread(1);
}

renderAlbum();
