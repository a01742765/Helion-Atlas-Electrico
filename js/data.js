import {plantEvidence,fieldEvidence} from './evidence.js';
/* Datos atribuidos a los INFORMES ANUALES CFE proporcionados por la estudiante.
   Toda cifra apunta a año, alcance y página impresa del informe, NO a la página PDF.
   Los puntos gráficos de mapas son orientativos, NO coordenadas de centrales. */
export const DOCS = {
  cfe22:{name:'CFE · Informe Anual 2022',year:2022,url:'https://www.cfe.gob.mx/finanzas/reportes-financieros/Informe%20Anual%20Documentos/Informe%20Anual%20Portal.pdf'},
  cfe23:{name:'CFE · Informe Anual 2023',year:2023,url:'https://www.cfe.gob.mx/finanzas/reportes-financieros/Reportes%20Anuales%20Documentos/Informe%20Anual%202023.pdf'},
  cfe24:{name:'CFE · Informe Anual 2024',year:2024,url:'https://www.cfe.gob.mx/finanzas/reportes-financieros/Reportes%20Anuales%20Documentos/Informe%20Anual%202024.pdf'}
};
// Solo ordinales comprobados en la base; nunca se infieren sumando un desplazamiento.
const pdfPages={cfe23:{15:19,16:20,17:21,42:46,46:50,300:304,301:305,302:306},cfe24:{21:24,24:27,26:29,27:30,28:31,32:35,60:63,64:67,76:79,77:80,95:98,96:99,119:122,275:278,279:282}};
for(const doc of Object.values(DOCS))Object.assign(doc,{institution:'CFE',edition:doc.year,publicationYear:null,origin:'Adjunto revisado por la auditoría',format:'PDF'});
export const ref=(doc,page,metadata={})=>({doc,page,pdfPage:pdfPages[doc]?.[page]??null,institution:DOCS[doc]?.institution,edition:DOCS[doc]?.edition,publicationYear:null,origin:'Adjunto revisado por la auditoría',dataYear:null,unit:null,scope:'Consultar el alcance del indicador',status:'Consultar evidencia por campo',notes:'La edición del informe no determina su año de publicación.',...metadata});
export const generation = [
  {year:2022,gwh:141343,source:ref('cfe23',300,{dataYear:2022,unit:'GWh',scope:'Bruta propia CFE',status:'Total del anexo; discrepancia documentada',notes:'La p.15/PDF19 publica 141342; las tecnologías suman 141342. Se conserva el total del anexo sin alterar categorías.'})},
  {year:2023,gwh:150462,source:ref('cfe24',26)},
  {year:2024,gwh:154059,source:ref('cfe24',26)}
];
/* 2022: CFE Informe Anual 2023, anexo cuadros estadísticos de generación, p. 300 (generación bruta en GWh).
   El total impreso es 141,343 GWh; las categorías publicadas, redondeadas a GWh, suman 141,342.
   2023: mismo anexo, pp. 300–301. 2024: CFE Informe Anual 2024, p. 26. */
export const tech = [
  {name:'Ciclo combinado',g2022:50392,g2023:58234,g2024:61490,kind:'fósil'},
  {name:'Vapor convencional',g2022:17657,g2023:29336,g2024:28135,kind:'fósil'},
  {name:'Hidroeléctrica',g2022:34110,g2023:19568,g2024:22354,kind:'limpia'},
  {name:'Carboeléctrica',g2022:15186,g2023:15307,g2024:14012,kind:'fósil'},
  {name:'Nucleoeléctrica',g2022:10850,g2023:12386,g2024:12307,kind:'limpia'},
  {name:'Turbogás',g2022:7332,g2023:8168,g2024:8379,kind:'fósil'},
  {name:'Geotermoeléctrica',g2022:4543,g2023:4321,g2024:3692,kind:'limpia'},
  {name:'Diésel',g2022:1157,g2023:2657,g2024:2851,kind:'fósil'},
  {name:'Solar fotovoltaica',g2022:7,g2023:274,g2024:555,kind:'limpia'},
  {name:'Turbojet',g2022:38,g2023:124,g2024:209,kind:'fósil'},
  {name:'Eoloeléctrica',g2022:70,g2023:86,g2024:75,kind:'limpia'}
];
export const resources = [
  {name:'Gas natural',family:'fósil',energy:'Química',process:'Combustión y ciclo termodinámico',tech:'Ciclo combinado / turbogás',control:'Despachable, sujeto al suministro de combustible',direct:'Sí',life:'No cuantificadas aquí',value:782478,unit:'TJ',year:2024,source:ref('cfe24',26)},
  {name:'Combustóleo',family:'fósil',energy:'Química',process:'Combustión y vapor',tech:'Vapor convencional',control:'Despachable, sujeto al suministro',direct:'Sí',life:'No cuantificadas aquí',value:132950,unit:'TJ',year:2024,source:ref('cfe24',26)},
  {name:'Carbón',family:'fósil',energy:'Química',process:'Combustión / ciclo Rankine',tech:'Carboeléctrica',control:'Despachable, sujeto al combustible',direct:'Sí',life:'No cuantificadas aquí',value:128665,unit:'TJ',year:2024,source:ref('cfe24',26)},
  {name:'Uranio',family:'nuclear',energy:'Nuclear',process:'Fisión y ciclo de vapor',tech:'Nucleoeléctrica',control:'Generación programable',direct:'No durante operación normal de fisión',life:'Emisiones de ciclo de vida no cuantificadas aquí',value:130343,unit:'TJ',year:2024,source:ref('cfe24',26)},
  {name:'Agua turbinada',family:'renovable',energy:'Potencial gravitatoria',process:'Caída hidráulica y giro de turbina',tech:'Hidroeléctrica',control:'Depende de caudales y embalses',direct:'No por combustión',life:'No cuantificadas aquí',value:100594,unit:'miles de m³',year:2024,source:ref('cfe24',26)},
  {name:'Vapor geotérmico',family:'renovable',energy:'Térmica terrestre',process:'Vapor, turbina y generador',tech:'Geotermoeléctrica',control:'Depende del yacimiento',direct:'No es combustión fósil; las emisiones varían',life:'No cuantificadas aquí',value:85253,unit:'TJ',year:2024,source:ref('cfe24',26)},
  {name:'Sol',family:'renovable',energy:'Radiación',process:'Efecto fotovoltaico',tech:'Panel fotovoltaico',control:'Intermitente, depende de radiación',direct:'No en operación',life:'No cuantificadas aquí',value:null,unit:null,year:null,source:ref('cfe24',26)},
  {name:'Viento',family:'renovable',energy:'Cinética',process:'Rotor y generador',tech:'Eoloeléctrica',control:'Intermitente, depende de viento',direct:'No en operación',life:'No cuantificadas aquí',value:null,unit:null,year:null,source:ref('cfe24',26)}
];
export const transmission = [
  {year:2022,km:110449,substations:2279,mva:165541},
  {year:2023,km:110558,substations:2302,mva:164992},
  {year:2024,km:111138,substations:2317,mva:168981}
];
export const distribution = [
  {year:2022,saidi:19.248,saifi:.411,lossesAll:11.05,lossesMB:13.22},
  {year:2023,saidi:17.788,saifi:.391,lossesAll:10.86,lossesMB:12.88},
  {year:2024,saidi:16.708,saifi:.375,lossesAll:10.69,lossesMB:12.88}
];
// x,y representan posiciones ARTÍSTICAS en una silueta del país; NO latitud ni longitud.
// Las plantas se muestran agrupadas por entidad, no en coordenadas verificadas de su emplazamiento.
// v1.4 · Todas las capas usan la MISMA proyección sobre Natural Earth.
// Las latitudes y longitudes siguientes son de *localidades de referencia* (no de equipos ni sedes).
// El atlas NO muestra puntos de interconexión ni detalles de infraestructura protegida.
// Equirectangular; mismo sistema que assets/maps/mexico.svg.
export const geoProject=(lat,lon)=>({x:60+(lon+118.6)*26,y:26+(33.7-lat)*26});

export const plants = [
  {id:"zim",name:"C.H. Zimapán",state:"Hidalgo",technology:"Hidroeléctrica",mw:304,loc:"Zimapán / Cadereyta (referencia municipal)",lat:20.76,lon:-99.4,geoType:"municipal",geoSource:"https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/Procedure/GetAnexo/933521",source:ref("cfe24",24)},
  {id:"villita",name:"C.H. La Villita",state:"Michoacán",technology:"Hidroeléctrica",mw:320,loc:"Lázaro Cárdenas, Michoacán",lat:17.96,lon:-102.19,geoType:"municipal",geoSource:"https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/Procedure/GetAnexo/933521",source:ref("cfe24",24)},
  {id:"infiernillo",name:"C.H. Infiernillo",state:"Michoacán / Guerrero",technology:"Hidroeléctrica",mw:1200,loc:"Arteaga, Michoacán (referencia municipal)",lat:18.36,lon:-102.3,geoType:"municipal",geoSource:"https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/Procedure/GetAnexo/933521",source:ref("cfe24",24)},
  {id:"port1",name:"C.H. Portezuelos I",state:"Puebla",technology:"Hidroeléctrica",mw:2,loc:"Atlixco, Puebla",lat:18.91,lon:-98.44,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/transparencia_etica/transparencia/Actas%20de%20Comit%20Transparencia/8%20Octava%20Sesi%C3%B3n26febrero2019.pdf",source:ref("cfe24",24)},
  {id:"port2",name:"C.H. Portezuelos II",state:"Puebla",technology:"Hidroeléctrica",mw:2,loc:"Atlixco, Puebla",lat:18.91,lon:-98.44,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/transparencia_etica/transparencia/Actas%20de%20Comit%20Transparencia/8%20Octava%20Sesi%C3%B3n26febrero2019.pdf",source:ref("cfe24",24)},
  {id:"caracol",name:"C.H. El Caracol",state:"Guerrero",technology:"Hidroeléctrica",mw:600,loc:"General Heliodoro Castillo, Guerrero (referencia municipal)",lat:17.86,lon:-100.1,geoType:"municipal",geoSource:"https://msc.cfe.mx/Aplicaciones/NCFE/Concursos/Procedure/GetAnexo/933521",source:ref("cfe24",24)},
  {id:"angostura",name:"C.H. Belisario Domínguez (Angostura)",state:"Chiapas",technology:"Hidroeléctrica",mw:900,loc:"Venustiano Carranza, Chiapas (referencia municipal)",lat:16.34,lon:-92.58,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/nuestraempresa/Informe%20de%20gestion%201824/EPS%20Generaci%C3%B3n%20VI.pdf",source:ref("cfe24",24)},
  {id:"malpaso",name:"C.H. Malpaso",state:"Chiapas",technology:"Hidroeléctrica",mw:1080,loc:"Raudales Malpaso / Mezcalapa, Chiapas",lat:17.18,lon:-93.6,geoType:"localidad",geoSource:"https://portales-transparencia.cfe.mx/Gen6/28%20Procedimientos%20de%20Contratacin/Subgerencias/Grijalva/2025/GZ06A15%209400113252%20ACTA%20DE%20ENTREGA%20RECEPCION.pdf",source:ref("cfe24",24)},
  {id:"mazatepec",name:"C.H. Mazatepec",state:"Puebla",technology:"Hidroeléctrica",mw:220,loc:"Tlatlauquitepec, Puebla",lat:19.85,lon:-97.5,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/nuestraempresa/Informe%20de%20gestion%201824/EPS%20Generaci%C3%B3n%20VI.pdf",source:ref("cfe24",24)},
  {id:"penitas",name:"C.H. Ángel Albino Corzo (Peñitas)",state:"Chiapas",technology:"Hidroeléctrica",mw:420,loc:"Ostuacán, Chiapas (referencia municipal)",lat:17.4,lon:-93.3,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/nuestraempresa/Informe%20de%20gestion%201824/EPS%20Generaci%C3%B3n%20VI.pdf",source:ref("cfe24",24)},
  {id:"encanto",name:"C.H. El Encanto",state:"Veracruz",technology:"Hidroeléctrica",mw:10,loc:"Tlapacoyan, Veracruz",lat:19.96,lon:-97.21,geoType:"municipal",geoSource:"https://www.veracruz.gob.mx/2025/04/09/con-una-inversion-de-18-mdd-veracruz-avanza-en-energias-limpias/",source:ref("cfe24",24)},
  {id:"penasco",name:"C.FV. Puerto Peñasco (secuencia I)",state:"Sonora",technology:"Solar fotovoltaica",mw:120,loc:"Puerto Peñasco, Sonora (referencia municipal)",lat:31.4,lon:-113.54,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/nuestraempresa/Informe%20de%20gestion%201824/EPS%20Generaci%C3%B3n%20VI.pdf",source:ref("cfe23",42)},
  {id:"mexicali",name:"C.C.I. Mexicali Oriente",state:"Baja California",technology:"Combustión interna",mw:441.5,loc:"Mexicali, Baja California",lat:32.62,lon:-115.45,geoType:"municipal",geoSource:"https://www.cfe.gob.mx/finanzas/reportes-financieros/Reportes%20Anuales%20Documentos/Informe%20Anual%202023.pdf",source:ref("cfe23",15)},
  {id:"altar",name:"C.C.I. Altar",state:"Sonora",technology:"Combustión interna",mw:205.3,loc:"Noroeste del desierto de Altar, Sonora (referencia regional)",lat:32.38,lon:-114.9,geoType:"regional",geoSource:"https://www.cfe.gob.mx/cdn/2019/Archivos/Boletines/048_BoletinCCIAltarVF.pdf",source:ref("cfe23",15)},
  {id:"laguna",name:"Central Nucleoeléctrica Laguna Verde",state:"Veracruz",technology:"Nucleoeléctrica",mw:1608,loc:"Alto Lucero, Veracruz (referencia municipal)",lat:19.62,lon:-96.75,geoType:"municipal",geoSource:"https://www.veracruz.gob.mx/proteccioncivil/wp-content/uploads/sites/5/2024/10/Atlas-de-Riesgos-del-Estado-de-Veracruz_.pdf",source:ref("cfe23",16)},
].map(p=>{
 const e=plantEvidence[p.id];
 const base=p.id==='zim'?'Capacidad al cierre de 2024; 292 MW previos + 12 MW desde el 1-dic-2024':p.id==='penasco'?'Capacidad fotovoltaica de la secuencia I, 2023':p.id==='laguna'?'Capacidad efectiva, informe anual 2024':['mexicali','altar'].includes(p.id)?'Capacidad bruta efectiva, 2023':'Capacidad base en tabla de modernización, edición 2024; no implica disponibilidad instantánea';
 return {...p,...geoProject(p.lat,p.lon),year:e.capacity.source.dataYear,capacityBasis:base,source:e.capacity.source,
 loc:p.id==='port1'?'Conflicto municipal: Ocoyucan (Gestión Generación I) / Atlixco (referencia previa). Cierre pendiente.':e.territory.text,
 geoSource:e.territory.source.url||DOCS[e.territory.source.doc]?.url,territorySource:e.territory.source,
 geoStatus:'PENDIENTE DE VERIFICACIÓN como posición exacta',operation:e.operation.text,operationSource:e.operation.source,
 capacityNote:p.id==='penasco'?'Complejo al cierre de 2024: 420 MW FV (120 + 300); secuencia II desde 11-sep-2024. Baterías separadas, no sumadas a MW FV. CFE 2024 p.21/PDF24 y p.279/PDF282.':p.id==='port2'?'2 MW redondeados en el informe anual; 2.12 MW detallados en Gestión Generación I p.17 (ordinal PDF no disponible). La generación 0.032 GWh netos en 2024 se redondea a 0.0 en la tabla; no implica inoperación.':['mexicali','altar'].includes(p.id)?`Disponibilidad individual al 31-dic-2024 pendiente. Capacidad neta de verano a gas: ${p.id==='mexicali'?'429.385':'201.855'} MW; es otra base (CFE 2023 p.46/PDF50).`:p.id==='laguna'?'No sustituir 1,608 MW por 2 × 810 MW de otra comunicación sin conciliar base y fecha.':''};
});

export const systems = [
 {id:"sin-central",name:"Región Central del SIN",city:"Ciudad de México",lat:19.43,lon:-99.13,detail:"Gerencia de Control Regional Central. Integra el Sistema Interconectado Nacional.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-oriental",name:"Región Oriental del SIN",city:"Puebla",lat:19.04,lon:-98.2,detail:"Gerencia de Control Regional Oriental; su área es mayor que el punto de referencia.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-occidental",name:"Región Occidental del SIN",city:"Guadalajara",lat:20.67,lon:-103.35,detail:"Gerencia de Control Regional Occidental; no representa una única instalación.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-noroeste",name:"Región Noroeste del SIN",city:"Hermosillo",lat:29.07,lon:-110.96,detail:"Gerencia de Control Regional Noroeste del Sistema Interconectado Nacional.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-norte",name:"Región Norte del SIN",city:"Gómez Palacio",lat:25.57,lon:-103.5,detail:"Gerencia de Control Regional Norte del Sistema Interconectado Nacional.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-noreste",name:"Región Noreste del SIN",city:"Monterrey",lat:25.67,lon:-100.31,detail:"Gerencia de Control Regional Noreste del Sistema Interconectado Nacional.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"sin-peninsular",name:"Región Peninsular del SIN",city:"Mérida",lat:20.97,lon:-89.62,detail:"Gerencia de Control Regional Peninsular del Sistema Interconectado Nacional.",status:"interconectado en SIN",geoType:'ciudad de referencia'},
 {id:"bc",name:"Sistema Baja California",city:"Mexicali",lat:32.62,lon:-115.45,detail:"No está conectado directamente al SIN. Tiene interconexión internacional con la red occidental WECC de EE. UU., según CENACE.",status:"separado del SIN",geoType:'ciudad de referencia'},
 {id:"bcs",name:"Sistema Baja California Sur",city:"La Paz",lat:24.14,lon:-110.32,detail:"Sistema de Baja California Sur, separado del SIN y de Mulegé.",status:"aislado del SIN",geoType:'ciudad de referencia'},
 {id:"mulege",name:"Sistema Mulegé",city:"Santa Rosalía",lat:27.34,lon:-112.27,detail:"Sistema eléctrico Mulegé, separado del SIN y de Baja California Sur.",status:"aislado del SIN",geoType:'ciudad de referencia'},
].map(s=>({...s,...geoProject(s.lat,s.lon)}));

// Fuente de orden/nombres: CFE Distribución, PAM RGD 2024–2038, Figura III.1, p. 7.
// Los pines se ubican por CIUDADES DE REFERENCIA, no en límites/sedes oficiales.
export const divisionPoints = [
 {id:'d01',name:"Baja California",city:"Tijuana",lat:32.52,lon:-117.0,sector:"Noroeste",cluster:null,scope:'Ciudad de referencia: '+"Tijuana"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d02',name:"Noroeste",city:"Hermosillo",lat:29.07,lon:-110.96,sector:"Noroeste",cluster:null,scope:'Ciudad de referencia: '+"Hermosillo"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d03',name:"Norte",city:"Chihuahua",lat:28.64,lon:-106.08,sector:"Norte",cluster:null,scope:'Ciudad de referencia: '+"Chihuahua"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d04',name:"Golfo Norte",city:"Monterrey",lat:25.67,lon:-100.31,sector:"Noreste",cluster:null,scope:'Ciudad de referencia: '+"Monterrey"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d05',name:"Golfo Centro",city:"Ciudad Valles",lat:21.98,lon:-99.01,sector:"Golfo",cluster:null,scope:'Ciudad de referencia: '+"Ciudad Valles"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d06',name:"Bajío",city:"León",lat:21.12,lon:-101.68,sector:"Bajío",cluster:null,scope:'Ciudad de referencia: '+"León"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d07',name:"Jalisco",city:"Guadalajara",lat:20.67,lon:-103.35,sector:"Occidente",cluster:null,scope:'Ciudad de referencia: '+"Guadalajara"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d08',name:"Centro Occidente",city:"Morelia",lat:19.7,lon:-101.19,sector:"Occidente",cluster:null,scope:'Ciudad de referencia: '+"Morelia"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d09',name:"Centro Sur",city:"Cuernavaca",lat:18.92,lon:-99.23,sector:"Centro",cluster:null,scope:'Ciudad de referencia: '+"Cuernavaca"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d10',name:"Centro Oriente",city:"Puebla",lat:19.04,lon:-98.2,sector:"Centro",cluster:null,scope:'Ciudad de referencia: '+"Puebla"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d11',name:"Oriente",city:"Xalapa",lat:19.54,lon:-96.91,sector:"Oriente y Golfo",cluster:null,scope:'Ciudad de referencia: '+"Xalapa"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d12',name:"Sureste",city:"Oaxaca de Juárez",lat:17.07,lon:-96.73,sector:"Sureste",cluster:null,scope:'Ciudad de referencia: '+"Oaxaca de Juárez"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d13',name:"Peninsular",city:"Mérida",lat:20.97,lon:-89.62,sector:"Península",cluster:null,scope:'Ciudad de referencia: '+"Mérida"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d14',name:"Valle de México Norte",city:"Ciudad de México",lat:19.43,lon:-99.13,sector:"Valle de México",cluster:"valle-mexico",scope:'Ciudad de referencia: '+"Ciudad de México"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d15',name:"Valle de México Centro",city:"Ciudad de México",lat:19.43,lon:-99.13,sector:"Valle de México",cluster:"valle-mexico",scope:'Ciudad de referencia: '+"Ciudad de México"+'. No equivale al límite, centroide o sede oficial de la división.'},
 {id:'d16',name:"Valle de México Sur",city:"Ciudad de México",lat:19.43,lon:-99.13,sector:"Valle de México",cluster:"valle-mexico",scope:'Ciudad de referencia: '+"Ciudad de México"+'. No equivale al límite, centroide o sede oficial de la división.'},
].map(p=>({...p,...geoProject(p.lat,p.lon)}));
export const classifier = [
 ['Gas natural','fósil'],['Combustóleo','fósil'],['Carbón mineral','fósil'],['Diésel','fósil'],['Ciclo combinado (gas)','fósil'],['Turbogás (gas)','fósil'],
 ['Uranio','nuclear'],['Fisión de uranio','nuclear'],['Central nucleoeléctrica','nuclear'],
 ['Radiación solar','renovable'],['Módulo fotovoltaico','renovable'],['Viento','renovable'],['Aerogenerador','renovable'],['Agua en presa','renovable'],['Central hidroeléctrica','renovable'],['Calor del subsuelo','renovable'],['Central geotérmica','renovable'],['Biomasa','renovable']
].map(([label,group],i)=>({id:i+1,label,group}));
export const flows=[
 ['Gas natural','Química','Combustión','Calor → turbina','Generador','Electricidad'],
 ['Carbón','Química','Caldera','Vapor → turbina','Generador','Electricidad'],
 ['Uranio','Nuclear','Fisión','Calor → vapor','Turbina + generador','Electricidad'],
 ['Agua embalsada','Potencial','Caída de agua','Turbina hidráulica','Generador','Electricidad'],
 ['Viento','Cinética','Rotor','Eje mecánico','Generador','Electricidad'],
 ['Sol','Radiación','Célula fotovoltaica','Corriente continua','Inversor','Electricidad de CA']
];
export const reflection=[
 {question:'¿Por qué una mayor capacidad instalada no garantiza mayor generación anual?',answers:['Porque la capacidad mide potencia máxima posible y la generación también depende de horas de operación.','Porque la capacidad siempre se expresa en GWh.','Porque las centrales limpias jamás tienen potencia nominal.'],correct:0,why:'MW es potencia, GWh es energía a lo largo de un periodo. El factor de planta importa.'},
 {question:'Si crece la energía hidroeléctrica de CFE de 2023 a 2024, ¿puede concluirse que aumentó igual en todo México?',answers:['Sí, porque CFE es todo el sistema.','No: los datos de CFE no representan automáticamente al total nacional.','Sí, porque todas las centrales tienen el mismo propietario.'],correct:1,why:'Debes distinguir el alcance estadístico: empresa frente a sistema eléctrico nacional.'},
 {question:'¿Qué sucede con las pérdidas resistivas si duplicas la corriente y mantienes R constante?',answers:['Se duplican.','Se cuadruplican.','Se reducen a la mitad.'],correct:1,why:'Pérdidas = 3I²R. Con I al doble, I² aumenta por un factor de cuatro.'},
 {question:'¿Por qué no se debe comparar directamente TJ de combustible con GWh de generación?',answers:['Porque son distintas formas y etapas de energía y requieren conversión y eficiencia.','Porque TJ es una medida de potencia.','Porque GWh no es una unidad de energía.'],correct:0,why:'TJ mide energía primaria suministrada y GWh electricidad producida; hay pérdidas y conversiones.'},
 {question:'¿Un 25.3% de generación limpia de CFE en 2024 equivale al porcentaje renovable?',answers:['Sí, nuclear y renovables significan lo mismo.','No: la categoría limpia puede incluir generación nuclear, que no es renovable.','Sí, porque combustóleo cuenta como renovable.'],correct:1,why:'La clasificación oficial de energías limpias incluye nuclear; renovable es una categoría distinta.'}
];
export const findings=[
 {group:'Recursos',q:'¿Cuánto gas utilizó CFE para generar en 2024?',v:782478,unit:'TJ',year:2024,detail:'Consumo de gas en los cuadros de fuentes de energía de CFE. No representa el consumo nacional.',source:ref('cfe24',26),compare:{a:770020,b:782478,labels:['2023','2024']}},
 {group:'Recursos',q:'¿Cómo cambió el consumo de combustóleo?',v:-18.1,unit:'%',year:2024,detail:'Variación 2024 vs. 2023 del combustible utilizado por CFE para generación.',source:ref('cfe24',26),compare:{a:162313,b:132950,labels:['2023 TJ','2024 TJ']}},
 {group:'Recursos',q:'¿Qué pasó con el consumo de carbón?',v:19.6,unit:'%',year:2024,detail:'Variación informada de uso de carbón de CFE entre 2023 y 2024.',source:ref('cfe24',26),compare:{a:107582,b:128665,labels:['2023 TJ','2024 TJ']}},
 {group:'Recursos',q:'¿Cuánto se registró de energía del uranio?',v:130343,unit:'TJ',year:2024,detail:'Fuente nuclear reportada por CFE; no confundir nuclear con renovable.',source:ref('cfe24',26),compare:{a:130118,b:130343,labels:['2023','2024']}},
 {group:'Recursos',q:'¿Cuánta agua fue turbinada?',v:100594,unit:'miles de m³',year:2024,detail:'Agua turbinada de CFE: no significa agua consumida.',source:ref('cfe24',26),compare:{a:93270,b:100594,labels:['2023','2024']}},
 {group:'Generación',q:'¿Cuánta electricidad bruta produjo CFE?',v:154059,unit:'GWh',year:2024,detail:'Producción bruta de CFE, no suma nacional total.',source:ref('cfe24',26),compare:{a:150462,b:154059,labels:['2023','2024']}},
 {group:'Generación',q:'¿Qué aportó el ciclo combinado?',v:61490,unit:'GWh',year:2024,detail:'Tecnología con mayor producción bruta en el desglose CFE 2024.',source:ref('cfe24',26),compare:{a:58234,b:61490,labels:['2023','2024']}},
 {group:'Generación',q:'¿Cuánto aportaron las hidroeléctricas?',v:22354,unit:'GWh',year:2024,detail:'Aumentó respecto a 2023 en el reporte de generación CFE.',source:ref('cfe24',26),compare:{a:19568,b:22354,labels:['2023','2024']}},
 {group:'Generación',q:'¿Qué volumen registró la solar fotovoltaica?',v:555,unit:'GWh',year:2024,detail:'Generación bruta fotovoltaica de CFE, no capacidad en MW.',source:ref('cfe24',26),compare:{a:274,b:555,labels:['2023','2024']}},
 {group:'Generación',q:'¿Cuántos GWh fueron energías limpias?',v:38982.9,unit:'GWh',year:2024,detail:'CFE informa que representa aproximadamente 25.3% de su producción, incluyendo nuclear.',source:ref('cfe24',27)},
 {group:'Transmisión',q:'¿Cuánta longitud de líneas operó CFE Transmisión?',v:111138,unit:'km',year:2024,detail:'Longitud reportada en el escenario tecnológico de CFE Transmisión.',source:ref('cfe24',76),compare:{a:110558,b:111138,labels:['2023','2024']}},
 {group:'Transmisión',q:'¿Cuántas subestaciones registra la red?',v:2317,unit:'subestaciones',year:2024,detail:'Conteo del escenario tecnológico de CFE Transmisión.',source:ref('cfe24',76),compare:{a:2302,b:2317,labels:['2023','2024']}},
 {group:'Transmisión',q:'¿Cuál es la capacidad de transformación?',v:168981,unit:'MVA',year:2024,detail:'Capacidad de transformación de CFE Transmisión; no potencia de generación.',source:ref('cfe24',76),compare:{a:164992,b:168981,labels:['2023','2024']}},
 {group:'Transmisión',q:'¿Cuántas gerencias regionales integran el proceso?',v:10,unit:'gerencias',year:2024,detail:'La estructura de transmisión contempla diez gerencias regionales.',source:ref('cfe24',76)},
 {group:'Transmisión',q:'¿Cuántas zonas de transmisión existen?',v:55,unit:'zonas',year:2024,detail:'Unidades de organización territorial reportadas por CFE Transmisión.',source:ref('cfe24',76)},
 {group:'Distribución',q:'¿Cuántos usuarios atiende CFE Distribución?',v:49.1,unit:'millones aprox.',year:2024,detail:'Dato aproximado del capítulo de CFE Distribución (distinto de clientes exactos de CFE SSB).',source:ref('cfe24',95)},
 {group:'Distribución',q:'¿Qué longitud tienen las redes de distribución?',v:901000,unit:'km aprox.',year:2024,detail:'Redes Generales de Distribución, cifra redondeada por CFE.',source:ref('cfe24',95)},
 {group:'Distribución',q:'¿En cuántas divisiones se organiza el servicio?',v:16,unit:'divisiones',year:2024,detail:'CFE Distribución reporta 16 divisiones y 150 zonas.',source:ref('cfe24',95)},
 {group:'Distribución',q:'¿Cuánta energía se perdió en las redes consideradas?',v:10.69,unit:'%',year:2024,detail:'Indicador de pérdidas de energía que incluye alta tensión, según su tabla.',source:ref('cfe24',96),compare:{a:10.86,b:10.69,labels:['2023','2024']}},
 {group:'Distribución',q:'¿Cuánto duró la interrupción promedio por cliente?',v:16.708,unit:'min/cliente',year:2024,detail:'Indicador SAIDI para CFE Distribución.',source:ref('cfe24',96),compare:{a:17.788,b:16.708,labels:['2023','2024']}}
];

export const waterNotice='Unidad pendiente de aclaración. Se conserva la transcripción literal 100,594 «miles de m³» (CFE 2024 p.26/PDF29). La interpretación física está pendiente; no convertir a millones ni derivar conclusiones cuantitativas. No es el consumo termoeléctrico de agua (127,371 miles de m³).';
resources.forEach(r=>{r.source=fieldEvidence[`resources.${r.name}.value`];r.scope='Consumo propio CFE';r.comparable=r.value!==null&&r.name!=='Agua turbinada';r.status=r.value===null?'NO DISPONIBLE':r.name==='Agua turbinada'?'PENDIENTE DE VERIFICACIÓN (interpretación física)':'Transcripción respaldada por la auditoría';});
resources[4].note=waterNotice;
findings.forEach((f,i)=>{f.source=fieldEvidence[`findings[${i}]`];});
findings[4].q='¿Qué cifra de agua publicó CFE?';findings[4].detail=waterNotice;delete findings[4].compare;
findings[4].visual={href:'#water-evidence',label:'Ver esquema: dato publicado e interpretación pendiente'};
findings[3].detail+=' Comparador de la misma edición CFE 2024. El cálculo propio 130,118 → 130,343 TJ es +0.1729%; el −0.2% impreso es inconsistente. El retrospectivo 2023 revisa la edición anterior.';
findings[9].visual={href:'#chart-clean',label:'Ver gráfica de generación bruta limpia CFE (incluye nuclear)'};
for(const i of [13,14])findings[i].visual={href:'#transmission-organization',label:'Ver esquema administrativo de CFE Transmisión'};
findings[13].detail+=' No son las siete GCR del SIN de CENACE.';
for(const i of [15,16])findings[i].visual={href:'#distribution-overview',label:'Ver esquema de alcance nacional de CFE Distribución'};
findings[17].visual={href:'#map-distribution',label:'Ver mapa y directorio de las 16 divisiones (posiciones aproximadas)'};
findings[18].detail+=' Cambio 2023–2024: −0.17 puntos porcentuales; no es el indicador MT+BT (12.88%) ni solo pérdidas Joule.';
findings[19].q='¿Cuál fue el SAIDI atribuible a la distribuidora?';findings[19].detail='SAIDI anual por causas atribuibles a la distribuidora, interrupciones mayores a cinco minutos. No es el total de todas las causas. CNE 2024 pp.98–102/PDF98–102 informa 116.706 min totales frente a 16.708 atribuibles.';
export const cleanGeneration={year:2024,gwh:38982.9,scope:'Generación bruta propia CFE, incluye nuclear',source:ref('cfe24',27,{dataYear:2024,unit:'GWh',scope:'Bruta propia CFE',status:'Transcripción respaldada por la auditoría'})};
export const generationNotes='2022: total del anexo 141,343 GWh (CFE 2023 p.300/PDF304); p.15/PDF19 y suma de tecnologías: 141,342. 2023: total 150,462; suma 150,461 (CFE 2024 p.26/PDF29). Se mantienen residuos de 1 GWh, compatibles con redondeo, sin ajustar categorías. 2024: total y suma 154,059 GWh.';
export const nationalGeneration=[{year:2022,gwh:333964},{year:2023,gwh:346501},{year:2024,gwh:352305}];
export const timeline=[
 {year:'2013',date:'20-dic-2013',effective:'21-dic-2013',title:'Reforma constitucional',source:'DOF, decreto 20-dic-2013, arts.25/27/28; adjunto PDF1–2, impresión web sin folio DOF. HTML oficial sin paginación.',url:'https://sidof.segob.gob.mx/notas/5327463',text:'Reserva a la Nación la planeación y el control del SEN y el servicio público de transmisión y distribución. Permite participación particular en las demás actividades conforme a la ley.',effects:['Cambio constitucional; no equivale a privatización total.','La publicación y la entrada en vigor son fechas distintas.']},
 {year:'2014',date:'11-ago-2014',effective:'12-ago-2014 (regla general de la LIE, transitorio primero)',title:'Ley de la Industria Eléctrica',source:'11082014-VES: LIE arts.1/2 p.44/PDF44; art.8 p.49/PDF49; art.107 p.75/PDF75. Transitorio primero; copia de Secretaría de Economía p.61/PDF61 (paginación distinta de la edición DOF).',url:'https://www.economia.gob.mx/files/comunidad_negocios/industria_comercio/energia/LIElec_110814.pdf',text:'Regula la industria y el Mercado Eléctrico Mayorista (MEM). La fecha de publicación no es la fecha de inicio comercial del MEM.',effects:['Art.8: separación legal y facultades de separación contable, operativa o funcional.','Art.107: CENACE como organismo público descentralizado, con control operativo del SEN y operación del MEM.']},
 {year:'2024',date:'31-oct-2024',effective:'1-nov-2024',title:'Áreas y empresas estratégicas',source:'DOF/SIDOF5742012, art.25 párrafo5; art.27 párrafos6/7; art.28 párrafo4. Fuente externa HTML; paginación no aplica.',url:'https://sidof.segob.gob.mx/notas/5742012',text:'Establece la figura de empresa pública del Estado y que la participación particular en las demás actividades no tenga prevalencia sobre ella.',effects:['Mantiene áreas estatales reservadas.','No suprime automáticamente toda participación privada.']},
 {year:'2025',date:'18-mar-2025',effective:'19-mar-2025 (general)',title:'Nuevo marco legal: CFE, LSE, LPTE y CNE',source:'Decreto integral 2025 (compilación LPTE): Ley CFE art.2 p.2/PDF1 y transitorio3 p.41/PDF40; LSE arts.8/12VI pp.91/97, PDF90/96; transitorios pp.134–135/PDF133–134.',url:'https://www.diputados.gob.mx/LeyesBiblio/ref/lse/LSE_orig_18mar25.pdf',text:'Abroga la LIE y reorganiza CFE; extingue las EPS con subrogación de CFE. El criterio del 54% es una disposición normativa anual, no un resultado estadístico de 2024.',effects:['Art.12 VI LSE: al menos 54% del promedio de energía inyectada a la red en un año calendario; no MW ni cuota por hora.','Art.8 y transitorio10: excepción a separación legal de la empresa pública, conservando separación operativa y funcional del MEM.','La transición no implica cancelación automática de permisos ni desaparición del MEM.']}
];
export const legalEffects=[
 {title:'Participación y acceso',text:'El marco 2013–2014 permite participación privada en generación y comercialización y conserva las áreas estatales reservadas.',source:'Decreto 2013, art.27 (PDF1–2); LIE 2014 arts.1/2, p.44/PDF44.'},
 {title:'Organización de CFE',text:'De empresa productiva del Estado en 2013–2014 a empresa pública del Estado en 2024–2025. En 2025 se extinguen las EPS y CFE se subroga en sus derechos y obligaciones.',source:'Decreto 2013, transitorio3; reforma 2024 art.25; Ley CFE 2025 art.2 y transitorio3, compilación p.2/PDF1 y p.41/PDF40.'},
 {title:'Operación del sistema y mercado',text:'CENACE asume el control operativo del SEN y la operación del MEM. El marco 2025 conserva la separación operativa y funcional y las reglas del mercado durante la transición.',source:'LIE art.107, p.75/PDF75; LSE 2025 art.8 y transitorios3/10, compilación pp.91,134–135/PDF90,133–134.'},
 {title:'Planeación y prevalencia',text:'La LSE 2025 establece planeación vinculante y una participación estatal de al menos 54% del promedio de energía inyectada en el año calendario. Es un mandato, no una medición de generación o capacidad de 2024.',source:'LSE 2025 art.12 VI, compilación p.97/PDF96.'},
 {title:'Regulación y transición',text:'El decreto de 2025 expide la Ley de la Comisión Nacional de Energía y la LPTE, con disposiciones transitorias. No se deduce la cancelación automática de permisos previos.',source:'Decreto integral 18-mar-2025, Ley CNE arts.1/2, p.243/PDF242 y transitorios; LSE transitorio9, compilación pp.134–135/PDF133–134; LPTE inicia p.192/PDF191.'}
];
