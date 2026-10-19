<?php

$page_title = 'И там и тут — Главная';
$page_description = 'Создайте свою страницу со ссылками, информацией и фотографиями. Одна ссылка вместо множества.';

include 'header.php';
include 'menu.php';

?>

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

      <div class="example-profile-avatar-block" id="example-profile-avatar-block" hidden>
        <div class="example-profile-avatar">
          <img
            id="example-profile-avatar"
            hidden
            src="/images/test-avatar.png"
            alt="Музей костей"
          >
        </div>
      </div>

      <div class="example-profile-name-block">
        <h3 class="example-profile-name" id="example-profile-name">
          Музей костей
        </h3>
      </div>

      <div class="example-profile-username" id="example-profile-username">
        @muzej_kostej
      </div>

      <div class="example-profile-verification" id="example-profile-verification" hidden>

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

      <div class="example-profile-gallery" id="example-profile-gallery" hidden></div>

      <div class="example-profile-description" id="example-profile-description" hidden>
      </div>

      <div class="example-profile-links" id="example-profile-links">
        <a class="example-profile-link" href="/uun/muzej_kostej">Открыть профиль</a>
      </div>

      <a
        class="btn-secondary example-profile-share"
        href="/uun/muzej_kostej"
      >
        Открыть профиль
      </a>

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
  >
    →
  </button>

</div>

<p id="users-message"></p>
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
<script src="/js/example_profile.js"></script>
<script src="/js/main.js"></script>

</body>
</html>
