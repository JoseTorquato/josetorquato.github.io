
(function(){
  document.documentElement.classList.add('js');
  const el=document.getElementById('clock');
  function tick(){const d=new Date(); if(el) el.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
  tick(); setInterval(tick,15000);
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
