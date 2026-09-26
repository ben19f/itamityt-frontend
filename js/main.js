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

// =======================================
// 👤 НОВЫЕ ПОЛЬЗОВАТЕЛИ
// =======================================

const usersTrack =
  document.getElementById("users-cards");


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


      if (
        !Array.isArray(users) ||
        users.length === 0
      ) {

        usersTrack.textContent =
          "Нет пользователей";

        return;

      }


      // Берём максимум 4 последних пользователя

      users
        .slice(0, 4)
        .forEach(user => {

          // =========================
          // КАРТОЧКА
          // =========================

          const card =
            document.createElement("div");

          card.className = "user-card";


          // =========================
          // АВАТАР
          // =========================

          const avatar =
            document.createElement("div");

          avatar.className =
            "user-card-avatar";

const usersTrack =
  document.getElementById("users-cards");


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

      if (
        !Array.isArray(users) ||
        users.length === 0
      ) {

        usersTrack.textContent =
          "Нет пользователей";

        return;
      }


      // Берём последние 4

      const lastUsers =
        users.slice(0, 4);


      lastUsers.forEach(user => {

        const card =
          document.createElement("div");

        card.classList.add(
          "user-card"
        );


        // =================================
        // АВАТАР
        // =================================

        const avatar =
          document.createElement("div");

        avatar.classList.add(
          "user-card-avatar"
        );


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


        // =================================
        // USERNAME
        // =================================

        const username =
          document.createElement("div");

        username.classList.add(
          "user-card-username"
        );


        username.textContent =
          `@${user.username}`;


        card.appendChild(username);


        // =================================
        // ИМЯ
        // =================================

        if (
          typeof user.display_name === "string" &&
          user.display_name.trim() !== ""
        ) {

          const name =
            document.createElement("div");

          name.classList.add(
            "user-card-name"
          );


          name.textContent =
            user.display_name.trim();


          card.appendChild(name);

        }


        // =================================
        // ПЕРЕХОД В ПРОФИЛЬ
        // =================================

        card.addEventListener(
          "click",
          () => {

            window.location.href =
              `/uun/${encodeURIComponent(user.username)}`;

          }
        );


        usersTrack.appendChild(card);

      });


      initUsersCarousel();

    })

    .catch(error => {

      console.error(error);

      usersTrack.textContent =
        "Ошибка загрузки пользователей";

    });

}


// =======================================
// 🎠 КАРУСЕЛЬ
// =======================================

function initUsersCarousel() {

  const track =
    document.getElementById("users-cards");

  const cards =
    track.querySelectorAll(".user-card");

  const prevBtn =
    document.getElementById(
      "users-btn--prev"
    );

  const nextBtn =
    document.getElementById(
      "users-btn--next"
    );


  if (
    !cards.length ||
    !prevBtn ||
    !nextBtn
  ) {
    return;
  }


  let index = 0;


  function getCardStep() {

    if (!cards.length) {
      return 0;
    }


    const card =
      cards[0];


    const style =
      window.getComputedStyle(track);


    const gap =
      parseFloat(style.gap) || 0;


    return card.offsetWidth + gap;

  }


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


  function update() {

    const step =
      getCardStep();


    track.style.transform =
      `translateX(${-index * step}px)`;

  }


  function getMaxIndex() {

    const visibleCards =
      getVisibleCards();


    return Math.max(
      0,
      cards.length - visibleCards
    );

  }


  nextBtn.addEventListener(
    "click",
    () => {

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
  );


  prevBtn.addEventListener(
    "click",
    () => {

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
  );


  // Автопрокрутка

  setInterval(() => {

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

  }, 4000);


  // Пересчитать при изменении ширины

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

}
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


          // =========================
          // USERNAME
          // =========================

          const username =
            document.createElement("div");

          username.className =
            "user-card-username";


          username.textContent =
            `@${user.username}`;


          card.appendChild(username);


          // =========================
          // ИМЯ
          // =========================

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


          // =========================
          // ПЕРЕХОД В ПРОФИЛЬ
          // =========================

          card.addEventListener(
            "click",
            () => {

              window.location.href =
                `/uun/${encodeURIComponent(
                  user.username
                )}`;

            }
          );


          usersTrack.appendChild(card);

        });


      initUsersCarousel();

    })

    .catch(error => {

      console.error(error);

      usersTrack.textContent =
        "Ошибка загрузки пользователей";

    });

}