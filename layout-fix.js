document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (!header) return;

  // --- Thumbnail strip under header ---
  let strip = document.getElementById('thumb-strip');
  if (!strip) {
    strip = document.createElement('section');
    strip.id = 'thumb-strip';
    header.insertAdjacentElement('afterend', strip);
  }
  let track = strip.querySelector('#thumb-track');
  if (!track) {
    track = document.createElement('div');
    track.id = 'thumb-track';
    strip.appendChild(track);
  }

  // Collect any existing /screenshots/ images on the page
  const candidates = Array.from(document.querySelectorAll('img[src*="/screenshots/"]'));
  // Clear track first
  track.innerHTML = '';
  if (candidates.length) {
    // Use clones so originals remain where they are (but sized by CSS anyway)
    const thumbs = candidates.map(img => {
      const c = img.cloneNode(true);
      c.removeAttribute('width'); c.removeAttribute('height');
      return c;
    });
    // Duplicate once for seamless loop
    [...thumbs, ...thumbs].forEach(n => track.appendChild(n));
  } else {
    // If none found, hide the strip
    strip.style.display = 'none';
  }

  // --- Packages + Contact restore if missing ---
  if (!document.getElementById('packages')) {
    const sec = document.createElement('section');
    sec.id = 'packages';
    sec.setAttribute('aria-label', 'Service Packages');
    sec.innerHTML = `
      <div class="package" id="package-a">
        <h3>Package A – Quick Tune-Up</h3>
        <div class="price">$79 flat</div>
        <ul>
          <li>Basic diagnostics & updates</li>
          <li>Malware/adware sweep</li>
          <li>Startup cleanup & speed boost</li>
        </ul>
        <a class="btn-red" href="tech-support.html#contact">Get Package A</a>
      </div>
      <div class="package" id="package-b">
        <h3>Package B – Full Refurb & Migration</h3>
        <div class="price">$149 flat</div>
        <ul>
          <li>Deep clean, updates, drivers</li>
          <li>Data transfer & backups setup</li>
          <li>App installs + performance tuning</li>
        </ul>
        <a class="btn-red" href="tech-support.html#contact">Get Package B</a>
      </div>`;
    // Place after the strip
    strip.insertAdjacentElement('afterend', sec);
  }

  if (!document.getElementById('contact')) {
    const contact = document.createElement('section');
    contact.id = 'contact';
    contact.setAttribute('aria-label', 'Contact Form');
    contact.innerHTML = `
      <h3 style="margin:0 0 12px 0">Contact Us</h3>
      <form action="tech-support.html" method="get">
        <div><input type="text" name="name" placeholder="Your name" required></div>
        <div><input type="email" name="email" placeholder="Email" required></div>
        <div class="full"><input type="tel" name="phone" placeholder="Phone (optional)"></div>
        <div class="full"><textarea name="message" rows="5" placeholder="How can we help?" required></textarea></div>
        <div class="full"><button type="submit" class="btn-red">Send</button></div>
      </form>
      <p style="margin:8px 0 0;color:#9fb1c3;font-size:14px">
        Prefer email? Use the red button at top or see <a href="tech-support.html">Tech Support</a>.
      </p>`;
    // Append after packages (or after strip if packages existed)
    const pkg = document.getElementById('packages') || strip;
    pkg.insertAdjacentElement('afterend', contact);
  }
});
