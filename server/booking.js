// Booking API: signed form token, validation, spam/duplicate protection and Telegram delivery.
// v3: bilingual (uz/ru) responses, ad-source (UTM) capture, production domain origins.
const origin = 'https://humoyunmirzo-neurosurgeon.ganievproduction.chatgpt.site';
const allowedOrigins = [origin, 'https://bolalarneyroxirurgi.uz', 'https://www.bolalarneyroxirurgi.uz'];
const siteName = 'bolalarneyroxirurgi.uz';
const encoder = new TextEncoder();
const deliveries = new Map();
const rates = new Map();
const topics = new Map([['consultation','Neyroxirurg konsultatsiyasi'],['insurance','Sug‘urta asosida bepul operatsiya'],['followup','Takroriy ko‘rik']]);
const groups = new Map([['child','Bola (18 yoshgacha)'],['adult','Katta yoshli bemor'],['pensioner','Pensioner']]);
const sourceKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','ref','click'];
const ttl = 30 * 60 * 1000;

// One-off events (free consultation days). Slots are generated from working hours minus breaks.
function makeSlots(start, end, step, breaks = []) {
  const toMin = v => Number(v.slice(0,2))*60 + Number(v.slice(3,5));
  const out = [];
  for (let m = toMin(start); m + step <= toMin(end); m += step) {
    if (breaks.some(([a,b]) => m >= toMin(a) && m < toMin(b))) continue;
    out.push(`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`);
  }
  return out;
}
export const eventAges = new Map([['0-1','1 yoshgacha'],['1-3','1–3 yosh'],['3-7','3–7 yosh'],['7-18','7–18 yosh']]);
export const eventDiagnoses = new Map([['cp','DTsP (bolalar serebral falaji)'],['hydrocephalus','Gidrotsefaliya'],['encephalocele','Ensefalotsele'],['cranio','Kraniosinostoz'],['spina','Spina bifida'],['other','Boshqa / aniq emas']]);
export const events = new Map([
  ['konsultatsiya-2026-11-15', {
    title: 'Bepul konsultatsiya — ustoz Ashrapov J.R.',
    date: '2026-11-15',
    start: '2026-11-15T09:00:00+05:00',
    closes: '2026-11-15T17:00:00+05:00',
    place: 'Compass Hospital, Farg‘ona sh., Qomus ko‘chasi, 40-uy',
    slots: makeSlots('09:00','17:00',30,[['13:00','14:00']])
  }],
  // O'tgan tadbir: eski havolalardan kelgan arizalar 410 (yopiq) bilan rad etiladi.
  ['konsultatsiya-2026-10-25', {
    title: 'Bepul konsultatsiya — ustoz Ashrapov J.R.',
    date: '2026-10-25',
    start: '2026-10-25T09:00:00+05:00',
    closes: '2026-10-25T17:00:00+05:00',
    place: 'Compass Hospital, Farg‘ona sh., Qomus ko‘chasi, 40-uy',
    slots: makeSlots('09:00','17:00',30,[['13:00','14:00']])
  }]
]);

const text = {
  uz: {
    name:'Ismingizni to‘g‘ri kiriting (2–80 belgi).',
    phone:'Telefonni +998 XX XXX XX XX shaklida kiriting.',
    group:'Bemor toifasini tanlang.',
    topic:'Murojaat maqsadini tanlang.',
    date:'Bugundan boshlab 90 kun ichidagi sanani tanlang.',
    consent:'Ma’lumotlaringizni yuborishga rozilik bering.',
    fields:'Belgilangan maydonlarni tekshiring.',
    notReady:'Onlayn ariza qabul qilish hozir sozlanmoqda. Telefon yoki Telegram orqali bog‘laning.',
    origin:'So‘rov manbasi tasdiqlanmadi.',
    rejected:'So‘rov tasdiqlanmadi.',
    expired:'Formani yangilab, bir necha soniyadan keyin qayta yuboring.',
    checking:'Ariza yuborilishi tekshirilmoqda. Qayta yubormang; qabulni telefon orqali aniqlashtiring.',
    rate:'Bir oz kuting. Yangi ariza uchun kamida 20 soniyadan keyin urinib ko‘ring.',
    failed:'Ariza yuborilmadi. Qayta urinib ko‘ring yoki telefon orqali bog‘laning.',
    unknown:'Yuborilganini tasdiqlay olmadik. Takroran yuborishdan oldin telefon orqali tekshiring.',
    network:'Ulanish uzildi, ariza holati noaniq. Takroran yuborishdan oldin telefon orqali tekshiring.',
    error:'Vaqtinchalik xatolik. Telefon orqali bog‘laning.',
    slot:'Qabul vaqtini tanlang.',
    age:'Bolaning yoshini tanlang.',
    diagnosis:'Tashxisni ro‘yxatdan tanlang.',
    closed:'Bu konsultatsiyaga ro‘yxatga olish yakunlangan. Telefon orqali bog‘laning.',
    unknownEvent:'Tadbir topilmadi. Sahifani yangilang.'
  },
  ru: {
    name:'Введите имя правильно (2–80 символов).',
    phone:'Введите телефон в формате +998 XX XXX XX XX.',
    group:'Выберите категорию пациента.',
    topic:'Выберите цель обращения.',
    date:'Выберите дату в пределах 90 дней начиная с сегодняшнего дня.',
    consent:'Подтвердите согласие на отправку данных.',
    fields:'Проверьте отмеченные поля.',
    notReady:'Онлайн-запись сейчас настраивается. Свяжитесь по телефону или в Telegram.',
    origin:'Источник запроса не подтверждён.',
    rejected:'Запрос не подтверждён.',
    expired:'Обновите форму и отправьте снова через несколько секунд.',
    checking:'Проверяем отправку заявки. Не отправляйте повторно; уточните запись по телефону.',
    rate:'Подождите немного. Новую заявку можно отправить не раньше чем через 20 секунд.',
    failed:'Заявка не отправлена. Попробуйте ещё раз или позвоните.',
    unknown:'Не удалось подтвердить отправку. Перед повторной отправкой уточните по телефону.',
    network:'Соединение прервалось, статус заявки неизвестен. Перед повторной отправкой уточните по телефону.',
    error:'Временная ошибка. Свяжитесь по телефону.',
    slot:'Выберите время приёма.',
    age:'Выберите возраст ребёнка.',
    diagnosis:'Выберите диагноз из списка.',
    closed:'Запись на эту консультацию завершена. Свяжитесь по телефону.',
    unknownEvent:'Мероприятие не найдено. Обновите страницу.'
  }
};

export function language(value) {
  return value === 'ru' ? 'ru' : 'uz';
}

function json(data, status = 200) {
  return Response.json(data, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}

// TELEGRAM_CHAT_ID: bitta yoki vergul bilan ajratilgan bir nechta ID (masalan "111,222"), ko'pi bilan 5 ta.
function chatIds(env) {
  return String(env.TELEGRAM_CHAT_ID || '').split(/[\s,;]+/).filter(Boolean);
}

function configured(env) {
  const ids = chatIds(env);
  return typeof env.TELEGRAM_BOT_TOKEN === 'string' && /^\d+:[\w-]+$/.test(env.TELEGRAM_BOT_TOKEN)
    && ids.length > 0 && ids.length <= 5 && ids.every(id => /^-?\d+$/.test(id));
}

async function sendTelegram(env, chatId, body) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{
      method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(12000),
      body:JSON.stringify({chat_id:chatId,text:body,link_preview_options:{is_disabled:true}})
    });
    let result;
    try { result=await response.json(); } catch { result=null; }
    if (response.ok && result?.ok === true && Number.isInteger(result.result?.message_id)) return 'sent';
    // A confirmed Telegram rejection can be retried; an unparseable response cannot.
    return result?.ok === false ? 'failed' : 'unknown';
  } catch {
    return 'network';
  }
}

async function key(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(`booking-v1:${secret}`), {name:'HMAC',hash:'SHA-256'}, false, ['sign','verify']);
}

function hex(buffer) {
  return [...new Uint8Array(buffer)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}

async function tokenFor(secret) {
  const payload = `${Date.now()}.${crypto.randomUUID()}`;
  const signature = await crypto.subtle.sign('HMAC', await key(secret), encoder.encode(payload));
  return `${payload}.${hex(signature)}`;
}

async function verifyToken(token, secret) {
  if (typeof token !== 'string' || token.length > 180) return null;
  const match = /^(\d{13})\.([\da-f-]{36})\.([\da-f]{64})$/.exec(token);
  if (!match) return null;
  const age = Date.now() - Number(match[1]);
  if (age < 1200 || age > ttl) return null;
  const bytes = Uint8Array.from(match[3].match(/../g), x=>parseInt(x,16));
  const valid = await crypto.subtle.verify('HMAC',await key(secret),bytes,encoder.encode(`${match[1]}.${match[2]}`));
  return valid ? match[2] : null;
}

function todayTashkent() {
  return new Date(Date.now() + 5*3600000).toISOString().slice(0,10);
}

// Ad source values are untrusted: keep known keys, strings only, no control characters, short.
export function cleanSource(input) {
  const result = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
  for (const name of sourceKeys) {
    const value = input[name];
    if (typeof value !== 'string') continue;
    const clean = value.replace(/[\p{Cc}\p{Zl}\p{Zp}]/gu,' ').replace(/\s+/g,' ').trim().slice(0,120);
    if (clean) result[name] = clean;
  }
  return result;
}

function validatePerson(body, t, fields) {
  const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g,' ') : '';
  if (name.length < 2 || name.length > 80 || !/^[\p{L}\p{M}\s‘’ʻʼ'`.-]+$/u.test(name)) fields.name=t.name;
  let phone = typeof body.phone === 'string' ? body.phone.replace(/[\s()+-]/g,'') : '';
  if (/^\d{9}$/.test(phone)) phone=`998${phone}`;
  if (!/^998\d{9}$/.test(phone)) fields.phone=t.phone;
  if (body.consent !== true) fields.consent=t.consent;
  return {name, phone:`+${phone}`};
}

export function validateEventBooking(body, lang = 'uz') {
  const t = text[language(lang)];
  const fields = {};
  const event = events.get(body.event);
  const person = validatePerson(body, t, fields);
  if (!event || !event.slots.includes(body.slot)) fields.slot=t.slot;
  if (!eventAges.has(body.age)) fields.age=t.age;
  const diagnosis = typeof body.diagnosis === 'string' ? body.diagnosis : '';
  if (diagnosis && !eventDiagnoses.has(diagnosis)) fields.diagnosis=t.diagnosis;
  return {fields,data:{...person,group:'child',topic:'event',date:event?.date || '',event:body.event,slot:body.slot,age:body.age,diagnosis,lang:language(lang),source:cleanSource(body.source)}};
}

export function validateBooking(body, lang = 'uz') {
  const t = text[language(lang)];
  const fields = {};
  const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g,' ') : '';
  if (name.length < 2 || name.length > 80 || !/^[\p{L}\p{M}\s‘’ʻʼ'`.-]+$/u.test(name)) fields.name=t.name;
  let phone = typeof body.phone === 'string' ? body.phone.replace(/[\s()+-]/g,'') : '';
  if (/^\d{9}$/.test(phone)) phone=`998${phone}`;
  if (!/^998\d{9}$/.test(phone)) fields.phone=t.phone;
  if (!groups.has(body.group)) fields.group=t.group;
  if (!topics.has(body.topic)) fields.topic=t.topic;
  const date = typeof body.date === 'string' ? body.date : '';
  if (date) {
    const value = Date.parse(`${date}T00:00:00Z`);
    const max = new Date(Date.now()+90*86400000).toISOString().slice(0,10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(value) || new Date(value).toISOString().slice(0,10)!==date || date<todayTashkent() || date>max) fields.date=t.date;
  }
  if (body.consent !== true) fields.consent=t.consent;
  return {fields,data:{name,phone:`+${phone}`,group:body.group,topic:body.topic,date,lang:language(lang),source:cleanSource(body.source)}};
}

function cacheKey(kind, value) {
  return new Request(`${origin}/__booking-state/${kind}/${value}`);
}

async function cacheRead(kind, value) {
  try {
    if (typeof caches === 'undefined') return null;
    const response = await caches.default.match(cacheKey(kind,value));
    return response ? await response.json() : null;
  } catch { return null; }
}

async function cacheWrite(kind, value, data, seconds) {
  try {
    if (typeof caches !== 'undefined') await caches.default.put(cacheKey(kind,value),Response.json(data,{headers:{'Cache-Control':`max-age=${seconds}`}}));
  } catch { /* In-memory limits still apply if the edge cache is unavailable. */ }
}

async function limit(ip, secret) {
  const bucket = hex(await crypto.subtle.digest('SHA-256',encoder.encode(`${secret}:${ip}`))).slice(0,32);
  const now = Date.now();
  const prior = rates.get(bucket) || await cacheRead('rate',bucket);
  if (prior && prior.reset > now && (now-prior.last < 20000 || prior.count >= 5)) return false;
  const next = prior && prior.reset > now ? {...prior,count:prior.count+1,last:now} : {count:1,last:now,reset:now+600000};
  rates.set(bucket,next);
  if (rates.size>2000) for (const [id,item] of rates) if(item.reset<now) rates.delete(id);
  await cacheWrite('rate',bucket,next,600);
  return true;
}

function sourceLines(source) {
  if (source.utm_source || source.utm_campaign) {
    const lines = [`Manba: ${[source.utm_source,source.utm_medium].filter(Boolean).join(' / ') || '—'}`];
    if (source.utm_campaign) lines.push(`Kampaniya: ${source.utm_campaign}`);
    if (source.utm_content) lines.push(`E’lon: ${source.utm_content}`);
    if (source.utm_term) lines.push(`Kalit: ${source.utm_term}`);
    return lines;
  }
  if (source.click === 'fb') return ['Manba: Facebook/Instagram reklama (UTM’siz)'];
  if (source.ref) return [`Manba: ${source.ref} (havola)`];
  return ['Manba: to‘g‘ridan-to‘g‘ri'];
}

function eventMessage(data, receipt) {
  const event = events.get(data.event);
  const received = new Intl.DateTimeFormat('uz-UZ',{timeZone:'Asia/Tashkent',dateStyle:'short',timeStyle:'short'}).format(new Date());
  return [
    'YANGI ARIZA — BEPUL KONSULTATSIYA','',
    `Tadbir: ${event.title}`,
    `Sana va vaqt: ${event.date.split('-').reverse().join('.')}, ${data.slot}`,
    `Ariza: ${receipt}`,
    `Ota-ona: ${data.name}`,
    `Telefon: ${data.phone}`,
    `Bola yoshi: ${eventAges.get(data.age)}`,
    `Tashxis: ${data.diagnosis ? eventDiagnoses.get(data.diagnosis) : 'ko‘rsatilmagan'}`,
    `Til: ${data.lang === 'ru' ? 'Ruscha' : 'O‘zbekcha'}`,
    ...sourceLines(data.source || {}),
    `Kelib tushdi: ${received}`,'',
    `${siteName}/konsultatsiya orqali. Vaqtni bemor bilan tasdiqlang.`
  ].join('\n');
}

function message(data, receipt) {
  if (data.event) return eventMessage(data, receipt);
  const date = data.date ? data.date.split('-').reverse().join('.') : 'Kelishiladi';
  const received = new Intl.DateTimeFormat('uz-UZ',{timeZone:'Asia/Tashkent',dateStyle:'short',timeStyle:'short'}).format(new Date());
  return [
    'YANGI QABUL ARIZASI','',
    `Ariza: ${receipt}`,
    `Ism: ${data.name}`,
    `Telefon: ${data.phone}`,
    `Bemor: ${groups.get(data.group)}`,
    `Murojaat: ${topics.get(data.topic)}`,
    `Qulay sana: ${date}`,
    `Til: ${data.lang === 'ru' ? 'Ruscha' : 'O‘zbekcha'}`,
    ...sourceLines(data.source || {}),
    `Kelib tushdi: ${received}`,'',
    `Dr. Xumoyunmirzo Yoqubjonov — ${siteName} orqali.`,
    'Qabul sanasi va vaqti hali tasdiqlanmagan.'
  ].join('\n');
}

async function deliver(id, data, env, request) {
  const t = text[data.lang];
  const receipt = `N-${id.slice(0,8).toUpperCase()}`;
  const existing = await cacheRead('delivery',id);
  if (existing?.status === 'sent') return json({ok:true,receipt:existing.receipt});
  if (existing?.status === 'pending' || existing?.status === 'unknown') return json({ok:false,code:'delivery_unknown',message:t.checking},409);
  // Cloudflare → CF-Connecting-IP; Vercel → x-real-ip / x-forwarded-for.
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-real-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('oai-authenticated-user-id') || 'unidentified';
  if (!await limit(ip,env.TELEGRAM_BOT_TOKEN)) return json({ok:false,code:'rate_limited',message:t.rate},429);
  await cacheWrite('delivery',id,{status:'pending',receipt},1800);
  const body = message(data,receipt);
  // Har bir chat'ga yuboriladi; kamida bittasiga yetib borsa — ariza qabul qilingan.
  const results = await Promise.all(chatIds(env).map(chatId => sendTelegram(env,chatId,body)));
  if (results.includes('sent')) {
    await cacheWrite('delivery',id,{status:'sent',receipt},1800);
    return json({ok:true,receipt});
  }
  if (results.every(r => r === 'failed')) {
    await cacheWrite('delivery',id,{status:'failed',receipt},60);
    return json({ok:false,code:'delivery_failed',message:t.failed},502);
  }
  await cacheWrite('delivery',id,{status:'unknown',receipt},1800);
  return json({ok:false,code:'delivery_unknown',message:results.includes('network') ? t.network : t.unknown},504);
}

export async function handleBooking(request, env) {
  const url = new URL(request.url);
  if (url.pathname === '/api/booking/config') {
    if(request.method !== 'GET') return json({ok:false},405);
    const t = text[language(url.searchParams.get('lang'))];
    if(!configured(env)) return json({ok:false,ready:false,message:t.notReady},503);
    return json({ok:true,ready:true,token:await tokenFor(env.TELEGRAM_BOT_TOKEN),minDate:todayTashkent(),maxDate:new Date(Date.now()+90*86400000).toISOString().slice(0,10)});
  }
  if (url.pathname !== '/api/booking') return json({ok:false},404);
  if (request.method !== 'POST') return json({ok:false},405);
  const suppliedOrigin=request.headers.get('Origin');
  if (!suppliedOrigin || ![...allowedOrigins,url.origin].includes(suppliedOrigin) || request.headers.get('Sec-Fetch-Site') === 'cross-site') return json({ok:false,message:text.uz.origin},403);
  if (!configured(env)) return json({ok:false,code:'not_configured',message:text.uz.notReady},503);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ok:false},415);
  if (Number(request.headers.get('Content-Length')||0)>8192) return json({ok:false},413);
  let raw;
  try { raw=await request.text(); } catch { return json({ok:false},400); }
  if(encoder.encode(raw).length>8192) return json({ok:false},413);
  let body;
  try {body=JSON.parse(raw);} catch {return json({ok:false},400);}
  if(!body || typeof body!=='object' || Array.isArray(body)) return json({ok:false},400);
  const lang=language(body.lang);
  const t=text[lang];
  if(body.website) return json({ok:false,message:t.rejected},400);
  const id=await verifyToken(body.token,env.TELEGRAM_BOT_TOKEN);
  if(!id) return json({ok:false,code:'token_expired',message:t.expired},400);
  let checked;
  if (body.event !== undefined) {
    const event = events.get(body.event);
    if (!event) return json({ok:false,code:'event_unknown',message:t.unknownEvent},400);
    if (Date.now() >= Date.parse(event.closes)) return json({ok:false,code:'event_closed',message:t.closed},410);
    checked = validateEventBooking(body,lang);
  } else checked = validateBooking(body,lang);
  const {fields,data}=checked;
  if(Object.keys(fields).length) return json({ok:false,fields,message:t.fields},422);
  if(deliveries.has(id)) return deliveries.get(id).promise.then(r=>r.clone());
  const promise=deliver(id,data,env,request);
  deliveries.set(id,{promise,expires:Date.now()+ttl});
  if(deliveries.size>1000) for(const [key,value] of deliveries) if(value.expires<Date.now()) deliveries.delete(key);
  const response=await promise;
  // Keep successful or uncertain receipts; a definitive failure may be retried.
  if([429,502].includes(response.status)) deliveries.delete(id);
  return response.clone();
}

export function serverError(lang) {
  return text[language(lang)].error;
}
