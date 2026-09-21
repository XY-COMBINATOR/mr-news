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

            <p className="hero-eyebrow">AI-powered · 600 sources · Delivered daily</p>

            <h1 className="hero-title">
              The AI newsletter that<br /><em>reads itself.</em>
            </h1>

            <p className="hero-desc">
              We point an army of language models at six hundred news sources every night.
              They read everything, throw away duplicates, rank what matters, and write a
              briefing you can finish in five minutes.
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
                <h3 className="pillar-title">Reads Everything</h3>
                <p className="pillar-body">Wire services, research preprints, regulator filings, press releases. <strong>600+ sources per night.</strong> The models do not get tired. They do not skim.</p>
              </div>
              <div className="pillar-card">
                <span className="pillar-num">Step 02</span>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M12 3v9l7 4" />
                  </svg>
                </div>
                <h3 className="pillar-title">Decides What Matters</h3>
                <p className="pillar-body">Every candidate story is scored on <strong>impact, novelty, and credibility.</strong> Only seven make the cut.</p>
              </div>
              <div className="pillar-card">
                <span className="pillar-num">Step 03</span>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5M8 13h8M8 17h5" />
                  </svg>
                </div>
                <h3 className="pillar-title">Writes It Plainly</h3>
                <p className="pillar-body">No jargon. No hedging. Then <strong>a human editor reads the whole issue</strong> before it goes out.</p>
              </div>
            </div>
          </section>

          {/* DEMO */}
          <section id="demo" aria-labelledby="demo-title">
            <div className="sec-hd">
              <h2 className="sec-eyebrow" id="demo-title">See It Read</h2>
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
                { icon: 'M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h5', title: 'Human Reviewed', desc: 'Every issue reviewed by editors before send.' },
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
                    { q: 'The corrections column alone is worth subscribing. No other AI newsletter admits when it gets something wrong.', a: 'Marcus H.', i: 'MH' },
                    { q: 'I forwarded Wednesday\'s issue to my entire leadership team. For the first time we all walked in knowing the same facts.', a: 'Elena V.', i: 'EV' },
                    { q: 'Five minutes with MR NEWS replaces my entire morning scroll. The signal-to-noise ratio is unmatched.', a: 'David K.', i: 'DK' },
                    { q: 'Finally, a newsletter that doesn\'t treat me like a click target. Clean, calm, informative.', a: 'Sarah L.', i: 'SL' },
                    { q: 'I used to spend forty minutes every morning opening twelve tabs. Now I read MR NEWS in five and I actually understand what I read.', a: 'Priya N.', i: 'PN' },
                    { q: 'The corrections column alone is worth subscribing. No other AI newsletter admits when it gets something wrong.', a: 'Marcus H.', i: 'MH' },
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
                    { q: 'I\'ve tried every AI newsletter. MR NEWS is the only one that doesn\'t feel like it was written by a chatbot.', a: 'James W.', i: 'JW' },
                    { q: 'My team switched from three different news services to just MR NEWS. Saves us hours every week.', a: 'Lin C.', i: 'LC' },
                    { q: 'The "Deep" reading mode is incredible — 12 minutes of real analysis, not just summaries.', a: 'Freya B.', i: 'FB' },
                    { q: 'The global coverage is what sold me. They read sources in six languages and I get it all in English in five minutes.', a: 'Tomás R.', i: 'TR' },
                    { q: 'I\'m a policy researcher. The fact that they cite original filings instead of just parroting press releases is rare.', a: 'Aisha M.', i: 'AM' },
                    { q: 'I\'ve tried every AI newsletter. MR NEWS is the only one that doesn\'t feel like it was written by a chatbot.', a: 'James W.', i: 'JW' },
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
                  <p className="cta-cell__label">See It Read</p>
                  <p className="cta-cell__sub">Watch the machine work.</p>
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
      <footer>
        <div className="foot">
          <div>
            <p className="foot__brand">MR<span>.</span>NEWS</p>
            <p className="foot__tag">Written by machines, checked by people</p>
          </div>
          <div className="foot__cols">
            <div className="foot__col">
              <h4>The Paper</h4>
              <a href="#how">How It Works</a>
              <a href="#demo">See It Read</a>
              <a href="#features">Features</a>
            </div>
            <div className="foot__col">
              <h4>Account</h4>
              <Link href="/login">Subscribe Free</Link>
              <a href="#" id="footReport">Report a Problem</a>
            </div>
            <div className="foot__col">
              <h4>Elsewhere</h4>
              <a href="#">RSS</a>
              <a href="#">Mastodon</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <p className="foot__bottom">
          <span>&copy; {new Date().getFullYear()} MR NEWS. All rights reserved.</span>
          <span><a href="#">Privacy</a> &middot; <a href="#">Terms</a></span>
        </p>
      </footer>

      <ReportPanelModal />
    </>
  );
}
