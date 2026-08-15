const fs = require('fs');
const path = require('path');

const siteDir = process.cwd();
const projectsDir = path.join(siteDir, 'project');

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

// Get project list from directory
const projectOrder = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

console.log('Projects:', projectOrder.length);
console.log('Groups:', Object.keys(groups480).length);

// Match groups to projects
const prefixes = Object.keys(groups480).sort();
console.log('\nMatching:');
for (let i = 0; i < projectOrder.length; i++) {
    const project = projectOrder[i];
    const prefix = prefixes[i];
    const images = groups480[prefix] || [];
    console.log(`  ${i}: ${project} -> ${prefix || 'none'} (${images.length} images)`);
}
