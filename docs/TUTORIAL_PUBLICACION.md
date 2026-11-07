# Tutorial — HELION Atlas Eléctrico de México

## 0. Regla para proteger HELION original

NO cambiar, eliminar, hacer push ni desplegar la aplicación Atlas en `a01742765/Helion`.
Este proyecto debe quedar en un repositorio **nuevo** llamado, por ejemplo, `Helion-Atlas-Electrico`.

## 1. Descarga y prepara los archivos

1. Descarga `HELION_Atlas_Electrico_v1.zip` desde la respuesta de ChatGPT.
2. Descomprime el ZIP en tu computadora.
3. En la carpeta descomprimida encontrarás `index.html`, `css`, `js`, `assets`, `docs`, `tests` y `README.md`.
4. NO separes `index.html` de las carpetas, porque sus enlaces utilizan rutas relativas.

## 2. Prueba la app en tu computadora

Recomendado: instala Python 3 si no lo tienes.

1. Abre una terminal dentro de la carpeta que contiene `index.html`.
2. Ejecuta:
   - Windows: `py -m http.server 8000`
   - macOS/Linux: `python3 -m http.server 8000`
3. Abre `http://localhost:8000/` en Chrome, Edge, Firefox o Safari.
4. Para detener el servidor, regresa a la terminal y pulsa **Ctrl+C**.

> No se recomienda doble clic en `index.html`: los navegadores pueden bloquear el módulo `js/app.js` cuando se abre como `file://`.

## 3. Lista mínima de pruebas antes de publicar

1. Abre el menú de los cinco módulos. Comprueba el menú móvil reduciendo la ventana.
2. En Recursos, cambia las seis rutas energéticas, compara dos recursos y clasifica las 18 tarjetas; prueba la acción por botón y no solo arrastrando.
3. En Generación, cambia el filtro por tecnología y selecciona varias centrales en el primer mapa.
4. En Transmisión, selecciona los sistemas y mueve cada control del simulador; verifica que las cifras cambian.
5. En Distribución, revisa sus 16 referencias y modifica el simulador del transformador.
6. En ¿Sabías que?, filtra los 20 hallazgos y selecciona todos los hitos de la línea del tiempo.
7. Prueba en pantalla ancha y en un móvil. Comprueba zoom, Tab/Enter, enlaces de fuentes y consola del navegador.
8. Si cuentas con Node.js, ejecuta `node tests/smoke.mjs` en la carpeta principal; esa prueba es **básica**, no sustituye las pruebas manuales.

## 4. Publica en un repositorio nuevo de GitHub Pages

1. Entra a `https://github.com` con tu cuenta `a01742765`.
2. Pulsa **New repository** y escribe `Helion-Atlas-Electrico`; elige **Public**.
3. Crea el repositorio nuevo. No utilices el repositorio `Helion` existente.
4. En la página del nuevo repositorio, selecciona **Add file → Upload files** (o el enlace para subir archivos si está vacío).
5. Arrastra el **contenido descomprimido** del Atlas, manteniendo la estructura de carpetas; sube `index.html`, `css/`, `js/`, `assets/`, `docs/`, `tests/` y `.nojekyll`. No subas el ZIP solo, porque GitHub Pages no lo descomprime automáticamente.
6. Finaliza con **Commit changes** en la rama `main`.
7. En el nuevo repositorio, entra a **Settings → Pages**. Bajo *Build and deployment*, usa **Deploy from a branch**, selecciona `main` y `/(root)` y pulsa **Save**.
8. Cuando termine el despliegue, la URL esperada será: `https://a01742765.github.io/Helion-Atlas-Electrico/` (puede variar si eliges otro nombre).
9. Ábrela desde una ventana incógnita y realiza nuevamente las pruebas mínimas.

## 5. Correcciones y trabajo posterior

- Diseño y apariencia: `css/styles.css`.
- Texto de portada y estructura: `index.html`.
- Datos de CFE, fichas, hallazgos y referencias: `js/data.js`.
- Gráficas, mapas, simuladores e interacciones: `js/app.js`.
- Logos: `assets/brand/`.
- Documentación técnica y fuentes: `docs/FUENTES_Y_LIMITACIONES.md`.

**Atención:** Esta versión muestra ubicaciones estatales ilustrativas, no coordenadas oficiales de centrales ni delimitaciones de divisiones CFE. El marco histórico necesita un cotejo legislativo más completo. No declares los tres mapas como mapas georreferenciados oficiales ni el proyecto como rúbrica 100% cumplida hasta resolver estas diferencias.
