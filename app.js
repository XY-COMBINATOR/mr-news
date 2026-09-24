(function(){
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches && window.innerWidth > 900;

  const entry = $('#entry');
  const hideEntry = () => { if (entry) entry.classList.add('done'); };
  if (reduceMotion) hideEntry(); else setTimeout(hideEntry, 4500);

  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  if (hasHover && !reduceMotion) {
    const core = $('#inkCore');
    let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
    addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      const t = document.createElement('div');
      t.className = 'ink-trail';
      t.style.left = mx + 'px'; t.style.top = my + 'px';
      document.body.appendChild(t);
      setTimeout(() => { t.style.transition='opacity .6s, transform .6s'; t.style.opacity='0'; t.style.transform='translate(-50%,-50%) scale(.3)'; }, 20);
      setTimeout(() => t.remove(), 800);
    }, { passive: true });
    (function loop(){
      cx += (mx - cx)*.22; cy += (my - cy)*.22;
      if (core) { core.style.left = cx+'px'; core.style.top = cy+'px'; }
      requestAnimationFrame(loop);
    })();
    const boundSet = new WeakSet();
    const bindHover = () => {
      $$('a, button, .feat, .quote, .pillar, .slot, .report-opt, input, label, .float-btn, .brand__logo, .register-btn').forEach(el => {
        if (boundSet.has(el)) return;
        boundSet.add(el);
        el.addEventListener('mouseenter', () => core && core.classList.add('hover'));
        el.addEventListener('mouseleave', () => core && core.classList.remove('hover'));
      });
    };
    bindHover(); setTimeout(bindHover, 1200);
    addEventListener('click', (e) => {
      const s = document.createElement('div');
      s.className = 'splash';
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    });
  } else {
    const c = $('#inkCore'); if (c) c.style.display = 'none';
  }

  const reveals = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => {
      en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }});
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-in'));

  (function(){
    const els = $$('[data-count]');
    if (!els.length) return;
    const fmt = (n) => n >= 1000 ? n.toLocaleString('en-US') : String(n);
    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const updateValue = (val) => {
        if (el.childNodes && el.childNodes[0] && el.childNodes[0].nodeType === 3) {
          el.childNodes[0].nodeValue = val;
        } else {
          el.textContent = val;
        }
      };
      if (reduceMotion) { updateValue(fmt(target)); return; }
      const dur = 1600, start = performance.now();
      function frame(t){
        const p = Math.min((t-start)/dur, 1);
        const e = 1 - Math.pow(1-p, 3);
        updateValue(fmt(Math.round(target*e)));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => {
        en.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }});
      }, { threshold: .4 });
      els.forEach(el => io.observe(el));
    } else els.forEach(animate);
  })();

  (function(){
    const input = $('#demoInput'), box = $('#demoBox');
    if (!input || !box) return;
    const headline = 'Small lab releases open weight model matching frontier benchmarks at one fortieth the cost';
    let started = false;
    function run(){
      if (started) return; started = true;
      if (reduceMotion) { input.innerHTML = headline + '<span class="cursor" aria-hidden="true"></span>'; showAll(); return; }
      let i = 0;
      function type(){
        if (i <= headline.length) {
          input.innerHTML = headline.slice(0, i) + '<span class="cursor" aria-hidden="true"></span>';
          i++; setTimeout(type, 22 + Math.random()*18);
        } else { show(1, 200); show(2, 500); show(3, 800); show(4, 1200); }
      }
      type();
    }
    function show(n, delay){
      setTimeout(() => {
        const p = box.querySelector('.demo__panel[data-panel="' + n + '"]');
        if (!p) return; p.classList.add('show');
        const f = p.querySelector('.meter-fill');
        if (f) setTimeout(() => { f.style.width = (f.getAttribute('data-fill')||0) + '%'; }, 100);
      }, delay);
    }
    function showAll(){
      $$('.demo__panel', box).forEach((p, idx) => setTimeout(() => {
        p.classList.add('show');
        const f = p.querySelector('.meter-fill');
        if (f) f.style.width = (f.getAttribute('data-fill')||0)+'%';
      }, idx*100));
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => {
        en.forEach(e => { if (e.isIntersecting) { run(); io.unobserve(e.target); }});
      }, { threshold: .3 });
      io.observe(box);
    } else run();
  })();

  (function(){
    const hour = $('#clockHour'), min = $('#clockMin'), time = $('#clockTime');
    const slots = $$('#clockSlots .slot');
    if (!hour || !min || !time) return;
    function setTime(h){
      time.textContent = String(h).padStart(2,'0') + ':00';
      hour.style.transform = 'rotate(' + ((h%12)*30) + 'deg)';
      min.style.transform = 'rotate(0deg)';
      slots.forEach(s => s.classList.toggle('active', parseInt(s.dataset.hour,10) === h));
    }
    slots.forEach(s => s.addEventListener('click', () => setTime(parseInt(s.dataset.hour,10))));
    setTime(6);
  })();

  const burger = $('#burger'), navlist = $('#navlist');
  if (burger && navlist) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      navlist.classList.toggle('open', !open);
    });
    $$('a', navlist).forEach(a => a.addEventListener('click', () => {
      if (innerWidth <= 900) { navlist.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
    }));
  }

  const reportBtn = $('#reportBtn'), reportPanel = $('#reportPanel'),
        reportClose = $('#reportClose'), reportSend = $('#reportSend'),
        reportFine = $('#reportFine');
  function openReport(){
    if (!reportPanel) return;
    reportPanel.classList.add('open');
    if (reportBtn) reportBtn.setAttribute('aria-expanded','true');
    setTimeout(() => { const t = $('#reportMsg'); if (t) t.focus(); }, 260);
  }
  function closeReport(){
    if (!reportPanel) return;
    reportPanel.classList.remove('open');
    if (reportBtn) reportBtn.setAttribute('aria-expanded','false');
  }
  if (reportBtn) reportBtn.addEventListener('click', () => reportPanel.classList.contains('open') ? closeReport() : openReport());
  if (reportClose) reportClose.addEventListener('click', closeReport);
  $$('.report-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.report-opt').forEach(o => { o.classList.remove('active'); o.setAttribute('aria-checked','false'); });
      opt.classList.add('active'); opt.setAttribute('aria-checked','true');
    });
  });
  if (reportSend) {
    reportSend.addEventListener('click', () => {
      const kindEl = $('.report-opt.active');
      const kind = kindEl ? kindEl.dataset.report : 'other';
      reportFine.textContent = 'Thank you. Report filed under ' + kind + '.';
      reportFine.style.color = 'var(--stamp)';
      if ($('#reportMsg')) $('#reportMsg').value = '';
      setTimeout(() => { reportFine.textContent = 'We reply to every message within a day.'; reportFine.style.color=''; closeReport(); }, 2400);
    });
  }
  const footReport = $('#footReport');
  if (footReport) footReport.addEventListener('click', (e) => { e.preventDefault(); openReport(); });
  document.addEventListener('click', (e) => {
    if (!reportPanel || !reportPanel.classList.contains('open')) return;
    if (reportPanel.contains(e.target)) return;
    if (reportBtn && reportBtn.contains(e.target)) return;
    if (footReport && footReport.contains(e.target)) return;
    closeReport();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeReport(); });

  const topBtn = $('#topBtn');
  if (topBtn) {
    addEventListener('scroll', () => { topBtn.classList.toggle('show', scrollY > 500); }, { passive: true });
    topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  }

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const t = document.querySelector(href);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();
// MR NEWS — Executive Morning Intelligence Platform
