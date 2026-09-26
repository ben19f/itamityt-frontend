const linksContainer = document.getElementById("links-container");
const messageEl = document.getElementById("message");

const profileAvatar = document.getElementById("profile-avatar");
const profileTitle = document.getElementById("profile-title");
const profileNameBlock = document.getElementById("profile-name-block");
const profileName = document.getElementById("profile-name");

const verificationBlock = document.getElementById(
  "profile-verification-block"
);
const ownerVerify = document.getElementById("owner-verify");
const ownerVerifyStatus = document.getElementById("owner-verify-status");
const ownerVerifyText = document.getElementById("owner-verify-text");
const serviceVerify = document.getElementById("service-verify");
const serviceVerifyStatus = document.getElementById("service-verify-status");
const serviceVerifyText = document.getElementById("service-verify-text");

const galleryBlock = document.getElementById("profile-gallery-block");
const gallery = document.getElementById("profile-gallery");

const descriptionBlock = document.getElementById("profile-description-block");
const profileDescription = document.getElementById("profile-description");

const linksBlock = document.getElementById("profile-links-block");

const extraBlock = document.getElementById("profile-extra-block");
const profileExtra = document.getElementById("profile-extra");

const copyBtn = document.getElementById("copy-profile-link");

const username = window.location.pathname
  .replace(/^\/uun\//, "")
  .replace(/\/$/, "");


// ============================================================
// Avatar
// ============================================================

function renderAvatar(profile) {
  if (
    profile.avatar_url &&
    typeof profile.avatar_url === "string" &&
    profile.avatar_url.trim() !== ""
  ) {
    profileAvatar.src = profile.avatar_url.trim();
  }
}


// ============================================================
// Name
// ============================================================

function renderName(profile) {
  if (
    typeof profile.display_name === "string" &&
    profile.display_name.trim() !== ""
  ) {
    profileName.textContent = profile.display_name.trim();
    profileNameBlock.hidden = false;
  } else {
    profileName.textContent = "";
    profileNameBlock.hidden = true;
  }
}


// ============================================================
// Username
// ============================================================

function renderUsername(profile) {
  if (
    typeof profile.username === "string" &&
    profile.username.trim() !== ""
  ) {
    profileTitle.textContent = `@${profile.username}`;
  } else {
    profileTitle.textContent = "";
  }
}


// ============================================================
// Verification
// ============================================================

function renderVerification(profile) {
  let hasVerification = false;

  if (
    profile.owner_verified === "Y" ||
    profile.owner_verified === "X"
  ) {
    ownerVerify.hidden = false;
    hasVerification = true;

    ownerVerifyStatus.classList.remove(
      "verify-status-yes",
      "verify-status-no"
    );

    if (profile.owner_verified === "Y") {
      ownerVerifyStatus.textContent = "✓";
      ownerVerifyStatus.classList.add("verify-status-yes");
      ownerVerifyText.textContent = "Проверено пользователем";
    } else {
      ownerVerifyStatus.textContent = "×";
      ownerVerifyStatus.classList.add("verify-status-no");
      ownerVerifyText.textContent = "Не проверено пользователем";
    }
  } else {
    ownerVerify.hidden = true;
  }

  if (
    profile.service_verified === "Y" ||
    profile.service_verified === "X"
  ) {
    serviceVerify.hidden = false;
    hasVerification = true;

    serviceVerifyStatus.classList.remove(
      "verify-status-yes",
      "verify-status-no"
    );

    if (profile.service_verified === "Y") {
      serviceVerifyStatus.textContent = "✓";
      serviceVerifyStatus.classList.add("verify-status-yes");
      serviceVerifyText.textContent = "Проверено сервисом itamityt.ru";
    } else {
      serviceVerifyStatus.textContent = "×";
      serviceVerifyStatus.classList.add("verify-status-no");
      serviceVerifyText.textContent = "Не проверено сервисом itamityt.ru";
    }
  } else {
    serviceVerify.hidden = true;
  }

  verificationBlock.hidden = !hasVerification;
}


// ============================================================
// Gallery
// ============================================================

let galleryPhotos = [];
let currentPhotoIndex = 0;

function normalizePhotos(photos) {
  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .slice(0, 5)
    .map(photo => {
      if (
        typeof photo === "string" &&
        photo.trim() !== ""
      ) {
        return photo.trim();
      }

      if (
        photo &&
        typeof photo.url === "string" &&
        photo.url.trim() !== ""
      ) {
        return photo.url.trim();
      }

      return null;
    })
    .filter(Boolean);
}


function renderGallery(photos) {
  gallery.innerHTML = "";

  galleryPhotos = normalizePhotos(photos);

  if (galleryPhotos.length === 0) {
    galleryBlock.hidden = true;
    return;
  }

  galleryPhotos.forEach((photoUrl, index) => {
    const card = document.createElement("div");
    card.className = "user-photo-card";

    const img = document.createElement("img");
    img.src = photoUrl;
    img.alt = "";
    img.loading = "lazy";

    card.addEventListener("click", () => {
      openImageViewer(index);
    });

    img.addEventListener("error", () => {
      card.remove();

      galleryPhotos = galleryPhotos.filter(
        url => url !== photoUrl
      );

      if (gallery.children.length === 0) {
        galleryBlock.hidden = true;
      }
    });

    card.appendChild(img);
    gallery.appendChild(card);
  });

  galleryBlock.hidden = gallery.children.length === 0;
}


// ============================================================
// Image viewer
// ============================================================

function openImageViewer(index) {
  if (
    !galleryPhotos.length ||
    index < 0 ||
    index >= galleryPhotos.length
  ) {
    return;
  }

  currentPhotoIndex = index;

  const overlay = document.createElement("div");
  overlay.className = "image-viewer";

  const image = document.createElement("img");
  image.className = "image-viewer-image";
  image.src = galleryPhotos[currentPhotoIndex];
  image.alt = "Просмотр фотографии";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-viewer-close";
  closeButton.textContent = "×";
  closeButton.setAttribute(
    "aria-label",
    "Закрыть просмотр"
  );

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "image-viewer-prev";
  prevButton.textContent = "‹";
  prevButton.setAttribute(
    "aria-label",
    "Предыдущая фотография"
  );

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "image-viewer-next";
  nextButton.textContent = "›";
  nextButton.setAttribute(
    "aria-label",
    "Следующая фотография"
  );

  const counter = document.createElement("div");
  counter.className = "image-viewer-counter";

  overlay.appendChild(image);
  overlay.appendChild(closeButton);
  overlay.appendChild(prevButton);
  overlay.appendChild(nextButton);
  overlay.appendChild(counter);

  document.body.appendChild(overlay);

  document.body.style.overflow = "hidden";


  function updateViewer() {
    image.src = galleryPhotos[currentPhotoIndex];

    counter.textContent =
      `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;

    if (galleryPhotos.length <= 1) {
      prevButton.hidden = true;
      nextButton.hidden = true;
    } else {
      prevButton.hidden = false;
      nextButton.hidden = false;
    }
  }


  function showPrevious() {
    if (galleryPhotos.length <= 1) {
      return;
    }

    currentPhotoIndex =
      (currentPhotoIndex - 1 + galleryPhotos.length) %
      galleryPhotos.length;

    updateViewer();
  }


  function showNext() {
    if (galleryPhotos.length <= 1) {
      return;
    }

    currentPhotoIndex =
      (currentPhotoIndex + 1) %
      galleryPhotos.length;

    updateViewer();
  }


  function closeViewer() {
    overlay.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeyDown);
  }


  function onKeyDown(event) {
    if (event.key === "Escape") {
      closeViewer();
      return;
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      showNext();
    }
  }


  closeButton.addEventListener(
    "click",
    closeViewer
  );

  prevButton.addEventListener(
    "click",
    showPrevious
  );

  nextButton.addEventListener(
    "click",
    showNext
  );


  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      closeViewer();
    }
  });


  document.addEventListener(
    "keydown",
    onKeyDown
  );

  updateViewer();
}


// ============================================================
// Description
// ============================================================

function renderDescription(profile) {
  const description =
    profile.profile_description ??
    profile.description;

  if (
    typeof description === "string" &&
    description.trim() !== ""
  ) {
    profileDescription.textContent =
      description.trim();

    descriptionBlock.hidden = false;
  } else {
    profileDescription.textContent = "";
    descriptionBlock.hidden = true;
  }
}


// ============================================================
// Links
// ============================================================

function renderLinks(profile) {
  linksContainer.innerHTML = "";

  if (
    !Array.isArray(profile.items) ||
    profile.items.length === 0
  ) {
    linksBlock.hidden = true;
    return;
  }

  let linksCount = 0;

  profile.items.forEach(item => {
    if (
      !item ||
      item.link_id === undefined ||
      item.link_id === null ||
      typeof item.name !== "string" ||
      item.name.trim() === ""
    ) {
      return;
    }

    const link = document.createElement("a");

    link.href =
      `${REDIRECT_URL}/${encodeURIComponent(item.link_id)}`;

    link.textContent = item.name.trim();

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.classList.add("profile-link-btn");

    linksContainer.appendChild(link);

    linksCount++;
  });

  linksBlock.hidden = linksCount === 0;
}


// ============================================================
// Extra
// ============================================================

function renderExtra(profile) {
  const extra =
    profile.profile_extra_info ??
    profile.extra;

  if (
    typeof extra === "string" &&
    extra.trim() !== ""
  ) {
    profileExtra.textContent = extra.trim();
    extraBlock.hidden = false;
  } else {
    profileExtra.textContent = "";
    extraBlock.hidden = true;
  }
}


// ============================================================
// Render profile
// ============================================================

function renderProfile(profile) {
  renderAvatar(profile);
  renderName(profile);
  renderUsername(profile);
  renderVerification(profile);

  const defaultBlocks = [
    "gallery",
    "description",
    "links",
    "extra"
  ];

  const renderers = {
    gallery: () => {
      renderGallery(profile.photos);
    },

    description: () => {
      renderDescription(profile);
    },

    links: () => {
      renderLinks(profile);
    },

    extra: () => {
      renderExtra(profile);
    }
  };

  if (
    !Array.isArray(profile.blocks) ||
    profile.blocks.length === 0
  ) {
    defaultBlocks.forEach(block => {
      renderers[block]();
    });

    return;
  }

  profile.blocks.forEach(block => {
    const renderer = renderers[block];

    if (renderer) {
      renderer();
    }
  });
}


// ============================================================
// Load profile
// ============================================================

async function loadProfile() {
  if (!username) {
    messageEl.textContent =
      "Не указан пользователь";

    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/public/profile/${encodeURIComponent(username)}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "Пользователь не найден"
        );
      }

      throw new Error(
        "Не удалось загрузить профиль"
      );
    }

    const profile = await response.json();

    renderProfile(profile);

  } catch (error) {
    console.error(
      "Ошибка загрузки профиля:",
      error
    );

    messageEl.textContent =
      error.message ||
      "Произошла ошибка";
  }
}


// ============================================================
// Copy profile link
// ============================================================

async function copyProfileLink() {
  const url = window.location.href;

  try {
    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea =
        document.createElement("textarea");

      textarea.value = url;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      textarea.remove();
    }

    copyBtn.textContent =
      "Ссылка скопирована!";

    setTimeout(() => {
      copyBtn.textContent =
        "Поделиться профилем";
    }, 2000);

  } catch (error) {
    console.error(
      "Не удалось скопировать ссылку:",
      error
    );

    copyBtn.textContent =
      "Не удалось скопировать";

    setTimeout(() => {
      copyBtn.textContent =
        "Поделиться профилем";
    }, 2000);
  }
}


copyBtn.addEventListener(
  "click",
  copyProfileLink
);


// ============================================================
// Start
// ============================================================

loadProfile();