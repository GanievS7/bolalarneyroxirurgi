// Vercel adapter: ariza API'sini Vercel Edge funksiyasi sifatida ishga tushiradi.
// Mantiq server/booking.js da (Cloudflare Worker bilan bir xil kod).
// Maxfiy kalitlar faqat Vercel → Settings → Environment Variables da:
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
import { handleBooking } from '../server/booking.js';

export async function vercelBooking(request) {
  try {
    // /api/booking/ kabi oxiridagi "/" ni olib tashlaymiz — yo'nalish aniq bo'lsin.
    const url = new URL(request.url);
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/+$/, '');
      request = new Request(url, request);
    }
    const env = { TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID };
    return await handleBooking(request, env);
  } catch {
    return Response.json({ ok: false, message: 'Vaqtinchalik xatolik. Telefon orqali bog‘laning.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
