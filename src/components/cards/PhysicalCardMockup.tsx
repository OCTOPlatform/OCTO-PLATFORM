'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Wifi, Star, Layers, RefreshCw } from 'lucide-react';

export type CardDesignTheme = 'octo_navy' | 'octo_frosted' | 'google_white' | 'luxury_gold';

export interface PhysicalCardMockupProps {
  businessName: string;
  cardCode?: string;
  token?: string;
  redirectUrl?: string;
  qrCodeUrl?: string;
  theme?: CardDesignTheme;
  onThemeChange?: (theme: CardDesignTheme) => void;
  showThemeSwitcher?: boolean;
  interactiveFlip?: boolean;
  initialSide?: 'front' | 'back';
  side?: 'front' | 'back';
  onSideChange?: (side: 'front' | 'back') => void;
  className?: string;
}

// Clean, high-precision SVG QR Code representation matching the Google Review link
function MockQRCodeSvg({ className = 'w-24 h-24 sm:w-28 sm:h-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Top-Left Finder */}
      <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F172A" />
      <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
      <rect x="13" y="13" width="10" height="10" rx="1" fill="#0F172A" />

      {/* Top-Right Finder */}
      <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F172A" />
      <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
      <rect x="77" y="13" width="10" height="10" rx="1" fill="#0F172A" />

      {/* Bottom-Left Finder */}
      <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F172A" />
      <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
      <rect x="13" y="77" width="10" height="10" rx="1" fill="#0F172A" />

      {/* Timing Patterns & Data Modules */}
      <rect x="35" y="10" width="4" height="4" fill="#0F172A" />
      <rect x="43" y="10" width="4" height="4" fill="#0F172A" />
      <rect x="51" y="10" width="4" height="4" fill="#0F172A" />
      <rect x="59" y="10" width="4" height="4" fill="#0F172A" />

      <rect x="35" y="18" width="4" height="4" fill="#0F172A" />
      <rect x="47" y="18" width="4" height="4" fill="#0F172A" />
      <rect x="55" y="18" width="4" height="4" fill="#0F172A" />

      <rect x="10" y="35" width="4" height="4" fill="#0F172A" />
      <rect x="10" y="43" width="4" height="4" fill="#0F172A" />
      <rect x="10" y="51" width="4" height="4" fill="#0F172A" />
      <rect x="10" y="59" width="4" height="4" fill="#0F172A" />

      <rect x="18" y="35" width="4" height="4" fill="#0F172A" />
      <rect x="18" y="47" width="4" height="4" fill="#0F172A" />
      <rect x="18" y="55" width="4" height="4" fill="#0F172A" />

      <rect x="27" y="27" width="5" height="5" fill="#0F172A" />
      <rect x="36" y="27" width="5" height="5" fill="#0F172A" />
      <rect x="45" y="27" width="5" height="5" fill="#0F172A" />
      <rect x="54" y="27" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="27" width="5" height="5" fill="#0F172A" />

      <rect x="27" y="36" width="5" height="5" fill="#0F172A" />
      <rect x="36" y="36" width="5" height="5" fill="#0F172A" />
      <rect x="54" y="36" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="36" width="5" height="5" fill="#0F172A" />
      <rect x="72" y="36" width="5" height="5" fill="#0F172A" />
      <rect x="81" y="36" width="5" height="5" fill="#0F172A" />

      <rect x="27" y="45" width="5" height="5" fill="#0F172A" />
      <rect x="45" y="45" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="45" width="5" height="5" fill="#0F172A" />
      <rect x="72" y="45" width="5" height="5" fill="#0F172A" />
      <rect x="90" y="45" width="5" height="5" fill="#0F172A" />

      <rect x="36" y="54" width="5" height="5" fill="#0F172A" />
      <rect x="45" y="54" width="5" height="5" fill="#0F172A" />
      <rect x="54" y="54" width="5" height="5" fill="#0F172A" />
      <rect x="81" y="54" width="5" height="5" fill="#0F172A" />
      <rect x="90" y="54" width="5" height="5" fill="#0F172A" />

      <rect x="27" y="63" width="5" height="5" fill="#0F172A" />
      <rect x="45" y="63" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="63" width="5" height="5" fill="#0F172A" />
      <rect x="72" y="63" width="5" height="5" fill="#0F172A" />
      <rect x="81" y="63" width="5" height="5" fill="#0F172A" />

      <rect x="36" y="72" width="5" height="5" fill="#0F172A" />
      <rect x="45" y="72" width="5" height="5" fill="#0F172A" />
      <rect x="54" y="72" width="5" height="5" fill="#0F172A" />
      <rect x="72" y="72" width="5" height="5" fill="#0F172A" />
      <rect x="90" y="72" width="5" height="5" fill="#0F172A" />

      <rect x="36" y="81" width="5" height="5" fill="#0F172A" />
      <rect x="54" y="81" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="81" width="5" height="5" fill="#0F172A" />
      <rect x="81" y="81" width="5" height="5" fill="#0F172A" />

      <rect x="45" y="90" width="5" height="5" fill="#0F172A" />
      <rect x="63" y="90" width="5" height="5" fill="#0F172A" />
      <rect x="72" y="90" width="5" height="5" fill="#0F172A" />
      <rect x="90" y="90" width="5" height="5" fill="#0F172A" />

      {/* Center Subtle Google "G" Badge */}
      <circle cx="50" cy="50" r="11" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <path
        d="M50 43.5C53.6 43.5 56.1 45.1 57.5 46.4L60.5 43.4C58.6 41.6 54.7 39.5 50 39.5C43.6 39.5 38.3 43.2 35.9 48.5L39.8 51.5C40.8 46.9 44.9 43.5 50 43.5Z"
        fill="#EA4335"
      />
      <path
        d="M60.2 50.3C60.2 49.6 60.1 48.9 60 48.3H50V52.2H55.8C55.5 53.6 54.7 54.8 53.4 55.6L57.2 58.5C59.5 56.4 60.2 53.6 60.2 50.3Z"
        fill="#4285F4"
      />
      <path
        d="M39.8 51.5C39.5 50.6 39.4 49.7 39.4 48.7C39.4 47.7 39.5 46.8 39.8 45.9L35.9 42.9C35.1 44.7 34.6 46.6 34.6 48.7C34.6 50.8 35.1 52.7 35.9 54.5L39.8 51.5Z"
        fill="#FBBC05"
      />
      <path
        d="M50 57.9C44.9 57.9 40.8 54.5 39.8 49.9L35.9 52.9C38.3 58.2 43.6 61.9 50 61.9C54.5 61.9 58.3 60.4 61.1 57.8L57.2 54.9C55.4 56.7 53.2 57.9 50 57.9Z"
        fill="#34A853"
      />
    </svg>
  );
}

export const PhysicalCardMockup: React.FC<PhysicalCardMockupProps> = ({
  businessName,
  cardCode = 'OCTO-TAP-DEMO-01',
  redirectUrl = 'https://octo.id/t/kopi-bahagia',
  qrCodeUrl,
  theme: controlledTheme,
  onThemeChange,
  showThemeSwitcher = true,
  interactiveFlip = true,
  initialSide = 'front',
  side: controlledSide,
  onSideChange,
  className = '',
}) => {
  const [internalSide, setInternalSide] = useState<'front' | 'back'>(initialSide);
  const [internalTheme, setInternalTheme] = useState<CardDesignTheme>('octo_navy');

  const currentSide = controlledSide !== undefined ? controlledSide : internalSide;
  const currentTheme = controlledTheme !== undefined ? controlledTheme : internalTheme;

  const handleToggleSide = () => {
    if (!interactiveFlip) return;
    const nextSide = currentSide === 'front' ? 'back' : 'front';
    if (onSideChange) onSideChange(nextSide);
    else setInternalSide(nextSide);
  };

  const handleSelectTheme = (newTheme: CardDesignTheme) => {
    if (onThemeChange) onThemeChange(newTheme);
    else setInternalTheme(newTheme);
  };

  // Theme-specific styles matching OCTO-TAP specifications
  const getThemeStyles = () => {
    switch (currentTheme) {
      case 'octo_frosted':
        return {
          container: 'bg-slate-900/60 backdrop-blur-xl border border-white/30 text-white shadow-2xl',
          shadow: '0 20px 45px -12px rgba(255, 255, 255, 0.12), inset 0 1px 2px 0 rgba(255, 255, 255, 0.4)',
          headerBorder: 'border-white/20',
          titleColor: 'text-white',
          subtitleColor: 'text-slate-300',
          badge: 'bg-white/10 text-cyan-300 border-white/20',
          qrBorder: 'border-white/30 bg-white/95',
          footerText: 'text-slate-300',
          codeText: 'text-cyan-300 font-mono',
          backTargetBg: 'bg-white/5 border-cyan-400/50',
          backTargetText: 'text-cyan-300',
          accentColor: 'text-cyan-400',
        };
      case 'google_white':
        return {
          container: 'bg-gradient-to-b from-white via-slate-50 to-slate-100 border border-slate-300 text-slate-800 shadow-xl',
          shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.9)',
          headerBorder: 'border-slate-200',
          titleColor: 'text-slate-900 font-bold',
          subtitleColor: 'text-slate-600',
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          qrBorder: 'border-slate-300 bg-white shadow-md',
          footerText: 'text-slate-500',
          codeText: 'text-blue-600 font-bold font-mono',
          backTargetBg: 'bg-slate-100 border-blue-500/50 text-slate-700',
          backTargetText: 'text-blue-700 font-bold',
          accentColor: 'text-blue-600',
        };
      case 'luxury_gold':
        return {
          container: 'bg-gradient-to-br from-[#0c0c0e] via-[#141418] to-[#070709] border border-amber-500/40 text-amber-100 shadow-2xl',
          shadow: '0 20px 50px -15px rgba(245, 158, 11, 0.25), inset 0 0 15px rgba(245, 158, 11, 0.08)',
          headerBorder: 'border-amber-500/30',
          titleColor: 'text-amber-200 font-semibold',
          subtitleColor: 'text-amber-200/70',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
          qrBorder: 'border-amber-500/40 bg-white',
          footerText: 'text-amber-300/60',
          codeText: 'text-amber-300 font-mono',
          backTargetBg: 'bg-amber-950/30 border-amber-400/50',
          backTargetText: 'text-amber-300',
          accentColor: 'text-amber-400',
        };
      case 'octo_navy':
      default:
        return {
          container: 'bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#050C1A] border border-cyan-500/40 text-white shadow-2xl',
          shadow: '0 20px 45px -15px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.08)',
          headerBorder: 'border-cyan-500/20',
          titleColor: 'text-white',
          subtitleColor: 'text-slate-300',
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50',
          qrBorder: 'border-cyan-500/40 bg-white',
          footerText: 'text-slate-400',
          codeText: 'text-cyan-400 font-mono',
          backTargetBg: 'bg-cyan-950/40 border-cyan-400/60',
          backTargetText: 'text-cyan-300',
          accentColor: 'text-cyan-400',
        };
    }
  };

  const currentStyles = getThemeStyles();

  return (
    <div className={`flex flex-col items-center w-full max-w-sm ${className}`}>
      {/* Theme Switcher Tabs (2x2 Grid aligned with OCTO-TAP) */}
      {showThemeSwitcher && (
        <div className="w-full grid grid-cols-2 gap-1.5 p-1.5 bg-[#0D1B2D] border border-[#1E3A5F] rounded-xl mb-3 text-[11px]">
          <button
            type="button"
            onClick={() => handleSelectTheme('octo_navy')}
            className={`py-1.5 px-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTheme === 'octo_navy'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-850'
            }`}
            title="Tema Utama Brand OCTO (Navy & Cyan)"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 shadow-sm" />
            <span className="truncate">OCTO Signature</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('octo_frosted')}
            className={`py-1.5 px-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTheme === 'octo_frosted'
                ? 'bg-white text-slate-950 font-bold shadow-md shadow-white/20'
                : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-850'
            }`}
            title="Akrilik Bening Glassmorphism"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0 shadow-sm" />
            <span className="truncate">Frosted Glass</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('google_white')}
            className={`py-1.5 px-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTheme === 'google_white'
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-850'
            }`}
            title="Google Review Clean White"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-sm" />
            <span className="truncate">Google White</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('luxury_gold')}
            className={`py-1.5 px-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTheme === 'luxury_gold'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-850'
            }`}
            title="Tema Hitam Mewah & Emas"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 shrink-0 shadow-sm" />
            <span className="truncate">Black & Gold</span>
          </button>
        </div>
      )}

      {/* Acrylic Physical Card Shell (1:1 Square 100x100mm Acrylic Stand) */}
      <div
        className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl p-4 transition-all duration-300 select-none group overflow-hidden ${interactiveFlip ? 'cursor-pointer hover:scale-[1.01]' : ''} ${currentStyles.container}`}
        style={{
          boxShadow: currentStyles.shadow,
        }}
        onClick={handleToggleSide}
        role={interactiveFlip ? 'button' : undefined}
        tabIndex={interactiveFlip ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactiveFlip && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleToggleSide();
          }
        }}
      >
        {/* Glossy Acrylic Surface Light Reflection (Simulating real 3mm clear acrylic) */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-cyan-500/5 to-white/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* Multi-Color Google Top Accent Bar for Google White theme */}
        {currentTheme === 'google_white' && (
          <div className="absolute top-0 left-6 right-6 h-1 flex rounded-b overflow-hidden">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>
        )}

        {currentSide === 'front' ? (
          /* FRONT SIDE */
          <div className="h-full flex flex-col justify-between items-center text-center p-2 relative z-10">
            {/* Header: Master Brand Logo & NFC Badge */}
            <div className={`w-full flex items-center justify-between border-b ${currentStyles.headerBorder} pb-2`}>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/Logo-OCTO-TAP.png"
                  alt="OCTO Tap Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <div className="text-left">
                  <span
                    className={`text-[11px] font-black tracking-wider uppercase block leading-tight ${
                      currentTheme === 'google_white' ? 'text-slate-900' : 'text-slate-100'
                    }`}
                  >
                    OCTO TAP
                  </span>
                  <span className="text-[8px] text-cyan-400 block tracking-tight font-medium">SMART CONNECTED</span>
                </div>
              </div>

              <div
                className={`flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full border ${currentStyles.badge}`}
              >
                <Wifi className="w-3 h-3 rotate-90" />
                <span>NFC TAP READY</span>
              </div>
            </div>

            {/* Business & Google Review Call-to-Action */}
            <div className="my-0.5">
              <h4 className={`text-sm font-bold tracking-wide truncate max-w-[240px] ${currentStyles.titleColor}`}>
                {businessName && businessName.toLowerCase() !== 'bisnis'
                  ? businessName
                  : 'Review Us on Google'}
              </h4>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                ))}
              </div>
              <p className={`text-[10px] mt-0.5 font-medium ${currentStyles.subtitleColor}`}>
                {businessName && businessName.toLowerCase() !== 'bisnis'
                  ? 'Beri Ulasan Google Terbaik Anda'
                  : 'Tap NFC atau Scan QR Code'}
              </p>
            </div>

            {/* Centerpiece: QR Code */}
            <div className={`relative p-2 rounded-xl shadow-inner border-2 ${currentStyles.qrBorder}`}>
              {qrCodeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 sm:w-28 sm:h-28 object-contain" />
              ) : (
                <MockQRCodeSvg className="w-24 h-24 sm:w-28 sm:h-28 text-slate-900" />
              )}
            </div>

            {/* Bottom Footer: Serial Code & Flip Prompt */}
            <div
              className={`w-full flex items-center justify-between text-[9px] pt-1 border-t ${currentStyles.headerBorder}`}
            >
              <span className={currentStyles.codeText}>{cardCode}</span>
              <span className={`${currentStyles.footerText} group-hover:text-cyan-400 transition-colors`}>
                🔄 Klik untuk balik kartu
              </span>
            </div>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="h-full flex flex-col justify-between items-center text-center p-3 relative z-10">
            <div className={`w-full flex items-center justify-between border-b ${currentStyles.headerBorder} pb-2`}>
              <div className="flex items-center gap-1.5">
                <Image
                  src="/Logo-OCTO-TAP.png"
                  alt="OCTO Tap"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain opacity-80"
                />
                <span className="text-[10px] font-mono tracking-wider text-slate-300 font-semibold">
                  NFC TOUCHPOINT
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-medium">SMART REVIEW CARD</span>
            </div>

            {/* NFC Chip Target Area with Radar Rings */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20 animate-ping opacity-30 pointer-events-none" />
              <div
                className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-full w-32 h-32 ${currentStyles.backTargetBg}`}
              >
                <Wifi className={`w-9 h-9 rotate-90 ${currentStyles.accentColor} animate-pulse`} />
                <span className={`text-[10px] font-bold mt-1 ${currentStyles.backTargetText}`}>AREA TEMPEL NFC</span>
                <span className="text-[8px] opacity-75 font-mono">NTAG213 • 13.56 MHz</span>
              </div>
            </div>

            {/* Single Source of Truth Redirect Link */}
            <div
              className={`w-full text-[9px] p-2 rounded border ${
                currentTheme === 'google_white'
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <div
                className={`truncate font-mono font-semibold ${
                  currentTheme === 'google_white' ? 'text-blue-600' : 'text-cyan-400'
                }`}
              >
                {redirectUrl}
              </div>
              <div className="text-[8px] opacity-70 mt-0.5">URL tunggal terintegrasi untuk chip NFC &amp; QR Code</div>
            </div>

            <span className={`text-[9px] ${currentStyles.footerText}`}>
              🔄 Klik untuk kembali ke tampak depan
            </span>
          </div>
        )}
      </div>

      {/* Info indicator under card */}
      <div className="mt-3 flex items-center justify-between w-full text-[11px] text-[#586779] px-1">
        <span className="px-2 py-0.5 bg-[#F2F5F7] rounded border border-[#E1E7EC] font-mono text-[10px] flex items-center gap-1.5 text-[#142740]">
          <Layers className="w-3 h-3 text-[#00AFC4]" />
          <span>
            {currentSide === 'front'
              ? 'Tampak Depan (UV Print & QR)'
              : 'Tampak Belakang (Posisi Chip NTAG213)'}
          </span>
        </span>
        <span className="text-[10px] text-[#586779]">
          Standar Fisik 10×10 cm Akrilik 3mm
        </span>
      </div>
    </div>
  );
};

export default PhysicalCardMockup;
