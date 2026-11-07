# Instalación local en Visual Studio Code

1. Descomprime HELION_v1_5_COMPLETO.zip en una carpeta nueva, independiente del repositorio original.
2. Abre la carpeta HELION_Atlas_Electrico_v1_5 en Visual Studio Code.
3. Abre Terminal → Nueva terminal. Ejecuta `python -m http.server 8000 --bind 127.0.0.1` (en Windows también puedes usar `py` en lugar de `python`).
4. Visita http://localhost:8000. No abras index.html con doble clic: utiliza módulos JavaScript.
5. Detén el servidor con Ctrl+C. No publiques sin autorización académica.

## Aplicar solo el parche

Haz primero una copia independiente del contenido de v1.4. Extrae HELION_v1_5_PARCHE.zip y copia su contenido dentro de esa copia, conservando rutas y aceptando reemplazos. No lo apliques sobre a01742765/Helion. El parche contiene únicamente archivos nuevos o modificados; no requiere borrar archivos.

## Pruebas

Con Node.js 20 o posterior: `npm test` ejecuta las cuatro pruebas sin instalar dependencias. Para navegador: `npm ci`, `npx playwright install chromium` y `npm run test:browser`. Solo las herramientas de desarrollo necesitan npm; la aplicación no necesita compilación. Los resultados se guardan en work/test-results. Se puede seleccionar Chromium local mediante HELION_CHROMIUM_PATH.
