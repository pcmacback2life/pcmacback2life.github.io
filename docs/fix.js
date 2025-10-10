document.addEventListener('DOMContentLoaded', () => {
  // Hide any search/ghost bar anywhere
  document.querySelectorAll('input[type="search"],[role="search"],[class*="search" i],[id*="search" i]')
    .forEach(el => { const box = el.closest('form,div,section,header') || el; box.style.display = 'none'; });

  // Find a hero container
  const hero = document.querySelector('#hero, .hero, .site-hero, .top');
  if (!hero) return;

  // Collect existing screenshots so we can reuse them
  const shots = Array.from(document.querySelectorAll('img[src*="/screenshots/"], img[src^="screenshots/"]'));

  // Replace the hero with clean markup
  hero.innerHTML = `
    <img id="hero-logo" src="images/logo.png" alt="PC • Mac • Back 2 Life"
         style="max-height:110px;height:auto;width:auto;display:block;margin:10px auto;" />
    <div class="btn-support-wrap" style="display:flex;justify-content:center;margin:12px 0 18px;">
      <a class="btn-support" href="tech-support.html"
         style="display:inline-block;padding:16px 28px;border-radius:9999px;background:#e63946;color:#fff;
                font-weight:700;text-decoration:none;box-shadow:0 8px 18px rgba(0,0,0,.25);">
        Just looking for tech support for my PC
      </a>
    </div>
    <div class="screenshot-row"
         style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;max-width:1200px;margin:0 auto 12px;"></div>
  `;

  // Populate screenshots (max 8)
  const grid = hero.querySelector('.screenshot-row');
  shots.slice(0, 8).forEach(img => {
    const c = img.cloneNode(true);
    Object.assign(c.style, { maxWidth: '320px', height: 'auto', margin: '8px', objectFit: 'contain', position: 'static' });
    grid.appendChild(c);
  });

  // Hide any other logos/buttons that might be elsewhere on the page
  document.querySelectorAll('img[src*="logo"]:not([src*="images/logo.png"])').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.btn-support-wrap').forEach((wrap, i) => {
    const isHero = wrap === hero.querySelector('.btn-support-wrap');
    if (!isHero) wrap.style.display = 'none';
  });
});
