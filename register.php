<?php include 'header.php'; ?>  
<?php include 'menu.php'; ?> 
<div class="container">
    <h2>Регистрация</h2>
    <form id="registerForm">
      <input type="text" name="username" placeholder="Имя пользователя" required /><br/>
      <input type="email" name="email" placeholder="Email" required /><br/>
      <input type="password" name="password" placeholder="Пароль" required /><br/>
      <button type="submit">Зарегистрироваться</button>
    </form>
    <p id="message"></p>
  </div>
 <?php include 'footer.php'; ?>
  <script src="/js/register.js"></script>
 
</body>
</html>