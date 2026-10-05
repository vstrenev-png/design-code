const fs = require('fs');
const path = require('path');

const DRIVE_ROOT = '/Users/admin/Downloads/Design Code - g.designcode';
const WEBSITE_DIR = __dirname;
const ASSETS_DIR = path.join(WEBSITE_DIR, 'assets', 'projects');
const PROJECTS_JSON = path.join(WEBSITE_DIR, 'projects.json');

// Explicit merge groups: folders that belong to the same project
const MERGE_GROUPS = [
  {
    folders: ['In Line 3d-ta', 'In line още снимки'],
    slug: 'in-line',
    title: 'In Line'
  },
  {
    folders: ['dental clinic green apple', '3d dental clinic green apple'],
    slug: 'dental-clinic-green-apple',
    title: 'Dental Clinic Green Apple'
  },
  {
    folders: ['Green Cotage project', 'green cottage 3d още'],
    slug: 'green-cottage',
    title: 'Green Cottage'
  },
  {
    folders: ['Simeon', 'Simeon 3d'],
    slug: 'simeon',
    title: 'Simeon'
  },
  {
    folders: ['mezonet', 'mezonet още снимки'],
    slug: 'mezonet',
    title: 'Mezonet'
  }
];

// Explicit slug/title overrides for individual folders
const OVERRIDES = {
  '3d dental clinc tropical paradise': { slug: 'dental-clinic-tropical-paradise', title: 'Dental Clinic Tropical Paradise' },
  'Arizona dreams': { slug: 'arizona-dream', title: 'Arizona Dream' },
  'Botevgrad ap 3d': { slug: 'botevgrad-ap-3d', title: 'Botevgrad Apartment 3D' },
  'Cannes': { slug: 'cannes', title: 'Cannes' },
  'Ivan Vazov ap изпълнение': { slug: 'ivan-vazov-ap', title: 'Ivan Vazov Apartment' },
  'John Galliano office Sofia': { slug: 'john-galliano-office-sofia', title: 'John Galliano Office Sofia' },
  'Natalie': { slug: 'natalie', title: 'Natalie' },
  'Office 2': { slug: 'office-2', title: 'Office 2' },
  'Parsa Sohi арх.bul.Bulgaria': { slug: 'parsa-sohi', title: 'Parsa Sohi' },
  'Pernik ap': { slug: 'pernik-ap', title: 'Pernik Apartment' },
  'adriana turkmen ap измисли име на проекта': { slug: 'adriana-turkmen-ap', title: 'Adriana Turkmen Apartment' },
  'antre botevgrad същият клиент друг апартамент': { slug: 'antre-botevgrad', title: 'Antre Botevgrad' },
  'ap. Sofia': { slug: 'ap-sofia', title: 'Apartment Sofia' },
  'beach bungaloo 3d': { slug: 'beach-bungaloo', title: 'Beach Bungaloo' },
  'black wood elegance': { slug: 'black-wood-elegance', title: 'Black Wood Elegance' },
  'delta hill house': { slug: 'delta-hill-house', title: 'Delta Hill House' },
  'diamant 2': { slug: 'diamant-2', title: 'Diamant 2' },
  'grey&white': { slug: 'grey-white', title: 'Grey & White' },
  'industrial kitchen': { slug: 'industrial-kitchen', title: 'Industrial Kitchen' },
  'mediteranean': { slug: 'mediteranean', title: 'Mediteranean' },
  'office 3d-ta': { slug: 'office-3d', title: 'Office 3D' },
  'office kazbek arh.3d': { slug: 'office-kazbek', title: 'Office Kazbek' },
  'roberto first ap': { slug: 'roberto-first-ap', title: 'Roberto First Apartment' },
  'rosana': { slug: 'rosana', title: 'Rosana' },
  'valyo denchev ap': { slug: 'valyo-denchev-ap', title: 'Valyo Denchev Apartment' },
  'vasil iliev mezonet': { slug: 'vasil-iliev-mezonet', title: 'Vasil Iliev Maisonette' },
  'white ap modern': { slug: 'white-ap-modern', title: 'White Apartment Modern' },
  'къща Драгалевци още снимки': { slug: 'kasa-dragalevtsi', title: 'House Dragalevtsi' },
  'на Мара отварачката 3д тата към реализираните да се сложат': { slug: 'mara-realized-3d', title: 'Mara Realized 3D' },
  'нашия офис': { slug: 'nashiya-ofis', title: 'Our Office' }
};

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp)$/i;

function transliterate(str) {
  const map = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sht','ъ':'a','ь':'y','ю':'yu','я':'ya',
    'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ж':'Zh','З':'Z','И':'I','Й':'Y','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'H','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Sht','Ъ':'A','Ь':'Y','Ю':'Yu','Я':'Ya'
  };
  return str.split('').map(c => map[c] || c).join('');
}

function normalizeSlug(name) {
  return transliterate(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanTitle(name) {
  // Basic cleanup: remove trailing notes in parentheses/brackets, but keep main name
  return name
    .replace(/\s+/g, ' ')
    .replace(/\s*(3d|3d-ta|3д|3д-та|още снимки|project|ap\.|ap|изпълнение|измисли име на проекта|същият клиент друг апартамент|arh\.3d)\s*$/i, '')
    .trim();
}

function isImage(file) {
  return IMAGE_EXTENSIONS.test(file);
}

function sanitizeFilename(file) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const clean = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `${clean}${ext.toLowerCase()}`;
}

function copyImages(sourceDir, targetDir) {
  const files = fs.readdirSync(sourceDir).filter(isImage);
  const copied = [];
  files.forEach((file, idx) => {
    const src = path.join(sourceDir, file);
    let destName = file;
    // Avoid name collisions by prefixing with index if needed
    if (fs.existsSync(path.join(targetDir, destName))) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      destName = `${base}-${idx}${ext}`;
    }
    const dest = path.join(targetDir, destName);
    fs.copyFileSync(src, dest);
    copied.push(destName);
  });
  return copied;
}

function main() {
  console.log('Reading Google Drive folders...');
  const driveFolders = fs.readdirSync(DRIVE_ROOT)
    .filter(f => fs.statSync(path.join(DRIVE_ROOT, f)).isDirectory())
    .filter(f => f !== 'Fwd- цени_осветление'); // skip empty/non-project folder

  // Build project groups
  const groups = [];
  const assignedFolders = new Set();

  MERGE_GROUPS.forEach(group => {
    const existing = group.folders.filter(f => driveFolders.includes(f));
    if (existing.length === 0) return;
    groups.push({ slug: group.slug, title: group.title, folders: existing });
    existing.forEach(f => assignedFolders.add(f));
  });

  driveFolders.forEach(folder => {
    if (assignedFolders.has(folder)) return;
    const override = OVERRIDES[folder];
    if (override) {
      groups.push({ slug: override.slug, title: override.title, folders: [folder] });
    } else {
      // Fallback: auto-generate from folder name
      groups.push({ slug: normalizeSlug(folder), title: cleanTitle(folder), folders: [folder] });
    }
  });

  // Skip groups with no images
  const validGroups = groups.map(g => {
    const imageFiles = g.folders.flatMap(folder => {
      const dir = path.join(DRIVE_ROOT, folder);
      return fs.readdirSync(dir).filter(isImage).map(f => ({ folder, file: f }));
    });
    return { ...g, imageFiles };
  }).filter(g => g.imageFiles.length > 0);

  console.log(`Found ${validGroups.length} projects with images.`);

  // Clear existing project assets
  console.log('Clearing old project assets...');
  if (fs.existsSync(ASSETS_DIR)) {
    fs.rmSync(ASSETS_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  // Build projects data
  const projects = validGroups.map(g => {
    const projectDir = path.join(ASSETS_DIR, g.slug);
    fs.mkdirSync(projectDir, { recursive: true });

    const copied = [];
    g.imageFiles.forEach((item, idx) => {
      const src = path.join(DRIVE_ROOT, item.folder, item.file);
      let destName = sanitizeFilename(item.file);
      if (fs.existsSync(path.join(projectDir, destName))) {
        const ext = path.extname(destName);
        const base = path.basename(destName, ext);
        destName = `${base}-${idx}${ext}`;
      }
      const dest = path.join(projectDir, destName);
      fs.copyFileSync(src, dest);
      copied.push(`assets/projects/${g.slug}/${destName}`);
    });

    const hero = copied[0];
    const gallery = copied.slice(1);

    return {
      slug: g.slug,
      title: g.title,
      type: 'Жилище',
      location: 'София',
      year: '2024',
      area: '',
      hero,
      gallery,
      lead: `Проект ${g.title} — интериорно решение с внимание към детайла.`,
      description: 'Проектът демонстрира баланс между функционалност и естетика, съобразен с нуждите на клиента.',
      featured: false,
      imageCount: copied.length
    };
  });

  // Pick top 6 by image count as featured
  projects
    .slice()
    .sort((a, b) => b.imageCount - a.imageCount)
    .slice(0, 6)
    .forEach(p => {
      const project = projects.find(x => x.slug === p.slug);
      if (project) project.featured = true;
    });

  // Remove temporary imageCount field
  projects.forEach(p => delete p.imageCount);

  // Write projects.json
  fs.writeFileSync(PROJECTS_JSON, JSON.stringify({ projects }, null, 2), 'utf8');
  console.log(`Wrote projects.json with ${projects.length} projects.`);

  // List generated projects
  console.log('\nGenerated projects:');
  projects.forEach((p, i) => {
    const count = 1 + p.gallery.length;
    const marker = p.featured ? ' ★' : '';
    console.log(`  ${String(i + 1).padStart(2, '0')}. ${p.slug} (${count} images)${marker}`);
  });
}

main();
