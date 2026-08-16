<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';
$page_title = 'İletişim | EKOL HAIR PROTEZ';
$page_description = 'EKOL HAIR PROTEZ randevu ve danışmanlık. WhatsApp ile hızlı destek.';
$canonical = absolute_url('/iletisim');
$s = site();
require __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <h1>İletişim</h1>
  <p>Randevu ve ücretsiz ön değerlendirme için WhatsApp’tan yazın veya arayın.</p>
</section>
<section class="section" style="padding-top:1rem">
  <div class="service-grid">
    <a class="panel" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener noreferrer">
      <h3>WhatsApp</h3>
      <p>Hızlı randevu ve fotoğraflı ön değerlendirme.</p>
    </a>
    <a class="panel" href="tel:<?= e(preg_replace('/\s+/', '', $s['phone'])) ?>">
      <h3>Telefon</h3>
      <p><?= e($s['phone']) ?></p>
    </a>
    <div class="panel">
      <h3>Adres</h3>
      <p><?= e($s['address']) ?></p>
    </div>
  </div>
  <p style="margin-top:1.5rem">
    <a class="btn btn-primary" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
  </p>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
