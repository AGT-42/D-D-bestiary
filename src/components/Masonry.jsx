import { useLayoutEffect, useMemo, useRef, useState } from "react";

// Packs cards of different heights into a FIXED number of equal-width columns: each card goes into the
// currently shortest column, in order, so short cards fill the space under tall ones.
// If a column is narrower than `designWidth`, the card keeps its normal layout and is scaled down to fit,
// so you always get `columns` cards across, whatever the screen size.
// items: [{ key, node }]
export default function Masonry({ items, columns = 3, designWidth = 384, gap = 24 }) {
  const box = useRef(null);
  const [width, setWidth] = useState(1200);
  const [heights, setHeights] = useState({}); // natural (unscaled) card heights

  useLayoutEffect(() => {
    const el = box.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const colWidth = Math.max(60, (width - gap * (columns - 1)) / columns);
  const scale = Math.min(1, colWidth / designWidth);
  const innerWidth = scale < 1 ? designWidth : colWidth;

  const cols = useMemo(() => {
    const out = Array.from({ length: columns }, () => ({ h: 0, items: [] }));
    for (const it of items) {
      const shortest = out.reduce((a, b) => (b.h < a.h ? b : a));
      shortest.items.push(it);
      shortest.h += (heights[it.key] ?? 800) * scale + gap;
    }
    return out;
  }, [items, columns, heights, scale, gap]);

  // Measure real card heights (and re-measure whenever one changes size).
  useLayoutEffect(() => {
    const el = box.current;
    const measure = () => {
      const next = {};
      el.querySelectorAll("[data-mkey]").forEach((n) => (next[n.dataset.mkey] = n.offsetHeight));
      setHeights((prev) => {
        const keys = Object.keys(next);
        const same = keys.length === Object.keys(prev).length && keys.every((k) => Math.abs((prev[k] ?? -9) - next[k]) < 2);
        return same ? prev : next;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    el.querySelectorAll("[data-mkey]").forEach((n) => ro.observe(n));
    return () => ro.disconnect();
  });

  return (
    <div ref={box} className="flex items-start" style={{ gap }}>
      {cols.map((col, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col" style={{ gap }}>
          {col.items.map((it) => (
            // Outer box takes the scaled height; the card inside keeps its natural layout and is shrunk with transform.
            <div key={it.key} style={{ height: (heights[it.key] ?? 800) * scale }}>
              <div data-mkey={it.key} style={{ width: innerWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                {it.node}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
