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
const ownerVerifyStatus = document.getElementById(
  "owner-verify-status"
);
const ownerVerifyText = document.getElementById(
  "owner-verify-text"
);

const serviceVerify = document.getElementById("service-verify");
const serviceVerifyStatus = document.getElementById(
  "service-verify-status"
);
const serviceVerifyText = document.getElementById(
  "service-verify-text"
);

const galleryBlock = document.getElementById(
  "profile-gallery-block"
);
const gallery = document.getElementById(
  "profile-gallery"
);

const descriptionBlock = document.getElementById(
  "profile-description-block"
);
const profileDescription = document.getElementById(
  "profile-description"
);

const linksBlock = document.getElementById(
  "profile-links-block"
);

const extraBlock = document.getElementById(
  "profile-extra-block"
);
const profileExtra = document.getElementById(
  "profile-extra"
);

const copyBtn = document.getElementById(
  "copy-profile-link"
);


// =====================================================
// USERNAME ИЗ URL
// =====================================================

const username = window.location.pathname
  .replace(/^\/uun\//, "")
  .replace(/\/$/, "");


// =====================================================
// AVATAR
// =====================================================

function renderAvatar(profile) {

  if (
    profile.avatar_url &&
    typeof profile.avatar_url === "string"
  ) {
    profileAvatar.src = profile.avatar_url;
  }

}


// =====================================================
// NAME
// =====================================================

function renderName(profile) {

  if (
    typeof profile.display_name === "string" &&
    profile.display_name.trim() !== ""
  ) {

    profileName.textContent =
      profile.display_name.trim();

    profileNameBlock.hidden = false;

  } else {

    profileNameBlock.hidden = true;

  }

}


// =====================================================
// USERNAME
// =====================================================

function renderUsername(profile) {

  if (
    typeof profile.username === "string" &&
    profile.username.trim() !== ""
  ) {

    profileTitle.textContent =
      `@${profile.username}`;

  } else {

    profileTitle.textContent = "";

  }

}


// =====================================================
// ВЕРИФИКАЦИЯ
// =====================================================

function renderVerification(profile) {

  let hasVerification = false;


  // -------------------------
  // Проверено пользователем
  // -------------------------

  if (typeof profile.owner_verified === "boolean") {

    ownerVerify.hidden = false;
    hasVerification = true;

    if (profile.owner_verified) {

      ownerVerifyStatus.textContent = "✓";
      ownerVerifyText.textContent =
        "Проверено пользователем";

    } else {

      ownerVerifyStatus.textContent = "×";
      ownerVerifyText.textContent =
        "Не проверено пользователем";

    }

  } else {

    ownerVerify.hidden = true;

  }


  // -------------------------
  // Проверено сервисом
  // -------------------------

  if (typeof profile.service_verified === "boolean") {

    serviceVerify.hidden = false;
    hasVerification = true;

    if (profile.service_verified) {

      serviceVerifyStatus.textContent = "✓";
      serviceVerifyText.textContent =
        "Проверено сервисом itamityt.ru";

    } else {

      serviceVerifyStatus.textContent = "×";
      serviceVerifyText.textContent =
        "Не проверено сервисом itamityt.ru";

    }

  } else {

    serviceVerify.hidden = true;

  }


  // -------------------------
  // Весь блок
  // -------------------------

  verificationBlock.hidden = !hasVerification;

}


// =====================================================
// ГАЛЕРЕЯ
// =====================================================

function renderGallery(photos) {

  gallery.innerHTML = "";

  if (!Array.isArray(photos) || photos.length === 0) {

    galleryBlock.hidden = true;
    return;

  }


  // Максимум 5 фотографий
  photos
    .slice(0, 5)
    .forEach(photo => {

      if (
        !photo ||
        typeof photo.url !== "string" ||
        photo.url.trim() === ""
      ) {
        return;
      }


      const card =
        document.createElement("div");

      card.className = "user-photo-card";


      const img =
        document.createElement("img");

      img.src = photo.url;
      img.alt = "";
      img.loading = "lazy";


      card.appendChild(img);
      gallery.appendChild(card);

    });


  // Показываем блок только если
  // реально добавилась хотя бы одна фотография
  galleryBlock.hidden =
    gallery.children.length === 0;

}


// =====================================================
// ОПИСАНИЕ
// =====================================================

function renderDescription(profile) {

  if (
    typeof profile.profile_description === "string" &&
    profile.profile_description.trim() !== ""
  ) {

    profileDescription.textContent =
      profile.profile_description.trim();

    descriptionBlock.hidden = false;

  } else {

    profileDescription.textContent = "";
    descriptionBlock.hidden = true;

  }

}


// =====================================================
// ССЫЛКИ
// =====================================================

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


    const link =
      document.createElement("a");

    link.href =
      `${REDIRECT_URL}/${encodeURIComponent(item.link_id)}`;

    link.textContent =
      item.name.trim();

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.classList.add(
      "profile-link-btn"
    );


    linksContainer.appendChild(link);

    linksCount++;

  });


  linksBlock.hidden =
    linksCount === 0;

}


// =====================================================
// ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
// =====================================================

function renderExtra(profile) {

  if (
    typeof profile.profile_extra_info === "string" &&
    profile.profile_extra_info.trim() !== ""
  ) {

    profileExtra.textContent =
      profile.profile_extra_info.trim();

    extraBlock.hidden = false;

  } else {

    profileExtra.textContent = "";
    extraBlock.hidden = true;

  }

}


// =====================================================
// ВЕСЬ ПРОФИЛЬ
// =====================================================

function renderProfile(profile) {

  renderAvatar(profile);

  renderName(profile);

  renderUsername(profile);

  renderVerification(profile);

  renderGallery(profile.photos);

  renderDescription(profile);

  renderLinks(profile);

  renderExtra(profile);

}


// =====================================================
// ЗАГРУЗКА ПРОФИЛЯ
// =====================================================

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
        throw new Error("Пользователь не найден");
      }

      throw new Error(
        "Не удалось загрузить профиль"
      );

    }


    const profile =
      await response.json();


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


// =====================================================
// КОПИРОВАНИЕ ССЫЛКИ
// =====================================================

async function copyProfileLink() {

  const url =
    window.location.href;


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


// =====================================================
// EVENTS
// =====================================================

copyBtn.addEventListener(
  "click",
  copyProfileLink
);


// =====================================================
// START
// =====================================================

loadProfile();