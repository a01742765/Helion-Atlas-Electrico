# Cómo instalar HELION Atlas v1.4

## Método recomendado (proyecto completo)

1. Renombra tu carpeta actual `HELION_Atlas_Electrico` a `HELION_Respaldo_v1_3`.
2. Descomprime `HELION_Atlas_Electrico_v1_4.zip`.
3. Abre la carpeta `HELION_Atlas_Electrico_v1_4` en Visual Studio Code.
4. Abre la terminal en esa carpeta y ejecuta `python -m http.server 8000`.
5. Entra a `http://localhost:8000` y presiona `Ctrl+F5`.
6. Abre los módulos Generación, Transmisión y Distribución; comprueba la selección de marcadores y de tarjetas, el filtro por tecnología, el grupo VM, y que las fichas indiquen la localidad de referencia.

Si Python muestra que el puerto 8000 está ocupado, detén el servidor anterior con `Ctrl+C`, o utiliza otro puerto: `python -m http.server 8001` y abre `http://localhost:8001`.

## Método alternativo (parche)

Descomprime `HELION_Parche_Geografia_v1_4.zip` y **copia las carpetas conservando la estructura** sobre tu proyecto v1.3; acepta reemplazar los archivos repetidos. Incluye archivos modificados en `assets/maps`, `js`, `css`, `index.html` y documentos/pruebas nuevos.

## Importante

No modifiques el repositorio original `a01742765/Helion`. Esta versión se mantiene local hasta que decidas publicarla en otro repositorio.
