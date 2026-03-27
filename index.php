
    
<?php include 'header.php'; ?>    
    <section class="container">
      <div>
        <p>Добро пожаловать! Это сервис для публикации и поиска ссылок.</p>
        <p>Введите username, чтобы посмотреть профиль, или зарегистрируйте свой.</p>
        <input type="text" id="search-username" placeholder="Введите username">
        <button id="search-btn">Искать</button>
        <p id="message"></p>
      </div>
      <div id="search-result"></div>
    </section>

    <section class="container section_user-template">
      <h2>Новая компания</h2>
      <div class="card">
        <h3>Пример компании</h3>
        <a href="#">Ссылка 1</a>
        <a href="#">Ссылка 2</a>
      </div>
    </section>

    <section class="container section_last-users">
      <h2>Последние зарегистрированные пользователи</h2>
      <div id="last-users-container"></div>
    </section>
 <?php include 'footer.php'; ?>
