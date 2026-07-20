/**
 * Preview document loader for localhost / secret advertising ideas & teasers.
 * Supports Hash routes like: #/preview/interju or #/preview/miss-mary-stewart
 */

// Dynamically discover any json preview files inside /preview/ directory at build/dev time
const globPreviews = import.meta.glob('/preview/**/*.json', { eager: true });

export function getPreviewDocument(docName) {
  if (!docName) return null;
  
  const cleanName = docName.toLowerCase().replace(/^\/+|\/+$/g, '');

  // 1. Check glob matching
  for (const path in globPreviews) {
    const fileName = path.split('/').pop().replace(/\.json$/, '').toLowerCase();
    if (fileName === cleanName) {
      const module = globPreviews[path];
      return module.default || module;
    }
  }

  return null;
}

export async function fetchPreviewDocument(docName) {
  // Try sync glob match first
  const staticDoc = getPreviewDocument(docName);
  if (staticDoc) return staticDoc;

  // Try dynamic fetch from localhost preview folder
  const cleanName = docName.toLowerCase().replace(/^\/+|\/+$/g, '');
  const possiblePaths = [
    `/preview/html/${cleanName}.json`,
    `/preview/${cleanName}.json`,
    `/preview/html/${cleanName}.html`,
    `/preview/${cleanName}.html`
  ];

  for (const url of possiblePaths) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        if (url.endsWith('.json')) {
          return await res.json();
        } else {
          // Parse HTML paragraphs
          const htmlText = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');
          const paragraphs = Array.from(doc.querySelectorAll('p, div, li'))
            .map(p => p.textContent.trim())
            .filter(Boolean);

          return {
            title: doc.title || cleanName,
            author: 'Anton Martin',
            subtitle: 'Preview Dokumentum',
            paragraphs: paragraphs.length > 0 ? paragraphs : [htmlText],
            theme: {
              bgColor1: '#ffd1dc',
              bgColor2: '#e8f0fe',
              bgColor3: '#fff9c4',
              pageBg: '#fffbf5',
              pageText: '#2f2a24',
              accentColor: '#8c7ae6'
            },
            shapes: ['könyv', 'toll']
          };
        }
      }
    } catch {
      // Continue to next path
    }
  }

  return null;
}
