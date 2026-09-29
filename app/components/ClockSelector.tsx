'use client';

import React from 'react';

/* ─────────────────────────────────────────────────────────────────
   DeliveryClock
   Fixed display: briefing delivered every night at 22:00.
   No time selection: shows the single delivery window.
   ───────────────────────────────────────────────────────────────── */

const HOUR = 22; /* 22:00: fixed delivery time */
const HOUR_ANGLE = (HOUR % 12) * 30; /* 300° on 12-hour dial */

export function ClockSelector() {
  return (
    <div className="d-clock">

      {/* Eyebrow */}
      <div className="d-clock__header">
        <span className="d-clock__eyebrow">Nightly Dispatch Schedule</span>
        <span className="d-clock__live-dot" />
      </div>

      {/* Analog face */}
      <div className="d-clock__face" aria-label="Clock showing 22:00" role="img">
        <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
          {/* Outer ring */}
          <circle cx="90" cy="90" r="86"
            fill="#0d0d0d"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.5" />

          {/* Inner dashed accent ring */}
          <circle cx="90" cy="90" r="76"
            fill="#141414"
            stroke="rgba(255,101,0,0.3)"
            strokeWidth="1"
            strokeDasharray="3 4" />

          {/* 12 tick marks */}
          {Array.from({ length: 12 }, (_, i) => {
            const a  = (i * 30 * Math.PI) / 180;
            const x1 = Math.round((90 + 72 * Math.sin(a)) * 100) / 100;
            const y1 = Math.round((90 - 72 * Math.cos(a)) * 100) / 100;
            const x2 = Math.round((90 + 81 * Math.sin(a)) * 100) / 100;
            const y2 = Math.round((90 - 81 * Math.cos(a)) * 100) / 100;
            const major = i % 3 === 0;
            return (
              <line key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={major ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={major ? 1.5 : 1} />
            );
          })}


          {/* Cardinal labels */}
          <text x="90"  y="32"  textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.55)">12</text>
          <text x="154" y="94"  textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.55)">3</text>
          <text x="90"  y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.55)">6</text>
          <text x="26"  y="94"  textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.55)">9</text>

          {/* 22:00 label highlight */}
          <text x="90" y="94" textAnchor="middle"
            fontFamily="monospace" fontSize="11" fontWeight="700"
            fill="rgba(255,101,0,0.65)">22:00</text>

          {/* Hour hand: fixed at 10 o'clock (300°) */}
          <line
            className="clock__hand"
            x1="90" y1="90" x2="90" y2="48"
            stroke="#FF6500"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ transform: `rotate(${HOUR_ANGLE}deg)` }}
          />

          {/* Minute hand: at 12 (on-the-hour) */}
          <line
            className="clock__hand"
            x1="90" y1="90" x2="90" y2="28"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ transform: 'rotate(0deg)' }}
          />

          {/* Centre pip */}
          <circle cx="90" cy="90" r="5"   fill="#FF6500" />
          <circle cx="90" cy="90" r="2.5" fill="#fff" />
        </svg>
      </div>

      {/* Digital time badge */}
      <div className="d-clock__badge">
        <span className="d-clock__time">22:00</span>
        <span className="d-clock__period">Every single night</span>
      </div>

      {/* Info strip */}
      <div className="d-clock__strip">
        <div className="d-clock__stat">
          <span className="d-clock__stat-val">22:00</span>
          <span className="d-clock__stat-lbl">Dispatch</span>
        </div>
        <div className="d-clock__divider" aria-hidden="true" />
        <div className="d-clock__stat">
          <span className="d-clock__stat-val">5 min</span>
          <span className="d-clock__stat-lbl">Read time</span>
        </div>
        <div className="d-clock__divider" aria-hidden="true" />
        <div className="d-clock__stat">
          <span className="d-clock__stat-val">Daily</span>
          <span className="d-clock__stat-lbl">Cadence</span>
        </div>
      </div>

      {/* Pipeline milestones */}
      <div className="d-clock__timeline">
        <div className="d-clock__timeline-step">
          <span className="d-clock__timeline-time">21:15</span>
          <span className="d-clock__timeline-desc">Autonomous scan of 600+ sources</span>
        </div>
        <div className="d-clock__timeline-step">
          <span className="d-clock__timeline-time">21:45</span>
          <span className="d-clock__timeline-desc">Human verification and editorial review</span>
        </div>
        <div className="d-clock__timeline-step d-clock__timeline-step--highlight">
          <span className="d-clock__timeline-time">22:00</span>
          <span className="d-clock__timeline-desc">Dispatched directly to your inbox</span>
        </div>
      </div>

    </div>
  );
}
