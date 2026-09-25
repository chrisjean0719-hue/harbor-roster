import { useEffect, type RefObject } from 'react';

/** Calls `onDismiss` on Escape or on a pointer press outside `ref` (and the optional anchor). */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  onDismiss: () => void,
  anchor?: HTMLElement | null,
) {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target) || anchor?.contains(target)) return;
      onDismiss();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, onDismiss, anchor]);
}
