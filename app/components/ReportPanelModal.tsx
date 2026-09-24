'use client';

import React, { useState, useEffect } from 'react';

export function ReportPanelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [reportKind, setReportKind] = useState('error');
  const [message, setMessage] = useState('');
  const [fineText, setFineText] = useState('We reply to every message within a day.');
  const [fineColor, setFineColor] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    setFineText(`Thank you. Report filed under ${reportKind}.`);
    setFineColor('var(--sea)');
    setMessage('');

    setTimeout(() => {
      setFineText('We reply to every message within a day.');
      setFineColor('');
      setIsOpen(false);
    }, 2400);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="floaters">
        <button
          className={`float-btn float-btn--top ${showTopBtn ? 'show' : ''}`}
          id="topBtn"
          aria-label="Back to top"
          onClick={handleBackToTop}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <button
          className="float-btn float-btn--report"
          id="reportBtn"
          aria-label="Report a problem"
          aria-expanded={isOpen}
          onClick={handleOpen}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v5M12 17h.01" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </button>
      </div>

      <div
        className={`report-panel ${isOpen ? 'open' : ''}`}
        id="reportPanel"
        role="dialog"
        aria-labelledby="reportTitle"
      >
        <div className="report-panel__head">
          <div>
            <div className="report-panel__title" id="reportTitle">Report &amp; Feedback</div>
            <div className="report-panel__sub">Help us improve the paper.</div>
          </div>
          <button
            className="report-panel__close"
            id="reportClose"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="report-options" role="radiogroup" aria-label="Report type">
          {[
            { kind: 'error', label: 'Error', sub: 'Something is wrong' },
            { kind: 'idea', label: 'Idea', sub: 'Feature request' },
            { kind: 'content', label: 'Content', sub: 'Bad summary' },
            { kind: 'other', label: 'Other', sub: 'Just saying hi' },
          ].map((opt) => (
            <button
              key={opt.kind}
              type="button"
              className={`report-opt ${reportKind === opt.kind ? 'active' : ''}`}
              role="radio"
              aria-checked={reportKind === opt.kind}
              onClick={() => setReportKind(opt.kind)}
            >
              <b>{opt.label}</b> {opt.sub}
            </button>
          ))}
        </div>

        <label htmlFor="reportMsg" className="sr">Your message</label>
        <textarea
          id="reportMsg"
          placeholder="Tell us what happened"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="report-panel__send" id="reportSend" type="button" onClick={handleSend}>
          Send Report
        </button>
        <p className="report-panel__fine" id="reportFine" style={{ color: fineColor }}>
          {fineText}
        </p>
      </div>
    </>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
