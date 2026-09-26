<?php include 'header.php'; ?> 
<?php include 'menu.php'; ?>    

<main>

  <!-- =========================================
       HERO
       ========================================= -->

  <section class="section hero">
    <div class="container">

      <h1 class="title">
        Создай свою страницу в интернете
      </h1>

      <p class="text">
        Все важные ссылки, информация о тебе или организации —
        в одном месте
      </p>

      <a href="/register.php" class="button">
        Создать страницу
      </a>

    </div>
  </section>


  <!-- =========================================
       ПОИСК
       ========================================= -->

  <section class="section">
    <div class="container">

      <h2 class="title">
        Найти пользователя
      </h2>

      <div class="card search-block">

        <input
          class="input"
          type="text"
          id="search-username"
          placeholder="@username"
          autocomplete="off"
        >

        <button
          class="button"
          id="search-btn"
          type="button"
        >
          Найти
        </button>

        <p id="message"></p>

      </div>

    </div>
  </section>


  <!-- =========================================
       ПРИМЕР СТРАНИЦЫ
       ========================================= -->

  <section class="section">
    <div class="container">

      <h2 class="title">
        Как выглядит страница
      </h2>

      <div class="example-profile">

        <!-- АВАТАР -->

        <div class="example-profile-avatar-block">

          <div class="example-profile-avatar">
            <img
              src="/images/test-avatar.png"
              alt="Выставка «Музей костей»"
            >
          </div>

        </div>


        <!-- ИМЯ -->

        <div class="example-profile-name-block">

          <h3 class="example-profile-name">
            Выставка «Музей костей»
          </h3>

        </div>


        <!-- USERNAME -->

        <div class="example-profile-username">
          @muzej_kostej
        </div>


        <!-- ВЕРИФИКАЦИЯ -->

        <div class="example-profile-verification">

          <div class="example-verify-item">
            <span class="example-verify-status example-verify-yes">
              ✓
            </span>

            <span>
              Проверено пользователем
            </span>
          </div>

          <div class="example-verify-item">
            <span class="example-verify-status example-verify-yes">
              ✓
            </span>

            <span>
              Проверено сервисом itamityt.ru
            </span>
          </div>

        </div>


        <!-- ГАЛЕРЕЯ -->

        <div class="example-profile-gallery">

          <div class="example-photo">
            <img
              src="/images/test-avatar.png"
              alt=""
            >
          </div>

          <div class="example-photo">
            <img
              src="/images/test-avatar.png"
              alt=""
            >
          </div>

          <div class="example-photo">
            <img
              src="/images/test-avatar.png"
              alt=""
            >
          </div>

        </div>


        <!-- ОПИСАНИЕ -->

        <div class="example-profile-description">

          Просветительская выставка анатомических
          скелетов и других природных объектов.

        </div>


        <!-- ССЫЛКИ -->

        <div class="example-profile-links">

          <div class="example-profile-link">
            Сайт выставки
          </div>

          <div class="example-profile-link">
            ВКонтакте
          </div>

          <div class="example-profile-link">
            Яндекс Карты
          </div>

        </div>


        <!-- ПОДЕЛИТЬСЯ -->

        <button
          class="btn-secondary example-profile-share"
          type="button"
        >
          Поделиться профилем
        </button>

      </div>

    </div>
  </section>


  <!-- =========================================
       ПРЕИМУЩЕСТВА
       ========================================= -->

  <section class="section">
    <div class="container">

      <h2 class="title">
        Почему это удобно
      </h2>

      <div class="grid advantages-grid">

        <div class="card">
          Все ссылки в одном месте
        </div>

        <div class="card">
          Быстрое создание страницы
        </div>

        <div class="card">
          Удобно для социальных сетей
        </div>

        <div class="card">
          Бесплатно
        </div>

      </div>

    </div>
  </section>


  <!-- =========================================
       НОВЫЕ ПОЛЬЗОВАТЕЛИ
       ========================================= -->

  <section class="section">
    <div class="container">

      <h2 class="title">
        Новые пользователи
      </h2>

      <div class="users-carousel">

        <button
          class="users-carousel-button"
          id="users-btn--prev"
          type="button"
          aria-label="Предыдущий пользователь"
        >
          ←
        </button>


        <div class="users-carousel-window">

          <div
            class="users-carousel-cards"
            id="users-cards"
          ></div>

        </div>


        <button
          class="users-carousel-button"
          id="users-btn--next"
          type="button"
          aria-label="Следующий пользователь"
        >
          →
        </button>

      </div>

    </div>
  </section>


  <!-- =========================================
       CTA
       ========================================= -->

  <section class="section cta">
    <div class="container">

      <h2 class="title">
        Создай свою страницу прямо сейчас
      </h2>

      <a
        href="/register.php"
        class="button"
      >
        Зарегистрироваться
      </a>

    </div>
  </section>


<?php include 'footer.php'; ?>

<script src="/js/config.js"></script>
<script src="/js/main.js"></script>

</body>
</html>