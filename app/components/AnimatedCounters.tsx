'use client';

import React, { useEffect, useState, useRef } from 'react';

interface StatProps {
  target: number;
  label: string;
  suffix?: string;
  delay?: string;
}

function StatBox({ target, label, suffix, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  const animateCount = () => {
    const dur = 1600;
    const start = performance.now();

    const frame = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * e));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const formatted = count >= 1000 ? count.toLocaleString('en-US') : String(count);

  return (
    <div
      className="stat reveal is-in"
      ref={ref}
      style={{ '--d': delay || '0s' } as React.CSSProperties}
    >
      <p className="stat__num">
        {formatted}
        {suffix && <sup>{suffix}</sup>}
      </p>
      <p className="stat__lbl">{label}</p>
    </div>
  );
}

export function AnimatedCounters() {
  return (
    <section className="stats">
      <StatBox target={61000} label="Readers" />
      <StatBox target={600} label="Sources read nightly" suffix="+" delay=".06s" />
      <StatBox target={7} label="Stories per issue" delay=".12s" />
      <StatBox target={5} label="Average read time" suffix="m" delay=".18s" />
    </section>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
