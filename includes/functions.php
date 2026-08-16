<?php
declare(strict_types=1);

function site_config(): array
{
    static $cfg;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/config.php';
    }
    return $cfg;
}

function site(): array
{
    return site_config()['site'];
}

function e(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function slugify(string $text): string
{
    $map = [
        'ç' => 'c', 'Ç' => 'c', 'ğ' => 'g', 'Ğ' => 'g', 'ı' => 'i', 'İ' => 'i',
        'ö' => 'o', 'Ö' => 'o', 'ş' => 's', 'Ş' => 's', 'ü' => 'u', 'Ü' => 'u',
    ];
    $text = strtr($text, $map);
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    return trim($text, '-');
}

function absolute_url(string $path = '/'): string
{
    $base = rtrim(site()['url'], '/');
    if ($path === '' || $path === '/') {
        return $base . '/';
    }
    return $base . '/' . ltrim($path, '/');
}

function istanbul_districts(): array
{
    return [
        'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
        'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
        'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
        'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
        'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
        'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla',
        'Ümraniye', 'Üsküdar', 'Zeytinburnu',
    ];
}

function priority_districts(): array
{
    return ['Bahçelievler', 'Bağcılar', 'Güngören'];
}

function district_from_slug(string $slug): ?string
{
    foreach (istanbul_districts() as $d) {
        if (slugify($d) === $slug) {
            return $d;
        }
    }
    return null;
}

function before_after_cases(): array
{
    $cases = [];
    foreach ([1, 2, 3] as $n) {
        $dir = __DIR__ . '/../assets/images/before-after/' . $n;
        if (!is_dir($dir)) {
            continue;
        }
        $files = glob($dir . '/*.{jpg,jpeg,png,webp}', GLOB_BRACE) ?: [];
        natcasesort($files);
        $files = array_values($files);
        if (!$files) {
            continue;
        }
        $images = [];
        foreach ($files as $f) {
            $images[] = '/assets/images/before-after/' . $n . '/' . basename($f);
        }
        $cases[] = [
            'id' => $n,
            'title' => 'Müşteri ' . $n,
            'images' => $images,
            'before' => $images[0],
            'after' => $images[count($images) - 1],
        ];
    }
    return $cases;
}

function db(): ?PDO
{
    static $pdo = null;
    static $failed = false;
    if ($failed) {
        return null;
    }
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $c = site_config()['db'];
    $host = $c['host'];
    if ($host === 'localhost' || $host === '::1') {
        $host = '127.0.0.1';
    }
    try {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $c['name'], $c['charset']);
        $pdo = new PDO($dsn, $c['user'], $c['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    } catch (Throwable $e) {
        $failed = true;
        return null;
    }
}

function get_posts(int $page = 1, int $perPage = 12, ?string $district = null): array
{
    $pdo = db();
    if (!$pdo) {
        return ['items' => [], 'total' => 0, 'page' => $page, 'pages' => 1];
    }
    $page = max(1, $page);
    $offset = ($page - 1) * $perPage;
    if ($district) {
        $count = $pdo->prepare("SELECT COUNT(*) FROM blog_posts WHERE status='published' AND district=?");
        $count->execute([$district]);
        $total = (int) $count->fetchColumn();
        $stmt = $pdo->prepare("SELECT id,title,slug,excerpt,district,focus_keyword,published_at,updated_at FROM blog_posts WHERE status='published' AND district=? ORDER BY published_at DESC LIMIT ? OFFSET ?");
        $stmt->bindValue(1, $district);
        $stmt->bindValue(2, $perPage, PDO::PARAM_INT);
        $stmt->bindValue(3, $offset, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        $total = (int) $pdo->query("SELECT COUNT(*) FROM blog_posts WHERE status='published'")->fetchColumn();
        $stmt = $pdo->prepare("SELECT id,title,slug,excerpt,district,focus_keyword,published_at,updated_at FROM blog_posts WHERE status='published' ORDER BY published_at DESC LIMIT ? OFFSET ?");
        $stmt->bindValue(1, $perPage, PDO::PARAM_INT);
        $stmt->bindValue(2, $offset, PDO::PARAM_INT);
        $stmt->execute();
    }
    return [
        'items' => $stmt->fetchAll(),
        'total' => $total,
        'page' => $page,
        'pages' => max(1, (int) ceil($total / $perPage)),
    ];
}

function get_post_by_slug(string $slug): ?array
{
    $pdo = db();
    if (!$pdo) {
        return null;
    }
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug=? AND status='published' LIMIT 1");
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function get_related_posts(string $district, int $excludeId, int $limit = 4): array
{
    $pdo = db();
    if (!$pdo) {
        return [];
    }
    $stmt = $pdo->prepare("SELECT title,slug,excerpt,district FROM blog_posts WHERE status='published' AND district=? AND id!=? ORDER BY published_at DESC LIMIT ?");
    $stmt->bindValue(1, $district);
    $stmt->bindValue(2, $excludeId, PDO::PARAM_INT);
    $stmt->bindValue(3, $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function get_all_post_slugs(): array
{
    $pdo = db();
    if (!$pdo) {
        return [];
    }
    return $pdo->query("SELECT slug, updated_at FROM blog_posts WHERE status='published' ORDER BY id ASC")->fetchAll();
}

function wa_link(string $text = 'Merhaba, protez saç randevusu almak istiyorum'): string
{
    return 'https://wa.me/' . site()['whatsapp'] . '?text=' . rawurlencode($text);
}

function current_path(): string
{
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($uri, PHP_URL_PATH) ?: '/';
    return rtrim($path, '/') ?: '/';
}

function is_active(string $path): bool
{
    return current_path() === rtrim($path, '/') || current_path() === $path;
}
