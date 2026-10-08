# Инструкции за качване на новата версия на сайта към домейна

## Текущо състояние

- **Тестов линк (GitHub Pages):** https://vstrenev-png.github.io/design-code-website/
- **Репозиторий на новата версия:** https://github.com/vstrenev-png/design-code-website
- **Стара версия (Vercel):** репо `vstrenev-png/design-code`, Vercel project `design-code` (`prj_KQSmrFiRSuvG9bdTuUP65T4sH4KU`)
- **Домейни:** `design-code.com` и/или `design-code.bg` (понастоящем сочат към Vercel проекта `design-code`)
- **Сайтът е статичен:** HTML/CSS/JS, няма нужда от build команда. Главният файл е `index.html`.

## Препоръчителен подход: Смяна на Git repository в съществуващия Vercel проект

Това е най-бързият и чист начин — запазва се Vercel проектът, домейните и настройките, просто се сменя източникът на код.

### Стъпки в Vercel

1. Влез в [Vercel Dashboard](https://vercel.com/dashboard).
2. Отвори проекта **`design-code`**.
3. Отиди на **Settings → Git**.
4. В секцията **Connected Git Repository** натисни **Disconnect** за текущото репо (`vstrenev-png/design-code`).
5. Натисни **Connect Git Repository** и избери:
   - Git provider: **GitHub**
   - Репозиторий: **`vstrenev-png/design-code-website`**
   - Branch: **`main`**
6. Запази настройките. Vercel автоматично ще стартира нов deploy.

### Проверка на настройките за deploy

В **Settings → Build & Development Settings** трябва да са:

- **Framework Preset:** `Other`
- **Build Command:** (празно)
- **Output Directory:** (празно, Vercel ще използва root директорията)
- **Install Command:** (празно)

Ако Vercel открие автоматично нещо друго (например от `package.json`), задай ръчно горните стойности.

### Проверка на домейните

1. Отиди на **Settings → Domains** в проекта.
2. Провери дали `design-code.com` и `design-code.bg` са все още свързани.
3. Ако са — нищо повече не трябва. Ако липсват — добави ги отново.
4. Изчакай DNS проверката и deploy-а (обикновено под 2 минути).

## Алтернативен подход: Merge на новата версия в старото репо

Ако предпочиташ да запазиш едно-единствено репо (`vstrenev-png/design-code`), изпълни следното локално или през GitHub:

```bash
# 1. Клонирай старото репо
git clone git@github.com:vstrenev-png/design-code.git
cd design-code

# 2. Добави новото репо като remote
git remote add new-design https://github.com/vstrenev-png/design-code-website.git
git fetch new-design

# 3. Презапиши main branch с новата версия (ВНИМАНИЕ: губи се старата история на main)
git checkout -B main new-design/main

# 4. Push
 git push origin main --force
```

⚠️ **Важно:** Този подход презаписва `main` в `design-code`. Ако искаш да запазиш старата версия, направи преди това резервен branch:

```bash
git checkout -b old-site-backup
git push origin old-site-backup
```

След force-push Vercel автоматично ще deploy-не новата версия, защото проектът вече е свързан с `design-code` репото.

## Проверки след deploy

1. Отвори `https://design-code.com` и `https://design-code.bg` в браузър.
2. Провери дали:
   - Зарежда се началната страница с новия DESIGN-CODE зелен хедър.
   - Работи езиковият превключвател EN/BG.
   - Страниците на проектите се отварят без 404.
   - Снимките се зареждат от `assets/`.
3. Ако видиш старата версия — изчисти кеша на браузъра или изчакай 1-2 минути за CDN инвалидация.

## Незавършени задачи (преди или след deploy)

Следните неща все още не са направени и трябва да се довършат в отделна стъпка:

1. **Сравнение 3D ↔ реализация с плъзгач** — изчаква се потребителят да посочи конкретните двойки снимки за всеки проект.
2. **Индивидуални описания под проектите** (iqosa стил) — сега има един и същи текст за всички проекти.
3. **Подбор на заглавни снимки и премахване на конкретни снимки** — например черната гланцова кухня от `Ivan Vazov` да се махне, а сивата с дървения бар плот да е заглавна.
4. **Добавяне на липсващия проект Golden Fish** — ако бъдат предоставени файлове.

## Контакти и ключови файлове

- **Работна директория на новата версия:** `/Users/admin/Kimi Workplace/design-code-website/`
- **Работна директория на старата версия:** `/Users/admin/Kimi Workplace/design-code/`
- **Vercel project ID:** `prj_KQSmrFiRSuvG9bdTuUP65T4sH4KU`
- **Последен commit на новата версия:** `16570fb Update session summary with language switcher and remaining tasks`
