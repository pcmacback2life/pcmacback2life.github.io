document.addEventListener('DOMContentLoaded', async () => {
  const track = document.querySelector('.marquee__track');
  if (!track) return;

  const tryFetch = async (u) => { try { const r = await fetch(u, {cache:'no-store'}); if (r.ok) return r.json(); } catch(_) {} return null; };
  const candidates = ['screenshots.json','screenshots/index.json','screenshots/screenshots.json','assets/screenshots.json'];
  let data=null; for (const u of candidates){ data = await tryFetch(u); if (data) break; }
  if (!data) return;
  const items = Array.isArray(data) ? data : (data.items||[]); if (!items.length) return;

  const ver = Date.now();
  for (const it of items){
    const src  = (it.src || it.url || it) + `?v=${ver}`;
    const href = (it.href || it.url || it);
    const alt  = it.alt || '';
    const a = document.createElement('a'); a.className='marquee__item'; a.href=href; a.target='_blank'; a.rel='noopener';
    const img = document.createElement('img'); img.loading='lazy'; img.decoding='async'; img.src=src; img.alt=alt;
    a.appendChild(img); track.appendChild(a);
  }

  // Duplicate for seamless loop
  track.innerHTML += track.innerHTML;

  // Compute distance & duration
  requestAnimationFrame(() => {
    const gap = parseFloat(getComputedStyle(track).gap||'0');
    const kids = Array.from(track.children);
    const half = kids.slice(0, kids.length/2);
    const width = half.reduce((w,el)=> w + el.getBoundingClientRect().width + gap, 0);
    track.style.setProperty('--marquee-distance', width + 'px');
    const pxPerSec = 120; const dur = Math.max(20, Math.round(width/pxPerSec));
    track.style.setProperty('--marquee-duration', dur + 's');
  });
});
