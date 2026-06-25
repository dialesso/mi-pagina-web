/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  /**
   * 'full' renders the icon, "Port-Link" text, and slogan.
   * 'horizontal' renders the icon on the left, "Port-Link" on the right.
   * 'icon-only' renders just the graphic (ship wheel + container + waves).
   */
  variant?: 'full' | 'horizontal' | 'icon-only';
  /**
   * 'light' is for white/light backgrounds (uses corporate dark text colors).
   * 'dark' is for dark backgrounds (uses white/slate text colors).
   */
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md'
}: LogoProps) {
  // Determine sizing classes
  const sizeClasses = {
    sm: variant === 'icon-only' ? 'w-10 h-10' : 'h-8',
    md: variant === 'icon-only' ? 'w-16 h-16' : 'h-12',
    lg: variant === 'icon-only' ? 'w-24 h-24' : 'h-16',
    xl: variant === 'icon-only' ? 'w-36 h-36' : 'h-24'
  };

  // Text color based on theme
  const textColorMain = theme === 'light' ? 'text-[#0F4C81]' : 'text-white';
  const textColorAccent = theme === 'light' ? 'text-[#00A8E8]' : 'text-[#00A8E8]';
  const sloganColor = theme === 'light' ? 'text-slate-500' : 'text-slate-300';
  const lineColor = theme === 'light' ? 'stroke-slate-300' : 'stroke-slate-700';

  // Graphic Component containing the Ship's Wheel, Container, and Waves
  const GraphicIcon = () => (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm select-none"
    >
      {/* 1. SHIP'S WHEEL (TIMÓN DE BARCO) */}
      <g className="transition-transform duration-700 hover:rotate-12">
        {/* Hub / Inner Ring */}
        <circle cx="120" cy="95" r="52" stroke="#0F4C81" strokeWidth="6" />
        <circle cx="120" cy="95" r="40" stroke="#0F4C81" strokeWidth="2" />

        {/* 8 Handles (Spokes) */}
        {/* Top (0 deg) */}
        <g transform="translate(120, 95) rotate(0)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Top-Right (45 deg) */}
        <g transform="translate(120, 95) rotate(45)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Right (90 deg) */}
        <g transform="translate(120, 95) rotate(90)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Bottom-Right (135 deg) */}
        <g transform="translate(120, 95) rotate(135)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Bottom (180 deg) */}
        <g transform="translate(120, 95) rotate(180)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Bottom-Left (225 deg) */}
        <g transform="translate(120, 95) rotate(225)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Left (270 deg) */}
        <g transform="translate(120, 95) rotate(270)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
        {/* Top-Left (315 deg) */}
        <g transform="translate(120, 95) rotate(315)">
          <line x1="0" y1="-40" x2="0" y2="-72" stroke="#0F4C81" strokeWidth="6" strokeLinecap="round" />
          <path d="M-5,-72 C-5,-78 5,-78 5,-72 L4,-62 L-4,-62 Z" fill="#0F4C81" />
        </g>
      </g>

      {/* 2. BLUE 3D CONTAINER (CONTENEDOR DE CARGA EN PERSPECTIVA) */}
      <g>
        {/* Left Side Face (Frontal angled) */}
        <path d="M85,85 L120,78 L120,123 L85,116 Z" fill="#00A8E8" />
        {/* Left Side Highlights/Ridges */}
        <line x1="92" y1="84" x2="92" y2="117" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="99" y1="82" x2="99" y2="119" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="106" y1="81" x2="106" y2="120" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="113" y1="79" x2="113" y2="122" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />

        {/* Right Side Face (Deep depth profile) */}
        <path d="M120,78 L160,86 L160,131 L120,123 Z" fill="#0F4C81" />
        {/* Right Side Shadow/Ridges */}
        <line x1="128" y1="80" x2="128" y2="125" stroke="#06223B" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="136" y1="81" x2="136" y2="127" stroke="#06223B" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="144" y1="83" x2="144" y2="128" stroke="#06223B" strokeOpacity="0.6" strokeWidth="2" />
        <line x1="152" y1="84" x2="152" y2="130" stroke="#06223B" strokeOpacity="0.6" strokeWidth="2" />

        {/* Top Lid Face (Slight perspective highlight) */}
        <path d="M85,85 L120,78 L160,86 L125,93 Z" fill="#4CD1FF" fillOpacity="0.25" />
      </g>

      {/* 3. DYNAMIC MARITIME WAVES (OLAS EN LA BASE) */}
      {/* Back wave (Deep blue) */}
      <path
        d="M60,132 C95,120 145,118 180,132 C170,140 155,145 140,142 C115,138 90,146 60,132 Z"
        fill="#0F4C81"
      />
      {/* Front wave (Light blue) */}
      <path
        d="M64,124 C95,110 145,112 176,124 C145,138 115,128 85,138 C75,133 69,129 64,124 Z"
        fill="#00A8E8"
      />
      {/* Accent White Crest Line */}
      <path
        d="M64,124 C95,110 145,112 176,124"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
    </svg>
  );

  // Render Variant 1: Full Branding (Centred, perfect for presentation page, forms or hero/login cards)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Graphic */}
        <div className={`${sizeClasses[size]} w-auto aspect-square mb-2`}>
          <GraphicIcon />
        </div>
        
        {/* Brand Text */}
        <div className="flex flex-col items-center">
          <div className="flex items-center text-2xl font-black tracking-tight font-sans">
            <span className={textColorAccent}>Port</span>
            <span className={textColorMain}>-Link</span>
          </div>

          {/* Slogan with stylish line decor */}
          <div className="flex items-center gap-3 mt-1.5 w-full max-w-xs">
            <svg className="w-8" height="2" viewBox="0 0 32 2">
              <line x1="0" y1="1" x2="32" y2="1" className={lineColor} strokeWidth="1" strokeDasharray="3 1" />
            </svg>
            <span className={`text-[9px] font-extrabold uppercase tracking-[0.18em] whitespace-nowrap ${sloganColor}`}>
              Conecta, Optimiza y Transforma
            </span>
            <svg className="w-8" height="2" viewBox="0 0 32 2">
              <line x1="0" y1="1" x2="32" y2="1" className={lineColor} strokeWidth="1" strokeDasharray="3 1" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Render Variant 2: Horizontal (Perfect for Header, Navigation, and Small Bars)
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {/* Graphic */}
        <div className="w-10 h-10 shrink-0">
          <GraphicIcon />
        </div>

        {/* Text */}
        <div className="flex flex-col leading-none">
          <div className="flex items-center text-lg sm:text-xl font-black tracking-tight font-sans">
            <span className={textColorAccent}>Port</span>
            <span className={textColorMain}>-Link</span>
          </div>
          <span className={`text-[8px] font-extrabold uppercase tracking-[0.08em] mt-0.5 ${sloganColor}`}>
            Street Turn Perú
          </span>
        </div>
      </div>
    );
  }

  // Render Variant 3: Icon Only
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <GraphicIcon />
    </div>
  );
}
