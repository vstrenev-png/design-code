const fs = require('fs');
const path = require('path');

const siteDir = process.cwd();
const imagesDir = path.join(siteDir, 'images', 'projects', '480x475');
const largeDir = path.join(siteDir, 'images', 'projects', 'large');

// Get all images
const images = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
const largeImages = fs.readdirSync(largeDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

// Group by timestamp prefix (first 7 digits)
function groupByTimestamp(files) {
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

const groups480 = groupByTimestamp(images);
const groupsLarge = groupByTimestamp(largeImages);

console.log('Groups in 480x475:', Object.keys(groups480).length);
for (const [prefix, files] of Object.entries(groups480).sort()) {
    console.log(`  ${prefix}: ${files.length} images`);
}

console.log('\nGroups in large:', Object.keys(groupsLarge).length);
for (const [prefix, files] of Object.entries(groupsLarge).sort()) {
    console.log(`  ${prefix}: ${files.length} images`);
}

// Read homepage for project order
const homepage = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
const projectOrder = [];
const re = /href="project\/([^/"]+)\/index\.html"/g;
let m;
while ((m = re.exec(homepage)) !== null) {
    if (!projectOrder.includes(m[1])) projectOrder.push(m[1]);
}

console.log('\nProject order on homepage:', projectOrder.length, 'projects');
console.log(projectOrder.join(', '));

// Try to match groups to projects by order
const prefixes = Object.keys(groups480).sort();
console.log('\nMatching attempt:');
for (let i = 0; i < Math.min(projectOrder.length, prefixes.length); i++) {
    console.log(`  ${projectOrder[i]} -> ${prefixes[i]} (${groups480[prefixes[i]].length} images)`);
}
