import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

export default function CookieConsent({ language = 'HU' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a decision
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status) => {
    localStorage.setItem('cookie-consent', status);
    setIsVisible(false);

    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': status,
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
      });
    }
  };

  if (!isVisible) return null;

  const content = {
    HU: {
      title: 'Sütik használata',
      text: 'A webhely Google Analytics sütiket használ a látogatottsági statisztikák méréséhez. A gombok egyikére kattintva hozzájárulhatsz vagy elutasíthatod ezek használatát.',
      accept: 'Elfogadom',
      decline: 'Elutasítom',
    },
    EN: {
      title: 'Cookie Consent',
      text: 'This website uses Google Analytics cookies to measure traffic statistics. By clicking either button, you can consent to or decline their use.',
      accept: 'Accept',
      decline: 'Decline',
    },
  };

  const t = content[language] || content.HU;

  return (
    <div className="cookie-banner-container no-click-paging">
      <div className="cookie-banner-content">
        <h4 className="cookie-banner-title">{t.title}</h4>
        <p className="cookie-banner-text">{t.text}</p>
      </div>
      <div className="cookie-banner-actions">
        <button
          className="cookie-btn cookie-btn-decline"
          onClick={() => handleConsent('denied')}
        >
          {t.decline}
        </button>
        <button
          className="cookie-btn cookie-btn-accept"
          onClick={() => handleConsent('granted')}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
