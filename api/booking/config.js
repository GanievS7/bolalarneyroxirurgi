// GET /api/booking/config — forma uchun bir martalik token (Telegram sozlangan bo'lsa).
import { vercelBooking } from '../_handler.js';

export const config = { runtime: 'edge' };

export default function handler(request) {
  return vercelBooking(request);
}
