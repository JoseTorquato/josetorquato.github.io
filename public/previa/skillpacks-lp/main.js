const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const s=document.querySelector('.sticky'),h=document.querySelector('.hero'),b=document.querySelector('#comprar');
let hv=true,bv=false;const up=()=>s.classList.toggle('on',!hv&&!bv);
new IntersectionObserver(([e])=>{hv=e.isIntersecting;up()}).observe(h);
new IntersectionObserver(([e])=>{bv=e.isIntersecting;up()}).observe(b);
