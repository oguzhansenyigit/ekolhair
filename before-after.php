<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';
$page_title = 'Before After | EKOL HAIR PROTEZ';
$page_description = 'Protez saç before after sonuçları. Gerçek müşteri uygulamaları.';
$canonical = absolute_url('/before-after');
$cases = before_after_cases();
require __DIR__ . '/includes/header.php';
?>
<section class="page-hero">
  <h1>Before After</h1>
  <p>Öncesi ve sonrası dönüşümleri inceleyin. Kartlara tıklayarak veya kaydırarak adımları görün.</p>
</section>
<section class="section" style="padding-top:1rem">
  <div class="ba-grid">
    <?php foreach ($cases as $case): ?>
      <div class="ba-slider" data-ba-slider data-images='<?= e(json_encode($case['images'], JSON_UNESCAPED_SLASHES)) ?>'>
        <img src="<?= e($case['before']) ?>" alt="<?= e($case['title']) ?>" width="600" height="800">
        <span class="hint">Öncesi · kaydır</span>
      </div>
    <?php endforeach; ?>
  </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>
