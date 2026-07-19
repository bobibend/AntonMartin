import React, { useMemo } from 'react';
import { SHAPE_SVGS, mapShapeToSvgKey } from '../constants/shapes';
import './BackgroundLayer.css';

export default function BackgroundLayer({ shapes, hideTitle }) {
  const particles = useMemo(() => {
    if (!shapes || shapes.length === 0) return [];
    
    return Array.from({ length: 24 }).map((_, index) => {
      const randomShape = shapes[index % shapes.length];
      const svgKey = mapShapeToSvgKey(randomShape, index);
      
      const size = Math.floor(Math.random() * 15) + 16; // 16px - 31px
      const left = Math.random() * 100; // 0% - 100%
      const delay = Math.random() * -30; // Negative delay to start immediately
      const duration = Math.floor(Math.random() * 18) + 18; // 18s - 36s
      const drift = Math.floor(Math.random() * 100) - 50; // -50px to 50px horizontal drift
      const rotation = Math.floor(Math.random() * 360);
      
      return {
        id: index,
        svgKey,
        size,
        left,
        delay,
        duration,
        drift,
        rotation
      };
    });
  }, [shapes]);

  return (
    <div className="background-container">
      {/* Layer 1: Orb Mesh Gradients */}
      <div className="gradient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Layer 2: Subtle Grid Pattern overlay */}
      <div className="grid-overlay" />

      {/* Pop Art Title behind particles */}
      {!hideTitle && (
        <div className="pop-art-title-container">
          {/* Desktop version: split to left and right edges */}
          <div className="pop-art-desktop-split">
            <div className="pop-art-side pop-art-left">
              <span className="title-word neon-word neon-left">NE</span>
              <span className="title-word nights-word nights-left">NIG</span>
            </div>
            <div className="pop-art-side pop-art-right">
              <span className="title-word neon-word neon-right">ON</span>
              <span className="title-word nights-word nights-right">HTS</span>
            </div>
          </div>

          {/* Tablet/Mobile version: unified, centered, pushed to the top */}
          <div className="pop-art-tablet-mobile">
            <div className="pop-art-centered-title">
              <span className="title-word neon-word neon-centered">NEON</span>
              <span className="title-word nights-word nights-centered">NIGHTS</span>
            </div>
          </div>
        </div>
      )}

      {/* Layer 3: Floating Refined Symbols (Atmosphere) */}
      <div className="floating-symbols-container">
        {particles.map((p) => (
          <svg
            key={p.id}
            className="floating-particle"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift-x': `${p.drift}px`,
              transform: `rotate(${p.rotation}deg)`
            }}
          >
            {SHAPE_SVGS[p.svgKey] || SHAPE_SVGS.default}
          </svg>
        ))}
      </div>
      
      {/* Noise overlay for premium paper/glass feel */}
      <div className="noise-overlay" />
    </div>
  );
}
