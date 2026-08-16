import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { beforeAfterCases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Before After",
  description: "Protez saç before after sonuçları. Gerçek müşteri uygulamaları.",
  alternates: { canonical: "/before-after" },
};

export default function BeforeAfterPage() {
  const cases = beforeAfterCases();
  return (
    <>
      <section className="page-hero">
        <h1>Before After</h1>
        <p>Öncesi ve sonrası dönüşümleri inceleyin. Kaydırarak veya tıklayarak adımları görün.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="ba-grid">
          {cases.map((c) => (
            <BeforeAfterSlider key={c.id} images={c.images} alt={c.title} />
          ))}
        </div>
      </section>
    </>
  );
}
