const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const siteDir = process.cwd();
const projectsDir = path.join(siteDir, 'project');

// Get original project order from git history
const originalHomepage = execSync('git show main:index.html', { encoding: 'utf8', cwd: siteDir });

// Group images by timestamp prefix
function groupByTimestamp(dir) {
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    const groups = {};
    for (const f of files) {
        const match = f.match(/^(\d{7})/);
        if (match) {
            const prefix = match[1];
            if (!groups[prefix]) groups[prefix] = [];
            groups[prefix].push(f);
        }
    }
    return groups;
}

const groups480 = groupByTimestamp(path.join(siteDir, 'images', 'projects', '480x475'));

// Get project order from original homepage
const projectOrder = [];
const re = /href="project\/([^/"]+)\/index\.html"/g;
let m;
while ((m = re.exec(originalHomepage)) !== null) {
    if (!projectOrder.includes(m[1])) projectOrder.push(m[1]);
}

// Match groups to projects
const prefixes = Object.keys(groups480).sort();
const projectImages = {};
for (let i = 0; i < projectOrder.length && i < prefixes.length; i++) {
    const project = projectOrder[i];
    const prefix = prefixes[i];
    const images480 = groups480[prefix] || [];
    projectImages[project] = {
        thumb: images480[0] ? `../../images/projects/480x475/${images480[0]}` : null,
        gallery: images480.map(f => `../../images/projects/480x475/${f}`)
    };
}

function titleFromDir(dirName) {
    return dirName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const template = (title, data) => `<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="utf-8">
    <title>${title} - Design-Code</title>
    <meta name="title" content="Design-Code - ${title}">
    <meta name="description" content="Интериорен дизайн и мебели по проект ${title}.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../css/site/plugins.css" media="screen" rel="stylesheet" type="text/css">
    <link href="../../css/site/style.css" media="screen" rel="stylesheet" type="text/css">
    <link href="../../css/site/templete.css" media="screen" rel="stylesheet" type="text/css">
    <link href="../../css/project.css" media="screen" rel="stylesheet" type="text/css">
    <style>
        .luxury-header-bar {
            background: #1a1a1a;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        .luxury-header-bar .logo {
            max-height: 40px;
        }
        .luxury-header-bar .menu-btn {
            width: 40px;
            height: 40px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 6px;
        }
        .luxury-header-bar .menu-btn span {
            display: block;
            width: 25px;
            height: 2px;
            background: white;
            transition: all 0.3s ease;
        }
        .luxury-header-bar .menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .luxury-header-bar .menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        .luxury-header-bar .menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        body {
            padding-top: 70px;
        }
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 26, 26, 0.98);
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
        }
        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .mobile-menu-overlay nav {
            display: flex;
            flex-direction: column;
            gap: 30px;
            text-align: center;
        }
        .mobile-menu-overlay nav a {
            color: white;
            text-decoration: none;
            font-size: 1.5em;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 300;
            transition: color 0.3s ease;
        }
        .mobile-menu-overlay nav a:hover {
            color: #8dc63f;
        }
    </style>
</head>
<body class="site-project">

    <!-- Header Bar -->
    <header class="luxury-header-bar">
        <a href="../../index.html">
            <img src="../../images/site/logo-white.png" alt="Design-Code" class="logo">
        </a>
        <button class="menu-btn" aria-label="Menu" id="menuBtn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
        <nav>
            <a href="../../index.html">Начало</a>
            <a href="../../projects/index.html">Проекти</a>
            <a href="../../about-us/index.html">За нас</a>
            <a href="../../contact-us/index.html">Контакти</a>
        </nav>
    </div>

    ${data.gallery.length > 0 ? `
    <!-- Full Width Slider -->
    <div class="project-slider">
        ${data.gallery.map((img, i) => `
        <div class="slide${i === 0 ? ' active' : ''}">
            <img src="${img}" alt="${title}">
            ${i === 0 ? `
            <div class="slide-overlay">
                <h2>${title}</h2>
                <p>Интериорен дизайн и мебели по проект ${title}</p>
            </div>` : ''}
        </div>`).join('')}
        <div class="slider-nav">
            <button class="prev" aria-label="Предишна снимка">←</button>
            <button class="next" aria-label="Следваща снимка">→</button>
        </div>
        <div class="slider-dots">
            ${data.gallery.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" data-slide="${i}"></div>`).join('')}
        </div>
    </div>` : ''}

    <div class="page-wraper">
        <div class="page-content">
            <div class="section-full content-inner">
                <div class="container">
                    ${data.gallery.length > 1 ? `
                    <div class="project-gallery">
                        ${data.gallery.slice(1).map(img => `
                        <div class="project-gallery-item">
                            <img src="${img}" alt="${title}">
                        </div>`).join('')}
                    </div>` : ''}
                    <div class="row">
                        <div class="col-lg-12">
                            <a href="../../projects/index.html" class="project-back-link">
                                <span>←</span> Обратно към проектите
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    </script>
    <script src="../../js/site/jquery.min.js"></script>
    <script src="../../plugins/bootstrap/js/popper.min.js"></script>
    <script src="../../plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="../../js/project.js"></script>
</body>
</html>`;

const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

for (const project of projects) {
    const projectDir = path.join(projectsDir, project);
    const indexPath = path.join(projectDir, 'index.html');
    const title = titleFromDir(project);
    const data = projectImages[project] || { thumb: null, gallery: [] };
    fs.writeFileSync(indexPath, template(title, data));
    console.log(`Created ${indexPath} with ${data.gallery.length} images`);
}

console.log(`Done. Created ${projects.length} project pages.`);
