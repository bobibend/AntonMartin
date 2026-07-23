import React, { useRef, useState, useEffect } from 'react';
import './LibraryPortal.css';

// Cookie Helper Utilities
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// UI Localization Dictionary
const TRANSLATIONS = {
  HU: {
    library: "Könyvtár",
    clickCover: "Kattints a borítóra az olvasás megkezdéséhez",
    support: "támogatás",
    supportTitle: "Író támogatása (Ko-fi)",
    soon: "Hamarosan elérhető",
    planned: "Tervezett",
    crimesSummary: "A Neon Nights - Crimes Amanda és Jessica fiatalkorát mutatja be az intézeti évektől a Neon Nightsban történt eseményekig bezárólag.",
    escapeSummary: "A Neon Nights - Escape Amanda Martinez-klánnál töltött időszakát meséli el, miközben Jessica a Neon Nights megbuktatásán dolgozik.",
    readTitle: "Olvasás megkezdése",
    downloadPdf: "Letöltés PDF formátumban",
    downloadEpub: "Letöltés EPUB formátumban",
    ageTitle: "Kizárólag 18 éven felülieknek",
    ageText: "A Neon Nights egy felnőtt tartalmú bűnügyi történet. A folytatáshoz kérjük, erősítsd meg, hogy betöltötted a 18. életévedet.",
    ageConfirm: "Belépek (elmúltam 18)",
    ageDecline: "Mégsem"
  },
  EN: {
    library: "Library",
    clickCover: "Click on the cover to start reading",
    support: "support",
    supportTitle: "Support the author (Ko-fi)",
    soon: "Coming soon",
    planned: "Planned",
    crimesSummary: "Neon Nights - Crimes covers the youth of Amanda and Jessica from their institutional years up to the events in Neon Nights.",
    escapeSummary: "Neon Nights - Escape tells the story of Amanda's time with the Martinez clan, while Jessica works on taking down the Neon Nights.",
    readTitle: "Start reading",
    downloadPdf: "Download in PDF format",
    downloadEpub: "Download in EPUB format",
    ageTitle: "For Adults Only (18+)",
    ageText: "Neon Nights is a crime story with adult content. To proceed, please confirm that you are at least 18 years of age.",
    ageConfirm: "Enter (I am 18+)",
    ageDecline: "Cancel"
  }
};

export default function LibraryPortal({ onLaunchReader, onStartReading, bookTitle, author, isBlurred, language, onLanguageChange }) {
  const centerVideoRef = useRef(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  useEffect(() => {
    const el = centerVideoRef.current;
    if (el && window.innerWidth <= 768) {
      el.play().catch(err => {
        console.log("Autoplay on touch device failed/blocked:", err);
      });
    }
  }, []);

  const handleCenterEnter = () => {
    setCenterHovered(true);
    if (centerVideoRef.current) {
      centerVideoRef.current.currentTime = 0;
      centerVideoRef.current.play().catch(err => {
        console.log("Video playback interrupted or blocked:", err);
      });
    }
  };

  const handleCenterLeave = () => {
    setCenterHovered(false);
    if (centerVideoRef.current) {
      centerVideoRef.current.pause();
      centerVideoRef.current.currentTime = 0;
    }
  };

  const handleLaunchClick = () => {
    setIsExiting(true);
    if (onStartReading) {
      onStartReading();
    }
    setTimeout(() => {
      onLaunchReader();
    }, 420);
  };

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.hash = '#/portal';
    }, 420);
  };

  const handleBookClick = () => {
    if (getCookie('nn-age-verified') === 'true') {
      handleLaunchClick();
    } else {
      setShowAgeGate(true);
    }
  };

  const handleConfirmAge = () => {
    setCookie('nn-age-verified', 'true', 30); // Store for 30 days
    setShowAgeGate(false);
    handleLaunchClick();
  };

  return (
    <div className={`library-portal-container no-click-paging ${isExiting ? 'is-exiting' : ''} ${isBlurred ? 'is-blurred-for-landing' : ''}`}>
      {/* Stylish Back Button */}
      <button className="library-back-btn" onClick={handleBackClick} title={language === 'EN' ? "Back to Selection Portal" : "Vissza a választóoldalra"}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* Dynamic Language Selector Toggle (Symmetric Left positioning) */}
      <div className="library-lang-selector">
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


      <div className="library-header">
        <h1 className="library-title">{t.library}</h1>
        <p className="library-subtitle">{t.clickCover}</p>
      </div>

      <div className="library-grid">
        {/* Left Book: Crimes (Locked) */}
        <div className="book-card book-locked book-crimes" title={t.soon}>
          <div className="book-card-cover-wrapper placeholder-cover">
            <div className="book-cover-text">
              <span className="placeholder-series">Neon Nights</span>
              <span className="placeholder-sub">- Crimes -</span>
            </div>
            <div className="book-summary-overlay">
              <span className="book-summary-badge">{t.planned}</span>
              <p className="book-summary-text">
                {t.crimesSummary}
              </p>
            </div>
          </div>
          <div className="book-card-info">
            <h3 className="book-card-title">Neon Nights - Crimes</h3>
            <div className="book-card-meta">
              <span className="book-card-author">{author}</span>
              <span className="book-card-badge-18">18+</span>
            </div>
          </div>
        </div>

        {/* Center Book: Investigation (Active) */}
        <div 
          className="book-card book-active book-investigation"
          onMouseEnter={handleCenterEnter}
          onMouseLeave={handleCenterLeave}
          onClick={handleBookClick}
          title={t.readTitle}
        >
          <div className="book-card-cover-wrapper">
            {/* Static Image Cover */}
            <img 
              src="/cover/Cover.webp" 
              alt={bookTitle} 
              className="book-static-cover"
            />

            {/* Video Cover (plays on hover) */}
            <video 
              ref={centerVideoRef}
              src="/cover/Cover.mp4"
              className={`book-hover-video ${centerHovered ? 'fade-in' : ''}`}
              loop
              muted
              playsInline
            />
          </div>

          <div className="book-card-info">
            <h3 className="book-card-title">{bookTitle}</h3>
            <div className="book-card-meta">
              <span className="book-card-author">{author}</span>
              <span className="book-card-badge-18">18+</span>
            </div>
            
            {/* E-book downloads */}
            <div className="book-card-downloads" onClick={(e) => e.stopPropagation()}>
              <a 
                href="/ebook/Neon Nights.pdf" 
                download="Anton Martin - Neon Nights - Investigation.pdf"
                className="download-link-btn"
                title={t.downloadPdf}
              >
                <span>PDF</span>
              </a>
              <a 
                href="/ebook/Neon Nights.epub" 
                download="Anton Martin - Neon Nights - Investigation.epub"
                className="download-link-btn"
                title={t.downloadEpub}
              >
                <span>EPUB</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Book: Escape (Locked) */}
        <div className="book-card book-locked book-escape" title={t.soon}>
          <div className="book-card-cover-wrapper placeholder-cover">
            <div className="book-cover-text">
              <span className="placeholder-series">Neon Nights</span>
              <span className="placeholder-sub">- Escape -</span>
            </div>
            <div className="book-summary-overlay">
              <span className="book-summary-badge">{t.planned}</span>
              <p className="book-summary-text">
                {t.escapeSummary}
              </p>
            </div>
          </div>
          <div className="book-card-info">
            <h3 className="book-card-title">Neon Nights - Escape</h3>
            <div className="book-card-meta">
              <span className="book-card-author">{author}</span>
              <span className="book-card-badge-18">18+</span>
            </div>
          </div>
        </div>
      </div>



      {/* Age Gate Modal Overlay */}
      {showAgeGate && (
        <div className="age-gate-backdrop">
          <div className="age-gate-modal">
            <h2 className="age-gate-title">{t.ageTitle}</h2>
            <p className="age-gate-text">
              {t.ageText}
            </p>
            <div className="age-gate-actions">
              <button className="age-gate-btn btn-confirm" onClick={handleConfirmAge}>
                {t.ageConfirm}
              </button>
              <button className="age-gate-btn btn-decline" onClick={() => setShowAgeGate(false)}>
                {t.ageDecline}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
