import fs from "node:fs";
import path from "node:path";

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

const fmt = (t, d) => t.replaceAll("{0}", d);
const posts = [];
let day = new Date("2025-01-01T10:00:00Z");
let id = 1;

for (let di = 0; di < districtsTr.length; di++) {
  const dTr = districtsTr[di];
  const dSlug = districts[di].toLowerCase();
  for (const t of topics) {
    const title = fmt(t.title, dTr);
    const kw = fmt(t.kw, dTr);
    const slug = `${dSlug}-${t.key}`;
    const excerpt = `${kw} hakkında EKOL HAIR PROTEZ rehberi: ${t.angle}, randevu ve doğal sonuç odaklı uygulamalar.`;
    let meta_title = `${title} | EKOL HAIR PROTEZ`;
    if (meta_title.length > 60) meta_title = `${kw} | EKOL HAIR PROTEZ`;
    let meta_description = `${kw} için profesyonel uygulama, bakım ve before-after örnekleri. ${dTr} ve İstanbul genelinde EKOL HAIR PROTEZ.`;
    if (meta_description.length > 155) meta_description = `${meta_description.slice(0, 152)}...`;
    const others = ["Bahçelievler", "Bağcılar", "Güngören", "Bakırköy", "Kadıköy", "Şişli"].filter((x) => x !== dTr).slice(0, 3);
    const content = `<p><strong>${kw}</strong> arayanlar için EKOL HAIR PROTEZ, ${dTr} ve çevresinde doğal görünümlü protez saç çözümleri sunar. Bu rehberde ${t.angle} konularını, uygulama sürecini ve bakım önerilerini net şekilde bulabilirsiniz.</p>
<h2>${dTr} bölgesinde protez saç neden tercih edilir?</h2>
<p>${dTr} ilçesinde tempo yüksek, sosyal ve iş hayatı yoğun. Bu nedenle protez saç sistemlerinde doğallık, tutuş gücü ve günlük kullanım konforu kritik hale gelir.</p>
<ul><li>Kişiye özel ölçü ve yoğunluk analizi</li><li>Doğal ön çizgi tasarımı</li><li>Güçlü tutuş ve günlük konfor</li><li>Profesyonel bakım ve yenileme desteği</li></ul>
<h2>${title} süreci nasıl ilerler?</h2>
<p>İlk görüşmede saç dökülme tipi, yaşam tarzı ve beklentiler değerlendirilir. Ardından uygun protez tipi seçilir, prova yapılır ve uygulama planlanır.</p>
<ol><li>Ücretsiz danışmanlık ve analiz</li><li>Model / yoğunluk seçimi</li><li>Uygulama ve stil ayarı</li><li>Bakım eğitimi ve takip</li></ol>
<p>Ayrıca ${others[0]}, ${others[1]} ve ${others[2]} bölgelerinden de hizmet veriyoruz.</p>
<p>EKOL HAIR PROTEZ ile ${kw} konusunda güvenilir bir süreç yaşayın.</p>`;
    const published = day.toISOString().slice(0, 19).replace("T", " ");
    posts.push({
      id, title, slug, excerpt, content, district: dTr, focus_keyword: kw,
      meta_title, meta_description, status: "published",
      published_at: published, updated_at: published,
    });
    id += 1;
    day = new Date(day.getTime() + 86400000);
  }
}

const outDir = path.join(process.cwd(), "data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "posts.json"), JSON.stringify(posts));
console.log(`Wrote ${posts.length} posts`);
