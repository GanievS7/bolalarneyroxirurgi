'use strict';
// Navigation, dialogs (booking / condition / video), header state, video cover upgrade.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let ui = {};
  try { ui = JSON.parse($('#ui-text').textContent); } catch { ui = {}; }

  const header = $('.site-header');
  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  const bookingDialog = $('#booking-dialog');
  const conditionDialog = $('#condition-dialog');
  const videoDialog = $('#video-dialog');
  let returnFocus = null;

  function setMenu(open, restoreFocus = false) {
    if (!menuToggle) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? (ui.menuClose || 'Close') : (ui.menuOpen || 'Menu'));
    mobileNav.hidden = !open;
    header.classList.toggle('menu-open', open);
    if (restoreFocus) menuToggle.focus();
  }

  function openDialog(dialog, trigger) {
    if (!dialog || typeof dialog.showModal !== 'function') return false;
    returnFocus = trigger || document.activeElement;
    $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
    setMenu(false);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    if (dialog === bookingDialog) dialog.dispatchEvent(new CustomEvent('booking:open'));
    return true;
  }

  function showCondition(key, trigger) {
    const template = document.getElementById(`cond-${key}`);
    if (!template) return;
    const root = $('#condition-content');
    root.replaceChildren(template.content.cloneNode(true));
    conditionDialog.scrollTop = 0;
    openDialog(conditionDialog, trigger);
  }

  function showVideo(id, trigger) {
    if (!/^[\w-]{11}$/.test(id)) return;
    const title = (ui.videos && ui.videos[id]) || 'YouTube';
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&autoplay=1`;
    frame.title = title;
    frame.className = 'video-frame';
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    $('#video-modal-title').textContent = title;
    $('#video-player').replaceChildren(frame);
    $('#video-fallback').href = `https://www.youtube.com/watch?v=${id}`;
    if (!openDialog(videoDialog, trigger)) window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener');
  }

  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('click', event => {
    const book = event.target.closest('[data-book]');
    if (book) {
      const topic = book.dataset.topic;
      const select = $('#booking-topic');
      if (select) select.value = topic && [...select.options].some(o => o.value === topic) ? topic : 'consultation';
      const focusTarget = book.closest('dialog') ? returnFocus : book;
      if (!openDialog(bookingDialog, focusTarget)) window.location.href = $('a[href^="tel:"]').href;
      return;
    }
    const condition = event.target.closest('[data-condition]');
    if (condition) return showCondition(condition.dataset.condition, condition);
    const video = event.target.closest('[data-video]');
    if (video) return showVideo(video.dataset.video, video);
    const close = event.target.closest('[data-close]');
    if (close) return close.closest('dialog').close();
    if (event.target.closest('#mobile-nav a')) setMenu(false);
    else if (mobileNav && !mobileNav.hidden && !event.target.closest('.site-header')) setMenu(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) setMenu(false, true);
  });

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog === videoDialog) $('#video-player').replaceChildren();
      queueMicrotask(() => {
        if (!$('dialog[open]')) {
          document.body.classList.remove('modal-open');
          if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
        }
      });
    });
  });

  // Header gets a solid background once the page scrolls.
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.matchMedia('(min-width: 1180px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Active section in desktop navigation.
  if ('IntersectionObserver' in window) {
    const links = $$('.desktop-nav a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const current = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', current);
          if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    $$('main section[id]').forEach(section => observer.observe(section));
  }

  // Video covers: local frames ship with the page; if the browser can load YouTube's own
  // vertical Shorts cover and it really is portrait, swap it in for a sharper image.
  const upgrade = img => {
    const id = img.dataset.yt;
    const tryUrl = urls => {
      if (!urls.length) return;
      const probe = new Image();
      probe.referrerPolicy = 'no-referrer';
      probe.onload = () => { if (probe.naturalHeight > probe.naturalWidth && probe.naturalWidth >= 300) img.src = probe.src; else tryUrl(urls.slice(1)); };
      probe.onerror = () => tryUrl(urls.slice(1));
      probe.src = urls[0];
    };
    tryUrl([`https://i.ytimg.com/vi/${id}/oardefault.jpg`, `https://i.ytimg.com/vi/${id}/oar2.jpg`]);
  };
  const covers = $$('img[data-yt]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { io.unobserve(entry.target); upgrade(entry.target); } }), { rootMargin: '300px' });
    covers.forEach(img => io.observe(img));
  }

  // Pointer spotlight on cards.
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('.cond-card, .adult-card').forEach(card => card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  }

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
