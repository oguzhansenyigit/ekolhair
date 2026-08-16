# Hostinger — Next.js static export

1. Framework: Next.js (veya Other)
2. Build command: `npm install && npm run build`
3. Output directory: `out`  ← kritik (`.next` değil)
4. Start / Entry / node server.js: BOŞ bırak

Redeploy sonrası site düz HTML olarak açılır. `/_next` 404 olmamalı.

Blog: build sırasında MySQL okunur; bağlanamazsa `data/posts.json` kullanılır.
MySQL’i zaten import ettiysen env’de DB_* doğru olsun.
