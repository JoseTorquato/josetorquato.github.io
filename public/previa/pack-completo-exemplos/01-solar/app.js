(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Reveal no scroll (IntersectionObserver, sem dependências)
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')})}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:0,rootMargin:"0px 0px -4% 0px"});
    els.forEach(function(e,i){e.style.setProperty('--d',(i%4)*80+'ms');io.observe(e)});
  }
  // Simulador. Premissas ilustrativas (também descritas na página).
  var TARIFA=0.95, MINIMO_KWH=50, COBERTURA=0.95, KWH_POR_KWP=120;
  var conta=document.getElementById('conta'),faixa=document.getElementById('faixa'),err=document.getElementById('err');
  var rMes=document.getElementById('r-mes'),rAno=document.getElementById('r-ano'),rKwp=document.getElementById('r-kwp'),wa=document.getElementById('sim-wa');
  var brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
  var cur=0,raf;
  function calc(v){
    var kwh=v/TARIFA, comp=Math.max(0,Math.min(COBERTURA*kwh,kwh-MINIMO_KWH));
    return {mes:comp*TARIFA,kwp:comp/KWH_POR_KWP};
  }
  function show(mes){rMes.textContent=brl.format(mes)}
  function update(v,fromRange){
    var ok=isFinite(v)&&v>=80&&v<=20000;
    err.hidden=ok; if(!ok)return;
    if(fromRange)conta.value=v; else if(v<=3000)faixa.value=v;
    var r=calc(v);
    rAno.textContent=brl.format(r.mes*12);
    rKwp.textContent=r.kwp.toFixed(1).replace('.',',')+' kWp';
    wa.href='https://wa.me/5551900000000?text='+encodeURIComponent('Olá! Simulei no site: conta de R$ '+Math.round(v)+'/mês, economia ilustrativa de '+brl.format(r.mes)+'/mês. Quero um orçamento real.');
    cancelAnimationFrame(raf);
    if(reduce){cur=r.mes;show(cur);return}
    var from=cur,t0=performance.now();
    (function step(t){var p=Math.min(1,(t-t0)/400);cur=from+(r.mes-from)*(1-Math.pow(1-p,3));show(cur);if(p<1)raf=requestAnimationFrame(step)})(t0);
  }
  conta.addEventListener('input',function(){update(parseFloat(conta.value),false)});
  faixa.addEventListener('input',function(){update(parseFloat(faixa.value),true)});
  cur=calc(400).mes; update(400,false);
})();
