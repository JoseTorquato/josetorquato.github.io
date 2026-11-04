/* Academia Point RS v2 — movimento.
   Assinatura: (1) colagem do hero "se monta" na entrada e se espalha suavemente ao rolar;
   (2) bento "monta" peça a peça (scrub); (3) cartões empilhados das modalidades encolhem ao serem cobertos.
   Secundários: reveal leve, contadores. Sai cedo em reduced-motion / saveData. */
(function(){
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sd=navigator.connection&&navigator.connection.saveData;
  function show(){document.querySelectorAll('.reveal').forEach(function(e){e.style.opacity=1;e.style.transform='none'})}
  if(rm||sd||!window.gsap||!window.ScrollTrigger){show();return}
  gsap.registerPlugin(ScrollTrigger);
  var desk=matchMedia('(min-width:901px)').matches;

  // 1. hero: colagem se monta (foto principal já visível = LCP intacto)
  gsap.from('.ph--a,.ph--b',{y:60,rotation:function(i){return i?-18:18},opacity:0,duration:1,ease:'back.out(1.6)',stagger:.12,delay:.15});
  gsap.from('.sticker',{scale:0,rotation:-30,duration:.7,ease:'back.out(2.2)',stagger:.15,delay:.55});
  gsap.from('.hero__text>*',{y:24,opacity:0,duration:.7,ease:'power3.out',stagger:.08});
  if(desk){
    var tl=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
    tl.to('.ph--a',{y:-80,rotation:12},0).to('.ph--b',{y:-40,x:-30,rotation:-10},0).to('.ph--main',{y:30,rotation:-4},0).to('.sticker--open',{y:-120,rotation:20},0);
  }

  // 2. bento monta: peças chegam de direções diferentes e se encaixam
  var tiles=gsap.utils.toArray('.bento .tile');
  gsap.set(tiles,{opacity:1});
  gsap.fromTo(tiles,{opacity:0,y:function(i){return [120,-60,90,140,-80][i]||80},x:function(i){return [-80,0,90,-40,60][i]||0},rotation:function(i){return [-8,5,10,-6,7][i]||0},scale:.85},
    {opacity:1,y:0,x:0,rotation:0,scale:1,ease:'power2.out',stagger:.08,
     scrollTrigger:{trigger:'.bento',start:'top 95%',end:'top 45%',scrub:desk?.8:false,toggleActions:'play none none none'}});

  // 3. cartões empilhados: o de trás encolhe e escurece levemente
  var cards=gsap.utils.toArray('.scard');
  cards.forEach(function(c,i){
    if(i===cards.length-1)return;
    gsap.to(c,{scale:.92-(cards.length-i)*.01,filter:'brightness(.93)',ease:'none',
      scrollTrigger:{trigger:cards[i+1],start:'top 85%',end:'top 20%',scrub:true}});
  });

  // reveal + contadores
  ScrollTrigger.batch('.reveal:not(.tile)',{start:'top 88%',once:true,onEnter:function(b){gsap.to(b,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08})}});
  document.querySelectorAll('.count').forEach(function(el){
    var to=parseFloat(el.dataset.to),d=+el.dataset.dec,o={v:0};
    ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){
      gsap.to(o,{v:to,duration:1.4,ease:'power2.out',onUpdate:function(){el.textContent=o.v.toFixed(d).replace('.',',')}})}});
  });
  addEventListener('load',function(){ScrollTrigger.refresh()});
})();
