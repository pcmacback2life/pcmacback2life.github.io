document.addEventListener('DOMContentLoaded', function(){
  try{
    var hero = document.getElementById('hero-logo');
    if(!hero) return;

    // 1) Remove ANY image/picture/svg before the hero (except gallery thumbs)
    var nodes = document.querySelectorAll('img, picture, svg');
    for (var i=0; i<nodes.length; i++){
      var el = nodes[i];
      if (el === hero) break;
      var src = (el.currentSrc || el.src || '').toLowerCase();
      if (src && src.indexOf('/screenshots/') !== -1) continue;  // keep gallery
      var wrap = el.closest('a, picture, figure, header, div, section') || el;
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }

    // 2) Move the Tech Support button block directly under the hero
    var wrap = document.querySelector('.btn-support-wrap') ||
               (function(){var b=document.getElementById('btn-tech-support'); return b?b.parentElement:null;})();
    if (wrap && hero.parentNode){
      var afterHero = Boolean(hero.compareDocumentPosition(wrap) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (!afterHero){
        hero.parentNode.insertBefore(wrap, hero.nextSibling);
      }
    }
  }catch(e){}
});
