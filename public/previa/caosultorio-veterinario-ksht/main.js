
(function(){
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-map]').forEach(box=>{
    const btn=box.querySelector('[data-map-load]'); const src=box.getAttribute('data-map');
    if(!btn||!src) return;
    btn.addEventListener('click',()=>{
      const iframe=document.createElement('iframe');
      iframe.src=src; iframe.title='Mapa'; iframe.loading='lazy';
      iframe.referrerPolicy='no-referrer-when-downgrade'; iframe.allowFullscreen=true;
      box.innerHTML=''; box.appendChild(iframe);
    });
  });
})();
