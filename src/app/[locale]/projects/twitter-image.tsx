import ProjectsOpengraphImage, { generateStaticParams } from './opengraph-image';

export const alt = 'Projects - Filipe Maia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export { generateStaticParams };

export default function ProjectsTwitterImage({ params }: { params: Promise<{ locale: string }> }) {
  return ProjectsOpengraphImage({ params });
}
