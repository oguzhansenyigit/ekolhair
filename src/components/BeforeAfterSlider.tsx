"use client";

import { useEffect, useRef, useState } from "react";

export function BeforeAfterSlider({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const startX = useRef(0);
  const labels = ["Öncesi", "Adım", "Sonrası"];
  const label = i === 0 ? labels[0] : i === images.length - 1 ? labels[2] : labels[1];

  useEffect(() => {
    setI(0);
  }, [images]);

  return (
    <div
      className="ba-slider"
      onClick={() => setI((v) => (v + 1) % images.length)}
      onTouchStart={(e) => {
        startX.current = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) < 40) return;
        setI((v) => (dx < 0 ? Math.min(images.length - 1, v + 1) : Math.max(0, v - 1)));
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[i]} alt={alt} width={600} height={800} />
      <span className="hint">{label} · kaydır</span>
    </div>
  );
}
