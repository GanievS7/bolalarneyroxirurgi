// Renders the bilingual static pages and SEO files into web/.
import {writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {renderPage} from '../src/page.mjs';
import {renderEvent} from '../src/event.mjs';
import {events} from '../server/booking.js';
import {site} from '../src/site.mjs';
import uz from '../src/content/uz.mjs';
import ru from '../src/content/ru.mjs';

const root=new URL('..',import.meta.url).pathname;
const web=join(root,'web');
for (const key of site.conditions) for (const t of [uz,ru]) if(!t.conditions.items[key]) throw new Error(`Missing condition ${key} in ${t.lang}`);
for (const id of site.videos) for (const t of [uz,ru]) if(!t.videos.items[id]) throw new Error(`Missing video ${id} in ${t.lang}`);

site.eventData = site.eventId ? events.get(site.eventId) : null;
if (site.eventId && !site.eventData) throw new Error(`Unknown event ${site.eventId}`);
await mkdir(join(web,'ru'),{recursive:true});
await writeFile(join(web,'index.html'),renderPage(uz,site));
await writeFile(join(web,'ru','index.html'),renderPage(ru,site));
const pages=['/','/ru/'];
if (site.eventData) {
  await mkdir(join(web,'konsultatsiya'),{recursive:true});
  await mkdir(join(web,'ru','konsultatsiya'),{recursive:true});
  await writeFile(join(web,'konsultatsiya','index.html'),renderEvent(uz,site));
  await writeFile(join(web,'ru','konsultatsiya','index.html'),renderEvent(ru,site));
  pages.push('/konsultatsiya/','/ru/konsultatsiya/');
}

const today=new Date().toISOString().slice(0,10);
const pair=path=>{const uzPath=path.replace(/^\/ru\//,'/');const ruPath=uzPath==='/'?'/ru/':'/ru'+uzPath;return `<xhtml:link rel="alternate" hreflang="uz" href="${site.domain}${uzPath}"/><xhtml:link rel="alternate" hreflang="ru" href="${site.domain}${ruPath}"/>`;};
await writeFile(join(web,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(path=>`<url><loc>${site.domain}${path}</loc><lastmod>${today}</lastmod>${pair(path)}</url>`).join('\n')}
</urlset>
`);
await writeFile(join(web,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.domain}/sitemap.xml\n`);
console.log(`Rendered ${pages.join(', ')} + sitemap.xml, robots.txt`);
