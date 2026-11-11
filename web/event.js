'use strict';
// Event helpers: live countdown to the consultation day and auto-hiding the news banner
// once the event is over. Times come from data-start / data-end (ISO with +05:00).
(() => {
  const timers = [...document.querySelectorAll('[data-countdown]')];
  const banners = [...document.querySelectorAll('[data-event-banner]')];
  const pad = n => String(n).padStart(2, '0');

  function hideFinished(now) {
    banners.forEach(el => {
      const end = Date.parse(el.dataset.end);
      if (Number.isFinite(end) && now >= end) el.hidden = true;
    });
  }

  function render(now) {
    timers.forEach(el => {
      const start = Date.parse(el.dataset.start);
      const end = Date.parse(el.dataset.end);
      const label = el.querySelector('.cd-label');
      let state = 'before';
      if (now >= end) state = 'after'; else if (now >= start) state = 'during';
      if (el.dataset.state !== state) {
        el.dataset.state = state;
        if (label) label.textContent = el.dataset[state] || '';
        // Tadbir tugagach "YANGILIK" yorlig'i va band qilish tugmasi yashiriladi.
        document.querySelectorAll('[data-event-live]').forEach(n => { n.hidden = state === 'after'; });
      }
      const left = Math.max(0, (state === 'before' ? start : end) - now);
      const parts = { d: Math.floor(left / 86400000), h: Math.floor(left / 3600000) % 24, m: Math.floor(left / 60000) % 60, s: Math.floor(left / 1000) % 60 };
      el.querySelectorAll('[data-u]').forEach(b => { b.textContent = pad(parts[b.dataset.u]); });
    });
  }

  function tick() {
    const now = Date.now();
    render(now);
    hideFinished(now);
  }

  tick();
  if (timers.length) setInterval(tick, 1000);
})();
