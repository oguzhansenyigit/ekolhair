import type { Metadata } from "next";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";
import { beforeAfterCases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Before After",
  description: "Gerçek müşteri before-after protez saç uygulamaları.",
  alternates: { canonical: "/before-after" },
};

export default function BeforeAfterPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Before After</h1>
        <p>Gerçek müşteri protez saç uygulamaları. Her kartta birden fazla açı.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <BeforeAfterGrid cases={beforeAfterCases()} />
      </section>
    </>
  );
}
