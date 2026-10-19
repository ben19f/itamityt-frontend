<?php
$page_title = 'Каталог — И там и тут';
$page_description = 'Каталог публичных страниц людей, организаций и бизнеса с фильтрами по местоположению и сфере деятельности.';

include 'header.php';
include 'menu.php';
?>

<main>
  <section class="section catalog-section">
    <div class="container">
      <h1 class="title">Каталог</h1>
      <p class="text">Найдите людей, организации и интересные места по расположению и сфере деятельности.</p>

      <form class="catalog-filters card" id="catalog-filters">
        <h2>Фильтры</h2>
        <div class="catalog-filter-grid">
          <label>Страна
            <input class="input" type="search" name="country" placeholder="Например, Россия" autocomplete="country-name">
          </label>
          <label>Область / край
            <input class="input" type="search" name="region" placeholder="Например, Краснодарский край">
          </label>
          <label>Город
            <input class="input" type="search" name="city" placeholder="Например, Сочи" autocomplete="address-level2">
          </label>
          <label>Тип страницы
            <select class="input" name="profile_type">
              <option value="">Любой тип</option>
              <option value="personal">Личный</option>
              <option value="organization">Организация</option>
            </select>
          </label>
          <label>Сфера
            <select class="input" name="category">
              <option value="">Любая сфера</option>
              <option value="food">Общепит</option>
              <option value="hotel">Отель</option>
              <option value="blogger">Блогер</option>
              <option value="museum">Музей / выставка</option>
              <option value="computer_club">Компьютерный клуб</option>
              <option value="medical">Медучреждение</option>
              <option value="other">Другой бизнес</option>
            </select>
          </label>
        </div>
        <div class="catalog-filter-actions">
          <button class="button" type="submit">Показать</button>
          <button class="catalog-reset" type="reset">Сбросить фильтры</button>
        </div>
      </form>

      <section class="catalog-results" aria-live="polite">
        <h2 class="catalog-results-title">Публичные страницы</h2>
        <p id="catalog-message" class="catalog-message">Загружаем каталог…</p>
        <div class="catalog-grid" id="catalog-results"></div>
        <div class="catalog-pagination" id="catalog-pagination" hidden>
          <button class="catalog-page-button" id="catalog-prev" type="button">Назад</button>
          <span id="catalog-page-status"></span>
          <button class="catalog-page-button" id="catalog-next" type="button">Далее</button>
        </div>
      </section>
    </div>
  </section>
</main>

<?php include 'footer.php'; ?>
<script src="/js/config.js"></script>
<script src="/js/catalog.js"></script>
</body>
</html>
