import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "Protez saç uygulaması, bakım, onarım ve yenileme hizmetleri.",
  alternates: { canonical: "/hizmetler" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Hizmetler</h1>
        <p>EKOL HAIR PROTEZ ile ölçü, uygulama, bakım ve onarım tek çatı altında.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="service-grid">
          {[
            ["Protez Saç Danışmanlığı", "Saç dökülme tipi, yaşam tarzı ve beklenti analizi."],
            ["Ölçü & Model Seçimi", "Yoğunluk, renk, dalga ve ön çizgi için kişiye özel planlama."],
            ["Uygulama", "Güçlü tutuş, doğal geçiş ve stil ayarı ile aynı gün dönüşüm."],
            ["Protez Saç Bakımı", "Yıkama eğitimi, ürün önerisi ve periyodik profesyonel bakım."],
            ["Onarım", "Kenar yenileme, tutuş güçlendirme ve sistem onarımı."],
            ["İlçe Odaklı Destek", "Bahçelievler, Bağcılar, Güngören ve 39 ilçe için içerik ağı."],
          ].map(([title, text]) => (
            <article className="panel" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Uygulama videosu</h2>
          <p>Süreci yakından görün.</p>
        </div>
        <div className="video-block">
          <video controls preload="metadata" poster="/assets/images/before-after/3/musteri3-01.jpg">
            <source src="/assets/videos/uygulama.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
}
