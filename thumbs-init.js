document.addEventListener('DOMContentLoaded', () => {
  const strip = document.getElementById('thumb-strip'); if (!strip) return;
  let track = document.getElementById('thumb-track'); if (!track){ track=document.createElement('div');track.id='thumb-track';strip.appendChild(track); }
  track.innerHTML='';
  const imgs = Array.from(document.querySelectorAll('img[src*="/screenshots/"]'));
  if (!imgs.length){ strip.style.display='none'; return; }
  const clones = imgs.map(i => { const c=i.cloneNode(true); c.removeAttribute('width'); c.removeAttribute('height'); return c; });
  [...clones, ...clones].forEach(n => track.appendChild(n));
});
