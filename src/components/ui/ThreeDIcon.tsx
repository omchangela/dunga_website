'use client';

import React from 'react';

export type ThreeDIconType =
  | 'rocket'
  | 'shield'
  | 'code'
  | 'users'
  | 'zap'
  | 'cloud'
  | 'trophy'
  | 'wallet'
  | 'layers'
  | 'headset'
  | 'cpu'
  | 'phone'
  | 'target'
  | 'star';

interface ThreeDIconProps {
  name: ThreeDIconType;
  size?: number;
  className?: string;
  variant?: 'teal' | 'orange' | 'cyan' | 'purple' | 'emerald' | 'amber';
}

export const ThreeDIcon: React.FC<ThreeDIconProps> = ({
  name,
  size = 56,
  className = '',
  variant = 'teal',
}) => {
  // Gradients for 3D metallic feel
  const renderIcon = () => {
    switch (name) {
      case 'rocket':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="rocketBody" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="rocketTeal" x1="30" y1="10" x2="70" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#246e7f" />
              </linearGradient>
              <linearGradient id="rocketOrange" x1="40" y1="60" x2="60" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <filter id="dropGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#246e7f" floodOpacity="0.25" />
              </filter>
            </defs>
            <g filter="url(#dropGlow)">
              {/* Flames */}
              <path d="M42 75 C42 88, 50 95, 50 95 C50 95, 58 88, 58 75 Z" fill="url(#rocketOrange)" />
              <path d="M46 76 C46 84, 50 89, 50 89 C50 89, 54 84, 54 76 Z" fill="#fde047" />
              {/* Fins */}
              <path d="M30 62 C20 68, 22 80, 22 80 C22 80, 36 78, 38 68 Z" fill="url(#rocketTeal)" />
              <path d="M70 62 C80 68, 78 80, 78 80 C78 80, 64 78, 62 68 Z" fill="url(#rocketTeal)" />
              {/* Main Fuselage */}
              <path d="M50 12 C35 28, 35 60, 35 72 L65 72 C65 60, 65 28, 50 12 Z" fill="url(#rocketBody)" />
              {/* Nose Cone */}
              <path d="M50 12 C44 20, 40 28, 40 32 L60 32 C60 28, 56 20, 50 12 Z" fill="url(#rocketTeal)" />
              {/* Porthole */}
              <circle cx="50" cy="46" r="8" fill="#0f172a" />
              <circle cx="50" cy="46" r="6" fill="#38bdf8" />
              <circle cx="48" cy="44" r="2" fill="#ffffff" />
            </g>
          </svg>
        );

      case 'shield':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="shieldGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="shieldRim" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>
              <filter id="shieldShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#059669" floodOpacity="0.3" />
              </filter>
            </defs>
            <g filter="url(#shieldShadow)">
              {/* Outer Rim */}
              <path d="M50 15 L78 26 C78 55, 66 76, 50 85 C34 76, 22 55, 22 26 Z" fill="url(#shieldRim)" />
              {/* Inner Shield */}
              <path d="M50 20 L73 30 C73 53, 63 71, 50 79 C37 71, 27 53, 27 30 Z" fill="url(#shieldGrad)" />
              {/* Specular Highlight */}
              <path d="M50 22 L70 31 C70 48, 62 64, 50 72 Z" fill="#ffffff" opacity="0.18" />
              {/* 3D Checkmark */}
              <path d="M40 50 L47 57 L62 40" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      case 'code':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="boxGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#246e7f" />
                <stop offset="100%" stopColor="#133e48" />
              </linearGradient>
              <linearGradient id="boxTop" x1="20" y1="15" x2="80" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#246e7f" />
              </linearGradient>
              <filter id="codeShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#246e7f" floodOpacity="0.3" />
              </filter>
            </defs>
            <g filter="url(#codeShadow)">
              {/* Isometric Code Cube */}
              <rect x="20" y="20" width="60" height="60" rx="18" fill="url(#boxGrad)" />
              <rect x="22" y="22" width="56" height="56" rx="16" fill="url(#boxTop)" opacity="0.2" />
              {/* Brackets */}
              <path d="M40 38 L30 50 L40 62" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60 38 L70 50 L60 62" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M54 36 L46 64" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
            </g>
          </svg>
        );

      case 'users':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="userTeal" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#246e7f" />
                <stop offset="100%" stopColor="#1a515e" />
              </linearGradient>
              <linearGradient id="userOrange" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <filter id="usersShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.2" />
              </filter>
            </defs>
            <g filter="url(#usersShadow)">
              {/* Back Users */}
              <circle cx="32" cy="38" r="10" fill="#94a3b8" />
              <path d="M18 68 C18 56, 46 56, 46 68 Z" fill="#cbd5e1" />
              <circle cx="68" cy="38" r="10" fill="#94a3b8" />
              <path d="M54 68 C54 56, 82 56, 82 68 Z" fill="#cbd5e1" />
              {/* Front Primary User */}
              <circle cx="50" cy="34" r="13" fill="url(#userOrange)" />
              <path d="M30 76 C30 60, 70 60, 70 76 Z" fill="url(#userTeal)" />
              <circle cx="46" cy="30" r="3" fill="#ffffff" opacity="0.4" />
            </g>
          </svg>
        );

      case 'zap':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="zapGrad" x1="30" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <filter id="zapGlow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.35" />
              </filter>
            </defs>
            <g filter="url(#zapGlow)">
              <path d="M54 12 L26 52 L48 52 L42 88 L74 44 L52 44 Z" fill="url(#zapGrad)" />
              <path d="M50 20 L34 50 L48 50 L44 76 L66 46 L52 46 Z" fill="#ffffff" opacity="0.3" />
            </g>
          </svg>
        );

      case 'trophy':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="goldGrad" x1="20" y1="15" x2="80" y2="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <filter id="trophyShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#ca8a04" floodOpacity="0.3" />
              </filter>
            </defs>
            <g filter="url(#trophyShadow)">
              {/* Handles */}
              <path d="M30 30 C16 30, 16 52, 32 54" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" />
              <path d="M70 30 C84 30, 84 52, 68 54" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" />
              {/* Cup */}
              <path d="M28 20 L72 20 L66 54 C66 65, 34 65, 34 54 Z" fill="url(#goldGrad)" />
              {/* Base */}
              <path d="M44 62 L56 62 L56 74 L44 74 Z" fill="#ca8a04" />
              <rect x="32" y="74" width="36" height="12" rx="4" fill="#0f172a" />
              {/* Star on Cup */}
              <path d="M50 30 L52 35 L57 36 L53 39 L54 44 L50 41 L46 44 L47 39 L43 36 L48 35 Z" fill="#ffffff" />
            </g>
          </svg>
        );

      case 'wallet':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="walletGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <filter id="walletShadow">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.25" />
              </filter>
            </defs>
            <g filter="url(#walletShadow)">
              <rect x="20" y="28" width="60" height="48" rx="10" fill="url(#walletGrad)" />
              <path d="M20 36 C20 30, 80 30, 80 36" stroke="#38bdf8" strokeWidth="4" />
              <rect x="56" y="44" width="26" height="16" rx="6" fill="#f97316" />
              <circle cx="66" cy="52" r="3" fill="#ffffff" />
            </g>
          </svg>
        );

      case 'layers':
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="layerTop" x1="20" y1="20" x2="80" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#246e7f" />
                <stop offset="100%" stopColor="#164e63" />
              </linearGradient>
              <linearGradient id="layerMid" x1="20" y1="35" x2="80" y2="65" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <linearGradient id="layerBot" x1="20" y1="50" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <filter id="layerShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.2" />
              </filter>
            </defs>
            <g filter="url(#layerShadow)">
              {/* Bottom Plane */}
              <path d="M50 56 L80 68 L50 80 L20 68 Z" fill="url(#layerBot)" />
              {/* Middle Plane */}
              <path d="M50 40 L80 52 L50 64 L20 52 Z" fill="url(#layerMid)" />
              {/* Top Plane */}
              <path d="M50 24 L80 36 L50 48 L20 36 Z" fill="url(#layerTop)" />
              <path d="M50 24 L80 36 L50 38 L20 36 Z" fill="#ffffff" opacity="0.3" />
            </g>
          </svg>
        );
    }
  };

  return <div className="inline-flex items-center justify-center shrink-0">{renderIcon()}</div>;
};
