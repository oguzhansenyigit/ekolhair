import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function runSqlFile(connection: mysql.Connection, filePath: string) {
  const sql = fs.readFileSync(filePath, "utf8");
  const statements = sql
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  let inserts = 0;
  for (const statement of statements) {
    await connection.query(statement);
    if (/^INSERT INTO blog_posts/i.test(statement)) inserts += 1;
  }
  return inserts;
}

async function main() {
  const host = process.env.DB_HOST || "localhost";
  const database = process.env.DB_NAME || "u632602124_ekohair1";
  const user = process.env.DB_USER || "u632602124_ekohair";
  const password = process.env.DB_PASS || "";

  console.log(`Connecting ${user}@${host}/${database} ...`);
  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements: true,
    charset: "utf8mb4",
  });

  const root = process.cwd();
  const schemaPath = path.join(root, "sql", "schema.sql");
  const seedPath = path.join(root, "sql", "seed_blogs.sql");

  console.log("Applying schema...");
  await runSqlFile(connection, schemaPath);

  console.log("Seeding blog posts (507)...");
  const inserts = await runSqlFile(connection, seedPath);

  const [rows] = await connection.query<{ total: number }[] & mysql.RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM blog_posts"
  );
  const total = Number((rows as mysql.RowDataPacket[])[0]?.total || 0);

  await connection.end();
  console.log(`Done. inserts≈${inserts}, total posts=${total}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
