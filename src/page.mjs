// Page template: (t = content/<lang>.mjs, site = site.mjs) => full HTML document.
const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const e = value => String(value ?? '').replace(/[&<>"]/g, ch => map[ch]);
// Russian typography: keep one-letter prepositions/conjunctions with the next word.
const NBSP = String.fromCharCode(160);
export const typo = (value, lang) => {
  const v = String(value).replace(/(\d) (\d{3})/g, (m, a, b) => a + NBSP + b);
  return lang === 'ru' ? v.replace(/(^|\s)([вксуоиаВКСУОИА])\s+/g, (m, a, b) => a + b + NBSP) : v;
};
export const icon = (id, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} aria-hidden="true"><use href="#${id}"/></svg>`;
export const conditionIcon = { hydrocephalus: 'i-hydro', spina: 'i-spine', cranio: 'i-skull', encephalocele: 'i-encephalo', cephalohematoma: 'i-baby', cp: 'i-cp', cranioplasty: 'i-mesh', tumor: 'i-tumor' };

export const ICONS = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-defs" aria-hidden="true"><defs>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 5l7 7-7 7"/></symbol>
<symbol id="i-diagonal" viewBox="0 0 24 24"><path d="M6 18 18 6M8 6h10v10"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="m7 3 3 5-2 2a14 14 0 0 0 6 6l2-2 5 3c-1 5-5 5-9 3A22 22 0 0 1 4 12C2 8 2 4 7 3Z"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2"/></symbol>
<symbol id="i-brain" viewBox="0 0 24 24"><path d="M12 4c-1-3-6-2-6 2-4 0-5 5-3 7-2 4 2 8 6 7 1 2 3 1 3-1V4Zm0 0c1-3 6-2 6 2 4 0 5 5 3 7 2 4-2 8-6 7-1 2-3 1-3-1"/><path d="M6 6v4m-3 3h4l2 2M6 20v-3m12-11v4m3 3h-4l-2 2m3 5v-3"/></symbol>
<symbol id="i-tumor" viewBox="0 0 24 24"><path d="M12 4c-1-3-6-2-6 2-4 0-5 5-3 7-2 4 2 8 6 7 1 2 3 1 3-1V4Zm0 0c1-3 6-2 6 2 4 0 5 5 3 7 2 4-2 8-6 7-1 2-3 1-3-1"/><circle cx="16" cy="11" r="2.2"/><path d="M6 7v3m-2 3h3"/></symbol>
<symbol id="i-spine" viewBox="0 0 24 24"><path d="M12 2c-5 5 5 15 0 20M7 3l8 1M6 7l10 1M8 11l10 1M8 15l10 1M7 19l9 1"/></symbol>
<symbol id="i-hydro" viewBox="0 0 24 24"><path d="M12 2.5a8.5 8.5 0 0 0-8.5 8.5c0 3 1.4 5.2 3.2 6.8V21.5h10.6v-3.7c1.8-1.6 3.2-3.8 3.2-6.8A8.5 8.5 0 0 0 12 2.5Z"/><path d="M12 7.5c1.7 2.1 2.7 3.5 2.7 4.8a2.7 2.7 0 0 1-5.4 0c0-1.3 1-2.7 2.7-4.8Z"/></symbol>
<symbol id="i-skull" viewBox="0 0 24 24"><path d="M4 13.5a8 8 0 1 1 16 0V16l-2 1.2V21H6v-3.8L4 16Z"/><path d="M12 5.5v4.2l-2.4 2.2M12 9.7l2.4 2.2M9 16.5h.01M15 16.5h.01"/></symbol>
<symbol id="i-encephalo" viewBox="0 0 24 24"><path d="M14 4.2A8 8 0 1 0 14 19.8"/><path d="M14 4.2c3 .9 5 3.6 5 6.6"/><circle cx="18.6" cy="15" r="3.2"/><path d="M8 11h.01M7 15c1 .8 2.4 1 3.6.5"/></symbol>
<symbol id="i-baby" viewBox="0 0 24 24"><circle cx="12" cy="14" r="7.5"/><path d="M8.5 6.8c.6-2.3 2.1-3.6 3.5-3.6s2.9 1.3 3.5 3.6"/><path d="M9.3 13.5h.01M14.7 13.5h.01M10 17c1.2.8 2.8.8 4 0"/></symbol>
<symbol id="i-cp" viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="2.2"/><path d="M12 7.5v6.5M7 10.5l5-1.5 5 1.5M8.5 21.5l3.5-7.5 3.5 7.5"/><path d="M5 21.5h3M16 21.5h3"/></symbol>
<symbol id="i-mesh" viewBox="0 0 24 24"><path d="M3.5 15a8.5 8.5 0 1 1 17 0v1.5h-17Z"/><path d="M8 8.2v8.3M12 6v10.5M16 8.2v8.3M4.6 11.3h14.8M3.8 14h16.4"/></symbol>
<symbol id="i-pulse" viewBox="0 0 24 24"><path d="M2 12h4l2-5 4 11 3-8 2 2h5"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></symbol>
<symbol id="i-academic" viewBox="0 0 24 24"><path d="m2 8 10-5 10 5-10 5Z M6 10v7c4 3 8 3 12 0v-7M22 8v8"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="m5 5 14 14M5 19 19 5"/></symbol>
<symbol id="i-telegram" viewBox="0 0 24 24"><path d="m21 3-4 18-6-5-4 3 1-6 10-7L5 11 2 9Z"/></symbol>
<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
<symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/></symbol>
</defs></svg>`;

export function brand(t, base, href = `${base || './'}#asosiy`, cls = 'brand') {
  return `<a class="${cls}" href="${href}" aria-label="${e(t.doctor.short)} — ${e(t.ui.home)}"><img src="${base}assets/logo-5.svg" alt="" width="56" height="56"><span>${e(t.brand.line1)}<br>${e(t.brand.line2)}<small>${e(t.brand.role)}</small></span></a>`;
}

export function langSwitch(t, href = t.switch.otherHref) {
  return `<nav class="lang-switch" aria-label="${e(t.switch.label)}">${icon('i-globe')}<span aria-current="true">${e(t.switch.current)}</span><a href="${href}" hreflang="${t.switch.otherLang}" lang="${t.switch.otherLang}" title="${e(t.switch.otherName)}">${e(t.switch.other)}</a></nav>`;
}

function heading(block, extra = '') {
  return `<div class="section-heading reveal${extra}"><p class="eyebrow">${e(block.eyebrow)}<span></span></p><h2>${e(block.h2a)} <span>${e(block.h2b)}</span></h2></div>`;
}

function conditionTemplate(key, c, t) {
  const C = t.conditions;
  const source = c.source ? `<a class="modal-source" href="${e(c.source[1])}" target="_blank" rel="noopener noreferrer">${e(C.sourcePrefix)}: ${e(c.source[0])} ${icon('i-diagonal')}</a>` : '';
  return `<template id="cond-${key}"><div class="cond-modal-head"><span class="cond-icon">${icon(conditionIcon[key] || 'i-users')}</span><div><p class="eyebrow">${e(C.modalEyebrow)}</p><h2 id="cond-modal-title">${e(c.name)}</h2></div></div>
<h3>${e(C.whatTitle)}</h3><p>${e(c.what)}</p>
<h3>${e(c.signsTitle || C.signsTitle)}</h3><ul>${c.signs.map(s => `<li>${e(s)}</li>`).join('')}</ul>
<h3>${e(C.treatTitle)}</h3><p>${e(c.treat)}</p>
<p class="modal-notice">${e(C.footnote)}</p>${source}</template>`;
}

function adultTemplate(t) {
  const a = t.conditions.adults;
  return `<template id="cond-adults"><div class="cond-modal-head"><span class="cond-icon">${icon('i-users')}</span><div><p class="eyebrow">${e(t.conditions.modalEyebrow)}</p><h2 id="cond-modal-title">${e(a.name)}</h2></div></div>
<p>${e(a.what)}</p><h3>${e(a.listTitle)}</h3><ul>${a.list.map(s => `<li>${e(s)}</li>`).join('')}</ul>
<p class="modal-notice">${e(a.note)}</p></template>`;
}

export function countdown(t, ev, cls = '') {
  const c = t.event.countdown;
  const unit = (u, l) => `<span class="cd-unit"><b data-u="${u}">··</b><small>${e(l)}</small></span>`;
  return `<div class="countdown ${cls}" data-countdown data-start="${ev.start}" data-end="${ev.closes}" data-before="${e(c.before)}" data-during="${e(c.during)}" data-after="${e(c.after)}"><span class="cd-label">${e(c.before)}</span><span class="cd-units">${unit('d', c.d)}${unit('h', c.h)}${unit('m', c.m)}${unit('s', c.s)}</span></div>`;
}

function eventBanner(t, site, base) {
  const ev = site.eventData; const b = t.event.banner;
  if (!ev) return '';
  return `<section class="event-strip" data-event-banner data-end="${ev.closes}" aria-label="${e(b.tag)}">
  <div class="container"><a class="event-banner" href="${t.event.path}#ariza">
    <span class="eb-photo"><img src="${base}assets/mentor-ashrapov-680.webp" alt="" width="136" height="170" loading="lazy" decoding="async"></span>
    <span class="eb-body"><span class="eb-tag"><i></i>${e(b.tag)}</span><strong>${e(typo(b.title, t.lang))}</strong><small>${e(b.text)}</small></span>
    ${countdown(t, ev, 'cd-compact')}
    <span class="eb-cta">${e(b.cta)} ${icon('i-arrow')}</span>
  </a></div>
</section>`;
}

export function renderPage(t, site) {
  const base = t.base;
  const url = site.domain + t.path;
  const ruUrl = site.domain + '/ru/';
  const uzUrl = site.domain + '/';
  const C = t.conditions;
  const faqLd = { '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: t.lang, mainEntity: t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site.domain}/#website`, url: uzUrl, name: t.doctor.short, inLanguage: ['uz', 'ru'] },
      { '@type': 'Hospital', '@id': `${site.domain}/#clinic`, name: 'Compass Hospital', address: { '@type': 'PostalAddress', streetAddress: t.lang === 'ru' ? 'ул. Комус, 40' : 'Qomus ko‘chasi, 40-uy', addressLocality: t.lang === 'ru' ? 'Фергана' : 'Farg‘ona', addressCountry: 'UZ' } },
      { '@type': 'Person', '@id': `${site.domain}/#doctor`, name: t.doctor.full, alternateName: ['Xumoyunmirzo Yoqubjonov', 'Хумоюнмирзо Якубжонов'], jobTitle: t.doctor.role, url, image: `${site.domain}/assets/doctor-cutout.webp`, telephone: site.phone, worksFor: { '@id': `${site.domain}/#clinic` }, alumniOf: t.about.education.map(([, n]) => ({ '@type': 'CollegeOrUniversity', name: n })), knowsAbout: site.conditions.map(k => C.items[k].name), sameAs: [site.telegram, site.instagram, site.youtube] },
      faqLd
    ]
  };

  const ui = {
    lang: t.lang,
    form: t.form.messages,
    videos: Object.fromEntries(Object.entries(t.videos.items).map(([id, [, title]]) => [id, title])),
    menuOpen: t.ui.menuOpen, menuClose: t.ui.menuClose,
    countdown: t.event.countdown
  };

  const stats = t.stats.map(s => `<div class="stat">${s.text ? `<strong class="stat-text">${e(s.text)}</strong>` : `<strong><span data-count="${s.count}">${s.count}</span>${e(s.suffix)}</strong>`}<span>${e(s.label)}</span></div>`).join('');

  const conditionCards = site.conditions.map((key, i) => {
    const c = C.items[key];
    return `<button class="cond-card reveal" type="button" data-condition="${key}" aria-haspopup="dialog"><span class="cond-num">${String(i + 1).padStart(2, '0')}</span><span class="cond-icon">${icon(conditionIcon[key])}</span><span class="cond-body"><span class="cond-name">${e(c.name)}</span><span class="cond-short">${e(c.short)}</span><span class="cond-more">${e(t.ui.more)} ${icon('i-arrow')}</span></span></button>`;
  }).join('');

  const videoCards = site.videos.map(id => {
    const [cat, title] = t.videos.items[id];
    return `<article class="video-card reveal"><button class="video-cover" type="button" data-video="${id}" aria-label="${e(t.videos.play)}: ${e(title)}"><img src="${base}assets/video-${id}.webp"${(site.brandedCovers || []).includes(id) ? '' : ` data-yt="${id}"`} alt="" width="360" height="450" loading="lazy" decoding="async"><span class="video-type">${icon('i-youtube')}${e(t.videos.type)}</span><span class="play-circle">${icon('i-play')}</span><span class="video-shade"></span></button><span class="video-category">${e(cat)}</span><h3>${e(title)}</h3><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">${e(t.videos.watch)} ${icon('i-diagonal')}</a></article>`;
  }).join('');

  const faqItems = t.faq.items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary><span><small>${String(i + 1).padStart(2, '0')}</small>${e(q)}</span>${icon('i-plus')}</summary><div class="detail-body"><p>${e(a)}</p></div></details>`).join('');

  const tel = `tel:${site.phone}`;

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#03162b">
<title>${e(t.meta.title)}</title>
<meta name="description" content="${e(t.meta.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="uz" href="${uzUrl}">
<link rel="alternate" hreflang="ru" href="${ruUrl}">
<link rel="alternate" hreflang="x-default" href="${uzUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${e(t.doctor.short)}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${t.lang === 'ru' ? 'uz_UZ' : 'ru_RU'}">
<meta property="og:title" content="${e(t.meta.ogTitle)}">
<meta property="og:description" content="${e(t.meta.ogDescription)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.domain}/${t.meta.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="meta-pixel-id" content="${e(site.metaPixelId)}">
<meta name="ym-id" content="${e(site.yandexMetricaId)}">
<link rel="icon" type="image/svg+xml" href="${base}assets/logo-5.svg">
<link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
<link rel="preload" href="${base}assets/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${base}assets/doctor-cutout-640.webp" imagesrcset="${base}assets/doctor-cutout-640.webp 640w, ${base}assets/doctor-cutout.webp 941w" imagesizes="(max-width: 700px) 64vw, 440px" fetchpriority="high">
<link rel="stylesheet" href="${base}site.css">
<script src="${base}track.js"></script>
<script src="${base}assets/gsap.min.js" defer></script>
<script src="${base}assets/ScrollTrigger.min.js" defer></script>
<script src="${base}neural.js" defer></script>
<script src="${base}app.js" defer></script>
<script src="${base}motion.js" defer></script>
<script src="${base}booking.js" defer></script>
<script src="${base}event.js" defer></script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
${ICONS}
<a class="skip-link" href="#main">${e(t.ui.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    ${brand(t, base)}
    <nav class="desktop-nav" aria-label="Navigation">${t.nav.map(([h, l]) => `<a href="${h}">${e(l)}</a>`).join('')}</nav>
    <div class="header-actions">
      ${langSwitch(t)}
      <button class="button button-small header-cta" type="button" data-book>${e(t.cta)} ${icon('i-arrow')}</button>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${e(t.ui.menuOpen)}"><span></span><span></span></button>
    </div>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Menu" hidden>${site.eventData ? `<a class="nav-news" href="${t.event.path}#ariza" data-event-banner data-end="${site.eventData.closes}"><i></i>${e(t.event.navLabel)}</a>` : ''}${t.nav.map(([h, l]) => `<a href="${h}">${e(l)}</a>`).join('')}<button class="button" type="button" data-book>${e(t.cta)} ${icon('i-arrow')}</button></nav>
</header>
<main id="main">
<section class="hero" id="asosiy" aria-labelledby="hero-title">
  <canvas class="neural-canvas" data-neural="hero" aria-hidden="true"></canvas>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="container hero-grid">
    <figure class="hero-portrait">
      <div class="portrait-orbit" aria-hidden="true"><i></i><i></i></div>
      <img src="${base}assets/doctor-cutout-640.webp" srcset="${base}assets/doctor-cutout-640.webp 640w, ${base}assets/doctor-cutout.webp 941w" sizes="(max-width: 700px) 64vw, 440px" alt="${e(t.hero.portraitAlt)}" width="941" height="1671" fetchpriority="high">
      <figcaption><span>${e(t.doctor.first)}</span><strong>${e(t.doctor.last)}</strong><small>${e(t.doctor.role)}</small></figcaption>
    </figure>
    <div class="hero-copy">
      <p class="pill"><span class="status-dot"></span>${e(t.hero.eyebrow)}</p>
      <h1 id="hero-title">${e(typo(t.hero.h1a, t.lang))} <span>${e(typo(t.hero.h1b, t.lang))}</span></h1>
      <p class="hero-sub">${e(typo(t.hero.sub, t.lang))}</p>
      <div class="hero-actions">
        <button class="button" type="button" data-book>${e(t.cta)} ${icon('i-arrow')}</button>
        <a class="button button-ghost" href="${tel}">${icon('i-phone')} ${e(t.call)}</a>
      </div>
      <a class="insurance-badge" href="#sugurta"><span class="badge-icon">${icon('i-shield')}</span><span><strong>${e(t.hero.badgeTitle)}</strong><small>${e(t.hero.badgeText)}</small></span>${icon('i-arrow', 'badge-arrow')}</a>
    </div>
    <p class="hero-location">${icon('i-pin')}<span>${e(t.hero.clinic)}<small>${e(t.hero.city)}</small></span></p>
  </div>
  <div class="container">
    <div class="stats">${stats}</div>
    <p class="stats-note">${e(t.statsNote)}</p>
  </div>
</section>

${eventBanner(t, site, base)}

<section class="section conditions" id="kasalliklar" aria-labelledby="cond-title">
  <div class="container">
    <div class="section-heading reveal"><div><p class="eyebrow">${e(C.eyebrow)}<span></span></p><h2 id="cond-title">${e(typo(C.h2a, t.lang))} <span>${e(typo(C.h2b, t.lang))}</span></h2></div><p class="section-lead">${e(C.lead)}</p></div>
    <div class="cond-grid">${conditionCards}</div>
    <button class="adult-card reveal" type="button" data-condition="adults" aria-haspopup="dialog"><span class="cond-icon">${icon('i-users')}</span><span class="adult-body"><span class="adult-tag">${icon('i-shield')}${e(C.adults.tag)}</span><span class="cond-name">${e(C.adults.name)}</span><span class="cond-short">${e(C.adults.short)}</span></span><span class="cond-more">${e(t.ui.more)} ${icon('i-arrow')}</span></button>
    <p class="footnote">${e(C.footnote)}</p>
    ${site.conditions.map(k => conditionTemplate(k, C.items[k], t)).join('\n')}
    ${adultTemplate(t)}
  </div>
</section>

<section class="ionm section" id="ionm" aria-labelledby="ionm-title">
  <div class="container ionm-layout">
    <div class="ionm-copy reveal">
      <p class="eyebrow">${e(t.ionm.eyebrow)}<span></span></p>
      <h2 id="ionm-title">${e(typo(t.ionm.h2a, t.lang))} <span>${e(typo(t.ionm.h2b, t.lang))}</span></h2>
      <p class="ionm-text">${e(t.ionm.text)}</p>
      <ul class="ionm-points">${t.ionm.points.map(([a, b]) => `<li>${icon('i-check')}<span><strong>${e(a)}</strong>${e(b)}</span></li>`).join('')}</ul>
    </div>
    <div class="ionm-visual">
      <div class="monitor ionm-ui reveal" role="img" aria-label="${e(t.ionm.monitorAria)}">
        <div class="ionm-bar" aria-hidden="true"><span class="ionm-dots"><i></i><i></i><i></i></span><span class="ionm-title">${icon('i-pulse')}NEURO MONITORING</span><span class="ionm-rec"><i></i>REC <b data-rec>00:42:10</b></span></div>
        <div class="ionm-tools" aria-hidden="true"><span class="on">Live</span><span>Pause</span><span>Stop</span><span>Electrodes</span><span>Stim</span><span class="ionm-imp">Imp 2.8 kΩ</span></div>
        <canvas class="ionm-canvas" data-ionm aria-hidden="true"></canvas>
        <div class="ionm-status" aria-hidden="true"><span>Free Disk Space: 85%</span><span class="monitor-status"><i></i>${e(t.ionm.monitorStatus)}</span></div>
      </div>
      <ul class="ionm-legend reveal">${t.ionm.legend.map(([n, d], i) => `<li><i class="lg-${i}"></i><span><strong>${e(n)}</strong>${e(d)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section about" id="haqida" aria-labelledby="about-title">
  <div class="container">
    <div class="about-layout">
      <div class="approach-panel reveal"><img src="${base}assets/logo-5.svg" alt="${e(t.ui.logoAlt)}" width="96" height="96" loading="lazy"><p>${e(t.about.approachA)} <strong>${e(t.about.approachB)}</strong></p><div class="approach-line"></div><ol>${t.about.steps.map(([a, b]) => `<li><span>${e(a)}</span><small>${e(b)}</small></li>`).join('')}</ol></div>
      <div class="about-copy reveal">
        <p class="eyebrow">${e(t.about.eyebrow)}<span></span></p>
        <h2 id="about-title">${e(typo(t.about.h2a, t.lang))} <span>${e(typo(t.about.h2b, t.lang))}</span></h2>
        <p class="doctor-fullname">${e(t.doctor.full)}</p>
        <p class="section-description">${e(t.about.description)}</p>
        <div class="education">${t.about.education.map(([l, n], i) => `<div><span>0${i + 1}</span><p><small>${e(l)}</small>${e(n)}</p></div>`).join('')}</div>
        <details class="bio-details"><summary>${e(t.about.bioSummary)} ${icon('i-plus')}</summary><p>${e(t.about.bio)}</p></details>
      </div>
    </div>
    <article class="mentor reveal" aria-labelledby="mentor-name">
      <figure class="mentor-photo"><img src="${base}assets/mentor-ashrapov-680.webp" srcset="${base}assets/mentor-ashrapov-680.webp 680w, ${base}assets/mentor-ashrapov.webp 1020w" sizes="(max-width: 699px) 92vw, 300px" alt="${e(t.mentor.photoAlt)}" width="680" height="850" loading="lazy" decoding="async"><figcaption>${e(t.mentor.badge)}</figcaption></figure>
      <div class="mentor-main">
        <p class="eyebrow">${e(t.mentor.eyebrow)}<span></span></p>
        <h3 class="mentor-title">${e(t.mentor.title)}</h3>
        <p class="mentor-name" id="mentor-name">${e(t.mentor.name)}<small>${e(t.mentor.degree)}</small></p>
        <p class="mentor-text">${e(t.mentor.text)}</p>
      </div>
      <dl class="mentor-facts">${t.mentor.facts.map(([v, l]) => `<div><dt>${e(v)}</dt><dd>${e(l)}</dd></div>`).join('')}</dl>
    </article>
  </div>
</section>

<section class="insurance section" id="sugurta" aria-labelledby="ins-title">
  <canvas class="neural-canvas neural-soft" data-neural="soft" aria-hidden="true"></canvas>
  <div class="container">
    <div class="insurance-layout">
      <div class="insurance-copy reveal">
        <div class="shield-large">${icon('i-shield')}</div>
        <p class="eyebrow">${e(t.insurance.eyebrow)}</p>
        <h2 id="ins-title">${e(typo(t.insurance.h2a, t.lang))} <span>${e(typo(t.insurance.h2b, t.lang))}</span></h2>
        <p>${e(t.insurance.text)}</p>
        <button class="button" type="button" data-book data-topic="insurance">${e(t.insurance.cta)} ${icon('i-arrow')}</button>
      </div>
      <div class="insurance-panels reveal">${t.insurance.groups.map(([l, h, p], i) => `<article class="eligibility"><span class="eligibility-icon">${icon(i ? 'i-users' : 'i-baby')}</span><div><small>${e(l)}</small><h3>${e(h)}</h3><p>${e(p)}</p></div></article>`).join('')}</div>
    </div>
    <div class="steps reveal">
      <h3 class="steps-title">${e(t.insurance.stepsTitle)}</h3>
      <div class="steps-track">
        <svg class="nerve" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path class="nerve-base" d="M20 62 Q 90 18 159 62 T 329 62 T 500 62 T 670 62 T 841 62 T 980 62"/><path class="nerve-line" d="M20 62 Q 90 18 159 62 T 329 62 T 500 62 T 670 62 T 841 62 T 980 62"/></svg><span class="nerve-pulse" aria-hidden="true"></span>
        <span class="nerve-pulse-v" aria-hidden="true"></span>
        <ol>${t.insurance.steps.map(([a, b], i) => `<li><span class="step-num">${i + 1}</span><div class="step-body"><strong>${e(a)}</strong><small>${e(b)}</small></div></li>`).join('')}</ol>
      </div>
      <p class="insurance-condition">${icon('i-shield')}<span>${e(t.insurance.note)}</span></p>
    </div>
  </div>
</section>

<section class="section videos" id="videolar" aria-labelledby="video-title">
  <div class="container">
    <div class="section-heading reveal"><div><p class="eyebrow">${e(t.videos.eyebrow)}<span></span></p><h2 id="video-title">${e(typo(t.videos.h2a, t.lang))} <span>${e(typo(t.videos.h2b, t.lang))}</span></h2></div><a class="text-link" href="${site.youtube}" target="_blank" rel="noopener noreferrer">${e(t.videos.channel)} ${icon('i-diagonal')}</a></div>
    <div class="video-grid">${videoCards}</div>
  </div>
</section>

<section class="section faq" id="savollar" aria-labelledby="faq-title">
  <div class="container faq-layout">
    <div class="faq-intro reveal"><p class="eyebrow">${e(t.faq.eyebrow)}<span></span></p><h2 id="faq-title">${e(typo(t.faq.h2a, t.lang))} <span>${e(typo(t.faq.h2b, t.lang))}</span></h2><p class="section-description">${e(t.faq.lead)}</p><div class="faq-actions"><a class="button button-solid" href="${tel}">${icon('i-phone')} ${e(site.phoneDisplay)}</a><a class="text-link" href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')} Telegram</a></div></div>
    <div class="faq-list reveal">${faqItems}</div>
  </div>
</section>

<section class="section contact" id="boglanish" aria-labelledby="contact-title">
  <div class="container">
    <div class="section-heading reveal"><div><p class="eyebrow">${e(t.contact.eyebrow)}<span></span></p><h2 id="contact-title">${e(typo(t.contact.h2a, t.lang))} <span>${e(typo(t.contact.h2b, t.lang))}</span></h2></div><button class="button button-solid" type="button" data-book>${e(t.cta)} ${icon('i-arrow')}</button></div>
    <div class="contact-grid reveal">
      <a class="contact-item" href="${tel}"><span class="contact-icon">${icon('i-phone')}</span><small>${e(t.contact.callLabel)}</small><strong>${e(site.phoneDisplay)}</strong><span>${e(t.contact.callHint)} ${icon('i-diagonal')}</span></a>
      <a class="contact-item" href="${site.map}" target="_blank" rel="noopener noreferrer"><span class="contact-icon">${icon('i-pin')}</span><small>${e(t.contact.addrLabel)}</small><strong>${e(t.contact.addr)}</strong><span>${e(t.contact.addrHint)} ${icon('i-diagonal')}</span></a>
      <div class="contact-item"><span class="contact-icon">${icon('i-clock')}</span><small>${e(t.contact.hoursLabel)}</small><strong>${e(site.hours)}</strong><span>${e(t.contact.hoursHint)}</span></div>
    </div>
    <div class="contact-bottom reveal"><p>${e(t.contact.social)}<strong>${e(site.handle)}</strong></p><div class="social-links"><a href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')}Telegram</a><a href="${site.instagram}" target="_blank" rel="noopener noreferrer">${icon('i-instagram')}Instagram</a><a href="${site.youtube}" target="_blank" rel="noopener noreferrer">${icon('i-youtube')}YouTube</a></div></div>
  </div>
</section>
</main>

<footer class="site-footer">
  <div class="container footer-top">${brand(t, base)}<p>${e(t.footer.tagline)}</p><a class="back-top" href="#asosiy">${e(t.footer.top)} ${icon('i-diagonal')}</a></div>
  <div class="container footer-bottom"><span>© <span data-year>2026</span> ${e(t.doctor.short)}. ${e(t.footer.disclaimer)}</span><a href="${site.agency}" target="_blank" rel="noopener noreferrer">${e(t.footer.agency)} ${icon('i-diagonal')}</a></div>
</footer>

<nav class="mobile-contact" aria-label="${e(t.mobile.aria)}"><a href="${tel}">${icon('i-phone')}${e(t.mobile.call)}</a><button type="button" data-book>${icon('i-plus')}${e(t.mobile.book)}</button><a href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')}${e(t.mobile.telegram)}</a></nav>

<dialog id="booking-dialog" class="modal booking-modal" aria-labelledby="booking-title" data-booking-root>
  <button class="modal-close" type="button" data-close aria-label="${e(t.ui.close)}">${icon('i-close')}</button>
  <div id="booking-form-view" data-form-view><p class="eyebrow">${e(t.form.eyebrow)}</p><h2 id="booking-title">${e(t.form.titleA)} <span>${e(t.form.titleB)}</span></h2><p class="form-intro">${e(t.form.intro)}</p>
  <form id="booking-form" data-booking="general" novalidate>
    <div class="form-row"><div class="field"><label for="booking-name">${e(t.form.name)} <span aria-hidden="true">*</span></label><input id="booking-name" name="name" type="text" autocomplete="name" minlength="2" maxlength="80" required placeholder="${e(t.form.namePh)}" aria-describedby="name-error"><span id="name-error" class="field-error"></span></div>
    <div class="field"><label for="booking-phone">${e(t.form.phone)} <span aria-hidden="true">*</span></label><input id="booking-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="24" required placeholder="${e(t.form.phonePh)}" aria-describedby="phone-error"><span id="phone-error" class="field-error"></span></div></div>
    <div class="form-row"><div class="field"><label for="booking-group">${e(t.form.group)} <span aria-hidden="true">*</span></label><select id="booking-group" name="group" required aria-describedby="group-error">${t.form.groups.map(([v, l]) => `<option value="${v}">${e(l)}</option>`).join('')}</select><span id="group-error" class="field-error"></span></div>
    <div class="field"><label for="booking-topic">${e(t.form.topic)} <span aria-hidden="true">*</span></label><select id="booking-topic" name="topic" required aria-describedby="topic-error">${t.form.topics.map(([v, l]) => `<option value="${v}">${e(l)}</option>`).join('')}</select><span id="topic-error" class="field-error"></span></div></div>
    <div class="field"><label for="booking-date">${e(t.form.date)} <small>${e(t.form.optional)}</small></label><input id="booking-date" name="date" type="date" aria-describedby="date-error"><span id="date-error" class="field-error"></span></div>
    <div class="form-honeypot" aria-hidden="true"><label for="booking-website">Website</label><input id="booking-website" name="website" autocomplete="off" tabindex="-1"></div>
    <label class="consent-label"><input id="booking-consent" name="consent" type="checkbox" required aria-describedby="consent-error"><span>${e(t.form.consent)}</span></label><span id="consent-error" class="field-error"></span>
    <p id="booking-status" class="form-status" role="status" aria-live="polite"></p>
    <button id="booking-submit" class="button button-solid" type="submit" disabled><span>${e(t.form.submit)}</span>${icon('i-arrow')}</button>
    <p class="form-note">${e(t.form.note)}</p>
  </form></div>
  <div id="booking-success" data-success hidden tabindex="-1"><span class="success-icon">${icon('i-check')}</span><h2>${e(t.form.successTitle)}</h2><p>${e(t.form.successText)}</p><p id="booking-receipt" data-receipt></p><button class="button button-solid" type="button" data-close>${e(t.form.close)}</button></div>
  <div class="booking-direct"><a href="${tel}">${icon('i-phone')}${e(site.phoneDisplay)}</a><a href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')}Telegram</a></div>
  <p class="booking-note">${e(t.form.footer)}</p>
</dialog>
<dialog id="condition-dialog" class="modal cond-modal" aria-labelledby="cond-modal-title"><button class="modal-close" type="button" data-close aria-label="${e(t.ui.close)}">${icon('i-close')}</button><div id="condition-content"></div><button class="button button-solid" type="button" data-book>${e(C.modalCta)} ${icon('i-arrow')}</button></dialog>
<dialog id="video-dialog" class="modal video-modal" aria-labelledby="video-modal-title"><div class="video-modal-top"><h2 id="video-modal-title"></h2><button class="modal-close" type="button" data-close aria-label="${e(t.videos.closeVideo)}">${icon('i-close')}</button></div><div id="video-player"></div><a id="video-fallback" class="text-link" href="${site.youtube}" target="_blank" rel="noopener noreferrer">${e(t.videos.fallback)} ${icon('i-diagonal')}</a></dialog>
<script type="application/json" id="ui-text">${JSON.stringify(ui).replace(/</g, '\\u003c')}</script>
</body>
</html>
`;
}
