'use client';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getEditionNumber(): number {
  // Vol II started Jan 1 2026 — days since then
  const start = new Date('2026-01-01');
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / 86400000) + 265;
}

export function Dateline() {
  const now = new Date();
  const day = DAYS[now.getDay()];
  const date = now.getDate();
  const month = MONTHS[now.getMonth()];
  const year = now.getFullYear();
  const edition = getEditionNumber();

  return (
    <div className="dateline" aria-label="Edition information">
      <span>{day}, {date} {month} {year}</span>
      <span className="dateline__sep" aria-hidden="true">✦</span>
      <span>Vol. II, No. {edition}</span>
      <span className="dateline__sep" aria-hidden="true">✦</span>
      <span>Worldwide Edition</span>
    </div>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
