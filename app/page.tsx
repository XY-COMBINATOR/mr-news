import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from './components/MobileNav';
import { AnimatedCounters } from './components/AnimatedCounters';
import { ReadingMachineDemo } from './components/ReadingMachineDemo';
import { ClockSelector } from './components/ClockSelector';
import { ReportPanelModal } from './components/ReportPanelModal';

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="paper-wrap">
        <div className="paper-sheet">
          <div className="paper-grain" aria-hidden="true" />
          <div className="paper-sheet__inner">

            {/* MASTHEAD */}
            <header className="masthead">
              <div className="masthead__top">
                <span className="left">Est. 2024</span>
                <span className="mid">The newsletter that reads the news for you</span>
                <span className="right">
                  <Link href="/login" className="register-btn" aria-label="Register for MR News">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                    Register
                  </Link>
                </span>
              </div>

              {/* BRAND */}
              <div className="brand">
                <img
                  src="/assets/brand/mr_news_logo.svg"
                  alt="MR News logo"
                  className="brand__logo"
                />
                <h1 className="brand__text" aria-label="MR NEWS">
                  <span aria-hidden="true">MR</span>
                  <span className="brand__globe" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="46" stroke="#1a1510" strokeWidth="3.2" />
                      <g className="meridians">
                        <ellipse cx="50" cy="50" rx="20" ry="46" stroke="#1a1510" strokeWidth="2" />
                        <ellipse cx="50" cy="50" rx="38" ry="46" stroke="#1a1510" strokeWidth="1.4" opacity=".5" />
                        <line x1="4" y1="50" x2="96" y2="50" stroke="#1a1510" strokeWidth="2" />
                        <path d="M12 28 Q50 40 88 28" stroke="#1a1510" strokeWidth="1.6" opacity=".7" />
                        <path d="M12 72 Q50 60 88 72" stroke="#1a1510" strokeWidth="1.6" opacity=".7" />
                        <path d="M28 20 Q40 44 34 80" stroke="#1a1510" strokeWidth="1.2" opacity=".4" />
                        <path d="M66 18 Q56 44 64 82" stroke="#1a1510" strokeWidth="1.2" opacity=".4" />
                      </g>
                    </svg>
                  </span>
                  <span aria-hidden="true">NEWS</span>
                </h1>
                <p className="brand__tagline">Six Hundred Sources, One Page</p>

                <div className="brand__sides">
                  <div className="brand__side left">
                    Truth<br />Summarised<br />Daily.
                    <em>Less noise.<br />More insight.</em>
                  </div>
                  <div />
                  <div className="brand__side right">
                    Powered<br />by AI.<br />Curated for Humans.
                    <em>Same world.<br />A clearer view.</em>
                  </div>
                </div>
              </div>

              <MobileNav />

              {/* WIRE TICKER */}
              <div className="wire" aria-hidden="true">
                <div className="wire__track">
                  <div className="wire__set">
                    <b>Live</b> 600 sources scanned continuously
                    <i>&#9670;</i> Duplicates removed by semantic similarity
                    <i>&#9670;</i> Ranked by real world impact
                    <i>&#9670;</i> Written by language models, checked by people
                    <i>&#9670;</i> Delivered at your chosen hour
                    <i>&#9670;</i> 61,000 readers and counting
                    <i>&#9670;</i>
                  </div>
                  <div className="wire__set">
                    <b>Live</b> 600 sources scanned continuously
                    <i>&#9670;</i> Duplicates removed by semantic similarity
                    <i>&#9670;</i> Ranked by real world impact
                    <i>&#9670;</i> Written by language models, checked by people
                    <i>&#9670;</i> Delivered at your chosen hour
                    <i>&#9670;</i> 61,000 readers and counting
                    <i>&#9670;</i>
                  </div>
                </div>
              </div>
            </header>

            <main id="main">

              {/* HERO */}
              <section className="hero">
                <div className="reveal is-in">
                  <p className="hero__eyebrow">The Daily Briefing</p>
                </div>
                <h2 className="hero__title reveal is-in" style={{ '--d': '.06s' } as React.CSSProperties}>
                  The AI newsletter<br />that <em>reads itself</em>
                </h2>
                <div className="hero__rule reveal is-in" style={{ '--d': '.1s' } as React.CSSProperties} />
                <p className="hero__deck reveal is-in" style={{ '--d': '.14s' } as React.CSSProperties}>
                  We point an army of <b>language models</b> at six hundred news sources every night.
                  They read everything, throw away duplicates, rank what matters, and write a
                  briefing you can finish in five minutes.
                </p>
              </section>

              {/* STATS */}
              <AnimatedCounters />

              {/* DEMO */}
              <section className="section" id="demo">
                <header className="sec-head reveal is-in">
                  <p className="sec-head__kicker">Fig. 1 / How the Machine Reads</p>
                  <h2 className="sec-head__title">Watch a <em>headline</em> get read</h2>
                  <p className="sec-head__sub">See what our models see, in real time.</p>
                </header>
                <ReadingMachineDemo />
              </section>

              {/* HOW IT WORKS */}
              <section className="section" id="how">
                <div className="rule-orn" aria-hidden="true"><span /></div>
                <header className="sec-head reveal is-in">
                  <p className="sec-head__kicker">What MR News Actually Does</p>
                  <h2 className="sec-head__title">We built a <em>reading machine</em> for the AI era</h2>
                  <p className="sec-head__sub">Because no human should have to read 600 articles a day. That is a robot&apos;s job.</p>
                </header>
                <div className="pillars">
                  <article className="pillar reveal is-in">
                    <span className="pillar__num">I</span>
                    <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 4h18v14H3z" /><path d="M7 8h10M7 12h7" /><path d="M8 18l-2 3M16 18l2 3" />
                    </svg>
                    <h3 className="pillar__title">Reads Everything</h3>
                    <p className="pillar__body">Wire services, research preprints, regulator filings, press releases, social posts. <b>600+ per night.</b> The models do not get tired. They do not skim.</p>
                  </article>
                  <article className="pillar reveal is-in" style={{ '--d': '.08s' } as React.CSSProperties}>
                    <span className="pillar__num">II</span>
                    <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" /><path d="M12 3v9l7 4" />
                    </svg>
                    <h3 className="pillar__title">Decides What Matters</h3>
                    <p className="pillar__body">Every candidate story is scored on <b>impact, novelty, and credibility</b>. Only seven make the cut.</p>
                  </article>
                  <article className="pillar reveal is-in" style={{ '--d': '.16s' } as React.CSSProperties}>
                    <span className="pillar__num">III</span>
                    <svg className="pillar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h11l5 5v11H4z" /><path d="M15 4v5h5M8 13h8M8 17h5" />
                    </svg>
                    <h3 className="pillar__title">Writes It Plainly</h3>
                    <p className="pillar__body">No jargon. No hedging. Then <b>a human editor reads the whole issue</b> before it goes out.</p>
                  </article>
                </div>
              </section>

              {/* FEATURES */}
              <section className="section" id="features">
                <header className="sec-head reveal is-in">
                  <p className="sec-head__kicker">Features</p>
                  <h2 className="sec-head__title">Everything a <em>serious briefing</em> should be</h2>
                </header>
                <div className="features">
                  <div className="feat reveal is-in"><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><h4 className="feat__title">Pick Your Hour</h4><p className="feat__body">6 a.m. for commuters. Noon for night owls. Any hour you like.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.04s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" /><path d="M9 9h6M9 13h6M9 17h3" /></svg><h4 className="feat__title">Pick Your Topics</h4><p className="feat__body">Policy, chips, labs, funding, safety, science. You choose.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.08s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h6l3-6 3 12 3-6h3" /></svg><h4 className="feat__title">Three Lengths</h4><p className="feat__body">Skim in 1 minute, Standard in 5, or Deep in 12.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.12s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></svg><h4 className="feat__title">Corrections First</h4><p className="feat__body">When we get it wrong, the fix runs at the top. Every time.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.16s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18" /></svg><h4 className="feat__title">Global Sources</h4><p className="feat__body">English, Mandarin, German, French, Japanese, all read natively.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.2s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M8 6V4M16 6V4" /></svg><h4 className="feat__title">Archive Access</h4><p className="feat__body">Every issue ever sent, searchable.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.24s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg><h4 className="feat__title">Zero Trackers</h4><p className="feat__body">No pixels, no beacons, no ads.</p></div>
                  <div className="feat reveal is-in" style={{ '--d': '.28s' } as React.CSSProperties}><svg className="feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg><h4 className="feat__title">Free Forever</h4><p className="feat__body">Funded by a small group of patient readers.</p></div>
                </div>
              </section>

              {/* DELIVERY */}
              <section className="section" id="delivery">
                <header className="sec-head reveal is-in">
                  <p className="sec-head__kicker">Delivery</p>
                  <h2 className="sec-head__title">The briefing arrives <em>when you say so</em></h2>
                </header>
                <div className="delivery">
                  <div className="delivery__copy reveal is-in">
                    <p className="kicker">Your Morning, Your Rules</p>
                    <h3>You pick the <em>hour</em>, the <em>length</em>, the <em>topics</em></h3>
                    <p>Registering takes one click. After that, you are in the driver&apos;s seat.</p>
                    <ul className="delivery__list">
                      <li><span className="check">&#10003;</span><span>Choose a delivery time that matches your morning</span></li>
                      <li><span className="check">&#10003;</span><span>Toggle sections on or off: policy, chips, science, funding</span></li>
                      <li><span className="check">&#10003;</span><span>Switch reading length any day, instantly</span></li>
                      <li><span className="check">&#10003;</span><span>Pause for a week without losing your place</span></li>
                    </ul>
                  </div>
                  <ClockSelector />
                </div>
              </section>

              {/* READERS */}
              <section className="section" id="voices">
                <div className="rule-orn" aria-hidden="true"><span /></div>
                <header className="sec-head reveal is-in">
                  <p className="sec-head__kicker">Readers&apos; Letters</p>
                  <h2 className="sec-head__title">What people say <em>before coffee</em></h2>
                </header>
                <div className="quotes">
                  <article className="quote reveal is-in">
                    <div className="quote__head"><span>From the Desk Of</span><span>Sept 14</span></div>
                    <p className="quote__body">I used to spend forty minutes every morning opening twelve tabs. Now I read MR News in five and I actually understand what I read.</p>
                    <p className="quote__sign">Priya N.<b>Product Lead, Bangalore</b></p>
                  </article>
                  <article className="quote reveal is-in" style={{ '--d': '.08s' } as React.CSSProperties}>
                    <div className="quote__head"><span>From the Desk Of</span><span>Sept 12</span></div>
                    <p className="quote__body">The corrections column alone is worth registering. No other AI newsletter admits when it gets something wrong.</p>
                    <p className="quote__sign">Marcus H.<b>Policy Researcher, Brussels</b></p>
                  </article>
                  <article className="quote reveal is-in" style={{ '--d': '.16s' } as React.CSSProperties}>
                    <div className="quote__head"><span>From the Desk Of</span><span>Sept 10</span></div>
                    <p className="quote__body">I forwarded Wednesday&apos;s issue to my entire leadership team. For the first time we all walked in knowing the same facts.</p>
                    <p className="quote__sign">Elena V.<b>VP Operations, Toronto</b></p>
                  </article>
                </div>
              </section>

              {/* UNCLE MASCOT */}
              <section className="reveal is-in">
                <div className="uncle-feature">
                  <svg className="uncle-svg" viewBox="0 0 200 240" role="img" aria-label="Uncle mascot reading the newspaper">
                    <g transform="translate(96,148) rotate(8)">
                      <rect x="0" y="0" width="80" height="62" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.4" />
                      <rect x="6" y="7" width="30" height="5" fill="#1a1510" />
                      <rect x="6" y="17" width="68" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="6" y="23" width="68" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="6" y="29" width="54" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="6" y="35" width="62" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="6" y="41" width="46" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="6" y="47" width="58" height="2" fill="#1a1510" opacity=".55" />
                      <rect x="44" y="7" width="28" height="8" fill="#7a2418" opacity=".7" />
                    </g>
                    <path d="M40 216 Q46 168 100 164 Q154 168 160 216 Z" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.6" />
                    <path d="M82 168 L100 190 L118 168" fill="none" stroke="#1a1510" strokeWidth="2.4" />
                    <path d="M100 190 L86 180 L86 198 Z" fill="#7a2418" stroke="#1a1510" strokeWidth="2" />
                    <path d="M100 190 L114 180 L114 198 Z" fill="#7a2418" stroke="#1a1510" strokeWidth="2" />
                    <circle cx="100" cy="190" r="4" fill="#1a1510" />
                    <rect x="90" y="148" width="20" height="18" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.4" />
                    <ellipse cx="45" cy="108" rx="9" ry="13" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.4" />
                    <ellipse cx="155" cy="108" rx="9" ry="13" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.4" />
                    <ellipse cx="100" cy="104" rx="53" ry="58" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.8" />
                    <path d="M52 90 Q56 46 100 44 Q144 46 148 90 Q138 66 100 64 Q62 66 52 90 Z" fill="#1a1510" opacity=".92" />
                    <path d="M64 82 Q76 74 88 81" stroke="#1a1510" strokeWidth="3.4" fill="none" strokeLinecap="round" />
                    <path d="M112 81 Q124 74 136 82" stroke="#1a1510" strokeWidth="3.4" fill="none" strokeLinecap="round" />
                    <circle cx="76" cy="104" r="19" fill="rgba(255,255,255,.35)" stroke="#1a1510" strokeWidth="3.2" />
                    <circle cx="124" cy="104" r="19" fill="rgba(255,255,255,.35)" stroke="#1a1510" strokeWidth="3.2" />
                    <path d="M95 104 Q100 100 105 104" stroke="#1a1510" strokeWidth="3.2" fill="none" />
                    <line x1="57" y1="102" x2="44" y2="100" stroke="#1a1510" strokeWidth="2.6" />
                    <line x1="143" y1="102" x2="156" y2="100" stroke="#1a1510" strokeWidth="2.6" />
                    <circle cx="76" cy="105" r="4" fill="#1a1510" />
                    <circle cx="124" cy="105" r="4" fill="#1a1510" />
                    <ellipse className="lid" cx="76" cy="95" rx="19" ry="17" fill="#e8ddc2" stroke="#1a1510" strokeWidth="3.2" />
                    <ellipse className="lid" cx="124" cy="95" rx="19" ry="17" fill="#e8ddc2" stroke="#1a1510" strokeWidth="3.2" />
                    <path d="M100 110 Q96 122 100 124 Q104 122 100 110" fill="none" stroke="#1a1510" strokeWidth="2.6" strokeLinecap="round" />
                    <g className="stache"><path d="M62 138 Q80 124 100 136 Q120 124 138 138 Q120 152 100 144 Q80 152 62 138 Z" fill="#1a1510" /></g>
                    <path d="M88 151 Q100 158 112 151" fill="none" stroke="#1a1510" strokeWidth="2.4" strokeLinecap="round" />
                    <ellipse cx="58" cy="128" rx="9" ry="5" fill="#7a2418" opacity=".18" />
                    <ellipse cx="142" cy="128" rx="9" ry="5" fill="#7a2418" opacity=".18" />
                    <g className="arm">
                      <path d="M152 178 Q176 158 172 130" stroke="#1a1510" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <circle cx="172" cy="126" r="9" fill="#e8ddc2" stroke="#1a1510" strokeWidth="2.6" />
                    </g>
                  </svg>
                  <div className="uncle-copy">
                    <p className="kicker">Our Editor at Large</p>
                    <h3>Sit down. <em>I will read it to you.</em></h3>
                    <p>Every newspaper needs a face. Ours is a retired editor with round glasses, a proper moustache, and strong opinions about the Oxford comma. He reads every issue before it ships.</p>
                    <p>He believes the news should be calm, clear, and kind. That is why we never use clickbait, never overstate, and always publish a correction when we get something wrong.</p>
                    <p className="uncle-copy__sign">The Uncle, Editor at Large</p>
                  </div>
                </div>
              </section>

              {/* QUIET CTA */}
              <section className="quiet-cta reveal is-in">
                <h2 className="quiet-cta__title">One page. Every morning.<br /><em>Written by machines, checked by people.</em></h2>
                <p className="quiet-cta__sub">When you are ready, the register button at the top will take you there. One Google click and you are in.</p>
                <Link href="/login" className="quiet-cta__link">
                  Register to receive MR News
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </Link>
              </section>

            </main>

            {/* FOOTER */}
            <footer className="foot">
              <div className="rule-orn" aria-hidden="true"><span /></div>
              <div className="foot__top">
                <div>
                  <p className="foot__logo">MR News</p>
                  <p className="foot__tag">Written by machines, checked by people</p>
                </div>
                <nav className="foot__cols" aria-label="Footer">
                  <div>
                    <h4>The Paper</h4>
                    <Link href="#how">How It Works</Link>
                    <Link href="#demo">See It Read</Link>
                    <Link href="#features">Features</Link>
                  </div>
                  <div>
                    <h4>Account</h4>
                    <Link href="/login">Register</Link>
                    <a href="#" id="footReport">Report a Problem</a>
                  </div>
                  <div>
                    <h4>Elsewhere</h4>
                    <a href="#">RSS</a><a href="#">Mastodon</a><a href="#">Contact the Desk</a>
                  </div>
                </nav>
              </div>
              <p className="foot__legal">
                <span>&copy; <span data-year>{new Date().getFullYear()}</span> MR News. All rights reserved.</span>
                <span>Set in Playfair, Old Standard and IM Fell. <a href="#">Privacy</a> &middot; <a href="#">Terms</a></span>
              </p>
            </footer>

          </div>
        </div>
      </div>

      <ReportPanelModal />
    </>
  );
}
