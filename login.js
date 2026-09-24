(function(){
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches && window.innerWidth > 900;

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
    $$('a, button, .time-opt, .topic-chip, .brand__logo').forEach(el => {
      el.addEventListener('mouseenter', () => core && core.classList.add('hover'));
      el.addEventListener('mouseleave', () => core && core.classList.remove('hover'));
    });
  } else {
    const c = $('#inkCore'); if (c) c.style.display = 'none';
  }

  const flow = $('#flow');
  let chosenTime = '06:00';
  let chosenTopics = ['policy','labs','chips','funding'];

  function goToStep(n){
    if (!flow) return;
    $$('.flow__step', flow).forEach(s => s.classList.toggle('active', s.dataset.step === String(n)));
  }

  const googleBtn = $('#googleBtn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      if (googleBtn.classList.contains('verifying') || googleBtn.disabled) return;
      const label = $('span', googleBtn);
      const original = label ? label.textContent : '';
      if (label) label.textContent = 'Verifying';
      googleBtn.classList.add('verifying');
      googleBtn.disabled = true;
      setTimeout(() => {
        if (label) label.textContent = 'Signed In';
        setTimeout(() => {
          if (label) label.textContent = original;
          googleBtn.classList.remove('verifying');
          googleBtn.disabled = false;
          goToStep(2);
        }, 800);
      }, 1100);
    });
  }

  $$('#times .time-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#times .time-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chosenTime = btn.dataset.time;
    });
  });

  $$('#topics .topic-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      chosenTopics = $$('#topics .topic-chip.active').map(c => c.dataset.topic);
    });
  });

  const finishBtn = $('#finishBtn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      const cTime = $('#confirmTime');
      const cMeta = $('#confirmTimeMeta');
      const cTopics = $('#confirmTopics');
      if (cTime) cTime.textContent = chosenTime;
      if (cMeta) cMeta.textContent = chosenTime + ' local';
      if (cTopics) cTopics.textContent = chosenTopics.length + ' on';
      goToStep(3);
    });
  }

  $$('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(1));
  });
})();
// MR NEWS — Executive Morning Intelligence Platform
