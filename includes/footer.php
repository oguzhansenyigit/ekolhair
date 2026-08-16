<?php
declare(strict_types=1);
$s = site();
$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'HairSalon',
            '@id' => absolute_url('/') . '#business',
            'name' => $s['name'],
            'url' => absolute_url('/'),
            'telephone' => $s['phone'],
            'email' => $s['email'],
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => 'Bahçelievler',
                'addressRegion' => 'İstanbul',
                'addressCountry' => 'TR',
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => $s['geo']['lat'],
                'longitude' => $s['geo']['lng'],
            ],
            'areaServed' => array_map(static fn($d) => ['@type' => 'AdministrativeArea', 'name' => $d . ', İstanbul'], istanbul_districts()),
            'priceRange' => '$$',
        ],
        [
            '@type' => 'WebSite',
            '@id' => absolute_url('/') . '#website',
            'url' => absolute_url('/'),
            'name' => $s['name'],
            'inLanguage' => 'tr-TR',
        ],
    ],
];
?>
</main>
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <strong><?= e($s['name']) ?></strong>
      <p><?= e($s['tagline']) ?></p>
      <p><?= e($s['address']) ?></p>
    </div>
    <div>
      <strong>Hızlı linkler</strong>
      <a href="/before-after">Before After</a>
      <a href="/hizmetler">Hizmetler</a>
      <a href="/blog">Blog</a>
      <a href="/hakkimizda">Hakkımızda</a>
      <a href="/iletisim">İletişim</a>
    </div>
    <div>
      <strong>Öncelikli bölgeler</strong>
      <?php foreach (priority_districts() as $d): ?>
        <a href="/ilce/<?= e(slugify($d)) ?>"><?= e($d) ?> protez saç</a>
      <?php endforeach; ?>
    </div>
  </div>
  <p class="footer-copy">© <?= date('Y') ?> <?= e($s['name']) ?></p>
</footer>
<a class="wa-fab" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
<script type="application/ld+json"><?= json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
<script src="/assets/js/main.js?v=1" defer></script>
</body>
</html>
