# Reporte de pruebas — HELION v1.5

Resultado de navegador: PASS. Chromium 156.0.8078.79. Node.js 24.22.1.

Las tres pruebas originales pasaron en v1.4 y v1.5. La prueba adicional audit-v1.5 verifica los 33 valores frente a Excel, residuos, pendientes, fuentes y ejecuta los manejadores reales de ambos simuladores.

- PASS: Cinco módulos, tres mapas y veinte hallazgos
- PASS: Las 15 fichas responden y muestran año, base, operación y posición pendiente
- PASS: Filtros de las cuatro tecnologías y agrupación de centrales
- PASS: Diez referencias de transmisión y activación por teclado
- PASS: 16 divisiones, 14 marcadores, Xalapa y agrupación Valle de México
- PASS: Filtros de generación 2022–2024: los 33 valores aparecen en SVG
- PASS: Comparador: unidades compatibles, agua pendiente y null solar/eólico
- PASS: Seis cadenas de conversión
- PASS: Clasificador: error recuperable, 18 aciertos por teclado y reinicio
- PASS: Arrastrar y soltar una tarjeta mantiene la clasificación
- PASS: Reflexión: respuesta vacía recuperable, cinco preguntas y reinicio
- PASS: Simulador trifásico: referencia, cambio de tensión, exceso y reinicio
- PASS: Transformador: referencia, elevador y reinicio
- PASS: 20 hallazgos: cuatro filtros, cifras decimales y siete referencias gráficas
- PASS: Cronología completa, vigencias y cinco repercusiones
- PASS: Metadatos de fuentes y ningún anclaje PAM inventado
- PASS: Navegación de escritorio por las cinco secciones
- PASS: Accesibilidad automática escritorio con detalles desplegados
- PASS: Móvil 390 px: menú, teclado, cierre Escape y cinco secciones
- PASS: Sin desbordamiento global a 320, 390, 768 y 1440 px
- PASS: Accesibilidad automática móvil
- PASS: Sin excepciones JavaScript, sin recursos locales faltantes ni IDs duplicados

Casos físicos: 80 MW, 230 kV, 5 Ω, cosφ=1 → 200.817485 A, 0.604915 MW y 0.756144%; duplicar tensión divide corriente entre dos y pérdidas entre cuatro. Transformador 13200 V, relación 60 y 75 kVA → 220 V, 5.681818 A y 340.909091 A. También se probaron elevador, extremos y reinicios.

Axe no detectó infracciones WCAG 2 A/AA y 2.1 AA en los estados de escritorio y móvil examinados. No equivale a certificación integral ni sustituye pruebas con lectores de pantalla. Se revisaron capturas de mapa y simulador móvil. Sin excepciones JavaScript, recursos locales faltantes, IDs duplicados ni desbordamiento global a 320/390/768/1440 px.

Límites: pruebas realizadas en Chromium, no Safari/Firefox ni dispositivos físicos. No se certifica disponibilidad de todos los enlaces externos. Las fuentes pendientes mantienen ese estado. Se corrigieron durante las pruebas contraste, desbordamiento móvil, foco del diagrama desplazable y recuperación del cuestionario tras respuesta vacía.

Empaquetado: se verificó que aplicar el parche a la base reproduce byte por byte el proyecto entregado; los recursos de marca y el mapa original permanecen idénticos.
