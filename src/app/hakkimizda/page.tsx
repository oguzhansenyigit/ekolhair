import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "EKOL HAIR PROTEZ: Bahçelievler merkezli doğal protez saç uygulamaları.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Hakkımızda</h1>
        <p>Doğal sonuç, şeffaf süreç ve düzenli bakım ile protez saçta güvenilir adres.</p>
      </section>
      <section className="section prose" style={{ paddingTop: "1rem" }}>
        <p>
          EKOL HAIR PROTEZ; Bahçelievler, Bağcılar ve Güngören başta olmak üzere İstanbul genelinde
          doğal görünümlü protez saç çözümleri sunar.
        </p>
        <p>
          Her danışanda ölçü, yoğunluk ve ön çizgi planı kişiye özel hazırlanır. Amacımız günlük
          hayatta fark edilmeyecek kadar doğal bir sonuç.
        </p>
      </section>
    </>
  );
}
