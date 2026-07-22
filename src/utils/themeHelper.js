// Mapped CSS pastel colors based on Hungarian and English names
export const COLOR_PALETTES = {
  // Hungarian names
  'fehér': '#FDFDFD',
  'rózsaszín': '#FFD1DC',
  'vörös': '#FFB7B2',
  'hideg kék': '#D4E6F1',
  'hidegkék': '#D4E6F1',
  'sötétkék': '#AEB6BF',
  'szürke': '#E5E7E9',
  'halványsárga': '#FEF9E7',
  'napfény': '#FCF3CF',
  'ködös szürke': '#EAEDED',
  'arany': '#FDEBD0',
  'piros': '#FADBD8',
  'halványszürke': '#F2F3F4',
  'azúrkék': '#E0F7FA',
  'azúrkek': '#E0F7FA',
  'világoskék': '#E1F5FE',
  'mohazöld': '#E8F8F5',
  'sötétszürke': '#D5D8DC',
  'barna': '#EDBB99',
  'fekete': '#ABB2B9',
  'haragos zöld': '#D5F5E3',
  'kék': '#EBF5FB',
  'halványkék': '#E0F2F1',
  'fűzöld': '#E8F8F5',
  'rendőrkék': '#E8EAF6',
  'világosszürke': '#F4F6F6',
  'világosszükre': '#F4F6F6',
  'halványbarna': '#F5CBA7',
  'halvány borostyán': '#FCF3CF',
  'sötét': '#AEB6BF',
  'kvadrum': '#E5E8E8',
  'halványbordó': '#FADBD8',
  'meleg fehér': '#FEFDE8',
  'zöld': '#EAFAF1',
  'bézs': '#F5F5DC',
  'aranysárga': '#FCF3CF',
  'sárga': '#FCF3CF',
  'tölgybarna': '#D7CCC8',
  'lila': '#EBDEF0',
  'kékesszürke': '#E5E8E8',
  'élénk napfény': '#FCF3CF',
  'kadmiumsárga': '#FCF3CF',
  'márvány': '#EAEDED',
  'éjsötét': '#D6DBDF',

  // English names
  'white': '#FDFDFD',
  'pink': '#FFD1DC',
  'red': '#FFB7B2',
  'cold blue': '#D4E6F1',
  'dark blue': '#AEB6BF',
  'gray': '#E5E7E9',
  'pale yellow': '#FEF9E7',
  'sunlight': '#FCF3CF',
  'misty gray': '#EAEDED',
  'gold': '#FDEBD0',
  'pale gray': '#F2F3F4',
  'azure blue': '#E0F7FA',
  'light blue': '#E1F5FE',
  'moss green': '#E8F8F5',
  'dark gray': '#D5D8DC',
  'brown': '#EDBB99',
  'black': '#ABB2B9',
  'angry green': '#D5F5E3',
  'blue': '#EBF5FB',
  'pale blue': '#E0F2F1',
  'grass green': '#E8F8F5',
  'police blue': '#E8EAF6',
  'light gray': '#F4F6F6',
  'pale brown': '#F5CBA7',
  'light brown': '#F5CBA7',
  'pale amber': '#FCF3CF',
  'dark': '#AEB6BF',
  'quadrum': '#E5E8E8',
  'pale burgundy': '#FADBD8',
  'warm white': '#FEFDE8',
  'green': '#EAFAF1',
  'beige': '#F5F5DC',
  'golden yellow': '#FCF3CF',
  'yellow': '#FCF3CF',
  'oak brown': '#D7CCC8',
  'purple': '#EBDEF0',
  'blue-gray': '#E5E8E8',
  'bright sunlight': '#FCF3CF',
  'cadmium yellow': '#FCF3CF',
  'marble': '#EAEDED',
  'pitch black': '#D6DBDF'
};

// Fallback palette constants
export const DEFAULT_BG_1 = '#ffd1dc';
export const DEFAULT_BG_2 = '#e8f0fe';
export const DEFAULT_BG_3 = '#fff9c4';

// Helper to get a random vibrant color from COLOR_PALETTES
export function getRandomVibrantColor() {
  const keys = Object.keys(COLOR_PALETTES).filter(key => {
    const k = key.toLowerCase();
    return !k.includes('fehér') && 
           !k.includes('szürke') && 
           !k.includes('szükre') && 
           !k.includes('fekete') && 
           !k.includes('sötét') && 
           !k.includes('köd') && 
           !k.includes('márvány') && 
           !k.includes('kvadrum') &&
           !k.includes('white') &&
           !k.includes('gray') &&
           !k.includes('black') &&
           !k.includes('dark') &&
           !k.includes('misty') &&
           !k.includes('marble') &&
           !k.includes('quadrum');
  });
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return COLOR_PALETTES[randomKey];
}

// Resolve book page background (very soft pastel tinted warm off-white)
export function getPageBgColor(colArray) {
  if (!Array.isArray(colArray) || colArray.length === 0 || typeof colArray[0] !== 'string') return '#FAF7EE'; // default warm parchment
  const primary = colArray[0].toLowerCase().trim();
  if (
    primary.includes('rózsaszín') || primary.includes('vörös') || primary.includes('piros') || primary.includes('bordó') ||
    primary.includes('pink') || primary.includes('red') || primary.includes('burgundy')
  ) {
    return '#FAF0EE'; // soft warm rose paper
  }
  if (
    primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr') ||
    primary.includes('blue') || primary.includes('azure') || primary.includes('police')
  ) {
    return '#EFF2F6'; // soft cool tinted paper
  }
  if (
    primary.includes('zöld') || primary.includes('moh') || primary.includes('fű') ||
    primary.includes('green') || primary.includes('moss') || primary.includes('grass')
  ) {
    return '#F0F4F0'; // soft sage green paper
  }
  if (
    primary.includes('sárga') || primary.includes('napfény') || primary.includes('arany') || primary.includes('borostyán') || primary.includes('bézs') ||
    primary.includes('yellow') || primary.includes('sunlight') || primary.includes('gold') || primary.includes('amber') || primary.includes('beige')
  ) {
    return '#F6F2E2'; // elegant warm cream paper
  }
  if (
    primary.includes('barna') || primary.includes('tölgy') ||
    primary.includes('brown') || primary.includes('oak')
  ) {
    return '#F2EBE0'; // vintage linen/antique paper
  }
  if (
    primary.includes('szürke') || primary.includes('fekete') || primary.includes('sötét') ||
    primary.includes('gray') || primary.includes('black') || primary.includes('dark') || primary.includes('misty') || primary.includes('pitch')
  ) {
    return '#EDEDF1'; // soft slate paper
  }
  return '#FAF7EE'; // warm parchment paper
}

// Resolve book page text color (high contrast matching page tint)
export function getPageTextColor(colArray) {
  if (!Array.isArray(colArray) || colArray.length === 0 || typeof colArray[0] !== 'string') return '#231F1A';
  const primary = colArray[0].toLowerCase().trim();
  if (
    primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr') ||
    primary.includes('blue') || primary.includes('azure') || primary.includes('police')
  ) {
    return '#152530'; // deep slate navy
  }
  if (primary.includes('zöld') || primary.includes('green')) {
    return '#162816'; // deep dark green
  }
  return '#261F1A'; // deep charcoal warm brown
}

// Resolve accent color
export function getAccentColor(colArray) {
  if (!Array.isArray(colArray) || colArray.length === 0 || typeof colArray[0] !== 'string') return '#8c7ae6';
  const primary = colArray[0].toLowerCase().trim();
  if (
    primary.includes('rózsaszín') || primary.includes('vörös') || primary.includes('piros') ||
    primary.includes('pink') || primary.includes('red')
  ) {
    return '#E57373';
  }
  if (
    primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr') ||
    primary.includes('blue') || primary.includes('azure') || primary.includes('police')
  ) {
    return '#4FC3F7';
  }
  if (primary.includes('zöld') || primary.includes('green')) {
    return '#81C784';
  }
  if (
    primary.includes('sárga') || primary.includes('arany') || primary.includes('napfény') || primary.includes('borostyán') ||
    primary.includes('yellow') || primary.includes('gold') || primary.includes('sunlight') || primary.includes('amber')
  ) {
    return '#D4AC0D';
  }
  return '#8c7ae6';
}

// Apply chapter theme colors to document custom properties
export function applyChapterTheme(colors) {
  const root = document.documentElement;

  // Support direct theme object input (e.g. { bgColor1, bgColor2, pageBg, pageText, accentColor })
  if (colors && !Array.isArray(colors) && typeof colors === 'object') {
    root.style.setProperty('--bg-color-1', colors.bgColor1 || DEFAULT_BG_1);
    root.style.setProperty('--bg-color-2', colors.bgColor2 || DEFAULT_BG_2);
    root.style.setProperty('--bg-color-3', colors.bgColor3 || DEFAULT_BG_3);
    root.style.setProperty('--page-bg', colors.pageBg || '#FAF7EE');
    root.style.setProperty('--page-text', colors.pageText || '#231F1A');
    root.style.setProperty('--accent-color', colors.accentColor || '#8c7ae6');

    root.style.setProperty('--title-color-ne', getRandomVibrantColor());
    root.style.setProperty('--title-color-on', getRandomVibrantColor());
    root.style.setProperty('--title-color-nig', getRandomVibrantColor());
    root.style.setProperty('--title-color-hts', getRandomVibrantColor());
    return;
  }

  const colArray = Array.isArray(colors) ? colors : [];

  // Resolve colors or use fallbacks
  const primaryName = typeof colArray[0] === 'string' ? colArray[0].toLowerCase().trim() : '';
  const secondaryName = typeof colArray[1] === 'string' ? colArray[1].toLowerCase().trim() : '';
  const tertiaryName = typeof colArray[2] === 'string' ? colArray[2].toLowerCase().trim() : '';

  const c1 = COLOR_PALETTES[primaryName] || DEFAULT_BG_1;
  const c2 = COLOR_PALETTES[secondaryName] || COLOR_PALETTES[primaryName] || DEFAULT_BG_2;
  const c3 = COLOR_PALETTES[tertiaryName] || DEFAULT_BG_3;

  root.style.setProperty('--bg-color-1', c1);
  root.style.setProperty('--bg-color-2', c2);
  root.style.setProperty('--bg-color-3', c3);
  root.style.setProperty('--page-bg', getPageBgColor(colArray));
  root.style.setProperty('--page-text', getPageTextColor(colArray));
  root.style.setProperty('--accent-color', getAccentColor(colArray));
  
  // Randomly set colors for each of the 4 text blocks of the Pop Art title
  root.style.setProperty('--title-color-ne', getRandomVibrantColor());
  root.style.setProperty('--title-color-on', getRandomVibrantColor());
  root.style.setProperty('--title-color-nig', getRandomVibrantColor());
  root.style.setProperty('--title-color-hts', getRandomVibrantColor());
}
