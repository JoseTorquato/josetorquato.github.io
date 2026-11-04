
(function(){
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = (String(target).split('.')[1]||'').length;
    if (reduce){ el.textContent = target.toFixed(decimals).replace('.',','); return; }
    const t0 = performance.now(); const dur=1100;
    function frame(t){
      const p=Math.min(1,(t-t0)/dur); const e=1-Math.pow(1-p,3);
      el.textContent=(target*e).toFixed(decimals).replace('.',',');
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
  const car = document.getElementById('rev-carousel');
  if(car){
    const step = ()=> Math.min(car.clientWidth*0.85, 360);
    document.querySelector('[data-prev]')?.addEventListener('click', ()=> car.scrollBy({left:-step(), behavior: reduce?'auto':'smooth'}));
    document.querySelector('[data-next]')?.addEventListener('click', ()=> car.scrollBy({left: step(), behavior: reduce?'auto':'smooth'}));
    car.addEventListener('keydown', e=>{
      if(e.key==='ArrowRight'){ e.preventDefault(); car.scrollBy({left: step(), behavior:'smooth'}); }
      if(e.key==='ArrowLeft'){ e.preventDefault(); car.scrollBy({left:-step(), behavior:'smooth'}); }
    });
  }
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
