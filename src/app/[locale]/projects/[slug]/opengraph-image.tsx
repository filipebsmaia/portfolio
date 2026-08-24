import { ImageResponse } from 'next/og';
import { caseStudySlugs, getCaseStudy } from './content';
import { defaultLocale, localeFromSegment, locales, segmentFor } from '@/i18n/config';

export const alt = 'Project case study - Filipe Maia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image routes are app *route* modules: generateStaticParams attaches to the last
// segment only and does NOT inherit the parent's params, so the product is explicit.
export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale: segmentFor(locale), slug })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: segment, slug } = await params;
  const study = getCaseStudy(slug, localeFromSegment(segment) ?? defaultLocale);

  const name = study?.name ?? 'Projects';
  const tagline = study?.tagline ?? 'Case studies from filipemaia.dev';
  const stackLine =
    study?.stack
      .flatMap((group) => group.items)
      .slice(0, 5)
      .join(' · ') ?? '';

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
          <span>cat projects/{slug}.md</span>
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
          {name}
        </div>
        <div style={{ display: 'flex', fontSize: '30px', color: '#94A3B8', lineHeight: 1.35, maxWidth: '900px' }}>
          {tagline}
        </div>
        <div style={{ display: 'flex', fontSize: '26px', color: '#00FFAA', marginTop: '4px' }}>{stackLine}</div>
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
