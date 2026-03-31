const API_URL = "https://dev.itamityt.ru/api/public";
const REDIRECT_URL = "https://dev.itamityt.ru/rserv";
// const API_URL = "/api/public";
// const REDIRECT_URL = "/rserv";

const searchBtn = document.getElementById("search-btn");
const searchUsernameInput = document.getElementById("search-username");
const messageEl = document.getElementById("message");

// =====================
// 🔍 Поиск пользователя
// =====================
if (searchBtn && searchUsernameInput && messageEl) {
  searchBtn.addEventListener("click", () => {
    const username = searchUsernameInput.value.trim();
    messageEl.textContent = "";

    if (!username) {
      messageEl.textContent = "Введите username";
      return;
    }

    fetch(`${API_URL}/profile/${encodeURIComponent(username)}`)
      .then(res => {
        if (!res.ok) throw new Error("Пользователь не найден");
        return res.json();
      })
      .then(() => {
        window.location.href = `public_profile.php?username=${encodeURIComponent(username)}`;
      })
      .catch(err => {
        console.error(err);
        messageEl.textContent = err.message;
      });
  });
}

// =======================================
// 👤 Карусель пользователей
// =======================================
const usersTrack = document.getElementById("users-cards");

if (usersTrack) {
  fetch(`${API_URL}/last-users`)
    .then(res => {
      if (!res.ok) throw new Error("Не удалось загрузить пользователей");
      return res.json();
    })
    .then(users => {
      if (!users || !users.length) {
        usersTrack.textContent = "Нет пользователей";
        return;
      }

      const last4 = users.slice(0, 4);

      last4.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("portfolio-carousel__card--sites");

        const title = document.createElement("h3");
        title.className = "portfolio-carousel__card-title";
        title.textContent = user.username;
        card.appendChild(title);

        if (user.items && user.items.length) {
          user.items.slice(0, 7).forEach(item => {
            const p = document.createElement("p");
            p.className = "portfolio-carousel__card-description";

            const a = document.createElement("a");
            a.href = `${REDIRECT_URL}/${item.link_id}`;
            a.textContent = item.name;
            a.target = "_blank";

            a.addEventListener("click", e => e.stopPropagation());

            p.appendChild(a);
            card.appendChild(p);
          });
        }

        card.addEventListener("click", () => {
          window.location.href = `public_profile.php?username=${encodeURIComponent(user.username)}`;
        });

        usersTrack.appendChild(card);
      });

      initUsersCarousel();
    })
    .catch(err => {
      console.error(err);
      usersTrack.textContent = "Ошибка загрузки пользователей";
    });
}

// =======================
// 🎠 Логика карусели
// =======================
function initUsersCarousel() {
  const track = document.getElementById("users-cards");
  const cards = track.querySelectorAll(".portfolio-carousel__card--sites");
  const prevBtn = document.getElementById("users-btn--prev");
  const nextBtn = document.getElementById("users-btn--next");

  if (!cards.length || !prevBtn || !nextBtn) return;

  const cardWidth = cards[0].offsetWidth + 30;
  let index = 0;

  function update() {
    track.style.transform = `translateX(${-index * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    index++;
    if (index > cards.length - 2) index = 0;
    update();
  });

  prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) index = cards.length - 2;
    update();
  });

  // автопрокрутка
  setInterval(() => {
    index++;
    if (index > cards.length - 2) index = 0;
    update();
  }, 4000);
}