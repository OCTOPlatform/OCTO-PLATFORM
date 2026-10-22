import React from 'react';
import Image from 'next/image';

interface OctoLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'cyan';
  showTagline?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function OctoLogo({
  className = '',
  variant = 'dark',
  showTagline = false,
  showText = true,
  size = 'md',
}: OctoLogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#142740]';
  const subtitleColor = isLight ? 'text-[#00AFC4]' : 'text-[#586779]';

  // Sizing definitions
  const sizeClasses = {
    sm: { imgWidth: 36, imgHeight: 24, text: 'text-base', sub: 'text-[9px]' },
    md: { imgWidth: 48, imgHeight: 32, text: 'text-xl', sub: 'text-[10px]' },
    lg: { imgWidth: 64, imgHeight: 43, text: 'text-2xl', sub: 'text-xs' },
    xl: { imgWidth: 84, imgHeight: 56, text: 'text-3xl', sub: 'text-sm' },
  }[size];

  // Visual filter for light/dark variant
  const imageFilterClass = isLight
    ? 'brightness-0 invert'
    : '';

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Official OCTO Octopus Brand Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/OCTO.png"
          alt="OCTO Brand Logo"
          width={sizeClasses.imgWidth}
          height={sizeClasses.imgHeight}
          className={`object-contain transition-all ${imageFilterClass}`}
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight font-black">
            <span className={`${textColor} ${sizeClasses.text} font-black tracking-wider`}>OCTO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00AFC4] ml-1 mt-0.5 inline-block animate-pulse" />
          </div>
          {showTagline && (
            <span className={`${subtitleColor} ${sizeClasses.sub} font-semibold tracking-wider uppercase mt-1`}>
              One Platform. Many Possibilities.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
