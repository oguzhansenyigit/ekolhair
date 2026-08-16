import fs from "node:fs";

const districts = [
  "Adalar","Arnavutkoy","Atasehir","Avcilar","Bagcilar","Bahcelievler","Bakirkoy","Basaksehir","Bayrampasa","Besiktas","Beykoz","Beylikduzu","Beyoglu","Buyukcekmece","Catalca","Cekmekoy","Esenler","Esenyurt","Eyupsultan","Fatih","Gaziosmanpasa","Gungoren","Kadikoy","Kagithane","Kartal","Kucukcekmece","Maltepe","Pendik","Sancaktepe","Sariyer","Silivri","Sultanbeyli","Sultangazi","Sile","Sisli","Tuzla","Umraniye","Uskudar","Zeytinburnu",
];
const districtsTr = [
  "Adalar","Arnavutköy","Ataşehir","Avcılar","Bağcılar","Bahçelievler","Bakırköy","Başakşehir","Bayrampaşa","Beşiktaş","Beykoz","Beylikdüzü","Beyoğlu","Büyükçekmece","Çatalca","Çekmeköy","Esenler","Esenyurt","Eyüpsultan","Fatih","Gaziosmanpaşa","Güngören","Kadıköy","Kağıthane","Kartal","Küçükçekmece","Maltepe","Pendik","Sancaktepe","Sarıyer","Silivri","Sultanbeyli","Sultangazi","Şile","Şişli","Tuzla","Ümraniye","Üsküdar","Zeytinburnu",
];
const topics = [
  { key: "protez-sac", title: "{0} Protez Saç", kw: "{0} protez saç", angle: "uygulama ve doğal görünüm" },
  { key: "protez-sac-bakimi", title: "{0} Protez Saç Bakımı", kw: "{0} protez saç bakımı", angle: "bakım, yıkama ve ömür uzatma" },
  { key: "protez-sac-fiyatlari", title: "{0} Protez Saç Fiyatları", kw: "{0} protez saç fiyatları", angle: "fiyatlandırma ve paket seçenekleri" },
  { key: "sac-protezi", title: "{0} Saç Protezi", kw: "{0} saç protezi", angle: "protez sistemleri ve kullanım" },
  { key: "erkek-protez-sac", title: "{0} Erkek Protez Saç", kw: "{0} erkek protez saç", angle: "erkeklere özel çözümler" },
  { key: "protez-sac-merkezi", title: "{0} Protez Saç Merkezi", kw: "{0} protez saç merkezi", angle: "merkez hizmetleri ve randevu" },
  { key: "protez-sac-uygulamasi", title: "{0} Protez Saç Uygulaması", kw: "{0} protez saç uygulaması", angle: "uygulama adımları" },
  { key: "dogal-gorunumlu-protez-sac", title: "{0} Doğal Görünümlü Protez Saç", kw: "{0} doğal görünümlü protez saç", angle: "doğallık ve stil" },
  { key: "protez-sac-yikama", title: "{0} Protez Saç Yıkama", kw: "{0} protez saç yıkama", angle: "doğru yıkama teknikleri" },
  { key: "protez-sac-onarim", title: "{0} Protez Saç Onarım", kw: "{0} protez saç onarım", angle: "onarım ve yenileme" },
  { key: "sac-dokulmesi-protez", title: "{0} Saç Dökülmesi Protez Çözümleri", kw: "{0} saç dökülmesi protez", angle: "dökülmeye çözüm" },
  { key: "protez-sac-randevu", title: "{0} Protez Saç Randevu", kw: "{0} protez saç randevu", angle: "ücretsiz danışmanlık" },
  { key: "kaliteli-protez-sac", title: "{0} Kaliteli Protez Saç", kw: "{0} kaliteli protez saç", angle: "malzeme kalitesi" },
];

const esc = (s) => s.replaceAll("'", "''");
const fmt = (t, d) => t.replaceAll("{0}", d);

let out = "SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS=0;\nTRUNCATE TABLE blog_posts;\n\n";
let day = new Date(Date.UTC(2025, 0, 1, 10, 0, 0));
let n = 0;

for (let di = 0; di < districtsTr.length; di++) {
  const dTr = districtsTr[di];
  const dSlug = districts[di].toLowerCase();
  for (const t of topics) {
    const title = fmt(t.title, dTr);
    const kw = fmt(t.kw, dTr);
    const slug = `${dSlug}-${t.key}`;
    const excerpt = `${kw} hakkında EKOL HAIR PROTEZ rehberi: ${t.angle}, randevu ve doğal sonuç odaklı uygulamalar.`;
    let metaTitle = `${title} | EKOL HAIR PROTEZ`;
    if (metaTitle.length > 60) metaTitle = `${kw} | EKOL HAIR PROTEZ`;
    let metaDesc = `${kw} için profesyonel uygulama, bakım ve before-after örnekleri. ${dTr} ve İstanbul genelinde EKOL HAIR PROTEZ.`;
    if (metaDesc.length > 155) metaDesc = metaDesc.slice(0, 152) + "...";
    const others = ["Bahçelievler", "Bağcılar", "Güngören", "Bakırköy", "Kadıköy", "Şişli"].filter((x) => x !== dTr).slice(0, 3);
    const content = `<p><strong>${kw}</strong> arayanlar için EKOL HAIR PROTEZ, ${dTr} ve çevresinde doğal görünümlü protez saç çözümleri sunar. Bu rehberde ${t.angle} konularını, uygulama sürecini ve bakım önerilerini net şekilde bulabilirsiniz.</p>
<h2>${dTr} bölgesinde protez saç neden tercih edilir?</h2>
<p>${dTr} ilçesinde tempo yüksek, sosyal ve iş hayatı yoğun. Bu nedenle protez saç sistemlerinde doğallık, tutuş gücü ve günlük kullanım konforu kritik hale gelir. EKOL HAIR PROTEZ olarak her danışana özel ölçü, yoğunluk ve ön çizgi planı çıkarırız.</p>
<ul>
<li>Kişiye özel ölçü ve yoğunluk analizi</li>
<li>Doğal ön çizgi tasarımı</li>
<li>Güçlü tutuş ve günlük konfor</li>
<li>Profesyonel bakım ve yenileme desteği</li>
</ul>
<h2>${title} süreci nasıl ilerler?</h2>
<p>İlk görüşmede saç dökülme tipi, yaşam tarzı ve beklentiler değerlendirilir. Ardından uygun protez tipi seçilir, prova yapılır ve uygulama planlanır. ${dTr} içi ve yakın ilçelerden gelen danışanlarımız için randevu saatleri esnek tutulur.</p>
<ol>
<li>Ücretsiz danışmanlık ve analiz</li>
<li>Model / yoğunluk seçimi</li>
<li>Uygulama ve stil ayarı</li>
<li>Bakım eğitimi ve takip</li>
</ol>
<h2>${dTr} protez saç bakımı için temel kurallar</h2>
<p>Doğru bakım, protezin ömrünü ve görünümünü doğrudan etkiler. Haftalık yıkama rutini, doğru ürünler ve profesyonel kontrol sayesinde sistem daha uzun süre doğal kalır. ${kw} ihtiyacı olanlar için bakım paketlerimizi ayrıca sunuyoruz.</p>
<p>Ayrıca ${others[0]}, ${others[1]} ve ${others[2]} gibi yakın bölgelerden de düzenli bakım için merkezimize ulaşabilirsiniz.</p>
<h2>Before &amp; After sonuçları</h2>
<p>Gerçek müşteri uygulamalarımızda tepe açıklığı, ön çizgi seyrekliği ve tam kapsama ihtiyaçlarında belirgin dönüşüm görüyoruz. Galeri sayfamızdan örnekleri inceleyebilir, WhatsApp üzerinden kendi fotoğraflarınızla ön değerlendirme alabilirsiniz.</p>
<h2>Sık sorulanlar</h2>
<p><strong>Protez saç belli olur mu?</strong> Doğru yoğunluk, doğru ön çizgi ve doğru uygulama ile günlük hayatta fark edilmeyecek kadar doğal sonuç hedeflenir.</p>
<p><strong>${dTr} içinden nasıl randevu alırım?</strong> WhatsApp veya iletişim formundan konumunuzu yazmanız yeterli; en uygun saati birlikte planlarız.</p>
<p><strong>Bakım ne sıklıkla yapılmalı?</strong> Kullanıma göre değişmekle birlikte düzenli profesyonel bakım, performansı korur.</p>
<p>EKOL HAIR PROTEZ ile ${kw} konusunda güvenilir, şeffaf ve sonuç odaklı bir süreç yaşayın. İstanbul genelinde hizmet veriyor; ${dTr} başta olmak üzere tüm ilçelere SEO uyumlu bilgilendirme içerikleriyle ulaşıyoruz.</p>`;
    const published = day.toISOString().slice(0, 19).replace("T", " ");
    out += `INSERT INTO blog_posts (title, slug, excerpt, content, district, focus_keyword, meta_title, meta_description, status, published_at, updated_at) VALUES ('${esc(title)}', '${esc(slug)}', '${esc(excerpt)}', '${esc(content)}', '${esc(dTr)}', '${esc(kw)}', '${esc(metaTitle)}', '${esc(metaDesc)}', 'published', '${published}', '${published}');\n\n`;
    day = new Date(day.getTime() + 86400000);
    n += 1;
  }
}
out += "SET FOREIGN_KEY_CHECKS=1;\n";
fs.writeFileSync("sql/seed_blogs.sql", out, "utf8");
console.log("Wrote", n, "posts");
