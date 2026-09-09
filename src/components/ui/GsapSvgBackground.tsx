'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const GsapSvgBackground: React.FC<{ variant?: 'hero' | 'section' | 'dark' }> = ({
  variant = 'hero',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Animate floating SVG ambient nodes
      gsap.to('.gsap-svg-orb-1', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.gsap-svg-orb-2', {
        y: 'random(-25, 25)',
        x: 'random(-15, 15)',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Rotating dashed SVG circuits
      gsap.to('.gsap-svg-circuit', {
        rotation: 360,
        transformOrigin: 'center center',
        duration: 25,
        repeat: -1,
        ease: 'none',
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        ref={svgRef}
        className="w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="ambientTeal" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#246e7f" stopOpacity={variant === 'dark' ? '0.25' : '0.12'} />
            <stop offset="100%" stopColor="#246e7f" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ambientOrange" cx="80%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#e06527" stopOpacity={variant === 'dark' ? '0.2' : '0.08'} />
            <stop offset="100%" stopColor="#e06527" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Gradient Meshes */}
        <circle cx="25%" cy="35%" r="350" fill="url(#ambientTeal)" className="gsap-svg-orb-1" />
        <circle cx="75%" cy="45%" r="320" fill="url(#ambientOrange)" className="gsap-svg-orb-2" />

        {/* Decorative Circuit Lines */}
        <g opacity={variant === 'dark' ? '0.15' : '0.08'} className="gsap-svg-circuit">
          <circle cx="50%" cy="50%" r="280" fill="none" stroke="#246e7f" strokeWidth="1.5" strokeDasharray="8 12" />
          <circle cx="50%" cy="50%" r="420" fill="none" stroke="#e06527" strokeWidth="1" strokeDasharray="6 14" />
        </g>
      </svg>
    </div>
  );
};
