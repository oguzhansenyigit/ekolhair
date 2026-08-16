"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BeforeAfterCase } from "@/lib/site";

export function BeforeAfterGrid({ cases }: { cases: BeforeAfterCase[] }) {
  return (
    <div className="ba-grid">
      {cases.map((item) => (
        <BeforeAfterSlider key={item.id} item={item} />
      ))}
    </div>
  );
}

function slideLabel(index: number, total: number): string {
  if (index === 0) return "Öncesi";
  if (index === total - 1) return "Sonrası";
  return `Adım ${index}`;
}

function BeforeAfterSlider({ item }: { item: BeforeAfterCase }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = item.images.length;

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(total - 1, index));
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    track.scrollTo({ left: next * width, behavior: "smooth" });
    setActive(next);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const width = track.clientWidth || 1;
      const idx = Math.round(track.scrollLeft / width);
      setActive(Math.max(0, Math.min(total - 1, idx)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <article className="ba-card ba-slider-card">
      <div className="ba-slider">
        <div className="ba-slider__track" ref={trackRef} tabIndex={0} aria-label={`${item.title} kaydırıcı`}>
          {item.images.map((img, i) => (
            <figure className="ba-slider__slide" key={img}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${item.title} — ${slideLabel(i, total)}`} width={640} height={800} draggable={false} />
              <figcaption className={`ba-slider__badge ${i === 0 ? "is-before" : ""} ${i === total - 1 ? "is-after" : ""}`}>
                {slideLabel(i, total)}
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="ba-slider__nav ba-slider__nav--prev"
          aria-label="Önceki görsel"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="ba-slider__nav ba-slider__nav--next"
          aria-label="Sonraki görsel"
          disabled={active === total - 1}
          onClick={() => goTo(active + 1)}
        >
          ›
        </button>

        <div className="ba-slider__progress" aria-hidden="true">
          <span style={{ width: `${((active + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="ba-card__body">
        <h3>{item.title}</h3>
        <p>
          {item.subtitle} · Kaydırarak öncesi → sonrası
        </p>
        <div className="ba-slider__dots">
          {item.images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={i === active ? "is-active" : ""}
              aria-label={`${slideLabel(i, total)} görseline git`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
