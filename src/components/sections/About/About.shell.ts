/**
 * Shell output that is the same in every locale: `ls` listings, file metadata
 * columns and `uname`. A real `ls -la` does not translate, and duplicating these
 * 41 lines per locale would be pure drift risk.
 */
export const invariantOutput: Record<string, string[]> = {
  'cat stack.txt': ['TypeScript, React/Next.js, Node.js, Java'],
  ls: ['bio.txt  stack.txt  certifications.txt', 'skills/  projects/'],
  'ls -la': [
    'total 24',
    'drwxr-xr-x  4 root root 4096 Mar 13 10:00 .',
    'drwxr-xr-x  3 root root 4096 Mar 13 09:00 ..',
    '-rw-r--r--  1 root root  512 Mar 13 10:00 bio.txt',
    '-rw-r--r--  1 root root  128 Mar 13 10:00 stack.txt',
    '-rw-r--r--  1 root root  256 Mar 13 10:00 certifications.txt',
    'drwxr-xr-x  8 root root 4096 Mar 13 10:00 skills/',
    'drwxr-xr-x  8 root root 4096 Mar 13 10:00 projects/',
  ],
  'ls skills/': ['languages/  frontend/  backend/  ops-cloud/', 'architecture/  technologies/'],
  'ls -la skills/': [
    'total 24',
    'drwxr-xr-x  8 root root 4096 Mar 13 10:00 .',
    'drwxr-xr-x  4 root root 4096 Mar 13 10:00 ..',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 languages/',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 frontend/',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 backend/',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 ops-cloud/',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 architecture/',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 technologies/',
  ],
  'ls projects/': [
    'ceu-gg.md  saga-library.md  ddd-with-nestjs.md',
    'clean-architecture-ts-template.md  gobarber.md  ecoleta.md',
  ],
  'ls -la projects/': [
    'total 32',
    'drwxr-xr-x  2 root root 4096 Mar 13 10:00 .',
    'drwxr-xr-x  4 root root 4096 Mar 13 10:00 ..',
    '-rw-r--r--  1 root root  512 Mar 13 10:00 ceu-gg.md',
    '-rw-r--r--  1 root root  280 Mar 13 10:00 saga-library.md',
    '-rw-r--r--  1 root root  310 Mar 13 10:00 ddd-with-nestjs.md',
    '-rw-r--r--  1 root root  260 Mar 13 10:00 clean-architecture-ts-template.md',
    '-rw-r--r--  1 root root  290 Mar 13 10:00 gobarber.md',
    '-rw-r--r--  1 root root  270 Mar 13 10:00 ecoleta.md',
  ],
  'uname -a': ['FilipeOS 1.0.0 portfolio x86_64 TypeScript/Node.js GNU/Linux'],
};

export const initialCommands = ['whoami', 'cat bio.txt'];
