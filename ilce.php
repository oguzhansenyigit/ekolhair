<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';

$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';
$district = $slug ? district_from_slug($slug) : null;
if (!$district) {
    http_response_code(404);
    $page_title = 'İlçe bulunamadı';
    require __DIR__ . '/includes/header.php';
    echo '<section class="page-hero"><h1>İlçe bulunamadı</h1></section>';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$result = get_posts(1, 24, $district);
$page_title = $district . ' Protez Saç | EKOL HAIR PROTEZ';
$page_description = $district . ' protez saç ve protez saç bakımı. Doğal uygulama, before-after ve randevu.';
$canonical = absolute_url('/ilce/' . slugify($district));
require __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <h1><?= e($district) ?> Protez Saç</h1>
  <p><?= e($district) ?> ve çevresi için doğal görünümlü protez saç uygulaması, bakım ve danışmanlık.</p>
</section>
<section class="section" style="padding-top:1rem">
  <div class="service-grid">
    <article class="panel"><h3><?= e($district) ?> protez saç</h3><p>Kişiye özel ölçü ve ön çizgi ile doğal sonuç.</p></article>
    <article class="panel"><h3><?= e($district) ?> protez saç bakımı</h3><p>Ömrü uzatan bakım ve yenileme protokolleri.</p></article>
    <article class="panel"><h3>Randevu</h3><p><a class="more" href="<?= e(wa_link($district . ' protez saç randevusu')) ?>">WhatsApp’tan yazın →</a></p></article>
  </div>

  <?php if ($result['items']): ?>
    <div class="section-head" style="margin-top:2.5rem">
      <h2><?= e($district) ?> rehber yazıları</h2>
    </div>
    <div class="blog-grid">
      <?php foreach ($result['items'] as $item): ?>
        <article class="blog-card panel">
          <span class="tag"><?= e($item['district']) ?></span>
          <h3><a href="/blog/<?= e($item['slug']) ?>"><?= e($item['title']) ?></a></h3>
          <p><?= e($item['excerpt']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
