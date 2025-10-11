// Lightbox for scrolling screenshots
(function(){
  var box  = document.getElementById('lightbox'); if(!box) return;
  var img  = box.querySelector('img');
  var btn  = box.querySelector('.close');

  function openLB(src){ img.src = src; box.classList.add('open'); }
  function closeLB(){ box.classList.remove('open'); img.removeAttribute('src'); }

  // Open on click of any thumbnail inside the marquee track
  document.addEventListener('click', function(ev){
    var thumb = ev.target.closest && ev.target.closest('.track img');
    if(thumb){ ev.preventDefault(); openLB(thumb.getAttribute('src')); return; }
    if(ev.target === box || ev.target === btn){ ev.preventDefault(); closeLB(); }
  });

  // Close on ESC
  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape') closeLB();
  });
})();
