import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Amish Built Garages';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Read local SVG
  const logoData = readFileSync(join(process.cwd(), 'public/icon-square.svg'));
  // Convert to base64 so next/og (Satori) can render it natively
  const logoBase64 = `data:image/svg+xml;base64,${logoData.toString('base64')}`;

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
        <img src={logoBase64} width="200" height="200" style={{ marginBottom: '40px' }} />
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
