// Shared, language-independent site settings. Edit here, then run `npm run build`.
export const site = {
  domain: 'https://bolalarneyroxirurgi.uz',
  phone: '+998902312390',
  phoneDisplay: '+998 90 231 23 90',
  telegram: 'https://t.me/bolalar_neyroxirurgi',
  instagram: 'https://www.instagram.com/bolalar_neyroxirurgi/',
  youtube: 'https://www.youtube.com/@bolalar_neyroxirurgi',
  handle: '@bolalar_neyroxirurgi',
  map: 'https://yandex.com/maps/org/compass_hospital/91519153646',
  hours: '09:00–18:00',
  agency: 'https://ganievproduction.com',

  // Meta Pixel: Events Manager → Data sources → Pixel ID (15–16 raqam).
  // Bo'sh qolsa, sahifa Facebook'ga hech narsa yubormaydi va skript yuklanmaydi.
  metaPixelId: '1372662864745599',

  // Yandex Metrica: metrika.yandex.ru → Счётчик raqami (8–9 raqam). Bo'sh qolsa, yuklanmaydi.
  yandexMetricaId: '113863820',

  // YouTube Shorts — kanal: @bolalar_neyroxirurgi (ID'lar oEmbed orqali tasdiqlangan).
  videos: ['b4NDqg34Xdc', 'MYSYdHVn7wk', 'CrxFZqLHZwU', 'fctFDoADg00'],
  // Bu videolar uchun YouTube muqovasi ishlatilmaydi (o'rniga saytning o'z grafikasi).
  brandedCovers: ['MYSYdHVn7wk'],

  // Joriy tadbir (bepul konsultatsiya). Vaqtlar server/booking.js dagi events ro'yxatidan olinadi.
  // Tadbir tugagach banner o'zi yashirinadi; butunlay olib tashlash uchun null qiling.
  eventId: 'konsultatsiya-2026-11-15',

  // Kasallik kartalari tartibi (matnlari content/*.mjs ichida).
  conditions: ['hydrocephalus', 'spina', 'cranio', 'encephalocele', 'cephalohematoma', 'cp', 'cranioplasty', 'tumor']
};
