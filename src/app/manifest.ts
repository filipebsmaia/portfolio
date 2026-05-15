import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Filipe Maia — Software Engineer',
    short_name: 'Filipe Maia',
    description:
      'Fullstack developer passionate about TypeScript, Java, React, Node.js, Clean Architecture, and Domain-Driven Design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0E1A',
    theme_color: '#0A0E1A',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
