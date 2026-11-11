'use strict';
// Booking forms (general dialog + event registration): signed token from the Worker,
// client-side checks, bilingual messages, ad-source (UTM) forwarding.
// Success is shown only after Telegram confirms delivery.
(() => {
  const lang = document.documentElement.lang === 'ru' ? 'ru' : 'uz';
  let M = {};
  try { M = JSON.parse(document.querySelector('#ui-text').textContent).form || {}; } catch { M = {}; }

  function timeoutSignal(ms) {
    if (typeof AbortSignal.timeout === 'function') return AbortSignal.timeout(ms);
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  }

  function setup(form) {
    const root = form.closest('[data-booking-root]') || form.parentElement;
    const kind = form.dataset.booking;
    const submit = form.querySelector('[type=submit]');
    const status = form.querySelector('.form-status');
    const view = root.querySelector('[data-form-view]');
    const success = root.querySelector('[data-success]');
    const receipt = root.querySelector('[data-receipt]');
    const submitLabel = submit.querySelector('span').textContent;
    const closes = form.dataset.closes ? Date.parse(form.dataset.closes) : NaN;
    const names = kind === 'event' ? ['name', 'phone', 'age', 'diagnosis', 'slot', 'consent'] : ['name', 'phone', 'group', 'topic', 'date', 'consent'];
    let config = null, configuredAt = 0, configPromise = null, sending = false, sent = false;

    const showStatus = (message, state = '') => { status.textContent = message || ''; status.dataset.kind = state; };
    const errorSlot = name => form.querySelector(`[data-error-for="${name}"]`) || document.getElementById(`${name}-error`);
    function fieldError(name, message) {
      const slot = errorSlot(name);
      if (slot) slot.textContent = message || '';
      const field = form.elements.namedItem(name);
      const target = field instanceof RadioNodeList ? form.querySelector('.slot-field') : field;
      if (!target) return;
      if (message) target.setAttribute('aria-invalid', 'true'); else target.removeAttribute('aria-invalid');
    }
    const clearErrors = () => names.forEach(n => fieldError(n, ''));
    const isClosed = () => Number.isFinite(closes) && Date.now() >= closes;
    function closeForm() {
      submit.disabled = true;
      form.querySelectorAll('input, select').forEach(el => { el.disabled = true; });
      showStatus(M.closed || '', 'error');
    }

    async function prepare() {
      if (sent) return;
      if (isClosed()) return closeForm();
      if (config && Date.now() - configuredAt < 25 * 60000) return;
      if (configPromise) return configPromise;
      submit.disabled = true;
      showStatus(M.preparing || '…', 'loading');
      configPromise = (async () => {
        try {
          const response = await fetch(`/api/booking/config?lang=${lang}`, { credentials: 'same-origin', cache: 'no-store', signal: timeoutSignal(15000) });
          let body = {};
          try { body = await response.json(); } catch { body = {}; }
          if (!response.ok || !body.ready || typeof body.token !== 'string') throw Object.assign(new Error(body.message || M.notReady), { known: true });
          config = body;
          configuredAt = Date.now();
          if (form.elements.date) { form.elements.date.min = body.minDate; form.elements.date.max = body.maxDate; }
          // The server rejects submissions that arrive less than 1.2 s after the token is issued.
          await new Promise(resolve => setTimeout(resolve, 1250));
          submit.disabled = false;
          showStatus('');
        } catch (error) {
          config = null;
          showStatus(error.known ? error.message : (M.connect || M.notReady), 'error');
        } finally { configPromise = null; }
      })();
      return configPromise;
    }

    if (root.tagName === 'DIALOG') root.addEventListener('booking:open', prepare);
    else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => { if (entries.some(en => en.isIntersecting)) { io.disconnect(); prepare(); } }, { rootMargin: '400px' });
      io.observe(form);
      form.addEventListener('focusin', prepare, { once: true });
    } else prepare();

    form.addEventListener('input', event => { if (names.includes(event.target.name)) fieldError(event.target.name, ''); });
    form.addEventListener('change', event => { if (event.target.name === 'slot') fieldError('slot', ''); });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (isClosed()) return closeForm();
      if (sending || sent) return;
      if (!config) { await prepare(); if (!config) return; }
      clearErrors();
      const problems = {};
      const value = n => (form.elements.namedItem(n)?.value || '').trim();
      const name = value('name').replace(/\s+/g, ' ');
      const phone = value('phone');
      if (name.length < 2 || name.length > 80 || !/^[\p{L}\p{M}\s‘’ʻʼ'`.-]+$/u.test(name)) problems.name = M.name;
      if (!/^(?:998)?\d{9}$/.test(phone.replace(/[\s()+-]/g, ''))) problems.phone = M.phone;
      const payload = { name, phone, consent: true, website: value('website'), token: config.token, lang, source: {} };
      if (kind === 'event') {
        payload.event = form.dataset.event;
        payload.age = value('age');
        payload.diagnosis = value('diagnosis');
        payload.slot = form.querySelector('input[name="slot"]:checked')?.value || '';
        if (!payload.age) problems.age = M.age;
        if (!payload.slot) problems.slot = M.slot;
      } else {
        payload.group = value('group');
        payload.topic = value('topic');
        payload.date = value('date');
        if (!payload.group) problems.group = M.group;
        if (payload.date && (payload.date < config.minDate || payload.date > config.maxDate)) problems.date = M.date;
      }
      if (!form.elements.consent.checked) problems.consent = M.consent;
      if (Object.keys(problems).length) {
        Object.entries(problems).forEach(([k, v]) => fieldError(k, v));
        const first = form.elements.namedItem(Object.keys(problems)[0]);
        (first instanceof RadioNodeList ? first[0] : first)?.focus();
        showStatus(M.check, 'error');
        return;
      }
      try { payload.source = typeof window.siteSource === 'function' ? window.siteSource() : {}; } catch { payload.source = {}; }
      sending = true;
      submit.disabled = true;
      submit.querySelector('span').textContent = M.sending || '…';
      form.setAttribute('aria-busy', 'true');
      showStatus(M.sendingStatus || '', 'loading');
      let uncertain = false;
      try {
        const response = await fetch('/api/booking', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', signal: timeoutSignal(20000),
          body: JSON.stringify(payload)
        });
        let result = {};
        try { result = await response.json(); } catch { result = {}; }
        if (response.ok && result.ok === true && typeof result.receipt === 'string') {
          sent = true;
          form.reset();
          if (view) view.hidden = true;
          if (success) {
            success.hidden = false;
            const when = success.querySelector('[data-when]');
            if (when && M.successWhen) when.textContent = M.successWhen.replace('{slot}', payload.slot || '');
            success.focus();
          }
          if (receipt) receipt.textContent = `${M.receipt || ''} ${result.receipt}`;
          showStatus('');
          document.dispatchEvent(new CustomEvent('booking:sent', { detail: { topic: payload.topic || 'event', slot: payload.slot } }));
          return;
        }
        if (result.fields) {
          Object.entries(result.fields).forEach(([k, v]) => fieldError(k, v));
          form.querySelector('[aria-invalid=true]')?.focus?.();
        }
        if (result.code === 'event_closed') { closeForm(); return; }
        uncertain = result.code === 'delivery_unknown';
        showStatus(result.message || M.failed, 'error');
        if (result.code === 'token_expired') {
          config = null;
          await prepare();
          showStatus(M.refreshed, '');
        }
      } catch {
        uncertain = true;
        showStatus(M.network, 'error');
      } finally {
        sending = false;
        form.removeAttribute('aria-busy');
        submit.querySelector('span').textContent = submitLabel;
        if (!isClosed()) submit.disabled = sent || uncertain || !config;
      }
    });
  }

  document.querySelectorAll('form[data-booking]').forEach(setup);
})();
