// =======================================
// 🔍 ПОИСК ПОЛЬЗОВАТЕЛЯ
// =======================================

const searchBtn =
  document.getElementById("search-btn");

const searchUsernameInput =
  document.getElementById("search-username");

const messageEl =
  document.getElementById("message");


if (
  searchBtn &&
  searchUsernameInput &&
  messageEl
) {

  searchBtn.addEventListener("click", async () => {

    let username =
      searchUsernameInput.value.trim();

    messageEl.textContent = "";


    // Убираем @

    if (username.startsWith("@")) {
      username = username.substring(1);
    }


    if (!username) {

      messageEl.textContent =
        "Введите username";

      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/public/profile/${encodeURIComponent(username)}`
      );


      if (!response.ok) {
        throw new Error("Пользователь не найден");
      }


      window.location.href =
        `/uun/${encodeURIComponent(username)}`;


    } catch (error) {

      console.error(error);

      messageEl.textContent =
        error.message;

    }

  });

}


// =======================================
// 👤 НОВЫЕ ПОЛЬЗОВАТЕЛИ
// =======================================

const usersTrack =
  document.getElementById("users-cards");

const usersMessage =
  document.getElementById("users-message");

if (usersTrack) {

  fetch(`${API_URL}/public/last-users`)

    .then(response => {

      if (!response.ok) {
        throw new Error(
          "Не удалось загрузить пользователей"
        );
      }

      return response.json();

    })

    .then(users => {

      usersTrack.innerHTML = "";

      if (usersMessage) {
        usersMessage.textContent = "";
      }

      if (
        !Array.isArray(users) ||
        users.length === 0
      ) {

        if (usersMessage) {
          usersMessage.textContent =
            "Нет пользователей";
        }

        return;
      }

      users
        .slice(0, 4)
        .forEach(user => {

          const card =
            document.createElement("div");

          card.className = "user-card";


          // Аватар

          const avatar =
            document.createElement("div");

          avatar.className =
            "user-card-avatar";

          const avatarImg =
            document.createElement("img");

          avatarImg.src =
            user.avatar_url ||
            "/images/test-avatar.png";

          avatarImg.alt =
            user.display_name ||
            user.username ||
            "";

          avatarImg.loading = "lazy";

          avatar.appendChild(avatarImg);
          card.appendChild(avatar);


          // Username

          const username =
            document.createElement("div");

          username.className =
            "user-card-username";

          username.textContent =
            `@${user.username}`;

          card.appendChild(username);


          // Display name

          if (
            typeof user.display_name === "string" &&
            user.display_name.trim() !== ""
          ) {

            const name =
              document.createElement("div");

            name.className =
              "user-card-name";

            name.textContent =
              user.display_name.trim();

            card.appendChild(name);
          }


          // Переход в профиль

          card.addEventListener("click", () => {

            window.location.href =
              `/uun/${encodeURIComponent(
                user.username
              )}`;

          });


          usersTrack.appendChild(card);

        });


      // Запускаем карусель

      initUsersCarousel();

    })

    .catch(error => {

      console.error(error);

      usersTrack.innerHTML = "";

      if (usersMessage) {
        usersMessage.textContent =
          "Ошибка загрузки пользователей";
      }

    });

}


// =======================================
// 🎠 КАРУСЕЛЬ ПОЛЬЗОВАТЕЛЕЙ
// =======================================

// =======================================
// 🎠 КАРУСЕЛЬ ПОЛЬЗОВАТЕЛЕЙ
// =======================================

function initUsersCarousel() {

  const track =
    document.getElementById("users-cards");

  const prevBtn =
    document.getElementById("users-btn--prev");

  const nextBtn =
    document.getElementById("users-btn--next");


  if (
    !track ||
    !prevBtn ||
    !nextBtn
  ) {
    return;
  }


  const cards =
    track.querySelectorAll(".user-card");


  if (!cards.length) {
    return;
  }


  let index = 0;


  // ---------------------------------------
  // Размер одной карточки + gap
  // ---------------------------------------

  function getCardStep() {

    const card =
      cards[0];

    const style =
      window.getComputedStyle(track);

    const gap =
      parseFloat(style.gap) || 0;

    return card.offsetWidth + gap;
  }


  // ---------------------------------------
  // Сколько карточек видно
  // ---------------------------------------

  function getVisibleCards() {

    const windowElement =
      track.parentElement;

    const cardWidth =
      cards[0].offsetWidth;

    const gap =
      parseFloat(
        window.getComputedStyle(track).gap
      ) || 0;


    return Math.max(
      1,
      Math.floor(
        (windowElement.offsetWidth + gap) /
        (cardWidth + gap)
      )
    );
  }


  // ---------------------------------------
  // Максимальная позиция
  // ---------------------------------------

  function getMaxIndex() {

    const visibleCards =
      getVisibleCards();

    return Math.max(
      0,
      cards.length - visibleCards
    );
  }


  // ---------------------------------------
  // Обновление
  // ---------------------------------------

  function update() {

    const step =
      getCardStep();

    track.style.transform =
      `translateX(${-index * step}px)`;
  }


  // ---------------------------------------
  // Вперёд
  // ---------------------------------------

  function next() {

    const maxIndex =
      getMaxIndex();

    if (maxIndex === 0) {
      return;
    }

    index++;

    if (index > maxIndex) {
      index = 0;
    }

    update();
  }


  // ---------------------------------------
  // Назад
  // ---------------------------------------

  function prev() {

    const maxIndex =
      getMaxIndex();

    if (maxIndex === 0) {
      return;
    }

    index--;

    if (index < 0) {
      index = maxIndex;
    }

    update();
  }


  // ---------------------------------------
  // Кнопки
  // ---------------------------------------

  nextBtn.addEventListener(
    "click",
    next
  );

  prevBtn.addEventListener(
    "click",
    prev
  );


  // ---------------------------------------
  // Автопрокрутка
  // ---------------------------------------

  setInterval(() => {

    next();

  }, 4000);


  // ---------------------------------------
  // Resize
  // ---------------------------------------

  window.addEventListener(
    "resize",
    () => {

      const maxIndex =
        getMaxIndex();

      if (index > maxIndex) {
        index = maxIndex;
      }

      update();

    }
  );


  update();
}