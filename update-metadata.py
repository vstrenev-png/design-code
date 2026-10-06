import json
import os
import shutil
import hashlib
from pathlib import Path

BASE = Path('/Users/admin/Kimi Workplace/design-code-website')
PROJECTS_JSON = BASE / 'projects.json'
ASSETS = BASE / 'assets' / 'projects'
DRIVE = Path('/Users/admin/Downloads/Design Code - g.designcode')

def load_projects():
    with open(PROJECTS_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_projects(data):
    with open(PROJECTS_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def generate_lead(title, ptype, location, year):
    return f"Проект {title} — {ptype.lower()} в {location} от {year} г."

def generate_desc(title, ptype, location, year):
    return f"{title} е интериорен проект в {location}, реализиран през {year} г. Решението съчетава функционалност, елегантност и внимание към детайла."

# Metadata updates per user instructions
METADATA = {
    'in-line': {'year': '2022'},
    'dental-clinic-green-apple': {'year': '2019'},
    'green-cottage': {'location': 'Св. Константин и Елена', 'year': '2024'},
    'simeon': {
        'slug': 'kasa-ivanyane',
        'title': 'къща Иваняне',
        'location': 'Иваняне',
        'year': '2022'
    },
    'mezonet': {'year': '2018'},
    'dental-clinic-tropical-paradise': {
        'slug': 'tropical-clinic',
        'title': 'Tropical Clinic',
        'year': '2022',
        'type': 'Обществен обект'
    },
    'arizona-dream': {'year': '2020', 'type': 'Бунгало', 'location': 'Аризона'},
    'botevgrad-ap-3d': {'year': '2024'},  # year not specified by user, keep current
    'cannes': {'location': 'Cannes'},
    'ivan-vazov-ap': {'year': '2017'},
    'john-galliano-office-sofia': {'year': '2016', 'type': 'Офис'},
    'natalie': {'year': '2022'},
    'office-2': {'year': '2021'},
    'parsa-sohi': {'year': '2021'},
    'pernik-ap': {'year': '2016'},
    'adriana-turkmen-ap': {
        'slug': 'modern-kitchen',
        'title': 'Modern Kitchen',
        'year': '2016'
    },
    'antre-botevgrad': {'year': '2015'},
    'ap-sofia': {'year': '2017'},
    'beach-bungaloo': {'year': '2016', 'location': 'Sea'},
    'black-wood-elegance': {'year': '2020'},
    'delta-hill-house': {'year': '2014', 'location': 'с. Кладница'},
    'diamant-2': {'year': '2022'},
    'grey-white': {'year': '2020'},
    'industrial-kitchen': {'year': '2019'},
    'mediteranean': {'year': '2020'},
    'office-3d': {'year': '2024'},  # will be merged
    'office-kazbek': {'year': '2024', 'type': 'Офис'},
    'roberto-first-ap': {
        'slug': 'house-sandanski',
        'title': 'House Sandanski',
        'location': 'Сандански',
        'year': '2014'
    },
    'rosana': {
        'slug': 'smolqn-ap',
        'title': 'Smolqn Apartment',
        'location': 'Смолян',
        'year': '2015'
    },
    'valyo-denchev-ap': {
        'slug': 'mansarda-pod-nebeto',
        'title': 'Мансарда под небето',
        'year': '2016'
    },
    'vasil-iliev-mezonet': {
        'slug': 'mezonet-project',
        'title': 'Мезонет',
        'year': '2017'
    },
    'white-ap-modern': {'year': '2015'},
    'kasa-dragalevtsi': {'year': '2018'},
    'mara-realized-3d': {
        'slug': 'neoclassical-ap',
        'title': 'Neoclassical Apartment',
        'year': '2020'
    },
    'nashiya-ofis': {},  # OK as is
}

def file_hash(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def remove_duplicates(folder):
    """Remove duplicate images by content hash, keep first occurrence."""
    if not folder.exists():
        return []
    files = sorted([f for f in folder.iterdir() if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']])
    seen = {}
    removed = []
    for f in files:
        h = file_hash(f)
        if h in seen:
            f.unlink()
            removed.append(f.name)
        else:
            seen[h] = f.name
    return removed

def merge_projects(source_slug, target_slug):
    """Merge source project images into target, then remove source."""
    source_dir = ASSETS / source_slug
    target_dir = ASSETS / target_slug
    if not source_dir.exists():
        return False
    target_dir.mkdir(parents=True, exist_ok=True)
    for f in source_dir.iterdir():
        if f.is_file():
            dest = target_dir / f.name
            if dest.exists():
                # rename to avoid collision
                base = f.stem
                ext = f.suffix
                dest = target_dir / f"{base}-merged{ext}"
            shutil.copy2(f, dest)
    shutil.rmtree(source_dir)
    return True

def update_image_paths(images, old_slug, new_slug):
    return [img.replace(f'assets/projects/{old_slug}/', f'assets/projects/{new_slug}/') for img in images]

def main():
    data = load_projects()
    projects = {p['slug']: p for p in data['projects']}

    # Merge office-3d into office-kazbek
    if 'office-3d' in projects and 'office-kazbek' in projects:
        print("Merging office-3d into office-kazbek...")
        merge_projects('office-3d', 'office-kazbek')
        source = projects.pop('office-3d')
        target = projects['office-kazbek']
        # Update target images
        target_images = [target['hero']] + target['gallery']
        source_images = [source['hero']] + source['gallery']
        all_images = target_images + update_image_paths(source_images, 'office-3d', 'office-kazbek')
        target['hero'] = all_images[0]
        target['gallery'] = all_images[1:]
        target['title'] = 'Office Kazbek'
        target['type'] = 'Офис'
        # Remove old project page
        old_page = BASE / f'project-office-3d.html'
        if old_page.exists():
            old_page.unlink()

    # Handle slug rename conflict: existing 'mezonet' vs 'vasil-iliev-mezonet' -> 'mezonet'
    if 'mezonet' in projects and 'vasil-iliev-mezonet' in projects:
        print("Renaming existing mezonet to mezonet-2018 to avoid conflict...")
        old = projects.pop('mezonet')
        old_slug = 'mezonet'
        new_slug = 'mezonet-2018'
        old_dir = ASSETS / old_slug
        new_dir = ASSETS / new_slug
        if old_dir.exists():
            old_dir.rename(new_dir)
        old['slug'] = new_slug
        old['hero'] = old['hero'].replace(f'assets/projects/{old_slug}/', f'assets/projects/{new_slug}/')
        old['gallery'] = update_image_paths(old['gallery'], old_slug, new_slug)
        projects[new_slug] = old
        # Rename old page
        old_page = BASE / f'project-{old_slug}.html'
        new_page = BASE / f'project-{new_slug}.html'
        if old_page.exists():
            old_page.rename(new_page)

    # Apply metadata updates and slug renames
    for old_slug, updates in METADATA.items():
        if old_slug not in projects:
            print(f"Warning: {old_slug} not found")
            continue
        p = projects[old_slug]
        new_slug = updates.get('slug', old_slug)
        
        # Rename folder if slug changed
        if new_slug != old_slug:
            print(f"Renaming {old_slug} -> {new_slug}")
            old_dir = ASSETS / old_slug
            new_dir = ASSETS / new_slug
            if old_dir.exists():
                if new_dir.exists():
                    # Merge folders
                    for f in old_dir.iterdir():
                        if f.is_file():
                            dest = new_dir / f.name
                            if dest.exists():
                                dest = new_dir / f"{f.stem}-renamed{f.suffix}"
                            shutil.copy2(f, dest)
                    shutil.rmtree(old_dir)
                else:
                    old_dir.rename(new_dir)
            p['slug'] = new_slug
            p['hero'] = p['hero'].replace(f'assets/projects/{old_slug}/', f'assets/projects/{new_slug}/')
            p['gallery'] = update_image_paths(p['gallery'], old_slug, new_slug)
            projects[new_slug] = projects.pop(old_slug)
            # Rename old project page
            old_page = BASE / f'project-{old_slug}.html'
            if old_page.exists():
                old_page.unlink()
        
        # Update metadata fields
        for key in ['title', 'type', 'location', 'year']:
            if key in updates:
                p[key] = updates[key]
    
    # Remove duplicates and regenerate leads/descriptions
    for slug, p in projects.items():
        folder = ASSETS / slug
        removed = remove_duplicates(folder)
        if removed:
            print(f"Removed {len(removed)} duplicates from {slug}")
        
        # Rebuild image list from actual folder contents
        all_images = sorted([f.name for f in folder.iterdir() if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif', '.webp']])
        if not all_images:
            print(f"Warning: no images in {slug}")
            continue
        
        # Try to keep current hero if it still exists
        current_hero_name = Path(p['hero']).name
        if current_hero_name in all_images:
            hero_name = current_hero_name
        else:
            hero_name = all_images[0]
        
        p['hero'] = f'assets/projects/{slug}/{hero_name}'
        p['gallery'] = [f'assets/projects/{slug}/{name}' for name in all_images if name != hero_name]
        
        # Update lead and description
        p['lead'] = generate_lead(p['title'], p['type'], p['location'], p['year'])
        p['description'] = generate_desc(p['title'], p['type'], p['location'], p['year'])
    
    data['projects'] = list(projects.values())
    save_projects(data)
    print(f"Updated {len(data['projects'])} projects in {PROJECTS_JSON}")

if __name__ == '__main__':
    main()
