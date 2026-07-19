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

export default function LibraryPortal({ onLaunchReader, bookTitle, author, isBlurred }) {
  const centerVideoRef = useRef(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);

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
    setTimeout(() => {
      onLaunchReader();
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
      {/* Floating Support Author Button (Ko-fi) */}
      <a 
        href="https://ko-fi.com/antonmartin" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="library-support-btn" 
        title="Író támogatása (Ko-fi)"
        aria-label="Support the author on Ko-fi"
      >
        <span className="support-btn-text">támogatás</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </a>

      <div className="library-header">
        <h1 className="library-title">Könyvtár</h1>
        <p className="library-subtitle">Kattints a borítóra az olvasás megkezdéséhez</p>
      </div>

      <div className="library-grid">
        {/* Left Book: Crimes (Locked) */}
        <div className="book-card book-locked book-crimes" title="Hamarosan elérhető">
          <div className="book-card-cover-wrapper placeholder-cover">
            <div className="book-cover-text">
              <span className="placeholder-series">Neon Nights</span>
              <span className="placeholder-sub">- Crimes -</span>
            </div>
            <div className="book-summary-overlay">
              <span className="book-summary-badge">Tervezett</span>
              <p className="book-summary-text">
                A Neon Nights - Crimes Amanda és Jessica fiatalkorát mutatja be az intézeti évektől a Neon Nightsban történt eseményekig bezárólag.
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
          title="Olvasás megkezdése"
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
                title="Letöltés PDF formátumban"
              >
                <span>PDF</span>
              </a>
              <a 
                href="/ebook/Neon Nights.epub" 
                download="Anton Martin - Neon Nights - Investigation.epub"
                className="download-link-btn"
                title="Letöltés EPUB formátumban"
              >
                <span>EPUB</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Book: Escape (Locked) */}
        <div className="book-card book-locked book-escape" title="Hamarosan elérhető">
          <div className="book-card-cover-wrapper placeholder-cover">
            <div className="book-cover-text">
              <span className="placeholder-series">Neon Nights</span>
              <span className="placeholder-sub">- Escape -</span>
            </div>
            <div className="book-summary-overlay">
              <span className="book-summary-badge">Tervezett</span>
              <p className="book-summary-text">
                A Neon Nights - Escape Amanda Martinez-klánnál töltött időszakát meséli el, miközben Jessica a Neon Nights megbuktatásán dolgozik.
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

      {/* Library Page Footer with Contact Email */}
      <div className="library-portal-footer">
        <span className="footer-separator"></span>
        <a href="mailto:iamantonmartin@gmail.com" className="library-contact-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          iamantonmartin@gmail.com
        </a>
      </div>

      {/* Age Gate Modal Overlay */}
      {showAgeGate && (
        <div className="age-gate-backdrop">
          <div className="age-gate-modal">

            <h2 className="age-gate-title">Kizárólag 18 éven felülieknek</h2>
            <p className="age-gate-text">
              A Neon Nights egy felnőtt tartalmú bűnügyi történet. A folytatáshoz kérjük, erősítsd meg, hogy betöltötted a 18. életévedet.
            </p>
            <div className="age-gate-actions">
              <button className="age-gate-btn btn-confirm" onClick={handleConfirmAge}>
                Belépek (elmúltam 18)
              </button>
              <button className="age-gate-btn btn-decline" onClick={() => setShowAgeGate(false)}>
                Mégsem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
