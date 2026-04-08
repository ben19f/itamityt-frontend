<?php include 'header.php'; ?>  
<?php include 'menu.php'; ?> 

<div class="container auth-page">

  <div class="auth-card">
    <h1>Вход</h1>
    <p class="auth-subtitle">Войдите, чтобы управлять своими ссылками</p>

    <form id="loginForm" class="auth-form">

      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        required
      >

      <input 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        required
      >

      <button type="submit" class="btn-primary">Войти</button>

    </form>

    <p id="message" class="form-message"></p>

    <p class="auth-footer">
      Нет аккаунта? <a href="/register.php">Зарегистрироваться</a>
    </p>
  </div>

</div>

<?php include 'footer.php'; ?>

<script src="/js/login.js"></script>
</body>
</html>