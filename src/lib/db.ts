import mysql, { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "u632602124_ekohair1",
    user: process.env.DB_USER || "u632602124_ekohair",
    password: process.env.DB_PASS || "",
    waitForConnections: true,
    connectionLimit: 10,
    charset: "utf8mb4",
  });
  return pool;
}

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
  published_at: Date | string;
  updated_at: Date | string;
};

export type BlogListItem = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "district" | "focus_keyword" | "published_at" | "updated_at"
>;

export async function getPosts(
  page = 1,
  perPage = 12,
  district?: string | null
): Promise<{ items: BlogListItem[]; total: number; page: number; pages: number }> {
  const offset = Math.max(0, (page - 1) * perPage);
  const db = getPool();
  const where = district
    ? "WHERE status = 'published' AND district = ?"
    : "WHERE status = 'published'";
  const params = district ? [district] : [];

  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM blog_posts ${where}`,
    params
  );
  const total = Number(countRows[0]?.total || 0);

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, title, slug, excerpt, district, focus_keyword, published_at, updated_at
     FROM blog_posts ${where}
     ORDER BY published_at DESC
     LIMIT ? OFFSET ?`,
    [...params, perPage, offset]
  );

  return {
    items: rows as BlogListItem[],
    total,
    page,
    pages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = getPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug]
  );
  return (rows[0] as BlogPost) || null;
}

export async function getRelatedPosts(district: string, excludeId: number, limit = 4) {
  const db = getPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT title, slug, excerpt, district FROM blog_posts
     WHERE status = 'published' AND district = ? AND id != ?
     ORDER BY published_at DESC LIMIT ?`,
    [district, excludeId, limit]
  );
  return rows as Pick<BlogPost, "title" | "slug" | "excerpt" | "district">[];
}

export async function getAllPostSlugs(): Promise<{ slug: string; updated_at: Date | string }[]> {
  const db = getPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT slug, updated_at FROM blog_posts WHERE status = 'published' ORDER BY id ASC`
  );
  return rows as { slug: string; updated_at: Date | string }[];
}

export async function saveContactMessage(input: {
  name: string;
  phone: string;
  district?: string;
  message: string;
}) {
  const db = getPool();
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO contact_messages (name, phone, district, message) VALUES (?, ?, ?, ?)`,
    [input.name, input.phone, input.district || null, input.message]
  );
  return result.insertId;
}
