<?php
// Значения по умолчанию
$page_title = $page_title ?? 'И там и тут';
$page_description = $page_description ?? 'И там и тут — персональные и организационные страницы со ссылками, информацией и фотографиями.';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title><?= htmlspecialchars($page_title) ?></title>

  <meta
    name="description"
    content="<?= htmlspecialchars($page_description) ?>"
  >

  <link rel="icon" href="images/favicon.ico" type="image/svg+xml">

  <link rel="stylesheet" href="/css/all.css">
</head>

<body>

<header class="header">
  <div class="container">
    <a href="/index.php">
      <img
        src="/images/logo.png"
        alt="И там и тут"
        class="logo"
      >
    </a>
  </div>

  <?php include __DIR__ . '/metrika.php'; ?>

</header>
