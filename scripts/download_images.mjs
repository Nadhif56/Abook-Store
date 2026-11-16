import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const imagesToDownload = [
  {
    name: 'hero-store.jpg',
    url: 'https://images.unsplash.com/photo-1507842229451-7f01be777a26?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'about-store.jpg',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'book-filosofi-teras.jpg',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'book-bumi-manusia.jpg',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'book-atomic-habits.jpg',
    url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'book-laut-bercerita.jpg',
    url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'book-sapiens.jpg',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'book-metodologi.jpg',
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'news-festival.jpg',
    url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'news-self-improvement.jpg',
    url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'news-children-books.jpg',
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=85',
  },
];

async function run() {
  console.log('Starting image downloads to public/images/...');
  for (const item of imagesToDownload) {
    const dest = path.join(outDir, item.name);
    try {
      console.log(`Downloading ${item.name}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${item.url}: ${res.status}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${item.name} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${item.name}:`, err.message);
    }
  }
  console.log('Done downloading images.');
}

run();

