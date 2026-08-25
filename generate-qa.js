const fs = require('fs');
const path = require('path');

const qa = JSON.parse(fs.readFileSync(path.join(__dirname, 'qa.json'), 'utf8'));

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

const footer = () => `
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

const itemsHtml = qa.map((item, i) => `
  <div class="qa-item reveal" data-d="${i % 4}">
    <button class="qa-q" aria-expanded="false" data-hover>
      <span class="qa-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="qa-title">${item.question}</span>
      <span class="qa-icon">+</span>
    </button>
    <div class="qa-a"><div class="qa-a__inner">${item.answer.replace(/\n/g, '<br>')}</div></div>
  </div>
`).join('');

const html = `<!DOCTYPE html>
<html lang="bg">
<head>
${baseHead('Препоръки и въпроси — Design-Code', 'Полезна информация за интериорния дизайн, процеса и услугите на Design-Code.')}
<link rel="stylesheet" href="project.css">
<style>
.qa-hero{padding:22vh 4vw 10vh;border-bottom:1px solid var(--line)}
.qa-hero__index{font-size:.7rem;letter-spacing:.34em;color:var(--accent);margin-bottom:2.4vh}
.qa-hero__title{font-family:var(--serif);font-weight:300;font-size:clamp(2.8rem,7.5vw,7.5rem);line-height:1;letter-spacing:-.01em}
.qa-hero__title em{font-style:italic;color:var(--accent)}
.qa-hero__sub{margin-top:3.5vh;max-width:34rem;color:var(--muted);font-size:.95rem;line-height:1.8}

.qa-list{padding:10vh 4vw 16vh;max-width:1100px;margin:0 auto}
.qa-item{border-bottom:1px solid var(--line)}
.qa-q{
  width:100%;display:flex;align-items:center;gap:2rem;padding:2.2rem 0;background:none;border:0;
  color:var(--text);text-align:left;font-family:var(--sans);font-size:1rem;
}
.qa-num{font-size:.66rem;letter-spacing:.3em;color:var(--accent);min-width:2.5rem}
.qa-title{
  flex:1;font-family:var(--serif);font-weight:300;font-size:clamp(1.3rem,2.4vw,2rem);line-height:1.25;
  transition:color .3s;
}
.qa-q:hover .qa-title{color:var(--accent)}
.qa-icon{font-size:1.4rem;color:var(--accent);transition:transform .4s var(--ease)}
.qa-item.open .qa-icon{transform:rotate(45deg)}
.qa-a{
  max-height:0;overflow:hidden;transition:max-height .5s var(--ease);
}
.qa-item.open .qa-a{max-height:500px}
.qa-a__inner{
  padding:0 0 2.6rem 4.5rem;color:var(--muted);font-size:.95rem;line-height:1.9;
}
@media(max-width:960px){
  .qa-q{gap:1.2rem}
  .qa-a__inner{padding-left:0}
}
</style>
</head>
<body>
<div class="cursor"></div>
${nav()}
<main>
  <section class="qa-hero">
    <p class="qa-hero__index">Препоръки</p>
    <h1 class="qa-hero__title"><span>Често задавани <em>въпроси</em></span></h1>
    <p class="qa-hero__sub">Тук ще откриете полезна информация за процеса, сроковете и начина, по който работим.</p>
  </section>
  <section class="qa-list">
    ${itemsHtml}
  </section>
</main>
${footer()}
<script src="project.js"></script>
<script>
document.querySelectorAll('.qa-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.qa-item');
    const open=item.classList.contains('open');
    document.querySelectorAll('.qa-item').forEach(i=>i.classList.remove('open'));
    if(!open)item.classList.add('open');
    btn.setAttribute('aria-expanded',String(!open));
  });
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'questions-and-answers.html'), html, 'utf8');
console.log('Generated questions-and-answers.html');
