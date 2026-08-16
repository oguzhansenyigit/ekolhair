"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function BarberIcon({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 38c4-10 8-16 12-18 4 2 8 8 12 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M24 28c3-1 6-1 8 0M32 27c3 1 6 2 8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 42h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 42v6M36 42v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-active" : ""} ${open ? "is-open" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="EKOL HAIR PROTEZ Ana Sayfa" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <BarberIcon />
          </span>
          <span className="brand-text">
            <strong>EKOL HAIR</strong>
            <em>PROTEZ</em>
          </span>
        </Link>
        <button
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="siteNav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <nav className="site-nav" id="siteNav" aria-label="Ana menü">
          <Link href="/" onClick={() => setOpen(false)}>
            Ana Sayfa
          </Link>
          <Link href="/before-after" onClick={() => setOpen(false)}>
            Before After
          </Link>
          <Link href="/hizmetler" onClick={() => setOpen(false)}>
            Hizmetler
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/ilce/bahcelievler" onClick={() => setOpen(false)}>
            Bahçelievler
          </Link>
          <Link href="/iletisim" className="nav-cta" onClick={() => setOpen(false)}>
            Randevu
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand brand--footer">
            <span className="brand-icon">
              <BarberIcon size={28} />
            </span>
            <span className="brand-text">
              <strong>EKOL HAIR</strong>
              <em>PROTEZ</em>
            </span>
          </div>
          <p>
            Bahçelievler protez saç, Bağcılar ve Güngören başta olmak üzere İstanbul’un tüm ilçelerine doğal
            görünümlü protez saç çözümleri.
          </p>
        </div>
        <div>
          <h3>Hızlı Linkler</h3>
          <Link href="/before-after">Before After</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/iletisim">İletişim</Link>
        </div>
        <div>
          <h3>Öncelikli İlçeler</h3>
          <Link href="/ilce/bahcelievler">Bahçelievler Protez Saç</Link>
          <Link href="/ilce/bagcilar">Bağcılar Protez Saç</Link>
          <Link href="/ilce/gungoren">Güngören Protez Saç</Link>
          <Link href="/blog">Tüm İlçe Rehberleri</Link>
        </div>
        <div>
          <h3>İletişim</h3>
          <p>Bahçelievler, İstanbul</p>
          <a href="https://ekohair.oguzhansenyigit.com">ekohair.oguzhansenyigit.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} EKOL HAIR PROTEZ</span>
        <a href="/sitemap.xml">Sitemap</a>
      </div>
    </footer>
  );
}

export function WhatsAppFab({ phone }: { phone: string }) {
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Merhaba, protez saç randevusu almak istiyorum")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.01 3C9.39 3 4 8.39 4 15.02c0 2.12.56 4.18 1.63 6L4 29l8.15-1.6a12 12 0 0 0 5.86 1.5h.01C22.63 28.9 28 23.51 28 16.88 28 10.26 22.63 3 16.01 3zm0 23.4h-.01a10 10 0 0 1-5.1-1.4l-.36-.21-4.84.95.98-4.72-.24-.38a9.9 9.9 0 0 1-1.52-5.28C5.91 9.5 10.42 5 16.01 5c5.58 0 10.1 4.5 10.1 10.02 0 5.53-4.52 11.38-10.1 11.38zm5.55-7.47c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.27-.2-.57-.35z"
        />
      </svg>
    </a>
  );
}
