import { ImageResponse } from 'next/og';
import { defaultLocale, localeFromSegment, locales, segmentFor } from '@/i18n/config';
import { ogImageMessages } from './opengraph-image.messages';

// No `runtime = 'edge'`: it is mutually exclusive with generateStaticParams,
// which this route needs now that it sits under [locale].
export const alt = 'Filipe Maia - Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: segmentFor(locale) }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;
  const copy = ogImageMessages[locale];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0A0E1A',
        backgroundImage: 'radial-gradient(ellipse at top left, #111827 0%, #0A0E1A 55%)',
        padding: '72px',
        fontFamily: 'monospace',
        color: '#E2E8F0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.25,
          display: 'flex',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '28px',
          color: '#00FFAA',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            border: '2px solid #1E293B',
            borderRadius: '10px',
            backgroundColor: '#0A0E1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          {'>_'}
        </div>
        <span style={{ color: '#94A3B8' }}>filipemaia.dev</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '24px',
            color: '#00FFAA',
          }}
        >
          <span style={{ color: '#94A3B8' }}>$</span>
          <span>whoami</span>
        </div>
        <div
          style={{
            fontSize: '110px',
            fontWeight: 700,
            color: '#E2E8F0',
            lineHeight: 1.05,
            letterSpacing: '-2px',
          }}
        >
          Filipe Maia
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '36px' }}>
          <span style={{ color: '#00FFAA' }}>{'>'}</span>
          <span style={{ color: '#E2E8F0' }}>{copy.title}</span>
          <span style={{ color: '#1E293B' }}>·</span>
          <span style={{ color: '#94A3B8' }}>{copy.discipline}</span>
        </div>
        <div style={{ fontSize: '28px', color: '#94A3B8', marginTop: '8px' }}>
          TypeScript · React · Node.js · Clean Architecture · DDD
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '22px',
          color: '#94A3B8',
          position: 'relative',
        }}
      >
        <span>github.com/filipebsmaia</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
