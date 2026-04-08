<?php include 'header.php'; ?>  
<?php include 'menu.php'; ?> 

<div class="container dashboard">

  <!-- 🔝 Верх -->
  <div class="dashboard-top">
    <h1>Мои ссылки</h1>

    <div class="dashboard-actions">
      <button id="logoutBtn" class="btn-secondary">Выйти</button>
      <button id="deleteAccountBtn" class="btn-danger">Удалить аккаунт</button>
    </div>
  </div>

  <!-- 🔗 Ссылки -->
  <section class="dashboard-section">
    <h2>Список ссылок</h2>

    <div id="itemsList" class="links-grid"></div>
  </section>

  <!-- ➕ Добавление -->
  <section class="dashboard-section">
    <h2>Добавить ссылку</h2>

    <form id="addItemForm" class="add-form">
      <input type="text" name="name" placeholder="Название (например: Telegram)" required>
      <input type="url" name="description" placeholder="https://example.com">
      <button type="submit" class="btn-primary">Добавить</button>
    </form>
  </section>

  <p id="message" class="form-message"></p>

</div>

<?php include 'footer.php'; ?>

<script src="/js/profile.js"></script>
<script src="/js/main.js"></script>
</body>
</html>