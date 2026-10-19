const form = document.getElementById("resetPasswordForm");
const messageEl = document.getElementById("resetPasswordMessage");
const resetToken = new URLSearchParams(window.location.search).get("token");

if (!resetToken) {
  messageEl.style.color = "red";
  messageEl.textContent = "В ссылке отсутствует токен сброса. Запросите новую ссылку.";
  form.querySelector("button[type='submit']").disabled = true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!resetToken) return;

  const newPassword = form.elements.new_password.value;
  if (newPassword !== form.elements.confirm_password.value) {
    messageEl.style.color = "red";
    messageEl.textContent = "Пароли не совпадают";
    return;
  }

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Сохранение…";
  messageEl.textContent = "";

  try {
    const res = await fetch(`${API_URL}/auth/password-reset/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: resetToken, new_password: newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Не удалось сбросить пароль");

    messageEl.style.color = "green";
    messageEl.textContent = data.message || "Пароль успешно изменён. Теперь можно войти.";
    form.reset();
    form.querySelectorAll("input, button").forEach((element) => { element.disabled = true; });
  } catch (err) {
    messageEl.style.color = "red";
    messageEl.textContent = err.message || "Ошибка сети. Попробуйте ещё раз.";
  } finally {
    if (button.isConnected && button.textContent === "Сохранение…") {
      button.disabled = false;
      button.textContent = "Сохранить новый пароль";
    }
  }
});
