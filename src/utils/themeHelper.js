// Mapped CSS pastel colors based on Hungarian names in Excel
export const COLOR_PALETTES = {
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
  'éjsötét': '#D6DBDF'
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
           !k.includes('kvadrum');
  });
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return COLOR_PALETTES[randomKey];
}

// Resolve book page background (very soft pastel tinted warm off-white/törtfehér)
export function getPageBgColor(colArray) {
  if (!colArray || colArray.length === 0) return '#FAF7EE'; // default warm parchment
  const primary = colArray[0].toLowerCase().trim();
  if (primary.includes('rózsaszín') || primary.includes('vörös') || primary.includes('piros') || primary.includes('bordó')) {
    return '#FAF0EE'; // soft warm rose paper
  }
  if (primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr')) {
    return '#EFF2F6'; // soft cool tinted paper
  }
  if (primary.includes('zöld') || primary.includes('moh') || primary.includes('fű')) {
    return '#F0F4F0'; // soft sage green paper
  }
  if (primary.includes('sárga') || primary.includes('napfény') || primary.includes('arany') || primary.includes('borostyán') || primary.includes('bézs')) {
    return '#F6F2E2'; // elegant warm cream paper
  }
  if (primary.includes('barna') || primary.includes('tölgy')) {
    return '#F2EBE0'; // vintage linen/antique paper
  }
  if (primary.includes('szürke') || primary.includes('fekete') || primary.includes('sötét')) {
    return '#EDEDF1'; // soft slate paper
  }
  return '#FAF7EE'; // warm parchment paper
}

// Resolve book page text color (high contrast matching page tint)
export function getPageTextColor(colArray) {
  if (!colArray || colArray.length === 0) return '#231F1A';
  const primary = colArray[0].toLowerCase().trim();
  if (primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr')) {
    return '#152530'; // deep slate navy
  }
  if (primary.includes('zöld')) {
    return '#162816'; // deep dark green
  }
  return '#261F1A'; // deep charcoal warm brown
}

// Resolve accent color
export function getAccentColor(colArray) {
  if (!colArray || colArray.length === 0) return '#8c7ae6';
  const primary = colArray[0].toLowerCase().trim();
  if (primary.includes('rózsaszín') || primary.includes('vörös') || primary.includes('piros')) {
    return '#E57373';
  }
  if (primary.includes('kék') || primary.includes('azúr') || primary.includes('rendőr')) {
    return '#4FC3F7';
  }
  if (primary.includes('zöld')) {
    return '#81C784';
  }
  if (primary.includes('sárga') || primary.includes('arany') || primary.includes('napfény') || primary.includes('borostyán')) {
    return '#D4AC0D';
  }
  return '#8c7ae6';
}

// Apply chapter theme colors to document custom properties
export function applyChapterTheme(colors) {
  const colArray = colors || [];
  
  // Resolve colors or use fallbacks
  const c1 = COLOR_PALETTES[colArray[0]?.toLowerCase().trim()] || DEFAULT_BG_1;
  const c2 = COLOR_PALETTES[colArray[1]?.toLowerCase().trim()] || COLOR_PALETTES[colArray[0]?.toLowerCase().trim()] || DEFAULT_BG_2;
  const c3 = COLOR_PALETTES[colArray[2]?.toLowerCase().trim()] || DEFAULT_BG_3;

  const root = document.documentElement;
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
