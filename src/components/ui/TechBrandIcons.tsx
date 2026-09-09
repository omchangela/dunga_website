import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechBrandIcon({ name, className = 'w-6 h-6', size }: TechIconProps) {
  const normalized = name.toLowerCase().trim();
  const style = size ? { width: size, height: size } : undefined;

  // Next.js
  if (normalized.includes('next')) {
    return (
      <svg className={className} style={style} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path
          d="M149.508 157.438L69.147 54H54V125.979H66.8391V69.3831L139.565 162.771C143.053 161.147 146.381 159.356 149.508 157.438Z"
          fill="url(#paint0_linear_next)"
        />
        <rect x="115" y="54" width="13" height="72" fill="url(#paint1_linear_next)" />
        <defs>
          <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_next" x1="121.5" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React
  if (normalized.includes('react')) {
    return (
      <svg className={className} style={style} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Node.js
  if (normalized.includes('node')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M128 0L9.4 68.4v136.9L128 273.7l118.6-68.4V68.4L128 0zm95.1 193.3L128 248.3 32.9 193.3V83.6L128 28.7l95.1 54.9v109.7z"
          fill="#339933"
        />
        <path
          d="M128 39.8l85.5 49.3v98.7L128 237.1 42.5 187.8V89.1L128 39.8m0-11.1L32.9 83.6v109.7L128 248.3l95.1-54.9V83.6L128 28.7z"
          fill="#339933"
        />
        <path
          d="M128 150.3c-12.7 0-21.7-6.2-25.2-16.7l17.8-10.3c1.7 5.2 6.5 8.3 12.3 8.3 5.4 0 9.4-2.7 9.4-7.1 0-4.6-3.8-6.4-14.7-9.5-16.5-4.7-24-11.5-24-25 0-14.6 11.2-24.9 27.5-24.9 11.7 0 20.3 5 24 14.8l-17.5 10.1c-1.7-4.5-5.6-6.8-10.7-6.8-5 0-8.5 2.5-8.5 6.2 0 4.1 3.5 5.6 13.5 8.5 17.5 5.1 25.4 11.6 25.4 25.9 0 16-11.8 26.5-28.9 26.5z"
          fill="#66CC33"
        />
      </svg>
    );
  }

  // Laravel
  if (normalized.includes('laravel')) {
    return (
      <svg className={className} style={style} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M495.2 120.4L372.5 49.6c-4.7-2.7-10.5-2.7-15.2 0L242.4 115l112.5 65 140.3-59.6zM227.2 141.2v129.9l112.5 65V206.2l-112.5-65zm142.9 82.5v129.9l112.5-65V158.7l-112.5 65z"
          fill="#FF2D20"
        />
        <path
          d="M269.6 391.6l-112.5-65V196.7L44.6 131.8c-4.7-2.7-10.5-2.7-15.2 0L16.8 139C7.4 144.4 1.6 154.5 1.6 165.4v181.2c0 10.9 5.8 21 15.2 26.4l237.6 137.2c4.7 2.7 10.5 2.7 15.2 0l112.5-65-112.5-53.6z"
          fill="#FF2D20"
        />
      </svg>
    );
  }

  // Flutter
  if (normalized.includes('flutter')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 317" xmlns="http://www.w3.org/2000/svg">
        <path d="M157.9 0L0 157.9l48.6 48.6L255.1 0h-97.2z" fill="#42A5F5" />
        <path d="M157.9 157.9L73.9 241.9l48.6 48.6 48.6-48.6 84-84h-97.2z" fill="#0D47A1" />
        <path d="M122.5 290.5L149.2 317h97.2l-60.3-60.3-63.6 33.8z" fill="#01579B" />
        <path d="M73.9 241.9l48.6-48.6 48.6 48.6-48.6 48.6z" fill="#29B6F6" />
      </svg>
    );
  }

  // Python
  if (normalized.includes('python')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M126.9 0C60.9 0 65 28.6 65 28.6l.1 29.6h63v8.9H38.5S0 62.7 0 128.8c0 66.2 33.6 64 33.6 64h20.1v-28.3s-1.1-33.6 33-33.6h56.8s31.9.5 31.9-30.8V33.6S179.9 0 126.9 0zm-35.4 19.8a9.4 9.4 0 1 1 0 18.8 9.4 9.4 0 0 1 0-18.8z"
          fill="url(#python-grad-a)"
        />
        <path
          d="M129.1 254.7c66 0 61.9-28.6 61.9-28.6l-.1-29.6h-63v-8.9h89.6s38.5 4.4 38.5-61.7c0-66.2-33.6-64-33.6-64h-20.1v28.3s1.1 33.6-33 33.6H113s-31.9-.5-31.9 30.8v66.5s-4.5 33.6 48 33.6zm35.4-19.8a9.4 9.4 0 1 1 0-18.8 9.4 9.4 0 0 1 0 18.8z"
          fill="url(#python-grad-b)"
        />
        <defs>
          <linearGradient id="python-grad-a" x1="20.7" y1="20.7" x2="160.8" y2="160.8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#387EB8" />
            <stop offset="1" stopColor="#366994" />
          </linearGradient>
          <linearGradient id="python-grad-b" x1="95.2" y1="94.4" x2="235.3" y2="234.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE052" />
            <stop offset="1" stopColor="#FFC331" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // PostgreSQL
  if (normalized.includes('postgres') || normalized.includes('sql') || normalized.includes('database')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 251" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M125.8 0C57.6 0 2.2 55.4 2.2 123.6c0 37.1 16.3 70.4 42.2 93.1l6.1-15.4c-20.3-19.7-33-47.3-33-77.7 0-60 48.6-108.6 108.6-108.6s108.6 48.6 108.6 108.6c0 30.4-12.7 58-33 77.7l6.1 15.4c25.9-22.7 42.2-56 42.2-93.1C249.4 55.4 194 0 125.8 0z"
          fill="#336791"
        />
        <path
          d="M136.2 47.9c-29.2 0-51.2 15.2-61.9 33.6-14.7 25.2-12.6 62.5-4.4 90.1 5.3 17.8 14.7 32.2 26.6 43.1 3.5 3.2 7.7 5.7 12.3 7.3 2.9 1 6.1 1.6 9.4 1.7 14.5.4 28.5-6.7 37.4-18.7 8.3-11.2 11.7-25.7 10.9-40.8-.8-15.6-6.6-30.8-15.5-43.2-3.8-5.3-8.6-9.8-14.3-13.1z"
          fill="#336791"
        />
        <circle cx="108.5" cy="115.5" r="7.5" fill="#FFFFFF" />
        <circle cx="109.5" cy="116.5" r="4" fill="#1C2B36" />
      </svg>
    );
  }

  // AWS / Docker
  if (normalized.includes('aws') || normalized.includes('amazon')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M74.9 66.8c0 4.8.7 9 2.2 12.7 1.4 3.7 3.5 6.7 6.2 9.1 2.7 2.4 6 4.1 9.7 5.2 3.8 1.1 7.9 1.7 12.4 1.7 6 0 11.2-1.1 15.6-3.4 4.4-2.3 8-5.5 10.6-9.6v11.6h17.9V37.7h-17.9v10.5c-2.7-3.9-6.3-6.9-10.7-9.1-4.4-2.2-9.6-3.3-15.5-3.3-4.5 0-8.6.6-12.4 1.7-3.8 1.1-7 2.8-9.7 5.2-2.7 2.4-4.8 5.4-6.2 9.1-1.5 3.7-2.2 7.9-2.2 12.7zm18.3 0c0-2.8.3-5.2 1-7.2.7-2 1.7-3.6 3.1-4.9 1.3-1.2 2.9-2.1 4.7-2.7 1.8-.6 3.8-.9 5.9-.9 2.1 0 4.1.3 5.9.9 1.8.6 3.4 1.5 4.7 2.7 1.3 1.2 2.4 2.9 3.1 4.9.7 2 1 4.4 1 7.2s-.3 5.2-1 7.2c-.7 2-1.7 3.6-3.1 4.9-1.3 1.2-2.9 2.1-4.7 2.7-1.8.6-3.8.9-5.9.9-2.1 0-4.1-.3-5.9-.9-1.8-.6-3.4-1.5-4.7-2.7-1.3-1.2-2.4-2.9-3.1-4.9-.7-2-1-4.4-1-7.2z"
          fill="#232F3E"
        />
        <path
          d="M239.8 113.8c-30.8 22.7-75.6 34.8-124 34.8-40.4 0-78.1-8.9-109.8-24.6-2.5-1.2-2.7-4.2-.6-5.8 11.2-8.5 24.3-15.5 38.6-20.6 2.3-.8 4.7.5 5.8 2.7 20.9 41.6 70.8 45.4 100.8 30.1 2.3-1.2 4.9.1 5.3 2.7.9 6.2 2.4 13.9 4.1 20.7z"
          fill="#FF9900"
        />
        <path
          d="M250.7 97.4c-3.9-5-25.5-11.8-39.6-7.8-3.4 1-3.6 4.7-.4 6.7 13.2 8.3 28.4 10.3 35.8 7.3 2.4-1 5.4-3.8 4.2-6.2z"
          fill="#FF9900"
        />
      </svg>
    );
  }

  // Docker
  if (normalized.includes('docker')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 218" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M255.4 108.6c-4.3-30.7-32.9-40.6-33.6-40.8l-8.6-2.9-5.4 7.4c-9.8 13.5-23.7 18.2-34.5 19.3-3.6-25-23.1-39.9-24.8-41.2l-6.8-5-6 5.9c-22.1 21.6-23.7 54.3-24 61.8H5.8l-5.8 6.4c6.3 34.1 24.6 63.6 52.8 83.2 24.7 17.2 55.4 25.1 88.9 23 48.7-3.1 94.6-30.8 113.6-86.8 5-14.8.6-27.1.1-30.3z"
          fill="#2496ED"
        />
        <g fill="#FFFFFF">
          <rect x="73.8" y="70.9" width="22" height="20.3" rx="2" />
          <rect x="100.7" y="70.9" width="22" height="20.3" rx="2" />
          <rect x="73.8" y="45.9" width="22" height="20.3" rx="2" />
          <rect x="100.7" y="45.9" width="22" height="20.3" rx="2" />
          <rect x="127.6" y="70.9" width="22" height="20.3" rx="2" />
          <rect x="127.6" y="45.9" width="22" height="20.3" rx="2" />
          <rect x="46.9" y="70.9" width="22" height="20.3" rx="2" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript') || normalized.includes('ts')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="36" fill="#3178C6" />
        <path
          d="M140.2 135.2v-17.6h73.2v17.6h-27.3v85.2h-18.6v-85.2h-27.3zm-51.5 50.8c-1.4 6.8-5.3 12.3-11.8 16.5-6.5 4.2-14.6 6.3-24.3 6.3-12.7 0-22.9-3.7-30.6-11.1-7.7-7.4-11.9-17.7-12.6-30.9l17.7-2c.8 8.9 3.5 15.6 8.1 20.1 4.6 4.5 10.4 6.8 17.4 6.8 5.7 0 10.3-1.3 13.8-3.9 3.5-2.6 5.3-6.2 5.3-10.8 0-4.1-1.3-7.5-3.9-10.2s-7.5-5.6-14.7-8.7l-10.4-4.5c-10.7-4.6-18.4-10.3-23.1-17.1-4.7-6.8-7.1-15.1-7.1-24.9 0-11.9 4.3-21.3 12.9-28.2 8.6-6.9 19.8-10.4 33.6-10.4 12.1 0 22 3.3 29.7 9.9 7.7 6.6 11.9 15.9 12.6 27.9l-17.7 1.8c-.7-7.7-3.1-13.4-7.2-17.1-4.1-3.7-9.9-5.6-17.4-5.6-5.7 0-10.3 1.3-13.8 3.9-3.5 2.6-5.3 6.1-5.3 10.5 0 4.1 1.4 7.4 4.2 9.9 2.8 2.5 7.6 5.2 14.4 8.1l9.6 4.1c11.7 5 20.1 10.8 25.2 17.4 5.1 6.6 7.7 14.8 7.7 24.6 0 7.8-2 15-6 21.6z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M128 0C93.9 0 72.5 17.1 64 51.3c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.8 9.6 24.5 17.5 12.6 12.8 27.2 27.7 58.7 27.7 34.1 0 55.5-17.1 64-51.3-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.8-9.6-24.5-17.5C174.1 14.9 159.5 0 128 0zM64 77C29.9 77 8.5 94.1 0 128.3c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.8 9.6 24.5 17.5 12.6 12.8 27.2 27.7 58.7 27.7 34.1 0 55.5-17.1 64-51.3-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.8-9.6-24.5-17.5C110.1 91.9 95.5 77 64 77z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // GraphQL
  if (normalized.includes('graphql')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M128 0L17.2 64v128L128 256l110.8-64V64L128 0zm-84.5 77.2L128 28.5l84.5 48.7v97.6L128 223.5 43.5 174.8V77.2z"
          fill="#E10098"
        />
      </svg>
    );
  }

  // Redis
  if (normalized.includes('redis')) {
    return (
      <svg className={className} style={style} viewBox="0 0 256 220" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 64.9l128-40.4 128 40.4-128 40.4L0 64.9zm256 46.5l-128 40.4-128-40.4v44.1l128 40.4 128-40.4v-44.1zm0 54.2l-128 40.4-128-40.4v44.1l128 40.4 128-40.4v-44.1z"
          fill="#DC382D"
        />
      </svg>
    );
  }

  // Default Fallback
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
