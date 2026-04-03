
    
<?php include 'header.php'; ?> 
<?php include 'menu.php'; ?>    
    

<main>

  <!-- 🔥 HERO -->
  <section class="section hero">
    <div class="container">
      <h1 class="title">Создай свою страницу ссылок за 1 минуту</h1>
      <p class="text">Все твои Telegram, VK, GitHub и сайты — в одном месте</p>

      <a href="/register.php" class="button">Создать страницу</a>
    </div>
  </section>

  <!-- 🔍 ПОИСК -->
  <section class="section">
    <div class="container">
      <h2 class="title">Найти пользователя</h2>

      <div class="card search-block">
        <input class="input" type="text" id="search-username" placeholder="@username">
        <button class="button" id="search-btn">Найти</button>

        <p id="message"></p>
        <div id="search-result"></div>
      </div>
    </div>
  </section>

  <!-- 🧪 ПРИМЕР -->
  <section class="section">
    <div class="container">
      <h2 class="title">Как выглядит страница</h2>

      <div class="card example-card">
        <h3>@Aristokrat_rest</h3>
        <a href="#" class="button">🍽 Сайт ресторана</a>
        <a href="#" class="button">📱 Telegram</a>
        <a href="#" class="button">📍 ВКонтакте</a>
        <a href="#" class="button">📖 Меню</a>
      </div>
    </div>
  </section>

  <!-- ⭐️ ПРЕИМУЩЕСТВА -->
  <section class="section">
    <div class="container">
      <h2 class="title">Почему это удобно</h2>

      <div class="grid advantages-grid">
        <div class="card">✔️ Все ссылки в одном месте</div>
        <div class="card">✔️ Быстрое создание страницы</div>
        <div class="card">✔️ Удобно для соцсетей</div>
        <div class="card">✔️ Бесплатно</div>
      </div>
    </div>
  </section>

  <!-- 👥 ПОЛЬЗОВАТЕЛИ -->
  <section class="section">
    <div class="container">
      <h2 class="title">Новые пользователи</h2>

      <div class="carousel">
        <button class="button" id="users-btn--prev">←</button>

        <div class="carousel-window">
          <div class="carousel-cards" id="users-cards"></div>
        </div>

        <button class="button" id="users-btn--next">→</button>
      </div>
    </div>
  </section>

  <!-- 🚀 CTA -->
  <section class="section cta">
    <div class="container">
      <h2 class="title">Создай свою страницу прямо сейчас</h2>
      <a href="/register.php" class="button">Зарегистрироваться</a>
    </div>
  </section>


 <?php include 'footer.php'; ?>
   <script src="/js/main.js"></script>
 

</body>
</html>