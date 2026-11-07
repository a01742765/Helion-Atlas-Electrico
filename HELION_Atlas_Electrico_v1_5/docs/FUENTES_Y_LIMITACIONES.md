# HELION v1.5 — Fuentes y limitaciones

Edición académica para revisión local, sin publicación. Auditoría de referencia: 6 de noviembre de 2026. La verificación de software no certifica los datos pendientes.

## Evidencia y trazabilidad

Se implementó sobre el ZIP v1.4 cuyo SHA256 es `dcae71bd5c92a9d840a1864b042ad128273b240dd427a1c3936c2f7d7164b65b`. Se consultaron el Markdown, las 13 páginas del informe y las siete hojas del Excel aportados por el usuario. Las filas originales están reproducidas en `evidencia/auditoria.json` y `.csv`: 397 registros, 322 VALIDADO, 18 INCONSISTENTE, 52 PENDIENTE DE VERIFICACIÓN y 5 NO DISPONIBLE. No son errores únicos ni un recuento de problemas del software final. Los estados originales se conservan para trazabilidad.

`ADJUNTO` en esas filas significa adjunto a la auditoría anterior. Los informes oficiales originales no estaban en los cuatro archivos de esta implementación. La mayor parte de las correcciones se respalda en el cotejo documental entregado; no se presenta como una segunda lectura completa de todos los originales oficiales.

`js/evidence.js` conserva referencias por campo. `ref` mantiene sus campos `doc` y `page` y añade ordinal PDF, edición, año del dato, publicación, institución, unidad, alcance, origen y estado. Un estado VALIDADO de transcripción no valida las coordenadas ni la interpretación física de otro campo. La interfaz dice “estado en auditoría”. Las fechas de publicación desconocidas se muestran como no disponibles: no se deducen del año de edición.

Los anclajes `#page` solo se crean desde un ordinal entero comprobado. Un rango, un folio impreso o un ordinal no disponible no genera anclaje. Para HTML se indica que no aplica. Los enlaces pueden cambiar en los portales institucionales; no se certifica disponibilidad futura ni la identidad binaria de todas las copias en línea.

## Inventario y exclusiones

- `Informe Anual Portal(1).pdf`: CFE 2022, sí es una fuente eléctrica.
- `Capitulo4(1).pdf`: extracto de PRODESEN 2023–2037, no el documento completo.
- La compilación rotulada LPTE contiene varias leyes de 2025; LPTE inicia p.192/PDF191.
- `Decreto(1).pdf`: reforma constitucional de 2013, no la de 2024.
- CONAMED 2022 y Registro Nacional de Archivos 2023: excluidos como evidencia eléctrica.
- El informe de transferencia de HELION aporta contexto, no estadísticas oficiales.

## Generación y capacidad

| Indicador | 2022 | 2023 | 2024 | Base |
|---|---:|---:|---:|---|
| Generación bruta propia CFE, GWh | 141343 | 150462 | 154059 | CFE 2023 p.300/PDF304; CFE 2024 p.26/PDF29 |
| Suma de las 11 tecnologías, GWh | 141342 | 150461 | 154059 | Se conservan los 33 valores originales |
| Generación neta inyectada SEN, GWh | 333964 | 346501 | 352305 | PLADESE 2025–2039 tabla 2.2; serie externa retrospectiva |

La cifra previa de 141342 sí tiene fuente (CFE 2023 p.15/PDF19). Se adopta el total del anexo y se explica la diferencia interna de 1 GWh; no se ajustan tecnologías para reconciliarlo. El residuo 2023 también es 1 GWh. `Otras` 2024 suma 15761 GWh a partir de sus seis componentes.

La limpia bruta propia CFE es 38982.9 GWh, aproximadamente 25.3%, incluye nuclear. No es renovable, ni total nacional, ni el 25.9% neto/diverso. La frase “del país” de la narrativa de CFE no se reproduce como alcance.

La serie SEN excluye GD y autoabasto local. No se divide generación bruta CFE entre neta SEN para obtener participación. Capacidad efectiva propia CFE: 44846.2 MW (2023) y 45116.7 MW (2024); Generación V/PIE 16603.4 MW, total 2024 61720.1 MW (CFE 2024 p.21/PDF24). La narrativa 2024 difiere 0.1 MW. Se prefiere la misma tabla retrospectiva; no se empalman sin conciliación PRODESEN 2023 y PLADESE 2025.

## Centrales y mapas

Las 15 fichas separan capacidad, año/base, operación anual y referencia territorial. Zimapán: 292 MW previos + 12 desde 1-dic-2024 = 304 al cierre. Puerto Peñasco conserva secuencia I, 120 MW de 2023, e informa complejo 420 MW FV al cierre 2024; secuencia II aporta 300 desde 11-sep-2024. Las baterías no se suman a MW FV.

Portezuelos I mantiene conflicto Ocoyucan/Atlixco y cierre municipal pendiente; no se mueve el pin por inferencia. Portezuelos II conserva 2 MW redondeados frente a 2.12 detallados; 0.032 GWh no equivale a inoperación. Altar se refiere a San Luis Río Colorado. Las CCI conservan 441.5 y 205.3 MW brutos efectivos de 2023, no capacidades netas de verano. Laguna Verde conserva 1608 MW efectivos de la base anual.

Los tres mapas conservan proyección, contorno y coordenadas de v1.4. Son referencias aproximadas, no equipos, sedes, centroides ni límites oficiales. 15 centrales, 10 registros de regiones/sistemas y 16 divisiones; Valle de México agrupa tres, resultando 14 marcadores de distribución. Xalapa corrige `divisionPoints[10].scope`. Ver `GEOGRAFIA_V1_5.md`.

## Agua y recursos

Se mantiene **100594 «miles de m³»**, CFE 2024 p.26/PDF29. Solo la transcripción está respaldada. La interpretación física y la unidad siguen pendientes de aclaración institucional. El diagnóstico con 22354 GWh implica una altura equivalente de ≈81.5 km con eficiencia uno; no representa una altura real. Se suspenden las minibarras y la comparación cuantitativa del agua; se proporciona un esquema de evidencia. No se sustituye “miles” por “millones”. El consumo termoeléctrico de agua, 127371 miles de m³, es otro indicador.

Combustibles y vapor conservan valores en TJ. El cálculo propio uranio 130118→130343 es +0.1729%; la fuente imprime −0.2% y revisa la cifra retrospectiva entre ediciones. Se usa el comparador de la misma tabla CFE 2024. Solar y eólica conservan `null`; no se convierten en ceros. 1 GWh = 3.6 TJ es conversión dimensional, no eficiencia de transformación. Emisiones directas y de ciclo de vida permanecen separadas y no cuantificadas; no se añadieron factores. Biomasa renovable no implica emisiones nulas.

## Transmisión y distribución

Las series originales se conservan. Siete GCR del SIN pertenecen a la estructura de CENACE; diez gerencias y 55 zonas corresponden a CFE Transmisión (2024 p.76/PDF79). BC está separada del SIN e interconectada con WECC. La planeación no prueba puesta en operación.

SAIDI y SAIFI corresponden a causas atribuibles a la distribuidora, por año y cliente, en interrupciones mayores a cinco minutos. Se mantienen 19.248/17.788/16.708 minutos y 0.411/0.391/0.375 interrupciones. CNE distingue para 2024 totales de todas las causas: 116.706 minutos y 1.038 interrupciones. No se sustituyen las series. Los pies de CFE p.96 están intercambiados: se usan siglas y unidades correctas. Pérdidas con AT 10.86→10.69% = −0.17 puntos porcentuales; MT+BT 2024 = 12.88%. No equivalen exclusivamente a pérdidas Joule.

49.1 millones de usuarios y 901 mil km son aproximaciones nacionales; no indicadores por división ni los 49016942 clientes de CFE SSB.

## Marco jurídico y comprobaciones externas adicionales

Cuatro hitos: 20-dic-2013, 11-ago-2014, 31-oct-2024 y 18-mar-2025. Se distinguen publicación y vigencia. Se desarrollan cinco repercusiones normativas. La exigencia anual de 54% de energía inyectada no es capacidad, porcentaje horario ni resultado de 2024. El MEM y su separación operativa/funcional permanecen; no se afirma cancelación automática de permisos.

Fuentes externas adicionales consultadas para completar los antecedentes y precisar localizadores:

1. Cámara de Diputados, LSPEE, última reforma 9-abr-2012, arts.1/3, p.1/PDF1: https://www.diputados.gob.mx/LeyesBiblio/abro/lspee/LSPEE_abro.pdf . Documenta reserva del servicio público y excepciones preexistentes.
2. DOF/SEGOB, decreto 2013, encabezado y cierre de la Comisión Permanente: https://sidof.segob.gob.mx/notas/docFuente/5327463 . Documenta aprobación de ambas cámaras y mayoría de legislaturas y declaratoria 18-dic-2013. HTML: paginación no aplica.
3. Secretaría de Economía, copia original LIE 2014, transitorio primero p.61/PDF61: https://www.economia.gob.mx/files/comunidad_negocios/industria_comercio/energia/LIElec_110814.pdf . Confirma vigencia general al día siguiente, con excepciones transitorias. La copia tiene 71 páginas; no se le trasladan ordinales de la edición DOF de la auditoría.
4. Cámara de Diputados, decreto integral 2025, 258 páginas: https://www.diputados.gob.mx/LeyesBiblio/ref/lse/LSE_orig_18mar25.pdf . **Precisión respecto de la transferencia**: Ley CFE art.2 está en p.2/PDF1 de esta copia, no p.3/PDF2. Se conserva intacta la fila A0376 original y se documenta aquí el ajuste del localizador. Transitorio3 p.41/PDF40; LSE art.12 VI p.97/PDF96; art.8 p.91/PDF90; transitorios p.134–135/PDF133–134. Ley CNE arts.1/2 p.243/PDF242; LPTE inicia p.192/PDF191.

Los resultados de tarifas/inversión y cualquier efecto causal de reformas siguen pendientes de series y método adecuados. Se explica el procedimiento político institucional, sin inferir motivaciones o consenso a partir del decreto.

## Simuladores

Transmisión: I=P/(√3·VLL·cosφ), PJ=3I²R. P es potencia activa de carga; V/I RMS, sinusoidal equilibrado, resistencia total por fase Ω. La razón 100·PJ/P no es eficiencia ni fracción de entrada. No se resuelven caída de tensión, flujo de carga ni límites térmicos. Se señalan pérdidas iguales o superiores a P como excesivas, sin recortar cifras. No superar ese umbral tampoco certifica viabilidad. La curva usa log10(1+PJ/(1 MW)), con marcas en MW.

Transformador monofásico ideal: Vs=Vp/ratio, Ip=S/Vp, Is=S/Vs; S en VA desde kVA, V/I RMS. Relación <1 es elevador. S no es P activa; no se añade √3 ni cosφ al cálculo I=S/V. Omite pérdidas, magnetización, saturación, impedancia y regulación.

## Pendientes conservados

Aclaración institucional del agua; cierre municipal de Portezuelos I; los 15 pares de coordenadas como emplazamientos exactos; precisión de pines regionales; geometrías oficiales CFE; vigencia territorial del Estatuto de 2018 al corte 2024; ordinal PAM y de documentos indexados; disponibilidad individual CCI al 31-dic-2024; conciliación de capacidades nacionales entre ediciones; factores de emisiones y evidencia causal de tarifas/inversión. No se declaran validados por pasar las pruebas de software.
