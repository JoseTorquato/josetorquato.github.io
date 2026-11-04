(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,D=document,mob=matchMedia('(max-width:820px)').matches;
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});
D.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+'ms';rm?el.classList.add('in'):io.observe(el)});
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,to=+el.dataset.to,dec=+(el.dataset.dec||0),t0=performance.now();
const f=t=>{const p=Math.min(1,(t-t0)/1400),v=to*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec).replace('.',',');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
D.querySelectorAll('.count').forEach(el=>{if(!rm){el.textContent='0';co.observe(el)}else el.textContent=(+el.dataset.to).toFixed(+(el.dataset.dec||0)).replace('.',',')});
// burger build (scroll-driven)
const sec=D.querySelector('.build'),L=[...D.querySelectorAll('.L')],steps=[...D.querySelectorAll('.steps li')];
const saveData=navigator.connection&&navigator.connection.saveData;
if(!rm&&!saveData&&sec){if(mob)D.documentElement.classList.add('mobile-build');let last=-1;
const draw=()=>{const r=sec.getBoundingClientRect(),tot=sec.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/tot));if(Math.abs(p-last)<.001)return;last=p;
const n=L.length;L.forEach((g,i)=>{const s=i/(n+1),q=Math.min(1,Math.max(0,(p-s)/(1.2/(n+1))));const e=1-Math.pow(1-q,3),bounce=q<1?0:0;
g.style.transform=`translateY(${(1-e)*-520}px) rotate(${(1-e)*(i%2?8:-8)}deg)`;g.style.opacity=q>0?1:0;g.style.transformOrigin='200px 250px'});
steps.forEach((li,i)=>li.classList.toggle('on',p>=i/(n+1)+.02))};
let tk=false;addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(()=>{tk=false;draw()})}},{passive:true});addEventListener('resize',()=>{last=-1;draw()});draw()}
else steps.forEach(li=>li.classList.add('on'));
// tilt (desktop pointer only)
if(!rm&&matchMedia('(hover:hover) and (pointer:fine)').matches)D.querySelectorAll('.tilt').forEach(c=>{
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-6px)`});
c.addEventListener('pointerleave',()=>{c.style.transform=''})});
// map fallback: keep card visible if iframe errors (it sits behind iframe)
})();
