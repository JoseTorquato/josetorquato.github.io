
(function(){
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const worlds = [
    { title:'CONSULTA', label:'Clínica', heading:'Consulta com tempo de ouvir', desc:'Avaliação clínica para o dia a dia do pet — orientação clara para o tutor.',
      objs:['assets/copets-stick-stethoscope.webp','assets/copets-stick-syringe.webp','assets/copets-extra-bone.webp','assets/copets-stick-food.webp'] },
    { title:'VACINAS', label:'Prevenção', heading:'Vacinas no ritmo certo', desc:'Calendário vacinal, reforços e orientação sem susto na sala.',
      objs:['assets/copets-stick-syringe.webp','assets/copets-stick-stethoscope.webp','assets/copets-extra-vial.webp','assets/copets-extra-clipboard.webp'] },
    { title:'BANHO', label:'Higiene', heading:'Banho que respeita a pele', desc:'Higiene e tosa com atenção ao humor do pet.',
      objs:['assets/copets-stick-shampoo.webp','assets/copets-extra-towel.webp','assets/copets-extra-duck.webp','assets/copets-stick-food.webp'] },
    { title:'LOJA', label:'Ração & itens', heading:'Prateleira certa no balcão', desc:'Alimentação e acessórios com indicação da equipe.',
      objs:['assets/copets-stick-food.webp','assets/copets-extra-bone.webp','assets/copets-stick-shampoo.webp','assets/copets-stick-stethoscope.webp'] }
  ];
  let idx = 0; let busy = false; let timer = null;
  const body = document.body;
  const stage = document.querySelector('.stage');
  const giant = document.getElementById('giant-title');
  const label = document.getElementById('world-label');
  const heading = document.getElementById('world-heading');
  const desc = document.getElementById('world-desc');
  const tabs = Array.from(document.querySelectorAll('.dots [data-world]'));
  const objImgs = [document.getElementById('obj-a'),document.getElementById('obj-b'),document.getElementById('obj-c'),document.getElementById('obj-d')];
  const splash = document.querySelector('.fx-splash');

  function applyWorld(i, animate){
    const w = worlds[i]; idx = i;
    body.setAttribute('data-world', String(i));
    giant.textContent = w.title;
    label.textContent = w.label;
    heading.textContent = w.heading;
    desc.textContent = w.desc;
    objImgs.forEach((img, k)=>{ if(img) img.src = w.objs[k]; });
    tabs.forEach((t,k)=> t.setAttribute('aria-selected', k===i ? 'true':'false'));
    if(animate && !reduce){
      stage.classList.add('switching');
      if(splash){ splash.style.setProperty('--sx', (20+Math.random()*60)+'%'); splash.style.setProperty('--sy', (25+Math.random()*40)+'%'); }
      if(window.gsap){
        gsap.fromTo(giant, {scale:1.08, opacity:0.05}, {scale:1, opacity:0.16, duration:0.7, ease:'power3.out'});
        gsap.fromTo('.float-obj', {y: (i%2?16:-16), opacity:0.2}, {y:0, opacity:0.95, duration:0.65, stagger:0.06, ease:'power2.out'});
        gsap.fromTo('.pet-wrap', {scale:0.96}, {scale:1, duration:0.55, ease:'power2.out'});
      }
      setTimeout(()=> stage.classList.remove('switching'), 720);
    }
  }
  function go(i){
    i = (i+worlds.length) % worlds.length;
    if(i===idx || busy) return;
    busy = true; applyWorld(i, true);
    setTimeout(()=>{ busy=false; }, reduce?80:750);
  }
  tabs.forEach(t=> t.addEventListener('click', ()=> go(parseInt(t.getAttribute('data-world'),10))));
  document.querySelectorAll('[data-jump]').forEach(el=>{
    el.addEventListener('click', ()=>{ go(parseInt(el.getAttribute('data-jump'),10)); window.scrollTo({top:0, behavior: reduce?'auto':'smooth'}); });
  });
  stage.tabIndex = 0;
  stage.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') go(idx+1);
    if(e.key==='ArrowLeft') go(idx-1);
  });

  function arm(){ if(reduce) return; clearInterval(timer); timer=setInterval(()=>go(idx+1), 7000); }
  function pause(){ clearInterval(timer); timer=null; }
  stage.addEventListener('mouseenter', pause);
  stage.addEventListener('mouseleave', arm);
  stage.addEventListener('focusin', pause);
  stage.addEventListener('focusout', (e)=>{ if(!stage.contains(e.relatedTarget)) arm(); });
  document.addEventListener('visibilitychange', ()=>{ if(document.hidden) pause(); else arm(); });
  arm();

  const floats = Array.from(document.querySelectorAll('.float-obj'));
  if(!reduce){
    window.addEventListener('pointermove', (e)=>{
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      floats.forEach(f=>{
        const d = parseFloat(f.getAttribute('data-depth')||'0.05');
        f.style.transform = 'translate('+(cx*d*220)+'px,'+(cy*d*160)+'px)';
      });
    }, {passive:true});
  }

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
  applyWorld(0, false);
})();
