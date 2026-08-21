"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

function BarberIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
      <path d="M20 38c4-10 8-16 12-18 4 2 8 8 12 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 28c3-1 6-1 8 0M32 27c3 1 6 2 8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 42h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 42v6M36 42v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  return (
    <header className={`site-header${solid ? " is-solid" : ""}${open ? " is-nav-open" : ""}`}>
      <Link className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark"><BarberIcon /></span>
        <span className="brand-text">{siteConfig.name}</span>
      </Link>
      <button
        className={`nav-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "Menüyü kapat" : "Menü"}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav className={`site-nav${open ? " is-open" : ""}`} id="site-nav" aria-hidden={!open}>
        <Link href="/" onClick={() => setOpen(false)}>Ana Sayfa</Link>
        <Link href="/before-after/" onClick={() => setOpen(false)}>Before After</Link>
        <Link href="/hizmetler/" onClick={() => setOpen(false)}>Hizmetler</Link>
        <Link href="/blog/" onClick={() => setOpen(false)}>Blog</Link>
        <Link href="/ilce/bahcelievler/" onClick={() => setOpen(false)}>Bahçelievler</Link>
        <Link className="nav-cta" href="/iletisim/" onClick={() => setOpen(false)}>Randevu</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.tagline}</p>
          <p>{siteConfig.address}</p>
        </div>
        <div>
          <strong>Hızlı linkler</strong>
          <Link href="/before-after/">Before After</Link>
          <Link href="/hizmetler/">Hizmetler</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/hakkimizda/">Hakkımızda</Link>
          <Link href="/iletisim/">İletişim</Link>
        </div>
        <div>
          <strong>Öncelikli bölgeler</strong>
          <Link href="/ilce/bahcelievler/">Bahçelievler protez saç</Link>
          <Link href="/ilce/bagcilar/">Bağcılar protez saç</Link>
          <Link href="/ilce/gungoren/">Güngören protez saç</Link>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {siteConfig.name}</p>
    </footer>
  );
}

export function WhatsAppFab() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Merhaba, protez saç randevusu almak istiyorum")}`;
  return (
    <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.01 3C9.4 3 4 8.37 4 14.94c0 2.1.56 4.15 1.62 5.96L4 29l8.3-1.57A12.05 12.05 0 0 0 16 26.88c6.62 0 12-5.37 12-11.94C28 8.37 22.63 3 16.01 3zm6.93 16.95c-.29.82-1.7 1.5-2.38 1.6-.62.08-1.4.12-2.26-.14-.52-.16-1.19-.39-2.05-.76-3.6-1.56-5.94-5.2-6.12-5.44-.18-.24-1.48-1.97-1.48-3.76s.94-2.67 1.27-3.03c.33-.36.72-.45.96-.45h.7c.22 0 .52-.08.81.62.29.72.99 2.48 1.08 2.66.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.15.72.21.36.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.89 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.2 1.69z"
        />
      </svg>
    </a>
  );
}
