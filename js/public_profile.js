const API_URL = "https://dev.itamityt.ru/api/public";
const REDIRECT_URL = "https://dev.itamityt.ru/rserv";

// const API_URL = "/api/public";
// const REDIRECT_URL = "/rserv";

const linksContainer = document.getElementById("links-container");
const messageEl = document.getElementById("message");
const profileTitle = document.getElementById("profile-title");

// Получаем username из query-параметра
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

if (!username) {
  messageEl.textContent = "Не указан пользователь";
} else {
  profileTitle.textContent = `@${username}`;

  fetch(`${API_URL}/profile/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("Пользователь не найден");
      return res.json();
    })
    .then(items => {
      if (items.length === 0) {
        linksContainer.textContent = "У пользователя пока нет ссылок";
        return;
      }
      items.forEach(item => {
        const p = document.createElement("p");
        p.classList.add("link-item"); // добавляем класс
        const redirectUrl = `${REDIRECT_URL}/${item.link_id}`;
        const a = document.createElement("a");
        a.href = redirectUrl;
        a.textContent = item.name;
        a.target = "_blank";
        a.classList.add("link-item__link"); // отдельный класс для ссылки
        p.appendChild(a);
        linksContainer.appendChild(p);
      });
    })
    .catch(err => {
      console.error(err);
      messageEl.textContent = err.message;
    });
}
