import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { beforeAfterCases, ISTANBUL_DISTRICTS, slugify, waLink } from "@/lib/site";

export default function HomePage() {
  const cases = beforeAfterCases();

  return (
    <>
      <section className="hero" aria-label="Protez saç hero videosu">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/before-after/1/musteri1-01.jpg"
        >
          <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker">OUTLET FIRSAT &amp; PROFESYONEL UYGULAMA</p>
          <h1 className="hero-title">ERKEK PROTEZ SAÇ</h1>
          <p className="hero-sub">İnanılmaz bir doğal dönüşüme şahit olun..</p>
          <div className="hero-actions">
            <Link className="btn btn-ghost" href="/before-after/">İNCELE</Link>
            <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">RANDEVU</a>
          </div>
        </div>
      </section>

      <div className="seo-strip">
        <Link href="/before-after/">Before After sonuçları</Link>
        <Link href="/hizmetler/">Protez saç uygulaması</Link>
        <Link href="/hizmetler/">Protez saç bakımı</Link>
        <Link href="/blog/">Uzman rehberler</Link>
        <Link href="/iletisim/">Ücretsiz danışmanlık</Link>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Before After Sonuçları</h2>
          <p>Gerçek müşteri uygulamaları. Kaydırarak öncesi → sonrası ilerleyin.</p>
        </div>
        <div className="ba-grid">
          {cases.map((c) => (
            <BeforeAfterSlider key={c.id} images={c.images} alt={c.title} />
          ))}
        </div>
        <p style={{ marginTop: "1.5rem" }}>
          <Link className="btn btn-ghost" href="/before-after/">Tüm galeriyi aç</Link>
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Uygulama Videosu</h2>
          <p>Protez saç uygulama sürecinden kısa bir kesit.</p>
        </div>
        <div className="video-block">
          <video controls preload="metadata" poster="/assets/images/before-after/2/musteri2-01.jpg">
            <source src="/assets/videos/uygulama.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Hizmetlerimiz</h2>
          <p>Ölçüden bakıma kadar tek merkezde profesyonel protez saç süreci.</p>
        </div>
        <div className="service-grid">
          <article className="panel"><h3>Protez Saç Uygulaması</h3><p>Kişiye özel yoğunluk, ön çizgi ve tutuş planı ile doğal sonuç.</p></article>
          <article className="panel"><h3>Protez Saç Bakımı</h3><p>Yıkama, yenileme ve ömür uzatan bakım protokolleri.</p></article>
          <article className="panel"><h3>Onarım &amp; Yenileme</h3><p>Eskimiş sistemlerin onarımı, kenar düzeltme ve stil tazeleme.</p></article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>İstanbul İlçe Rehberi</h2>
          <p>500+ SEO makalesi: her ilçe için protez saç ve bakım içerikleri.</p>
        </div>
        <div className="district-grid">
          {ISTANBUL_DISTRICTS.map((d) => (
            <Link className="panel" key={d} href={`/ilce/${slugify(d)}/`}>
              <h3 style={{ margin: 0, fontSize: "1rem" }}>{d}</h3>
              <p style={{ margin: "0.35rem 0 0" }}>protez saç &amp; bakım</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <div>
          <h2>Ücretsiz ön değerlendirme</h2>
          <p>WhatsApp’tan fotoğraf gönderin, uygun çözümü birlikte netleştirelim.</p>
        </div>
        <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </>
  );
}
