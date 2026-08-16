import type { Metadata } from "next";
import { siteConfig, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "EKOL HAIR PROTEZ randevu ve danışmanlık. WhatsApp ile hızlı destek.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const tel = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
  return (
    <>
      <section className="page-hero">
        <h1>İletişim</h1>
        <p>Randevu ve ücretsiz ön değerlendirme için WhatsApp’tan yazın veya arayın.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="service-grid">
          <a className="panel" href={waLink()} target="_blank" rel="noopener noreferrer">
            <h3>WhatsApp</h3>
            <p>Hızlı randevu ve fotoğraflı ön değerlendirme.</p>
          </a>
          <a className="panel" href={tel}>
            <h3>Telefon</h3>
            <p>{siteConfig.phone}</p>
          </a>
          <div className="panel">
            <h3>Adres</h3>
            <p>{siteConfig.address}</p>
          </div>
        </div>
        <p style={{ marginTop: "1.5rem" }}>
          <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp ile yaz
          </a>
        </p>
      </section>
    </>
  );
}
