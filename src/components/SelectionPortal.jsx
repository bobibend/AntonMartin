import React, { useState } from 'react';
import './SelectionPortal.css';

const TRANSLATIONS = {
  HU: {
    title: "Anton Martin",
    neonNightsTitle: "Neon Nights",
    neonNightsSummary: "Több évvel ezelőtt a csillogó Love City díszletei között egy sötét szervezet tevékenykedett. Amanda Evans ügyésznő a múlt nyomába ered, hogy saját terepén, a tárgyalóteremben győzze le előző élete démonjait.",
    otherWritingsTitle: "Egyéb írások",
    otherWritingsSummary: "Anton Martin egyéb írásai, jelenleg feltöltés alatt.",
    uploadingStatus: "Feltöltés alatt...",
    modalTitle: "Hamarosan...",
    modalText: "Ez a szekció jelenleg feltöltés alatt áll.",
    modalClose: "Rendben",
    contactText: "Kapcsolat:"
  },
  EN: {
    title: "Anton Martin",
    neonNightsTitle: "Neon Nights",
    neonNightsSummary: "Years ago, behind the glamorous scenes of Love City, a dark organization operated. Prosecutor Amanda Evans follows the trail of the past to defeat the demons of her previous life on her own turf, the courtroom.",
    otherWritingsTitle: "Other Writings",
    otherWritingsSummary: "Other writings by Anton Martin, currently uploading.",
    uploadingStatus: "Upload in progress...",
    modalTitle: "Coming soon...",
    modalText: "This section is currently under construction.",
    modalClose: "Got it",
    contactText: "Contact:"
  }
};

export default function SelectionPortal({ language, onLanguageChange, onSelectNeonNights, isBlurred }) {
  const [showModal, setShowModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  const handleNeonNightsClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onSelectNeonNights();
    }, 420);
  };

  return (
    <div className={`selection-portal-container ${isExiting ? 'is-exiting' : ''} ${isBlurred ? 'is-blurred-for-landing' : ''}`}>
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

          {/* Other Writings Tile (Locked / Feltöltés alatt) */}
          <div className="selection-card other-writings-card" onClick={() => setShowModal(true)}>
            <div className="selection-card-image-wrapper placeholder-wrapper">
              <div className="selection-cover-text">
                <span className="selection-placeholder-sub">{t.uploadingStatus}</span>
              </div>
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
