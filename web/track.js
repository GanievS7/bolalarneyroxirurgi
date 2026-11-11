'use strict';
// Ad attribution + optional Meta Pixel and Yandex Metrica.
// 1) Remembers where the visitor came from (utm_* / fbclid / referrer) for this browser session
//    and exposes it as window.siteSource() — the booking form forwards it to Telegram.
// 2) If <meta name="meta-pixel-id"> holds an ID, loads Meta Pixel and reports PageView,
//    Contact (phone / Telegram taps) and Lead (confirmed booking). Empty ID → nothing loads.
// 3) If <meta name="ym-id"> holds a counter number, loads Yandex Metrica with Webvisor and sends
//    goals: call, telegram, form_open, lead, lead_event.
(() => {
  const KEY = 'site-source-v1';
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { return null; } };
  const write = value => { try { sessionStorage.setItem(KEY, JSON.stringify(value)); } catch { /* private mode */ } };

  let source = read();
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh = {};
    keys.forEach(k => { const v = params.get(k); if (v) fresh[k] = v.slice(0, 120); });
    if (params.get('fbclid')) fresh.click = 'fb';
    if (Object.keys(fresh).length) source = fresh; // a new ad click wins
    else if (!source) {
      const ref = document.referrer ? new URL(document.referrer) : null;
      source = ref && ref.host && ref.host !== window.location.host ? { ref: ref.host.replace(/^www\./, '').slice(0, 120) } : {};
    }
    write(source);
  } catch { source = source || {}; }
  window.siteSource = () => ({ ...(source || {}) });

  const meta = name => (document.querySelector(`meta[name="${name}"]`)?.content || '').trim();
  const pixelId = meta('meta-pixel-id');
  const ymId = meta('ym-id');
  const hasPixel = /^\d{10,20}$/.test(pixelId);
  const hasYm = /^\d{5,12}$/.test(ymId);
  if (!hasPixel && !hasYm) return;

  if (hasPixel) {
    /* Meta Pixel base code (official snippet, unminified). */
    const f = window;
    if (!f.fbq) {
      const n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }

  if (hasYm) {
    /* Yandex Metrica tag (official loader, unminified). Webvisor = session recordings. */
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(script);
    window.ym(Number(ymId), 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }

  // One place for conversions: Meta standard events + Yandex goals (create the same goal IDs in Metrica).
  const goal = (ymGoal, fbEvent, params) => {
    try { if (hasYm) window.ym(Number(ymId), 'reachGoal', ymGoal, params); } catch { /* ignore */ }
    try { if (hasPixel && fbEvent) window.fbq('track', fbEvent, params); } catch { /* ignore */ }
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    if (link.href.startsWith('tel:')) goal('call', 'Contact', { method: 'phone' });
    else if (/^https:\/\/t\.me\//.test(link.href)) goal('telegram', 'Contact', { method: 'telegram' });
  }, { capture: true });
  document.querySelectorAll('dialog#booking-dialog').forEach(d => d.addEventListener('booking:open', () => goal('form_open', null)));
  document.addEventListener('booking:sent', event => {
    const topic = event.detail?.topic || 'consultation';
    goal(topic === 'event' ? 'lead_event' : 'lead', 'Lead', { content_name: topic, content_category: 'booking' });
  });
})();
