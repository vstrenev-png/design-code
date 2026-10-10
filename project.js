/* Споделен JS за страниците на проектите */
const cursor=document.querySelector('.cursor');
if(cursor){
  let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
  (function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;
    cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop)})();
  document.querySelectorAll('[data-hover],a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hover'));
  });
}

/* nav hide on scroll down */
const nav=document.querySelector('.nav');let lastY=0;
addEventListener('scroll',()=>{
  const y=scrollY;
  if(nav)nav.classList.toggle('hidden',y>lastY&&y>300);
  lastY=y;
},{passive:true});

/* services dropdown */
const svc=document.getElementById('svcDrop');
const svcBtn=svc?svc.querySelector('.nav__drop-btn'):null;
if(svc&&svcBtn){
  if(matchMedia('(hover:hover)').matches){
    svc.addEventListener('mouseenter',()=>svc.classList.add('open'));
    svc.addEventListener('mouseleave',()=>svc.classList.remove('open'));
  }
  svcBtn.addEventListener('click',()=>svc.classList.toggle('open'));
  document.addEventListener('click',e=>{if(!svc.contains(e.target))svc.classList.remove('open')});
}

/* mobile menu */
const burger=document.getElementById('burger');
const menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',()=>{burger.classList.toggle('open');menu.classList.toggle('open')});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');menu.classList.remove('open')}));
}

/* page entrance */
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('loaded')));

/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('inview');io.unobserve(e.target)}
}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* parallax on gallery images */
const plx=[...document.querySelectorAll('[data-parallax]')];
(function parallax(){
  const vh=innerHeight;
  plx.forEach(img=>{
    const r=img.getBoundingClientRect();
    if(r.bottom<0||r.top>vh)return;
    const prog=(r.top+r.height/2-vh/2)/vh;
    img.style.translate=`0 ${(-prog*parseFloat(img.dataset.parallax)*100).toFixed(2)}%`;
  });
  requestAnimationFrame(parallax);
})();

/* video play button */
document.querySelectorAll('.p-video__wrap').forEach(wrap=>{
  const v=wrap.querySelector('video'),b=wrap.querySelector('.p-video__btn');
  if(!v||!b)return;
  b.addEventListener('click',()=>{v.play();b.classList.add('hide')});
  v.addEventListener('click',()=>{if(!v.paused){v.pause();b.classList.remove('hide')}});
});
