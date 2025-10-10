document.addEventListener('DOMContentLoaded', async () => {
  const t=document.querySelector('.marquee__track'); if(!t) return;
  const add=src=>{const d=document.createElement('div');d.className='marquee__item';
    const i=new Image();i.loading='lazy';i.decoding='async';i.src=src; d.appendChild(i); t.appendChild(d);};
  let items=[];
  try{const r=await fetch('screenshots.json',{cache:'no-store'}); if(r.ok){const j=await r.json(); items=Array.isArray(j)?j:(j.items||[]);}}catch(_){}
  if(!items.length){ document.querySelectorAll('img[src*="screenshots/"]').forEach(img=>add(img.src)); }
  else{ const v=Date.now(); items.forEach(it=>add((it.src||it.url||it)+`?v=${v}`)); }
  if(!t.children.length) return;
  t.innerHTML += t.innerHTML; // seamless loop
  requestAnimationFrame(()=>{ const gap=parseFloat(getComputedStyle(t).gap||'0');
    const kids=[...t.children]; const half=kids.slice(0,kids.length/2);
    const w=half.reduce((s,el)=>s+el.getBoundingClientRect().width+gap,0);
    t.style.setProperty('--dist', w+'px'); const px=120; const dur=Math.max(20,Math.round(w/px));
    t.style.setProperty('--dur', dur+'s'); });
});
