'use strict';
// Scroll & entrance motion (GSAP + ScrollTrigger, local vendor files).
// Without GSAP or with reduced motion everything stays visible and static.
(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    document.documentElement.classList.add('motion-ready');
    // Hero entrance.
    // GSAP warns about missing targets; only animate what this page has.
    const has = sel => document.querySelector(sel) !== null;
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const step = (sel, from, to, at) => { if (has(sel)) intro.fromTo(sel, from, to, at); };
    step('.hero-portrait img', { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0);
    step('.portrait-orbit', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 0.1);
    step('.hero-portrait figcaption', { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, 0.55);
    step('.ev-photo', { y: 30, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1.1 }, 0.05);
    step('.ev-photo figcaption', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.6);
    step('.hero-copy > *', { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.08 }, 0.08);
    step('.stats .stat', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 }, 0.45);
    step('.hero-location, .stats-note', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.7);

    // Count-up numbers.
    document.querySelectorAll('[data-count]').forEach(el => {
      const end = Number(el.dataset.count);
      if (!Number.isFinite(end)) return;
      const state = { v: 0 };
      el.textContent = '0';
      gsap.to(state, {
        v: end, duration: end > 20 ? 1.8 : 1.2, ease: 'power2.out', delay: 0.5,
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        onUpdate: () => { el.textContent = String(Math.round(state.v)); }
      });
    });

    // Section reveals (batched for performance).
    const reveals = gsap.utils.toArray('.reveal');
    gsap.set(reveals, { opacity: 0, y: 28 });
    ScrollTrigger.batch(reveals, {
      start: 'top 90%', once: true,
      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', stagger: 0.08, overwrite: true })
    });
    gsap.utils.toArray('.eyebrow > span').forEach(line => {
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: line, start: 'top 92%', once: true } });
    });

    // Insurance steps: a nerve fibre is drawn as you scroll and lights each step.
    const steps = document.querySelector('.steps');
    const items = gsap.utils.toArray('.steps li');
    const light = (progress, marks) => items.forEach((li, i) => li.classList.toggle('lit', progress >= (marks[i] ?? 1)));
    const wide = gsap.matchMedia();
    wide.add('(min-width: 960px)', () => {
      const path = document.querySelector('.nerve-line');
      const pulse = document.querySelector('.nerve-pulse');
      if (!path || !steps) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      const state = { p: 0 };
      const render = () => {
        path.style.strokeDashoffset = `${len * (1 - state.p)}`;
        const pt = path.getPointAtLength(len * state.p);
        if (pulse) { pulse.style.left = `${(pt.x / 1000) * 100}%`; pulse.style.top = `${pt.y}px`; pulse.style.opacity = state.p > 0.002 ? '1' : '0'; }
        light(state.p, [0.13, 0.49, 0.84]);
      };
      render();
      gsap.to(state, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: steps, start: 'top 82%', end: 'center 45%', scrub: 0.8 } });
      return () => { path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; };
    });
    wide.add('(max-width: 959px)', () => {
      const list = document.querySelector('.steps ol');
      if (!list) return;
      const state = { p: 0 };
      const pulseV = document.querySelector('.nerve-pulse-v');
      const render = () => {
        list.style.setProperty('--p', state.p.toFixed(3));
        if (pulseV) { pulseV.style.top = `calc(26px + ${state.p.toFixed(3)} * (100% - 52px))`; pulseV.style.opacity = state.p > 0.01 && state.p < 0.995 ? '1' : '0'; }
        light(state.p, [0.02, 0.45, 0.9]);
      };
      render();
      gsap.to(state, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: list, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 } });
      return () => list.style.removeProperty('--p');
    });

    // Gentle depth on large screens.
    const desktop = gsap.matchMedia();
    desktop.add('(min-width: 960px)', () => {
      if (has('.hero-portrait img')) gsap.to('.hero-portrait img', { y: 50, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 } });
      if (has('.hero-glow')) gsap.to('.hero-glow', { y: 90, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      if (has('.approach-panel')) gsap.fromTo('.approach-panel', { scale: 0.96 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.approach-panel', start: 'top 95%', end: 'top 50%', scrub: 0.7 } });
      if (has('.event-banner')) gsap.fromTo('.event-banner', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.event-banner', start: 'top 95%', once: true } });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    return () => {
      document.documentElement.classList.remove('motion-ready');
      gsap.set(reveals, { clearProps: 'opacity,visibility,transform' });
      document.querySelectorAll('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
      items.forEach(li => li.classList.add('lit'));
    };
  });

  // Reduced motion: steps fully lit, no drawing.
  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelectorAll('.steps li').forEach(li => li.classList.add('lit'));
    document.querySelector('.steps ol')?.style.setProperty('--p', '1');
  });
})();
