# Design-Code

Интериорен дизайн и мебели по поръчка.

## Сайт

Това е статичен сайт, възстановен от архив на design-code.bg, адаптиран към текущите нужди на бизнеса.

## Хостинг

Сайтът се хоства на **Vercel**:
https://design-code-blush.vercel.app

GitHub Pages е включен, но в момента има проблеми с build процеса:
https://vstrenev-png.github.io/design-code/

## Структура

- `index.html` — начална страница
- `about-us/` — за нас
- `contact-us/` — контакти
- `projects/` — портфолио
- `project/*/` — отделни проекти
- `css/`, `js/`, `plugins/`, `images/` — ресурси

## Разработка

Сайтът е статичен HTML/CSS/JS. Няма build система. Промените се правят директно във файловете и се публикуват чрез push към `main` branch.

За автоматичен деплой към Vercel свържи repo-то от:
https://vercel.com/vstrenev-pngs-projects/design-code/settings/git
