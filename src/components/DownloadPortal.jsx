import React from 'react';
import './DownloadPortal.css';

const TRANSLATIONS = {
  HU: {
    downloadTitle: "Neon Nights Letöltés",
    downloadSubtitle: "Köszönjük a támogatást!",
    downloadPdfBtn: "Letöltés (PDF)",
    downloadEpubBtn: "Letöltés (EPUB)",
    backToLibrary: "Vissza a könyvtárba",
    authorLabel: "Szerző:"
  },
  EN: {
    downloadTitle: "Download Neon Nights",
    downloadSubtitle: "Thank you for your support!",
    downloadPdfBtn: "Download (PDF)",
    downloadEpubBtn: "Download (EPUB)",
    backToLibrary: "Back to Library",
    authorLabel: "Author:"
  }
};

export default function DownloadPortal({ bookTitle, author, language, onLanguageChange }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  const handleBackClick = () => {
    window.location.hash = '#/library';
  };

  return (
    <div className="download-portal-container">
      {/* Back Button */}
      <button className="download-back-btn" onClick={handleBackClick} title={t.backToLibrary}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* Language Selector */}
      <div className="download-lang-selector">
        <button 
          className={`lang-selector-btn ${language === 'HU' ? 'is-active' : ''}`}
          onClick={() => onLanguageChange('HU')}
        >
          HU
        </button>
        <button 
          className={`lang-selector-btn ${language === 'EN' ? 'is-active' : ''}`}
          onClick={() => onLanguageChange('EN')}
        >
          EN
        </button>
      </div>

      <div className="download-header">
        <h1 className="download-portal-title">{t.downloadTitle}</h1>
        <p className="download-portal-subtitle">{t.downloadSubtitle}</p>
      </div>

      <div className="download-card">
        <div className="download-cover-wrapper">
          <img 
            src="/cover/Cover.webp" 
            alt={bookTitle} 
            className="download-static-cover"
          />
        </div>
        
        <div className="download-info">
          <h2 className="download-book-title">{bookTitle}</h2>
          <p className="download-book-author">
            <span className="author-label">{t.authorLabel}</span> {author}
          </p>
          
          <div className="download-links-container">
            <a 
              href="/ebook/Neon Nights.pdf" 
              download="Anton Martin - Neon Nights - Investigation.pdf"
              className="download-action-btn pdf-btn"
              title={t.downloadPdfBtn}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>{t.downloadPdfBtn}</span>
            </a>
            <a 
              href="/ebook/Neon Nights.epub" 
              download="Anton Martin - Neon Nights - Investigation.epub"
              className="download-action-btn epub-btn"
              title={t.downloadEpubBtn}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>{t.downloadEpubBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
