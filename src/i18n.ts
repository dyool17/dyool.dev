// Locale config, translated UI strings, and path helpers.
//
// Architecture:
//   - English (default) lives at the canonical URLs: /, /about/, /projects/,
//     /blog/, /blog/<slug>/, /now/.
//   - Spanish lives under the /es/ prefix: /es/, /es/about/, etc.
//   - Each blog/project can be translated independently. Posts are linked
//     across locales via the `translationKey` frontmatter field. The slug
//     under /es/ matches the filename (e.g. es/blog/cost-of-an-extra-service/).
//   - When a page has no translation, the language switch falls back to the
//     locale's blog index (for posts) or the localized equivalent of the
//     current path (for static pages).

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  label: string;
  short: string;
  htmlLang: string;
  og: string;
  dateLocale: string;
  rssLang: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    label: 'English',
    short: 'EN',
    htmlLang: 'en',
    og: 'en_US',
    dateLocale: 'en-US',
    rssLang: 'en-us',
  },
  es: {
    label: 'Español',
    short: 'ES',
    htmlLang: 'es',
    og: 'es_ES',
    dateLocale: 'es-ES',
    rssLang: 'es-es',
  },
};

const LOCALE_PREFIX_RE = /^\/es(?=\/|$)/;

export function getLocaleFromPath(pathname: string): Locale {
  return LOCALE_PREFIX_RE.test(pathname) ? 'es' : 'en';
}

export function stripLocale(pathname: string): string {
  if (!pathname) return '/';
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '');
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function localizePath(pathname: string, target: Locale): string {
  const stripped = stripLocale(pathname || '/');
  let p = stripped;
  if (p === '' || p === '/') p = '/';
  if (target === DEFAULT_LOCALE) return p;
  if (p === '/') return '/es/';
  return `/es${p}`;
}

export function getAlternateLinks(pathname: string) {
  return LOCALES.map((loc) => ({
    hreflang: LOCALE_META[loc].htmlLang,
    href: localizePath(pathname, loc),
  }));
}

// ---------------------------------------------------------------------------
// Translated UI strings
// ---------------------------------------------------------------------------

type Specialty = { name: string; blurb: string };

type UITranslations = {
  skip: string;
  nav: { home: string; about: string; projects: string; blog: string; now: string };
  languageSwitch: { label: string; switchTo: string };
  home: {
    title: string;
    kicker: string;
    headline1: string;
    headline2Prefix: string;
    headline2Accent: string;
    headlineLine: string;
    lede: string;
    ctaBlog: string;
    ctaProjects: string;
    ctaAbout: string;
    strip: {
      basedIn: string;
      basedInValue: string;
      writingSince: string;
      writingSinceValue: string;
      stack: string;
      stackValue: string;
      currently: string;
      currentlyValue: string;
    };
    specialtiesHeading: string;
    specialtiesMore: string;
    specialties: Specialty[];
    featuredHeading: string;
    featuredMore: string;
    featuredBadge: string;
    featuredProblem: string;
    featuredSolution: string;
    featuredStack: string;
    featuredRead: string;
    latestHeading: string;
    latestMore: string;
    noPosts: string;
    moreWorkHeading: string;
    connectKicker: string;
    connectTitle: string;
    connectLede: string;
    connectLinkedin: string;
  };
  blog: {
    title: string;
    description: string;
    h1: string;
    lede: string;
    backToAll: string;
    noPosts: string;
    rssCta: string;
    tagsLabel: string;
  };
  about: {
    title: string;
    description: string;
    h1: string;
    lede: string;
    h2a: string;
    p2: string;
    h2b: string;
    interests: string[];
    h2c: string;
    p3: string;
    h2d: string;
    p4: string;
  };
  now: {
    title: string;
    description: string;
    h1: string;
    lede: string;
    lastUpdatedPrefix: string;
    h2a: string;
    h2b: string;
    h2c: string;
    learning: string[];
    building: string[];
    researching: string[];
  };
  projects: {
    title: string;
    description: string;
    h1: string;
    lede: string;
    problem: string;
    solution: string;
    stack: string;
    lessons: string;
    live: string;
    source: string;
    featured: string;
  };
  post: { updatedLabel: string; tagsLabel: string };
  notFound: {
    title: string;
    description: string;
    h1: string;
    lead: string;
    home: string;
    blog: string;
    projects: string;
    about: string;
  };
  footer: { builtWith: string; deployedOn: string };
};

export const ui: Record<Locale, UITranslations> = {
  en: {
    skip: 'Skip to content',
    nav: { home: 'Home', about: 'About', projects: 'Experience', blog: 'Blog', now: 'Now' },
    languageSwitch: { label: 'Language', switchTo: 'Switch language to {lang}' },
  home: {
    title: 'Home',
    kicker: 'Tech Lead · Senior Software Engineer',
    headline1: 'Backends that scale.',
    headline2Prefix: 'Teams that',
    headline2Accent: 'ship.',
    headlineLine: 'Notes from more than six years of building enterprise systems.',
    lede:
      "I'm {name} — a {jobTitle} with more than six years designing and building enterprise systems. I lead a small team, define technical standards, and still write code. This site is where I document the work.",
    ctaBlog: 'Read the blog',
    ctaProjects: 'See my experience',
    ctaAbout: 'About me',
    strip: {
      basedIn: 'Based in',
      basedInValue: 'Guatemala · remote',
      writingSince: 'Experience',
      writingSinceValue: '6+ years',
      stack: 'Stack',
      stackValue: '.NET · Java · TypeScript',
      currently: 'Currently',
      currentlyValue: 'Tech Lead at Grupo Distelsa',
    },
    specialtiesHeading: 'What I work on',
    specialtiesMore: 'About my approach',
    specialties: [
      {
        name: 'Backend',
        blurb:
          'C#, .NET, .NET Framework, Java, Spring Boot — REST APIs and microservices that hold up in production.',
      },
      {
        name: 'Frontend',
        blurb:
          'TypeScript, JavaScript, Vue.js, Angular — the pieces that meet the user, written with the same care as the API.',
      },
      {
        name: 'Architecture & integration',
        blurb:
          'RabbitMQ, sync and async communication, system integration, modular design — the wiring that keeps it all together.',
      },
      {
        name: 'Data & tools',
        blurb:
          'Oracle, PL/SQL, T-SQL, SQL, Docker, Git, Scrum — the boring parts that decide whether the rest actually works.',
      },
    ],
    featuredHeading: 'Recent work',
    featuredMore: 'All experience',
    featuredBadge: 'Current',
    featuredProblem: 'Role',
    featuredSolution: 'Focus',
    featuredStack: 'Stack',
    featuredRead: 'Read more',
    latestHeading: 'Latest writing',
    latestMore: 'All posts',
    noPosts: 'No posts published yet.',
    moreWorkHeading: 'More experience',
    connectKicker: 'Get in touch',
    connectTitle: 'Looking for a tech lead who still ships code?',
    connectLede:
      "I'm open to senior engineering and tech lead conversations. The fastest path is LinkedIn.",
    connectLinkedin: 'Connect on LinkedIn',
  },
  blog: {
    title: 'Blog',
    description:
      'Engineering writing on backend systems, microservices, and the work of leading a small team.',
    h1: 'Notes on what I build, what breaks, and what I learn.',
    lede:
      'Engineering writing on backend systems, microservices, and the work of leading a small team. Subscribe via <a href="/rss.xml">RSS</a>.',
    backToAll: 'Back to all posts',
    noPosts: 'No posts published yet.',
    rssCta: 'RSS',
    tagsLabel: 'Tags',
  },
  about: {
    title: 'About',
    description: 'About {name} — Tech Lead and Senior Software Engineer based in Guatemala.',
    h1: 'A tech lead who still ships code.',
    lede:
      "I'm {name}, a Tech Lead and Senior Software Engineer with more than six years designing and implementing enterprise solutions. I lead a team of three developers, define technical standards, and participate directly in architecture and implementation. Focused on maintainable, scalable systems aligned with business needs.",
    h2a: 'What I do',
    p2:
      'I design and build distributed systems with .NET, Java, microservices, REST APIs, and asynchronous messaging with RabbitMQ. Most of my work sits at the intersection of architecture and product: defining standards, reviewing code, mentoring, and coordinating with QA, infrastructure, and the business.',
    h2b: 'Technical competencies',
    interests: [
      '<strong>Backend:</strong> C#, .NET, .NET Framework, Java, Spring Boot, REST APIs, microservices.',
      '<strong>Frontend:</strong> TypeScript, JavaScript, Vue.js, Angular.',
      '<strong>Architecture & integration:</strong> RabbitMQ, synchronous and asynchronous communication, system integration, modular design.',
      '<strong>Data & tools:</strong> Oracle, PL/SQL, T-SQL, SQL, Docker, Git, Scrum.',
    ],
    h2c: 'Technical leadership',
    p3:
      'I lead a team of three: code reviews, mentoring, architecture review, and coordination with QA, infrastructure, and business stakeholders. I optimise for small, well-understood changes that survive a rollback in under a minute. I\'d rather ship a smaller, well-tested thing on Tuesday than a larger, brittle thing "soon".',
    h2d: 'Get in touch',
    p4: 'The fastest way to reach me is <a href="{linkedin}" rel="me noopener">LinkedIn</a>.',
  },
  now: {
    title: 'Now',
    description: 'What {name} is leading, learning, and researching right now.',
    h1: "What I'm focused on this season.",
    lede:
      'A snapshot of what I\'m leading, learning, and researching right now. Inspired by <a href="https://nownownow.com/about" rel="noopener">nownownow</a> — these pages should be short, honest, and updated every few months.',
    lastUpdatedPrefix: 'Last updated:',
    h2a: 'Leading',
    h2b: 'Learning',
    h2c: 'Researching',
    learning: [
      'Leading a team of three: code reviews, mentoring, and architecture review at Grupo Distelsa.',
      'Refining technical standards for distributed services with REST and RabbitMQ.',
      'Coordinating with QA, infrastructure, and the business to keep delivery boring.',
    ],
    building: [
      'Distributed services for internal quoting, credit, and insurance provider integration.',
      'ETM data capture from POS systems.',
      'Maintenance and refactoring of long-lived .NET / C# services backed by Oracle and PL/SQL.',
    ],
    researching: [
      'Where modular design ends and platform boundaries begin in mid-size enterprise systems.',
      'How to keep synchronous and asynchronous communication legible as systems grow.',
      'How to make code review scale without losing the mentoring it provides.',
    ],
  },
  projects: {
    title: 'Experience',
    description: 'Selected roles and the work behind them.',
    h1: 'Roles, responsibilities, and the systems behind them.',
    lede:
      'A concise look at the work I have led and shipped. Full detail is available on <a href="{linkedin}" rel="me noopener">LinkedIn</a>.',
    problem: 'Role',
    solution: 'Focus',
    stack: 'Stack',
    lessons: 'Highlights',
    live: 'Live',
    source: 'Source',
    featured: 'Current',
  },
    post: { updatedLabel: 'Updated', tagsLabel: 'Tags' },
    notFound: {
      title: 'Not found',
      description: "The page you were looking for doesn't exist.",
      h1: 'Page not found.',
      lead: "The page you were looking for doesn't exist, or it moved. Here are some ways back to familiar ground.",
      home: 'Go home',
      blog: 'Read the blog',
      projects: 'See experience',
      about: 'About me',
    },
    footer: { builtWith: 'Built with', deployedOn: 'Deployed on' },
  },
  es: {
    skip: 'Saltar al contenido',
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Experiencia',
      blog: 'Blog',
      now: 'Ahora',
    },
    languageSwitch: { label: 'Idioma', switchTo: 'Cambiar idioma a {lang}' },
  home: {
    title: 'Inicio',
    kicker: 'Tech Lead · Senior Software Engineer',
    headline1: 'Backends que escalan.',
    headline2Prefix: 'Equipos que',
    headline2Accent: 'entregan.',
    headlineLine: 'Notas de más de seis años construyendo sistemas empresariales.',
    lede:
      'Soy {name} — {jobTitle} con más de seis años diseñando e implementando sistemas empresariales. Lidero un equipo pequeño, defino estándares técnicos y sigo escribiendo código. Este sitio es donde documento el trabajo.',
    ctaBlog: 'Leer el blog',
    ctaProjects: 'Ver mi experiencia',
    ctaAbout: 'Sobre mí',
    strip: {
      basedIn: 'Ubicación',
      basedInValue: 'Guatemala · remoto',
      writingSince: 'Experiencia',
      writingSinceValue: '6+ años',
      stack: 'Stack',
      stackValue: '.NET · Java · TypeScript',
      currently: 'Actualmente',
      currentlyValue: 'Tech Lead en Grupo Distelsa',
    },
    specialtiesHeading: 'En qué trabajo',
    specialtiesMore: 'Sobre mi enfoque',
    specialties: [
      {
        name: 'Backend',
        blurb:
          'C#, .NET, .NET Framework, Java, Spring Boot — APIs REST y microservicios que se sostienen en producción.',
      },
      {
        name: 'Frontend',
        blurb:
          'TypeScript, JavaScript, Vue.js, Angular — las piezas que ve el usuario, escritas con el mismo cuidado que la API.',
      },
      {
        name: 'Arquitectura e integración',
        blurb:
          'RabbitMQ, comunicación síncrona y asíncrona, integración de sistemas, diseño modular — el cableado que mantiene todo junto.',
      },
      {
        name: 'Datos y herramientas',
        blurb:
          'Oracle, PL/SQL, T-SQL, SQL, Docker, Git, Scrum — la parte aburrida que decide si el resto funciona de verdad.',
      },
    ],
    featuredHeading: 'Trabajo reciente',
    featuredMore: 'Toda la experiencia',
    featuredBadge: 'Actual',
    featuredProblem: 'Rol',
    featuredSolution: 'Foco',
    featuredStack: 'Stack',
    featuredRead: 'Ver más',
    latestHeading: 'Lo último',
    latestMore: 'Todas las entradas',
    noPosts: 'Aún no hay entradas publicadas.',
    moreWorkHeading: 'Más experiencia',
    connectKicker: 'Contacto',
    connectTitle: '¿Buscas un tech lead que siga escribiendo código?',
    connectLede:
      'Estoy abierto a conversaciones sobre ingeniería senior y tech lead. La vía más rápida es LinkedIn.',
    connectLinkedin: 'Conectar en LinkedIn',
  },
  blog: {
    title: 'Blog',
    description:
      'Escritura de ingeniería sobre sistemas backend, microservicios y el trabajo de liderar un equipo pequeño.',
    h1: 'Notas sobre lo que construyo, lo que se rompe y lo que aprendo.',
    lede:
      'Escritura de ingeniería sobre sistemas backend, microservicios y el trabajo de liderar un equipo pequeño. Suscribirme via <a href="/es/rss.xml">RSS</a>.',
    backToAll: 'Volver a todas las entradas',
    noPosts: 'Aún no hay entradas publicadas.',
    rssCta: 'RSS',
    tagsLabel: 'Etiquetas',
  },
  about: {
    title: 'Sobre mí',
    description: 'Sobre {name} — Tech Lead y Senior Software Engineer con base en Guatemala.',
    h1: 'Un tech lead que sigue escribiendo código.',
    lede:
      'Soy {name}, Tech Lead y Senior Software Engineer con más de seis años diseñando e implementando soluciones empresariales. Lidero un equipo de tres desarrolladores, defino estándares técnicos y participo directamente en la arquitectura y la implementación. Enfocado en sistemas mantenibles y escalables, alineados con las necesidades del negocio.',
    h2a: 'Qué hago',
    p2:
      'Diseño y construyo sistemas distribuidos con .NET, Java, microservicios, APIs REST y mensajería asíncrona con RabbitMQ. La mayor parte de mi trabajo está en la intersección entre arquitectura y producto: definir estándares, revisar código, mentorear y coordinar con QA, infraestructura y el negocio.',
    h2b: 'Competencias técnicas',
    interests: [
      '<strong>Backend:</strong> C#, .NET, .NET Framework, Java, Spring Boot, APIs REST, microservicios.',
      '<strong>Frontend:</strong> TypeScript, JavaScript, Vue.js, Angular.',
      '<strong>Arquitectura e integración:</strong> RabbitMQ, comunicación síncrona y asíncrona, integración de sistemas, diseño modular.',
      '<strong>Datos y herramientas:</strong> Oracle, PL/SQL, T-SQL, SQL, Docker, Git, Scrum.',
    ],
    h2c: 'Liderazgo técnico',
    p3:
      'Lidero un equipo de tres: code reviews, mentoring, revisión de arquitectura y coordinación con QA, infraestructura y stakeholders de negocio. Optimizo para cambios pequeños y bien entendidos, que se puedan revertir en menos de un minuto. Prefiero entregar el martes algo más pequeño y bien probado, que algo más grande y frágil "pronto".',
    h2d: 'Contacto',
    p4: 'La forma más rápida de contactarme es <a href="{linkedin}" rel="me noopener">LinkedIn</a>.',
  },
  now: {
    title: 'Ahora',
    description: 'Qué está liderando, aprendiendo e investigando {name} en este momento.',
    h1: 'En qué estoy enfocado esta temporada.',
    lede:
      'Una instantánea de qué estoy liderando, aprendiendo e investigando ahora mismo. Inspirado por <a href="https://nownownow.com/about" rel="noopener">nownownow</a> — estas páginas deben ser cortas, honestas y actualizadas cada pocos meses.',
    lastUpdatedPrefix: 'Última actualización:',
    h2a: 'Liderando',
    h2b: 'Aprendiendo',
    h2c: 'Investigando',
    learning: [
      'Liderando un equipo de tres: code reviews, mentoring y revisión de arquitectura en Grupo Distelsa.',
      'Refinando estándares técnicos para servicios distribuidos con REST y RabbitMQ.',
      'Coordinando con QA, infraestructura y el negocio para que la entrega siga siendo aburrida.',
    ],
    building: [
      'Servicios distribuidos para cotización interna, crédito e integración con proveedores de seguros.',
      'Captura de datos ETM desde puntos de venta.',
      'Mantenimiento y refactor de servicios .NET / C# de larga vida sobre Oracle y PL/SQL.',
    ],
    researching: [
      'Dónde termina el diseño modular y empiezan los límites de plataforma en sistemas empresariales medianos.',
      'Cómo mantener legible la comunicación síncrona y asíncrona a medida que los sistemas crecen.',
      'Cómo hacer que el code review escale sin perder el mentoring que aporta.',
    ],
  },
  projects: {
    title: 'Experiencia',
    description: 'Roles seleccionados y el trabajo detrás de cada uno.',
    h1: 'Roles, responsabilidades y los sistemas detrás de ellos.',
    lede:
      'Una mirada concisa al trabajo que he liderado y entregado. El detalle completo está disponible en <a href="{linkedin}" rel="me noopener">LinkedIn</a>.',
    problem: 'Rol',
    solution: 'Foco',
    stack: 'Stack',
    lessons: 'Lo más destacado',
    live: 'En vivo',
    source: 'Código',
    featured: 'Actual',
  },
    post: { updatedLabel: 'Actualizado', tagsLabel: 'Etiquetas' },
    notFound: {
      title: 'No encontrado',
      description: 'La página que buscabas no existe.',
      h1: 'Página no encontrada.',
      lead: 'La página que buscabas no existe, o se ha movido. Aquí tienes algunas formas de volver a terreno conocido.',
      home: 'Ir al inicio',
      blog: 'Leer el blog',
      projects: 'Ver experiencia',
      about: 'Sobre mí',
    },
    footer: { builtWith: 'Construido con', deployedOn: 'Desplegado en' },
  },
};

export function t(locale: Locale): UITranslations {
  return ui[locale];
}

export function formatDate(
  d: Date,
  locale: Locale,
  opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
): string {
  return d.toLocaleDateString(LOCALE_META[locale].dateLocale, opts);
}

export function formatMonthYear(d: Date, locale: Locale): string {
  return d.toLocaleDateString(LOCALE_META[locale].dateLocale, {
    year: 'numeric',
    month: 'short',
  });
}

export function formatLongDate(d: Date, locale: Locale): string {
  return d.toLocaleDateString(LOCALE_META[locale].dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function otherLocale(loc: Locale): Locale {
  return loc === 'en' ? 'es' : 'en';
}
