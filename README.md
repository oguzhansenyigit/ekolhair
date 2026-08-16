# EKOL HAIR PROTEZ (Next.js)

Domain: **https://ekohair.oguzhansenyigit.com**

Next.js 15 + MySQL protez saç sitesi. Mobil hero video, before/after, 507 SEO blog yazısı, ilçe sayfaları, sitemap ve GEO/SEO.

## Komutlar

```bash
npm install
npm run dev
npm run build
npm start
npm run db:seed
```

## Ortam değişkenleri

`.env.local` örneği:

```
NEXT_PUBLIC_SITE_URL=https://ekohair.oguzhansenyigit.com
DB_HOST=localhost
DB_NAME=u632602124_ekohair1
DB_USER=u632602124_ekohair
DB_PASS=...
NEXT_PUBLIC_SITE_PHONE=...
NEXT_PUBLIC_SITE_WHATSAPP=9053...
```

## Hostinger (Node.js)

1. GitHub’a push edin
2. Hostinger Node.js App / Git deploy
3. Start: `npm run build && npm start`
4. Node version: 20+
5. Seed: `npm run db:seed` (veya phpMyAdmin ile `sql/schema.sql` + `sql/seed_blogs.sql`)

## SEO

- `/sitemap.xml` — statik + ilçe + tüm blog URL’leri
- `/robots.txt` — blog index’e açık
- Schema.org HairSalon + BlogPosting + geo meta
