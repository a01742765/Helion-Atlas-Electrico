# HELION v1.6.1 — Corrección visual y de caché

## Motivo
Las capturas de la página mostraban los gráficos antiguos de v1.5 aun cuando GitHub tenía los nuevos archivos de v1.6. El HTML solicitaba `js/app.js` con la misma URL de siempre; por tanto era posible reutilizar un archivo almacenado en caché. El nuevo HTML incluye `js/app.js?v=161` y `css/visual-v1.6.css?v=161` para forzar la actualización tras el despliegue.

## Cambio visible
- SVG detallado de hidroeléctrica con embalse, tubería, turbina giratoria y generador.
- Solar: paneles, inversor y energía animada; nuclear: torres, núcleo simbólico y turbina; térmica: caldera y turbina.
- Transformador: núcleo magnético, bobinas, flujo magnético y trayectorias dinámicas en colores HELION. Los valores de tensión y corriente siguen saliendo de los cálculos originales.
- Animaciones visibles de movimiento en SVG; se desactivan automáticamente con la preferencia del sistema de movimiento reducido.

## Lo que no cambia
Datos oficiales, coordenadas, fórmulas, navegación, mapas, referencias documentales, módulos ni clasificador.

## Instalar en GitHub
Subir a la **raíz** los archivos `index.html`, `js/app.js`, `css/visual-v1.6.css` y confirmar. Conservar el resto. Esperar a que Actions → pages build and deployment esté verde. Abrir el sitio con Ctrl+F5. Si el sistema tiene desactivadas las animaciones, comprobar Configuración de Windows → Accesibilidad → Efectos visuales → Efectos de animación; el sitio respeta esa preferencia.

## Criterios de verificación
1. En Generación seleccionar una hidroeléctrica: ilustración ampliada con turbina circular giratoria, no el antiguo pictograma minimalista.
2. En Distribución, transformador: tarjeta azul marino con flujo amarillo desplazándose por el núcleo y línea turquesa/amarilla; al cambiar la relación 60:1 a 120:1, 220 V → 110 V.
3. Se conservan los 15 registros de centrales, 20 hallazgos y resultados eléctricos 80 MW/230 kV/5 Ω (200.8 A y ~0.605 MW de pérdidas).
4. Si `prefers-reduced-motion: reduce` está activo, los elementos se ven detallados pero no se mueven.
