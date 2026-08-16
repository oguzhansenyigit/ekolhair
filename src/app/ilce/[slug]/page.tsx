import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/db";
import { ISTANBUL_DISTRICTS, slugify, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ISTANBUL_DISTRICTS.map((d) => ({ slug: slugify(d) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = ISTANBUL_DISTRICTS.find((d) => slugify(d) === slug);
  if (!district) return { title: "İlçe" };
  return {
    title: `${district} Protez Saç`,
    description: `${district} protez saç ve protez saç bakımı. Doğal uygulama, before-after ve randevu.`,
    alternates: { canonical: `/ilce/${slug}` },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params;
  const district = ISTANBUL_DISTRICTS.find((d) => slugify(d) === slug);
  if (!district) notFound();
  const { items } = await getPosts(1, 24, district);

  return (
    <>
      <section className="page-hero">
        <h1>{district} Protez Saç</h1>
        <p>{district} ve çevresi için doğal görünümlü protez saç uygulaması, bakım ve danışmanlık.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="service-grid">
          <article className="panel"><h3>{district} protez saç</h3><p>Kişiye özel ölçü ve ön çizgi ile doğal sonuç.</p></article>
          <article className="panel"><h3>{district} protez saç bakımı</h3><p>Ömrü uzatan bakım ve yenileme protokolleri.</p></article>
          <article className="panel">
            <h3>Randevu</h3>
            <p><a className="more" href={waLink(`${district} protez saç randevusu`)} target="_blank" rel="noopener noreferrer">WhatsApp’tan yazın →</a></p>
          </article>
        </div>
        {items.length > 0 && (
          <>
            <div className="section-head" style={{ marginTop: "2.5rem" }}>
              <h2>{district} rehber yazıları</h2>
            </div>
            <div className="blog-grid">
              {items.map((item) => (
                <article className="blog-card panel" key={item.id}>
                  <span className="tag">{item.district}</span>
                  <h3><Link href={`/blog/${item.slug}/`}>{item.title}</Link></h3>
                  <p>{item.excerpt}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
