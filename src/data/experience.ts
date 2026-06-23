// Curated experience entries derived from the CV. Kept as a typed module
// rather than the content collection so the data is colocated, easy to read,
// and doesn't introduce a build-time file glob for a fixed set of roles.

import type { Locale } from '../i18n';

export interface ExperienceEntry {
  /** Stable identifier for in-page anchors. */
  id: string;
  /** Role title (e.g. "Tech Lead"). */
  role: string;
  /** Company / organisation. */
  company: string;
  /** Location or remote note. */
  location: string;
  /** Start month (1-12). */
  startMonth: number;
  /** Start year. */
  startYear: number;
  /** End month (1-12). Null means current. */
  endMonth: number | null;
  /** End year. Null means current. */
  endYear: number | null;
  /** Short summary shown on the page header. */
  summary: string;
  /** What the role focused on (replaces "Solution"). */
  focus: string;
  /** Key responsibilities and outcomes (replaces "Lessons"). */
  highlights: string[];
  /** Stack tags. */
  stack: string[];
  /** Featured flag — the most recent role surfaces on the home page. */
  featured: boolean;
  /** Display order (lower first). */
  order: number;
}

type LocalisedExperience = {
  role: string;
  company: string;
  location: string;
  summary: string;
  focus: string;
  highlights: string[];
  stack: string[];
};

const EN: LocalisedExperience[] = [
  {
    role: 'Team Lead',
    company: 'Grupo Distelsa',
    location: 'Guatemala',
    summary:
      'Leading a small team, defining technical standards, and shipping distributed services in production.',
    focus:
      'Leads a team of three developers. Owns the technical direction: microservices, REST APIs, and asynchronous messaging with RabbitMQ. Defines standards, reviews architecture, and coordinates with QA, infrastructure, and the business.',
    highlights: [
      'Team leadership, mentoring, and code review at the architecture level.',
      'Defines and enforces technical standards for distributed services.',
      'Coordinates delivery with QA, infrastructure, and business stakeholders.',
    ],
    stack: ['C#', '.NET', 'Java', 'REST APIs', 'RabbitMQ', 'Microservices', 'Git', 'Scrum'],
  },
  {
    role: 'Senior Software Developer',
    company: 'Grupo Distelsa',
    location: 'Guatemala',
    summary:
      'Designed distributed services and the integrations behind them for internal credit, quoting, and insurance flows.',
    focus:
      'Designed and built distributed services with REST and RabbitMQ. Shipped APIs and services for internal quoting, credit, and insurance provider integration. Built ETM data capture from POS systems. Refactored and maintained long-lived .NET / C# services backed by Oracle and PL/SQL.',
    highlights: [
      'Distributed services for internal quoting, credit, and insurance provider integration.',
      'ETM data capture from POS systems.',
      'Refactoring and maintenance of long-lived .NET / C# services on Oracle and PL/SQL.',
      'Angular and JavaScript on the front end of the same systems.',
    ],
    stack: ['C#', '.NET', 'Oracle', 'PL/SQL', 'JavaScript', 'Angular', 'RabbitMQ'],
  },
  {
    role: 'Java Software Developer',
    company: 'Asseco Solutions S.A. — APplus ERP',
    location: 'Guatemala',
    summary:
      'Java web and backend modules for the APplus ERP platform, with SQL optimisation and REST integrations.',
    focus:
      'Built Java web and backend modules for the APplus ERP platform. Optimised SQL and integrated REST endpoints against external systems.',
    highlights: [
      'Java web and backend modules inside a long-lived ERP platform.',
      'SQL optimisation across existing schemas.',
      'REST integrations with external systems.',
    ],
    stack: ['Java', 'SQL', 'REST APIs'],
  },
  {
    role: 'Java Software Developer',
    company: 'Business Development Group S.A.',
    location: 'Guatemala',
    summary:
      'Maintained and optimised Java microservices for a finance-sector client, with requirements and Scrum.',
    focus:
      'Maintained and optimised Java microservices for a finance-sector client. Owned requirements gathering and ran delivery in Scrum. Modernised web applications and containerised environments with Docker.',
    highlights: [
      'Maintenance and performance work on Java microservices for a finance-sector client.',
      'Modernised web applications and Dockerised the runtime environment.',
      'Owned requirements and drove delivery inside a Scrum cadence.',
    ],
    stack: ['Java', 'Microservices', 'Docker', 'Scrum'],
  },
  {
    role: 'Programador Java',
    company: 'GuatEx',
    location: 'Guatemala',
    summary:
      'Java and Spring Boot microservices, plus desktop and web modules, with a focus on automating internal processes.',
    focus:
      'Built Java and Spring Boot microservices and REST APIs. Shipped JavaFX and Swing desktop applications and Angular web modules. Automated internal processes end to end.',
    highlights: [
      'Java and Spring Boot microservices with REST APIs.',
      'JavaFX and Swing desktop applications alongside Angular web modules.',
      'Automation of internal processes that previously ran by hand.',
    ],
    stack: ['Java', 'Spring Boot', 'REST APIs', 'JavaFX', 'Swing', 'Angular'],
  },
];

const ES: LocalisedExperience[] = [
  {
    role: 'Team Lead',
    company: 'Grupo Distelsa',
    location: 'Guatemala',
    summary:
      'Liderando un equipo pequeño, definiendo estándares técnicos y entregando servicios distribuidos en producción.',
    focus:
      'Lidera un equipo de tres desarrolladores. Define la dirección técnica: microservicios, APIs REST y mensajería asíncrona con RabbitMQ. Establece estándares, revisa arquitectura y coordina con QA, infraestructura y el negocio.',
    highlights: [
      'Liderazgo de equipo, mentoring y revisión de código a nivel de arquitectura.',
      'Define y aplica estándares técnicos para servicios distribuidos.',
      'Coordina la entrega con QA, infraestructura y stakeholders del negocio.',
    ],
    stack: ['C#', '.NET', 'Java', 'APIs REST', 'RabbitMQ', 'Microservicios', 'Git', 'Scrum'],
  },
  {
    role: 'Senior Software Developer',
    company: 'Grupo Distelsa',
    location: 'Guatemala',
    summary:
      'Diseñó servicios distribuidos y las integraciones detrás de ellos para flujos internos de cotización, crédito y seguros.',
    focus:
      'Diseñó y construyó servicios distribuidos con REST y RabbitMQ. Entregó APIs y servicios para cotización interna, crédito e integración con proveedores de seguros. Construyó la captura de datos ETM desde puntos de venta. Refactorizó y mantuvo servicios .NET / C# de larga vida sobre Oracle y PL/SQL.',
    highlights: [
      'Servicios distribuidos para cotización interna, crédito e integración con proveedores de seguros.',
      'Captura de datos ETM desde puntos de venta.',
      'Refactor y mantenimiento de servicios .NET / C# de larga vida sobre Oracle y PL/SQL.',
      'Angular y JavaScript en el front end de los mismos sistemas.',
    ],
    stack: ['C#', '.NET', 'Oracle', 'PL/SQL', 'JavaScript', 'Angular', 'RabbitMQ'],
  },
  {
    role: 'Java Software Developer',
    company: 'Asseco Solutions S.A. — APplus ERP',
    location: 'Guatemala',
    summary:
      'Módulos web y backend en Java para la plataforma APplus ERP, con optimización de SQL e integraciones REST.',
    focus:
      'Construyó módulos web y backend en Java para la plataforma APplus ERP. Optimizó SQL e integró endpoints REST contra sistemas externos.',
    highlights: [
      'Módulos web y backend en Java dentro de una plataforma ERP de larga vida.',
      'Optimización de SQL sobre esquemas existentes.',
      'Integraciones REST con sistemas externos.',
    ],
    stack: ['Java', 'SQL', 'APIs REST'],
  },
  {
    role: 'Java Software Developer',
    company: 'Business Development Group S.A.',
    location: 'Guatemala',
    summary:
      'Mantenimiento y optimización de microservicios Java para un cliente del sector financiero, con requirements y Scrum.',
    focus:
      'Mantuvo y optimizó microservicios Java para un cliente del sector financiero. Estuvo a cargo de la captura de requirements y llevó la entrega dentro de Scrum. Modernizó aplicaciones web y containerizó entornos con Docker.',
    highlights: [
      'Trabajo de mantenimiento y rendimiento sobre microservicios Java para un cliente financiero.',
      'Modernización de aplicaciones web y containerización del entorno con Docker.',
      'Captura de requirements y conducción de la entrega dentro de una cadencia Scrum.',
    ],
    stack: ['Java', 'Microservicios', 'Docker', 'Scrum'],
  },
  {
    role: 'Programador Java',
    company: 'GuatEx',
    location: 'Guatemala',
    summary:
      'Microservicios en Java y Spring Boot, además de módulos desktop y web, con foco en automatizar procesos internos.',
    focus:
      'Construyó microservicios en Java y Spring Boot con APIs REST. Entregó aplicaciones desktop en JavaFX y Swing, junto con módulos web en Angular. Automatizó procesos internos de extremo a extremo.',
    highlights: [
      'Microservicios en Java y Spring Boot con APIs REST.',
      'Aplicaciones desktop en JavaFX y Swing junto a módulos web en Angular.',
      'Automatización de procesos internos que antes corrían a mano.',
    ],
    stack: ['Java', 'Spring Boot', 'APIs REST', 'JavaFX', 'Swing', 'Angular'],
  },
];

// Shared metadata (dates, ordering, featured flag) — same for both locales.
const META: Omit<ExperienceEntry, keyof LocalisedExperience>[] = [
  {
    id: 'grupo-distelsa-team-lead',
    startMonth: 6,
    startYear: 2025,
    endMonth: null,
    endYear: null,
    featured: true,
    order: 1,
  },
  {
    id: 'grupo-distelsa-senior',
    startMonth: 11,
    startYear: 2022,
    endMonth: 7,
    endYear: 2025,
    featured: false,
    order: 2,
  },
  {
    id: 'asseco-solutions',
    startMonth: 7,
    startYear: 2022,
    endMonth: 11,
    endYear: 2022,
    featured: false,
    order: 3,
  },
  {
    id: 'business-development-group',
    startMonth: 10,
    startYear: 2021,
    endMonth: 6,
    endYear: 2022,
    featured: false,
    order: 4,
  },
  {
    id: 'guatex',
    startMonth: 3,
    startYear: 2020,
    endMonth: 10,
    endYear: 2021,
    featured: false,
    order: 5,
  },
];

function merge(locale: Locale): ExperienceEntry[] {
  const localised = locale === 'es' ? ES : EN;
  return META.map((meta, i) => ({
    ...meta,
    ...localised[i],
  })).sort((a, b) => a.order - b.order);
}

export function getExperience(locale: Locale): ExperienceEntry[] {
  return merge(locale);
}

export function getFeaturedExperience(locale: Locale): ExperienceEntry | undefined {
  return merge(locale).find((e) => e.featured);
}

/** Format a date range like "Jun 2025 — present" or "Nov 2022 — Jul 2025". */
export function formatRange(
  start: { month: number; year: number },
  end: { month: number; year: number } | null,
  locale: Locale,
): string {
  const fmt = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    year: 'numeric',
  });
  const startLabel = fmt.format(new Date(start.year, start.month - 1, 1));
  if (!end) {
    return locale === 'es' ? `${startLabel} — actualidad` : `${startLabel} — present`;
  }
  const endLabel = fmt.format(new Date(end.year, end.month - 1, 1));
  return `${startLabel} — ${endLabel}`;
}
