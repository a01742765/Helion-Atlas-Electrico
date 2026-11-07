# Registro de cambios y contraste con auditoría — v1.5

Base: ZIP v1.4 SHA256 dcae71bd5c92a9d840a1864b042ad128273b240dd427a1c3936c2f7d7164b65b, idéntico al auditado. Copia independiente, sin acciones sobre GitHub ni publicación.

| Área | Implementación | Evidencia |
|---|---|---|
| Generación | Total 2022 141343; se mantienen 33 componentes y residuos 2022/23. Gráficas derivadas de la misma base; SEN separado | A0112–A0147, A0244–A0249, A0386–A0394 |
| Agua | Literal 100594 miles m³; interpretación pendiente; comparación suspendida y esquema explicativo | A0363, A0385, A0395 |
| Centrales | 15 fichas con año/base/operación y fuentes por campo; Zimapán 304, Peñasco secuencia I 120 y complejo 420; conflicto Portezuelos I, precisión Portezuelos II y municipio Altar | A0001–A0111 |
| Mapas | Conservados los tres, mismos pares de coordenadas y contorno; Xalapa corregida; pines aproximados; GCR distintas de gerencias CFE; anclaje PAM no verificado retirado | A0252–A0327, transferencia sección 5 |
| Distribución | SAIDI/SAIFI atribuibles y anuales >5 min; totales CNE separados; pérdidas con AT/MT+BT y puntos porcentuales | A0328–A0329, A0357–A0358 |
| Jurídico | Cuatro fechas/vigencias, antecedentes y cinco repercusiones; 54% anual como mandato, sin causalidad estadística | A0370–A0379, A0396; fuentes externas adicionales detalladas en FUENTES_Y_LIMITACIONES.md |
| Simuladores | Fórmulas conservadas; RMS, resistencia total, razón respecto a carga, límites y marcas logarítmicas | A0380–A0384 |
| Hallazgos | Veinte conservados; 13 comparaciones y siete enlaces a gráficas/esquemas, incluido agua | A0339–A0358, A0397 |
| Accesibilidad | Contraste de texto con azul existente de HELION, foco, teclado, desplazamiento accesible y adaptación móvil | Pruebas Playwright y axe |
| Interacción | Se repara respuesta vacía del cuestionario que consumía su manejador; Escape cierra menú | Regresión de navegador |

Se conservan logotipos, tipografía, colores de marca y estructura. Cambia el color de texto secundario a azul ya existente para cumplir contraste; no se realiza rediseño.

Los 397 registros originales se incluyen en docs/evidencia/auditoria.json y CSV, sin cambiar sus estados. La implementación no convierte pendientes documentales en validados. Ley CFE art.2 se localizó adicionalmente en p.2/PDF1 de la copia oficial 2025: precisión documentada respecto de A0376. Las fuentes nuevas y sus localizadores están en FUENTES_Y_LIMITACIONES.md.

Pendientes: interpretación del agua, conflicto municipal Portezuelos I, posiciones exactas, límites oficiales CFE, algunos ordinales, disponibilidad individual CCI, conciliación entre ediciones nacionales, emisiones y evidencia causal de tarifas/inversión.
