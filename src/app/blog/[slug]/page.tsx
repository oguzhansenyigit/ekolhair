import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/db";
import { absoluteUrl, siteConfig, slugify } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await getAllPostSlugs();
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return {
    title: post.meta_title,
    description: post.meta_description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.meta_title,
      description: post.meta_description,
      url: absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post.district, post.id);
  const published = new Date(post.published_at);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description,
    datePublished: published.toISOString(),
    dateModified: new Date(post.updated_at).toISOString(),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: siteConfig.name },
    keywords: post.focus_keyword,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="section prose" style={{ paddingTop: "calc(var(--header-h) + 2rem)" }}>
        <p className="meta-line">
          <Link href="/blog/">Blog</Link> ·{" "}
          <Link href={`/ilce/${slugify(post.district)}/`}>{post.district}</Link> ·{" "}
          <time dateTime={published.toISOString().slice(0, 10)}>
            {published.toLocaleDateString("tr-TR")}
          </time>
        </p>
        <h1>{post.title}</h1>
        <p><strong>Odak kelime:</strong> {post.focus_keyword}</p>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>{post.district} ilgili yazılar</h2>
          </div>
          <div className="blog-grid">
            {related.map((item) => (
              <article className="blog-card panel" key={item.slug}>
                <span className="tag">{item.district}</span>
                <h3><Link href={`/blog/${item.slug}/`}>{item.title}</Link></h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="cta-band">
        <div>
          <h2>{post.district} randevu</h2>
          <p>Ücretsiz danışmanlık için hemen yazın.</p>
        </div>
        <Link className="btn btn-primary" href="/iletisim/">İletişim</Link>
      </div>
    </>
  );
}
