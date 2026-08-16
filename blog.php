<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';

$districtFilter = isset($_GET['ilce']) ? trim((string) $_GET['ilce']) : null;
$page = max(1, (int) ($_GET['page'] ?? 1));
$result = get_posts($page, 24, $districtFilter);
$priority = priority_districts();

$page_title = 'Protez Saç Blog | EKOL HAIR PROTEZ';
$page_description = 'Bahçelievler protez saç, Bağcılar ve Güngören başta olmak üzere İstanbul ilçeleri için protez saç rehberleri.';
$canonical = absolute_url('/blog');
require __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <h1>Protez Saç Blog</h1>
  <p>İstanbul’un 39 ilçesi için protez saç ve bakım rehberleri.</p>
</section>
<section class="section" style="padding-top:1rem">
  <div class="filters" aria-label="İlçe filtreleri">
    <a href="/blog" class="<?= $districtFilter ? '' : 'is-active' ?>">Tümü</a>
    <?php foreach ($priority as $d): ?>
      <a class="<?= $districtFilter === $d ? 'is-active' : '' ?>" href="/blog?ilce=<?= e(urlencode($d)) ?>"><?= e($d) ?></a>
    <?php endforeach; ?>
    <?php foreach (istanbul_districts() as $d): if (in_array($d, $priority, true)) continue; ?>
      <a class="<?= $districtFilter === $d ? 'is-active' : '' ?>" href="/blog?ilce=<?= e(urlencode($d)) ?>"><?= e($d) ?></a>
    <?php endforeach; ?>
  </div>

  <?php if (!$result['items']): ?>
    <div class="panel">
      <h3>Blog yazıları henüz yüklenmedi</h3>
      <p>phpMyAdmin’den <code>sql/schema.sql</code> ve <code>sql/seed_blogs.sql</code> dosyalarını import edin.</p>
    </div>
  <?php else: ?>
    <div class="blog-grid">
      <?php foreach ($result['items'] as $item): ?>
        <article class="blog-card panel">
          <span class="tag"><?= e($item['district']) ?></span>
          <h3><a href="/blog/<?= e($item['slug']) ?>"><?= e($item['title']) ?></a></h3>
          <p><?= e($item['excerpt']) ?></p>
          <a class="more" href="/blog/<?= e($item['slug']) ?>">Devamını oku →</a>
        </article>
      <?php endforeach; ?>
    </div>
    <?php if ($result['pages'] > 1): ?>
      <p style="margin-top:1.5rem;display:flex;gap:.5rem;flex-wrap:wrap">
        <?php for ($p = 1; $p <= min($result['pages'], 20); $p++): ?>
          <a class="btn btn-ghost" href="/blog?page=<?= $p ?><?= $districtFilter ? '&ilce=' . e(urlencode($districtFilter)) : '' ?>"><?= $p ?></a>
        <?php endfor; ?>
      </p>
    <?php endif; ?>
  <?php endif; ?>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
