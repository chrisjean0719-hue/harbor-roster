import { useLayoutEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Renders children into the shell's overlay layer. */
export function Portal({ children }: { children: ReactNode }) {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setHost(document.getElementById('overlay-root'));
  }, []);

  return host ? createPortal(children, host) : null;
}
