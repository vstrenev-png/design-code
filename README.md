# Design-Code — сайт с нов дизайн

Тази папка съдържа статичен сайт за Design-Code с нов editorial дизайн.

## Структура

- `index.html` — начална страница
- `projects.html` — пълен листинг на всички проекти
- `project-<slug>.html` — детайлна страница за всеки проект
- `contact.html` — контактна форма
- `questions-and-answers.html` — страница с често задавани въпроси
- `project.css` — споделени стилове за проектните страници, contact.html и Q&A
- `project.js` — споделен JavaScript
- `assets/` — изображения, видео, лого, шрифтове
- `assets/projects/<slug>/` — снимки за всеки проект
- `projects.json` — данни за проектите
- `qa.json` — данни за въпросите и отговорите
- `build.js` — генератор на index.html, projects.html и project-*.html
- `generate-qa.js` — генератор на questions-and-answers.html
- `server.js` — локален Node сървър за preview

## Локален preview

```bash
node server.js
```

След това отворете http://localhost:8765 в браузър.

## Как да редактирате проектите

Всички проекти се управляват от `projects.json`. За да промените заглавие, описание, снимки или метаданни:

1. Отворете `projects.json`.
2. Намерете проекта по `slug`.
3. Редактирайте полетата:
   - `title` — име на проекта
   - `type` — тип (Жилище, Хотелиерство, Търговски, Спа & Уелнес)
   - `location` — локация
   - `year` — година
   - `area` — площ (напр. "186 м²")
   - `lead` — водещ текст в детайлната страница
   - `description` — основно описание
   - `hero` — път до главната снимка
   - `gallery` — масив с пътища до галерийните снимки
   - `featured` — `true` за проекти, показани на началната страница

4. Поставете новите снимки в `assets/projects/<slug>/`.
5. Регенерирайте страниците:

```bash
node build.js
```

## Как да добавите нов проект

1. Добавете нов обект в `projects.json`:

```json
{
  "slug": "nov-proekt",
  "title": "Нов проект",
  "type": "Жилище",
  "location": "София",
  "year": "2025",
  "area": "120 м²",
  "hero": "assets/projects/nov-proekt/hero.jpg",
  "gallery": ["assets/projects/nov-proekt/01.jpg", "assets/projects/nov-proekt/02.jpg"],
  "lead": "Кратък водещ текст.",
  "description": "По-подробно описание на проекта.",
  "featured": false
}
```

2. Създайте папка `assets/projects/nov-proekt/` и копирайте снимките.
3. Пуснете `node build.js`.

## Как да редактирате въпросите и отговорите

Редактирайте `qa.json` и пуснете:

```bash
node generate-qa.js
```

## Публикуване

Сайтът е статичен — качете цялото съдържание на тази папка в GitHub Pages, Vercel или друг статичен хостинг.
