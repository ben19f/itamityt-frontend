<?php include 'header.php'; ?>  
  <div class="container">
    <div class="topbar">
      <h2>Мои ссылки</h2>
      <button id="logoutBtn">Выйти</button>
      <button id="deleteAccountBtn" style="margin-left:10px; color:red;">Удалить аккаунт</button>
    </div>

    <hr>

    <h3>Список ссылок</h3>
    <ul id="itemsList"></ul>

    <hr>

    <h3>Добавить ссылку</h3>
    <form id="addItemForm">
      <input type="text" name="name" placeholder="Название" required>
      <input type="url" name="description" placeholder="https://example.com">
      <button type="submit">Добавить</button>
    </form>

    <p id="message"></p>
  </div>
 <?php include 'footer.php'; ?>
