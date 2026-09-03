# Design-Code Website — Session Summary

## What was done

The new editorial design from `Downloads/app/` was applied to the real Design-Code projects and deployed to the test GitHub Pages domain.

**Live link:** https://vstrenev-png.github.io/design-code-website/

## File locations

- **Current working project:** `/Users/admin/Kimi Workplace/design-code-website/`
- **Original new-design source:** `/Users/admin/Downloads/Kimi_Agent_Design-Code сайт без кариери (1)/app/`
- **Original site with all projects:** `/Users/admin/Kimi Workplace/design-code/`

## Project structure

| File | Description |
|------|-------------|
| `index.html` | Home page with hero, services, 6 featured projects, video, about, CTA |
| `projects.html` | Full listing of all 30 projects |
| `project-<slug>.html` | Detail page for each project |
| `contact.html` | Contact form |
| `questions-and-answers.html` | Redesigned Q&A page |
| `project.css` / `project.js` | Shared styles and scripts |
| `assets/projects/<slug>/` | Project images (212 images total) |
| `projects.json` | Central data source for projects |
| `qa.json` | Q&A data source |
| `build.js` | Generates `index.html`, `projects.html`, and all `project-*.html` |
| `generate-qa.js` | Generates `questions-and-answers.html` |
| `server.js` | Local preview server |

## How to edit

1. Make changes in `projects.json` (for projects) or `qa.json` (for Q&A).
2. Add new images to `assets/projects/<slug>/`.
3. Regenerate pages:
   ```bash
   node build.js        # for projects
   node generate-qa.js  # for Q&A
   ```
4. Local preview:
   ```bash
   node server.js
   # open http://localhost:8765
   ```
5. Commit and push to `main` to update GitHub Pages.

## Remaining work

- **Project texts:** titles, types, locations, years, areas, `lead`, and `description` are placeholders. Edit them in `projects.json`.
- **Gallery images:** 12 projects have only a hero image and no gallery. Add more images if available.
- **Contact form:** `STRIPE_PAYMENT_LINK` and `FORM_ENDPOINT` in `contact.html` are empty and need to be filled in.
- **Featured projects:** `index.html` shows 6 featured projects; the rest are in `projects.html`.

## How to continue in a new session

Open the project folder:

```bash
cd "/Users/admin/Kimi Workplace/design-code-website"
```

Make sure you are on the latest version:

```bash
git pull origin main
```

Then edit `projects.json` and run `node build.js` to regenerate the site.
