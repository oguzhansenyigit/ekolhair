<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/functions.php';

header('Content-Type: application/xml; charset=UTF-8');
$base = rtrim(site()['url'], '/');
$now = date('c');

$urls = [
    ['loc' => $base . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
    ['loc' => $base . '/before-after', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['loc' => $base . '/hizmetler', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['loc' => $base . '/hakkimizda', 'priority' => '0.6', 'changefreq' => 'monthly'],
    ['loc' => $base . '/iletisim', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['loc' => $base . '/blog', 'priority' => '0.9', 'changefreq' => 'daily'],
];

foreach (istanbul_districts() as $d) {
    $urls[] = [
        'loc' => $base . '/ilce/' . slugify($d),
        'priority' => in_array($d, priority_districts(), true) ? '0.95' : '0.8',
        'changefreq' => 'weekly',
    ];
}

foreach (get_all_post_slugs() as $row) {
    $urls[] = [
        'loc' => $base . '/blog/' . $row['slug'],
        'priority' => '0.7',
        'changefreq' => 'monthly',
        'lastmod' => date('c', strtotime((string) $row['updated_at'])),
    ];
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo "  <url>\n";
    echo '    <loc>' . htmlspecialchars($u['loc'], ENT_XML1) . "</loc>\n";
    echo '    <lastmod>' . htmlspecialchars($u['lastmod'] ?? $now, ENT_XML1) . "</lastmod>\n";
    echo '    <changefreq>' . $u['changefreq'] . "</changefreq>\n";
    echo '    <priority>' . $u['priority'] . "</priority>\n";
    echo "  </url>\n";
}
echo '</urlset>';
