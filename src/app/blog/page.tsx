import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/db";
import { ISTANBUL_DISTRICTS, PRIORITY_DISTRICTS, slugify } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protez Saç Blog",
  description:
    "Bahçelievler protez saç, Bağcılar ve Güngören başta olmak üzere İstanbul ilçeleri için protez saç rehberleri.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const { items } = await getPosts(1, 600);

  return (
    <>
      <section className="page-hero">
        <h1>Protez Saç Blog</h1>
        <p>İstanbul’un 39 ilçesi için protez saç ve bakım rehberleri.</p>
      </section>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="filters">
          <Link href="/blog/" className="is-active">Tümü ({items.length})</Link>
          {PRIORITY_DISTRICTS.map((d) => (
            <Link key={d} href={`/ilce/${slugify(d)}/`}>{d}</Link>
          ))}
          {ISTANBUL_DISTRICTS.filter((d) => !(PRIORITY_DISTRICTS as readonly string[]).includes(d)).map((d) => (
            <Link key={d} href={`/ilce/${slugify(d)}/`}>{d}</Link>
          ))}
        </div>
        <div className="blog-grid">
          {items.map((item) => (
            <article className="blog-card panel" key={item.id}>
              <span className="tag">{item.district}</span>
              <h3><Link href={`/blog/${item.slug}/`}>{item.title}</Link></h3>
              <p>{item.excerpt}</p>
              <Link className="more" href={`/blog/${item.slug}/`}>Devamını oku →</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
