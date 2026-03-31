
    
<?php include 'header.php'; ?> 
<?php include 'menu.php'; ?>    
    

  <!-- 🔥 HERO -->
  <section class="container hero">
    <h1>Создай свою страницу ссылок за 1 минуту</h1>
    <p class="hero-text">Все твои Telegram, VK, GitHub и сайты — в одном месте</p>

    <div class="hero-buttons">
      <a href="/register.php" class="btn-primary">Создать страницу</a>
    </div>
  </section>


  <!-- 🔍 ПОИСК -->
  <section class="container search-section">
    <h2>Найти пользователя</h2>

    <input class="user-search" type="text" id="search-username" placeholder="@username">
    <button id="search-btn">Найти</button>

    <p id="message"></p>
    <div id="search-result"></div>
  </section>


  <!-- 🧪 ПРИМЕР -->
  <section class="container section_user-template" id="example">
    <h2>Как выглядит страница</h2>

    <div class="card example-card">
      <h3>@Aristokrat_rest</h3>
      <a href="#">🍽 Сайт ресторана</a>
      <a href="#">📱 Telegram</a>
      <a href="#">📍 ВКонтакте</a>
      <a href="#">📖 Меню</a>
    </div>
  </section>


  <!-- ⭐️ ПРЕИМУЩЕСТВА -->
  <section class="container advantages">
    <h2>Почему это удобно</h2>

    <div class="advantages-list">
      <div class="adv-item">✔️ Все ссылки в одном месте</div>
      <div class="adv-item">✔️ Быстрое создание страницы</div>
      <div class="adv-item">✔️ Удобно для соцсетей и визиток</div>
      <div class="adv-item">✔️ Бесплатно</div>
    </div>
  </section>


  <!-- 👥 ПОЛЬЗОВАТЕЛИ -->
  <section class="container section_last-users">
    <h2 class="last-users_header">Новые пользователи</h2>

    <div class="carousel-block">
      <button class="portfolio-carousel-btn" id="users-btn--prev">←</button>

      <div class="portfolio-carousel__window">
        <div class="portfolio-carousel__cards" id="users-cards"></div>
      </div>

      <button class="portfolio-carousel-btn" id="users-btn--next">→</button>
    </div>
  </section>


  <!-- 🚀 CTA -->
  <section class="container cta">
    <h2 class="cta-header">Создай свою страницу прямо сейчас</h2>
    <a href="/register.php" class="btn-primary">Зарегистрироваться</a>
  </section>

</main>
 <?php include 'footer.php'; ?>
   <script src="/js/main.js"></script>
 

