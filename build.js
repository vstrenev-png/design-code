const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));
const projects = data.projects;

const baseHead = (title, desc) => `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet">
`;

const nav = () => `
<header class="nav" id="nav">
  <a href="index.html" class="nav__brand" data-hover>
    <img src="assets/logo.png" alt="Design-Code лого">
    <span class="nav__name">Design<em>—</em>Code</span>
  </a>
  <nav class="nav__links">
    <div class="nav__item"><a href="projects.html" data-hover>Проекти</a></div>
    <div class="nav__item" id="svcDrop">
      <button class="nav__drop-btn" data-hover>Услуги<span class="plus">+</span></button>
      <div class="dropdown">
        <a href="index.html#spaces" data-hover><i>01</i>Жилищни</a>
        <a href="index.html#spaces" data-hover><i>02</i>Хотелиерство</a>
        <a href="index.html#spaces" data-hover><i>03</i>Търговски</a>
        <a href="index.html#spaces" data-hover><i>04</i>Спа &amp; Уелнес</a>
      </div>
    </div>
    <div class="nav__item"><a href="index.html#about" data-hover>За нас</a></div>
    <div class="nav__item"><a href="contact.html" data-hover>Контакти</a></div>
    <div class="nav__item"><a href="questions-and-answers.html" data-hover>Препоръки</a></div>
  </nav>
  <button class="burger" id="burger" aria-label="Меню" data-hover><span></span><span></span></button>
</header>

<div class="menu-overlay" id="menu">
  <a href="projects.html" data-hover>Проекти</a>
  <a href="index.html#spaces" data-hover>Услуги</a>
  <a href="index.html#about" data-hover>За нас</a>
  <a href="contact.html" data-hover>Контакти</a>
  <a href="questions-and-answers.html" data-hover>Препоръки</a>
</div>
`;

const mainFooter = () => `
<footer class="footer">
  <div class="footer__emails">
    <div class="footer__email"><span>Запитване</span><a href="mailto:info@design-code.bg" data-hover>info@design-code.bg</a></div>
    <div class="footer__email"><span>Нови проекти</span><a href="mailto:projects@design-code.bg" data-hover>projects@design-code.bg</a></div>
    <div class="footer__email"><span>Доставчици</span><a href="mailto:supply@design-code.bg" data-hover>supply@design-code.bg</a></div>
  </div>
  <div class="footer__mark">
    <img src="assets/logo.png" alt="Design-Code лого">
    <p class="footer__word">Design<em>—</em>Code</p>
  </div>
  <div class="footer__cols">
    <div class="footer__col">
      <h4>Основно</h4>
      <a href="projects.html" data-hover>Проекти</a>
      <a href="index.html#about" data-hover>За нас</a>
      <a href="contact.html" data-hover>Контакти</a>
      <a href="questions-and-answers.html" data-hover>Препоръки</a>
    </div>
    <div class="footer__col">
      <h4>Услуги</h4>
      <a href="index.html#spaces" data-hover>Жилищни</a>
      <a href="index.html#spaces" data-hover>Хотелиерство</a>
      <a href="index.html#spaces" data-hover>Търговски</a>
      <a href="index.html#spaces" data-hover>Спа &amp; Уелнес</a>
    </div>
    <div class="footer__col">
      <h4>Офис</h4>
      <p>София, България</p>
      <a href="tel:+359888123456" data-hover>+359 888 123 456</a>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© 2026 Design-Code — Интериорен дизайн</span>
    <span class="socials">
      <a href="#" data-hover>Instagram</a>
      <a href="#" data-hover>Facebook</a>
      <a href="#" data-hover>LinkedIn</a>
    </span>
  </div>
</footer>
`;

const projectNav = () => `
<header class="nav" id="nav">
  <a href="index.html" class="nav__brand" data-hover>
    <img src="assets/logo.png" alt="Design-Code лого">
    <span class="nav__name">Design<em>—</em>Code</span>
  </a>
  <a class="nav__back" href="projects.html" data-hover><span class="arr">&#8592;</span>Всички проекти</a>
</header>
`;

const projectFooter = () => `
<footer class="p-footer">
  <img src="assets/logo.png" alt="Design-Code">
  <span>© 2026 Design-Code — Интериорен дизайн</span>
  <a href="mailto:info@design-code.bg" data-hover>info@design-code.bg</a>
</footer>
`;

function projectCard(p, index) {
  const num = String(index + 1).padStart(3, '0');
  return `
    <a class="project reveal" data-hover href="project-${p.slug}.html">
      <div class="project__info"><h3 class="project__name">${p.title}</h3><span class="project__num">/ ${num}</span></div>
      <div class="project__frame"><img src="${p.hero}" alt="${p.title}" data-parallax="0.06"></div>
      <dl class="project__meta">
        <div><dt>Тип</dt><dd>${p.type}</dd></div>
        <div><dt>Локация</dt><dd>${p.location}</dd></div>
        <div><dt>Година</dt><dd>${p.year}</dd></div>
      </dl>
    </a>`;
}

function generateIndex() {
  const featured = projects.filter(p => p.featured);
  const cards = featured.map((p, i) => projectCard(p, i)).join('');

  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
${baseHead('Design-Code — Интериорен Дизайн', 'Design-Code — студио за луксозен интериорен дизайн. Създаваме пространства с внимание към детайла.')}
<link rel="stylesheet" href="project.css">
<style>
:root{
  --bg:#0a0a0a; --panel:#141414; --line:#242424;
  --text:#f5f5f5; --muted:#a0a0a0;
  --accent:#8dc63f; --accent-dim:#6fa832; --gold:#d8b454;
  --ease:cubic-bezier(0.83,0.01,0.29,1);
  --serif:'Cormorant Garamond',serif; --sans:'Montserrat',sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:auto}
body{
  background:var(--bg);color:var(--text);font-family:var(--sans);font-weight:300;
  overflow-x:hidden;cursor:none;
}
::selection{background:var(--accent);color:#0a0a0a}
::-webkit-scrollbar{width:7px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:#2c2c2c;border-radius:10px}
a{color:inherit;text-decoration:none;cursor:none}
button{cursor:none}
img{display:block;max-width:100%}

.cursor{
  position:fixed;top:0;left:0;width:12px;height:12px;border-radius:50%;background:var(--accent);
  mix-blend-mode:difference;pointer-events:none;z-index:1200;
  transition:width .35s var(--ease),height .35s var(--ease),opacity .3s;
}
.cursor.is-hover{width:56px;height:56px}
@media (hover:none){.cursor{display:none}body,a,button{cursor:auto}}

.loader{
  position:fixed;inset:0;z-index:1100;background:var(--bg);
  display:flex;flex-direction:column;justify-content:center;padding:0 6vw;
  transition:opacity .8s var(--ease);
}
.loader.done{opacity:0;pointer-events:none}
.loader__pct{position:absolute;top:4.5vh;right:5vw;font-size:.8rem;letter-spacing:.35em;color:var(--muted)}
.loader__line{overflow:hidden;height:13.5vw;display:flex;align-items:center}
.loader__line span{
  display:block;font-family:var(--serif);font-weight:300;font-size:12vw;line-height:1;letter-spacing:-.01em;
  transform:translate3d(0,115%,0);
}
.loader__line:nth-child(3) span{font-style:italic;color:var(--accent)}
.loader.go .loader__line span{transform:translate3d(0,0,0);transition:transform 1.6s var(--ease)}
.loader.go .loader__line:nth-child(3) span{transition-delay:.18s}

.nav{
  position:fixed;top:0;left:0;right:0;z-index:900;
  display:flex;justify-content:space-between;align-items:stretch;padding:0 4vw;
  transition:transform .6s var(--ease),background .4s;
}
.nav.hidden{transform:translateY(-110%)}
.nav.scrolled{background:rgba(10,10,10,.85);backdrop-filter:blur(14px)}
.nav__brand{display:flex;align-items:center;gap:.9rem;padding:1.4rem 0}
.nav__brand img{height:44px;width:auto;filter:drop-shadow(0 0 12px rgba(216,180,84,.25))}
.nav__name{font-size:.72rem;letter-spacing:.42em;text-transform:uppercase;font-weight:400}
.nav__name em{font-style:normal;color:var(--accent)}
.nav__links{display:flex;align-items:stretch}
.nav__item{position:relative;display:flex;align-items:center}
.nav__links a,.nav__drop-btn{
  display:flex;align-items:center;gap:.5rem;
  font-family:var(--sans);font-size:.66rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted);
  padding:1.6rem 1.5rem;background:none;border:0;border-left:1px solid var(--line);transition:color .3s;
}
.nav__item:last-child{border-right:1px solid var(--line)}
.nav__links a:hover,.nav__drop-btn:hover,.nav__item.open .nav__drop-btn{color:var(--text)}
.nav__drop-btn .plus{display:inline-block;transition:transform .45s var(--ease);color:var(--accent)}
.nav__item.open .plus{transform:rotate(45deg)}
.dropdown{
  position:absolute;top:100%;left:0;min-width:22rem;
  background:rgba(14,14,14,.97);backdrop-filter:blur(18px);
  border:1px solid var(--line);border-top:0;opacity:0;visibility:hidden;transform:translateY(-8px);
  transition:.45s var(--ease);
}
.nav__item.open .dropdown{opacity:1;visibility:visible;transform:none}
.dropdown a{
  display:flex;align-items:baseline;gap:1.1rem;padding:1.15rem 1.5rem;border:0;border-top:1px solid var(--line);
  font-size:.66rem;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);
  transition:color .3s,padding-left .4s var(--ease),background .3s;
}
.dropdown a i{font-style:normal;font-size:.6rem;color:var(--accent);letter-spacing:.15em}
.dropdown a:hover{color:var(--text);padding-left:2.1rem;background:rgba(141,198,63,.05)}

.burger{display:none;flex-direction:column;gap:7px;background:none;border:0;padding:6px;align-self:center}
.burger span{display:block;width:30px;height:1px;background:var(--text);transition:.4s var(--ease)}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(4px,4px)}
.burger.open span:nth-child(2){transform:rotate(-45deg) translate(4px,-4px)}
.menu-overlay{
  position:fixed;inset:0;z-index:850;background:rgba(10,10,10,.97);
  display:flex;flex-direction:column;justify-content:center;padding:0 8vw;gap:2.2rem;
  opacity:0;visibility:hidden;transition:.5s var(--ease);
}
.menu-overlay.open{opacity:1;visibility:visible}
.menu-overlay a{
  font-family:var(--serif);font-size:11vw;line-height:1;font-weight:300;color:var(--text);
  transition:color .3s,letter-spacing .5s var(--ease);
}
.menu-overlay a:hover{color:var(--accent);letter-spacing:.04em}

.hero{
  min-height:100svh;position:relative;display:flex;flex-direction:column;justify-content:flex-end;
  padding:16vh 4vw 7vh;overflow:hidden;
}
.hero__bg{position:absolute;inset:0;z-index:0}
.hero__bg img{
  width:100%;height:112%;object-fit:cover;filter:brightness(.34) saturate(.85);transform:scale(1.08);
  animation:heroZoom 14s var(--ease) forwards;
}
@keyframes heroZoom{to{transform:scale(1)}}
.hero__bg::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(10,10,10,.55) 0%,rgba(10,10,10,.15) 45%,rgba(10,10,10,.88) 100%);
}
.hero__inner{position:relative;z-index:1}
.hero__line{overflow:hidden;padding:.18em 0}
.hero__line span{
  display:block;font-family:var(--serif);font-weight:300;
  font-size:clamp(3.4rem,14.5vw,15rem);line-height:1.15;letter-spacing:0;
  transform:translate3d(0,115%,0);
}
.hero__line--two{text-align:right}
.hero__line--two span{font-style:italic;color:transparent;-webkit-text-stroke:1px var(--text);transition:color 1.2s ease .9s}
.hero.loaded .hero__line span{transform:translate3d(0,0,0);transition:transform 1.7s var(--ease)}
.hero.loaded .hero__line--two span{transition-delay:.15s;color:var(--accent)}
.hero__meta{
  display:flex;justify-content:space-between;align-items:flex-end;margin-top:8vh;gap:2rem;
  font-size:.66rem;letter-spacing:.34em;text-transform:uppercase;color:var(--muted);opacity:0;
  transition:opacity 1.2s ease 1.1s;
}
.hero.loaded .hero__meta{opacity:1}
.hero__cta{
  display:inline-flex;align-items:center;gap:1.2rem;font-size:.7rem;letter-spacing:.34em;text-transform:uppercase;color:var(--text);
  border-bottom:1px solid var(--line);padding-bottom:.9rem;transition:border-color .4s;
}
.hero__cta .arr{display:inline-block;transition:transform .5s var(--ease);color:var(--accent);font-size:1rem}
.hero__cta:hover{border-color:var(--accent)}
.hero__cta:hover .arr{transform:translateX(10px)}
.hero__scroll{display:flex;align-items:center;gap:.9rem}
.hero__scroll i{display:block;width:1px;height:56px;background:linear-gradient(var(--accent),transparent);animation:drip 2.2s var(--ease) infinite}
@keyframes drip{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

.marquee{
  border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden;white-space:nowrap;
  padding:1.15rem 0;position:relative;z-index:2;background:var(--bg);
}
.marquee__track{display:inline-flex;gap:3.4rem;animation:roll 26s linear infinite;will-change:transform}
.marquee__track span{font-size:.72rem;letter-spacing:.42em;text-transform:uppercase;color:var(--muted)}
.marquee__track b{color:var(--accent);font-weight:400}
@keyframes roll{to{transform:translateX(-50%)}}

.section{padding:16vh 4vw;position:relative}
.section__head{display:flex;align-items:baseline;gap:2.4rem;margin-bottom:8vh}
.section__index{font-size:.7rem;letter-spacing:.3em;color:var(--accent)}
.section__counter{font-size:.7rem;letter-spacing:.3em;color:var(--muted)}
.section__title{
  font-family:var(--serif);font-weight:300;font-size:clamp(2.6rem,6vw,5.6rem);line-height:1;letter-spacing:-.01em;overflow:hidden;
}
.section__title span{display:block;transform:translate3d(0,110%,0);transition:transform 1.4s var(--ease)}
.inview .section__title span{transform:translate3d(0,0,0)}
.section__rule{flex:1;height:1px;background:var(--line);transform:scaleX(0);transform-origin:left;transition:transform 1.6s var(--ease) .2s}
.inview .section__rule{transform:scaleX(1)}

.reveal{opacity:0;transform:translateY(60px);transition:opacity 1.1s ease,transform 1.3s var(--ease)}
.inview .reveal,.reveal.inview{opacity:1;transform:none}
.reveal[data-d="1"]{transition-delay:.12s}.reveal[data-d="2"]{transition-delay:.24s}
.reveal[data-d="3"]{transition-delay:.36s}.reveal[data-d="4"]{transition-delay:.48s}

.spaces{border-top:1px solid var(--line)}
.space{
  display:grid;grid-template-columns:6rem 1fr minmax(14rem,22rem) 3rem;align-items:center;gap:2rem;
  padding:3.2rem 0;border-bottom:1px solid var(--line);position:relative;
}
.space::before{content:"";position:absolute;inset:0;background:var(--panel);transform:scaleY(0);transform-origin:bottom;transition:transform .6s var(--ease)}
.space:hover::before{transform:scaleY(1)}
.space>*{position:relative}
.space__num{font-size:.72rem;letter-spacing:.3em;color:var(--accent)}
.space__name{
  font-family:var(--serif);font-weight:300;font-size:clamp(1.9rem,4.4vw,3.8rem);line-height:1.02;
  transition:transform .6s var(--ease),color .4s;
}
.space:hover .space__name{transform:translateX(1.6rem);color:var(--accent)}
.space__desc{font-size:.78rem;line-height:1.75;color:var(--muted)}
.space__arr{justify-self:end;font-size:1.3rem;color:var(--muted);transition:transform .5s var(--ease),color .3s}
.space:hover .space__arr{transform:translateX(8px) rotate(-45deg);color:var(--accent)}
.space-preview{
  position:fixed;top:0;left:0;z-index:600;pointer-events:none;width:min(24vw,330px);aspect-ratio:3/2;overflow:hidden;
  opacity:0;transition:opacity .45s var(--ease);box-shadow:0 30px 80px rgba(0,0,0,.6);
}
.space-preview.on{opacity:1}
.space-preview img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .4s}
.space-preview img.active{opacity:1}

.showreel{padding:0 0 16vh}
.showreel__head{padding:0 4vw;margin-bottom:6vh;display:flex;justify-content:space-between;align-items:baseline}
.showreel__label{font-size:.7rem;letter-spacing:.3em;color:var(--accent);text-transform:uppercase}
.showreel__hint{font-size:.66rem;letter-spacing:.3em;color:var(--muted);text-transform:uppercase}
.showreel__wrap{position:relative;width:100%;overflow:hidden;background:#000}
.showreel__wrap video{width:100%;height:auto;display:block;filter:brightness(.92)}
.showreel__btn{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(10,10,10,.35);
  transition:opacity .5s,visibility .5s;
}
.showreel__btn.hide{opacity:0;visibility:hidden}
.showreel__play{
  width:110px;height:110px;border-radius:50%;border:1px solid rgba(245,245,245,.5);
  display:flex;align-items:center;justify-content:center;transition:transform .5s var(--ease),border-color .4s,background .4s;
  backdrop-filter:blur(6px);
}
.showreel__play svg{margin-left:5px;stroke:var(--text);transition:stroke .3s}
.showreel__btn:hover .showreel__play{transform:scale(1.12);border-color:var(--accent);background:rgba(141,198,63,.12)}
.showreel__btn:hover .showreel__play svg{stroke:var(--accent)}

.about{display:grid;grid-template-columns:5fr 6fr;gap:6vw;align-items:start}
.about__sticky{position:sticky;top:14vh}
.about__sticky .frame{overflow:hidden}
.about__sticky img{transform:scale(1.15);will-change:transform}
.about__since{
  display:inline-block;font-size:.66rem;letter-spacing:.4em;text-transform:uppercase;color:var(--accent);
  border:1px solid var(--line);padding:.7rem 1.3rem;margin-bottom:4vh;
}
.about__text p{font-size:clamp(1rem,1.35vw,1.25rem);line-height:1.9;color:var(--muted);margin-bottom:2.4rem;max-width:34rem}
.about__text p strong{color:var(--text);font-weight:400}
.about__lead{
  font-family:var(--serif);font-weight:300;font-size:clamp(1.7rem,2.8vw,2.6rem)!important;line-height:1.35!important;
  color:var(--text)!important;margin-bottom:3.4rem!important;
}
.stats{display:flex;gap:4.5rem;margin-top:5vh;flex-wrap:wrap}
.stat b{display:block;font-family:var(--serif);font-weight:300;font-size:clamp(2.6rem,4.5vw,4.2rem);line-height:1;color:var(--accent)}
.stat span{font-size:.64rem;letter-spacing:.3em;text-transform:uppercase;color:var(--muted)}

.cta{
  border-top:1px solid var(--line);padding:20vh 4vw;text-align:center;position:relative;overflow:hidden;
}
.cta__big{
  font-family:var(--serif);font-weight:300;font-size:clamp(2.6rem,7.6vw,7.6rem);line-height:1.06;letter-spacing:-.01em;
}
.cta__big em{font-style:italic;color:var(--accent)}
.cta__btn{
  display:inline-flex;align-items:center;gap:1.4rem;margin-top:7vh;padding:1.5rem 3.2rem;border:1px solid var(--line);border-radius:10rem;
  font-size:.72rem;letter-spacing:.34em;text-transform:uppercase;color:var(--text);transition:border-color .4s,background .4s,color .4s;
  position:relative;overflow:hidden;
}
.cta__btn .arr{color:var(--accent);transition:transform .5s var(--ease)}
.cta__btn:hover{border-color:var(--accent);background:rgba(141,198,63,.08)}
.cta__btn:hover .arr{transform:translateX(8px)}

.footer{border-top:1px solid var(--line);position:relative;overflow:hidden}
.footer__emails{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--line)}
.footer__email{
  padding:3.4rem 4vw;border-left:1px solid var(--line);display:flex;flex-direction:column;gap:1rem;transition:background .4s;
}
.footer__email:first-child{border-left:0}
.footer__email:hover{background:var(--panel)}
.footer__email span{font-size:.6rem;letter-spacing:.32em;text-transform:uppercase;color:var(--muted)}
.footer__email a{
  font-family:var(--serif);font-size:clamp(1.1rem,1.9vw,1.7rem);font-weight:400;transition:color .3s;
}
.footer__email a:hover{color:var(--accent)}
.footer__mark{padding:10vh 4vw;text-align:center;border-bottom:1px solid var(--line)}
.footer__mark img{height:88px;width:auto;margin:0 auto 2.4rem;filter:drop-shadow(0 0 18px rgba(216,180,84,.3))}
.footer__word{
  font-family:var(--serif);font-weight:300;font-size:clamp(2.4rem,7vw,7rem);line-height:1;letter-spacing:-.01em;
}
.footer__word em{font-style:italic;color:var(--accent)}
.footer__cols{
  display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:3rem;padding:6vh 4vw;border-bottom:1px solid var(--line);
}
.footer__col h4{font-size:.6rem;letter-spacing:.32em;text-transform:uppercase;color:var(--muted);margin-bottom:1.6rem;font-weight:400}
.footer__col a,.footer__col p{
  display:block;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--text);margin-bottom:1rem;
  transition:color .3s,padding-left .35s var(--ease);
}
.footer__col a:hover{color:var(--accent);padding-left:.6rem}
.footer__col p{color:var(--muted)}
.footer__bottom{
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.4rem;padding:2.4rem 4vw;
  font-size:.62rem;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);
}
.footer__bottom .socials{display:flex;gap:2rem}
.footer__bottom a:hover{color:var(--accent)}

.view-all{
  text-align:center;margin-top:8vh;
}
.view-all a{
  display:inline-flex;align-items:center;gap:1.4rem;padding:1.2rem 2.8rem;border:1px solid var(--line);border-radius:10rem;
  font-size:.72rem;letter-spacing:.34em;text-transform:uppercase;color:var(--text);transition:border-color .4s,background .4s;
}
.view-all a:hover{border-color:var(--accent);background:rgba(141,198,63,.08)}

@media(max-width:960px){
  .nav__links{display:none}
  .burger{display:flex}
  .space{grid-template-columns:3.4rem 1fr 2rem}
  .space__desc{display:none}
  .space-preview{display:none}
  .about{grid-template-columns:1fr}
  .about__sticky{position:static}
  .footer__emails{grid-template-columns:1fr}
  .footer__email{border-left:0;border-top:1px solid var(--line)}
  .footer__email:first-child{border-top:0}
  .footer__cols{grid-template-columns:1fr 1fr}
  .hero__meta{flex-direction:column;align-items:flex-start;gap:2rem}
}
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>

<div class="space-preview" id="spacePreview">
  <img src="assets/project-living.jpg" alt="" data-space="1" class="active">
  <img src="assets/project-restaurant.jpg" alt="" data-space="2">
  <img src="assets/project-kitchen.jpg" alt="" data-space="3">
  <img src="assets/project-bathroom.jpg" alt="" data-space="4">
</div>

<div class="loader" id="loader">
  <div class="loader__pct" id="pct">00</div>
  <div class="loader__line"><span>Интериорен</span></div>
  <div class="loader__line"><span>Дизайн</span></div>
</div>

${nav()}

<main id="top">

  <section class="hero" id="hero">
    <div class="hero__bg"><img src="assets/project-restaurant.jpg" alt="" aria-hidden="true"></div>
    <div class="hero__inner">
      <div class="hero__line"><span>Интериорен</span></div>
      <div class="hero__line hero__line--two"><span>Дизайн</span></div>
      <div class="hero__meta">
        <span>Студио Design-Code — София</span>
        <a class="hero__cta" href="projects.html" data-hover>Вижте проектите<span class="arr">&#8594;</span></a>
        <span class="hero__scroll"><i></i>Скролирайте</span>
      </div>
    </div>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee__track" id="marquee">
      <span>Жилищни интериори <b>—</b></span><span>Търговски пространства <b>—</b></span><span>3D визуализации <b>—</b></span><span>Авторски надзор <b>—</b></span><span>Внимание към детайла <b>—</b></span>
    </div>
  </div>

  <section class="section" id="spaces">
    <div class="section__head">
      <span class="section__index">01</span>
      <h2 class="section__title"><span>Пространства, които проектираме</span></h2>
      <span class="section__rule"></span>
    </div>
    <div class="spaces">
      <div class="space reveal" data-space="1" data-hover>
        <span class="space__num">01</span>
        <h3 class="space__name">Жилищни</h3>
        <p class="space__desc">Домът отразява начина, по който животът се разгръща в него.</p>
        <span class="space__arr">&#8594;</span>
      </div>
      <div class="space reveal" data-d="1" data-space="2" data-hover>
        <span class="space__num">02</span>
        <h3 class="space__name">Хотелиерство</h3>
        <p class="space__desc">Идентичността определя стойността на всяко гостоприемно пространство.</p>
        <span class="space__arr">&#8594;</span>
      </div>
      <div class="space reveal" data-d="2" data-space="3" data-hover>
        <span class="space__num">03</span>
        <h3 class="space__name">Търговски</h3>
        <p class="space__desc">Средата ви е вашето конкурентно предимство.</p>
        <span class="space__arr">&#8594;</span>
      </div>
      <div class="space reveal" data-d="3" data-space="4" data-hover>
        <span class="space__num">04</span>
        <h3 class="space__name">Спа &amp; Уелнес</h3>
        <p class="space__desc">Спокойствието също се проектира — със светлина, текстура и тишина.</p>
        <span class="space__arr">&#8594;</span>
      </div>
    </div>
  </section>

  <section class="section" id="projects" style="padding-top:6vh">
    <div class="section__head">
      <span class="section__index">02</span>
      <h2 class="section__title"><span>Избрани проекти</span></h2>
      <span class="section__counter">001&nbsp;/&nbsp;${String(projects.length).padStart(3,'0')}</span>
      <span class="section__rule"></span>
    </div>
    <div class="projects">
      ${cards}
    </div>
    <div class="view-all reveal">
      <a href="projects.html" data-hover>Всички проекти<span class="arr">&#8594;</span></a>
    </div>
  </section>

  <section class="showreel">
    <div class="showreel__head">
      <span class="showreel__label">03 — Видео</span>
      <span class="showreel__hint">3D визуализация · Twinmotion</span>
    </div>
    <div class="showreel__wrap reveal" data-hover>
      <video id="reel" src="assets/showreel.mp4" poster="assets/poster.jpg" preload="metadata" playsinline loop></video>
      <div class="showreel__btn" id="reelBtn">
        <div class="showreel__play">
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none"><path d="M1 1.5 L25 15 L1 28.5 Z" stroke-width="1.4" fill="none"/></svg>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="about">
    <div class="section__head">
      <span class="section__index">04</span>
      <h2 class="section__title"><span>За нас</span></h2>
      <span class="section__rule"></span>
    </div>
    <div class="about">
      <div class="about__sticky reveal">
        <div class="frame"><img src="assets/project-living.jpg" alt="Интериор от Design-Code" data-parallax="0.08"></div>
      </div>
      <div class="about__text">
        <span class="about__since reveal">Design-Code · от 2018 г.</span>
        <p class="about__lead reveal">Вярваме, че добрият интериор не се забелязва веднага — <em style="color:var(--accent);font-style:italic">той се усеща</em>.</p>
        <p class="reveal" data-d="1"><strong>Design-Code</strong> е студио за интериорен дизайн, създадено от страст към пространството, светлината и материалите. Подхождаме към пространството отвъд естетиката — оформяме среди чрез логика, контекст и човешко преживяване.</p>
        <p class="reveal" data-d="2">Всеки проект започва с разговор — за навиците, мечтите и начина ви на живот. От там нататък превръщаме идеите в пространства, които изглеждат безвремеви и се живеят лесно.</p>
        <div class="stats">
          <div class="stat reveal"><b>8+</b><span>години опит</span></div>
          <div class="stat reveal" data-d="1"><b>60+</b><span>завършени проекта</span></div>
          <div class="stat reveal" data-d="2"><b>100%</b><span>внимание към детайла</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta" id="contact">
    <h2 class="cta__big reveal">Какво трябва да направи<br>възможно <em>вашето пространство?</em></h2>
    <a class="cta__btn reveal" data-d="1" href="contact.html" data-hover>Започнете разговор<span class="arr">&#8594;</span></a>
  </section>

</main>

${mainFooter()}

<script src="assets/lenis.min.js"></script>
<script>
let lenis=null;
if(window.Lenis){
  lenis=new Lenis({duration:1.25,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
  function raf(t){lenis.raf(t);requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1&&document.querySelector(id)){
      e.preventDefault();
      if(lenis)lenis.scrollTo(id,{offset:0,duration:1.6});
      else document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  });
});

const loader=document.getElementById('loader'),pct=document.getElementById('pct'),hero=document.getElementById('hero');
let loadPct=0;
const tick=setInterval(()=>{
  loadPct=Math.min(100,loadPct+Math.random()*14);
  pct.textContent=String(Math.floor(loadPct)).padStart(2,'0');
  if(loadPct>=100){
    clearInterval(tick);
    loader.classList.add('go');
    setTimeout(()=>{loader.classList.add('done');hero.classList.add('loaded');},1500);
    setTimeout(()=>loader.remove(),2400);
  }
},90);

const cursor=document.getElementById('cursor');
let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
(function loop(){
  cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;
  cursor.style.transform=\`translate(\${cx}px,\${cy}px) translate(-50%,-50%)\`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('[data-hover],a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('is-hover'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hover'));
});

const navEl=document.getElementById('nav');let lastY=0;
addEventListener('scroll',()=>{
  const y=scrollY;
  navEl.classList.toggle('scrolled',y>60);
  navEl.classList.toggle('hidden',y>lastY&&y>300);
  lastY=y;
},{passive:true});

const svc=document.getElementById('svcDrop');
const svcBtn=svc.querySelector('.nav__drop-btn');
if(matchMedia('(hover:hover)').matches){
  svc.addEventListener('mouseenter',()=>svc.classList.add('open'));
  svc.addEventListener('mouseleave',()=>svc.classList.remove('open'));
}
svcBtn.addEventListener('click',()=>svc.classList.toggle('open'));
document.addEventListener('click',e=>{if(!svc.contains(e.target))svc.classList.remove('open')});

const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{burger.classList.toggle('open');menu.classList.toggle('open')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');menu.classList.remove('open')}));

const mq=document.getElementById('marquee');mq.innerHTML+=mq.innerHTML;

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('inview');io.unobserve(e.target)}}),{threshold:.18});
document.querySelectorAll('.section,.reveal,.project,.space').forEach(el=>io.observe(el));

const preview=document.getElementById('spacePreview');
const pImgs=preview.querySelectorAll('img');
let pvx=0,pvy=0,ptx=0,pty=0;
addEventListener('mousemove',e=>{ptx=e.clientX;pty=e.clientY});
(function pvLoop(){
  pvx+=(ptx-pvx)*.09;pvy+=(pty-pvy)*.09;
  preview.style.transform=\`translate(\${pvx+30}px,\${pvy-preview.offsetHeight/2}px)\`+(preview.classList.contains('on')?' scale(1)':' scale(.85) rotate(-3deg)');
  requestAnimationFrame(pvLoop);
})();
document.querySelectorAll('.space').forEach(row=>{
  row.addEventListener('mouseenter',()=>{
    const id=row.dataset.space;
    pImgs.forEach(im=>im.classList.toggle('active',im.dataset.space===id));
    preview.classList.add('on');
  });
  row.addEventListener('mouseleave',()=>preview.classList.remove('on'));
});

const plx=[...document.querySelectorAll('[data-parallax]')];
(function parallax(){
  const vh=innerHeight;
  plx.forEach(img=>{
    const r=img.getBoundingClientRect();
    if(r.bottom<0||r.top>vh)return;
    const prog=(r.top+r.height/2-vh/2)/vh;
    const speed=parseFloat(img.dataset.parallax);
    img.style.translate=\`0 \${(-prog*speed*100).toFixed(2)}%\`;
  });
  requestAnimationFrame(parallax);
})();

const reel=document.getElementById('reel'),btn=document.getElementById('reelBtn');
btn.addEventListener('click',()=>{reel.play();btn.classList.add('hide')});
reel.addEventListener('click',()=>{if(!reel.paused){reel.pause();btn.classList.remove('hide')}});
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
  console.log('Generated index.html');
}

function generateProjectsList() {
  const cards = projects.map((p, i) => projectCard(p, i)).join('');
  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
${baseHead('Проекти — Design-Code', 'Разгледайте нашите избрани интериорни проекти. Всеки проект е уникално съчетание от функционалност и естетика.')}
<link rel="stylesheet" href="project.css">
<style>
.list-hero{padding:22vh 4vw 10vh;border-bottom:1px solid var(--line)}
.list-hero__index{font-size:.7rem;letter-spacing:.34em;color:var(--accent);margin-bottom:2.4vh}
.list-hero__title{font-family:var(--serif);font-weight:300;font-size:clamp(2.8rem,7.5vw,7.5rem);line-height:1;letter-spacing:-.01em}
.list-hero__title em{font-style:italic;color:var(--accent)}
.list-hero__sub{margin-top:3.5vh;max-width:34rem;color:var(--muted);font-size:.95rem;line-height:1.8}
.projects-list{padding:10vh 4vw 16vh}
</style>
</head>
<body>
<div class="cursor"></div>
${nav()}
<main>
  <section class="list-hero">
    <p class="list-hero__index">Портфолио</p>
    <h1 class="list-hero__title"><span>Всички проекти</span></h1>
    <p class="list-hero__sub">${projects.length} завършени интериорни проекта — от жилищни интериори до търговски и обществени пространства.</p>
  </section>
  <section class="section projects-list" id="projects">
    <div class="projects">
      ${cards}
    </div>
  </section>
</main>
${mainFooter()}
<script src="project.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'projects.html'), html, 'utf8');
  console.log('Generated projects.html');
}

function generateProjectPage(p, index) {
  const num = String(index + 1).padStart(3, '0');
  const next = projects[(index + 1) % projects.length];
  const hasGallery = p.gallery && p.gallery.length > 0;

  // Build gallery: first figure full-bleed, then pairs
  let galleryHtml = '';
  if (hasGallery) {
    galleryHtml += `<figure class="full reveal"><img src="${p.gallery[0]}" alt="${p.title}" data-parallax="0.07"></figure>`;
    for (let i = 1; i < p.gallery.length; i += 2) {
      if (p.gallery[i + 1]) {
        galleryHtml += `
      <figure class="split reveal">
        <div class="half"><img src="${p.gallery[i]}" alt="${p.title}" data-parallax="0.05"></div>
        <div class="half"><img src="${p.gallery[i + 1]}" alt="${p.title}" data-parallax="0.05"></div>
      </figure>`;
      } else {
        galleryHtml += `<figure class="full reveal"><img src="${p.gallery[i]}" alt="${p.title}" data-parallax="0.07"></figure>`;
      }
    }
  }

  const metaItems = [
    { dt: 'Тип', dd: p.type },
    { dt: 'Локация', dd: p.location },
    { dt: 'Година', dd: p.year },
  ];
  if (p.area) metaItems.push({ dt: 'Площ', dd: p.area });
  const metaHtml = metaItems.map(m => `<div><dt>${m.dt}</dt><dd>${m.dd}</dd></div>`).join('');

  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
${baseHead(`${p.title} — Интериорен дизайн — Design-Code`, `Проект ${p.title} — интериорен дизайн и мебели по поръчка от Design-Code.`)}\
<link rel="stylesheet" href="project.css">
</head>
<body>
<div class="cursor"></div>
${projectNav()}
<main>
  <section class="p-hero">
    <div class="p-hero__bg"><img src="${p.hero}" alt="${p.title}"></div>
    <div class="p-hero__inner">
      <p class="p-hero__index">Проект / ${num}</p>
      <h1 class="p-hero__title"><span>${p.title}</span></h1>
      <dl class="p-hero__meta">
        ${metaHtml}
      </dl>
    </div>
  </section>

  <section class="p-overview">
    <h2 class="p-overview__lead reveal">${p.lead}</h2>
    <div class="p-overview__text reveal" data-d="1">
      <p>${p.description}</p>
    </div>
  </section>

  <section class="p-gallery">
    ${galleryHtml}
  </section>

  <a class="p-next" href="project-${next.slug}.html" data-hover>
    <p class="p-next__label">Следващ проект</p>
    <h2 class="p-next__name">${next.title}<span class="arr">&#8594;</span></h2>
  </a>
</main>
${projectFooter()}
<script src="project.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, `project-${p.slug}.html`), html, 'utf8');
}

function generateAll() {
  generateIndex();
  generateProjectsList();
  projects.forEach((p, i) => generateProjectPage(p, i));
  console.log(`Generated ${projects.length} project pages`);
}

generateAll();
