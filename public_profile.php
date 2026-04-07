<?php include 'header.php'; ?>  

<div class="container profile-page">

  <!-- 👤 ШАПКА ПРОФИЛЯ -->
  <div class="profile-header-block">
    <h1 id="profile-title">@username</h1>
    <p class="profile-subtitle">Все ссылки пользователя в одном месте</p>

    <button id="copy-profile-link" class="btn-secondary">
      Скопировать ссылку
    </button>
  </div>


  <!-- 🔗 ССЫЛКИ -->
  <div class="profile-links" id="links-container">
    <!-- ссылки будут тут -->
  </div>

  <!-- 📭 СООБЩЕНИЯ -->
  <p id="message"></p>

</div>

<?php include 'footer.php'; ?>

<script src="/js/public_profile.js"></script>
<script src="/js/main.js"></script>
</body>
</html>