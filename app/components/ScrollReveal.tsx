'use client';
import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');

    // Already visible (e.g. no JS before)
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    els.forEach(el => {
      // Reset so observer triggers correctly
      el.classList.remove('is-in');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
// MR NEWS — Executive Morning Intelligence Platform
