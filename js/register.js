// URL бэкенда через Nginx proxy на /api
// const API_URL = "https://dev.itamityt.ru/api"; 
const API_URL = "/api";  

const form = document.getElementById("registerForm");
const messageEl = document.getElementById("message");

// ✅ нормализация username
function normalizeUsername(input) {
  return input
    .trim()
    .replace(/^@+/, "") // убираем @ в начале
    .toLowerCase();
}

// 👉 убираем пробелы при вводе
form.username.addEventListener("input", () => {
  form.username.value = form.username.value.replace(/\s/g, "");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  messageEl.textContent = "";
  messageEl.style.color = "red";

  const username = normalizeUsername(form.username.value);
  const email = form.email.value.trim();
  const password = form.password.value;

  // 🔎 базовая валидация
  if (username.length < 3) {
    messageEl.textContent = "Username должен быть минимум 3 символа";
    return;
  }

  if (password.length < 6) {
    messageEl.textContent = "Пароль должен быть минимум 6 символов";
    return;
  }

  const formData = { username, email, password };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      messageEl.style.color = "green";
      messageEl.textContent = `Аккаунт @${data.username} создан`;

      form.reset();

      // 🚀 редирект после регистрации
      setTimeout(() => {
        window.location.href = "/login.php";
      }, 1500);

    } else {
      if (data.detail && Array.isArray(data.detail)) {
        messageEl.textContent = data.detail
          .map(err => `${err.loc[1]}: ${err.msg}`)
          .join("; ");
      } else {
        messageEl.textContent = data.detail || "Ошибка регистрации";
      }
    }

  } catch (err) {
    console.error(err);
    messageEl.textContent = "Ошибка сети";
  }
});