import React, { useState } from 'react';
import './LandingPage.css';

export default function LandingPage({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 600); // match transition duration in CSS
  };

  return (
    <div className={`landing-container ${isExiting ? 'is-exiting' : ''}`}>
      <div className="landing-content" onClick={handleClick} title="Belépés">
        <span className="landing-author">Anton Martin</span>
        <h1 className="landing-title">
          <span className="word-neon">NEON</span>
          <span className="word-nights">NIGHTS</span>
        </h1>
        <p className="landing-cta">belépés</p>
      </div>
    </div>
  );
}
