import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı.</p>
      <p style={{ marginTop: "1.2rem" }}>
        <Link className="btn btn-primary" href="/">
          Ana sayfaya dön
        </Link>
      </p>
    </section>
  );
}
