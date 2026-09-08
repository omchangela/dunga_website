import { ImageResponse } from 'next/og';

export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: 'linear-gradient(135deg, #246e7f 0%, #1a515e 60%, #e06527 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      >
        D
      </div>
    ),
    {
      ...size,
    }
  );
}
