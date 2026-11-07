# HELION Atlas — Iteración de mejora 2 (v1.2)

## Problema detectado
La captura de Generación todavía mostraba 15 puntos numerados y varios amontonados. La versión 1.1 solo modificó Distribución.

## Cambios
- Símbolos SVG distintos para hidráulica, solar, nuclear y térmica.
- Agrupación visual automática de puntos regionales a menos de 39 unidades SVG para reducir superposiciones (sin afirmar georreferenciación).
- Panel desplegable para elegir una central cuando hay varias en un grupo.
- Directorio seleccionable de todas las centrales visibles, compatible con los filtros existentes.
- Fichas ilustradas esquemáticamente, que NO representan fotografía ni geometría real de cada central.
- Conservación del mapa de Distribución mejorado en v1.1, datos y cálculos.

## Pruebas manuales
1. Ejecutar `python -m http.server 8000` desde la raíz de este proyecto.
2. Ir a Generación. Debe aparecer la leyenda de cuatro tecnologías y la lista de 15 centrales.
3. Seleccionar una planta del directorio: cambia la ficha y resalta la referencia del mapa.
4. Seleccionar un círculo con un número mayor a 1: aparecen opciones para elegir cada central agrupada.
5. Filtrar por Solar: queda un registro y una ficha de Puerto Peñasco.
6. Filtrar por Nucleoeléctrica: queda Laguna Verde.
7. Volver a Todas y comprobar que Distribución sigue mostrando 16 divisiones y el grupo VM.
8. Probar Tab + Enter en un marcador y a 375 px de ancho.

## Límites
Los marcadores son ubicaciones regionales ilustrativas (no coordenadas oficiales). La capacidad MW sigue siendo la del dato original del archivo: debe auditarse antes de la entrega final. Las ilustraciones son genéricas por tecnología.
