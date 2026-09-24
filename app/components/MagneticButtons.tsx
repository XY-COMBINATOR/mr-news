'use client';
import { useEffect } from 'react';

export function MagneticButtons() {
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>(
      '.register-btn, .site-nav__cta, .quiet-cta__link, .btn-primary'
    );

    const handlers: { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    btns.forEach(btn => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const leave = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return null;
}
// MR NEWS — Executive Morning Intelligence Platform
