<?php include 'header.php'; ?>

<div class="container profile-page">

  <div class="profile-content">

    <!-- АВАТАР -->
    <div class="profile-block profile-avatar-block">
      <div class="profile-avatar">
        <img
          id="profile-avatar"
          src="/images/test-avatar.png"
          alt="Аватар пользователя"
        >
      </div>
    </div>


    <!-- ИМЯ -->
    <div
      id="profile-name-block"
      class="profile-block profile-name-block"
      hidden
    >
      <h1 id="profile-name" class="profile-name"></h1>
    </div>


    <!-- USERNAME -->
    <div class="profile-block profile-username-block">
      <div id="profile-title" class="profile-username"></div>
    </div>


    <!-- ВЕРИФИКАЦИЯ -->
    <div
      id="profile-verification-block"
      class="profile-block profile-verification-block"
      hidden
    >
      <div class="verify-status">

        <div
          id="owner-verify"
          class="verify-item owner-verify"
          hidden
        >
          <span
            id="owner-verify-status"
            class="owner-verify-status"
          ></span>

          <span id="owner-verify-text"></span>
        </div>


        <div
          id="service-verify"
          class="verify-item service-verify"
          hidden
        >
          <span
            id="service-verify-status"
            class="service-verify-status"
          ></span>

          <span id="service-verify-text"></span>
        </div>

      </div>
    </div>


    <!-- ГАЛЕРЕЯ -->
    <div
      id="profile-gallery-block"
      class="profile-block profile-gallery-block"
      hidden
    >
      <div
        id="profile-gallery"
        class="user-gallery"
      ></div>
    </div>


    <!-- ОПИСАНИЕ -->
    <div
      id="profile-description-block"
      class="profile-block profile-description-block"
      hidden
    >
      <p
        id="profile-description"
        class="profile-description"
      ></p>
    </div>


    <!-- ССЫЛКИ -->
    <div
      id="profile-links-block"
      class="profile-block profile-links-block"
      hidden
    >
      <div
        id="links-container"
        class="profile-links"
      ></div>
    </div>


    <!-- ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
    <div
      id="profile-extra-block"
      class="profile-block profile-extra-block"
      hidden
    >
      <div
        id="profile-extra"
        class="profile-extra"
      ></div>
    </div>


    <!-- ПОДЕЛИТЬСЯ -->
    <div class="profile-block profile-share-block">

      <button
        id="copy-profile-link"
        class="btn-secondary"
        type="button"
      >
        Поделиться профилем
      </button>

    </div>

  </div>


  <!-- СООБЩЕНИЯ -->
  <p id="message"></p>

</div>


<?php include 'footer.php'; ?>


<script src="/js/config.js"></script>
<script src="/js/public_profile.js"></script>
<script src="/js/main.js"></script>

</body>
</html>