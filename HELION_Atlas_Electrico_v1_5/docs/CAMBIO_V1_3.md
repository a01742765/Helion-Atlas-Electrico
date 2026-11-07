# HELION Atlas v1.3 — corrección del filtro tecnológico

## Corrección
- Se agregó 2022 al selector de producción por tecnología.
- Se incorporaron las 11 categorías de generación bruta de CFE, tal como figuran en el Informe Anual CFE 2023, anexo estadístico, p. 300 (página física 304 del PDF subido).
- Se agregaron datos y una prueba de regresión.
- No se alteraron los módulos, simuladores, mapas ni el repositorio original.

## Precaución de interpretación
- El informe imprime **141,343 GWh** como total de 2022; sus 11 categorías publicadas a GWh enteros suman **141,342 GWh**. La diferencia de 1 GWh se atribuye presumiblemente al redondeo, pero no se corrige artificialmente.
- 2022–2023: Informe Anual CFE 2023, anexo estadístico de generación, pp. 300–301.
- 2024: Informe Anual CFE 2024, p. 26.

## Prueba
1. Abre la web con Python o Live Server; recarga con Ctrl+F5.
2. En Generación → Producción por tecnología, selecciona 2022.
3. Verifica que el primer valor sea Ciclo combinado: 50,392 GWh y el hidroeléctrico 34,110 GWh.
4. Cambia a 2023 y 2024, comprobando que la gráfica responda.
