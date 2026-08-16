import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description: "EKOL HAIR PROTEZ randevu ve danışmanlık. WhatsApp ile hızlı destek.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <h1>İletişim</h1>
        <p>Randevu ve ücretsiz ön değerlendirme için formu doldurun veya WhatsApp’tan yazın.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <ContactForm />
      </section>
    </>
  );
}
