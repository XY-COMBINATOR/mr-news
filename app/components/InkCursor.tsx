'use client';

import { useEffect, useRef } from 'react';

export function InkCursor() {
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches && window.innerWidth > 900;

    if (!hasHover || reduceMotion) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const t = document.createElement('div');
      t.className = 'ink-trail';
      t.style.left = `${mx}px`;
      t.style.top = `${my}px`;
      document.body.appendChild(t);

      setTimeout(() => {
        t.style.transition = 'opacity .6s, transform .6s';
        t.style.opacity = '0';
        t.style.transform = 'translate(-50%,-50%) scale(.3)';
      }, 20);

      setTimeout(() => t.remove(), 800);
    };

    const handleClick = (e: MouseEvent) => {
      const s = document.createElement('div');
      s.className = 'splash';
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    let animationFrameId: number;
    const loop = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      if (coreRef.current) {
        coreRef.current.style.left = `${cx}px`;
        coreRef.current.style.top = `${cy}px`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    const boundSet = new WeakSet();
    const bindHover = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        'a, button, .feat, .quote, .pillar, .slot, .report-opt, input, label, .float-btn, .brand__logo, .register-btn'
      );
      elements.forEach((el) => {
        if (boundSet.has(el)) return;
        boundSet.add(el);
        el.addEventListener('mouseenter', () => coreRef.current?.classList.add('hover'));
        el.addEventListener('mouseleave', () => coreRef.current?.classList.remove('hover'));
      });
    };

    bindHover();
    const timeoutId = setTimeout(bindHover, 1200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return <div className="ink-dot ink-dot--core" id="inkCore" ref={coreRef} aria-hidden="true" />;
}
// MR NEWS — Executive Morning Intelligence Platform
