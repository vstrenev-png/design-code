const fs = require('fs');
const path = require('path');

const siteDir = process.cwd();
const projectsDir = path.join(siteDir, 'project');

// Read homepage for header/footer extraction and project mapping
const homepage = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');

function extract(pattern) {
    const m = homepage.match(pattern);
    return m ? m[0] : '';
}

const header = extract(/<header class="site-header[\s\S]*?<\/header>/);
const footer = extract(/<footer[\s\S]*?<\/footer>/);

function fixPaths(html) {
    return html
        .replace(/href="index\.html"/g, 'href="../../index.html"')
        .replace(/href="projects\/index\.html"/g, 'href="../../projects/index.html"')
        .replace(/href="about-us\/index\.html"/g, 'href="../../about-us/index.html"')
        .replace(/href="questions-and-answers\/index\.html"/g, 'href="../../questions-and-answers/index.html"')
        .replace(/href="contact-us\/index\.html"/g, 'href="../../contact-us/index.html"')
        .replace(/src="images\/site\//g, 'src="../../images/site/')
        .replace(/https:\/\/web\.archive\.org\/web\/[0-9]+[a-z_]*_?\/https?:\/\/([^\s"'()]+)/g, 'https://$1');
}

const fixedHeader = fixPaths(header);
const fixedFooter = fixPaths(footer);

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
const groupsLarge = groupByTimestamp(path.join(siteDir, 'images', 'projects', 'large'));
const groupsMain = groupByTimestamp(path.join(siteDir, 'images', 'projects', 'main', '480x475'));

// Get project order from homepage
const projectOrder = [];
const re = /href="project\/([^/"]+)\/index\.html"/g;
let m;
while ((m = re.exec(homepage)) !== null) {
    if (!projectOrder.includes(m[1])) projectOrder.push(m[1]);
}

// Match groups to projects
const prefixes = Object.keys(groups480).sort();
const projectImages = {};
for (let i = 0; i < projectOrder.length && i < prefixes.length; i++) {
    const project = projectOrder[i];
    const prefix = prefixes[i];
    const images480 = groups480[prefix] || [];
    const imagesLarge = groupsLarge[prefix] || [];
    projectImages[project] = {
        thumb: images480[0] ? `../../images/projects/480x475/${images480[0]}` : null,
        gallery: images480.map(f => `../../images/projects/480x475/${f}`),
        large: imagesLarge.map(f => `../../images/projects/large/${f}`)
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
</head>
<body class="site-project">
    <div class="page-wraper">
        ${fixedHeader}
        <div class="page-content">
            <div class="section-full content-inner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h2 class="text-uppercase">${title}</h2>
                            <p class="m-b30">Интериорен дизайн и мебели по проект ${title}.</p>
                        </div>
                    </div>
                    ${data.thumb ? `<div class="row m-b30"><div class="col-lg-12"><img src="${data.thumb}" class="img-fluid" alt="${title}"></div></div>` : ''}
                    ${data.gallery.length > 1 ? `
                    <div class="row">
                        ${data.gallery.slice(1, 7).map(img => `<div class="col-lg-4 col-md-6 m-b30"><img src="${img}" class="img-fluid" alt="${title}"></div>`).join('\n                        ')}
                    </div>` : ''}
                    <div class="row m-t30">
                        <div class="col-lg-12">
                            <a href="../../projects/index.html" class="btn btn-primary">← Обратно към проектите</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${fixedFooter}
    </div>
    <script src="../../js/site/jquery.min.js"></script>
    <script src="../../plugins/bootstrap/js/popper.min.js"></script>
    <script src="../../plugins/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>`;

const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

for (const project of projects) {
    const projectDir = path.join(projectsDir, project);
    const indexPath = path.join(projectDir, 'index.html');
    const title = titleFromDir(project);
    const data = projectImages[project] || { thumb: null, gallery: [], large: [] };
    fs.writeFileSync(indexPath, template(title, data));
    console.log(`Created ${indexPath} with ${data.gallery.length} images`);
}

console.log(`Done. Created ${projects.length} project pages.`);
console.log('\nProject-image mapping (verify with user):');
for (const [project, data] of Object.entries(projectImages)) {
    console.log(`  ${project}: ${data.gallery.length} images`);
}
