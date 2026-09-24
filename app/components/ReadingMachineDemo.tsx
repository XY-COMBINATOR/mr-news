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
        <b>Editorial Verification Desk</b>
        <span>Live Pipeline</span>
      </div>
      <p className="demo__prompt">Incoming report from primary international wire</p>
      <div className="demo__input" id="demoInput">
        {typedText}
        <span className="cursor" aria-hidden="true" />
      </div>
      <div className="demo__panels">
        <div className={`demo__panel ${visiblePanels.includes(1) ? 'show' : ''}`} data-panel="1">
          <h5>Primary Entities</h5>
          <p>
            <span className="chip">Company</span>
            <span className="chip">Jurisdiction</span>
            <span className="chip">Architecture</span>
          </p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(2) ? 'show' : ''}`} data-panel="2">
          <h5>Macro Impact Rating</h5>
          <div className="meter">
            <span>0</span>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: visiblePanels.includes(2) ? '88%' : '0%' }}
              />
            </div>
            <span>100</span>
          </div>
          <p style={{ marginTop: '10px', fontSize: '.82rem' }}>Ranked Consequential: 1 of 47 candidates</p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(3) ? 'show' : ''}`} data-panel="3">
          <h5>Cross-Verification</h5>
          <p>
            Neutral tone confirmed. Zero PR puffery. Primary claims corroborated across{' '}
            <b style={{ fontFamily: 'var(--f-code)', color: 'var(--code)' }}>3</b> institutional wire services.
          </p>
        </div>
        <div className={`demo__panel ${visiblePanels.includes(4) ? 'show' : ''}`} data-panel="4">
          <h5>Executive Takeaway</h5>
          <p>Independent research consortium released production-grade open weights matching proprietary systems, compressing compute costs for enterprise buyers.</p>
        </div>
      </div>
      <p className="demo__foot">
        <b>Fig. 1</b> Rigorous editorial vetting applied to every candidate story before send.
      </p>
    </div>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
