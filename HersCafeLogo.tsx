/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface HersCafeLogoProps {
  className?: string;
  size?: number;
  showTagline?: boolean;
}

/**
 * Exact Hers Cafe Circular Emblem
 * Matched precisely to the uploaded reference emblem:
 * - Circular champagne-gold metallic border with graceful openings on the left & right
 * - Warm cream circular background disc (#FBF7EE)
 * - Centered steaming coffee cup icon with steam curls and heart motif on the cup
 * - Signature "Hers" calligraphic lettering with prominent swash on "H" in rich chocolate-brown (#3E2218)
 * - "— CAFÉ —" serif text flanked by fine champagne-gold horizontal rules
 * - "DESSERTS • WAFFLES • COFFEE" subline separated by small champagne-gold hearts
 */
export const HersCafeLogo: React.FC<HersCafeLogoProps> = ({
  className = '',
  size = 56,
  showTagline = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Hers Café Official Logo"
    >
      <defs>
        {/* Champagne-Gold Metallic Gradient matching reference image */}
        <linearGradient id="goldGradientRing" x1="60" y1="60" x2="440" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8A663" />
          <stop offset="25%" stopColor="#E5CE91" />
          <stop offset="50%" stopColor="#BA9249" />
          <stop offset="75%" stopColor="#F0DCAC" />
          <stop offset="100%" stopColor="#A8813B" />
        </linearGradient>

        <linearGradient id="goldHorizontalBars" x1="100" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BA9249" />
          <stop offset="50%" stopColor="#E5CE91" />
          <stop offset="100%" stopColor="#A8813B" />
        </linearGradient>

        {/* Warm Cream Base Fill */}
        <radialGradient id="creamBase" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCF8F2" />
          <stop offset="85%" stopColor="#F9F4EB" />
          <stop offset="100%" stopColor="#F4ECE0" />
        </radialGradient>

        {/* Soft Drop Shadow for luxury depth */}
        <filter id="emblemShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#3E2218" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* 1. WARM CREAM CIRCULAR EMBLEM BACKGROUND */}
      <circle cx="250" cy="250" r="236" fill="url(#creamBase)" filter="url(#emblemShadow)" />

      {/* 2. CIRCULAR CHAMPAGNE-GOLD OUTER RING */}
      {/* Top Arc */}
      <path
        d="M 70 236 A 184 184 0 1 1 430 236"
        stroke="url(#goldGradientRing)"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom Arc */}
      <path
        d="M 430 274 A 184 184 0 0 1 70 274"
        stroke="url(#goldGradientRing)"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3. COFFEE CUP WITH STEAM & HEART DETAIL (TOP CENTER) */}
      <g id="cup-emblem" transform="translate(0, -6)">
        {/* Steam Wisps */}
        <path
          d="M 248 138 C 242 128 238 119 243 109 C 247 101 254 96 252 88 C 250 82 245 78 243 74 C 245 77 249 81 254 86 C 260 92 263 100 258 110 C 253 120 247 127 248 138 Z"
          fill="#3E2218"
        />
        <path
          d="M 264 136 C 258 126 254 117 259 107 C 263 99 270 94 268 86 C 266 80 261 76 259 72 C 261 75 265 79 270 84 C 276 90 279 98 274 108 C 269 118 263 125 264 136 Z"
          fill="#3E2218"
        />

        {/* Cup Top Elliptical Rim */}
        <ellipse cx="260" cy="148" rx="44" ry="12" stroke="#3E2218" strokeWidth="4.5" fill="none" />
        {/* Dark Espresso Liquid */}
        <ellipse cx="260" cy="148" rx="39" ry="8.5" fill="#3E2218" />
        {/* Liquid Surface Highlight */}
        <ellipse cx="258" cy="148" rx="33" ry="4" fill="#FAF6EE" opacity="0.25" />

        {/* Cup Body Outline */}
        <path
          d="M 218 152 C 217 172 222 198 252 208 C 276 215 299 203 303 180"
          stroke="#3E2218"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cup Handle (Right) */}
        <path
          d="M 301 150 C 316 148 330 155 330 169 C 330 183 316 195 297 201"
          stroke="#3E2218"
          strokeWidth="4.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Heart Detail integrated into the cup front */}
        <path
          d="M 276 170 C 271 163 261 166 261 176 C 261 187 276 197 276 197 C 276 197 291 187 291 176 C 291 166 281 163 276 170 Z"
          stroke="#3E2218"
          strokeWidth="3.2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* Base swoosh under the cup */}
        <path
          d="M 238 206 C 260 206 278 202 289 190"
          stroke="#3E2218"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 4. THE ICONIC "Hers" CALLIGRAPHIC WORDMARK */}
      <g id="hers-wordmark">
        <text
          x="248"
          y="288"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
          fontSize="126"
          fontStyle="italic"
          fontWeight="700"
          fill="#3E2218"
          letterSpacing="0.02em"
        >
          Hers
        </text>
      </g>

      {/* 5. "— CAFÉ —" SECTION WITH GOLD HORIZONTAL ACCENTS */}
      <g id="cafe-subheading" transform="translate(0, 326)">
        {/* Left Gold Accent Bar */}
        <line
          x1="110"
          y1="0"
          x2="160"
          y2="0"
          stroke="url(#goldHorizontalBars)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* "CAFÉ" Typography in refined Roman capitals with acute accent */}
        <text
          x="250"
          y="8"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', 'Cinzel', Georgia, serif"
          fontSize="40"
          fontWeight="600"
          fill="#3E2218"
          letterSpacing="0.32em"
        >
          CAFÉ
        </text>

        {/* Right Gold Accent Bar */}
        <line
          x1="340"
          y1="0"
          x2="390"
          y2="0"
          stroke="url(#goldHorizontalBars)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* 6. "DESSERTS • WAFFLES • COFFEE" TAGLINE WITH GOLD HEARTS */}
      {showTagline && (
        <g id="tagline" transform="translate(0, 362)">
          {/* "DESSERTS" */}
          <text
            x="166"
            y="0"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="600"
            fill="#3E2218"
            letterSpacing="0.22em"
          >
            DESSERTS
          </text>

          {/* First Champagne-Gold Heart */}
          <path
            d="M 215 -7 C 213 -11 208 -10 208 -6 C 208 -1 215 4 215 4 C 215 4 222 -1 222 -6 C 222 -10 217 -11 215 -7 Z"
            fill="url(#goldGradientRing)"
          />

          {/* "WAFFLES" */}
          <text
            x="264"
            y="0"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="600"
            fill="#3E2218"
            letterSpacing="0.22em"
          >
            WAFFLES
          </text>

          {/* Second Champagne-Gold Heart */}
          <path
            d="M 313 -7 C 311 -11 306 -10 306 -6 C 306 -1 313 4 313 4 C 313 4 320 -1 320 -6 C 320 -10 315 -11 313 -7 Z"
            fill="url(#goldGradientRing)"
          />

          {/* "COFFEE" */}
          <text
            x="362"
            y="0"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="600"
            fill="#3E2218"
            letterSpacing="0.22em"
          >
            COFFEE
          </text>
        </g>
      )}
    </svg>
  );
};

export default HersCafeLogo;
