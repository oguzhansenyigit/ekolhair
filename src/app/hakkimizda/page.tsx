import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "EKOL HAIR PROTEZ hakkında: doğal görünümlü protez saç ve kişiye özel uygulama.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Hakkımızda</h1>
        <p>
          EKOL HAIR PROTEZ; doğal görünümlü protez saç uygulaması ve bakımında sonuç odaklı bir stüdyo yaklaşımı
          sunar.
        </p>
      </section>
      <section className="section prose" style={{ paddingTop: "1rem" }}>
        <p>
          Merkezimiz Bahçelievler’de konumlanır; Bağcılar, Güngören ve İstanbul’un tüm ilçelerinden gelen
          danışanlara hizmet veririz.
        </p>
        <h2>Neden EKOL HAIR PROTEZ?</h2>
        <ul>
          <li>Gerçek müşteri before-after arşivi</li>
          <li>Mobilde hero video ile net ilk izlenim</li>
          <li>İstanbul ilçelerine özel SEO / GEO uyumlu içerik ağı</li>
          <li>Bakım ve yenilemede uzun vadeli takip</li>
        </ul>
      </section>
    </>
  );
}
