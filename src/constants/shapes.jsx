import React from 'react';

// SVG shapes for Neon Nights motifs, refined based on author feedback
export const SHAPE_SVGS = {
  rozaszirom: (
    <path d="M12,21 C12,21 4,16 4,11 C4,6 7.5,3 12,3 C16.5,3 20,6 20,11 C20,16 12,21 12,21 Z" />
  ),
  cookie: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="9" r="1.2" fill="currentColor" />
      <circle cx="15" cy="8" r="1.5" fill="currentColor" />
      <circle cx="11" cy="13" r="1.2" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <circle cx="7" cy="15" r="1.3" fill="currentColor" />
    </g>
  ),
  lips: (
    <path d="M3,12 C5,8.5 8.5,8 12,9.5 C15.5,8 19,8.5 21,12 C18.5,15.5 15.5,16.5 12,15 C8.5,16.5 5.5,15.5 3,12 Z M3,12 C7,12.5 10,11.5 12,12.2 C14,11.5 17,12.5 21,12" />
  ),
  lips_open: (
    <g>
      {/* Partially open lips showing gap */}
      <path d="M3,10 Q12,5 21,10 Q12,9 3,10 Z" /> {/* Upper lip */}
      <path d="M3,14 Q12,19 21,14 Q12,13 3,14 Z" /> {/* Lower lip */}
      <path d="M5,11.5 Q12,12.5 19,11.5" opacity="0.3" /> {/* Inner mouth depth */}
    </g>
  ),
  lips_round: (
    <g>
      {/* Whistling/kissing round "O" lips */}
      <path d="M12,5 C8.5,5 7,8 7,12 C7,16 8.5,19 12,19 C15.5,19 17,16 17,12 C17,8 15.5,5 12,5 Z M12,8 C13.5,8 14.5,9.5 14.5,12 C14.5,14.5 13.5,16 12,16 C10.5,16 9.5,14.5 9.5,12 C9.5,9.5 10.5,8 12,8 Z" />
    </g>
  ),
  asztal: (
    <path d="M2,8 H22 V10 H20 V20 H18 V10 H6 V20 H4 V10 H2 Z" />
  ),
  jegyzet: (
    <path d="M5,4 H19 V20 H5 Z M8,8 H16 M8,12 H16 M8,16 H13" strokeWidth="1.5" strokeLinecap="round" />
  ),
  cigaretta: (
    <g>
      <rect x="2" y="9.5" width="16" height="5" rx="0.5" />
      <rect x="18" y="9.5" width="4" height="5" fill="currentColor" opacity="0.6" rx="0.5" />
      <path d="M2,12 H5" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  drop: (
    <path d="M12,3 C12,3 6,10 6,14 A6,6 0 0,0 18,14 C18,10 12,3 12,3 Z" />
  ),
  sweat_drop: (
    <path d="M12,6.6 C12,6.6 8.4,10.8 8.4,13.2 A3.6,3.6 0 0,0 15.6,13.2 C15.6,10.8 12,6.6 12,6.6 Z" />
  ),
  semen_droplet: (
    <path d="M12,2 C12,2 9,12 9,17 A3,3 0 0,0 15,17 C15,12 12,2 12,2 Z" />
  ),
  changing_cabin: (
    <g>
      <rect x="4" y="3" width="16" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1" />
      <path d="M4,6 Q10,12 5,21 M6,6 Q12,12 7,21" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M14,9 L12,11 L10,9 Z M12,8.5 V9" fill="none" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  towel: (
    <g>
      <path d="M3,5 V8 H4 M21,5 V8 H20" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="6" y="6" width="12" height="12" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9" y1="8" x2="9" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="12" y1="8" x2="12" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="8" x2="15" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="7" y1="18" x2="7" y2="19.5" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="18" x2="9" y2="19.5" stroke="currentColor" strokeWidth="1" />
      <line x1="11" y1="18" x2="11" y2="19.5" stroke="currentColor" strokeWidth="1" />
      <line x1="13" y1="18" x2="13" y2="19.5" stroke="currentColor" strokeWidth="1" />
      <line x1="15" y1="18" x2="15" y2="19.5" stroke="currentColor" strokeWidth="1" />
      <line x1="17" y1="18" x2="17" y2="19.5" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  parted_legs: (
    <g>
      {/* Voluptuous plum shape representing buttocks cheeks with larger curvature */}
      <path d="M12,4.5 C6.5,4.5 3,8.5 3,14 C3,19 7,22 12,22 C17,22 21,19 21,14 C21,8.5 17.5,4.5 12,4.5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Center cleft line */}
      <line x1="12" y1="4.5" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Stem */}
      <path d="M12,4.5 Q10.5,2 9,2.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Leaf */}
      <path d="M10,2.7 C9,1.5 7.5,1.7 7.5,1.7 C7.5,1.7 8.2,3.3 10,2.7 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
    </g>
  ),
  dress: (
    <path d="M8,3 L10,5 L8.5,8 L6,14 L7,21 H17 L18,14 L15.5,8 L14,5 L16,3 Z M10,5 H14 L12,8 Z" />
  ),
  skirt: (
    <path d="M8,5 H16 L19,19 H5 Z" />
  ),
  white_coat: (
    <g>
      {/* Detailed long Doctor's White Coat (fehér köpeny) with lapels, pockets, pen pocket and long sleeves */}
      {/* Torso & coat skirt extending to y=22 */}
      <path d="M7,4.5 H17 V22 H7 Z" />
      {/* Sleek long sleeves */}
      <path d="M7,5 L4,13 H5.8 L7.2,7.5 Z" />
      <path d="M17,5 L20,13 H18.2 L16.8,7.5 Z" />
      {/* Open collar lapels */}
      <path d="M8,4.5 L12,9 L10,4.5 Z" fill="var(--page-bg)" stroke="none" />
      <path d="M16,4.5 L12,9 L14,4.5 Z" fill="var(--page-bg)" stroke="none" />
      {/* Front seam line */}
      <line x1="12" y1="9" x2="12" y2="22" stroke="var(--page-bg)" strokeWidth="1" />
      {/* Side pockets */}
      <rect x="8.5" y="15" width="2" height="2" rx="0.2" fill="var(--page-bg)" stroke="none" />
      <rect x="13.5" y="15" width="2" height="2" rx="0.2" fill="var(--page-bg)" stroke="none" />
      {/* Breast pocket with a pen clip */}
      <rect x="8.5" y="10" width="1.8" height="2" rx="0.2" fill="var(--page-bg)" stroke="none" />
      <line x1="9.4" y1="9.5" x2="9.4" y2="10.8" stroke="currentColor" strokeWidth="0.8" />
    </g>
  ),
  police_uniform: (
    <g>
      {/* Refined Police Uniform: cap at top, long-sleeved shirt with collar in middle, trousers at bottom */}
      {/* 1. Police Cap (y=1 to y=5) */}
      {/* Crown */}
      <path d="M6,3 C6,3 12,0 18,3 L16.5,5.2 H7.5 Z" />
      {/* Visor */}
      <path d="M8,5.2 Q12,7 16,5.2" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Cap badge */}
      <path d="M12,2 L13,3 L12,4 L11,3 Z" fill="var(--page-bg)" stroke="none" />
 
      {/* 2. Shirt / Coat (y=6 to y=14) */}
      {/* Shoulder epaulets */}
      <line x1="7.2" y1="6" x2="9" y2="6.5" strokeWidth="1" />
      <line x1="16.8" y1="6" x2="15" y2="6.5" strokeWidth="1" />
      {/* Shirt torso */}
      <path d="M9,6 H15 V14 H9 Z" />
      {/* Long sleeves */}
      <path d="M9,6.2 C7.5,8 7,11 7,13.8 H8.5 C8.5,11 9,8.5 9.8,6.2 Z" />
      <path d="M15,6.2 C16.5,8 17,11 17,13.8 H15.5 C15.5,11 15,8.5 14.2,6.2 Z" />
      {/* Collars & Tie (using var(--page-bg) cutout for collar) */}
      <path d="M9.5,6 L12,9 L10.5,6 Z" fill="var(--page-bg)" stroke="none" />
      <path d="M14.5,6 L12,9 L13.5,6 Z" fill="var(--page-bg)" stroke="none" />
      <path d="M11.5,9 C11.5,9 12,13 12,14.5 C12.5,13 12.5,9 12.5,9 Z" fill="var(--page-bg)" stroke="none" />
 
      {/* 3. Trousers & Belt (y=14 to y=23) */}
      {/* Belt */}
      <rect x="8.8" y="14" width="6.4" height="1.2" fill="currentColor" />
      <rect x="11.5" y="13.7" width="1" height="1.8" fill="var(--page-bg)" stroke="none" />
      {/* Long trouser legs */}
      <path d="M9,15.2 H15 V23 H12.6 V18 H11.4 V23 H9 Z" />
    </g>
  ),
  stockings: (
    <g>
      {/* Redrawn from scratch: detailed side-profile leg with horizontal L-sole, heel, arched foot and suspender stocking */}
      {/* Smooth leg profile from thigh to foot */}
      <path d="M10,2 H14 C14,5 13.5,8 12.8,10 C12.8,10 14,14 13.5,16.5 C13,18.5 12,19.5 11.2,20 C10.9,21.2 10.2,21.8 9.6,22 H17.5 C15.5,21.5 14,20.8 12.5,20 C11.5,18.5 9.8,15.5 9.8,12.5 C9.8,11 8.5,10 8.5,9 C8.5,7.5 9.5,4.5 10,2 Z" />
      {/* Stocking thigh lace band */}
      <rect x="9.1" y="8" width="4.4" height="1.6" fill="currentColor" stroke="none" rx="0.3" />
      <line x1="9.2" y1="8.2" x2="13.4" y2="8.2" stroke="var(--page-bg)" strokeWidth="0.8" />
      {/* Vertical suspender garter strap */}
      <line x1="11.3" y1="2" x2="11.3" y2="8" strokeWidth="1.5" />
      {/* Suspender buckle clip */}
      <rect x="10.8" y="6.2" width="1" height="1.5" rx="0.2" fill="currentColor" />
    </g>
  ),
  ebed: (
    <g>
      <circle cx="12" cy="12" r="7" />
      <path d="M3,7 V17 M4.5,7 L4.5,12 M19.5,7 V17 M21,7 V17" strokeWidth="1.5" />
    </g>
  ),
  pocsolya: (
    <path d="M12,4 C6,3.5 3,7.5 5,12 C7.5,17.5 11,21 16,19 C21,17 21,12.5 19,8 C16.5,3.5 18,4.5 12,4 Z" />
  ),
  kamera: (
    <g>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="12" cy="12" r="4.5" />
      <rect x="7" y="3" width="3" height="3" />
    </g>
  ),
  agy: (
    <path d="M2,5 V19 M22,10 V19 M2,13 H22 M4,9 H9 V13 H4 Z" strokeWidth="1.5" />
  ),
  takarro: (
    <path d="M2,12 C5,10 8,14 12,12 C16,10 19,14 22,12 L22,20 L2,20 Z" />
  ),
  szerpentin: (
    <path d="M2,18 Q8,2 12,12 T22,6" strokeWidth="2" strokeLinecap="round" />
  ),
  jelveny: (
    <path d="M12,2 L4,5 V11 C4,16 7,20 12,22 C17,20 20,16 20,11 V5 L12,2 Z" />
  ),
  sir: (
    <path d="M5,20 V9 A7,7 0 0,1 19,9 V20 Z M9,13 H15 M12,10 V17" strokeWidth="2" />
  ),
  tv: (
    <g>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <rect x="5" y="8" width="11" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="9" r="1.5" />
      <circle cx="19" cy="13" r="1.5" />
      <path d="M8,2 L12,5 L16,2" strokeWidth="1.5" />
    </g>
  ),
  level: (
    <path d="M2,4 H22 V20 H2 Z M2,4 L12,12 L22,4" />
  ),
  karkoto: (
    <circle cx="12" cy="12" r="8" strokeDasharray="3,3" strokeWidth="2.5" />
  ),
  pistol: (
    <g>
      <path d="M4,7 H19 V11 H13 L11.5,19 H7.5 L9.5,12.5 H4 Z" />
      <circle cx="12" cy="12.5" r="2" />
      <line x1="19" y1="9" x2="16" y2="9" stroke="var(--page-bg)" strokeWidth="1" />
    </g>
  ),
  haz: (
    <path d="M12,3 L2,11 H5 V20 H19 V11 H22 Z" />
  ),
  lampa: (
    <path d="M12,2 L16,8 H8 Z M8,8 L4,22 H20 L16,8 Z" opacity="0.8" />
  ),
  mikrofon: (
    <g>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6,8 A6,6 0 0,0 18,8 M12,13 V21 M8,21 H16" strokeWidth="2" />
    </g>
  ),
  madar: (
    <path d="M12,6 C10,9 6,10 2,8 C6,12 9,15 12,12 C15,15 18,12 22,8 C18,10 14,9 12,6 Z" />
  ),
  book_open: (
    <path d="M12,6 C9,4.5 5,5 2,7 V19 C5,17 9,16.5 12,18 C15,16.5 19,17 22,19 V7 C19,5 15,4.5 12,6 Z M12,6 V18" strokeWidth="1.5" />
  ),
  book_closed: (
    <path d="M6,4 H16 A2,2 0 0,1 18,6 V18 A2,2 0 0,1 16,20 H6 A1,1 0 0,1 5,19 V5 A1,1 0 0,1 6,4 Z M8,4 V20" strokeWidth="1.5" />
  ),
  ambo: (
    <g>
      <path d="M5,5 L19,3 V6 L5,8 Z" />
      <rect x="11" y="6.5" width="2" height="12.5" />
      <path d="M7,19 H17 V21 H7 Z" />
    </g>
  ),
  white_cane: (
    <g>
      <line x1="7" y1="5" x2="17" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7,5 Q6,3 8,2 T9,3" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="15.5" y1="17" x2="17" y2="19" stroke="#E57373" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  chubby_figure: (
    <g>
      <circle cx="12" cy="5.5" r="3" />
      <ellipse cx="12" cy="13.5" rx="5.5" ry="4.5" />
      <path d="M9.5,17.5 V21 H11 V17.5 M13,17.5 V21 H14.5 V17.5" strokeWidth="1.5" />
      <path d="M6.5,11 Q5,12 5.5,14 M17.5,11 Q19,12 18.5,14" strokeWidth="1.5" />
    </g>
  ),
  mother_baby: (
    <g>
      <circle cx="10" cy="5" r="2.2" />
      <path d="M7,7.5 H13 L11,18 H9 Z" />
      <circle cx="14.5" cy="10.5" r="1.5" />
      <path d="M12.5,11.5 C14.5,11.5 16,12.5 15,15 C13,16 11,13.5 11,12" />
      <path d="M6,9.5 Q11,13 14,11" strokeWidth="1.5" fill="none" />
    </g>
  ),
  curly_hair: (
    <g>
      <circle cx="12" cy="8" r="4.5" />
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <circle cx="10" cy="5" r="2.5" />
      <circle cx="14" cy="5" r="2.5" />
      <circle cx="7" cy="11" r="2" />
      <circle cx="17" cy="11" r="2" />
      <path d="M12,7 A1,1 0 0,1 12.5,8 M8,7.5 A0.8,0.8 0 0,1 8.5,8 M16,7.5 A0.8,0.8 0 0,1 16.5,8" strokeWidth="1" />
    </g>
  ),
  nn: (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text x="12" y="15.2" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif" fill="currentColor">N N</text>
    </g>
  ),
  martini_glass: (
    <g>
      {/* Martini glass with olive */}
      <path d="M3,4 L21,4 L12,13 Z M12,13 V20 M7,20 H17" strokeWidth="1.5" />
      <circle cx="10" cy="7.5" r="1.5" fill="#E57373" stroke="none" /> {/* Olive */}
    </g>
  ),
  hotel: (
    <g>
      {/* Classic Grand Hotel Facade with Pediment and Ornate Entrance */}
      <path d="M4,5 H20 V22 H4 Z" /> {/* main facade */}
      <path d="M3,5 L12,1 L21,5 Z" /> {/* triangular roof crown (pediment) */}
      {/* 3 stories of window pairs */}
      {/* Row 1 */}
      <rect x="6" y="7" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="11" y="7" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="16" y="7" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      {/* Row 2 */}
      <rect x="6" y="10" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="11" y="10" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="16" y="10" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      {/* Row 3 */}
      <rect x="6" y="13" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="11" y="13" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      <rect x="16" y="13" width="2" height="1.8" rx="0.3" fill="var(--page-bg)" stroke="none" />
      {/* Ornate entrance canopy at bottom */}
      <path d="M8,17 H16 V22 H8 Z" fill="var(--page-bg)" stroke="none" /> {/* doorway recess */}
      <path d="M7,17 H17 V18.5 H7 Z" /> {/* canopy cover */}
      <line x1="8.5" y1="18.5" x2="8.5" y2="22" stroke="currentColor" strokeWidth="1" /> {/* left pillar */}
      <line x1="15.5" y1="18.5" x2="15.5" y2="22" stroke="currentColor" strokeWidth="1" /> {/* right pillar */}
    </g>
  ),
  limo: (
    <g>
      {/* Ultra stretch limousine with very long cabin */}
      <path d="M0.5,13.5 L2.5,11 H5 L7,8 H20 L21.5,11 H23.5 V15 H21.8 A1.5,1.5 0 0,1 18.8,15 H5.2 A1.5,1.5 0 0,1 2.2,15 Z" />
      {/* Wheels placed at the extreme front and back */}
      <circle cx="3.7" cy="15" r="1.5" fill="currentColor" />
      <circle cx="20.3" cy="15" r="1.5" fill="currentColor" />
      {/* Super long side windows layout */}
      {/* Driver window */}
      <path d="M7.5,9 H10.5 V11 H7.5 Z" fill="var(--page-bg)" stroke="none" opacity="0.85" />
      {/* Stretched VIP passenger window pane (separated by thin pillars) */}
      <path d="M11.2,9 H15.2 V11 H11.2 Z" fill="var(--page-bg)" stroke="none" opacity="0.85" />
      <path d="M15.8,9 H19.8 V11 H15.8 Z" fill="var(--page-bg)" stroke="none" opacity="0.85" />
    </g>
  ),
  wrench: (
    <g>
      {/* Diagonal open-ended wrench/spanner */}
      <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Top right jaw */}
      <path d="M15,9 C14,6 16,4 18,3 C21,2 22.5,4.5 21,6.5 C19.5,8.5 17.5,10.5 15,9 Z" fill="currentColor" />
      <path d="M17.5,4.5 L20.5,7.5" stroke="var(--page-bg)" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom left jaw */}
      <path d="M9,15 C10,18 8,20 6,21 C3,22 1.5,19.5 3,17.5 C4.5,15.5 6.5,13.5 9,15 Z" fill="currentColor" />
      <path d="M6.5,19.5 L3.5,16.5" stroke="var(--page-bg)" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  coat: (
    <g>
      {/* Detailed trench coat (ballonkabát) with collar lapels, belt, and double-breasted buttons */}
      <path d="M5,4 L8,3 L12,7 L16,3 L19,4 V11 L18,12 L17,21 H7 L6,12 L5,11 Z" />
      {/* Collar inner lapel cuts */}
      <path d="M8,3 L12,7 L16,3" stroke="var(--page-bg)" strokeWidth="1" fill="none" />
      <line x1="12" y1="7" x2="12" y2="21" stroke="var(--page-bg)" strokeWidth="1.2" />
      {/* Belt */}
      <rect x="7" y="11.5" width="10" height="1.8" fill="currentColor" stroke="var(--page-bg)" strokeWidth="0.8" />
      <rect x="11" y="11" width="2" height="2.8" rx="0.3" fill="currentColor" />
      {/* Double breasted buttons */}
      <circle cx="10" cy="9.5" r="0.8" fill="var(--page-bg)" stroke="none" />
      <circle cx="14" cy="9.5" r="0.8" fill="var(--page-bg)" stroke="none" />
      <circle cx="10" cy="14.5" r="0.8" fill="var(--page-bg)" stroke="none" />
      <circle cx="14" cy="14.5" r="0.8" fill="var(--page-bg)" stroke="none" />
      <circle cx="10" cy="17.5" r="0.8" fill="var(--page-bg)" stroke="none" />
      <circle cx="14" cy="17.5" r="0.8" fill="var(--page-bg)" stroke="none" />
    </g>
  ),
  bathrobe: (
    <g>
      {/* Detailed long bathrobe (fürdőköpeny) with open collar, sash belt, and hanging belt ends */}
      {/* Main robe body (long, going down to y=22) */}
      <path d="M7,3 L17,3 V22 H7 Z" />
      {/* Long loose sleeves */}
      <path d="M7,3.5 L4.5,12 H6.2 L8,6.5 Z" />
      <path d="M17,3.5 L19.5,12 H17.8 L16,6.5 Z" />
      {/* Collar cross-over opening */}
      <path d="M7,3 L12,9 L17,3" fill="none" stroke="var(--page-bg)" strokeWidth="1.5" />
      <line x1="12" y1="9" x2="12" y2="22" stroke="var(--page-bg)" strokeWidth="1.2" />
      {/* Tied Sash belt at waist */}
      <rect x="6.8" y="11" width="10.4" height="1.5" fill="currentColor" stroke="var(--page-bg)" strokeWidth="0.8" rx="0.3" />
      {/* Belt knot & hanging ends */}
      <path d="M10.8,11.5 L9.5,18.5 H10.8 Z" fill="currentColor" stroke="var(--page-bg)" strokeWidth="0.6" />
      <path d="M12.2,11.5 L13,19.5 H11.8 Z" fill="currentColor" stroke="var(--page-bg)" strokeWidth="0.6" />
    </g>
  ),
  toilet_bowl: (
    <g>
      {/* Toilet bowl (WC csésze) side profile silhouette */}
      {/* Water tank at the back */}
      <rect x="4" y="2" width="4.5" height="11" rx="0.5" />
      {/* Flush button on top */}
      <rect x="5.8" y="1" width="1" height="1" rx="0.2" />
      {/* Bowl and pipe base structure */}
      <path d="M8.5,8 H18 C18,8 18.5,13.5 13.8,17 C13,17.6 13,20 13,22 H7.5 V14 C7.5,12 8,9 8,8 Z" />
      {/* Seat / lid ring line */}
      <path d="M8.2,6.5 H18.2 V7.8 H8.2 Z" fill="var(--page-bg)" stroke="none" />
      <rect x="8.5" y="7" width="9.5" height="0.8" rx="0.2" fill="currentColor" stroke="none" />
    </g>
  ),
  tree: (
    <g>
      {/* Detailed deciduous tree (lombos fa) with branching trunk and foliage clumps */}
      <path d="M11,15 V22 H13 V15 Q14,14 15,13 L16.5,14 L17.5,13 L15,10.5 M13,15 Q12,14 10.5,13 L9,14 L8.2,13 L11.5,9.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12,2 C9,2 7,4 7,7 C5.5,7 4,8.5 4,10.5 C4,12.5 5.8,14 8,14 C9,14.5 10,15 12,15 C14,15 15,14.5 16,14 C18.2,14 20,12.5 20,10.5 C20,8.5 18.5,7 17,7 C17,4 15,2 12,2 Z" fill="currentColor" opacity="0.15" />
      <path d="M12,2 C9,2 7,4.5 7,7 C5.5,7 4,8.5 4,10.5 C4,12.5 6,14 8,14 Q10,14.5 12,14 Q14,14.5 16,14 C18,14 20,12.5 20,10.5 C20,8.5 18.5,7 17,7 C17,4.5 15,2 12,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  sun: (
    <g>
      {/* Classic glowing sun with radiant rays */}
      <circle cx="12" cy="12" r="5.5" />
      <line x1="12" y1="2" x2="12" y2="5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5" y2="12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.9" y1="4.9" x2="7.1" y2="7.1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.9" y1="16.9" x2="19.1" y2="19.1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.9" y1="19.1" x2="7.1" y2="16.9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.9" y1="4.9" x2="19.1" y2="7.1" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  trousers: (
    <g>
      {/* Standalone pair of trousers (nadrág) with belt loops and pocket slits */}
      <path d="M8,4 H16 V22 H12.8 L12,12.5 L11.2,22 H8 Z" />
      <line x1="8" y1="6" x2="16" y2="6" stroke="var(--page-bg)" strokeWidth="1" />
      <line x1="9.5" y1="4" x2="9.5" y2="6" stroke="var(--page-bg)" strokeWidth="0.8" />
      <line x1="12" y1="4" x2="12" y2="6" stroke="var(--page-bg)" strokeWidth="0.8" />
      <line x1="14.5" y1="4" x2="14.5" y2="6" stroke="var(--page-bg)" strokeWidth="0.8" />
      <path d="M8.5,8 L10.5,10" stroke="var(--page-bg)" strokeWidth="1" strokeLinecap="round" />
      <path d="M15.5,8 L13.5,10" stroke="var(--page-bg)" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  treehouse: (
    <g>
      {/* Detailed treehouse (lombház) with supporting trunk, branches, cozy cabin, roof, window, and hanging ladder */}
      {/* Trunk and branching support */}
      <path d="M11,12 V22 H13 V12 Z" />
      <path d="M11,14 L7,11 M13,14 L17,11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wooden cabin body (y=5 to y=12) */}
      <rect x="7" y="6.5" width="10" height="5.5" rx="0.5" fill="currentColor" />
      {/* Triangular roof (y=2 to y=6.5) */}
      <path d="M6,6.5 L12,2 L18,6.5 Z" />
      {/* Cabin Door (cutout) */}
      <rect x="13" y="8" width="2.2" height="4" fill="var(--page-bg)" stroke="none" />
      {/* Cabin Window (cutout) */}
      <rect x="8.8" y="8" width="2" height="2" rx="0.2" fill="var(--page-bg)" stroke="none" />
      {/* Hanging rope ladder (y=12 to y=20) */}
      <line x1="13.5" y1="12" x2="13.5" y2="20" stroke="currentColor" strokeWidth="1" />
      <line x1="14.8" y1="12" x2="14.8" y2="20" stroke="currentColor" strokeWidth="1" />
      {/* Ladder rungs */}
      <line x1="13.5" y1="13.8" x2="14.8" y2="13.8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="13.5" y1="15.8" x2="14.8" y2="15.8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="13.5" y1="17.8" x2="14.8" y2="17.8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="13.5" y1="19.8" x2="14.8" y2="19.8" stroke="currentColor" strokeWidth="0.8" />
    </g>
  ),
  default: (
    <circle cx="12" cy="12" r="5" />
  )
};

// Map Hungarian or English shape descriptions to our SVG keys
export function mapShapeToSvgKey(shapeName, index) {
  const name = shapeName.toLowerCase().trim();
  
  if (name.includes('rózsaszirom') || name.includes('szirom') || name.includes('rose petal') || name.includes('petal')) return 'rozaszirom';
  if (name.includes('csokis') || name.includes('süti') || name.includes('csoki') || name.includes('cookie')) return 'cookie';
  
  // Lips variations (closed, open, round)
  if (name.includes('ajak') || name.includes('ajkak') || name.includes('száj') || name.includes('lips')) {
    if (index % 3 === 0) return 'lips';
    if (index % 3 === 1) return 'lips_open';
    return 'lips_round';
  }
  
  if (name.includes('pulpitus') || name.includes('ambó') || name.includes('tárgyalóterem') || name.includes('pulpit') || name.includes('gavel') || name.includes('courtroom')) return 'ambo';
  if (name.includes('asztal') || name.includes('table')) return 'asztal';
  if (
    name.includes('jegyzettömb') || name.includes('cetli') || name.includes('akta') || name.includes('újság') || name.includes('híradó') ||
    name.includes('notepad') || name.includes('slip of paper') || name.includes('case file') || name.includes('newspaper') || name.includes('news broadcast')
  ) return 'jegyzet';
  if (name.includes('cigaretta') || name.includes('cigarette')) return 'cigaretta';
  if (name.includes('fehér bot') || name.includes('white cane')) return 'white_cane';
  if (name.includes('köpcös') || name.includes('dagi') || name.includes('alak') || name.includes('chubby') || name.includes('stocky')) return 'chubby_figure';
  if (name.includes('anya') || name.includes('gyerek') || name.includes('mother')) return 'mother_baby';
  if (name.includes('göndör') || name.includes('haj') || name.includes('curly hair') || name.includes('hair')) return 'curly_hair';
  
  // Specific clothes
  if (name.includes('harisnya') || name.includes('stockings')) return 'stockings';
  if (name.includes('rendőrruha') || name.includes('egyenruha') || name.includes('uniformis') || name.includes('police uniform') || name.includes('uniform')) return 'police_uniform';
  if (name.includes('szoknya') || name.includes('skirt')) return 'skirt';
  if (name.includes('fürdőköpeny') || name.includes('bathrobe')) return 'bathrobe';
  if (name.includes('köpeny') || name.includes('fehér köpeny') || name.includes('white coat')) return 'white_coat';
  if (name.includes('ruha') || name.includes('dress')) return 'dress';
  if (name.includes('nadrág') || name.includes('trousers') || name.includes('pants')) return 'trousers';
  if (name.includes('lombház') || name.includes('lomb-ház') || name.includes('treehouse')) return 'treehouse';
  if (name.includes('fa') || name.includes('tölgy') || name.includes('lomb') || name.includes('erdő') || name.includes('tree') || name.includes('forest')) return 'tree';
  if (name.includes('nap') || name.includes('napsütés') || name.includes('sun') || name.includes('sunlight')) return 'sun';
  
  // Bath/Sex shapes
  if (name.includes('öltöző') || name.includes('oltozo') || name.includes('kabin') || name.includes('changing cabin')) return 'changing_cabin';
  if (name.includes('töröl') || name.includes('torol') || name.includes('törül') || name.includes('towel')) return 'towel';
  if (name.includes('szex') || name.includes('pár') || name.includes('par') || name.includes('nudity') || name.includes('couple')) return 'parted_legs';
  if (name.includes('izzad') || name.includes('izzadtság') || name.includes('izzadság') || name.includes('sweat')) return 'sweat_drop';
  if (name.includes('ondó') || name.includes('ondo') || name.includes('semen')) return 'semen_droplet';
  if (
    name.includes('vízcsepp') || name.includes('vizcsepp') || name.includes('olaj') || name.includes('vér') || name.includes('ver') || name.includes('eső') || name.includes('eso') || name.includes('drop') ||
    name.includes('rain') || name.includes('blood') || name.includes('oil') || name.includes('water')
  ) return 'drop';
  if (name.includes('ebéd') || name.includes('lunch')) return 'ebed';
  if (name.includes('pocsolya') || name.includes('puddle')) return 'pocsolya';
  if (name.includes('kamera') || name.includes('camera')) return 'kamera';
  if (name.includes('ágy') || name.includes('takaró') || name.includes('bed') || name.includes('blanket') || name.includes('sofa')) return 'agy';
  if (name.includes('képernyő') || name.includes('televízió') || name.includes('telefon') || name.includes('tv') || name.includes('television') || name.includes('screen') || name.includes('telephone')) return 'tv';
  if (name.includes('alagút') || name.includes('szerpentin') || name.includes('tunnel') || name.includes('switchback')) return 'szerpentin';
  if (name.includes('sír') || name.includes('grave')) return 'sir';
  if (name.includes('jelvény') || name.includes('badge')) return 'jelveny';
  if (name.includes('levél') || name.includes('letter')) return 'level';
  if (name.includes('karkötő') || name.includes('bracelet')) return 'karkoto';
  if (name.includes('pisztoly') || name.includes('pistol')) return 'pistol';
  if (name.includes('ház') || name.includes('house')) return 'haz';
  if (name.includes('lámpafény') || name.includes('lampa') || name.includes('lamplight')) return 'lampa';
  if (name.includes('mikrofon') || name.includes('microphone')) return 'mikrofon';
  if (name.includes('kakukk') || name.includes('madár') || name.includes('cuckoo') || name.includes('bird')) return 'madar';
  if (name.includes('martini') || name.includes('pohár') || name.includes('martini glass')) return 'martini_glass';
  if (name.includes('hotel') || name.includes('szálloda') || name.includes('corinthia')) return 'hotel';
  if (name.includes('limuzin') || name.includes('limo') || name.includes('limousine')) return 'limo';
  if (name.includes('villáskulcs') || name.includes('szerelőkulcs') || name.includes('kulcs') || name.includes('wrench')) return 'wrench';
  if (name.includes('ballonkabát') || name.includes('ballon') || name.includes('kabát') || name.includes('coat') || name.includes('trench')) return 'coat';
  if (
    name.includes('wc csésze') || name.includes('wccsésze') || name.includes('wc-csésze') || name.includes('wckabin') || name.includes('wcajtó') || name.includes('wc kabin') || name.includes('wc') ||
    name.includes('toilet') || name.includes('toilet bowl')
  ) return 'toilet_bowl';
  
  // Dynamic open vs closed books
  if (name.includes('könyvtár') || name.includes('könyv') || name.includes('book') || name.includes('library')) {
    return index % 2 === 0 ? 'book_open' : 'book_closed';
  }
  
  if (name.includes('logó') || name.includes('nn')) return 'nn';
  
  return 'default';
}
