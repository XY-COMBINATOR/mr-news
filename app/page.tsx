import React from 'react';
import Link from 'next/link';
import { ClockSelector } from './components/ClockSelector';

/**
 * MR NEWS — Landing Page
 *
 * Section order mirrors NVIDIA Inception architecture:
 *   1. Topbar      — single sticky navigation bar, no sub-nav repetition
 *   2. Hero        — asymmetric 60/40 split: copy left, briefing console right
 *   3. Stats strip — four authentic product metrics (no vanity numbers)
 *   4. How It Works — three zig-zag feature rows with real data cards
 *   5. Delivery    — 22:00 dispatch section with ClockSelector panel
 *   6. CTA block   — full-bleed subscribe prompt
 *   7. Footer      — 4-column grid + legal bar
 */
export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* ── TOPBAR ──────────────────────────────────────────────────── */}
      <header className="topbar" role="banner">
        <Link href="/" className="topbar__brand" aria-label="MR NEWS home">
          <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
            <circle cx="50" cy="50" r="46" stroke="var(--acc)" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="20" ry="46" stroke="var(--acc)" strokeWidth="2" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="var(--acc)" strokeWidth="2" />
          </svg>
          <span className="topbar__wordmark">MR<span className="topbar__dot">.</span>NEWS</span>
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          <a href="#overview" className="topbar__link">Overview</a>
          <a href="#how"      className="topbar__link">How It Works</a>
          <a href="#delivery" className="topbar__link">Delivery</a>
        </nav>

        <Link href="/login" className="topbar__cta" id="navCta">
          Subscribe Free
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
               width="13" height="13" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="overview" className="hero" aria-label="Introduction">
        <div className="hero__layout">

          {/* Copy column */}
          <div className="hero__copy">
            <div className="hero__tag" aria-hidden="true">
              <span>Nightly AI Intelligence</span>
            </div>

            <h1 className="hero__title">
              MR<span className="hero__dot">.</span><br aria-hidden="true" />
              NEWS
            </h1>

            <p className="hero__tagline">
              Know what matters <span className="hero__tagline-acc">next</span>
            </p>

            <p className="hero__lead">
              Six hundred sources. Seven stories. Five minutes.
              AI powered nightly intelligence delivered at 22:00 ready when you wake up.
            </p>

            <div className="hero__actions">
              <Link href="/login" className="btn-primary" id="heroSubscribe">
                Subscribe Free
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
                     width="13" height="13" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="#how" className="btn-ghost">See how it works</a>
            </div>
          </div>

          {/* Visual column: matte black briefing console */}
          <div className="hero__visual" aria-hidden="true">
            <div className="briefing-console">
              <div className="briefing-console__top">
                <div className="briefing-console__status">
                  <span className="briefing-console__pulse" />
                  <span>22:00 Edition Verified</span>
                </div>
                <span className="briefing-console__badge">Live Feed</span>
              </div>

              <div className="briefing-console__card">
                <div className="briefing-console__meta">
                  <span className="briefing-console__beat">Semiconductors and Policy</span>
                  <span className="briefing-console__time">2h ago</span>
                </div>
                <h3 className="briefing-console__headline">
                  Global chip accords establish unified standards for cross border hardware supply chains
                </h3>
                <p className="briefing-console__summary">
                  Key technological consortiums sign pivotal framework ensuring uninterrupted access to
                  advanced fabrication facilities worldwide.
                </p>
                <div className="briefing-console__metrics">
                  <span className="briefing-console__score">Confidence 99.4%</span>
                  <span className="briefing-console__read">2 min read</span>
                </div>
              </div>

              <div className="briefing-console__card briefing-console__card--secondary">
                <div className="briefing-console__meta">
                  <span className="briefing-console__beat">Frontier Systems</span>
                  <span className="briefing-console__time">4h ago</span>
                </div>
                <h4 className="briefing-console__headline-sm">
                  Autonomous reasoning models deployed across mission critical compute clusters
                </h4>
              </div>

              <div className="briefing-console__bottom">
                <span className="briefing-console__stat">07 Stories Compiled</span>
                <span className="briefing-console__schedule">Delivered Nightly at 22:00</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────── */}
      <div className="stats-strip" aria-label="Key facts" role="region">
        <div className="stats-strip__inner">
          <div className="stats-strip__stat">
            <span className="stats-strip__val">600<span className="stats-strip__acc">+</span></span>
            <span className="stats-strip__lbl">Sources scanned nightly</span>
          </div>
          <div className="stats-strip__div" aria-hidden="true" />
          <div className="stats-strip__stat">
            <span className="stats-strip__val">07</span>
            <span className="stats-strip__lbl">Stories per brief</span>
          </div>
          <div className="stats-strip__div" aria-hidden="true" />
          <div className="stats-strip__stat">
            <span className="stats-strip__val">5 min</span>
            <span className="stats-strip__lbl">Average read time</span>
          </div>
          <div className="stats-strip__div" aria-hidden="true" />
          <div className="stats-strip__stat">
            <span className="stats-strip__val">22:00</span>
            <span className="stats-strip__lbl">Fixed nightly dispatch</span>
          </div>
        </div>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────── */}
      <main id="main" className="main">

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <section id="how" className="section" aria-labelledby="how-hd">
          <div className="section__hd">
            <span className="section__tag">01 Architecture</span>
            <h2 className="section__title" id="how-hd">How It Works</h2>
            <p className="section__sub">
              Three precise steps from global noise to your morning clarity.
            </p>
          </div>

          {/* Row 1: Copy left, visual right */}
          <div className="feature-row">
            <div className="feature-row__copy">
              <span className="feature-row__num">01</span>
              <h3 className="feature-row__title">Reads Everything</h3>
              <p className="feature-row__body">
                Wire services, research preprints, regulator filings, and press releases.
                <strong> More than 600 sources processed every night</strong> without fatigue or bias.
                No story goes unread.
              </p>
              <ul className="feature-row__list" role="list">
                <li><span className="chk" aria-hidden="true">✓</span>Wire services and newswires</li>
                <li><span className="chk" aria-hidden="true">✓</span>Research preprints and lab publications</li>
                <li><span className="chk" aria-hidden="true">✓</span>Regulator filings and policy documents</li>
              </ul>
            </div>
            <div className="feature-row__visual">
              <div className="feat-card">
                <div className="feat-card__head">
                  <span className="feat-card__tag">VERIFIED FEEDS</span>
                  <span className="feat-card__subtag">600+ Active</span>
                </div>
                <div className="feed-directory">
                  <div className="feed-item">
                    <span className="feed-item__name">Global Wire Services</span>
                    <span className="feed-item__src">Reuters, AP, Bloomberg</span>
                  </div>
                  <div className="feed-item">
                    <span className="feed-item__name">Frontier Research Labs</span>
                    <span className="feed-item__src">arXiv, Nature, Institute Preprints</span>
                  </div>
                  <div className="feed-item">
                    <span className="feed-item__name">Regulatory Accords</span>
                    <span className="feed-item__src">FTC, EU Directives, Trade Gazettes</span>
                  </div>
                  <div className="feed-item">
                    <span className="feed-item__name">Hardware and Foundries</span>
                    <span className="feed-item__src">Semiconductor consortiums, Supply Data</span>
                  </div>
                </div>
                <p className="feat-card__label">Continuous overnight aggregation</p>
              </div>
            </div>
          </div>

          <hr className="rule rule--indent" aria-hidden="true" />

          {/* Row 2: Visual left, copy right */}
          <div className="feature-row feature-row--rev">
            <div className="feature-row__visual">
              <div className="feat-card">
                <div className="feat-card__head">
                  <span className="feat-card__tag">DECISION MATRIX</span>
                  <span className="feat-card__subtag">Scored 0 to 100</span>
                </div>
                <div className="criteria-matrix">
                  <div className="criteria-row">
                    <div className="criteria-hd">
                      <span className="criteria-label">Geopolitical Impact</span>
                      <span className="criteria-weight">Weight 40%</span>
                    </div>
                    <p className="criteria-desc">Material influence on supply chains, national policies, and global markets.</p>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-hd">
                      <span className="criteria-label">Novelty Detection</span>
                      <span className="criteria-weight">Weight 30%</span>
                    </div>
                    <p className="criteria-desc">Deduplication against previous editions to prevent rehashed talking points.</p>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-hd">
                      <span className="criteria-label">Multi Source Verification</span>
                      <span className="criteria-weight">Weight 30%</span>
                    </div>
                    <p className="criteria-desc">Minimum three independent primary publications required for inclusion.</p>
                  </div>
                </div>
                <p className="feat-card__label">Algorithmic ranking with zero bias</p>
              </div>
            </div>
            <div className="feature-row__copy">
              <span className="feature-row__num">02</span>
              <h3 className="feature-row__title">Decides What Matters</h3>
              <p className="feature-row__body">
                Every candidate story is scored against
                <strong> impact, novelty, and credibility.</strong> Only seven
                make the briefing, delivering the developments that truly shape the industry.
              </p>
              <ul className="feature-row__list" role="list">
                <li><span className="chk" aria-hidden="true">✓</span>Impact scoring for geopolitical and market significance</li>
                <li><span className="chk" aria-hidden="true">✓</span>Novelty detection to eliminate repetitive headlines</li>
                <li><span className="chk" aria-hidden="true">✓</span>Cross source credibility verification</li>
              </ul>
            </div>
          </div>

          <hr className="rule rule--indent" aria-hidden="true" />

          {/* Row 3: Copy left, visual right */}
          <div className="feature-row">
            <div className="feature-row__copy">
              <span className="feature-row__num">03</span>
              <h3 className="feature-row__title">Writes It Plainly</h3>
              <p className="feature-row__body">
                High signal, zero clickbait. Then
                <strong> a human editor verifies the entire issue</strong> before it
                lands in your inbox every night at 22:00.
              </p>
              <ul className="feature-row__list" role="list">
                <li><span className="chk" aria-hidden="true">✓</span>Plain language summaries without unnecessary jargon</li>
                <li><span className="chk" aria-hidden="true">✓</span>Human editorial verification before dispatch</li>
                <li><span className="chk" aria-hidden="true">✓</span>Delivered every night at 22:00 sharp</li>
              </ul>
            </div>
            <div className="feature-row__visual">
              <div className="feat-card feat-card--sample">
                <div className="feat-card__head">
                  <span className="feat-card__tag">BRIEFING EXCERPT</span>
                  <span className="feat-card__subtag">Human Checked</span>
                </div>
                <article className="sample-story">
                  <div className="sample-story__meta">
                    <span className="sample-story__topic">Semiconductors</span>
                    <span className="sample-story__time">22:00 Edition</span>
                  </div>
                  <h4 className="sample-story__title">
                    Unified foundry protocols signed across cross border supply networks
                  </h4>
                  <p className="sample-story__body">
                    Leading semiconductor manufacturers have ratified an agreement ensuring reciprocal
                    access to advanced lithography nodes, shielding critical production pipelines from
                    localized trade barriers.
                  </p>
                  <div className="sample-story__foot">
                    <span>Verified by editorial desk</span>
                    <span className="sample-story__score">Signal 99.4%</span>
                  </div>
                </article>
                <p className="feat-card__label">7 verified stories delivered at 22:00</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" aria-hidden="true" />

        {/* ── DELIVERY ────────────────────────────────────────────────── */}
        <section id="delivery" className="section" aria-labelledby="delivery-hd">
          <div className="section__hd">
            <span className="section__tag">02 Schedule</span>
            <h2 className="section__title" id="delivery-hd">Delivery</h2>
            <p className="section__sub">In your inbox at 22:00 every single night.</p>
          </div>

          <div className="delivery">
            <div className="delivery__copy">
              <p className="delivery__eyebrow">Standardized Dispatch</p>
              <h3 className="delivery__title">
                In your inbox at<br />
                <em>22:00</em>, every night.
              </h3>
              <p className="delivery__desc">
                While you wind down, we scan 600+ sources so your briefing is ready when you wake up.
                Read it with your first coffee in just five minutes.
              </p>

              <div className="delivery__features">
                <div className="delivery-feat">
                  <div className="delivery-feat__hd">
                    <span className="delivery-feat__dot" />
                    <span>22:00 Dispatch</span>
                  </div>
                  <p className="delivery-feat__desc">
                    Dispatched every evening across global timezones without exception.
                  </p>
                </div>

                <div className="delivery-feat">
                  <div className="delivery-feat__hd">
                    <span className="delivery-feat__dot" />
                    <span>7 Story Constraint</span>
                  </div>
                  <p className="delivery-feat__desc">
                    Strict limit scored on real world impact, novelty, and credibility.
                  </p>
                </div>

                <div className="delivery-feat">
                  <div className="delivery-feat__hd">
                    <span className="delivery-feat__dot" />
                    <span>Curated Coverage</span>
                  </div>
                  <p className="delivery-feat__desc">
                    Select specific beats: policy, semiconductor hardware, labs, and capital.
                  </p>
                </div>

                <div className="delivery-feat">
                  <div className="delivery-feat__hd">
                    <span className="delivery-feat__dot" />
                    <span>Pure Signal</span>
                  </div>
                  <p className="delivery-feat__desc">
                    Zero advertising banners, zero tracking scripts, pure readable markdown.
                  </p>
                </div>
              </div>
            </div>
            <ClockSelector />
          </div>
        </section>

        <hr className="rule" aria-hidden="true" />

        {/* ── CTA BLOCK ───────────────────────────────────────────────── */}
        <section id="subscribe" className="cta-block" aria-label="Subscribe">
          <div className="cta-block__inner">
            <div className="cta-block__copy">
              <span className="cta-block__tag">Free and open access</span>
              <h2 className="cta-block__title">
                Seven stories.<br />Five minutes.<br />Every morning.
              </h2>
            </div>
            <div className="cta-block__action">
              <p className="cta-block__sub">
                No ads, no trackers, and no paywalls ever.
                Crafted for researchers, founders, and decision makers worldwide.
              </p>
              <Link href="/login" className="btn-primary btn-primary--lg" id="ctaBlockBtn">
                Subscribe Free
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
                     width="14" height="14" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p className="cta-block__fine">Sign in with Google. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">

        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__wordmark">MR<span className="footer__dot">.</span>NEWS</p>
            <p className="footer__tagline">Written by machines,<br />checked by people.</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="RSS feed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" width="15" height="15" aria-hidden="true">
                  <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/>
                  <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" width="15" height="15" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 6-10 7L2 6"/>
                </svg>
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Product">
            <h3 className="footer__col-hd">Product</h3>
            <a href="#overview" className="footer__link">Overview</a>
            <a href="#how"      className="footer__link">How It Works</a>
            <a href="#delivery" className="footer__link">Delivery</a>
          </nav>

          <nav className="footer__col" aria-label="Account">
            <h3 className="footer__col-hd">Account</h3>
            <Link href="/login" className="footer__link">Subscribe Free</Link>
            <a href="#" className="footer__link">Archive</a>
            <a href="#" className="footer__link">Referrals</a>
          </nav>

          <nav className="footer__col" aria-label="Company">
            <h3 className="footer__col-hd">Company</h3>
            <a href="#" className="footer__link">About</a>
            <a href="#" className="footer__link">Editorial Standards</a>
            <a href="#" className="footer__link">Contact</a>
            <a href="#" className="footer__link">Privacy Policy</a>
          </nav>
        </div>

        <div className="footer__bar">
          <span className="footer__copy">© {new Date().getFullYear()} MR NEWS. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Corrections</a>
          </div>
        </div>

      </footer>
    </>
  );
}
