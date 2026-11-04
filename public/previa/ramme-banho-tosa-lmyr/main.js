
(function(){
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = document.getElementById('ba-slider');
  const pkgs = Array.from(document.querySelectorAll('.pkg'));
  const bookPkg = document.getElementById('book-pkg');
  const bookCta = document.getElementById('book-cta');
  const WA = '5551994118057';
  const labels = {
    banho: 'Banho',
    'banho-tosa': 'Banho + tosa',
    mensal: 'Plano mensal'
  };

  function setPos(clientX){
    const r = box.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(5, Math.min(95, p));
    box.style.setProperty('--pos', p + '%');
    box.setAttribute('aria-valuenow', String(Math.round(p)));
  }
  if(box){
    let drag=false;
    box.addEventListener('pointerdown', e=>{ drag=true; box.setPointerCapture(e.pointerId); setPos(e.clientX); });
    box.addEventListener('pointermove', e=>{ if(drag) setPos(e.clientX); });
    box.addEventListener('pointerup', ()=>{ drag=false; });
    box.addEventListener('pointercancel', ()=>{ drag=false; });
    box.addEventListener('keydown', e=>{
      const cur = parseFloat(box.style.getPropertyValue('--pos')) || 50;
      if(e.key==='ArrowLeft'){ e.preventDefault(); const p=Math.max(5,cur-5); box.style.setProperty('--pos',p+'%'); box.setAttribute('aria-valuenow',String(Math.round(p))); }
      if(e.key==='ArrowRight'){ e.preventDefault(); const p=Math.min(95,cur+5); box.style.setProperty('--pos',p+'%'); box.setAttribute('aria-valuenow',String(Math.round(p))); }
      if(e.key==='Home'){ e.preventDefault(); box.style.setProperty('--pos','5%'); box.setAttribute('aria-valuenow','5'); }
      if(e.key==='End'){ e.preventDefault(); box.style.setProperty('--pos','95%'); box.setAttribute('aria-valuenow','95'); }
    });
    if(!reduce && window.matchMedia('(pointer:fine)').matches){
      let t0 = performance.now();
      function nudge(t){
        const p = Math.min(1,(t-t0)/1400);
        const wave = 50 + Math.sin(p*Math.PI*2)*8;
        if(p<1 && !drag){ box.style.setProperty('--pos', wave+'%'); requestAnimationFrame(nudge); }
        else if(!drag){ box.style.setProperty('--pos','50%'); box.setAttribute('aria-valuenow','50'); }
      }
      requestAnimationFrame(nudge);
    }
  }

  function selectPkg(key){
    pkgs.forEach(p=> p.classList.toggle('active', p.getAttribute('data-pkg')===key));
    const name = labels[key] || 'Banho';
    if(bookPkg) bookPkg.textContent = name;
    if(bookCta){
      const msg = encodeURIComponent('Olá! Quero agendar: '+name+' na Ramme.');
      bookCta.href = 'https://wa.me/'+WA+'?text='+msg;
    }
  }
  pkgs.forEach(p=> p.addEventListener('click', ()=> selectPkg(p.getAttribute('data-pkg'))));

  document.querySelectorAll('[data-map]').forEach(box=>{
    const btn=box.querySelector('[data-map-load]'); const src=box.getAttribute('data-map');
    if(!btn||!src) return;
    btn.addEventListener('click', ()=>{
      const iframe=document.createElement('iframe');
      iframe.src=src; iframe.title='Mapa'; iframe.loading='lazy';
      iframe.referrerPolicy='no-referrer-when-downgrade'; iframe.allowFullscreen=true;
      box.innerHTML=''; box.appendChild(iframe);
    });
  });
})();
