# HELION v1.8 — rediseño inmersivo

Esta versión parte del paquete completo v1.7. Conserva los cinco módulos, las 15 centrales, los mapas, las 16 divisiones, las gráficas, los simuladores, el clasificador, los 20 hallazgos y las fuentes técnicas existentes. `js/data.js` y `js/evidence.js` no se modificaron.

## Cambios visibles

- Portada de casi una pantalla completa con fotografía de líneas, imagen solar superpuesta, luz y movimiento; entrada directa al Atlas al desplazarse.
- Cinco escenas fotográficas grandes, una por módulo, con ambientes propios y narrativa visual continua.
- Fichas de generación, transmisión y distribución con fotografía grande que cambia al elegir una central, sistema o división. Las imágenes se identifican expresamente como ilustrativas, y nunca se usan como prueba de ubicación o capacidad.
- Ajustes de jerarquía, tipografía, espaciado, contraste y diseño responsivo. La navegación y el movimiento reducido siguen funcionando.
- Siete fotografías reales convertidas a WebP. Consulta [sus créditos y licencias](FOTOGRAFIAS_V1_8.md).

El CSS v1.8 está en `css/visual-v1.8.css`. Las funciones previas permanecen en `js/app.js`; las nuevas capas fotográficas y las transiciones se añaden allí y en `index.html`. La nueva hoja se carga después de las hojas anteriores.

Consulta [comparación visual](COMPARACION_VISUAL_V1_8.md), [pruebas](REPORTE_PRUEBAS_V1_8.md) y [publicación manual](PUBLICACION_MANUAL_V1_8.md).
