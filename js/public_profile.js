const linksContainer = document.getElementById("links-container");
const messageEl = document.getElementById("message");
const profileTitle = document.getElementById("profile-title");
const copyBtn = document.getElementById("copy-profile-link");

const params = new URLSearchParams(window.location.search);
// const username = params.get("username");
const username = window.location.pathname
  .replace(/^\/uun\//, "")
  .replace(/\/$/, "");

if (!username) {
  messageEl.textContent = "Не указан пользователь";
} else {
  profileTitle.textContent = `@${username}`;

  // копирование ссылки
  copyBtn.addEventListener("click", async () => {
  const url = window.location.href;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    copyBtn.textContent = "Скопировано!";
    setTimeout(() => {
      copyBtn.textContent = "Скопировать ссылку";
    }, 2000);

  } catch (err) {
    console.error("Не удалось скопировать ссылку:", err);
    copyBtn.textContent = "Не удалось скопировать";

    setTimeout(() => {
      copyBtn.textContent = "Скопировать ссылку";
    }, 2000);
  }
});

  fetch(`${API_URL}/public/profile/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("Пользователь не найден");
      return res.json();
    })
    .then(items => {
      if (items.length === 0) {
        linksContainer.innerHTML = `
          <div class="empty-state">
            У пользователя пока нет ссылок
          </div>
        `;
        return;
      }

      items.forEach(item => {
        const link = document.createElement("a");
        link.href = `${REDIRECT_URL}/${item.link_id}`;
        link.textContent = item.name;
        link.target = "_blank";

        link.classList.add("profile-link-btn");

        linksContainer.appendChild(link);
      });
    })
    .catch(err => {
      console.error(err);
      messageEl.textContent = err.message;
    });
}