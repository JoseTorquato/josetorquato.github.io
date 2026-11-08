const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const s=document.querySelector('.sticky'),h=document.querySelector('.hero'),b=document.querySelector('#comprar');
let hv=true,bv=false;const up=()=>s.classList.toggle('on',!hv&&!bv);
new IntersectionObserver(([e])=>{hv=e.isIntersecting;up()}).observe(h);
new IntersectionObserver(([e])=>{bv=e.isIntersecting;up()}).observe(b);

const CHECKOUT_HOST='pay.kiwify.com.br';
const CHECKOUT_PATH='/LN2xiTX';

function completoCheckoutUrl(href){
  try{
    const url=new URL(href,location.href);
    const path=url.pathname.replace(/\/+$/,'')||'/';
    if(url.protocol!=='https:'||url.hostname!==CHECKOUT_HOST||path!==CHECKOUT_PATH)return null;
    return url;
  }catch(e){
    return null;
  }
}

function withPageSearch(href){
  const url=completoCheckoutUrl(href);
  if(!url)return href;
  const search=location.search;
  if(!search||search==='?')return href;
  const incoming=new URLSearchParams(search);
  let changed=false;
  incoming.forEach((value,key)=>{
    if(url.searchParams.getAll(key).includes(value))return;
    url.searchParams.append(key,value);
    changed=true;
  });
  return changed?url.toString():href;
}

document.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href');
  if(!href||!completoCheckoutUrl(href))return;
  const next=withPageSearch(href);
  if(next!==href)a.setAttribute('href',next);
});

document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a');
  if(!a)return;
  const href=a.getAttribute('href')||'';
  if(!completoCheckoutUrl(href))return;
  const next=withPageSearch(href);
  if(next!==href)a.setAttribute('href',next);
  if(typeof fbq==='function')fbq('track','InitiateCheckout',{value:37,currency:'BRL'});
});
