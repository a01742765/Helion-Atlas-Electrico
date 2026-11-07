# HELION Atlas — Evidencia geográfica de la versión 1.4

## Qué se corrigió

1. Los mapas de Generación, Transmisión y Distribución comparten un contorno de México y **una misma proyección equirectangular**, obtenida del polígono público `Natural Earth (1:110m)`; por ello, una localidad ya no puede aparecer en una región diferente entre los tres mapas por culpa de la escala.
2. Los 15 registros de centrales de generación se posicionan por **municipio, localidad o región de referencia**: no se presentan como coordenadas georreferenciadas de instalaciones.
3. Las 16 divisiones de CFE se ordenaron como en la **Figura III.1, página 7**, del Programa de Ampliación y Modernización de las Redes Generales de Distribución 2024–2038. Tres divisiones del Valle de México comparten un marcador agrupado.
4. El mapa de transmisión distingue las **siete regiones del Sistema Interconectado Nacional** y los **tres sistemas aparte** (Baja California, Baja California Sur y Mulegé). No dibujamos rutas de líneas ni puntos de interconexión.
5. Las fichas de las centrales incluyen por separado una cita para capacidad y una fuente para su municipio o región de referencia.

## Fuentes externas (consultadas el 5 de noviembre de 2026)

- **CFE Distribución**, *Programa de Ampliación y Modernización de las Redes Generales de Distribución 2024–2038*, Figura III.1, p. 7: https://www.cfe.gob.mx/distribucion/cumplimiento/Documents/PAM%20RGD%202024-2038%20VF.pdf
- **CENACE**, *Diagramas Unifilares del Sistema Eléctrico Nacional 2020–2025*, mapa introductorio de regiones: https://www.cenace.gob.mx/Docs/10_PLANEACION/DiagramasUnifilares/Mod%20Gral%20Planeaci%C3%B3n%202020-2025%20Diagramas%20Unifilares%20RNT%20y%20RGD%20del%20MEM.pdf
- **CFE, acta de transparencia 2019** (municipios de Portezuelos, Mazatepec y Encanto): https://www.cfe.gob.mx/transparencia_etica/transparencia/Actas%20de%20Comit%20Transparencia/8%20Octava%20Sesi%C3%B3n26febrero2019.pdf
- **CFE Generación I, documento técnico** (Zimapán, La Villita, Infiernillo, El Caracol): https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/Procedure/GetAnexo/933521
- **CFE Generación VI, Informe de gestión 2018–2024**, apartados de Angostura y Mazatepec: https://www.cfe.gob.mx/nuestraempresa/Informe%20de%20gestion%201824/EPS%20Generaci%C3%B3n%20VI.pdf
- **CFE Malpaso**, acta de contratación (Raudales Malpaso, Mezcalapa): https://portales-transparencia.cfe.mx/Gen6/28%20Procedimientos%20de%20Contratacin/Subgerencias/Grijalva/2025/GZ06A15%209400113252%20ACTA%20DE%20ENTREGA%20RECEPCION.pdf
- **Gobierno de Veracruz**, modernización de El Encanto (Tlapacoyan): https://www.veracruz.gob.mx/2025/04/09/con-una-inversion-de-18-mdd-veracruz-avanza-en-energias-limpias/
- **CFE**, boletín central Altar: https://www.cfe.gob.mx/cdn/2019/Archivos/Boletines/048_BoletinCCIAltarVF.pdf
- **Gobierno de Veracruz**, Atlas de Riesgos 2023, apartado Laguna Verde (municipio Alto Lucero): https://www.veracruz.gob.mx/proteccioncivil/wp-content/uploads/sites/5/2024/10/Atlas-de-Riesgos-del-Estado-de-Veracruz_.pdf
- **Natural Earth**, datos de fronteras, dominio público, capa de baja resolución (~1:110m): https://www.naturalearthdata.com/about/terms-of-use/ — Copia de datos incluida a través de fixture local GeoPandas/Pyogrio. No representa límites de divisiones CFE.

## Qué significan las posiciones

- `lat` y `lon` en `js/data.js` representan **puntos de referencia de ciudad, municipio o zona**, con precisión intencionalmente limitada. Un dato de ciudad no constituye la posición de una central, una sede de distribución o una subestación.
- `geoType` indica la categoría de la referencia (municipal, localidad o regional); `geoSource` enlaza la documentación pública que sustenta la localidad o región, pero no da una posición puntual exacta.
- CFE indicó en su comité de transparencia de 2020 que determinadas coordenadas específicas de infraestructura no se podían entregar. Acta: https://www.cfe.gob.mx/transparencia_etica/transparencia/Actas%20de%20Comit%20Transparencia/24%20Vig%C3%A9sima%20cuarta%20Sesi%C3%B3n2020%2023%20y%2024junio.pdf
- La proyección geográfica mejora la coherencia espacial; **NO** equivale a la georreferenciación oficial de centrales ni a cartografía exacta de los límites de CFE.

## Aspectos todavía pendientes

- Incorporar los límites geográficos oficiales de las 16 divisiones si existe un conjunto de polígonos públicamente autorizado y reutilizable. La Figura III.1 es una referencia, no un shapefile descargable.
- Examinar algunas capacidades de centrales: distintos informes presentan capacidad vigente, proyectada o modernizada. En v1.4 se conservan los MW de v1.3 sin declarar resuelta esa auditoría.
- Contrastar cartografía CENACE más reciente antes de afirmar que un enlace o aislamiento particular permanece vigente después de 2025.
- La prueba visual automática con Chrome del entorno se bloqueó por restricciones de navegación; deben hacerse pruebas en la computadora del usuario.

## Verificaciones técnicas

`node --check js/app.js`, `node --check js/data.js`, `node tests/smoke.mjs`, `node tests/division-map.mjs`, `node tests/geo-map.mjs`.

