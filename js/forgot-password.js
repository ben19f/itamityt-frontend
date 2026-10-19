const form = document.getElementById("forgotPasswordForm");
const messageEl = document.getElementById("forgotPasswordMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Отправка…";
  messageEl.textContent = "";

  try {
    const res = await fetch(`${API_URL}/auth/password-reset/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.elements.email.value.trim() })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Не удалось отправить запрос");

    messageEl.style.color = "green";
    messageEl.textContent = data.message || "Если адрес подтверждён и зарегистрирован, на него отправлена ссылка для сброса пароля";
    form.reset();
  } catch (err) {
    messageEl.style.color = "red";
    messageEl.textContent = err.message || "Ошибка сети. Попробуйте ещё раз.";
  } finally {
    button.disabled = false;
    button.textContent = "Отправить ссылку";
  }
});
