import React from 'react';
import './TableOfContents.css';

// UI Localization Dictionary
const TRANSLATIONS = {
  HU: {
    toc: "Tartalomjegyzék",
    bookmark: "Könyvjelző: ",
    back: "Vissza a könyvtárhoz",
    fontSize: "Betűméret",
    decFontSize: "Betűméret csökkentése",
    incFontSize: "Betűméret növelése"
  },
  EN: {
    toc: "Table of Contents",
    bookmark: "Bookmark: ",
    back: "Back to Library",
    fontSize: "Font Size",
    decFontSize: "Decrease font size",
    incFontSize: "Increase font size"
  }
};

export default function TableOfContents({
  chapters,
  currentChapterIndex,
  isOpen,
  onClose,
  onSelectChapter,
  bookmarks,
  fontSize,
  onFontSizeChange,
  onBackToLibrary,
  language = 'HU'
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`toc-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className={`toc-drawer ${isOpen ? 'is-open' : ''}`}>
        <header className="toc-header">
          <div className="toc-title-group">
            <h2 className="toc-title">{t.toc}</h2>
            <p className="toc-subtitle">Neon Nights &bull; Anton Martin</p>
          </div>
          <button 
            className="toc-close-btn" 
            onClick={onClose}
            aria-label="Close Table of Contents"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <nav className="toc-list">
          {chapters.map((ch) => {
            const isActive = ch.index === currentChapterIndex;
            const isBookmarked = bookmarks && bookmarks[ch.index] !== undefined;
            const isIntro = ch.title === "Bevezetés" || ch.title === "Introduction";
            return (
              <button
                key={ch.index}
                className={`toc-item ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  onSelectChapter(ch.index);
                  onClose();
                }}
              >
                <div className="toc-item-number">
                  {isIntro ? "★" : ch.index}
                </div>
                <div className="toc-item-content">
                  <div className="toc-item-title">{ch.title}</div>
                </div>
                {isBookmarked && (() => {
                  const chTotalChars = ch.paragraphs.join('\n').length;
                  const pct = chTotalChars > 0 ? (bookmarks[ch.index] / chTotalChars) * 100 : 0;
                  return (
                    <div className="toc-item-bookmark" title={`${t.bookmark}${pct.toFixed(0)}%`}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--accent-color)" stroke="none">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                  );
                })()}
                {isActive && <div className="toc-active-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Font size settings inside drawer footer */}
        <footer className="toc-footer no-click-paging">
          <button 
            className="toc-library-btn"
            onClick={onBackToLibrary}
            title={t.back}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{t.back}</span>
          </button>

          <div className="toc-font-settings">
            <span className="toc-font-label">{t.fontSize}</span>
            <div className="toc-font-controls">
              <button 
                className="toc-font-btn"
                onClick={() => onFontSizeChange(Math.max(14, fontSize - 1))}
                disabled={fontSize <= 14}
                title={t.decFontSize}
              >
                A-
              </button>
              
              <input 
                type="range" 
                min="14" 
                max="26" 
                value={fontSize} 
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="toc-font-slider"
                title={`${t.fontSize}: ${fontSize}px`}
              />
              
              <button 
                className="toc-font-btn"
                onClick={() => onFontSizeChange(Math.min(26, fontSize + 1))}
                disabled={fontSize >= 26}
                title={t.incFontSize}
              >
                A+
              </button>
              <span className="toc-font-value">{fontSize}px</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
