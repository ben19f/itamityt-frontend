<?php include 'header.php'; ?>  

<div class="container profile-page">

  <!-- 👤 ШАПКА ПРОФИЛЯ -->
  <div class="profile-header-block">

    <!-- АВАТАР -->
    <div class="profile-avatar">
      <img
        id="profile-avatar"
        src="/images/test-avatar.png"
        alt="Аватар пользователя"
      >
    </div>

    <!-- ИМЯ -->
    <h1 id="profile-name" class="profile-name" >Имя пользователя</h1>

    <!-- USERNAME -->
    <div id="profile-title" class="profile-username">
      @username
    </div>

    <!-- статусы верификации аккаунта -->
    <div class="verify-status">
      <div class="owner-verify"><span class="owner-verify-status">Х        </span><span>Не проверено пользователем</span></div>
      <div class="service-verify"><span class="service-verify-status">Y      </span><span>Проверено сервисом itamityt.ru</span></div>
    </div>


    <div class="user-gallery">
      <div class="user-photo-card user-photo-2">photo 1</div>
      <div class="user-photo-card user-photo-2">photo 2</div>
      <div class="user-photo-card user-photo-3">photo 3</div>
    </div>
    

    <!-- КОРОТКОЕ ОПИСАНИЕ -->
    <p id="profile-description" class="profile-description">
      Здесь будет описание страницы пользователя.
    </p>

    <!-- КНОПКА -->
    <button id="copy-profile-link" class="btn-secondary">
      поделится профилем (Скопировать ссылку)
    </button>

  </div>


  <!-- 🔗 ССЫЛКИ -->
  <div class="profile-links" id="links-container">
    <!-- ссылки будут тут -->
  </div>


  <!-- 📌 ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
  <div id="profile-extra" class="profile-extra">
    <!--
      Например:

      Адрес:
      г. Казань, ул. ...

      Время работы:
      Пн–Пт: 10:00–20:00
      Сб–Вс: 11:00–18:00

      Телефон:
      +7 ...
    -->
  </div>


  <!-- 📭 СООБЩЕНИЯ -->
  <p id="message"></p>

</div>

<?php include 'footer.php'; ?>

<script src="/js/config.js"></script>
<script src="/js/public_profile.js"></script>
<script src="/js/main.js"></script>
</body>
</html>