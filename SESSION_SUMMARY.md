# Design-Code Website — Session Summary

## What was done

All old projects were **completely replaced** with the new assets from the Google Drive folder `Design Code - g.designcode`. The site was regenerated and redeployed to the test GitHub Pages domain.

**Live link:** https://vstrenev-png.github.io/design-code-website/

## Current project state

- **Total projects:** 35
- **Featured on home page:** 6 (selected automatically by largest image count)
  - In Line (43 images)
  - Green Cottage (32 images)
  - Ivan Vazov Apartment (160 images)
  - John Galliano Office Sofia (29 images)
  - White Apartment Modern (68 images)
  - House Dragalevtsi (26 images)

## New/relevant files

| File | Description |
|------|-------------|
| `projects.json` | Central data source with all 35 projects |
| `build.js` | Generates `index.html`, `projects.html`, and all `project-*.html` |
| `replace-projects.js` | Replaces all projects from a Google Drive download folder |
| `assets/projects/<slug>/` | Project images (sanitized lowercase filenames) |
| `drive-mapping-proposal.json` | Old mapping proposal (no longer needed for full replacement) |

## Project slugs created

```
adriana-turkmen-ap, antre-botevgrad, ap-sofia, arizona-dream,
beach-bungaloo, black-wood-elegance, botevgrad-ap-3d, cannes,
delta-hill-house, dental-clinic-green-apple, dental-clinic-tropical-paradise,
diamant-2, green-cottage, grey-white, industrial-kitchen, in-line,
ivan-vazov-ap, john-galliano-office-sofia, kasa-dragalevtsi, mara-realized-3d,
mediteranean, mezonet, nashiya-ofis, natalie, office-2, office-3d,
office-kazbek, parsa-sohi, pernik-ap, roberto-first-ap, rosana, simeon,
valyo-denchev-ap, vasil-iliev-mezonet, white-ap-modern
```

## How to edit projects

1. Open `/Users/admin/Kimi Workplace/design-code-website/`.
2. Edit `projects.json` — update `title`, `type`, `location`, `year`, `area`, `lead`, `description`, `featured`.
3. Add/remove images in `assets/projects/<slug>/`.
4. Regenerate pages:
   ```bash
   node build.js
   ```
5. Preview locally:
   ```bash
   node server.js
   # open http://localhost:8765
   ```
6. Deploy:
   ```bash
   git add -A && git commit -m "..." && git push origin main
   ```

## How to replace projects again from Google Drive

If you download an updated `Design Code - g.designcode` folder to `Downloads`, run:

```bash
cd "/Users/admin/Kimi Workplace/design-code-website"
node replace-projects.js
node build.js
```

This will delete all current project images and pages and recreate them from the Drive folder. Edit `replace-projects.js` if you want to change merge groups or project titles.

## Remaining work

- **Project texts:** all `title`, `type`, `location`, `year`, `area`, `lead`, and `description` fields are placeholders or auto-generated from folder names. Edit them in `projects.json`.
- **Featured projects:** currently selected by image count. Change `featured: true/false` in `projects.json` to control the home page.
- **Contact form:** `STRIPE_PAYMENT_LINK` and `FORM_ENDPOINT` in `contact.html` are still empty.

## How to continue in a new session

```bash
cd "/Users/admin/Kimi Workplace/design-code-website"
git pull origin main
```

Then edit `projects.json` and run `node build.js`.
