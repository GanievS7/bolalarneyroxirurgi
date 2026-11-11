// Event landing page: free consultation day with time-slot registration.
import { e, typo, icon, ICONS, brand, langSwitch, conditionIcon, countdown } from './page.mjs';

export function renderEvent(t, site) {
  const E = t.event;
  const ev = site.eventData;
  const base = t.lang === 'ru' ? '../../' : '../';
  const home = t.lang === 'ru' ? '../' : '../';
  const otherHref = t.lang === 'ru' ? '../../konsultatsiya/' : '../ru/konsultatsiya/';
  const url = `${site.domain}${t.path}${E.path}`;
  const uzUrl = `${site.domain}/${E.path}`;
  const ruUrl = `${site.domain}/ru/${E.path}`;
  const tel = `tel:${site.phone}`;
  const dateText = E.successWhen;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: E.meta.ogTitle,
    description: E.meta.description,
    startDate: ev.start,
    endDate: ev.closes,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: t.lang,
    url,
    image: `${site.domain}/assets/mentor-ashrapov.webp`,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'UZS', url: `${url}#ariza`, availability: 'https://schema.org/InStock' },
    location: { '@type': 'Hospital', name: 'Compass Hospital', address: { '@type': 'PostalAddress', streetAddress: t.lang === 'ru' ? 'ул. Комус, 40' : 'Qomus ko‘chasi, 40-uy', addressLocality: t.lang === 'ru' ? 'Фергана' : 'Farg‘ona', addressCountry: 'UZ' } },
    performer: { '@type': 'Person', name: t.lang === 'ru' ? 'Ашрапов Джамшид Раупович' : 'Ashrapov Jamshid Raupovich', jobTitle: t.mentor.degree },
    organizer: { '@type': 'Person', name: t.doctor.full, url: site.domain + t.path }
  };

  const ui = {
    lang: t.lang,
    form: { ...t.form.messages, ...E.messages, successWhen: dateText, closed: E.closed },
    countdown: E.countdown
  };

  const facts = E.facts.map(([ic, label, value]) => `<li>${icon(ic)}<span><small>${e(label)}</small>${e(value)}</span></li>`).join('');
  const who = E.who.map(([key, name, desc]) => `<li class="who-card reveal"><span class="cond-icon">${icon(conditionIcon[key] || 'i-users')}</span><span><strong>${e(name)}</strong><small>${e(desc)}</small></span></li>`).join('');
  const mentorFacts = E.mentorFacts.map(([v, l]) => `<div><dt>${e(v)}</dt><dd>${e(l)}</dd></div>`).join('');
  const slots = ev.slots.map((slot, i) => `<label class="slot"><input type="radio" name="slot" value="${slot}"${i === 0 ? ' aria-describedby="ev-slot-error"' : ''} required><span>${slot}</span></label>`).join('');
  const options = list => list.map(([v, l]) => `<option value="${v}">${e(l)}</option>`).join('');

  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#03162b">
<title>${e(E.meta.title)}</title>
<meta name="description" content="${e(E.meta.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="uz" href="${uzUrl}">
<link rel="alternate" hreflang="ru" href="${ruUrl}">
<link rel="alternate" hreflang="x-default" href="${uzUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${e(t.doctor.short)}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${e(E.meta.ogTitle)}">
<meta property="og:description" content="${e(E.meta.ogDescription)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.domain}/${E.meta.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="meta-pixel-id" content="${e(site.metaPixelId)}">
<meta name="ym-id" content="${e(site.yandexMetricaId)}">
<link rel="icon" type="image/svg+xml" href="${base}assets/logo-5.svg">
<link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
<link rel="preload" href="${base}assets/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${base}assets/mentor-ashrapov-680.webp" fetchpriority="high">
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
<body class="event-page">
${ICONS}
<a class="skip-link" href="#ariza">${e(E.cta)}</a>
<header class="site-header">
  <div class="container header-inner">
    ${brand(t, base, home)}
    <div class="header-actions">
      <a class="home-link" href="${home}">${icon('i-arrow', 'flip')}<span>${e(E.home)}</span></a>
      ${langSwitch(t, otherHref)}
      <a class="button button-small header-cta" href="#ariza">${e(E.cta)} ${icon('i-arrow')}</a>
    </div>
  </div>
</header>
<main id="main">
<section class="hero ev-hero" id="asosiy" aria-labelledby="ev-title">
  <canvas class="neural-canvas" data-neural="hero" aria-hidden="true"></canvas>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="container ev-hero-grid">
    <div class="hero-copy">
      <p class="pill news-pill" data-event-live><span class="status-dot"></span>${e(E.pill)}</p>
      <h1 id="ev-title">${e(typo(E.h1a, t.lang))} <span>${e(typo(E.h1b, t.lang))}</span></h1>
      <p class="hero-sub">${e(typo(E.sub, t.lang))}</p>
      <ul class="ev-facts">${facts}</ul>
      ${countdown(t, ev)}
      <div class="hero-actions"><a class="button" href="#ariza" data-event-live>${e(E.cta)} ${icon('i-arrow')}</a><a class="button button-ghost" href="${tel}">${icon('i-phone')} ${e(site.phoneDisplay)}</a></div>
    </div>
    <figure class="ev-photo">
      <img src="${base}assets/mentor-ashrapov-680.webp" srcset="${base}assets/mentor-ashrapov-680.webp 680w, ${base}assets/mentor-ashrapov.webp 1020w" sizes="(max-width: 899px) 90vw, 440px" alt="${e(E.photoAlt)}" width="680" height="850" fetchpriority="high">
      <figcaption><strong>${e(t.mentor.name)}</strong><small>${e(E.photoBadge)}</small></figcaption>
    </figure>
  </div>
</section>

<section class="section ev-quote-section" aria-label="${e(t.doctor.short)}">
  <div class="container">
    <figure class="ev-quote reveal">
      <img src="${base}assets/doctor-cutout-640.webp" alt="${e(E.quoteAlt)}" width="640" height="1137" loading="lazy">
      <blockquote><p>${e(typo(E.quote, t.lang))}</p></blockquote>
      <figcaption><strong>${e(t.doctor.short)}</strong>${e(t.doctor.role)}</figcaption>
    </figure>
  </div>
</section>

<section class="section ev-who" aria-labelledby="who-title">
  <div class="container">
    <div class="section-heading reveal"><div><p class="eyebrow">${e(E.whoEyebrow)}<span></span></p><h2 id="who-title">${e(typo(E.whoH2a, t.lang))} <span>${e(typo(E.whoH2b, t.lang))}</span></h2></div><p class="section-lead">${e(E.whoNote)}</p></div>
    <ul class="who-grid">${who}</ul>
    <article class="mentor ev-mentor reveal" aria-labelledby="ev-mentor-name">
      <figure class="mentor-photo"><img src="${base}assets/mentor-ashrapov-680.webp" alt="" width="680" height="850" loading="lazy"><figcaption>${e(t.mentor.badge)}</figcaption></figure>
      <div class="mentor-main"><p class="eyebrow">${e(E.mentorEyebrow)}<span></span></p><p class="mentor-name" id="ev-mentor-name">${e(t.mentor.name)}<small>${e(t.mentor.degree)}</small></p><p class="mentor-text">${e(t.mentor.text)}</p></div>
      <dl class="mentor-facts">${mentorFacts}</dl>
    </article>
  </div>
</section>

<section class="section ev-register" id="ariza" aria-labelledby="ariza-title">
  <div class="container ev-register-grid">
    <div class="ev-register-info reveal">
      <p class="eyebrow">${e(E.formEyebrow)}<span></span></p>
      <h2 id="ariza-title">${e(typo(E.formH2a, t.lang))} <span>${e(typo(E.formH2b, t.lang))}</span></h2>
      <p class="section-description">${e(E.formIntro)}</p>
      <ul class="ev-facts ev-facts-light">${facts}</ul>
      <a class="text-link" href="${site.map}" target="_blank" rel="noopener noreferrer">${icon('i-pin')} ${e(E.map)} ${icon('i-diagonal')}</a>
    </div>
    <div class="ev-form-card reveal" data-booking-root>
      <div data-form-view>
        <form id="event-form" data-booking="event" data-event="${site.eventId}" data-closes="${ev.closes}" novalidate>
          <div class="form-row">
            <div class="field"><label for="ev-name">${e(E.name)} <span aria-hidden="true">*</span></label><input id="ev-name" name="name" type="text" autocomplete="name" minlength="2" maxlength="80" required placeholder="${e(E.namePh)}" aria-describedby="ev-name-error"><span id="ev-name-error" class="field-error" data-error-for="name"></span></div>
            <div class="field"><label for="ev-phone">${e(E.phone)} <span aria-hidden="true">*</span></label><input id="ev-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="24" required placeholder="${e(E.phonePh)}" aria-describedby="ev-phone-error"><span id="ev-phone-error" class="field-error" data-error-for="phone"></span></div>
          </div>
          <div class="form-row">
            <div class="field"><label for="ev-age">${e(E.age)} <span aria-hidden="true">*</span></label><select id="ev-age" name="age" required aria-describedby="ev-age-error">${options(E.ages)}</select><span id="ev-age-error" class="field-error" data-error-for="age"></span></div>
            <div class="field"><label for="ev-diagnosis">${e(E.diagnosis)}</label><select id="ev-diagnosis" name="diagnosis" aria-describedby="ev-diagnosis-error">${options(E.diagnoses)}</select><span id="ev-diagnosis-error" class="field-error" data-error-for="diagnosis"></span></div>
          </div>
          <fieldset class="slot-field" aria-describedby="ev-slot-error">
            <legend>${e(E.slot)} <span aria-hidden="true">*</span><small>${e(E.slotHint)}</small></legend>
            <div class="slot-grid">${slots}</div>
            <span id="ev-slot-error" class="field-error" data-error-for="slot"></span>
          </fieldset>
          <div class="form-honeypot" aria-hidden="true"><label for="ev-website">Website</label><input id="ev-website" name="website" autocomplete="off" tabindex="-1"></div>
          <label class="consent-label"><input id="ev-consent" name="consent" type="checkbox" required aria-describedby="ev-consent-error"><span>${e(E.consent)}</span></label><span id="ev-consent-error" class="field-error" data-error-for="consent"></span>
          <p class="form-status" role="status" aria-live="polite"></p>
          <button class="button button-solid ev-submit" type="submit" disabled><span>${e(E.submit)}</span>${icon('i-arrow')}</button>
          <p class="form-note">${e(E.note)}</p>
        </form>
      </div>
      <div class="ev-success" data-success hidden tabindex="-1"><span class="success-icon">${icon('i-check')}</span><h3>${e(E.successTitle)}</h3><p class="ev-when" data-when></p><p>${e(E.successText)}</p><p class="ev-receipt" data-receipt></p><a class="text-link" href="${site.map}" target="_blank" rel="noopener noreferrer">${icon('i-pin')} ${e(E.map)} ${icon('i-diagonal')}</a></div>
      <div class="booking-direct"><a href="${tel}">${icon('i-phone')}${e(site.phoneDisplay)}</a><a href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')}Telegram</a></div>
    </div>
    <div class="ev-bring reveal"><h3>${e(E.bringTitle)}</h3><ul>${E.bring.map(b => `<li>${icon('i-check')}${e(b)}</li>`).join('')}</ul></div>
  </div>
</section>
</main>

<footer class="site-footer">
  <div class="container footer-top">${brand(t, base, home)}<p>${e(t.footer.tagline)}</p><a class="back-top" href="${home}">${e(E.home)} ${icon('i-diagonal')}</a></div>
  <div class="container footer-bottom"><span>© <span data-year>2026</span> ${e(t.doctor.short)}. ${e(t.footer.disclaimer)}</span><a href="${site.agency}" target="_blank" rel="noopener noreferrer">${e(t.footer.agency)} ${icon('i-diagonal')}</a></div>
</footer>

<nav class="mobile-contact" aria-label="${e(t.mobile.aria)}"><a href="${tel}">${icon('i-phone')}${e(t.mobile.call)}</a><a class="mc-primary" href="#ariza">${icon('i-plus')}${e(t.mobile.book)}</a><a href="${site.telegram}" target="_blank" rel="noopener noreferrer">${icon('i-telegram')}${e(t.mobile.telegram)}</a></nav>
<script type="application/json" id="ui-text">${JSON.stringify(ui).replace(/</g, '\\u003c')}</script>
</body>
</html>
`;
}
