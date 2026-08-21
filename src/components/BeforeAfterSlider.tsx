"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Classic before/after with a draggable center divider. */
export function BeforeAfterSlider({ images, alt }: { images: string[]; alt: string }) {
  const before = images[0];
  const after = images[images.length - 1] || images[0];
  const rootRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const sync = () => el.style.setProperty("--ba-w", `${el.offsetWidth}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={rootRef}
      className="ba-compare"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      role="slider"
      aria-label={`${alt} before after`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba-compare__after" src={after} alt={`${alt} sonrası`} width={600} height={800} draggable={false} />
      <div className="ba-compare__before-wrap" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ba-compare__before" src={before} alt={`${alt} öncesi`} width={600} height={800} draggable={false} />
      </div>
      <div className="ba-compare__line" style={{ left: `${pos}%` }}>
        <span className="ba-compare__handle" aria-hidden="true" />
      </div>
      <span className="ba-compare__tag ba-compare__tag--before">Öncesi</span>
      <span className="ba-compare__tag ba-compare__tag--after">Sonrası</span>
    </div>
  );
}
