import { ImageResponse } from 'next/og';
import { defaultLocale, localeFromSegment, locales, segmentFor } from '@/i18n/config';
import { projectsPageMessages } from './page.messages';

/**
 * Without this file, /projects inherits no og:image at all: a segment that
 * declares `openGraph` replaces the parent's wholesale, and Next only re-attaches
 * images from that same segment's own image files.
 *
 * No `runtime = 'edge'` here - it is mutually exclusive with generateStaticParams.
 */
export const alt = 'Projects - Filipe Maia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: segmentFor(locale) }));
}

export default async function ProjectsOpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localeFromSegment((await params).locale) ?? defaultLocale;
  const copy = projectsPageMessages[locale];

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '24px', color: '#00FFAA' }}>
          <span style={{ color: '#94A3B8' }}>$</span>
          <span>ls projects/</span>
        </div>
        <div
          style={{
            fontSize: '104px',
            fontWeight: 700,
            color: '#E2E8F0',
            lineHeight: 1.05,
            letterSpacing: '-2px',
          }}
        >
          {copy.title}
        </div>
        <div style={{ display: 'flex', fontSize: '30px', color: '#94A3B8', lineHeight: 1.35, maxWidth: '900px' }}>
          {copy.description}
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
    { ...size },
  );
}
