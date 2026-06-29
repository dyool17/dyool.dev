---
title: 'Por qué estoy construyendo mi propio rincón de la web'
description: 'Tras años escribiendo en plataformas alquiladas, estoy consolidando mi sitio, CV y notas de ingeniería en un único sitio estático que poseo por completo.'
pubDate: 2026-06-15
updatedDate: 2026-06-20
tags: ['meta', 'escritura', 'backend']
lang: 'es'
translationKey: 'owning-your-corner-of-the-web'
category: 'Web'
---

# Introducción

Este es el primer post de un sitio que poseo de extremo a extremo. Es un
sitio estático. No hay base de datos, no hay backend, no hay CMS y no hay
analítica — al menos por ahora. Todo lo que ves se generó a partir de una
carpeta de archivos Markdown en tiempo de build.

# Contexto

Antes publicaba en plataformas que no controlaba. Cada una tenía reglas
distintas, formatos distintos y formas distintas de desaparecer. Después de
la tercera vez que una plataforma cambió de opinión, decidí que la cura era
un sitio estático que pudiese copiar y pegar a cualquier hosting en menos de
una hora.

El PRD que guía este sitio es corto y sin sentimentalismos: Astro en GitHub
Pages, Markdown como único formato de contenido, nada de JavaScript en el
camino crítico, y un presupuesto de mantenimiento de dos horas al mes.

# Implementación

Las partes interesantes:

- **Colecciones de contenido** con un esquema estricto. Cada post debe
  declarar un `pubDate`, una `description` de una línea y al menos un tag.
  Los borradores se filtran en build, nunca en runtime.
- **RSS y sitemap** generados desde la misma colección. Una única fuente de
  verdad, dos formatos de salida.
- **Tema claro y oscuro** a partir de custom properties de CSS. Un pequeño
  script inline aplica la elección del usuario antes del primer paint para
  evitar un flash del tema equivocado.
- **Datos estructurados** en JSON-LD para el sitio, la persona y cada post.
  Esto facilita que tanto los buscadores tradicionales como los generativos
  citen el contenido de forma limpia.

# Resultados

Un sitio que carga en menos de un segundo, no cuesta nada alojar y sobrevive
a que cualquier proveedor desaparezca. Puedo escribir en `vim`, hacer commit
y push. No hay script de deploy que mantener.

# Conclusiones

El punto de este sitio no es la tecnología. El punto es la disciplina de
poseer tu trabajo de extremo a extremo, incluidas las palabras. Todo lo
demás es una restricción a respetar, no un problema a resolver.
