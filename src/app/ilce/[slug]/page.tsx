import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/db";
import { ISTANBUL_DISTRICTS, slugify } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function districtFromSlug(slug: string): string | null {
  const map = new Map(ISTANBUL_DISTRICTS.map((d) => [slugify(d), d]));
  return map.get(slug) || null;
}

export async function generateStaticParams() {
  return ISTANBUL_DISTRICTS.map((d) => ({ slug: slugify(d) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = districtFromSlug(slug);
  if (!district) return { title: "İlçe bulunamadı" };
  return {
    title: `${district} Protez Saç | ${district} Protez Saç Bakımı`,
    description: `${district} protez saç ve ${district} protez saç bakımı için profesyonel uygulama ve before-after sonuçları.`,
    alternates: { canonical: `/ilce/${slug}` },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params;
  const district = districtFromSlug(slug);
  if (!district) notFound();

  let posts: Awaited<ReturnType<typeof getPosts>>["items"] = [];
  try {
    const result = await getPosts(1, 6, district);
    posts = result.items;
  } catch {
    posts = [];
  }

  return (
    <>
      <section className="page-hero">
        <h1>{district} Protez Saç</h1>
        <p>
          {district} protez saç ve {district} protez saç bakımı için doğal görünümlü uygulamalar, bakım paketleri ve
          before-after sonuçları.
        </p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="service-grid">
          <article className="panel">
            <h3>{district} protez saç</h3>
            <p>Ölçü, yoğunluk ve ön çizgi planı ile kişiye özel uygulama.</p>
          </article>
          <article className="panel">
            <h3>{district} protez saç bakımı</h3>
            <p>Yıkama, yenileme ve uzun ömürlü bakım desteği.</p>
          </article>
          <article className="panel">
            <h3>Before After</h3>
            <p>Gerçek sonuçları inceleyin, WhatsApp’tan ön değerlendirme alın.</p>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>{district} blog yazıları</h2>
          <p>Bu ilçeye özel SEO içerikleri.</p>
        </div>
        {posts.length === 0 ? (
          <div className="panel">
            <p>
              İçerikler seed sonrası burada listelenir.{" "}
              <Link href={`/blog?ilce=${encodeURIComponent(district)}`}>Blog filtresine git</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {posts.map((item) => (
                <article className="blog-card" key={item.id}>
                  <span className="tag">{item.district}</span>
                  <h3>
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.excerpt}</p>
                  <Link className="more" href={`/blog/${item.slug}`}>
                    Devamını oku →
                  </Link>
                </article>
              ))}
            </div>
            <p style={{ marginTop: "1.25rem" }}>
              <Link className="btn btn-ghost" href={`/blog?ilce=${encodeURIComponent(district)}`}>
                Tüm {district} yazıları
              </Link>
            </p>
          </>
        )}
      </section>

      <div className="cta-band">
        <div>
          <h2>{district} için randevu</h2>
          <p>EKOL HAIR PROTEZ ile hızlı ön değerlendirme.</p>
        </div>
        <Link className="btn btn-primary" href="/iletisim">
          Randevu al
        </Link>
      </div>
    </>
  );
}
