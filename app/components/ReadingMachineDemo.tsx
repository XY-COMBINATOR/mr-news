'use client';

import React, { useEffect, useState, useRef } from 'react';

export function ReadingMachineDemo() {
  const headline = 'Small lab releases open weight model matching frontier benchmarks at one fortieth the cost';
  const [typedText, setTypedText] = useState('');
  const [visiblePanels, setVisiblePanels] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun) {
            setHasRun(true);
            runTypewriter();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasRun]);

  const runTypewriter = () => {
    let i = 0;
    const type = () => {
      if (i <= headline.length) {
        setTypedText(headline.slice(0, i));
        i++;
        setTimeout(type, 22 + Math.random() * 18);
      } else {
        setTimeout(() => setVisiblePanels((prev) => [...prev, 1]), 200);
        setTimeout(() => setVisiblePanels((prev) => [...prev, 2]), 500);
        setTimeout(() => setVisiblePanels((prev) => [...prev, 3]), 800);
        setTimeout(() => setVisiblePanels((prev) => [...prev, 4]), 1200);
      }
    };
    type();
  };

  return (
    <div className="demo reveal is-in" id="demoBox" ref={containerRef}>
      <div className="demo__head">
        <b>The Reading Machine</b>
        <span>live demo</span>
      </div>
      <p className="demo__prompt">Incoming headline from the wire</p>
      <div className="demo__input" id="demoInput">
        {typedText}
        <span className="cursor" aria-hidden="true" />
      </div>
      <div className="demo__panels">
        <div className={`demo__panel ${visiblePanels.includes(1) ? 'show' : ''}`} data-panel="1">
          <h5>Entities</h5>
          <p>
            <span className="chip">Company</span>
            <span className="chip">Country</span>
            <span className="chip">Model</span>
          </p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(2) ? 'show' : ''}`} data-panel="2">
          <h5>Impact score</h5>
          <div className="meter">
            <span>0</span>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: visiblePanels.includes(2) ? '78%' : '0%' }}
              />
            </div>
            <span>100</span>
          </div>
          <p style={{ marginTop: '10px', fontSize: '.82rem' }}>Ranked 1 of 47 candidates</p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(3) ? 'show' : ''}`} data-panel="3">
          <h5>Bias check</h5>
          <p>
            Neutral tone detected. No loaded verbs. Sources verified across{' '}
            <b style={{ fontFamily: 'var(--f-code)', color: 'var(--code)' }}>3</b> wire services.
          </p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(4) ? 'show' : ''}`} data-panel="4">
          <h5>Summary</h5>
          <p>A small lab released an open model that matches frontier benchmarks at a fraction of the cost.</p>
        </div>
      </div>
      <p className="demo__foot">
        <b>Fig. 1</b> What happens to every story before it reaches your inbox.
      </p>
    </div>
  );
}
