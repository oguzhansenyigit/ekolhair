"use client";

import { useState } from "react";
import type { BeforeAfterCase } from "@/lib/site";

export function BeforeAfterGrid({ cases }: { cases: BeforeAfterCase[] }) {
  return (
    <div className="ba-grid">
      {cases.map((item) => (
        <BeforeAfterCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function BeforeAfterCard({ item }: { item: BeforeAfterCase }) {
  const [active, setActive] = useState(0);

  return (
    <article className="ba-card">
      <div className="ba-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.images[active]} alt={`${item.title} protez saç sonucu`} width={640} height={800} />
      </div>
      <div className="ba-card__body">
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>
      <div className="ba-thumbs" style={{ padding: "0 1rem 1rem" }}>
        {item.images.map((img, i) => (
          <button
            key={img}
            type="button"
            className={i === active ? "is-active" : ""}
            aria-label={`Görsel ${i + 1}`}
            onClick={() => setActive(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" width={120} height={120} loading="lazy" />
          </button>
        ))}
      </div>
    </article>
  );
}
