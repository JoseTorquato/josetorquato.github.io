const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const s=document.querySelector('.sticky'),h=document.querySelector('.hero'),b=document.querySelector('#comprar');
let hv=true,bv=false;const up=()=>s.classList.toggle('on',!hv&&!bv);
new IntersectionObserver(([e])=>{hv=e.isIntersecting;up()}).observe(h);
new IntersectionObserver(([e])=>{bv=e.isIntersecting;up()}).observe(b);

const KIWIFY=/^https?:\/\/pay\.kiwify\.com\.br\//i;

function checkoutValue(a){
  if(a.dataset.pack==='completo'||a.id==='checkout-completo'||a.id==='checkout-completo-hero'||a.id==='checkout-completo-sticky')return 37;
  return 9.90;
}

function isCheckoutCta(a){
  const href=a.getAttribute('href')||'';
  if(KIWIFY.test(href))return true;
  if(href.startsWith('#checkout-'))return true;
  return a.id.startsWith('checkout-');
}

function withPageSearch(href){
  const search=location.search;
  if(!search||!KIWIFY.test(href))return href;
  if(href.endsWith(search)||href.endsWith('&'+search.slice(1)))return href;
  return href.includes('?')?href+'&'+search.slice(1):href+search;
}

document.querySelectorAll('a[href*="pay.kiwify.com.br"]').forEach(a=>{
  const href=a.getAttribute('href');
  if(!href)return;
  const next=withPageSearch(href);
  if(next!==href)a.setAttribute('href',next);
});

document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a');
  if(!a||!isCheckoutCta(a))return;
  const href=a.getAttribute('href')||'';
  if(KIWIFY.test(href)){
    const next=withPageSearch(href);
    if(next!==href)a.setAttribute('href',next);
  }
  if(typeof fbq==='function')fbq('track','InitiateCheckout',{value:checkoutValue(a),currency:'BRL'});
});
