import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Amish Built Garages';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #1a2e1a, #0a120a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: 200, height: 200, marginBottom: 40, display: 'flex' }}>
          <rect width="512" height="512" rx="112" fill="#1A2E1A" />
          <path d="M110 260 L256 110 L402 260" fill="none" stroke="#B87333" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 220 L160 410" fill="none" stroke="#B87333" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M352 220 L352 410" fill="none" stroke="#B87333" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 320 L352 320" fill="none" stroke="#B87333" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="256" cy="220" r="28" fill="#FCFAF7" />
        </svg>
        <h1 style={{ fontSize: '64px', fontWeight: 'bold', color: '#FCFAF7', margin: 0, marginBottom: '20px', textAlign: 'center', letterSpacing: '-0.05em' }}>
          Premium Amish Garages
        </h1>
        <p style={{ fontSize: '32px', color: '#B87333', margin: 0, marginBottom: '50px', letterSpacing: '0.05em' }}>
          Built by Hand. Built to Last.
        </p>
        <div style={{
          background: '#B87333',
          color: '#FCFAF7',
          padding: '20px 60px',
          borderRadius: '50px',
          fontSize: '32px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex'
        }}>
          Get a Quote
        </div>
      </div>
    ),
    { ...size }
  );
}
