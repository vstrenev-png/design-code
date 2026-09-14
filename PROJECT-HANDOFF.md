# Design-Code.bg — Ръководство за достъп и контрол

Файлът е предназначен за бъдещи сесии на Kimi Code (или друг AI агент), които трябва да продължат работа по сайта. Съдържа къде е хостнат проектът, как се управлява, и какво остава да се довърши.

---

## 1. Какво представлява проектът

- **Име:** design-code
- **Оригинален сайт (архив):** https://web.archive.org/web/20240515143605/http://design-code.bg/
- **Текущ цел:** възстановяване и подобряване на сайта design-code.bg

---

## 2. Къде се намира кода

- **GitHub репозитория:** https://github.com/vstrenev-png/design-code
- **Локална папка:** `/Users/admin/Kimi Workplace/design-code`
- **Текущ branch:** `new-design`
- **Push-ва се към:** `main` на GitHub
- **Remote:**
  ```text
  origin  git@github.com:vstrenev-png/design-code.git (fetch)
  origin  git@github.com:vstrenev-png/design-code.git (push)
  ```

### Git достъп
За push към GitHub е необходим SSH ключ или GitHub Personal Access Token (PAT) с права `repo`. Ако git push не работи, провери:

```bash
cd "/Users/admin/Kimi Workplace/design-code"
git status
git remote -v
ssh -T git@github.com
```

Ако се използва HTTPS:
```bash
git remote set-url origin https://<TOKEN>@github.com/vstrenev-png/design-code.git
```

---

## 3. Къде е хостнат сайтът

- **Основен домейн:** https://www.design-code.bg
- **Алтернативен:** https://design-code.bg (пренасочва към www)
- **Хостинг платформа:** Vercel
- **Vercel екип/проект:** `vstrenev-pngs-projects/design-code`
- **Vercel preview URL (променлив):** `design-code-git-main-vstrenev-pngs-projects.vercel.app`

### Vercel настройки
- **Build command:** не се използва (static сайт)
- **Output directory:** корен на проекта
- **Framework preset:** Other / None
- **vercel.json:**
  ```json
  {
    "version": 2,
    "cleanUrls": true,
    "trailingSlash": false
  }
  ```

### Deploy процес
1. Направи промените локално.
2. Commit:
   ```bash
   git add .
   git commit -m "описание на промяната"
   ```
3. Push към main:
   ```bash
   git push origin new-design:main
   ```
4. Vercel автоматично деплойва от `main`.
5. Провери деплоя на Vercel dashboard или директно на https://www.design-code.bg

---

## 4. Структура на проекта

```
design-code/
├── index.html              # Начална страница
├── about-us/               # За нас
├── contact-us/             # Контакти
├── 404/                    # 404 страница
├── project/                # Страници на отделни проекти
│   ├── index.html          # Списък с проекти
│   ├── *.html              # Отделни проекти
├── css/
│   ├── style.css           # Основни стилове
│   ├── project.css         # Стилове за проектните страници (имаше проблем със слайдера)
│   └── ...
├── js/
│   └── ...
├── images/                 # Снимки на проекти
├── plugins/                # Външни библиотеки
└── vercel.json
```

---

## 5. Текущи задачи и известни проблеми

### Проблем: Снимките в проектните страници не излизат на цял екран
- **Засегнати страници:** `/project/*.html` (напр. `/project/botevgrad`)
- **Симптом:** Слайдерът заема само дясната половина на екрана; отляво има бяло празно поле.
- **Последна работа:** пренаписване на `css/project.css` с опростени стилове.
- **Статус:** промяната е направена локално, но **още не е commit-ната и deploy-ната**.

### Следващи стъпки за довършване
1. Commit и push на текущите промени в `css/project.css`.
2. Изчакай Vercel деплой.
3. Провери на https://www.design-code.bg/project/botevgrad дали слайдерът е на цял екран.
4. Ако все още има проблем, инспектирай с браузър DevTools и коригирай CSS.

### Допълнителни желания от собственика
- Общо подобряване на визията.
- В секцията с проекти да има повече от една снимка на проект — проверяване коя снимка към кой проект е била и добавяне.
- Връщане/подобряване на сив банер при снимките от проектите.
- Плавен и елегантен дизайн на представянето на снимките.

---

## 6. Netlify статус

- Съществува и Netlify конфигурация/сайт, но **Netlify акаунтът е изчерпал кредитите си** и не може да прави production deploys.
- **Текущият активен хостинг е Vercel**, не Netlify.
- Ако получиш имейл от Netlify за изчерпани кредити, игнорирай — сайтът не зависи от Netlify в момента.

---

## 7. Домейн

- Домейнът `design-code.bg` е закупен отново (от jump.bg).
- DNS насочва към Vercel.
- Ако домейнът спре да работи, провери:
  1. DNS записи при регистратора (jump.bg) — трябва да сочат към Vercel nameservers или CNAME/A записи.
  2. Vercel dashboard → Domains — дали `design-code.bg` и `www.design-code.bg` са verified.

---

## 8. Проверки преди всяка промяна

```bash
cd "/Users/admin/Kimi Workplace/design-code"
git status
git branch -a
git log --oneline -5
```

### Преди deploy
```bash
git diff --stat
git add .
git commit -m "ясно описание"
git push origin new-design:main
```

---

## 9. Важни бележки за бъдещи агенти

- Винаги работи в `/Users/admin/Kimi Workplace/design-code`.
- Винаги push-вай промените към `main`, за да се deploy-нат автоматично на Vercel.
- След push проверявай https://www.design-code.bg.
- Не използвай Netlify за production deploys — кредитите са изчерпани.
- Ако се налага достъп до GitHub/Vercel, помоли потребителя за актуален token/покана — не пиши съществуващи credentials в този файл.

---

## 10. Бързи линкове

- [Live сайт](https://www.design-code.bg)
- [GitHub repo](https://github.com/vstrenev-png/design-code)
- [Vercel dashboard](https://vercel.com/vstrenev-pngs-projects/design-code)
- [Web Archive оригинал](https://web.archive.org/web/20240515143605/http://design-code.bg/)

---

*Последна актуализация: септември 2026*
