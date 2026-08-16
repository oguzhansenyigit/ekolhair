<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';

$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';
$post = $slug ? get_post_by_slug($slug) : null;
if (!$post) {
    http_response_code(404);
    $page_title = 'Yazı bulunamadı | EKOL HAIR PROTEZ';
    require __DIR__ . '/includes/header.php';
    echo '<section class="page-hero"><h1>Yazı bulunamadı</h1><p><a href="/blog">Bloga dön</a></p></section>';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$related = get_related_posts($post['district'], (int) $post['id']);
$page_title = $post['meta_title'];
$page_description = $post['meta_description'];
$canonical = absolute_url('/blog/' . $post['slug']);
$published = date('c', strtotime((string) $post['published_at']));

require __DIR__ . '/includes/header.php';
?>
<script type="application/ld+json"><?= json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'BlogPosting',
    'headline' => $post['title'],
    'description' => $post['meta_description'],
    'datePublished' => $published,
    'dateModified' => date('c', strtotime((string) $post['updated_at'])),
    'mainEntityOfPage' => $canonical,
    'author' => ['@type' => 'Organization', 'name' => site()['name']],
    'keywords' => $post['focus_keyword'],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>

<article class="section prose" style="padding-top:calc(var(--header-h) + 2rem)">
  <p class="meta-line">
    <a href="/blog">Blog</a> ·
    <a href="/ilce/<?= e(slugify($post['district'])) ?>"><?= e($post['district']) ?></a> ·
    <time datetime="<?= e(substr($published, 0, 10)) ?>"><?= e(date('d.m.Y', strtotime((string) $post['published_at']))) ?></time>
  </p>
  <h1><?= e($post['title']) ?></h1>
  <p><strong>Odak kelime:</strong> <?= e($post['focus_keyword']) ?></p>
  <div class="article-body"><?= $post['content'] ?></div>
</article>

<?php if ($related): ?>
<section class="section">
  <div class="section-head">
    <h2><?= e($post['district']) ?> ilgili yazılar</h2>
  </div>
  <div class="blog-grid">
    <?php foreach ($related as $item): ?>
      <article class="blog-card panel">
        <span class="tag"><?= e($item['district']) ?></span>
        <h3><a href="/blog/<?= e($item['slug']) ?>"><?= e($item['title']) ?></a></h3>
        <p><?= e($item['excerpt']) ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>

<div class="cta-band">
  <div>
    <h2><?= e($post['district']) ?> randevu</h2>
    <p>Ücretsiz danışmanlık için hemen yazın.</p>
  </div>
  <a class="btn btn-primary" href="/iletisim">İletişim</a>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>
