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
        <p>Doğal görünüm, güçlü tutuş ve uzun ömür için uçtan uca protez saç hizmetleri.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="service-grid">
          <article className="panel"><h3>Protez Saç Uygulaması</h3><p>Ölçü, yoğunluk, ön çizgi ve stil planı ile kişiye özel uygulama.</p></article>
          <article className="panel"><h3>Protez Saç Bakımı</h3><p>Yıkama, tarama ve bakım ürünleriyle sistem ömrünü uzatma.</p></article>
          <article className="panel"><h3>Onarım &amp; Yenileme</h3><p>Kenar onarımı, yoğunluk takviyesi ve yenileme seansları.</p></article>
          <article className="panel"><h3>Ücretsiz Danışmanlık</h3><p>Fotoğraflı ön değerlendirme ve randevu planlama.</p></article>
          <article className="panel"><h3>Erkek Protez Saç</h3><p>Erkek saç çizgisine uygun doğal modeller.</p></article>
          <article className="panel"><h3>Outlet Fırsatları</h3><p>Seçili modellerde avantajlı paket seçenekleri.</p></article>
        </div>
      </section>
    </>
  );
}
