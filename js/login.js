const form = document.getElementById("loginForm");
const messageEl = document.getElementById("message");
const API_URL = "/api";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  messageEl.textContent = "";
  messageEl.style.color = "red";

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    messageEl.textContent = "Заполните все поля";
    return;
  }

  const submitBtn = form.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Вход...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);

      messageEl.style.color = "green";
      messageEl.textContent = "Успешный вход";

      // 🚀 небольшой delay = лучше UX
      setTimeout(() => {
        window.location.href = "/userhome.php";
      }, 800);

    } else {
      messageEl.textContent = data.detail || "Неверный email или пароль";
    }

  } catch (err) {
    console.error(err);
    messageEl.textContent = "Ошибка сети";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Войти";
  }
});