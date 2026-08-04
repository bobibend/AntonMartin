import React, { useState, useEffect } from 'react';
import './SelectionPortal.css';

const TRANSLATIONS = {
  HU: {
    title: "Anton Martin",
    neonNightsTitle: "Neon Nights",
    neonNightsSummary: "Több évvel ezelőtt a csillogó Love City díszletei között egy sötét szervezet tevékenykedett. Amanda Evans ügyésznő a múlt nyomába ered, hogy saját terepén, a tárgyalóteremben győzze le előző élete démonjait.",
    otherWritingsTitle: "Novellák",
    otherWritingsSummary: "Az elmúlt évek novellái.",
    uploadingStatus: "Olvasás",
    modalTitle: "Hamarosan...",
    modalText: "Ez a szekció jelenleg feltöltés alatt áll.",
    modalClose: "Rendben",
    contactText: "Kapcsolat:",
    support: "támogatás",
    supportTitle: "Író támogatása (Ko-fi)"
  },
  EN: {
    title: "Anton Martin",
    neonNightsTitle: "Neon Nights",
    neonNightsSummary: "Years ago, behind the glamorous scenes of Love City, a dark organization operated. Prosecutor Amanda Evans follows the trail of the past to defeat the demons of her previous life on her own turf, the courtroom.",
    otherWritingsTitle: "Short Stories",
    otherWritingsSummary: "Short stories from recent years.",
    uploadingStatus: "Read",
    modalTitle: "Coming soon...",
    modalText: "This section is currently under construction.",
    modalClose: "Got it",
    contactText: "Contact:",
    support: "support",
    supportTitle: "Support the author (Ko-fi)"
  }
};

export default function SelectionPortal({ language, onLanguageChange, onSelectNeonNights, isBlurred }) {
  const [showModal, setShowModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  useEffect(() => {
    if (isBlurred) {
      setIsExiting(false);
    }
  }, [isBlurred]);

  const handleNeonNightsClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onSelectNeonNights();
    }, 420);
  };

  const handleNovellakClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.hash = '#/novellak';
    }, 420);
  };

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.hash = '#/';
    }, 420);
  };

  return (
    <div className={`selection-portal-container ${isExiting ? 'is-exiting' : ''} ${isBlurred ? 'is-blurred-for-landing' : ''}`}>
      {/* Stylish Back Button */}
      <button className="selection-back-btn" onClick={handleBackClick} title={language === 'EN' ? "Back to Landing Page" : "Vissza a kezdőlapra"}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* Dynamic Language Selector Toggle */}
      <div className="selection-lang-selector">
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

      {/* Floating Support Author Button (Ko-fi) with Dropdown */}
      <div 
        className="selection-support-dropdown" 
        title={t.supportTitle}
      >
        <a 
          href="https://ko-fi.com/antonmartin" 
          target="_blank" 
          rel="noopener noreferrer"
          className="support-main-link-wrapper"
          aria-label="Support the author on Ko-fi"
        >
          <div className="support-trigger">
            <img src="/shop/01_Bronz.webp" alt="Bronz tier" className="support-icon-img" />
            <span className="support-btn-text">{t.support}</span>
          </div>
          
          {/* Static Bronz badge display under the button */}
          <div className="support-static-book">
            <img src="/shop/01_Bronz.webp" alt="Bronz tier" className="support-book-img" />
          </div>
        </a>

        <div className="support-dropdown-content">
          <a 
            href="https://ko-fi.com/s/920796b062" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="support-dropdown-item"
          >
            <img src="/shop/01_Bronz.webp" alt="Bronz tier" className="support-dropdown-img" />
            <span className="support-dropdown-text">Bronz</span>
          </a>
          <a 
            href="https://ko-fi.com/s/73495bae3f" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="support-dropdown-item"
          >
            <img src="/shop/02_Silver.webp" alt="Silver tier" className="support-dropdown-img" />
            <span className="support-dropdown-text">Silver</span>
          </a>
          <a 
            href="https://ko-fi.com/s/539f9608ee" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="support-dropdown-item"
          >
            <img src="/shop/03_Gold.webp" alt="Gold tier" className="support-dropdown-img" />
            <span className="support-dropdown-text">Gold</span>
          </a>
          <a 
            href="https://ko-fi.com/s/c346435c09" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="support-dropdown-item"
          >
            <img src="/shop/04_NeonNights_ebook.webp" alt="E-book tier" className="support-dropdown-img" />
            <span className="support-dropdown-text">e-book</span>
          </a>
        </div>
      </div>

      <div className="selection-portal-content">
        <div className="selection-header">
          <h1 className="selection-portal-title">{t.title}</h1>
        </div>

        <div className="selection-grid">
          {/* Neon Nights Book Tile */}
          <div className="selection-card neon-nights-card" onClick={handleNeonNightsClick}>
            <div className="selection-card-image-wrapper">
              <img 
                src="/cover/Neon_Nights_ikon.webp" 
                alt={t.neonNightsTitle} 
                className="selection-card-image"
              />
            </div>
            <div className="selection-card-info">
              <h2 className="selection-card-title">{t.neonNightsTitle}</h2>
              <p className="selection-card-summary">{t.neonNightsSummary}</p>
            </div>
          </div>

          {/* Novellák Book Tile */}
          <div className="selection-card other-writings-card" onClick={handleNovellakClick}>
            <div className="selection-card-image-wrapper">
              <img 
                src="/cover/Novellak_cover.webp" 
                alt={t.otherWritingsTitle} 
                className="selection-card-image"
              />
            </div>
            <div className="selection-card-info">
              <h2 className="selection-card-title">{t.otherWritingsTitle}</h2>
              <p className="selection-card-summary">{t.otherWritingsSummary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Page Footer with Contact Email */}
      <div className="selection-portal-footer">
        <span className="footer-separator"></span>
        <a href="mailto:iamantonmartin@gmail.com" className="selection-contact-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          iamantonmartin@gmail.com
        </a>
      </div>

      {/* Modal Dialog for Other Writings */}
      {showModal && (
        <div className="portal-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="portal-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="portal-modal-title">{t.modalTitle}</h2>
            <p className="portal-modal-text">{t.modalText}</p>
            <button className="portal-modal-btn" onClick={() => setShowModal(false)}>
              {t.modalClose}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
