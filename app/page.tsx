import React from 'react';
import Link from 'next/link';
import { ReadingMachineDemo } from './components/ReadingMachineDemo';
import { ClockSelector } from './components/ClockSelector';
import { ReportPanelModal } from './components/ReportPanelModal';

/* ASCII art for hero — MR NEWS styled */
const ASCII_ART = `                ...                    .:.::-::...                  ..--==++xxx++==--::..                                           ..::--==++x+x++==--...                  ..::-::.:.                   .. .               
               . .                   . ..:::.:..                 ..::-=+++++==--::..                                                     ..::--==+++++=-::..                 ....:::.. .                   . .              
                .                   ..:::::..                  .::--==+++==--.:..                                                           ..::--==++++=--::.                 ...:::.:..                   .               
                                   ....:....                 ..::-=+====::..                                                                     ..::==+====::..                 ..:.:.:..                                  
                                  ..:::.:..                .::--==+==--::.                        ....:.::::-:-:-::::.:....                        .::--==+==--::.                ..:.:.:..                                 
                                 ....:..                 ..::--===--::                       ..::-:-=+=++xxxxXxXxxxx++====:-::..                       .:--===--::..                 ..:.:..                                
                                ..:.:..                 ..:-=-=--::..                   ..::--++xxX###88@8@@@@@@@@@@@88##XXxx++--::..                   ..::--=-=-:..                 ..:.:..                               
                               .......                 ..:----::..                   ..::==xxX#8#88@8@8888#8#8#8#8#8888@8@88#8#Xxx==::..                   ..::----:..                 .......                              
                              ..:....                .::-----::..                 ..--=+XX##888#8##XXxx++++=+===+=+=++xxXX##88888##XX+=--..                 ..::-----::.                ....:..                             
                             . ... .               ..::-:-::..                 ..:-=+xx#####XX++==--::.:...... ......:.::--==++XX#####xx+=-:..                 ..::-:-::..               . ... .                            
                            .....                 ..::-:-::..                .::==xxXX#XXx+==--::..                       ..:.--==+xXX#XXxx==::.                ..::-:-::..                ......                           
                           . ...                 ..:.:::....               ..:-++xxXxx+=--:. .                                 . .:--=+xxXxx+=--..               ..:.:::.:..                 ... .                          
                            ...                 ..::-::.:.               .::==+xxxx+=--...                                          .:--=+xxxx+==::.               .::::-::..                .....                          
                           . .                 ..:.:::..               ..::==+++==-:..                                                 ..--==+++==::..               ..:::....                 . .                          
                          ...                  ...:::..               ..:-==+=+--::.                                                      ::--+++==-:..               ..:.:...                  . .                         
                           .                   ..:....               ..--===--::..                     . . . ... . . .                     ..::--===-:..               ....:..                   .                          
                                             ...:....               .:--===--:.                   ....:.:::::::::::::.:....                  ...--===--:.               ....:..                                             
                                             ..... .               ..-:---::..                 ....:::::::::::.:::::::::::....                 ..::---::..               . .....                                            
                                            ......                ..::---::.                ..:.:.:::.:....       ....:.:.:::.:..                .::---::..                ......                                           
                                             . .                 ..:::::..                 ....:....                     .........                 ..::-::..                 . .                                            
                                            ...                 ..:::::..                ...:....                           ....:...                ..:::::..                ....                                           
                                             .                  ...:.:..               . .....                                 ..... .               ....:...                  .                                            
                                                                ..:....               .....                                       ... .               ....:..                                                               
                                                               . ...                   .                                             .                   ... .                                                              
                                                                ...                                                                                      .....                                                              
                                                                 .                                                                                         .                                                                `;

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <Link href="/" className="topbar__brand" aria-label="MR NEWS home">
          <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3.2" />
            <ellipse cx="50" cy="50" rx="20" ry="46" stroke="currentColor" strokeWidth="2" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>MR NEWS</span>
        </Link>

        <nav className="topbar__nav" aria-label="Main navigation">
          <a href="#how" className="topbar__link">How It Works</a>
          <a href="#features" className="topbar__link">Features</a>
          <a href="#demo" className="topbar__link">Demo</a>
          <a href="#delivery" className="topbar__link">Delivery</a>
          <a href="#voices" className="topbar__link">Readers</a>
        </nav>

        <Link href="/login" className="topbar__cta" id="navSubscribe">Subscribe Free</Link>

        <div className="topbar__burger">
          <button className="burger-btn" aria-label="Toggle menu">
            <span className="burger-bars" aria-hidden="true">
              <span /><span /><span />
            </span>
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="container" id="main">

        {/* HERO */}
        <header className="hero">
          <div className="hero-art" aria-hidden="true">
            <pre>{ASCII_ART}</pre>
          </div>
          <div className="hero-content">
            <svg className="hero-mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <circle cx="60" cy="60" r="54" stroke="url(#hg)" strokeWidth="3" />
              <ellipse cx="60" cy="60" rx="24" ry="54" stroke="url(#hg)" strokeWidth="2" />
              <line x1="6" y1="60" x2="114" y2="60" stroke="url(#hg)" strokeWidth="2" />
              <path d="M16 35 Q60 48 104 35" stroke="url(#hg)" strokeWidth="1.6" opacity=".7" />
              <path d="M16 85 Q60 72 104 85" stroke="url(#hg)" strokeWidth="1.6" opacity=".7" />
              <defs>
                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--acc)" />
                  <stop offset="100%" stopColor="var(--acc-deep)" />
                </linearGradient>
              </defs>
            </svg>

            <p className="hero-eyebrow">Independent Intelligence · 600+ Wire Desks · Delivered Daily</p>

            <h1 className="hero-title">
              The executive morning briefing<br /><em>written with clarity.</em>
            </h1>

            <p className="hero-desc">
              Our editorial desk monitors six hundred international wire desks, research labs, and regulatory filings every night.
              We strip out PR noise, verify primary sources, and deliver a briefing you can finish before your first meeting.
            </p>

            <p className="hero-note">
              No subscription fee. No ads. No trackers. Free forever.<br />
              <strong>Your inbox. Your schedule. Your topics. Your briefing.</strong>
            </p>

            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary" id="heroSubscribe">Get started</Link>
              <a href="#how" className="btn btn-ghost">How it works</a>
              <a href="#voices" className="btn btn-ghost">What readers say</a>
            </div>
          </div>
        </header>

        <div className="rail">

          {/* SUBSCRIBE BLOCK */}
          <section className="subscribe-block" id="subscribe" aria-labelledby="sub-title">
            <div className="subscribe-block__header">
              <span className="subscribe-block__label">Subscribe</span>
            </div>
            <div className="subscribe-block__body">
              <h2 className="subscribe-block__title" id="sub-title">
                One click. Pick your <em>hour</em>.<br />Seven stories every morning.
              </h2>
              <p className="subscribe-block__desc">
                Register with Google, choose what time you want the briefing,
                toggle the topics you care about. That&apos;s it. One page, every morning.
              </p>
              <Link href="/login" className="btn btn-primary" id="subBtn" style={{maxWidth:'260px'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                Subscribe free with Google
              </Link>
              <p className="subscribe-block__note">No credit card · No spam · Cancel any time</p>
            </div>
          </section>

          {/* STATS */}
          <div className="stats" aria-label="Key numbers">
            <div className="stat">
              <span className="stat__num">600+</span>
              <span className="stat__lbl">Sources scanned</span>
            </div>
            <div className="stat">
              <span className="stat__num">07</span>
              <span className="stat__lbl">Stories per issue</span>
            </div>
            <div className="stat">
              <span className="stat__num">05 min</span>
              <span className="stat__lbl">Average read time</span>
            </div>
            <div className="stat">
              <span className="stat__num">61K</span>
              <span className="stat__lbl">Subscribers worldwide</span>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <section id="how" aria-labelledby="how-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="how-title">How It Works</h2>
            </div>
            <div className="pillars-grid">
              <div className="pillar-card">
                <span className="pillar-num">Step 01</span>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 4h18v14H3z" /><path d="M7 8h10M7 12h7" /><path d="M8 18l-2 3M16 18l2 3" />
                  </svg>
                </div>
                <h3 className="pillar-title">Continuous Wire Monitoring</h3>
                <p className="pillar-body">Wire services, research repositories, regulator dockets, and technical dispatches. <strong>600+ sources per night.</strong> Relentless verification. No PR pitches.</p>
              </div>
              <div className="pillar-card">
                <span className="pillar-num">Step 02</span>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M12 3v9l7 4" />
                  </svg>
                </div>
                <h3 className="pillar-title">Signals That Matter</h3>
                <p className="pillar-body">Every candidate development is vetted for <strong>technical merit, capital flows, and market disruption.</strong> Only the seven most consequential make the cut.</p>
              </div>
              <div className="pillar-card">
                <span className="pillar-num">Step 03</span>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5M8 13h8M8 17h5" />
                  </svg>
                </div>
                <h3 className="pillar-title">Written With Precision</h3>
                <p className="pillar-body">Clear, direct prose. No filler. <strong>Curated by senior analysts</strong> so you know exactly who wins, who loses, and what shifts next.</p>
              </div>
            </div>
          </section>

          {/* DEMO */}
          <section id="demo" aria-labelledby="demo-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="demo-title">The Wire Desk</h2>
            </div>
            <ReadingMachineDemo />
          </section>

          {/* FEATURES */}
          <section id="features" aria-labelledby="features-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="features-title">Features</h2>
            </div>
            <div className="features-grid">
              {[
                { icon: 'M12 7v5l3 2', circle: true, title: 'Pick Your Hour', desc: '6 a.m. for early risers. Noon for night owls. Any hour you like.' },
                { icon: 'M4 4h16v16H4zM9 9h6M9 13h6M9 17h3', title: 'Pick Your Topics', desc: 'Policy, chips, labs, funding, safety, science. You choose.' },
                { icon: 'M3 12h6l3-6 3 12 3-6h3', title: 'Three Lengths', desc: 'Skim in 1 min, Standard in 5, or Deep in 12.' },
                { icon: 'M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z', title: 'Corrections First', desc: 'When we get it wrong, the fix runs at the top. Every time.' },
                { icon: 'M12 3v9l7 4', circle: true, title: 'Global Sources', desc: 'English, Mandarin, German, French, Japanese — read natively.' },
                { icon: 'M3 6h16v14H3zM3 10h16M8 6V4M16 6V4', title: 'Archive Access', desc: 'Every issue ever sent, searchable.' },
                { icon: 'M12 3v12M7 10l5 5 5-5M5 21h14', title: 'Zero Trackers', desc: 'No pixels, no beacons, no ads.' },
                { icon: 'M8 12l3 3 5-6', circle: true, title: 'Free Forever', desc: 'Funded by a small group of patient readers.' },
                { icon: 'M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h5', title: 'Senior Editorial Desk', desc: 'Every issue is vetted by veteran analysts before dispatch.' },
              ].map(({ icon, circle, title, desc }) => (
                <div className="feat-card" key={title}>
                  <div className="feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      {circle && <circle cx="12" cy="12" r="9" />}
                      <path d={icon} />
                    </svg>
                  </div>
                  <p className="feat-title">{title}</p>
                  <p className="feat-desc">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DELIVERY */}
          <section id="delivery" aria-labelledby="delivery-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="delivery-title">Delivery</h2>
            </div>
            <div className="delivery">
              <div>
                <p className="delivery__eyebrow">Your Morning, Your Rules</p>
                <h3 className="delivery__title">You pick the <em>hour</em>, the <em>length</em>, the <em>topics</em></h3>
                <p className="delivery__desc">Registering takes one click. After that, you are in the driver&apos;s seat.</p>
                <ul className="delivery__list">
                  <li className="delivery__item"><span className="delivery__check">✓</span><span>Choose a delivery time that matches your morning</span></li>
                  <li className="delivery__item"><span className="delivery__check">✓</span><span>Toggle sections on or off: policy, chips, science, funding</span></li>
                  <li className="delivery__item"><span className="delivery__check">✓</span><span>Switch reading length any day, instantly</span></li>
                  <li className="delivery__item"><span className="delivery__check">✓</span><span>Pause for a week without losing your place</span></li>
                </ul>
              </div>
              <ClockSelector />
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section id="voices" aria-labelledby="voices-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="voices-title">What People Say</h2>
            </div>
            <div className="testimonials">
              <div className="testimonials-track">
                <div className="t-row t-row-1" style={{'--t-dur': '120s'} as React.CSSProperties}>
                  {[
                    { q: 'I used to spend forty minutes every morning opening twelve tabs. Now I read MR NEWS in five and I actually understand what I read.', a: 'Priya N.', i: 'PN' },
                    { q: 'The corrections column alone is worth subscribing. Very few newsletters have the editorial discipline to publish corrections at the top.', a: 'Marcus H.', i: 'MH' },
                    { q: 'I forwarded Wednesday\'s issue to my entire leadership team. For the first time we all walked in knowing the same facts.', a: 'Elena V.', i: 'EV' },
                    { q: 'Five minutes with MR NEWS replaces my entire morning scroll. The signal-to-noise ratio is unmatched.', a: 'David K.', i: 'DK' },
                    { q: 'Finally, a newsletter that doesn\'t treat me like a click target. Clean, calm, informative.', a: 'Sarah L.', i: 'SL' },
                    { q: 'I used to spend forty minutes every morning opening twelve tabs. Now I read MR NEWS in five and I actually understand what I read.', a: 'Priya N.', i: 'PN' },
                    { q: 'The corrections column alone is worth subscribing. Very few newsletters have the editorial discipline to publish corrections at the top.', a: 'Marcus H.', i: 'MH' },
                    { q: 'I forwarded Wednesday\'s issue to my entire leadership team. For the first time we all walked in knowing the same facts.', a: 'Elena V.', i: 'EV' },
                    { q: 'Five minutes with MR NEWS replaces my entire morning scroll. The signal-to-noise ratio is unmatched.', a: 'David K.', i: 'DK' },
                    { q: 'Finally, a newsletter that doesn\'t treat me like a click target. Clean, calm, informative.', a: 'Sarah L.', i: 'SL' },
                  ].map(({ q, a, i }, idx) => (
                    <div className="t-card" key={idx}>
                      <span className="t-avatar">{i}</span>
                      <div className="t-content">
                        <p className="t-quote">&ldquo;{q}&rdquo;</p>
                        <span className="t-author">{a}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="t-row t-row-2" style={{'--t-dur': '140s'} as React.CSSProperties}>
                  {[
                    { q: 'The global coverage is what sold me. They read sources in six languages and I get it all in English in five minutes.', a: 'Tomás R.', i: 'TR' },
                    { q: 'I\'m a policy researcher. The fact that they cite original filings instead of just parroting press releases is rare.', a: 'Aisha M.', i: 'AM' },
                    { q: 'I\'ve tried dozens of morning newsletters. MR NEWS is the only one that reads like a sharp analyst wrote it specifically for operators.', a: 'James W.', i: 'JW' },
                    { q: 'My team switched from three different news services to just MR NEWS. Saves us hours every week.', a: 'Lin C.', i: 'LC' },
                    { q: 'The "Deep" reading mode is incredible — 12 minutes of real analysis, not just summaries.', a: 'Freya B.', i: 'FB' },
                    { q: 'The global coverage is what sold me. They read sources in six languages and I get it all in English in five minutes.', a: 'Tomás R.', i: 'TR' },
                    { q: 'I\'m a policy researcher. The fact that they cite original filings instead of just parroting press releases is rare.', a: 'Aisha M.', i: 'AM' },
                    { q: 'I\'ve tried dozens of morning newsletters. MR NEWS is the only one that reads like a sharp analyst wrote it specifically for operators.', a: 'James W.', i: 'JW' },
                    { q: 'My team switched from three different news services to just MR NEWS. Saves us hours every week.', a: 'Lin C.', i: 'LC' },
                    { q: 'The "Deep" reading mode is incredible — 12 minutes of real analysis, not just summaries.', a: 'Freya B.', i: 'FB' },
                  ].map(({ q, a, i }, idx) => (
                    <div className="t-card" key={idx}>
                      <span className="t-avatar">{i}</span>
                      <div className="t-content">
                        <p className="t-quote">&ldquo;{q}&rdquo;</p>
                        <span className="t-author">{a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA GRID */}
          <section aria-label="Quick links">
            <div className="cta-grid">
              <Link href="/login" className="cta-cell">
                <svg className="cta-cell__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" />
                </svg>
                <div>
                  <p className="cta-cell__label">Subscribe</p>
                  <p className="cta-cell__sub">Free. One Google click.</p>
                </div>
              </Link>
              <a href="#features" className="cta-cell">
                <svg className="cta-cell__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 4h16v16H4zM9 9h6M9 13h6M9 17h3" />
                </svg>
                <div>
                  <p className="cta-cell__label">Features</p>
                  <p className="cta-cell__sub">Eight reasons to switch.</p>
                </div>
              </a>
              <a href="#demo" className="cta-cell">
                <svg className="cta-cell__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" /><path d="M12 3v9l7 4" />
                </svg>
                <div>
                  <p className="cta-cell__label">The Wire Desk</p>
                  <p className="cta-cell__sub">See the editorial pipeline.</p>
                </div>
              </a>
              <a href="#voices" className="cta-cell">
                <svg className="cta-cell__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                </svg>
                <div>
                  <p className="cta-cell__label">Readers</p>
                  <p className="cta-cell__sub">What people say.</p>
                </div>
              </a>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="foot">

        {/* ── TOP: Newsletter CTA strip ── */}
        <div className="foot-cta">
          <div className="foot-cta__inner">
            <div className="foot-cta__copy">
              <p className="foot-cta__label">Stay informed</p>
              <h2 className="foot-cta__title">Seven stories. Five minutes. Every morning.</h2>
              <p className="foot-cta__desc">Free, forever. No ads, no trackers, no paywalls.</p>
            </div>
            <Link href="/login" className="btn btn-primary foot-cta__btn" id="footSubscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              Subscribe free
            </Link>
          </div>
        </div>

        {/* ── MID: 4-col nav grid ── */}
        <div className="foot-grid">
          {/* Brand cell */}
          <div className="foot-grid__brand">
            <p className="foot-brand">
              <span className="foot-brand__mr">MR</span>
              <span className="foot-brand__dot">.</span>
              <span className="foot-brand__news">NEWS</span>
            </p>
            <p className="foot-brand__tag">Curated by analysts,<br />written for leaders</p>
            <div className="foot-socials">
              <a href="#" className="foot-social" aria-label="RSS feed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="foot-social" aria-label="Mastodon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.542-.809 3.542-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.791h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z" />
                </svg>
              </a>
              <a href="#" className="foot-social" aria-label="Contact us">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav cols */}
          <div className="foot-col">
            <h3 className="foot-col__head">The Paper</h3>
            <nav aria-label="Footer: The Paper">
              <a href="#how" className="foot-col__link">How It Works</a>
              <a href="#demo" className="foot-col__link">See It Read</a>
              <a href="#features" className="foot-col__link">Features</a>
              <a href="#delivery" className="foot-col__link">Delivery</a>
              <a href="#voices" className="foot-col__link">Reader Stories</a>
            </nav>
          </div>

          <div className="foot-col">
            <h3 className="foot-col__head">Account</h3>
            <nav aria-label="Footer: Account">
              <Link href="/login" className="foot-col__link">Subscribe Free</Link>
              <a href="#subscribe" className="foot-col__link">Manage Preferences</a>
              <a href="#" className="foot-col__link">Archive</a>
              <a href="#" className="foot-col__link">Referrals</a>
            </nav>
          </div>

          <div className="foot-col">
            <h3 className="foot-col__head">Company</h3>
            <nav aria-label="Footer: Company">
              <a href="#" className="foot-col__link">About</a>
              <a href="#" className="foot-col__link">Editorial Standards</a>
              <a href="#" className="foot-col__link">Contact</a>
              <a href="#" className="foot-col__link">Corrections Policy</a>
            </nav>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="foot-stats">
          <div className="foot-stat">
            <span className="foot-stat__n">600+</span>
            <span className="foot-stat__l">Sources nightly</span>
          </div>
          <div className="foot-stat">
            <span className="foot-stat__n">61K</span>
            <span className="foot-stat__l">Subscribers</span>
          </div>
          <div className="foot-stat">
            <span className="foot-stat__n">5 min</span>
            <span className="foot-stat__l">Read time</span>
          </div>
          <div className="foot-stat">
            <span className="foot-stat__n">100%</span>
            <span className="foot-stat__l">Free, forever</span>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="foot-bar">
          <span className="foot-bar__copy">&copy; {new Date().getFullYear()} MR NEWS. All rights reserved.</span>
          <div className="foot-bar__links">
            <a href="#">Privacy Policy</a>
            <span aria-hidden="true">&middot;</span>
            <a href="#">Terms of Service</a>
            <span aria-hidden="true">&middot;</span>
            <a href="#">Corrections</a>
          </div>
        </div>

      </footer>

      <ReportPanelModal />
    </>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
