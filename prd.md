\# Especificación Técnica — Blog + CV Personal

\## 1. Objetivo

Construir una plataforma personal que sirva simultáneamente como:

\* Sitio personal

\* CV online

\* Portafolio técnico

\* Blog técnico

\* Base de conocimiento personal

El sitio debe:

\* Tener costo operativo mínimo

\* Ser extremadamente rápido

\* Ser fácil de mantener

\* Permitir publicación continua de artículos

\* Ser amigable para motores de búsqueda tradicionales e IA generativa

\* Tener una vida útil superior a 5 años sin rediseños importantes

\---

\# 2. Principios de Diseño

\## Simplicidad

Toda tecnología debe justificar su existencia.

No se implementarán:

\* Bases de datos

\* Backends

\* CMS complejos

\* Kubernetes

\* Docker

\* Microservicios

\* Infraestructura cloud innecesaria

\## Contenido Primero

El activo principal es el contenido.

La plataforma existe para publicar conocimiento.

\## Mantenibilidad

Una persona debe poder mantener el sistema en menos de 2 horas mensuales.

\## Portabilidad

El sitio debe poder migrarse entre proveedores en menos de una hora.

\---

\# 3. Arquitectura General

Arquitectura estática.

```text

Usuario

&#x20;   │

&#x20;   ▼

Cloudflare DNS

&#x20;   │

&#x20;   ▼

GitHub Pages

&#x20;   │

&#x20;   ▼

Astro Build

&#x20;   │

&#x20;   ▼

Contenido Markdown

```

No existe backend.

No existe base de datos.

Todo es generado durante el build.

\---

\# 4. Stack Tecnológico

\## Hosting

GitHub Pages

Razones:

\* Gratis

\* Confiable

\* Integración directa con GitHub

\* HTTPS automático

\* Dominio personalizado

\---

\## Framework

Astro

Razones:

\* Produce HTML estático

\* Excelente SEO

\* Muy rápido

\* Excelente experiencia para blogs

\* Fácil mantenimiento

\---

\## Lenguaje

TypeScript

Uso mínimo.

Solo para:

\* Componentes

\* Configuración

\* Utilidades

\---

\## Contenido

Markdown

Formato:

```markdown
\---

title: ""

description: ""

pubDate: ""

tags: \[]

\---

Contenido
```

Ventajas:

\* Portable

\* Legible

\* Controlado por Git

\---

\## Versionamiento

Git

Repositorio único:

```text

personal-site

```

\---

\## Dominio

Recomendado:

```text

dyool.dev

aaron.dev

```

Alternativas:

```text

dyronlogbook.dev

dyronlogbook.com

aaronvelasquez.dev

```

\---

\# 5. Estructura del Proyecto

```text

src/

│

├── pages/

│   ├── index.astro

│   ├── about.astro

│   ├── projects.astro

│   └── blog/

│

├── content/

│   └── blog/

│

├── layouts/

│

├── components/

│

└── styles/

```

\---

\# 6. Secciones del Sitio

\## Home

Propósito:

Presentar identidad profesional.

Contenido:

\* Nombre

\* Rol

\* Especialidades

\* Links principales

Ejemplo:

```text

Aarón Velásquez



Software Developer

Backend Engineering

Automation

AI Systems

```

\---

\## About

Historia profesional.

Contenido:

\* Quién eres

\* Qué haces

\* Intereses técnicos

\* Filosofía de trabajo

\---

\## Projects

Portafolio.

Cada proyecto debe incluir:

\* Problema

\* Solución

\* Tecnologías

\* Lecciones aprendidas

No solamente screenshots.

\---

\## Blog

Centro de contenido.

Categorías sugeridas:

```text

Backend

Arquitectura

DevOps

Cloud

Automatización

IA

Aprendizajes

```

\---

\## Now

Página opcional.

Inspirada en now.now.

Contenido:

```text

Qué estoy aprendiendo

Qué estoy construyendo

Qué estoy investigando

```

\---

\# 7. Modelo de Contenido

Cada artículo debe seguir:

```markdown
\---

title:

description:

pubDate:

updatedDate:

tags:

draft:

\---

\# Introducción

\# Contexto

\# Implementación

\# Resultados

\# Conclusiones
```

\---

\# 8. Estrategia de Publicación

Objetivo inicial:

1 artículo semanal.

No perseguir volumen.

Priorizar:

\* Casos reales

\* Soluciones reales

\* Problemas encontrados

Ejemplos:

Malo:

```text

¿Qué es Docker?

```

Bueno:

```text

Cómo desplegué FastAPI usando Docker en Oracle Cloud Free Tier

```

\---

\# 9. SEO Moderno

Objetivo:

Ser fuente para:

\* Google

\* ChatGPT

\* Claude

\* Gemini

\* Perplexity

\## Requisitos

Sitemap:

```text

/sitemap.xml

```

RSS:

```text

/rss.xml

```

Canonical URLs

Open Graph

Structured Data

Meta descriptions

\---

\# 10. Estrategia GEO

Generative Engine Optimization.

Contenido ideal:

\* Experiencias reales

\* Implementaciones

\* Comparativas

\* Tutoriales técnicos

Las IA citan contenido específico.

No contenido genérico.

\---

\# 11. Diseño Visual

Principios:

\* Minimalista

\* Profesional

\* Rápido

Inspiraciones:

\* Dan Abramov

\* Kent C. Dodds

\* Josh Comeau

\* Simon Willison

\---

\# 12. Sistema de Diseño

Tipografía:

```text

Inter

```

Fallback:

```text

system-ui

```

Colores:

```text

Background: #ffffff

Text: #111111

Accent: #2563eb

```

Modo oscuro:

```text

\#0f172a

```

\---

\# 13. Analytics

Fase 1

Ninguno.

Fase 2

Plausible Analytics.

Razones:

\* Ligero

\* Privacidad

Evitar Google Analytics inicialmente.

\---

\# 14. Comentarios

No implementar.

Razones:

\* Spam

\* Moderación

\* Complejidad

Alternativa:

```text

Twitter/X

LinkedIn

GitHub Discussions

```

\---

\# 15. Roadmap

\## Fase 1

Semana 1

\* Crear repositorio

\* Configurar Astro

\* Configurar GitHub Pages

\* Dominio

Entregable:

Sitio publicado.

\---

\## Fase 2

Semana 2

\* Home

\* About

\* Projects

Entregable:

CV online funcional.

\---

\## Fase 3

Semana 3

\* Blog

\* RSS

\* Sitemap

\* Metadata

Entregable:

Plataforma de publicación completa.

\---

\## Fase 4

Semana 4

Primeros 5 artículos.

Entregable:

Contenido inicial.

\---

\# 16. Riesgos

\## Riesgo

Abandonar la publicación.

Mitigación:

Publicar poco pero consistentemente.

\---

\## Riesgo

Sobreingeniería.

Mitigación:

No introducir backend sin necesidad demostrada.

\---

\## Riesgo

Rediseños constantes.

Mitigación:

Contenido antes que estética.

\---

\# 17. Métricas de Éxito

Primeros 3 meses:

\* Sitio online

\* 5 artículos

\* Dominio propio

6 meses:

\* 20 artículos

\* Portafolio consolidado

12 meses:

\* Base de conocimiento personal

\* Referencias externas

\* Tráfico orgánico

\---

\# 18. Decisiones Arquitectónicas

\## ADR-001

Usar Astro.

Estado:

Aceptado.

Razón:

Mejor equilibrio entre simplicidad y capacidad.

\---

\## ADR-002

Usar GitHub Pages.

Estado:

Aceptado.

Razón:

Costo cero.

\---

\## ADR-003

Markdown como fuente única de contenido.

Estado:

Aceptado.

Razón:

Portabilidad y simplicidad.

\---

\## ADR-004

Arquitectura estática.

Estado:

Aceptado.

Razón:

Menor costo operativo posible.
