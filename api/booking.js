// POST /api/booking — arizani tekshirib Telegram'ga yuboradi.
import { vercelBooking } from './_handler.js';

export const config = { runtime: 'edge' };

export default function handler(request) {
  return vercelBooking(request);
}
