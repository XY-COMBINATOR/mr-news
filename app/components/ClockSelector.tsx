'use client';

import React, { useState } from 'react';

export function ClockSelector() {
  const [selectedHour, setSelectedHour] = useState<number>(6);

  const hourAngle = (selectedHour % 12) * 30;

  return (
    <div className="clock reveal is-in" style={{ '--d': '.1s' } as React.CSSProperties}>
      <p className="clock__label">Your briefing arrives at</p>
      <div className="clock__face">
        <svg viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="86" fill="none" stroke="#1a1510" strokeWidth="2" />
          <circle cx="90" cy="90" r="76" fill="#e8ddc2" stroke="#1a1510" strokeWidth="1" />
          <g stroke="#1a1510" strokeWidth="1.5">
            <line x1="90" y1="14" x2="90" y2="22" />
            <line x1="90" y1="158" x2="90" y2="166" />
            <line x1="14" y1="90" x2="22" y2="90" />
            <line x1="158" y1="90" x2="166" y2="90" />
          </g>
          <text x="90" y="34" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fontWeight="700" fill="#1a1510">12</text>
          <text x="152" y="95" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fontWeight="700" fill="#1a1510">3</text>
          <text x="90" y="158" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fontWeight="700" fill="#1a1510">6</text>
          <text x="28" y="95" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fontWeight="700" fill="#1a1510">9</text>
          <line
            className="clock__hand"
            id="clockHour"
            x1="90"
            y1="90"
            x2="90"
            y2="50"
            stroke="#1a1510"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transform: `rotate(${hourAngle}deg)` }}
          />
          <line
            className="clock__hand"
            id="clockMin"
            x1="90"
            y1="90"
            x2="90"
            y2="30"
            stroke="#7a2418"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transform: 'rotate(0deg)' }}
          />
          <circle cx="90" cy="90" r="4" fill="#1a1510" />
        </svg>
      </div>
      <p className="clock__time" id="clockTime">
        {String(selectedHour).padStart(2, '0')}:00
      </p>
      <p className="clock__tz">Local time, adjustable anytime</p>
      <div className="clock__slots" id="clockSlots">
        {[5, 6, 7, 8, 12].map((h) => (
          <button
            key={h}
            type="button"
            className={`slot ${selectedHour === h ? 'active' : ''}`}
            onClick={() => setSelectedHour(h)}
          >
            {String(h).padStart(2, '0')}:00
          </button>
        ))}
      </div>
    </div>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
