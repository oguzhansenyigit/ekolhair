<?php
declare(strict_types=1);
require_once __DIR__ . '/functions.php';
$s = site();
$page_title = $page_title ?? $s['name'];
$page_description = $page_description ?? ($s['tagline'] . ' — Bahçelievler, Bağcılar, Güngören protez saç.');
$canonical = $canonical ?? absolute_url(current_path());
$body_class = $body_class ?? '';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($page_title) ?></title>
  <meta name="description" content="<?= e($page_description) ?>">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <meta name="geo.region" content="<?= e($s['geo']['region']) ?>">
  <meta name="geo.placename" content="Bahçelievler, İstanbul">
  <meta name="geo.position" content="<?= e($s['geo']['lat']) ?>;<?= e($s['geo']['lng']) ?>">
  <meta name="ICBM" content="<?= e($s['geo']['lat']) ?>, <?= e($s['geo']['lng']) ?>">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="<?= e($s['name']) ?>">
  <meta property="og:title" content="<?= e($page_title) ?>">
  <meta property="og:description" content="<?= e($page_description) ?>">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css?v=1">
</head>
<body class="<?= e($body_class) ?>">
<header class="site-header" id="site-header">
  <a class="brand" href="/">
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="34" height="34" fill="none"><circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="2"/><path d="M20 38c4-10 8-16 12-18 4 2 8 8 12 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M24 28c3-1 6-1 8 0M32 27c3 1 6 2 8 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18 42h28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M28 42v6M36 42v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </span>
    <span class="brand-text"><?= e($s['name']) ?></span>
  </a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menü">
    <span></span><span></span><span></span>
  </button>
  <nav class="site-nav" id="site-nav" aria-label="Ana menü">
    <a href="/" <?= is_active('/') ? 'class="is-active"' : '' ?>>Ana Sayfa</a>
    <a href="/before-after" <?= is_active('/before-after') ? 'class="is-active"' : '' ?>>Before After</a>
    <a href="/hizmetler" <?= is_active('/hizmetler') ? 'class="is-active"' : '' ?>>Hizmetler</a>
    <a href="/blog" <?= is_active('/blog') ? 'class="is-active"' : '' ?>>Blog</a>
    <a href="/ilce/bahcelievler">Bahçelievler</a>
    <a class="nav-cta" href="/iletisim">Randevu</a>
  </nav>
</header>
<main>
