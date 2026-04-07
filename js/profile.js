const API_URL = "/api";
const REDIRECT_URL = "/rserv";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login.php";
}

const list = document.getElementById("itemsList");
const message = document.getElementById("message");
const deleteBtn = document.getElementById("deleteAccountBtn");

// -------------------------------
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

// -------------------------------
// Загрузка ссылок
// -------------------------------
async function loadItems() {
  try {
    const res = await fetch(`${API_URL}/items/`, {
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Ошибка загрузки");

    const items = await res.json();
    list.innerHTML = "";

    if (!items.length) {
      list.innerHTML = `<div class="empty-state">У вас пока нет ссылок</div>`;
      return;
    }

    items.forEach(item => {
      const redirectUrl = `${REDIRECT_URL}/${item.link_id}`;

      const card = document.createElement("div");
      card.className = "link-card";

      card.innerHTML = `
        <div class="link-info">
          <div class="link-name">${item.name}</div>
          <div class="link-url">${redirectUrl}</div>
        </div>

        <div class="link-actions">
          <a href="${redirectUrl}" target="_blank" class="btn-small">Открыть</a>
          <button onclick="copyLink('${redirectUrl}')" class="btn-small">Копировать</button>
          <button onclick="deleteItem(${item.id})" class="btn-small danger">Удалить</button>
        </div>
      `;

      list.appendChild(card);
    });

  } catch (err) {
    message.textContent = err.message;
  }
}

// -------------------------------
// Копирование
// -------------------------------
function copyLink(url) {
  navigator.clipboard.writeText(url);
  message.style.color = "green";
  message.textContent = "Ссылка скопирована";
}

// -------------------------------
// Добавление
// -------------------------------
document.getElementById("addItemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const body = {
    name: form.name.value.trim(),
    description: form.description.value.trim()
  };

  try {
    const res = await fetch(`${API_URL}/items/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Ошибка добавления");

    message.style.color = "green";
    message.textContent = "Ссылка добавлена";

    form.reset();
    loadItems();

  } catch (err) {
    message.textContent = err.message;
  }
});

// -------------------------------
// Удаление
// -------------------------------
async function deleteItem(id) {
  if (!confirm("Удалить ссылку?")) return;

  try {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Ошибка удаления");

    message.style.color = "green";
    message.textContent = "Ссылка удалена";

    loadItems();

  } catch (err) {
    message.textContent = err.message;
  }
}

// -------------------------------
// Logout
// -------------------------------
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "/login.php";
};

// -------------------------------
// Удаление аккаунта
// -------------------------------
if (deleteBtn) {
  deleteBtn.onclick = async () => {
    if (!confirm("Удалить аккаунт? Это навсегда")) return;

    try {
      const res = await fetch(`${API_URL}/users/delete/me`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });

      if (!res.ok) throw new Error("Ошибка удаления");

      localStorage.removeItem("token");
      window.location.href = "/index.php";

    } catch (err) {
      message.textContent = err.message;
    }
  };
}

// -------------------------------
loadItems();