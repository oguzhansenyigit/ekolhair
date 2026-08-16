<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';

$page_title = 'EKOL HAIR PROTEZ | Bahçelievler Protez Saç & Bakım';
$page_description = 'Bahçelievler protez saç, Bağcılar ve Güngören protez saç bakımı. Doğal görünümlü uygulamalar, before-after sonuçları.';
$canonical = absolute_url('/');
$body_class = 'page-home';
$cases = before_after_cases();

require __DIR__ . '/includes/header.php';
?>
<section class="hero-video" aria-label="Protez saç hero videosu">
  <video class="hero-video__media" autoplay muted loop playsinline preload="metadata" poster="/assets/images/before-after/1/musteri1-01.jpg">
    <source src="/assets/videos/herovideo.mp4" type="video/mp4">
  </video>
  <div class="hero-video__overlay" aria-hidden="true"></div>
  <div class="hero-video__content">
    <p class="hero-kicker">OUTLET FIRSAT &amp; PROFESYONEL UYGULAMA</p>
    <h1 class="hero-title">ERKEK PROTEZ SAÇ</h1>
    <p class="hero-sub">İnanılmaz bir doğal dönüşüme şahit olun..</p>
    <div class="hero-actions">
      <a class="btn btn-ghost" href="/before-after">İNCELE</a>
      <a class="btn btn-primary" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener noreferrer">RANDEVU</a>
    </div>
  </div>
</section>

<div class="seo-strip" aria-label="Öne çıkan hizmetler">
  <a href="/before-after">Before After sonuçları</a>
  <a href="/hizmetler">Protez saç uygulaması</a>
  <a href="/hizmetler">Protez saç bakımı</a>
  <a href="/blog">Uzman rehberler</a>
  <a href="/iletisim">Ücretsiz danışmanlık</a>
</div>

<section class="section">
  <div class="section-head">
    <h2>Before After Sonuçları</h2>
    <p>Gerçek müşteri uygulamaları. Kaydırarak öncesi → sonrası ilerleyin.</p>
  </div>
  <div class="ba-grid">
    <?php foreach ($cases as $case): ?>
      <div class="ba-slider" data-ba-slider data-images='<?= e(json_encode($case['images'], JSON_UNESCAPED_SLASHES)) ?>'>
        <img src="<?= e($case['before']) ?>" alt="<?= e($case['title']) ?> before after" width="600" height="800">
        <span class="hint">Öncesi · kaydır</span>
      </div>
    <?php endforeach; ?>
  </div>
  <p style="margin-top:1.5rem">
    <a class="btn btn-ghost" href="/before-after">Tüm galeriyi aç</a>
  </p>
</section>

<section class="section" style="padding-top:0">
  <div class="section-head">
    <h2>Uygulama Videosu</h2>
    <p>Protez saç uygulama sürecinden kısa bir kesit.</p>
  </div>
  <div class="video-block">
    <video controls preload="metadata" poster="/assets/images/before-after/2/musteri2-01.jpg">
      <source src="/assets/videos/uygulama.mp4" type="video/mp4">
    </video>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="section-head">
    <h2>Hizmetlerimiz</h2>
    <p>Ölçüden bakıma kadar tek merkezde profesyonel protez saç süreci.</p>
  </div>
  <div class="service-grid">
    <article class="panel">
      <h3>Protez Saç Uygulaması</h3>
      <p>Kişiye özel yoğunluk, ön çizgi ve tutuş planı ile doğal sonuç.</p>
    </article>
    <article class="panel">
      <h3>Protez Saç Bakımı</h3>
      <p>Yıkama, yenileme ve ömür uzatan bakım protokolleri.</p>
    </article>
    <article class="panel">
      <h3>Onarım &amp; Yenileme</h3>
      <p>Eskimiş sistemlerin onarımı, kenar düzeltme ve stil tazeleme.</p>
    </article>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="section-head">
    <h2>İstanbul İlçe Rehberi</h2>
    <p>500+ SEO makalesi: her ilçe için protez saç ve bakım içerikleri.</p>
  </div>
  <div class="district-grid">
    <?php foreach (istanbul_districts() as $d): ?>
      <a class="panel" href="/ilce/<?= e(slugify($d)) ?>">
        <h3 style="margin:0;font-size:1rem"><?= e($d) ?></h3>
        <p style="margin:.35rem 0 0">protez saç &amp; bakım</p>
      </a>
    <?php endforeach; ?>
  </div>
</section>

<div class="cta-band">
  <div>
    <h2>Ücretsiz ön değerlendirme</h2>
    <p>WhatsApp’tan fotoğraf gönderin, uygun çözümü birlikte netleştirelim.</p>
  </div>
  <a class="btn btn-primary" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener noreferrer">WhatsApp</a>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>
