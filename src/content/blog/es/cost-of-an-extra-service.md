---
title: 'El costo de un servicio extra'
description: 'Un incidente real en el que añadir una segunda base de datos convirtió un cambio de cinco líneas en un incendio de cuatro horas. Lecciones sobre cuándo no añadir infraestructura.'
pubDate: 2026-06-22
tags: ['backend', 'devops', 'aprendizajes']
lang: 'es'
translationKey: 'cost-of-an-extra-service'
---

# Introducción

Es fácil recurrir a un servicio nuevo cuando uno viejo resulta incómodo.
Este post trata de un momento en el que hice exactamente eso, y lo que me costó.

# Contexto

Una herramienta interna guardaba el estado de sus jobs en la misma instancia
de Postgres que usaba el producto principal. Un compañero pidió migrar los
jobs a una base de datos separada "por seguridad". Yo acepté, sobre todo
porque la petición sonaba razonable.

# Implementación

Lo que hice en realidad:

1. Aprovisioné un nuevo clúster gestionado de Postgres.
2. Escribí un script de migración de un solo uso.
3. Actualicé el worker para apuntar a la nueva cadena de conexión.
4. Añadí un feature flag para enrutar jobs a la base de datos vieja o a la nueva.
5. Escribí un plan de rollback que nadie iba a leer nunca.

El diff tenía unas cinco líneas. El radio de explosión, no.

# Resultados

La migración en sí salió bien. El rollback, no. El feature flag funcionó,
pero requería reiniciar la flota de workers, y el runbook para ese reinicio
era un párrafo en una página de wiki que nadie abría. Tardamos cuatro horas
en recuperarnos de un cutover rutinario porque el camino de vuelta era
teórico, no estaba ejercitado.

# Conclusiones

Tres reglas que me llevo:

- **El nuevo servicio tiene que pagarse solo antes del próximo trimestre.**
  Si la única razón es "por seguridad", la seguridad aún no está ahí: tienes
  una cosa más que se puede romper.
- **El rollback es parte de la feature.** Si no puedes hacer rollback en menos
  de cinco minutos, no tienes un rollback, tienes un plan.
- **Dos bases de datos son una máquina de estados, no una configuración.** El
  costo de desincronizarlas se paga en tiempo de incidente, no en facturas.

La lección es la aburrida: los sistemas pequeños y bien entendidos ganan a
los grandes y defensivos, casi siempre.
