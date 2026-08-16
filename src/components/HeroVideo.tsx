"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      void video.play().catch(() => undefined);
    };
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    return () => document.removeEventListener("touchstart", tryPlay);
  }, []);

  return (
    <section className="hero-video" aria-label="Mobil giriş hero videosu">
      <video
        ref={ref}
        className="hero-video__media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/before-after/1/musteri1-01.jpg"
      >
        <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
      </video>
      <div className="hero-video__overlay" aria-hidden="true" />
      <div className="hero-video__content">
        <p className="hero-kicker">DOĞAL GÖRÜNÜM · GÜÇLÜ TUTUŞ</p>
        <h1 className="hero-title">ERKEK PROTEZ SAÇ</h1>
        <p className="hero-sub">İnanılmaz bir doğal dönüşüme şahit olun..</p>
        <div className="hero-actions">
          <Link className="btn btn-ghost" href="/before-after">
            İNCELE
          </Link>
          <Link className="btn btn-primary" href="/iletisim">
            RANDEVU AL
          </Link>
        </div>
      </div>
    </section>
  );
}
