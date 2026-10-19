<?php
$page_title = 'Новый пароль — И там и тут';
$page_description = 'Задайте новый пароль для своего аккаунта.';
include 'header.php';
include 'menu.php';
?>

<main class="container auth-page">
  <section class="auth-card">
    <h1>Сброс пароля</h1>
    <p class="auth-subtitle">Введите новый пароль для своего аккаунта.</p>

    <form id="resetPasswordForm" class="auth-form">
      <label>
        Новый пароль
        <input type="password" name="new_password" autocomplete="new-password" minlength="6" required>
      </label>
      <label>
        Повторите пароль
        <input type="password" name="confirm_password" autocomplete="new-password" minlength="6" required>
      </label>
      <button type="submit" class="btn-primary">Сохранить новый пароль</button>
    </form>

    <p id="resetPasswordMessage" class="form-message" role="status" aria-live="polite"></p>
    <p class="auth-footer"><a href="/login.php">Перейти ко входу</a></p>
  </section>
</main>

<?php include 'footer.php'; ?>
<script src="/js/config.js"></script>
<script src="/js/reset-password.js"></script>
</body>
</html>
