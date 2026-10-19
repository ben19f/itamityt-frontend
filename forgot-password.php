<?php
$page_title = 'Сброс пароля — И там и тут';
$page_description = 'Запросите ссылку для сброса пароля по электронной почте.';
include 'header.php';
include 'menu.php';
?>

<main class="container auth-page">
  <section class="auth-card">
    <h1>Забыли пароль?</h1>
    <p class="auth-subtitle">Укажите подтверждённый адрес почты. Мы отправим ссылку для сброса пароля.</p>

    <form id="forgotPasswordForm" class="auth-form">
      <input type="email" name="email" placeholder="Email" autocomplete="email" required>
      <button type="submit" class="btn-primary">Отправить ссылку</button>
    </form>

    <p id="forgotPasswordMessage" class="form-message" role="status" aria-live="polite"></p>
    <p class="auth-footer"><a href="/login.php">Вернуться ко входу</a></p>
  </section>
</main>

<?php include 'footer.php'; ?>
<script src="/js/config.js"></script>
<script src="/js/forgot-password.js"></script>
</body>
</html>
