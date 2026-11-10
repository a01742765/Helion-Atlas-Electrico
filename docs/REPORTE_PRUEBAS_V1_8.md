# Pruebas de HELION v1.8

Se ejecutaron `npm test` y `npm run test:browser` con Chrome. El navegador completó 25 grupos de comprobaciones. El resultado JSON y las auditorías automáticas de accesibilidad están en `docs/visual-v1.8/evidencia/`.

Se verificaron los cinco módulos; los tres mapas; 15 fichas de centrales, 16 divisiones y 20 hallazgos; filtros; teclado; clasificador; comparador; simuladores; cronología; valores 2022–2024; imágenes v1.8 cargadas; y la sincronización de fotografías con selecciones. No se detectaron excepciones de JavaScript, archivos locales faltantes ni identificadores duplicados.

Se probaron anchos de 320, 390, 768 y 1440 píxeles sin desbordamiento horizontal global. Las auditorías automáticas de escritorio y móvil no informaron infracciones WCAG 2 A/AA/2.1 AA; ambas dejaron tres comprobaciones «incomplete» que requieren evaluación humana. El recorrido también se probó con `prefers-reduced-motion: reduce`.

Estas pruebas comprueban el comportamiento de la interfaz; no sustituyen una revisión documental de cada cifra o licencia. `js/data.js` y `js/evidence.js` no cambiaron.
