<?php include 'header.php'; ?>  
<?php include 'menu.php'; ?> 

<div class="container dashboard">

  <!-- 🔝 Верх -->
  <div class="dashboard-top">
    <h1>Мой профиль</h1>

    <div class="dashboard-actions">
      <button id="logoutBtn" class="btn-secondary">Выйти</button>
      <button id="deleteAccountBtn" class="btn-danger">Удалить аккаунт</button>
    </div>
  </div>


  <!-- 👤 Профиль -->
  <section class="dashboard-section">
    <h2>Профиль</h2>

    <div class="profile-editor">

      <!-- Аватар -->
      <div class="avatar-section">

        <div class="avatar-wrapper">
          <img
            id="avatarPreview"
            class="avatar-preview"
            src="/images/default-avatar.png"
            alt="Аватар"
          >
        </div>

        <div class="avatar-actions">
          <input
            type="file"
            id="avatarInput"
            accept="image/jpeg,image/png,image/webp"
            hidden
          >

          <button
            type="button"
            id="chooseAvatarBtn"
            class="btn-secondary"
          >
            Выбрать аватар
          </button>

          <button
            type="button"
            id="deleteAvatarBtn"
            class="btn-danger"
          >
            Удалить
          </button>
        </div>

      </div>


      <!-- Данные профиля -->
      <form id="profileForm" class="profile-form">

        <label>
          Отображаемое имя
          <input
            type="text"
            id="displayName"
            name="display_name"
            placeholder="Например: Музей костей"
          >
        </label>

        <label>
          Описание
          <textarea
            id="profileDescription"
            name="profile_description"
            placeholder="Расскажите о себе или организации"
          ></textarea>
        </label>

        <label>
          Дополнительная информация
          <textarea
            id="profileExtraInfo"
            name="profile_extra_info"
            placeholder="Дополнительная информация"
          ></textarea>
        </label>

        <button
          type="submit"
          class="btn-primary"
        >
          Сохранить профиль
        </button>

      </form>

    </div>
  </section>

  <!-- 🔐 Безопасность аккаунта -->
  <section class="dashboard-section account-security">
    <h2>Безопасность аккаунта</h2>

    <div class="account-settings-grid">
      <div class="account-setting-card">
        <h3>Изменить пароль</h3>
        <p class="section-description">Подтвердите текущий пароль и задайте новый.</p>
        <form id="passwordForm" class="account-setting-form">
          <label>
            Текущий пароль
            <input type="password" name="current_password" autocomplete="current-password" required>
          </label>
          <label>
            Новый пароль
            <input type="password" name="new_password" autocomplete="new-password" minlength="6" required>
          </label>
          <label>
            Повторите новый пароль
            <input type="password" name="confirm_password" autocomplete="new-password" minlength="6" required>
          </label>
          <button type="submit" class="btn-primary">Изменить пароль</button>
          <p id="passwordMessage" class="form-message" role="status" aria-live="polite"></p>
        </form>
      </div>

      <div class="account-setting-card">
        <h3>Изменить почту</h3>
        <p class="section-description">Текущий адрес: <strong id="currentEmail">Загрузка…</strong></p>
        <p class="section-description">На новый адрес придёт ссылка для подтверждения изменений.</p>
        <form id="emailForm" class="account-setting-form">
          <label>
            Новый адрес почты
            <input type="email" name="new_email" autocomplete="email" required>
          </label>
          <label>
            Текущий пароль
            <input type="password" name="current_password" autocomplete="current-password" required>
          </label>
          <button type="submit" class="btn-primary">Изменить почту</button>
          <p id="emailMessage" class="form-message" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>


  <!-- 🖼 Фотографии -->
  <section class="dashboard-section">

    <h2>Фотографии</h2>

    <p class="section-description">
      Можно загрузить до 5 фотографий.
    </p>

    <div id="photosGrid" class="photos-grid"></div>

    <div class="photo-upload">

      <input
        type="file"
        id="photoInput"
        accept="image/jpeg,image/png,image/webp"
        hidden
        multiple
      >

      <button
        type="button"
        id="choosePhotoBtn"
        class="btn-primary"
      >
        Добавить фотографии
      </button>

    </div>

  </section>


  <!-- 🔗 Ссылки -->
  <section class="dashboard-section">
    <h2>Список ссылок</h2>

    <div id="itemsList" class="links-grid"></div>
  </section>


  <!-- ➕ Добавление ссылки -->
  <section class="dashboard-section">
    <h2>Добавить ссылку</h2>

    <form id="addItemForm" class="add-form">

      <input
        type="text"
        name="name"
        placeholder="Название (например: Telegram)"
        required
      >

      <input
        type="url"
        name="description"
        placeholder="https://example.com"
      >

      <button
        type="submit"
        class="btn-primary"
      >
        Добавить
      </button>

    </form>
  </section>


  <p id="message" class="form-message"></p>

</div>

<?php include 'footer.php'; ?>

<script src="/js/config.js"></script>
<script src="/js/profile.js"></script>
<script src="/js/main.js"></script>

</body>
</html>
