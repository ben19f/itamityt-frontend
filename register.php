<?php include 'header.php'; ?>  
<?php include 'menu.php'; ?> 

<div class="container auth-page">

  <div class="auth-card">
    <h1>Создать аккаунт</h1>
    <p class="auth-subtitle">Собери все свои ссылки в одном месте</p>

    <form id="registerForm" class="auth-form">

      <input 
        type="text" 
        name="username" 
        placeholder="Имя пользователя (@username)" 
        required 
      />

      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        required 
      />

      <input 
        type="password" 
        name="password" 
        placeholder="Пароль (минимум 6 символов)" 
        required 
      />

      <button type="submit" class="btn-primary">Зарегистрироваться</button>

    </form>

    <p id="message" class="form-message"></p>

    <p class="auth-footer">
      Уже есть аккаунт? <a href="/login.php">Войти</a>
    </p>
  </div>

</div>

<?php include 'footer.php'; ?>

<script src="/js/register.js"></script>
</body>
</html>