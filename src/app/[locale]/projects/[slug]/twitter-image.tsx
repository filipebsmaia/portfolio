import OpengraphImage, { generateStaticParams } from './opengraph-image';

export const alt = 'Project case study - Filipe Maia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export { generateStaticParams };

export default function TwitterImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  return OpengraphImage({ params });
}
