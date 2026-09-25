import { useEffect, useState, type RefObject } from 'react';

/** Tracks the rendered content-box width of an element. */
export function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>): number | null {
  const [width, setWidth] = useState<number | null>(null);
  const node = ref.current;

  useEffect(() => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return width;
}
