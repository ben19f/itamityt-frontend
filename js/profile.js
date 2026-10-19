const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.php";
}

const list = document.getElementById("itemsList");
const message = document.getElementById("message");
const deleteBtn = document.getElementById("deleteAccountBtn");


// =====================================================
// AUTH
// =====================================================

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

function getAuthHeadersWithoutContentType() {
  return {
    "Authorization": `Bearer ${token}`
  };
}


// =====================================================
// MESSAGE
// =====================================================

function showMessage(text, type = "error") {
  message.textContent = text;
  message.style.color = type === "success" ? "green" : "red";
}


// =====================================================
// ПРОФИЛЬ
// =====================================================

async function loadProfile() {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: getAuthHeaders()
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));

      throw new Error(
        err.detail || "Ошибка загрузки профиля"
      );
    }

    const user = await res.json();

    const currentEmail = document.getElementById("currentEmail");
    if (currentEmail) {
      currentEmail.textContent = user.email || "Не указан";
    }

    document.getElementById("displayName").value =
      user.display_name || "";

    document.getElementById("profileDescription").value =
      user.profile_description || "";

    document.getElementById("profileExtraInfo").value =
      user.profile_extra_info || "";

    const avatarPreview =
      document.getElementById("avatarPreview");

    if (user.avatar_url) {
      avatarPreview.src = user.avatar_url;
    } else {
      avatarPreview.src = "/images/default-avatar.png";
    }

  } catch (err) {
    showMessage(err.message);
  }
}

// =====================================================
// ПАРОЛЬ И ПОЧТА
// =====================================================

function showAccountMessage(element, text, type = "error") {
  element.textContent = text;
  element.style.color = type === "success" ? "green" : "red";
}

document.getElementById("passwordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const currentPassword = form.elements.current_password.value;
  const newPassword = form.elements.new_password.value;
  const confirmPassword = form.elements.confirm_password.value;
  const feedback = document.getElementById("passwordMessage");

  if (newPassword !== confirmPassword) {
    showAccountMessage(feedback, "Новые пароли не совпадают");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users/me/password`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Не удалось изменить пароль");

    form.reset();
    showAccountMessage(feedback, data.message || "Пароль успешно изменён", "success");
  } catch (err) {
    showAccountMessage(feedback, err.message);
  }
});

document.getElementById("emailForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const feedback = document.getElementById("emailMessage");
  const newEmail = form.elements.new_email.value.trim();

  try {
    const res = await fetch(`${API_URL}/users/me/email`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ new_email: newEmail, current_password: form.elements.current_password.value })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Не удалось изменить почту");

    form.reset();
    showAccountMessage(feedback, data.message || `Ссылка для подтверждения отправлена на ${data.pending_email || newEmail}`, "success");
  } catch (err) {
    showAccountMessage(feedback, err.message);
  }
});


// =====================================================
// СОХРАНЕНИЕ ПРОФИЛЯ
// =====================================================

document
  .getElementById("profileForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const body = {
      display_name:
        document.getElementById("displayName").value.trim(),

      profile_description:
        document
          .getElementById("profileDescription")
          .value
          .trim(),

      profile_extra_info:
        document
          .getElementById("profileExtraInfo")
          .value
          .trim()
    };

    try {

      const res = await fetch(
        `${API_URL}/users/me`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(body)
        }
      );

      if (!res.ok) {

        const err =
          await res.json().catch(() => ({}));

        throw new Error(
          err.detail || "Ошибка сохранения профиля"
        );
      }

      showMessage(
        "Профиль сохранён",
        "success"
      );

    } catch (err) {

      showMessage(err.message);

    }

  });


// =====================================================
// АВАТАР
// =====================================================

const avatarInput =
  document.getElementById("avatarInput");

const chooseAvatarBtn =
  document.getElementById("chooseAvatarBtn");

const deleteAvatarBtn =
  document.getElementById("deleteAvatarBtn");

const avatarPreview =
  document.getElementById("avatarPreview");


chooseAvatarBtn.addEventListener(
  "click",
  () => {
    avatarInput.click();
  }
);


avatarInput.addEventListener(
  "change",
  async () => {

    const file = avatarInput.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {

      showMessage(
        "Разрешены только JPEG, PNG и WEBP"
      );

      avatarInput.value = "";

      return;
    }

    // Предварительный просмотр
    const previewUrl =
      URL.createObjectURL(file);

    avatarPreview.src = previewUrl;


    const formData = new FormData();

    formData.append("file", file);


    try {

      const res = await fetch(
        `${API_URL}/users/me/avatar`,
        {
          method: "POST",
          headers: getAuthHeadersWithoutContentType(),
          body: formData
        }
      );


      if (!res.ok) {

        const err =
          await res.json().catch(() => ({}));

        throw new Error(
          err.detail || "Ошибка загрузки аватара"
        );
      }


      const data = await res.json();

      avatarPreview.src = data.avatar_url;

      URL.revokeObjectURL(previewUrl);

      showMessage(
        "Аватар загружен",
        "success"
      );

    } catch (err) {

      URL.revokeObjectURL(previewUrl);

      showMessage(err.message);

      // Возвращаем актуальный аватар
      await loadProfile();

    } finally {

      avatarInput.value = "";

    }

  }
);


// =====================================================
// УДАЛЕНИЕ АВАТАРА
// =====================================================

deleteAvatarBtn.addEventListener(
  "click",
  async () => {

    if (!confirm("Удалить аватар?")) {
      return;
    }

    try {

      const res = await fetch(
        `${API_URL}/users/me/avatar`,
        {
          method: "DELETE",
          headers: getAuthHeadersWithoutContentType()
        }
      );


      if (!res.ok) {

        const err =
          await res.json().catch(() => ({}));

        throw new Error(
          err.detail || "Ошибка удаления аватара"
        );
      }


      avatarPreview.src =
        "/images/default-avatar.png";


      showMessage(
        "Аватар удалён",
        "success"
      );

    } catch (err) {

      showMessage(err.message);

    }

  }
);


// =====================================================
// ФОТОГРАФИИ
// =====================================================

const photoInput =
  document.getElementById("photoInput");

const choosePhotoBtn =
  document.getElementById("choosePhotoBtn");

const photosGrid =
  document.getElementById("photosGrid");


choosePhotoBtn.addEventListener(
  "click",
  () => {
    photoInput.click();
  }
);


photoInput.addEventListener(
  "change",
  async () => {

    const files = Array.from(photoInput.files);

    if (!files.length) {
      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];


    for (const file of files) {

      if (!allowedTypes.includes(file.type)) {

        showMessage(
          `Файл "${file.name}" имеет недопустимый формат`
        );

        continue;
      }


      const formData = new FormData();

      formData.append("file", file);


      try {

        const res = await fetch(
          `${API_URL}/users/me/photos`,
          {
            method: "POST",
            headers: getAuthHeadersWithoutContentType(),
            body: formData
          }
        );


        if (!res.ok) {

          const err =
            await res.json().catch(() => ({}));

          throw new Error(
            err.detail ||
            "Ошибка загрузки фотографии"
          );
        }

        showMessage(
          `"${file.name}" загружена`,
          "success"
        );

      } catch (err) {

        showMessage(
          `${file.name}: ${err.message}`
        );

      }

    }


    photoInput.value = "";

    await loadPhotos();

  }
);


// =====================================================
// ЗАГРУЗКА ФОТОГРАФИЙ
// =====================================================

async function loadPhotos() {

  try {

    const res = await fetch(
      `${API_URL}/users/me/photos`,
      {
        headers: getAuthHeaders()
      }
    );


    if (!res.ok) {

      const err =
        await res.json().catch(() => ({}));

      throw new Error(
        err.detail ||
        "Ошибка загрузки фотографий"
      );
    }


    const photos = await res.json();

    renderPhotos(photos);

  } catch (err) {

    showMessage(err.message);

  }

}


// =====================================================
// ОТРИСОВКА ФОТОГРАФИЙ
// =====================================================

function renderPhotos(photos) {

  photosGrid.innerHTML = "";


  if (!photos.length) {

    photosGrid.innerHTML = `
      <div class="empty-state">
        Фотографий пока нет
      </div>
    `;

    return;
  }


  photos.forEach((photo) => {

    const card =
      document.createElement("div");

    card.className = "photo-card";


    const img =
      document.createElement("img");

    img.src = photo.image_url;

    img.alt = "Фото профиля";

    img.loading = "lazy";


    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className =
      "photo-delete";

    deleteButton.textContent =
      "Удалить";


    deleteButton.addEventListener(
      "click",
      () => deletePhoto(photo.id)
    );


    card.appendChild(img);

    card.appendChild(deleteButton);

    photosGrid.appendChild(card);

  });

}


// =====================================================
// УДАЛЕНИЕ ФОТОГРАФИИ
// =====================================================

async function deletePhoto(id) {

  if (!confirm("Удалить фотографию?")) {
    return;
  }


  try {

    const res = await fetch(
      `${API_URL}/users/me/photos/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType()
      }
    );


    if (!res.ok) {

      const err =
        await res.json().catch(() => ({}));

      throw new Error(
        err.detail ||
        "Ошибка удаления фотографии"
      );
    }


    showMessage(
      "Фотография удалена",
      "success"
    );


    await loadPhotos();

  } catch (err) {

    showMessage(err.message);

  }

}


// =====================================================
// ЗАГРУЗКА ССЫЛОК
// =====================================================

async function loadItems() {

  try {

    const res = await fetch(
      `${API_URL}/items/`,
      {
        headers: getAuthHeaders()
      }
    );


    if (!res.ok) {

      const err =
        await res.json().catch(() => ({}));

      throw new Error(
        err.detail || "Ошибка загрузки ссылок"
      );
    }


    const items = await res.json();

    list.innerHTML = "";


    if (!items.length) {

      list.innerHTML = `
        <div class="empty-state">
          У вас пока нет ссылок
        </div>
      `;

      return;
    }


    items.forEach(item => {

      const redirectUrl =
        `${REDIRECT_URL}/${item.link_id}`;


      const card =
        document.createElement("div");

      card.className = "link-card";


      card.innerHTML = `
        <div class="link-info">

          <div class="link-name">
            ${item.name}
          </div>

          <div class="link-url">
            ${redirectUrl}
          </div>

        </div>

        <div class="link-clicks" aria-label="Количество переходов по ссылке">
          <span class="link-clicks-label">Клики</span>
          <span class="link-clicks-count"></span>
        </div>

        <div class="link-actions">

          <a
            href="${redirectUrl}"
            target="_blank"
            class="btn-small"
          >
            Открыть
          </a>

          <button
            type="button"
            class="btn-small copy-link-btn"
          >
            Копировать
          </button>

          <button
            type="button"
            class="btn-small danger delete-link-btn"
          >
            Удалить
          </button>

        </div>
      `;

      const clickCountElement = card.querySelector(".link-clicks-count");
      clickCountElement.textContent = "…";
      loadItemClickCount(item.link_id, clickCountElement);


      card
        .querySelector(".copy-link-btn")
        .addEventListener(
          "click",
          () => copyLink(redirectUrl)
        );


      card
        .querySelector(".delete-link-btn")
        .addEventListener(
          "click",
          () => deleteItem(item.id)
        );


      list.appendChild(card);

    });


  } catch (err) {

    showMessage(err.message);

  }

}

async function loadItemClickCount(linkId, target) {
  try {
    const response = await fetch(
      `${REDIRECT_URL}/${encodeURIComponent(linkId)}/clicks`
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить статистику кликов");
    }

    const body = await response.text();
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      data = body.trim();
    }
    const rawCount = typeof data === "number"
      ? data
      : data?.clicks ?? data?.click_count ?? data?.count ?? data?.total_clicks;
    const count = Number(rawCount);

    if (rawCount == null || !Number.isFinite(count) || count < 0) {
      throw new Error("Некорректный формат статистики кликов");
    }

    target.textContent = new Intl.NumberFormat("ru-RU").format(count);
    target.removeAttribute("title");
  } catch (error) {
    target.textContent = "—";
    target.title = "Не удалось загрузить статистику кликов";
  }
}


// =====================================================
// КОПИРОВАНИЕ ССЫЛКИ
// =====================================================

async function copyLink(url) {

  try {

    await navigator.clipboard.writeText(url);

    showMessage(
      "Ссылка скопирована",
      "success"
    );

  } catch (err) {

    showMessage(
      "Не удалось скопировать ссылку"
    );

  }

}


// =====================================================
// ДОБАВЛЕНИЕ ССЫЛКИ
// =====================================================

document
  .getElementById("addItemForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();


    const form = e.target;


    const body = {
      name: form.name.value.trim(),
      description: form.description.value.trim()
    };


    try {

      const res = await fetch(
        `${API_URL}/items/`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(body)
        }
      );


      if (!res.ok) {

        const err =
          await res.json().catch(() => ({}));

        throw new Error(
          err.detail || "Ошибка добавления"
        );
      }


      showMessage(
        "Ссылка добавлена",
        "success"
      );


      form.reset();

      await loadItems();


    } catch (err) {

      showMessage(err.message);

    }

  });


// =====================================================
// УДАЛЕНИЕ ССЫЛКИ
// =====================================================

async function deleteItem(id) {

  if (!confirm("Удалить ссылку?")) {
    return;
  }


  try {

    const res = await fetch(
      `${API_URL}/items/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeadersWithoutContentType()
      }
    );


    if (!res.ok) {

      const err =
        await res.json().catch(() => ({}));

      throw new Error(
        err.detail || "Ошибка удаления"
      );
    }


    showMessage(
      "Ссылка удалена",
      "success"
    );


    await loadItems();


  } catch (err) {

    showMessage(err.message);

  }

}


// =====================================================
// LOGOUT
// =====================================================

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href =
      "/login.php";

  });


// =====================================================
// УДАЛЕНИЕ АККАУНТА
// =====================================================

if (deleteBtn) {

  deleteBtn.addEventListener(
    "click",
    async () => {

      if (!confirm(
        "Удалить аккаунт? Это навсегда"
      )) {
        return;
      }


      try {

        const res = await fetch(
          `${API_URL}/users/delete/me`,
          {
            method: "DELETE",
            headers: getAuthHeadersWithoutContentType()
          }
        );


        if (!res.ok) {

          const err =
            await res.json().catch(() => ({}));

          throw new Error(
            err.detail ||
            "Ошибка удаления аккаунта"
          );
        }


        localStorage.removeItem("token");

        window.location.href =
          "/index.php";


      } catch (err) {

        showMessage(err.message);

      }

    }
  );

}


// =====================================================
// INITIAL LOAD
// =====================================================

loadProfile();
loadPhotos();
loadItems();
