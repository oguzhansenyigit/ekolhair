import fs from "node:fs";
import path from "node:path";
import mysql, { type RowDataPacket } from "mysql2/promise";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  district: string;
  focus_keyword: string;
  meta_title: string;
  meta_description: string;
  status: string;
  published_at: string;
  updated_at: string;
};

export type BlogListItem = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "district" | "focus_keyword" | "published_at" | "updated_at"
>;

let cache: BlogPost[] | null = null;

function fromJson(): BlogPost[] {
  const file = path.join(process.cwd(), "data", "posts.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as BlogPost[];
}

async function fromMysql(): Promise<BlogPost[] | null> {
  const pass = process.env.DB_PASS;
  if (!pass) return null;
  let host = process.env.DB_HOST || "127.0.0.1";
  if (host === "localhost" || host === "::1") host = "127.0.0.1";
  try {
    const conn = await mysql.createConnection({
      host,
      database: process.env.DB_NAME || "u632602124_ekohair1",
      user: process.env.DB_USER || "u632602124_ekohair",
      password: pass,
      charset: "utf8mb4",
    });
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT id, title, slug, excerpt, content, district, focus_keyword,
              meta_title, meta_description, status, published_at, updated_at
       FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC`
    );
    await conn.end();
    return rows.map((r) => ({
      ...r,
      published_at: String(r.published_at),
      updated_at: String(r.updated_at),
    })) as BlogPost[];
  } catch {
    return null;
  }
}

async function loadPosts(): Promise<BlogPost[]> {
  if (cache) return cache;
  const db = await fromMysql();
  cache = db && db.length > 0 ? db : fromJson();
  return cache;
}

export async function getPosts(page = 1, perPage = 24, district?: string | null) {
  const all = await loadPosts();
  const filtered = district ? all.filter((p) => p.district === district) : all;
  const total = filtered.length;
  const offset = Math.max(0, (page - 1) * perPage);
  const items: BlogListItem[] = filtered.slice(offset, offset + perPage).map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    district: p.district,
    focus_keyword: p.focus_keyword,
    published_at: p.published_at,
    updated_at: p.updated_at,
  }));
  return { items, total, page, pages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function getPostBySlug(slug: string) {
  const all = await loadPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getRelatedPosts(district: string, excludeId: number, limit = 4) {
  const all = await loadPosts();
  return all
    .filter((p) => p.district === district && p.id !== excludeId)
    .slice(0, limit)
    .map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt, district: p.district }));
}

export async function getAllPostSlugs() {
  const all = await loadPosts();
  return all.map((p) => ({ slug: p.slug, updated_at: p.updated_at }));
}
