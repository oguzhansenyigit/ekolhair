# Hostinger — EKOL HAIR (PHP)

Bu site **PHP**’dir. Next.js / Node / `npm` / `node server.js` KULLANMA.

## Doğru kurulum

1. Hostinger’da bu domain için **Website** (PHP) hosting kullan — **Node.js / Next.js uygulaması değil**.
2. GitHub repo’yu bağla → deploy et (document root = site kökü, `index.php` görünsün).
3. phpMyAdmin:
   - `sql/schema.sql` import
   - `sql/seed_blogs.sql` import (~507 yazı)
4. Gerekirse `includes/config.php` içinde telefon / WhatsApp güncelle.

## Kontrol

- Ana sayfa: video + CSS görünmeli (`/assets/css/style.css`)
- Blog: `/blog` dolu gelmeli
- Sitemap: `/sitemap.xml`

Eski Next.js deploy’u varsa sil / PHP website’e geç — yoksa yine `/_next` 404 görürsün.
