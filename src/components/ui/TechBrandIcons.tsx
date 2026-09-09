import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechBrandIcon({ name, className = 'w-6 h-6', size }: TechIconProps) {
  const normalized = name.toLowerCase().trim();
  const style = size ? { width: size, height: size } : undefined;

  // Next.js (Official stylized monochrome N)
  if (normalized.includes('next')) {
    return (
      <svg className={className} style={style} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path
          d="M149.508 157.438L69.147 54H54V125.979H66.8391V69.3831L139.565 162.771C143.053 161.147 146.381 159.356 149.508 157.438Z"
          fill="url(#next_grad_1)"
        />
        <rect x="115" y="54" width="13" height="72" fill="url(#next_grad_2)" />
        <defs>
          <linearGradient id="next_grad_1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="next_grad_2" x1="121.5" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React (Official Cyan Atom)
  if (normalized.includes('react')) {
    return (
      <svg className={className} style={style} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Node.js (Official Hexagon JS Monogram Logo)
  if (normalized.includes('node')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.998 0c-.394 0-.783.104-1.127.303L2.09 5.37a2.26 2.26 0 0 0-1.134 1.957v9.346c0 .81.433 1.558 1.134 1.957l8.781 5.067c.344.199.733.303 1.127.303.394 0 .783-.104 1.127-.303l8.781-5.067a2.26 2.26 0 0 0 1.134-1.957V7.327c0-.81-.433-1.558-1.134-1.957l-8.781-5.067A2.27 2.27 0 0 0 11.998 0zm.006 2.12l7.74 4.464c.231.133.376.383.376.649v8.934c0 .266-.145.516-.376.649l-7.74 4.464a.75.75 0 0 1-.752 0l-7.74-4.464a.75.75 0 0 1-.376-.649V7.233c0-.266.145-.516.376-.649l7.74-4.464a.75.75 0 0 1 .752 0zm-.92 3.86a.75.75 0 0 0-.75.75v5.52l-2.03-1.173a.75.75 0 0 0-1.12.65v2.88a.75.75 0 0 0 .375.65l3.15 1.819a.75.75 0 0 0 1.125-.65V7.73a.75.75 0 0 0-.75-.75zm4.84 0a.75.75 0 0 0-.75.75v5.52l-2.03-1.173a.75.75 0 0 0-1.12.65v2.88a.75.75 0 0 0 .375.65l3.15 1.819a.75.75 0 0 0 1.125-.65V7.73a.75.75 0 0 0-.75-.75z"
          fill="#5FA04E"
        />
      </svg>
    );
  }

  // Laravel 11 (Official Red Isometric Layered Cube)
  if (normalized.includes('laravel')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.642 5.148l-9.16-5.07c-.446-.247-.988-.247-1.434 0L3.89 5.148c-.446.247-.722.724-.722 1.238v10.14c0 .514.276.991.722 1.238l9.16 5.07c.223.123.468.185.717.185.249 0 .494-.062.717-.185l9.16-5.07c.446-.247.722-.724.722-1.238V6.386c0-.514-.276-.991-.722-1.238zM12.75 2.152l7.77 4.303-3.13 1.733-7.77-4.303 3.13-1.733zm-1.5 0l3.13 1.733-7.77 4.303-3.13-1.733 7.77-4.303zm-8 5.63l7.25 4.014v8.606l-7.25-4.014V7.782zm8.75 12.62V11.796l7.25-4.014v8.606l-7.25 4.014z"
          fill="#FF2D20"
        />
      </svg>
    );
  }

  // Flutter (Official Multi-tier Flutter Wing)
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

  // Python (Official Yellow & Blue Snakes)
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

  // PostgreSQL (Official Slonik Elephant Vector Logo)
  if (normalized.includes('postgres') || normalized.includes('sql') || normalized.includes('psql')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.016 0A12.003 12.003 0 0 0 0 12a12 12 0 0 0 7.822 11.272c-.173-.787-.27-1.666-.27-2.617 0-4.053 2.149-7.258 5.34-8.77-1.042-1.467-1.666-3.266-1.666-5.221C11.226 2.97 14.195 0 17.89 0c.376 0 .748.031 1.11.092A11.968 11.968 0 0 0 12.016 0zm5.874 1.493c-2.855 0-5.168 2.313-5.168 5.171 0 1.625.753 3.076 1.93 4.032.553-.312 1.144-.572 1.766-.767a5.138 5.138 0 0 1-.528-2.265c0-1.168.948-2.115 2.116-2.115 1.168 0 2.115.947 2.115 2.115 0 1.168-.947 2.115-2.115 2.115-.17 0-.336-.02-.497-.058-.696.223-1.348.547-1.938.966 1.345 1.168 2.32 2.766 2.748 4.593 1.942-.486 3.402-2.146 3.618-4.225.109-1.05-.183-2.1-.81-2.924a5.147 5.147 0 0 0-4.237-6.738zm-5.016 9.878c-3.13 1.258-5.32 4.192-5.32 7.812 0 .937.147 1.83.414 2.656A11.972 11.972 0 0 0 12 24c6.627 0 12-5.373 12-12 0-.256-.01-.51-.025-.762-.515 2.502-2.38 4.475-4.877 4.965-.487-1.92-1.615-3.565-3.18-4.664a7.89 7.89 0 0 0-3.044-1.661z"
          fill="#4169E1"
        />
      </svg>
    );
  }

  // AWS & Docker (Amazon Web Services Official Logo)
  if (normalized.includes('aws') || normalized.includes('amazon')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.158 11.834c0-.798-.567-1.127-1.558-1.127-.852 0-1.748.243-2.525.688l-.44-.972C6.54 9.92 7.643 9.64 8.784 9.64c1.782 0 2.87.887 2.87 2.38v4.618h-1.496zm-1.527 3.99c.928 0 1.637-.417 2.072-1.144v1.077h1.496v-3.792c0-1.57-1.157-2.327-2.73-2.327-1.157 0-2.316.324-3.23.896l.51 1.018c.787-.463 1.734-.734 2.544-.734 1.11 0 1.57.494 1.57 1.34v.37c-.503-.047-1.134-.07-1.78-.07-1.92 0-3.13.787-3.13 2.148 0 1.34 1.042 2.148 2.678 2.148zm.417-1.144c-.958 0-1.53-.456-1.53-1.18 0-.74.625-1.196 1.77-1.196.47 0 .91.03 1.317.094-.17 1.326-1.01 2.282-1.557 2.282zm6.208-4.908h1.496l1.242 4.417 1.334-4.417h1.472l1.325 4.417 1.25-4.417h1.488l-1.96 5.862h-1.588l-1.29-4.225-1.282 4.225h-1.597zm-11.83 7.82c5.316 2.76 11.884 2.13 16.582-.725.263-.16.542.13.348.332-4.14 4.316-10.96 4.79-17.18 1.127-.37-.217-.14-.62.25-.734zm17.387-.194c.34-.448 1.22-1.42 1.48-2.028.055-.13.195-.148.27-.04.48.69 1.63 1.83 2.45 2.37.17.11.08.312-.11.312-.86 0-2.86-.33-4.09-.614z"
          fill="#FF9900"
        />
      </svg>
    );
  }

  // Docker (Official Whale Container Matrix)
  if (normalized.includes('docker')) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.929 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.186-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm21.758.337a.577.577 0 00-.518-.328h-3.248a.372.372 0 01-.364-.298 4.292 4.292 0 00-1.79-2.582 7.712 7.712 0 00-2.822-1.127.354.354 0 01-.29-.31 5.98 5.98 0 00-.776-2.427 6.13 6.13 0 00-2.022-2.043.37.37 0 00-.472.08l-.872.993a.36.36 0 00-.07.38c.45 1.137.604 2.374.453 3.593a.365.365 0 01-.31.316 12.56 12.56 0 00-5.839 2.072H.364A.364.364 0 000 11.416c0 1.25.178 2.474.526 3.642a10.875 10.875 0 003.02 5.034 11.75 11.75 0 005.158 2.87 14.62 14.62 0 005.908.318 15.688 15.688 0 005.81-2.12c2.146-1.39 3.597-3.64 3.99-6.17a.64.64 0 00-.446-.703z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  // TypeScript (Official Blue Square with White TS)
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

  // Tailwind CSS (Official Twin Cyan Waves)
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
