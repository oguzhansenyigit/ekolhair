import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/db";
import { ISTANBUL_DISTRICTS, PRIORITY_DISTRICTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protez Saç Blog",
  description:
    "Bahçelievler protez saç, Bağcılar ve Güngören başta olmak üzere İstanbul ilçeleri için protez saç rehberleri.",
  alternates: { canonical: "/blog" },
};

type Props = { searchParams: Promise<{ sayfa?: string; ilce?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.sayfa || 1) || 1);
  const district = sp.ilce?.trim() || null;

  let posts = { items: [] as Awaited<ReturnType<typeof getPosts>>["items"], total: 0, page: 1, pages: 1 };
  try {
    posts = await getPosts(page, 12, district);
  } catch {
    posts = { items: [], total: 0, page: 1, pages: 1 };
  }

  const build = (p: number) => {
    const q = new URLSearchParams();
    q.set("sayfa", String(p));
    if (district) q.set("ilce", district);
    return `/blog?${q.toString()}`;
  };

  const current = posts.page;
  const totalPages = posts.pages;
  const start = Math.max(1, current - 2);
  const end = Math.min(totalPages, current + 2);

  return (
    <>
      <section className="page-hero">
        <h1>Protez Saç Blog</h1>
        <p>İstanbul’un 39 ilçesi için protez saç ve bakım rehberleri. Sitemap ile indexlenmeye açıktır.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="filters" aria-label="İlçe filtreleri">
          <Link href="/blog" className={!district ? "is-active" : ""}>
            Tümü
          </Link>
          {PRIORITY_DISTRICTS.map((d) => (
            <Link key={d} href={`/blog?ilce=${encodeURIComponent(d)}`} className={district === d ? "is-active" : ""}>
              {d}
            </Link>
          ))}
          {ISTANBUL_DISTRICTS.filter((d) => !(PRIORITY_DISTRICTS as readonly string[]).includes(d)).map((d) => (
            <Link key={d} href={`/blog?ilce=${encodeURIComponent(d)}`} className={district === d ? "is-active" : ""}>
              {d}
            </Link>
          ))}
        </div>

        {posts.items.length === 0 ? (
          <div className="panel">
            <h3>Blog yazıları henüz yüklenmedi</h3>
            <p>
              Sunucuda <code>npm run db:seed</code> çalıştırın veya phpMyAdmin ile <code>sql/schema.sql</code> +{" "}
              <code>sql/seed_blogs.sql</code> içe aktarın.
            </p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {posts.items.map((item) => (
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
            {totalPages > 1 && (
              <nav className="pagination" aria-label="Sayfalama">
                {current > 1 && <Link href={build(current - 1)}>‹</Link>}
                {start > 1 && (
                  <>
                    <Link href={build(1)}>1</Link>
                    {start > 2 && <span>…</span>}
                  </>
                )}
                {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
                  <Link key={p} href={build(p)} className={p === current ? "is-active" : ""}>
                    {p}
                  </Link>
                ))}
                {end < totalPages && (
                  <>
                    {end < totalPages - 1 && <span>…</span>}
                    <Link href={build(totalPages)}>{totalPages}</Link>
                  </>
                )}
                {current < totalPages && <Link href={build(current + 1)}>›</Link>}
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
}
