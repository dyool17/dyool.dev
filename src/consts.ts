// Site-wide constants. Change once, propagate everywhere.
export const SITE = {
  title: 'Dylan Yool',
  shortName: 'Dylan',
  description:
    'Personal site of Dylan Yool — Tech Lead and Senior Software Engineer with more than 6 years of experience in .NET, Java, microservices, REST APIs, and asynchronous messaging with RabbitMQ.',
  url: 'https://dyool.dev',
  locale: 'en-US',
  author: 'Dylan Yool',
  linkedin: 'https://linkedin.com/in/dylanyool',
  // Used in JSON-LD Person schema.
  jobTitle: 'Tech Lead · Senior Software Engineer',
  knowsAbout: [
    '.NET',
    'Java',
    'Spring Boot',
    'Microservices',
    'REST APIs',
    'RabbitMQ',
    'TypeScript',
    'Vue.js',
    'Angular',
    'Oracle · PL/SQL',
    'SQL Server · T-SQL',
    'Docker',
    'Git',
    'System Architecture',
    'Technical Leadership',
  ],
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Experience' },
  { href: '/blog/', label: 'Blog' },
  { href: '/now/', label: 'Now' },
] as const;

// Centralized social/contact links. The user prefers LinkedIn as the single
// contact point — we intentionally do not expose email or GitHub here. If a
// future project entry needs a source link, it should be declared on the
// project itself, not surfaced through this list.
export const SOCIAL = [
  { href: SITE.linkedin, label: 'LinkedIn' },
] as const;
