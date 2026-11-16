import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. HERO STORE: Warm Editorial Bookstore Ambiance (4:5 / 1000x1250)
const heroStoreSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#261F1A"/>
      <stop offset="40%" stop-color="#3D352E"/>
      <stop offset="100%" stop-color="#15100C"/>
    </linearGradient>
    <linearGradient id="shelfG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5C4D42"/>
      <stop offset="50%" stop-color="#736255"/>
      <stop offset="100%" stop-color="#4A3E35"/>
    </linearGradient>
    <radialGradient id="lampG" cx="0.5" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="#FFE8B3" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#EAA64C" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#261F1A" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8C7355"/>
      <stop offset="100%" stop-color="#544330"/>
    </linearGradient>
  </defs>

  <!-- Background Room -->
  <rect width="800" height="1000" fill="url(#wallG)"/>

  <!-- Warm Reading Lamp Glow -->
  <circle cx="400" cy="350" r="450" fill="url(#lampG)"/>

  <!-- Arch Window Frame -->
  <path d="M 200 400 L 200 150 Q 400 30 600 150 L 600 400 Z" fill="#F4EBD9" fill-opacity="0.08" stroke="#8C7355" stroke-width="6"/>
  <line x1="400" y1="90" x2="400" y2="400" stroke="#8C7355" stroke-width="4" stroke-opacity="0.6"/>
  <line x1="200" y1="260" x2="600" y2="260" stroke="#8C7355" stroke-width="4" stroke-opacity="0.6"/>

  <!-- Bookshelves Left & Right -->
  <!-- Left Shelf Columns -->
  <rect x="40" y="80" width="140" height="850" fill="#201914" stroke="#5C4D42" stroke-width="4"/>
  <!-- Shelf Planks -->
  <rect x="40" y="240" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="40" y="390" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="40" y="540" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="40" y="690" width="140" height="16" fill="url(#shelfG)"/>

  <!-- Books on Left Shelf -->
  <!-- Row 1 -->
  <rect x="50" y="130" width="18" height="110" rx="2" fill="#C25E34"/>
  <rect x="71" y="145" width="22" height="95" rx="2" fill="#3D5A80"/>
  <rect x="96" y="125" width="16" height="115" rx="2" fill="#E0FBFC"/>
  <rect x="115" y="140" width="24" height="100" rx="2" fill="#98C1D9"/>
  <rect x="142" y="150" width="20" height="90" rx="2" fill="#D98A5B"/>

  <!-- Row 2 -->
  <rect x="50" y="290" width="25" height="100" rx="2" fill="#6A994E"/>
  <rect x="78" y="280" width="20" height="110" rx="2" fill="#A7C957"/>
  <rect x="101" y="300" width="24" height="90" rx="2" fill="#BC4749"/>
  <rect x="128" y="275" width="34" height="115" rx="2" fill="#F2E8CF"/>

  <!-- Row 3 -->
  <rect x="50" y="440" width="22" height="100" rx="2" fill="#E76F51"/>
  <rect x="75" y="430" width="28" height="110" rx="2" fill="#2A9D8F"/>
  <rect x="106" y="450" width="18" height="90" rx="2" fill="#E9C46A"/>
  <rect x="127" y="435" width="35" height="105" rx="2" fill="#F4A261"/>

  <!-- Right Shelf Columns -->
  <rect x="620" y="80" width="140" height="850" fill="#201914" stroke="#5C4D42" stroke-width="4"/>
  <rect x="620" y="240" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="620" y="390" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="620" y="540" width="140" height="16" fill="url(#shelfG)"/>
  <rect x="620" y="690" width="140" height="16" fill="url(#shelfG)"/>

  <!-- Books on Right Shelf -->
  <rect x="630" y="135" width="22" height="105" rx="2" fill="#8338EC"/>
  <rect x="655" y="125" width="26" height="115" rx="2" fill="#3A86FF"/>
  <rect x="684" y="145" width="18" height="95" rx="2" fill="#FFBE0B"/>
  <rect x="705" y="130" width="35" height="110" rx="2" fill="#FB5607"/>

  <rect x="630" y="285" width="30" height="105" rx="2" fill="#0077B6"/>
  <rect x="663" y="275" width="22" height="115" rx="2" fill="#00B4D8"/>
  <rect x="688" y="295" width="28" height="95" rx="2" fill="#90E0EF"/>
  <rect x="719" y="280" width="24" height="110" rx="2" fill="#CAF0F8"/>

  <!-- Center Reading Table -->
  <ellipse cx="400" cy="780" rx="240" ry="60" fill="url(#woodG)"/>
  <ellipse cx="400" cy="775" rx="230" ry="55" fill="#A48261"/>
  <path d="M 220 780 L 220 950 L 250 950 L 250 785 Z" fill="#3D3025"/>
  <path d="M 580 780 L 580 950 L 550 950 L 550 785 Z" fill="#3D3025"/>
  <path d="M 390 785 L 390 960 L 410 960 L 410 785 Z" fill="#33281E"/>

  <!-- Brass Lamp on Table -->
  <path d="M 385 750 Q 380 640 400 620 Q 420 640 415 750 Z" fill="#CCA43B"/>
  <ellipse cx="400" cy="620" rx="45" ry="15" fill="#E5C158"/>
  <ellipse cx="400" cy="625" rx="42" ry="12" fill="#FFE899"/>
  <!-- Light Beam downwards -->
  <polygon points="360,630 440,630 520,770 280,770" fill="#FFEAA7" fill-opacity="0.25"/>

  <!-- Open Book on Table -->
  <path d="M 330 750 Q 370 740 400 745 Q 430 740 470 750 L 480 765 Q 435 753 400 758 Q 365 753 320 765 Z" fill="#FBF9F5" stroke="#C25E34" stroke-width="2"/>
  <line x1="400" y1="745" x2="400" y2="758" stroke="#8C7355" stroke-width="2"/>

  <!-- Hot Coffee Cup with Steam -->
  <ellipse cx="280" cy="745" rx="16" ry="7" fill="#8C7355"/>
  <rect x="268" y="730" width="24" height="16" rx="4" fill="#FBF9F5"/>
  <path d="M 292 733 C 298 733 298 743 292 743" fill="none" stroke="#FBF9F5" stroke-width="2"/>
  <!-- Steam curls -->
  <path d="M 276 725 Q 272 715 277 708 Q 282 702 278 695" fill="none" stroke="#FAF7F2" stroke-width="1.5" stroke-opacity="0.6"/>
  <path d="M 284 723 Q 288 715 284 707 Q 280 700 285 692" fill="none" stroke="#FAF7F2" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- Foreground Atmospheric Vignette Text -->
  <rect x="0" y="850" width="800" height="150" fill="url(#wallG)" fill-opacity="0.85"/>
  <text x="400" y="910" text-anchor="middle" font-family="'Merriweather', serif" font-size="28" font-weight="bold" fill="#FAF7F2" letter-spacing="1">
    ABOOK STORE
  </text>
  <text x="400" y="940" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#DED6C1" letter-spacing="3">
    BOGOR TIMUR • CILEUNGSI &amp; JONGGOL
  </text>
</svg>`;

// 2. ABOUT STORE: Cozy Reading Sanctuary & Curator (16:11 / 800x550)
const aboutStoreSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <defs>
    <linearGradient id="abBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="60%" stop-color="#EFE9DB"/>
      <stop offset="100%" stop-color="#DED6C1"/>
    </linearGradient>
    <linearGradient id="woodTable" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#846549"/>
      <stop offset="100%" stop-color="#5C442F"/>
    </linearGradient>
  </defs>

  <rect width="800" height="550" fill="url(#abBg)"/>

  <!-- Wallpaper Vertical Stripes Pattern -->
  <g stroke="#D0C4BD" stroke-width="1" stroke-opacity="0.3">
    <line x1="100" y1="0" x2="100" y2="550"/>
    <line x1="200" y1="0" x2="200" y2="550"/>
    <line x1="300" y1="0" x2="300" y2="550"/>
    <line x1="400" y1="0" x2="400" y2="550"/>
    <line x1="500" y1="0" x2="500" y2="550"/>
    <line x1="600" y1="0" x2="600" y2="550"/>
    <line x1="700" y1="0" x2="700" y2="550"/>
  </g>

  <!-- Big Bookshelf in Background -->
  <rect x="80" y="40" width="640" height="340" rx="8" fill="#3D352E" stroke="#261F1A" stroke-width="6"/>
  <!-- Shelf Horizontal Dividers -->
  <rect x="80" y="150" width="640" height="12" fill="#5C4D42"/>
  <rect x="80" y="260" width="640" height="12" fill="#5C4D42"/>
  <!-- Shelf Vertical Divider -->
  <rect x="395" y="40" width="10" height="340" fill="#5C4D42"/>

  <!-- Books Top Row Left -->
  <rect x="100" y="65" width="20" height="85" fill="#C25E34"/>
  <rect x="122" y="75" width="25" height="75" fill="#EFE9DB"/>
  <rect x="150" y="60" width="18" height="90" fill="#261F1A"/>
  <rect x="170" y="80" width="28" height="70" fill="#695C52"/>
  <rect x="201" y="68" width="22" height="82" fill="#A64B24"/>
  <rect x="226" y="72" width="18" height="78" fill="#3D352E"/>
  <!-- Slanted Books -->
  <g transform="translate(250, 65) rotate(15)">
    <rect width="18" height="85" fill="#EFE9DB"/>
  </g>
  <g transform="translate(270, 70) rotate(16)">
    <rect width="20" height="80" fill="#C25E34"/>
  </g>

  <!-- Books Top Row Right -->
  <rect x="420" y="70" width="26" height="80" fill="#2E4057"/>
  <rect x="449" y="60" width="18" height="90" fill="#048A81"/>
  <rect x="470" y="75" width="24" height="75" fill="#F4D35E"/>
  <rect x="497" y="65" width="30" height="85" fill="#EE964B"/>
  <rect x="530" y="72" width="20" height="78" fill="#F95738"/>
  <rect x="553" y="62" width="25" height="88" fill="#2E4057"/>

  <!-- Books Middle Row Left -->
  <rect x="100" y="175" width="30" height="85" fill="#545B52"/>
  <rect x="133" y="185" width="22" height="75" fill="#889278"/>
  <rect x="158" y="170" width="20" height="90" fill="#D3D0CB"/>
  <rect x="181" y="180" width="25" height="80" fill="#6B705C"/>
  <rect x="209" y="172" width="32" height="88" fill="#A5A58D"/>
  <rect x="244" y="188" width="18" height="72" fill="#B7B7A4"/>

  <!-- Books Middle Row Right -->
  <rect x="420" y="180" width="24" height="80" fill="#B85A3C"/>
  <rect x="447" y="172" width="20" height="88" fill="#8A422D"/>
  <rect x="470" y="190" width="28" height="70" fill="#D67B5E"/>
  <rect x="501" y="175" width="22" height="85" fill="#E89B82"/>
  <rect x="526" y="182" width="26" height="78" fill="#4A281E"/>

  <!-- Indoor Houseplant in Pot on Middle Shelf -->
  <ellipse cx="640" cy="255" rx="35" ry="12" fill="#8C7355"/>
  <path d="M 615 255 L 620 230 L 660 230 L 665 255 Z" fill="#DED6C1"/>
  <!-- Plant Leaves -->
  <path d="M 640 230 Q 610 200 600 170 Q 630 190 640 230" fill="#588157"/>
  <path d="M 640 230 Q 645 190 655 160 Q 660 195 640 230" fill="#3A5A40"/>
  <path d="M 640 230 Q 670 205 685 180 Q 665 210 640 230" fill="#344E41"/>

  <!-- Bottom Row: Stack of Big Books -->
  <rect x="120" y="325" width="120" height="24" rx="3" fill="#C25E34"/>
  <rect x="130" y="303" width="100" height="22" rx="3" fill="#FAF7F2"/>
  <rect x="140" y="283" width="80" height="20" rx="3" fill="#261F1A"/>

  <!-- Cozy Armchair on the Right -->
  <path d="M 520 340 Q 510 480 540 510 L 720 510 Q 750 480 740 340 Z" fill="#7D6B5D"/>
  <ellipse cx="630" cy="450" rx="90" ry="35" fill="#695C52"/>
  <!-- Armchair Cushion -->
  <ellipse cx="630" cy="445" rx="75" ry="25" fill="#EFE9DB"/>

  <!-- Foreground Table Left -->
  <path d="M 0 420 L 360 420 L 400 550 L 0 550 Z" fill="url(#woodTable)"/>
  <!-- Books and Coffee on Foreground Table -->
  <g transform="translate(140, 430)">
    <!-- Open Journal -->
    <path d="M 20 20 Q 70 10 110 18 Q 150 10 200 20 L 210 50 Q 155 38 110 46 Q 65 38 10 50 Z" fill="#FAF7F2" stroke="#B7B09E" stroke-width="2"/>
    <line x1="110" y1="18" x2="110" y2="46" stroke="#C25E34" stroke-width="2"/>
    <!-- Pencil -->
    <line x1="220" y1="20" x2="260" y2="45" stroke="#EAA64C" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Title Badge Overlay -->
  <rect x="250" y="470" width="300" height="50" rx="12" fill="#261F1A" fill-opacity="0.9"/>
  <text x="400" y="502" text-anchor="middle" font-family="'Merriweather', serif" font-size="16" font-weight="bold" fill="#FAF7F2">
    Ruang Literasi &amp; Sudut Baca
  </text>
</svg>`;

// Helper for Book Covers (3:4 ratio / 600x800)
function createBookSvg(config) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${config.bg1}"/>
      <stop offset="100%" stop-color="${config.bg2}"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Book Base with Spine & Border -->
  <rect width="600" height="800" rx="16" fill="url(#bgG)"/>

  <!-- Realistic Book Spine 3D Shadow on Left -->
  <rect x="0" y="0" width="36" height="800" rx="4" fill="#000000" fill-opacity="0.25"/>
  <line x1="36" y1="0" x2="36" y2="800" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="2"/>

  <!-- Outer Frame -->
  <rect x="55" y="45" width="490" height="710" rx="8" fill="none" stroke="${config.accentColor}" stroke-width="2" stroke-opacity="0.5"/>
  <rect x="65" y="55" width="470" height="690" rx="4" fill="none" stroke="${config.accentColor}" stroke-width="1" stroke-opacity="0.25"/>

  <!-- Category Tag -->
  <rect x="75" y="80" width="140" height="30" rx="6" fill="${config.accentColor}" fill-opacity="0.2"/>
  <text x="145" y="100" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="${config.accentColor}" letter-spacing="2">
    ${config.category.toUpperCase()}
  </text>

  <!-- Central Graphic Illustration -->
  <g transform="translate(300, 340)">
    ${config.graphic}
  </g>

  <!-- Book Title -->
  <text x="300" y="540" text-anchor="middle" font-family="'Merriweather', serif" font-size="${config.titleSize || 32}" font-weight="bold" fill="${config.textColor}" letter-spacing="-0.5">
    ${config.titleLine1}
  </text>
  ${config.titleLine2 ? `<text x="300" y="585" text-anchor="middle" font-family="'Merriweather', serif" font-size="${config.titleSize || 32}" font-weight="bold" fill="${config.textColor}">
    ${config.titleLine2}
  </text>` : ''}

  <!-- Subtitle or Tagline -->
  <text x="300" y="630" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="${config.subColor || '#FAF7F2'}" fill-opacity="0.8" letter-spacing="0.5">
    ${config.subtitle}
  </text>

  <!-- Author Name -->
  <line x1="220" y1="670" x2="380" y2="670" stroke="${config.accentColor}" stroke-width="2" stroke-opacity="0.6"/>
  <text x="300" y="705" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700" fill="${config.accentColor}" letter-spacing="1.5">
    ${config.author.toUpperCase()}
  </text>

  <!-- Logo Badge at Bottom -->
  <text x="300" y="735" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="${config.subColor || '#FAF7F2'}" fill-opacity="0.5" letter-spacing="2">
    EDISI RESMI • ABOOK STORE
  </text>
</svg>`;
}

// 3. BOOK 1: Filosofi Teras
const bookFilosofi = createBookSvg({
  bg1: '#1E293B',
  bg2: '#0F172A',
  accentColor: '#F59E0B',
  textColor: '#F8FAFC',
  subColor: '#94A3B8',
  category: 'Pengembangan Diri',
  titleLine1: 'FILOSOFI',
  titleLine2: 'TERAS',
  subtitle: 'Filsafat Yunani-Romawi Kuno untuk Mental Tangguh',
  author: 'Henry Manampiring',
  graphic: `
    <!-- Classical Greek/Roman Pillar & Constellation -->
    <circle cx="0" cy="0" r="110" fill="#F59E0B" fill-opacity="0.08"/>
    <circle cx="0" cy="0" r="85" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6,6"/>
    <!-- Stylized Stoic Temple Pillar -->
    <path d="M -50 -50 L 50 -50 L 40 -35 L -40 -35 Z" fill="#F59E0B"/>
    <rect x="-35" y="-35" width="14" height="100" fill="#CBD5E1"/>
    <rect x="-7" y="-35" width="14" height="100" fill="#F8FAFC"/>
    <rect x="21" y="-35" width="14" height="100" fill="#CBD5E1"/>
    <rect x="-50" y="65" width="100" height="15" rx="2" fill="#F59E0B"/>
    <!-- Olive Branch -->
    <path d="M -70 20 Q -90 -20 -60 -40 Q -50 -10 -70 20" fill="#F59E0B" fill-opacity="0.8"/>
    <path d="M 70 20 Q 90 -20 60 -40 Q 50 -10 70 20" fill="#F59E0B" fill-opacity="0.8"/>
  `
});

// 4. BOOK 2: Bumi Manusia
const bookBumiManusia = createBookSvg({
  bg1: '#4A1D15',
  bg2: '#240B07',
  accentColor: '#E6C280',
  textColor: '#FFF9EF',
  subColor: '#D4B895',
  category: 'Sastra Nusantara',
  titleLine1: 'BUMI',
  titleLine2: 'MANUSIA',
  subtitle: 'Tetralogi Buru Pertama • Mahakarya Sastra Dunia',
  author: 'Pramoedya Ananta Toer',
  graphic: `
    <!-- Colonial Quill & Wax Seal Motif -->
    <circle cx="0" cy="0" r="105" fill="#E6C280" fill-opacity="0.1"/>
    <ellipse cx="0" cy="0" rx="90" ry="90" fill="none" stroke="#E6C280" stroke-width="2"/>
    <!-- Wax Seal -->
    <circle cx="0" cy="15" r="45" fill="#800E13"/>
    <circle cx="0" cy="15" r="38" fill="#AD2831" stroke="#E6C280" stroke-width="1.5"/>
    <text x="0" y="24" text-anchor="middle" font-family="'Merriweather', serif" font-size="28" font-weight="bold" fill="#E6C280">P</text>
    <!-- Elegant Feather Quill -->
    <path d="M -20 80 Q 20 0 65 -75 Q 40 -65 20 -40 Q 5 -10 -20 80" fill="#E6C280"/>
  `
});

// 5. BOOK 3: Atomic Habits
const bookAtomicHabits = createBookSvg({
  bg1: '#FAF7F2',
  bg2: '#F0ECE1',
  accentColor: '#D9531E',
  textColor: '#15100C',
  subColor: '#5C5449',
  category: 'Pengembangan Diri',
  titleLine1: 'ATOMIC',
  titleLine2: 'HABITS',
  subtitle: 'Perubahan Kecil yang Memberikan Hasil Luar Biasa',
  author: 'James Clear',
  graphic: `
    <!-- Tiny Particles Forming Greater Ring -->
    <circle cx="0" cy="0" r="95" fill="none" stroke="#D9531E" stroke-width="3"/>
    <circle cx="0" cy="0" r="70" fill="#D9531E" fill-opacity="0.12"/>
    <!-- Atomic Nucleus & Orbiting Nodes -->
    <circle cx="0" cy="0" r="22" fill="#D9531E"/>
    <!-- Orbit 1 -->
    <ellipse cx="0" cy="0" rx="80" ry="32" fill="none" stroke="#15100C" stroke-width="2" transform="rotate(30)"/>
    <circle cx="65" cy="20" r="7" fill="#15100C"/>
    <!-- Orbit 2 -->
    <ellipse cx="0" cy="0" rx="80" ry="32" fill="none" stroke="#15100C" stroke-width="2" transform="rotate(-30)"/>
    <circle cx="-65" cy="20" r="7" fill="#D9531E"/>
    <!-- Orbit 3 -->
    <ellipse cx="0" cy="0" rx="80" ry="32" fill="none" stroke="#15100C" stroke-width="2" transform="rotate(90)"/>
    <circle cx="0" cy="-60" r="7" fill="#15100C"/>
  `
});

// 6. BOOK 4: Laut Bercerita
const bookLautBercerita = createBookSvg({
  bg1: '#0B2545',
  bg2: '#134074',
  accentColor: '#8DA9C4',
  textColor: '#EEF4F8',
  subColor: '#A4BFE0',
  category: 'Fiksi Populer',
  titleLine1: 'LAUT',
  titleLine2: 'BERCERITA',
  subtitle: 'Kisah Haru, Cinta, dan Keberanian Aktivis Mahasiswa',
  author: 'Leila S. Chudori',
  graphic: `
    <!-- Deep Ocean Artistic Waves -->
    <circle cx="0" cy="0" r="100" fill="#134074" fill-opacity="0.5"/>
    <path d="M -80 30 Q -40 -30 0 30 Q 40 90 80 30 L 80 80 L -80 80 Z" fill="#EEF4F8" fill-opacity="0.2"/>
    <path d="M -90 10 Q -45 -50 0 10 Q 45 70 90 10 L 90 80 L -90 80 Z" fill="#8DA9C4" fill-opacity="0.4"/>
    <path d="M -70 -20 Q -35 -70 0 -20 Q 35 30 70 -20 L 70 80 L -70 80 Z" fill="#0B2545"/>
    <!-- Solitary Wooden Boat Silhouette -->
    <path d="M -25 -35 Q 0 -45 25 -35 L 18 -20 L -18 -20 Z" fill="#EEF4F8"/>
    <line x1="0" y1="-38" x2="0" y2="-65" stroke="#EEF4F8" stroke-width="2"/>
    <polygon points="0,-65 20,-50 0,-40" fill="#EEF4F8" fill-opacity="0.8"/>
  `
});

// 7. BOOK 5: Sapiens
const bookSapiens = createBookSvg({
  bg1: '#C15C3D',
  bg2: '#7B2D19',
  accentColor: '#FDF0D5',
  textColor: '#FFFFFF',
  subColor: '#F5D0A9',
  category: 'Non-Fiksi Sejarah',
  titleLine1: 'SAPIENS',
  titleLine2: '',
  subtitle: 'Riwayat Singkat Umat Manusia dari Zaman Batu ke Era AI',
  author: 'Yuval Noah Harari',
  graphic: `
    <!-- Ancient Prehistoric Sun & Handprint Motif -->
    <circle cx="0" cy="0" r="90" fill="#FDF0D5" fill-opacity="0.15"/>
    <circle cx="0" cy="0" r="70" fill="#FDF0D5" fill-opacity="0.25"/>
    <!-- Prehistoric Palm Stencil Handprint Silhouette -->
    <ellipse cx="0" cy="15" rx="30" ry="35" fill="#FFFFFF"/>
    <rect x="-24" y="-35" width="8" height="35" rx="4" fill="#FFFFFF"/>
    <rect x="-10" y="-45" width="8" height="42" rx="4" fill="#FFFFFF"/>
    <rect x="4" y="-42" width="8" height="40" rx="4" fill="#FFFFFF"/>
    <rect x="18" y="-30" width="8" height="30" rx="4" fill="#FFFFFF"/>
    <path d="M -30 5 Q -45 10 -40 -10 Q -25 -5 -25 15" fill="#FFFFFF"/>
  `
});

// 8. BOOK 6: Metodologi Penelitian
const bookMetodologi = createBookSvg({
  bg1: '#1F3A3D',
  bg2: '#0F1E20',
  accentColor: '#68B0AB',
  textColor: '#E5F4F3',
  subColor: '#93C9C5',
  category: 'Buku Edukasi',
  titleLine1: 'METODOLOGI',
  titleLine2: 'PENELITIAN',
  subtitle: 'Panduan Praktis Penulisan Skripsi, Tesis, & Jurnal Ilmiah',
  author: 'Prof. Dr. Soepomo',
  graphic: `
    <!-- Academic Crest / Scholar Compass -->
    <circle cx="0" cy="0" r="100" fill="#68B0AB" fill-opacity="0.1"/>
    <circle cx="0" cy="0" r="80" fill="none" stroke="#68B0AB" stroke-width="2"/>
    <!-- Mortarboard Cap -->
    <polygon points="0,-40 60,-15 0,10 -60,-15" fill="#68B0AB"/>
    <path d="M -35 0 L -35 25 Q 0 45 35 25 L 35 0" fill="#E5F4F3" fill-opacity="0.2"/>
    <!-- Tassel -->
    <line x1="50" y1="-15" x2="65" y2="15" stroke="#E5F4F3" stroke-width="2"/>
    <circle cx="65" cy="18" r="4" fill="#E5F4F3"/>
  `
});

// Helper for News Articles (16:10 / 800x500)
function createNewsSvg(config) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="newsG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${config.bg1}"/>
      <stop offset="100%" stop-color="${config.bg2}"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" rx="12" fill="url(#newsG)"/>

  <!-- Graphical Elements -->
  <g transform="translate(620, 250)">
    ${config.graphic}
  </g>

  <!-- Content Overlay -->
  <rect x="50" y="60" width="140" height="32" rx="6" fill="#FAF7F2" fill-opacity="0.15"/>
  <text x="120" y="82" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="${config.accentColor}" letter-spacing="1.5">
    ${config.badge.toUpperCase()}
  </text>

  <text x="60" y="180" font-family="'Merriweather', serif" font-size="30" font-weight="bold" fill="#FAF7F2" width="500">
    ${config.titleLine1}
  </text>
  <text x="60" y="225" font-family="'Merriweather', serif" font-size="30" font-weight="bold" fill="#FAF7F2" width="500">
    ${config.titleLine2 || ''}
  </text>

  <text x="60" y="280" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#DED6C1" width="500">
    ${config.excerptLine1}
  </text>
  <text x="60" y="305" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#DED6C1" width="500">
    ${config.excerptLine2 || ''}
  </text>

  <line x1="60" y1="360" x2="550" y2="360" stroke="#FAF7F2" stroke-opacity="0.2" stroke-width="1"/>

  <text x="60" y="410" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="${config.accentColor}">
    Oleh ${config.author} • ${config.date}
  </text>
</svg>`;
}

// 9. NEWS 1: Festival Literasi & Pembukaan Abook Store Bogor Timur
const newsFestival = createNewsSvg({
  bg1: '#261F1A',
  bg2: '#3D352E',
  accentColor: '#EAA64C',
  badge: 'Kabar Toko',
  titleLine1: 'Abook Store Resmi Hadir di',
  titleLine2: 'Kawasan Bogor Timur',
  excerptLine1: 'Mendekatkan ribuan buku berkualitas dan murah untuk warga',
  excerptLine2: 'Cileungsi, Jonggol, Cibubur, dan sekitarnya.',
  author: 'Redaksi Abook',
  date: '10 November 2026',
  graphic: `
    <circle cx="0" cy="0" r="140" fill="#EAA64C" fill-opacity="0.1"/>
    <circle cx="0" cy="0" r="110" fill="none" stroke="#EAA64C" stroke-width="2" stroke-dasharray="8,8"/>
    <!-- Open Book Vector -->
    <path d="M -60 30 Q -10 10 0 20 Q 10 10 60 30 L 70 70 Q 15 50 0 60 Q -15 50 -70 70 Z" fill="#EAA64C"/>
    <!-- Sparkles -->
    <polygon points="0,-50 10,-20 40,-10 10,0 0,30 -10,0 -40,-10 -10,-20" fill="#FAF7F2"/>
  `
});

// 10. NEWS 2: Rekomendasi Buku Pengembangan Diri
const newsSelfImprovement = createNewsSvg({
  bg1: '#1F302B',
  bg2: '#111D1A',
  accentColor: '#52B788',
  badge: 'Resensi & Wawasan',
  titleLine1: '5 Buku Pengembangan Diri',
  titleLine2: 'Pilihan Kurator Abook Store',
  excerptLine1: 'Membangun kebiasaan produktif, fokus, dan kestabilan',
  excerptLine2: 'mental yang terbukti aplikatif sehari-hari.',
  author: 'Kurator Buku',
  date: '04 November 2026',
  graphic: `
    <circle cx="0" cy="0" r="130" fill="#52B788" fill-opacity="0.12"/>
    <!-- Growth Plant sprouting from open pages -->
    <path d="M 0 60 L 0 -40" stroke="#52B788" stroke-width="4"/>
    <path d="M 0 0 Q 30 -30 60 -10 Q 40 20 0 10" fill="#52B788"/>
    <path d="M 0 -20 Q -30 -50 -60 -30 Q -40 0 0 -10" fill="#74C69D"/>
    <!-- Sun -->
    <circle cx="50" cy="-60" r="20" fill="#FFEAA7"/>
  `
});

// 11. NEWS 3: Memilih Buku Cerita Anak
const newsChildren = createNewsSvg({
  bg1: '#3D2B3D',
  bg2: '#201620',
  accentColor: '#F39A9D',
  badge: 'Edukasi Literasi',
  titleLine1: 'Tips Memilih Buku Cerita Bergambar',
  titleLine2: 'Untuk Menumbuhkan Minat Anak',
  excerptLine1: 'Pendekatan visual hangat dan narasi interaktif agar',
  excerptLine2: 'si kecil gemar membaca sejak usia dini.',
  author: 'Tim Edukasi',
  date: '28 Oktober 2026',
  graphic: `
    <circle cx="0" cy="0" r="130" fill="#F39A9D" fill-opacity="0.12"/>
    <!-- Cute Hot Air Balloon -->
    <ellipse cx="0" cy="-30" rx="45" ry="55" fill="#F39A9D"/>
    <path d="M -45 -30 Q 0 40 45 -30" fill="#FFCCD5"/>
    <rect x="-15" y="45" width="30" height="20" rx="3" fill="#D4A373"/>
    <line x1="-10" y1="20" x2="-10" y2="45" stroke="#FAF7F2" stroke-width="2"/>
    <line x1="10" y1="20" x2="10" y2="45" stroke="#FAF7F2" stroke-width="2"/>
    <!-- Little Stars -->
    <circle cx="-60" cy="-70" r="4" fill="#FFEAA7"/>
    <circle cx="70" cy="-40" r="5" fill="#FFEAA7"/>
    <circle cx="-50" cy="20" r="3" fill="#FFEAA7"/>
  `
});

// Write all files
const files = [
  { name: 'hero-store.svg', content: heroStoreSvg },
  { name: 'about-store.svg', content: aboutStoreSvg },
  { name: 'book-filosofi-teras.svg', content: bookFilosofi },
  { name: 'book-bumi-manusia.svg', content: bookBumiManusia },
  { name: 'book-atomic-habits.svg', content: bookAtomicHabits },
  { name: 'book-laut-bercerita.svg', content: bookLautBercerita },
  { name: 'book-sapiens.svg', content: bookSapiens },
  { name: 'book-metodologi.svg', content: bookMetodologi },
  { name: 'news-festival.svg', content: newsFestival },
  { name: 'news-self-improvement.svg', content: newsSelfImprovement },
  { name: 'news-children-books.svg', content: newsChildren },
];

for (const f of files) {
  const filePath = path.join(outDir, f.name);
  fs.writeFileSync(filePath, f.content, 'utf8');
  console.log('Generated:', f.name);
}

console.log('All 11 local SVG images successfully generated in public/images/!');

