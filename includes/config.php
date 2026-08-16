<?php
declare(strict_types=1);

return [
    'site' => [
        'name' => 'EKOL HAIR PROTEZ',
        'url' => 'https://ekohair.oguzhansenyigit.com',
        'phone' => '0532 000 00 00',
        'whatsapp' => '905320000000',
        'email' => 'info@ekohair.oguzhansenyigit.com',
        'address' => 'Bahçelievler, İstanbul',
        'tagline' => 'Doğal Görünümlü Protez Saç Çözümleri',
        'geo' => [
            'lat' => '41.0022',
            'lng' => '28.8597',
            'region' => 'TR-34',
        ],
    ],
    'db' => [
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'name' => getenv('DB_NAME') ?: 'u632602124_ekohair1',
        'user' => getenv('DB_USER') ?: 'u632602124_ekohair',
        'pass' => getenv('DB_PASS') ?: '11241124Oguzhan.',
        'charset' => 'utf8mb4',
    ],
];
