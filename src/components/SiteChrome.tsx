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
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <Link className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark"><BarberIcon /></span>
        <span className="brand-text">{siteConfig.name}</span>
      </Link>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label="Menü"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav className={`site-nav${open ? " is-open" : ""}`} id="site-nav">
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
      WhatsApp
    </a>
  );
}
