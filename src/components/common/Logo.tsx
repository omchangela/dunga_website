'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

export function Logo({ size = 'md', className = '', href = '/' }: LogoProps) {
  // 3317 x 1380 natural aspect ratio (~2.40:1)
  const sizeClasses = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-11 md:h-12 w-auto',
    lg: 'h-12 sm:h-14 md:h-15 w-auto',
    xl: 'h-16 sm:h-18 md:h-20 w-auto',
  };

  const imgClass = sizeClasses[size] || sizeClasses.md;

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Dunga Technologies"
        className={`object-contain block ${imgClass}`}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none flex-shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
