const params = new URLSearchParams(window.location.search);
const token = params.get("token");

const messageEl = document.getElementById("verify-message");

async function verifyEmail() {
  if (!token) {
    messageEl.textContent = "Ссылка для подтверждения email недействительна.";
    messageEl.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token
      })
    });

    const data = await res.json();

    if (res.ok) {
      messageEl.textContent =
        data.message || "Email успешно подтверждён.";
      messageEl.style.color = "green";
    } else {
      messageEl.textContent =
        data.detail || "Не удалось подтвердить email.";
      messageEl.style.color = "red";
    }

  } catch (err) {
    console.error(err);
    messageEl.textContent = "Ошибка сети.";
    messageEl.style.color = "red";
  }
}

verifyEmail();