import React from 'react';
import Link from 'next/link';
import { ReadingMachineDemo } from './components/ReadingMachineDemo';
import { ClockSelector } from './components/ClockSelector';
import { ReportPanelModal } from './components/ReportPanelModal';

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* ── STICKY NAV ── */}
      <nav className="nav" aria-label="Main navigation">
        <p className="nav__logo">MR<span>.</span>NEWS</p>
        <div className="nav__links">
          <a href="#how">How It Works</a>
          <a href="#demo">Demo</a>
          <a href="#features">Features</a>
          <a href="#voices">Readers</a>
          <Link href="/login" className="nav__cta" id="navRegister">
            Subscribe Free →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__left">
          <p className="hero__eyebrow">The Daily Intelligence Briefing</p>
          <h1 className="hero__title">
            The AI newsletter<br />that <em>reads itself</em>
          </h1>
          <div className="hero__rule" />
          <p className="hero__body">
            We point an army of <b>language models</b> at six hundred news sources
            every night. They read everything, throw away duplicates, rank what
            matters, and write a briefing you can finish in five minutes.
          </p>
          <div className="hero__actions">
            <Link href="/login" className="btn-primary" id="heroSubscribe">
              Start Reading Free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a href="#how" className="btn-secondary">See How It Works</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <div className="hero__stat">
            <span className="hero__stat-num">600<span style={{color:'var(--white-3)',fontSize:'2rem'}}>+</span></span>
            <span className="hero__stat-label">Sources scanned nightly</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">07</span>
            <span className="hero__stat-label">Stories per briefing</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">05<span style={{color:'var(--white-3)',fontSize:'2rem'}}>min</span></span>
            <span className="hero__stat-label">Average reading time</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">61K</span>
            <span className="hero__stat-label">Subscribers worldwide</span>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          <div className="ticker__set">
            <span>600 sources scanned continuously</span>
            <i>◆</i>
            <span>Duplicates removed by semantic similarity</span>
            <i>◆</i>
            <span>Ranked by real-world impact</span>
            <i>◆</i>
            <span>Written by language models, checked by people</span>
            <i>◆</i>
            <span>Delivered at your chosen hour</span>
            <i>◆</i>
            <span>61,000 readers and counting</span>
            <i>◆</i>
            <span>600 sources scanned continuously</span>
            <i>◆</i>
            <span>Duplicates removed by semantic similarity</span>
            <i>◆</i>
            <span>Ranked by real-world impact</span>
            <i>◆</i>
            <span>Written by language models, checked by people</span>
            <i>◆</i>
            <span>Delivered at your chosen hour</span>
            <i>◆</i>
            <span>61,000 readers and counting</span>
            <i>◆</i>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main id="main">

        {/* HOW IT WORKS */}
        <section className="section" id="how" aria-labelledby="how-title">
          <header className="sec-head">
            <p className="sec-head__kicker">What MR NEWS Actually Does</p>
            <h2 className="sec-head__title" id="how-title">
              We built a <em>reading machine</em><br />for the AI era
            </h2>
            <p className="sec-head__sub">No human should read 600 articles a day. That is a robot's job.</p>
          </header>

          <div className="pillars">
            <article className="pillar">
              <span className="pillar__num" aria-hidden="true">I</span>
              <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 4h18v14H3z" /><path d="M7 8h10M7 12h7" /><path d="M8 18l-2 3M16 18l2 3" />
              </svg>
              <h3 className="pillar__title">Reads Everything</h3>
              <p className="pillar__body">Wire services, research preprints, regulator filings, press releases. <b>600+ sources per night.</b> The models do not get tired. They do not skim.</p>
            </article>
            <article className="pillar">
              <span className="pillar__num" aria-hidden="true">II</span>
              <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" /><path d="M12 3v9l7 4" />
              </svg>
              <h3 className="pillar__title">Decides What Matters</h3>
              <p className="pillar__body">Every candidate story is scored on <b>impact, novelty, and credibility.</b> Only seven make the cut.</p>
            </article>
            <article className="pillar">
              <span className="pillar__num" aria-hidden="true">III</span>
              <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5M8 13h8M8 17h5" />
              </svg>
              <h3 className="pillar__title">Writes It Plainly</h3>
              <p className="pillar__body">No jargon. No hedging. Then <b>a human editor reads the whole issue</b> before it goes out.</p>
            </article>
          </div>
        </section>

        {/* DEMO */}
        <section className="section" id="demo" aria-labelledby="demo-title">
          <header className="sec-head">
            <p className="sec-head__kicker">Fig. 1 — How the Machine Reads</p>
            <h2 className="sec-head__title" id="demo-title">Watch a <em>headline</em> get read</h2>
            <p className="sec-head__sub">See what our models see, in real time.</p>
          </header>
          <ReadingMachineDemo />
        </section>

        {/* FEATURES */}
        <section className="section" id="features" aria-labelledby="features-title">
          <header className="sec-head">
            <p className="sec-head__kicker">Features</p>
            <h2 className="sec-head__title" id="features-title">
              Everything a <em>serious briefing</em> should be
            </h2>
          </header>
          <div className="features">
            {[
              { icon: 'M12 3v9l7 4', circle: true, title: 'Pick Your Hour', body: '6 a.m. for early risers. Noon for night owls. Any hour you like.' },
              { icon: 'M4 4h16v16H4zM9 9h6M9 13h6M9 17h3', title: 'Pick Your Topics', body: 'Policy, chips, labs, funding, safety, science. You choose.' },
              { icon: 'M3 12h6l3-6 3 12 3-6h3', title: 'Three Lengths', body: 'Skim in 1 min, Standard in 5, or Deep in 12.' },
              { icon: 'M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z', title: 'Corrections First', body: 'When we get it wrong, the fix runs at the top. Every time.' },
              { icon: 'M12 3v9l7 4', title: 'Global Sources', body: 'English, Mandarin, German, French, Japanese — read natively.' },
              { icon: 'M3 6h16v14H3zM3 10h16M8 6V4M16 6V4', title: 'Archive Access', body: 'Every issue ever sent, searchable.' },
              { icon: 'M12 3v12M7 10l5 5 5-5M5 21h14', title: 'Zero Trackers', body: 'No pixels, no beacons, no ads.' },
              { icon: 'M8 12l3 3 5-6', circle: true, r: 9, title: 'Free Forever', body: 'Funded by a small group of patient readers.' },
            ].map(({ icon, circle, r, title, body }) => (
              <div className="feat" key={title}>
                <svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  {circle && <circle cx="12" cy="12" r={r ?? 9} />}
                  <path d={icon} />
                </svg>
                <h4 className="feat__title">{title}</h4>
                <p className="feat__body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DELIVERY */}
        <section className="section" id="delivery" aria-labelledby="delivery-title">
          <header className="sec-head">
            <p className="sec-head__kicker">Delivery</p>
            <h2 className="sec-head__title" id="delivery-title">
              The briefing arrives <em>when you say so</em>
            </h2>
          </header>
          <div className="delivery">
            <div className="delivery__copy">
              <p className="kicker">Your Morning, Your Rules</p>
              <h3>You pick the <em>hour</em>, the <em>length</em>, the <em>topics</em></h3>
              <p>Registering takes one click. After that, you are in the driver&apos;s seat.</p>
              <ul className="delivery__list">
                <li><span className="check">◆</span><span>Choose a delivery time that matches your morning</span></li>
                <li><span className="check">◆</span><span>Toggle sections on or off: policy, chips, science, funding</span></li>
                <li><span className="check">◆</span><span>Switch reading length any day, instantly</span></li>
                <li><span className="check">◆</span><span>Pause for a week without losing your place</span></li>
              </ul>
            </div>
            <ClockSelector />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section" id="voices" aria-labelledby="voices-title">
          <header className="sec-head">
            <p className="sec-head__kicker">Readers&apos; Letters</p>
            <h2 className="sec-head__title" id="voices-title">
              What people say <em>before coffee</em>
            </h2>
          </header>
          <div className="quotes">
            <article className="quote">
              <div className="quote__head">
                <span>From the Desk Of</span>
                <span>Sept 14</span>
              </div>
              <span className="quote__openmark" aria-hidden="true">&ldquo;</span>
              <p className="quote__body">I used to spend forty minutes every morning opening twelve tabs. Now I read MR NEWS in five and I actually understand what I read.</p>
              <p className="quote__sign">Priya N.<b>Product Lead, Bangalore</b></p>
            </article>
            <article className="quote">
              <div className="quote__head">
                <span>From the Desk Of</span>
                <span>Sept 12</span>
              </div>
              <span className="quote__openmark" aria-hidden="true">&ldquo;</span>
              <p className="quote__body">The corrections column alone is worth subscribing. No other AI newsletter admits when it gets something wrong.</p>
              <p className="quote__sign">Marcus H.<b>Policy Researcher, Brussels</b></p>
            </article>
            <article className="quote">
              <div className="quote__head">
                <span>From the Desk Of</span>
                <span>Sept 10</span>
              </div>
              <span className="quote__openmark" aria-hidden="true">&ldquo;</span>
              <p className="quote__body">I forwarded Wednesday&apos;s issue to my entire leadership team. For the first time we all walked in knowing the same facts.</p>
              <p className="quote__sign">Elena V.<b>VP Operations, Toronto</b></p>
            </article>
          </div>
        </section>

        {/* UNCLE MASCOT */}
        <div className="uncle-feature">
          <svg className="uncle-svg" viewBox="0 0 200 240" role="img" aria-label="Uncle mascot — our editor at large">
            <ellipse cx="100" cy="104" rx="53" ry="58" fill="#111827" stroke="#c8c3b5" strokeWidth="2.8" />
            <path d="M52 90 Q56 46 100 44 Q144 46 148 90 Q138 66 100 64 Q62 66 52 90 Z" fill="#c9a227" opacity=".15" />
            <path d="M64 82 Q76 74 88 81" stroke="#c9a227" strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <path d="M112 81 Q124 74 136 82" stroke="#c9a227" strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <circle cx="76" cy="104" r="19" fill="rgba(255,255,255,.05)" stroke="#c8c3b5" strokeWidth="3.2" />
            <circle cx="124" cy="104" r="19" fill="rgba(255,255,255,.05)" stroke="#c8c3b5" strokeWidth="3.2" />
            <path d="M95 104 Q100 100 105 104" stroke="#c8c3b5" strokeWidth="3.2" fill="none" />
            <circle cx="76" cy="105" r="5" fill="#c9a227" />
            <circle cx="124" cy="105" r="5" fill="#c9a227" />
            <ellipse cx="45" cy="108" rx="9" ry="13" fill="#111827" stroke="#c8c3b5" strokeWidth="2.4" />
            <ellipse cx="155" cy="108" rx="9" ry="13" fill="#111827" stroke="#c8c3b5" strokeWidth="2.4" />
            <g>
              <path d="M62 138 Q80 124 100 136 Q120 124 138 138 Q120 150 100 144 Q80 150 62 138 Z" fill="#c8c3b5" />
            </g>
            <path d="M88 151 Q100 158 112 151" fill="none" stroke="#c8c3b5" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M40 216 Q46 168 100 164 Q154 168 160 216 Z" fill="#111827" stroke="#c8c3b5" strokeWidth="2.6" />
            <path d="M152 178 Q176 158 172 130" stroke="#c8c3b5" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="172" cy="126" r="9" fill="#111827" stroke="#c8c3b5" strokeWidth="2.6" />
            <g transform="translate(96,148) rotate(8)">
              <rect x="0" y="0" width="80" height="62" fill="#0d1424" stroke="#c9a227" strokeWidth="2" />
              <rect x="6" y="7" width="30" height="5" fill="#c9a227" />
              <rect x="6" y="17" width="68" height="2" fill="#c8c3b5" opacity=".4" />
              <rect x="6" y="23" width="68" height="2" fill="#c8c3b5" opacity=".4" />
              <rect x="6" y="29" width="54" height="2" fill="#c8c3b5" opacity=".4" />
              <rect x="6" y="35" width="62" height="2" fill="#c8c3b5" opacity=".4" />
              <rect x="6" y="41" width="46" height="2" fill="#c8c3b5" opacity=".4" />
              <rect x="6" y="47" width="58" height="2" fill="#c8c3b5" opacity=".4" />
            </g>
          </svg>
          <div className="uncle-copy">
            <p className="kicker">Our Editor at Large</p>
            <h3>Sit down. <em>I will read it to you.</em></h3>
            <p>Every newspaper needs a face. Ours is a retired editor with round glasses, a proper moustache, and strong opinions about the Oxford comma. He reads every issue before it ships.</p>
            <p>He believes the news should be calm, clear, and kind. That is why we never use clickbait, never overstate, and always publish a correction when we get something wrong.</p>
            <p className="uncle-copy__sign">The Uncle — Editor at Large</p>
          </div>
        </div>

        {/* CTA */}
        <section className="quiet-cta" aria-labelledby="cta-title">
          <h2 className="quiet-cta__title" id="cta-title">
            One page. Every morning.<br /><em>Written by machines, checked by people.</em>
          </h2>
          <p className="quiet-cta__sub">
            One Google click and you are in. No credit card. No spam. Cancel any time.
          </p>
          <Link href="/login" className="quiet-cta__link" id="ctaSubscribe">
            Start Reading Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </Link>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot__top">
          <div>
            <p className="foot__logo">MR<span>.</span>NEWS</p>
            <p className="foot__tag">Written by machines, checked by people</p>
          </div>
          <nav className="foot__cols" aria-label="Footer navigation">
            <div>
              <h4>The Paper</h4>
              <a href="#how">How It Works</a>
              <a href="#demo">See It Read</a>
              <a href="#features">Features</a>
            </div>
            <div>
              <h4>Account</h4>
              <Link href="/login">Subscribe Free</Link>
              <a href="#" id="footReport">Report a Problem</a>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <a href="#">RSS</a>
              <a href="#">Mastodon</a>
              <a href="#">Contact</a>
            </div>
          </nav>
        </div>
        <p className="foot__legal">
          <span>&copy; {new Date().getFullYear()} MR NEWS. All rights reserved.</span>
          <span>
            <a href="#">Privacy</a>
            &nbsp;&middot;&nbsp;
            <a href="#">Terms</a>
          </span>
        </p>
      </footer>

      <ReportPanelModal />
    </>
  );
}
