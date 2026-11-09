import {DOCS,generation,tech,resources,transmission,distribution,plants,systems,divisionPoints,classifier,flows,reflection,findings,timeline,legalEffects,waterNotice,generationNotes,cleanGeneration,nationalGeneration,ref} from './data.js';
const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const es=(v,d=0)=>Number(v).toLocaleString('es-MX',{minimumFractionDigits:d,maximumFractionDigits:d});
const escapeHtml=(s='')=>String(s).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const col={gold:'#F5B400',teal:'#18B7B0',blue:'#0A3A66',soft:'#E9EEF3',coral:'#f49c7a',purple:'#c89dff'};
const safeText=(id,content)=>{const el=document.getElementById(id);if(el)el.textContent=content};
const displayValue=v=>es(v,Number.isInteger(v)?0:Math.min(6,String(v).split('.')[1]?.length||0));
const sourceLink=input=>{
 const base=input.doc?ref(input.doc,input.page):{};const s={...base,...input};const doc=DOCS[s.doc]||{};
 const name=s.document||doc.name||'Documento';const url=s.url||doc.url;
 const page=s.page??'No disponible',ordinal=s.format==='HTML'?'No aplica (HTML)':s.pdfPage??'No disponible';
 // Un folio impreso nunca se usa como ordinal; tampoco inferimos anclajes desde rangos.
 const target=url?(Number.isInteger(s.pdfPage)?`${url.split('#')[0]}#page=${s.pdfPage}`:url):null;
 return `<details class="evidence"><summary>Fuente: ${escapeHtml(name)} · p. ${escapeHtml(page)}</summary>
 <dl><div><dt>Institución / edición</dt><dd>${escapeHtml(s.institution||doc.institution||'No disponible')} / ${escapeHtml(s.edition||doc.edition||'No disponible')}</dd></div>
 <div><dt>Año del dato / publicación</dt><dd>${escapeHtml(s.dataYear??'No disponible')} / ${escapeHtml(s.publicationYear??'No disponible')}</dd></div>
 <div><dt>Página impresa / ordinal PDF</dt><dd>${escapeHtml(page)} / ${escapeHtml(ordinal)}</dd></div>
 <div><dt>Unidad / alcance</dt><dd>${escapeHtml(s.unit||'No aplica o no disponible')} / ${escapeHtml(s.scope||'Consultar indicador')}</dd></div>
 <div><dt>Origen / estado en auditoría</dt><dd>${escapeHtml(s.origin||'No disponible')} / ${escapeHtml(s.status||'No disponible')}</dd></div></dl>
 ${s.id?`<small>Registro ${escapeHtml(s.id)} de la base auditada.</small>`:''}<p>${escapeHtml(s.notes||'')}</p>
 ${target?`<a class="source-link" href="${escapeHtml(target)}" target="_blank" rel="noopener noreferrer">Abrir documento de referencia ↗</a>`:'<span>Enlace no disponible.</span>'}</details>`;
};
function svgBarChart(data,{dark=false,horizontal=false,height=245,metric='',max,accent=col.teal,labels=true,baselineZero=true}={}){
 const white=dark?'#b5d0e2':'#647f92';const grid=dark?'#31536a':'#dbe8ed';const W=640,H=height;
 if(horizontal){
  const row=27, top=16, bottom=18;H;
  const plotW=405, startX=195;
  const upper=max??Math.max(1,...data.map(d=>d.value))*1.07;
  const svgdata=data.map((d,i)=>{const y=top+i*row, barW=Math.max(1,Math.min(plotW,plotW*d.value/upper));const c=d.color||accent;return `<g><title>${escapeHtml(d.label)}: ${es(d.value,Math.abs(d.value)<1?3:0)} ${metric}</title><text x="185" y="${y+16}" font-size="11" text-anchor="end" fill="${white}">${escapeHtml(d.label.length>25?d.label.slice(0,24)+'…':d.label)}</text><rect x="${startX}" y="${y+5}" width="${plotW}" height="14" rx="7" fill="${grid}" opacity=".45"/><rect x="${startX}" y="${y+5}" width="${barW}" height="14" rx="7" fill="${c}"/><text x="${startX+barW+5}" y="${y+17}" font-size="10" font-weight="700" fill="${white}">${es(d.value)}</text></g>`}).join('');
  const h=Math.max(100,top+data.length*row+bottom);
  return `<svg viewBox="0 0 ${W} ${h}" class="${dark?'chart-dark':''}" role="img" aria-label="${escapeHtml(metric)}"><title>Gráfica comparativa: ${metric}</title>${svgdata}</svg>`;
 }
 const ml=46,mr=18,mt=45,mb=51,plotH=H-mt-mb,plotW=W-ml-mr;
 const upper=Math.max(1,max??Math.max(...data.map(d=>d.value))*1.18);
 const gap=plotW/data.length;
 let columns=data.map((d,i)=>{const barWidth=Math.min(86,gap*.5);const x=ml+gap*i+gap/2-barWidth/2;const barHeight=Math.max(1,d.value/upper*plotH);const y=mt+plotH-barHeight;return `<g><title>${escapeHtml(d.label)}: ${es(d.value,2)} ${metric}</title><rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="7" fill="${d.color||accent}"/><text x="${x+barWidth/2}" y="${Math.max(16,y-10)}" text-anchor="middle" font-size="14" font-weight="800" fill="${dark?'#f3fbff':'#173b56'}">${es(d.value,d.value<10?2:0)}</text><text x="${x+barWidth/2}" y="${H-24}" text-anchor="middle" font-size="12" font-weight="650" fill="${white}">${escapeHtml(d.label)}</text></g>`}).join('');
 const gridline=[0,.5,1].map(q=>{const y=mt+plotH*(1-q);return `<line x1="${ml}" x2="${W-mr}" y1="${y}" y2="${y}" stroke="${grid}" stroke-dasharray="4 5" opacity=".8"/><text x="${ml-9}" y="${y+4}" font-size="10" text-anchor="end" fill="${white}">${es(q*upper)}</text>`}).join('');
 return `<svg viewBox="0 0 ${W} ${H}" class="${dark?'chart-dark':''}" role="img" aria-label="Gráfica ${escapeHtml(metric)}"><title>${metric}</title>${gridline}${columns}<text x="${ml}" y="20" font-size="11" fill="${white}">${escapeHtml(metric)}</text></svg>`;
}
function svgDonut(items,{dark=false,totalLabel='CFE · 2024',midText=''}={}){
 const W=620,H=270,cx=175,cy=138,r=93,stroke=28,total=items.reduce((a,b)=>a+b.value,0),circ=2*Math.PI*r;
 let offset=0;const rings=items.map((d,i)=>{let len=d.value/total*circ;const seg=`<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${d.color||[col.teal,col.gold,col.blue,col.purple,col.coral][i%5]}" stroke-width="${stroke}" fill="none" stroke-dasharray="${len} ${circ-len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"><title>${escapeHtml(d.label)} · ${es(d.value)} · ${(d.value/total*100).toFixed(1)}%</title></circle>`;offset+=len;return seg}).join('');
 const legend=items.map((d,i)=>`<g transform="translate(330 ${45+i*29})"><rect width="10" height="10" y="1" rx="3" fill="${d.color||[col.teal,col.gold,col.blue,col.purple,col.coral][i%5]}"/><text x="21" y="11" fill="${dark?'#c1d9e7':'#38576c'}" font-size="12">${escapeHtml(d.label.length>25?d.label.slice(0,24)+'…':d.label)}</text><text x="265" y="11" text-anchor="end" fill="${dark?'#fff':'#163e58'}" font-size="12" font-weight="800">${(d.value/total*100).toFixed(1)}%</text></g>`).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Distribución ${escapeHtml(totalLabel)}"><title>${escapeHtml(totalLabel)}</title><circle cx="${cx}" cy="${cy}" r="${r}" stroke="${dark?'#1e465f':'#e8f1f4'}" stroke-width="${stroke}" fill="none"/>${rings}<text x="${cx}" y="${cy-5}" fill="${dark?'white':'#0a3a66'}" text-anchor="middle" font-size="27" font-weight="850">${escapeHtml(midText||es(total))}</text><text x="${cx}" y="${cy+17}" fill="${dark?'#a4c6d8':'#68879a'}" text-anchor="middle" font-size="11">${escapeHtml(totalLabel)}</text>${legend}</svg>`;
}
function svgSparkLine(data,{color=col.teal,metric=''}={}){
 const W=620,H=220,m={l:38,r:15,t:21,b:36},w=W-m.l-m.r,h=H-m.t-m.b;
 const vals=data.map(d=>d.value),min=0,max=Math.max(1,...vals)*1.22;
 const x=i=>m.l+i/(Math.max(1,vals.length-1))*w,y=v=>m.t+h-v/max*h;
 const points=data.map((d,i)=>`${x(i)},${y(d.value)}`).join(' ');
 const tick=data.map((d,i)=>`<g><circle cx="${x(i)}" cy="${y(d.value)}" r="5" fill="${color}" stroke="white" stroke-width="2"><title>${escapeHtml(d.label)}: ${es(d.value,3)} ${metric}</title></circle><text x="${x(i)}" y="${H-10}" text-anchor="middle" font-size="11" fill="#647e91">${escapeHtml(d.label)}</text><text x="${x(i)}" y="${y(d.value)-12}" text-anchor="middle" font-size="13" font-weight="700" fill="#184763">${displayValue(d.value)}</text></g>`).join('');
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Tendencia ${escapeHtml(metric)}"><path d="M ${m.l} ${y(0)} H ${W-m.r}" stroke="#cbdde7" stroke-dasharray="3 5"/><polyline points="${points}" stroke="${color}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" fill="none"/>${tick}<text x="${m.l}" y="13" font-size="10" fill="#71899a">${escapeHtml(metric)}</text></svg>`;
}
function renderAllCharts(){
 $('#chart-generation').innerHTML=svgBarChart(generation.map(x=>({label:String(x.year),value:x.gwh,color:x.year===2024?col.gold:col.teal})),{dark:true,metric:'GWh · CFE (generación bruta)'});
 $('#chart-tech').innerHTML=svgBarChart(tech.map(t=>({label:t.name,value:t.g2024,color:t.kind==='limpia'?col.teal:col.gold})).sort((a,b)=>b.value-a.value),{dark:true,horizontal:true,metric:'GWh',accent:col.gold});
 $('#chart-cycles').innerHTML=svgBarChart([{label:'Ciclo 2023',value:tech[0].g2023,color:col.teal},{label:'Vapor 2023',value:tech[1].g2023,color:col.gold},{label:'Ciclo 2024',value:tech[0].g2024,color:col.teal},{label:'Vapor 2024',value:tech[1].g2024,color:col.gold}],{dark:true,metric:'GWh'});
 $('#chart-clean').innerHTML=svgDonut([{label:'Limpias (incluye nuclear)',value:cleanGeneration.gwh,color:col.teal},{label:'Otras tecnologías',value:generation[2].gwh-cleanGeneration.gwh,color:col.gold}],{dark:true,totalLabel:'Generación CFE',midText:`${es(100*cleanGeneration.gwh/generation[2].gwh,1)}% limpia`});
 $('#chart-mix').innerHTML=svgDonut([{label:'Ciclo combinado',value:tech[0].g2024,color:col.gold},{label:'Vapor convencional',value:tech[1].g2024,color:col.coral},{label:'Hidroeléctrica',value:tech[2].g2024,color:col.teal},{label:'Carboeléctrica',value:tech[3].g2024,color:col.blue},{label:'Nuclear',value:tech[4].g2024,color:col.purple},{label:'Otras',value:tech.slice(5).reduce((sum,t)=>sum+t.g2024,0),color:'#7db3cf'}],{totalLabel:'GWh · 2024',midText:es(generation[2].gwh)});
 $('#chart-lines').innerHTML=svgSparkLine(transmission.map(d=>({label:String(d.year),value:d.km})),{metric:'km · líneas CFE Transmisión'});
 $('#chart-mva').innerHTML=svgSparkLine(transmission.map(d=>({label:String(d.year),value:d.mva})),{color:col.gold,metric:'MVA · capacidad de transformación'});
 $('#chart-saidi').innerHTML=svgSparkLine(distribution.map(d=>({label:String(d.year),value:d.saidi})),{metric:'SAIDI atribuible a distribuidora · min/cliente · anual'});
 $('#chart-losses').innerHTML=svgSparkLine(distribution.map(d=>({label:String(d.year),value:d.lossesMB})),{color:col.gold,metric:'% · pérdidas media + baja tensión'});
 $('#generation-notes').textContent=generationNotes;
 $('#chart-national').innerHTML=svgBarChart(nationalGeneration.map(d=>({label:String(d.year),value:d.gwh})),{dark:true,metric:'GWh netos inyectados · SEN (excluye GD y autoabasto local)'});
 $('#tech-year').addEventListener('change',e=>{const year=e.target.value;$('#chart-tech').innerHTML=svgBarChart(tech.map(t=>({label:t.name,value:t[`g${year}`],color:t.kind==='limpia'?col.teal:col.gold})).sort((a,b)=>b.value-a.value),{dark:true,horizontal:true,metric:'GWh'});});
}
function initResources(){
 const flowTitles=['Gas natural','Carbón','Uranio','Agua','Viento','Sol'];
 const fb=$('#flow-buttons');fb.innerHTML=flowTitles.map((s,i)=>`<button type="button" class="pill ${i===0?'active':''}" data-flow="${i}">${s}</button>`).join('');
 function setFlow(i){$$('[data-flow]').forEach(el=>{const active=Number(el.dataset.flow)===i;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});$('#flow-visual').innerHTML=flows[i].map((v,n)=>`<div class="flow-node" title="Paso ${n+1}">${escapeHtml(v)}</div>${n===flows[i].length-1?'':'<span class="flow-arrow" aria-hidden="true">→</span>'}`).join('');}
 fb.addEventListener('click',ev=>{const btn=ev.target.closest('[data-flow]');if(btn)setFlow(+btn.dataset.flow)});setFlow(0);
 const a=$('#compare-a'),b=$('#compare-b');[a,b].forEach((sel,i)=>{sel.innerHTML=resources.map((r,j)=>`<option value="${j}" ${i===j?'selected':''}>${escapeHtml(r.name)}</option>`).join('')});b.value='6';
 function cmp(){const ra=resources[+a.value],rb=resources[+b.value];const fields=[['Familia','family'],['Tipo de energía','energy'],['Proceso','process'],['Tecnología','tech'],['Disponibilidad','control'],['Emisiones directas','direct'],['Ciclo de vida','life']];let html=`<table class="compare-table"><thead><tr><th>Aspecto</th><th>${escapeHtml(ra.name)}</th><th>${escapeHtml(rb.name)}</th></tr></thead><tbody>`+fields.map(([s,k])=>`<tr><th scope="row">${s}</th><td>${escapeHtml(ra[k])}</td><td>${escapeHtml(rb[k])}</td></tr>`).join('')+'</tbody></table>';if(ra.comparable&&rb.comparable&&ra.unit===rb.unit&&ra.year===rb.year&&ra.scope===rb.scope)html+=`<div class="compare-caption">Uso CFE 2024: ${es(ra.value)} y ${es(rb.value)} ${ra.unit}. Son entradas energéticas, no electricidad generada.</div>`;else html+='<div class="compare-caption">Los valores numéricos no se confrontan: las fuentes tienen unidades distintas o falta un dato comparable. No se inventan factores de emisión.</div>';
 if([ra,rb].some(r=>r.name==='Agua turbinada'))html+=`<p class="data-warning">${escapeHtml(waterNotice)}</p>`;
 html+=`<p class="note">1 GWh = 3.6 TJ convierte unidades; no convierte insumo primario en electricidad útil ni incorpora eficiencia. Las emisiones son una descripción cualitativa: factores directos y de ciclo de vida siguen sin cuantificarse.</p>${sourceLink(ra.source)}${ra===rb?'':sourceLink(rb.source)}`;
 $('#resource-comparison').innerHTML=html;}
 a.addEventListener('change',cmp);b.addEventListener('change',cmp);cmp();
 const ideas=['Dependencia de combustibles fósiles: reconocer emisiones directas y seguridad de suministro.','Participación renovable: diferenciar recurso renovable de electricidad limpia.','Papel de energía nuclear: combustible no renovable, generación clasificada como limpia.','Evolución tecnológica: no confundir MW de potencia con GWh de energía.','Impacto de elegir recursos: considerar confiabilidad, ambiente y límites del dato.'];
 $('#awareness').innerHTML=ideas.map((x,i)=>`<div class="aware"><strong>${String(i+1).padStart(2,'0')}</strong><div>${escapeHtml(x)}</div></div>`).join('');
}
function initClassifier(){
 const state={done:new Set(),current:1};const select=$('#card-select');
 const getCurrent=()=>classifier.find(x=>x.id===state.current);
 function render(){const left=classifier.filter(x=>!state.done.has(x.id));select.innerHTML=left.map(x=>`<option value="${x.id}">${escapeHtml(x.label)}</option>`).join('');if(left.length===0){$('#active-card').textContent='¡Actividad completada!';select.disabled=true;$$('.bin').forEach(el=>el.disabled=true);return;}if(!left.some(x=>x.id===state.current))state.current=left[0].id;select.value=String(state.current);$('#active-card').textContent=getCurrent().label;safeText('score-count',`${state.done.size}/${classifier.length}`);}
 function submit(group){if(state.done.size===classifier.length)return;const current=getCurrent();const el=$('#classify-feedback');if(group===current.group){state.done.add(current.id);el.className='feedback good';el.textContent=`✓ Correcto: ${current.label} corresponde a la familia ${group}.`;const left=classifier.find(x=>!state.done.has(x.id));if(left)state.current=left.id;render();safeText('score-count',`${state.done.size}/${classifier.length}`)}else{el.className='feedback bad';el.textContent=`Prueba otra vez. ${current.label} no pertenece a la familia ${group}. Piensa en su fuente primaria de energía.`;}}
 select.addEventListener('change',e=>{state.current=Number(e.target.value);render()});$$('.bin').forEach(el=>{el.addEventListener('click',()=>submit(el.dataset.class));el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('drag-over')});el.addEventListener('dragleave',()=>el.classList.remove('drag-over'));el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('drag-over');submit(el.dataset.class)})});$('#active-card').addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',String(state.current)));
 $('#reset-cards').addEventListener('click',()=>{state.done.clear();state.current=1;select.disabled=false;$$('.bin').forEach(el=>el.disabled=false);$('#classify-feedback').className='feedback';safeText('classify-feedback','Actividad reiniciada.');render()});render();
}
function initReflection(){
 let step=0,correct=0,answered=false;const box=$('#quiz');
 function render(){const q=reflection[step];answered=false;
 box.innerHTML=`<span class="quiz-step">PREGUNTA ${step+1} / 5</span><h4>${escapeHtml(q.question)}</h4><div>${q.answers.map((a,i)=>`<label><input type="radio" name="reflexion" value="${i}"> ${escapeHtml(a)}</label>`).join('')}</div><button type="button" class="btn btn-dark btn-small" id="check-quiz">Comprobar respuesta</button><div class="quiz-status" role="status" aria-live="polite"></div>`;
 $('#check-quiz').addEventListener('click',()=>{
  if(answered){if(step===reflection.length-1){box.innerHTML=`<h4>Completaste la reflexión: ${correct}/5 respuestas correctas.</h4><button class="btn btn-dark btn-small" id="repeat-quiz">Volver a practicar ↻</button>`;$('#repeat-quiz').onclick=()=>{step=0;correct=0;render()};}else{step++;render();}return;}
  const val=$('input[name=reflexion]:checked');if(!val){box.querySelector('.quiz-status').textContent='Elige una respuesta primero.';return;}
  const ok=Number(val.value)===q.correct;if(ok)correct++;answered=true;
  box.querySelector('.quiz-status').textContent=(ok?'✓ Correcto. ':'Vuelve a revisar el concepto. ')+q.why;
  $$('input[name=reflexion]').forEach(x=>x.disabled=true);$('#check-quiz').textContent=step===4?'Ver resultado':'Siguiente pregunta →';
 });}render();
}
function chartMap(id,items,type,onSelect){
 const labels=type==='transmission'?'Regiones de control y sistemas eléctricos':'Referencias territoriales';
 const marker=items.map((x,i)=>{
  const isolated=type==='transmission'&&x.status!=='interconectado en SIN';
  return `<g class="map-pin ${isolated?'map-pin-isolated':'map-pin-sin'}" data-pin="${i}" role="button" tabindex="0" aria-pressed="false" aria-label="${escapeHtml(x.name)}. Ciudad de referencia: ${escapeHtml(x.city||'no informada')}">
  <title>${escapeHtml(x.name)} · ${escapeHtml(x.city||'localidad de referencia')}. No son coordenadas de infraestructura.</title>
  <circle cx="${x.x}" cy="${x.y}" r="18" fill="${isolated?'#f5b400':'#18b7b0'}" opacity=".2"/>
  <circle class="map-pin-ring" cx="${x.x}" cy="${x.y}" r="10" fill="${isolated?'#f5b400':'#18b7b0'}"/>
  <text x="${x.x}" y="${x.y+3.2}" fill="#071c33" font-size="9" font-weight="900" text-anchor="middle">${i+1}</text></g>`;
 }).join('');
 const el=document.getElementById(id);
 el.innerHTML=`<div class="transmission-map-canvas"><svg viewBox="0 0 960 560" role="group" aria-label="${labels}. Referencias regionales, no rutas de interconexión"><title>${labels}</title><image href="assets/maps/mexico.svg" x="0" y="0" width="960" height="560"/>${marker}</svg><div class="transmission-map-note">● Turquesa: regiones del SIN · ● Dorado: sistemas separados del SIN</div></div><div class="transmission-directory" aria-label="Seleccionar región eléctrica">${items.map((x,i)=>`<button type="button" data-region-select="${i}" aria-pressed="false"><span>${String(i+1).padStart(2,'0')}</span> ${escapeHtml(x.name)}</button>`).join('')}</div>`;
 const set=i=>{
  const item=items[i];if(!item)return;
  el.querySelectorAll('.map-pin').forEach(p=>{const active=Number(p.dataset.pin)===i;p.classList.toggle('selected',active);p.setAttribute('aria-pressed',String(active));});
  el.querySelectorAll('[data-region-select]').forEach(p=>{const active=Number(p.dataset.regionSelect)===i;p.classList.toggle('active',active);p.setAttribute('aria-pressed',String(active));});
  onSelect(item);
 };
 el.addEventListener('click',ev=>{
  const pin=ev.target.closest('[data-pin]'),btn=ev.target.closest('[data-region-select]');
  if(pin)set(Number(pin.dataset.pin));else if(btn)set(Number(btn.dataset.regionSelect));
 });
 el.addEventListener('keydown',ev=>{
  if((ev.key==='Enter'||ev.key===' ')&&ev.target.closest('[data-pin]')){ev.preventDefault();set(Number(ev.target.closest('[data-pin]').dataset.pin));}
 });
 set(0);
}
function initDivisionMap(){
 const el=$('#map-distribution'), detail=$('#division-detail');
 // Cada pin representa una referencia territorial; Valle de México agrupa tres.
 const markers=[];
 divisionPoints.forEach((d,i)=>{
   const group=markers.find(m=>m.cluster&&m.cluster===d.cluster);
   if(group){group.indices.push(i);return;}
   markers.push({x:d.x,y:d.y,cluster:d.cluster,indices:[i]});
 });
 const shapes=markers.map((m)=>{
   const grouped=m.indices.length>1,first=m.indices[0],d=divisionPoints[first];
   return `<g class="division-pin${grouped?' division-pin-group':''}" role="button" tabindex="0" data-division-marker="${first}" aria-label="${grouped?'Valle de México, tres divisiones':escapeHtml(d.name)}. Abrir ficha">
     <title>${grouped?'Valle de México (3 divisiones)':escapeHtml(d.name)}. Referencia de zona, no coordenada oficial</title>
     <circle class="division-pin-halo" cx="${m.x}" cy="${m.y}" r="${grouped?27:22}"/>
     <circle class="division-pin-core" cx="${m.x}" cy="${m.y}" r="${grouped?17:13}"/>
     <text x="${m.x}" y="${m.y+3.5}" text-anchor="middle">${grouped?'VM':String(first+1).padStart(2,'0')}</text>
     ${grouped?`<circle class="division-pin-count" cx="${m.x+16}" cy="${m.y-13}" r="9"/><text class="division-count-text" x="${m.x+16}" y="${m.y-10}">3</text>`:''}
   </g>`;
 }).join('');
 el.innerHTML=`<div class="division-map-canvas">
  <svg viewBox="0 0 960 560" role="group" aria-label="Mapa ilustrativo de México con catorce marcadores que representan dieciséis divisiones de CFE Distribución"><title>Divisiones CFE: ubicaciones municipales de referencia sobre base geográfica</title>
   <image href="assets/maps/mexico.svg" x="0" y="0" width="960" height="560"/>
   ${shapes}
  </svg>
  <div class="division-map-notice"><span class="division-map-dot"></span> Ciudades de referencia · límites oficiales: consulta CFE</div>
 </div>
 <div class="division-directory-heading"><strong>Explora las 16 divisiones</strong><span>Selecciona una tarjeta o un marcador · VM agrupa 3</span></div>
 <div class="division-directory" aria-label="Directorio de las 16 divisiones CFE">
  ${divisionPoints.map((d,i)=>`<button type="button" class="division-option" data-division-select="${i}" aria-pressed="false"><span class="division-option-num">${String(i+1).padStart(2,'0')}</span><span class="division-option-text">${escapeHtml(d.name)}</span></button>`).join('')}
 </div>`;
 let active=-1;
 function setDivision(i,focus=false){
   if(i<0||i>=divisionPoints.length)return;
   active=i;
   const d=divisionPoints[i];
   el.querySelectorAll('[data-division-select]').forEach(btn=>{
     const isActive=Number(btn.dataset.divisionSelect)===active;
     btn.classList.toggle('active',isActive);
     btn.setAttribute('aria-pressed',String(isActive));
   });
   el.querySelectorAll('[data-division-marker]').forEach(pin=>{
     const m=markers.find(m=>m.indices[0]===Number(pin.dataset.divisionMarker));
     const isActive=Boolean(m?.indices.includes(active));
     pin.classList.toggle('active',isActive);
     pin.setAttribute('aria-pressed',String(isActive));
   });
   const related=d.cluster?divisionPoints.map((p,j)=>({...p,i:j})).filter(p=>p.cluster===d.cluster):[];
   detail.innerHTML=`<span class="overline">DIVISIÓN CFE · ${String(i+1).padStart(2,'0')} DE 16</span>
    <h3>${escapeHtml(d.name)}</h3>
    <p><strong>${escapeHtml(d.sector)}</strong> · ${escapeHtml(d.scope)}</p>
    ${related.length?`<div class="division-subset"><span>Valle de México:</span>${related.map(p=>`<button type="button" data-detail-division="${p.i}" class="${p.i===active?'active':''}">${escapeHtml(p.name.replace('Valle de México ',''))}</button>`).join('')}</div>`:''}
    <dl><div><dt>Alcance nacional de CFE Distribución</dt><dd>16 divisiones · 150 zonas</dd></div><div><dt>Extensión de las redes, 2024</dt><dd>≈901 mil km</dd></div></dl>
    <p class="division-detail-caution">Las cifras anteriores son de alcance nacional; no son datos particulares de ${escapeHtml(d.name)}. El punto es una ciudad de referencia, no la sede ni el polígono de la división.</p>
    <a class="source-link" href="https://www.cfe.gob.mx/distribucion/cumplimiento/Documents/PAM%20RGD%202024-2038%20VF.pdf" target="_blank" rel="noopener noreferrer">CFE Distribución · PAM RGD 2024–2038 · Figura III.1, p. 7; ordinal PDF no disponible ↗</a><br>
    ${sourceLink({doc:'cfe24',page:95,dataYear:2024,unit:'divisiones / zonas / km',scope:'Nacional CFE Distribución'})}`;
   if(focus)detail.focus({preventScroll:true});
 }
 el.addEventListener('click',ev=>{
   const btn=ev.target.closest('[data-division-select]');
   if(btn){setDivision(Number(btn.dataset.divisionSelect));return;}
   const pin=ev.target.closest('[data-division-marker]');
   if(pin)setDivision(Number(pin.dataset.divisionMarker));
 });
 el.addEventListener('keydown',ev=>{
   const pin=ev.target.closest('[data-division-marker]');
   if(pin&&(ev.key==='Enter'||ev.key===' ')){
     ev.preventDefault();setDivision(Number(pin.dataset.divisionMarker));
   }
 });
 detail.addEventListener('click',ev=>{
   const btn=ev.target.closest('[data-detail-division]');
   if(btn)setDivision(Number(btn.dataset.detailDivision));
 });
 detail.setAttribute('tabindex','-1');
 setDivision(0);
}
// HELION v1.2 · Centrales: mapa editorial por tecnología y clusters visuales.
const plantTechnology=(name)=>name==='Hidroeléctrica'?'hydro':name==='Solar fotovoltaica'?'solar':name==='Nucleoeléctrica'?'nuclear':'thermal';
const plantCaption=(name)=>name==='Hidroeléctrica'?'Hidráulica':name==='Solar fotovoltaica'?'Fotovoltaica':name==='Nucleoeléctrica'?'Nuclear':'Térmica';
function plantGlyph(kind,size=22){
 const paths={
  hydro:'<path d="M0-10 C-3-5-8-1-8 4a8 8 0 0 0 16 0C8-1 3-5 0-10Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-4 5q4 3 8 0" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  solar:'<circle r="4.8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0-11v3M0 8v3M-11 0h3M8 0h3M-8-8l2 2M6 6l2 2M8-8L6-6M-6 6l-2 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  nuclear:'<ellipse rx="10" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><ellipse rx="10" ry="4.2" transform="rotate(60)" fill="none" stroke="currentColor" stroke-width="1.8"/><ellipse rx="10" ry="4.2" transform="rotate(120)" fill="none" stroke="currentColor" stroke-width="1.8"/><circle r="2.1" fill="currentColor"/>',
  thermal:'<path d="M-10 9V-2L-4 1V-2L2 1V-6h6v15Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M4-6v-5h4v5M-6 5h2M0 5h2M6 4v2" fill="none" stroke="currentColor" stroke-width="1.7"/>'
 };
 return `<svg class="plant-tech-glyph" aria-hidden="true" width="${size}" height="${size}" viewBox="-13 -13 26 26">${paths[kind]||paths.thermal}</svg>`;
}
function plantArtwork(kind){
 // Esquemas didácticos de proceso; no representan la geometría de una instalación real.
 const common=`<defs><linearGradient id="art-sky" x2="0" y2="1"><stop stop-color="#0A3A66"/><stop offset="1" stop-color="#061B31"/></linearGradient><linearGradient id="art-water" x2="0" y2="1"><stop stop-color="#18B7B0" stop-opacity=".8"/><stop offset="1" stop-color="#0A3A66"/></linearGradient><pattern id="art-grid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18" fill="none" stroke="#E9EEF3" stroke-opacity=".1"/></pattern></defs><rect width="340" height="142" fill="url(#art-sky)"/><rect width="340" height="142" fill="url(#art-grid)"/><path d="M0 115H340" stroke="#E9EEF3" stroke-opacity=".28"/><text x="14" y="16" fill="#E9EEF3" font-size="9" letter-spacing="2">ESQUEMA DE CONVERSIÓN</text>`;
 const drawings={
 hydro:`<path d="M18 55h82v58H18z" fill="url(#art-water)"/><path d="M20 53h81m-82 14q10-5 20 0t20 0t20 0t20 0" stroke="#E9EEF3" stroke-width="2" fill="none"/><path d="M98 42v72h29V78h36v36h90" fill="#0A3A66" stroke="#E9EEF3" stroke-width="3"/><path class="art-flow" d="M61 74h36v20h57" fill="none" stroke="#18B7B0" stroke-width="4" stroke-dasharray="7 7"/><circle class="art-rotor" cx="164" cy="94" r="16" fill="#061B31" stroke="#F5B400" stroke-width="3"/><path d="M164 80v28m-14-14h28" stroke="#F5B400" stroke-width="2"/><path d="M180 94h33m0-18v37m0-37h27v37h-27" fill="none" stroke="#E9EEF3" stroke-width="3"/><path class="art-flow" d="M242 94h67" stroke="#F5B400" stroke-width="3" stroke-dasharray="6 7"/><text x="24" y="133" fill="#E9EEF3" font-size="9">AGUA</text><text x="148" y="133" fill="#E9EEF3" font-size="9">TURBINA</text><text x="270" y="133" fill="#E9EEF3" font-size="9">RED</text>`,
 solar:`<circle class="art-sun" cx="278" cy="38" r="16" fill="#F5B400"/><path d="M278 7v10m0 42v10m-31-31h10m42 0h10m-53-22 7 7m30 30 7 7m0-44-7 7" stroke="#F5B400" stroke-width="2"/><path class="art-rays" d="M250 63l-23 12m37-15-10 14m35-17-8 14" stroke="#F5B400" stroke-width="3" stroke-dasharray="4 5"/><path d="M35 99 62 48h157l-23 51z" fill="#0A3A66" stroke="#E9EEF3" stroke-width="3"/><path d="m67 48-27 51m67-51-25 51m65-51-24 51m65-51-23 51M50 72h158" stroke="#18B7B0" stroke-width="2"/><path d="M113 99v17m20-17v17" stroke="#E9EEF3" stroke-width="3"/><rect x="228" y="77" width="39" height="39" rx="4" fill="#061B31" stroke="#18B7B0" stroke-width="3"/><path d="M234 96q7-12 14 0t14 0" fill="none" stroke="#F5B400" stroke-width="2"/><path class="art-flow" d="M195 107h32m42-10h46" stroke="#F5B400" stroke-width="3" stroke-dasharray="6 7"/><text x="22" y="133" fill="#E9EEF3" font-size="9">MÓDULOS FV</text><text x="226" y="133" fill="#E9EEF3" font-size="9">INVERSOR</text>`,
 nuclear:`<path d="M33 114h262" stroke="#E9EEF3" stroke-width="3"/><path d="M62 113c11-23 18-54 6-80h43c-12 26-5 57 7 80z" fill="#0A3A66" stroke="#E9EEF3" stroke-width="3"/><path d="M192 113c10-24 17-54 6-80h43c-12 26-5 57 7 80z" fill="#0A3A66" stroke="#E9EEF3" stroke-width="3"/><path class="art-steam" d="M78 30q-13-14 0-25m15 26q12-15 0-26m111 25q-12-14 0-25m18 26q12-15 0-26" fill="none" stroke="#E9EEF3" stroke-width="3"/><rect x="119" y="67" width="57" height="47" rx="8" fill="#061B31" stroke="#F5B400" stroke-width="3"/><circle class="art-rotor" cx="148" cy="89" r="10" fill="none" stroke="#F5B400" stroke-width="3"/><path class="art-flow" d="M176 89h16m57 0h52" stroke="#18B7B0" stroke-width="3" stroke-dasharray="6 7"/><text x="32" y="133" fill="#E9EEF3" font-size="9">VAPOR</text><text x="122" y="133" fill="#E9EEF3" font-size="9">GENERADOR</text><text x="267" y="133" fill="#E9EEF3" font-size="9">RED</text>`,
 thermal:`<path d="M36 114V62l36 16V63l36 16V46h44v68z" fill="#0A3A66" stroke="#E9EEF3" stroke-width="3"/><path d="M151 114V40h23v74m18 0V23h20v91" fill="none" stroke="#E9EEF3" stroke-width="3"/><path class="art-steam" d="M163 38q-13-12 0-23m38 5q-10-12 0-19" fill="none" stroke="#E9EEF3" stroke-width="2"/><path d="M49 89h13m16 0h13m31-11h14" stroke="#F5B400" stroke-width="3"/><circle class="art-rotor" cx="247" cy="91" r="20" fill="#061B31" stroke="#F5B400" stroke-width="3"/><path d="M247 75v32m-16-16h32" stroke="#F5B400" stroke-width="2"/><path class="art-flow" d="M174 90h52m42 0h45" stroke="#18B7B0" stroke-width="3" stroke-dasharray="6 7"/><text x="37" y="133" fill="#E9EEF3" font-size="9">COMBUSTIÓN</text><text x="224" y="133" fill="#E9EEF3" font-size="9">GENERADOR</text>`
 };
 return `<svg class="plant-artwork" viewBox="0 0 340 142" role="img" aria-label="Esquema didáctico animado de ${plantCaption(kind==='hydro'?'Hidroeléctrica':kind==='solar'?'Solar fotovoltaica':kind==='nuclear'?'Nucleoeléctrica':'Combustión interna')}; no reproduce una central real">${common}${drawings[kind]||drawings.thermal}</svg>`;
}
function initGenerationMap(){
 const el=$('#map-generation'),filter=$('#plant-filter'),detail=$('#plant-detail');
 const technologies=[...new Set(plants.map(p=>p.technology))];
 filter.innerHTML='<option value="all">Todas las tecnologías</option>'+technologies.map(t=>`<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
 let visible=[],markers=[],activeId=null;
 function groupNearby(items){
  const result=[];
  items.forEach((p)=>{
   const group=result.find(g=>{
     const x=g.points.reduce((a,q)=>a+q.x,0)/g.points.length;
     const y=g.points.reduce((a,q)=>a+q.y,0)/g.points.length;
     return Math.hypot(x-p.x,y-p.y)<39;
   });
   if(group)group.points.push(p);else result.push({points:[p]});
  });
  return result.map((g,i)=>({id:i,points:g.points,x:g.points.reduce((a,p)=>a+p.x,0)/g.points.length,y:g.points.reduce((a,p)=>a+p.y,0)/g.points.length}));
 }
 function renderDetail(p){
  const kind=plantTechnology(p.technology);
  detail.innerHTML=`<div class="plant-detail-art" data-technology="${kind}">${plantArtwork(kind)}<span>ESQUEMA DE TECNOLOGÍA · NO ES FOTO DE LA CENTRAL</span></div>
  <div class="plant-type"><span class="plant-type-icon" data-technology="${kind}">${plantGlyph(kind,23)}</span><span>${escapeHtml(p.technology)}</span></div>
  <span class="overline">CENTRAL DOCUMENTADA · ${escapeHtml(p.state)}</span><h3>${escapeHtml(p.name)}</h3>
  <div class="plant-detail-kpi"><strong>${es(p.mw,p.mw%1?1:0)} <small>MW</small></strong><span>${escapeHtml(p.capacityBasis)}<br>Año del dato: ${p.year}</span></div>
  <dl><div><dt>Localidad de referencia</dt><dd>${escapeHtml(p.loc)}</dd></div><div><dt>Ubicación del marcador</dt><dd>Ubicación municipal/regional aproximada; NO es un punto exacto de la central.</dd></div></dl>
  <p class="note light">${escapeHtml(p.capacityNote)}</p>${sourceLink(p.source)}
  <p><strong>Operación documentada:</strong> ${escapeHtml(p.operation)}. No acredita disponibilidad instantánea de todas las unidades.</p>${sourceLink(p.operationSource)}
  <p><strong>Posición exacta:</strong> ${escapeHtml(p.geoStatus)}. La fuente municipal no valida el par latitud/longitud.</p>${sourceLink(p.territorySource)}`;
 }
 function choose(id,focus=false){
  const p=visible.find(x=>x.id===id);if(!p)return;
  activeId=id;renderDetail(p);
  el.querySelectorAll('[data-plant-select]').forEach(btn=>{
   const selected=btn.dataset.plantSelect===id;
   btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));
  });
  el.querySelectorAll('[data-plant-group]').forEach(pin=>{
    const g=markers[Number(pin.dataset.plantGroup)];const selected=g?.points.some(x=>x.id===id);
    pin.classList.toggle('active',selected);pin.setAttribute('aria-pressed',String(!!selected));
  });
  if(focus)detail.focus({preventScroll:true});
 }
 function showCluster(g){
  const panel=el.querySelector('.plant-cluster-choices');
  if(!panel)return;
  if(g.points.length<=1){panel.hidden=true;return;}
  panel.hidden=false;
  panel.innerHTML=`<span>En esta referencia hay ${g.points.length} centrales:</span><div>${g.points.map(p=>`<button type="button" data-plant-choose="${escapeHtml(p.id)}">${plantGlyph(plantTechnology(p.technology),16)} ${escapeHtml(p.name)}</button>`).join('')}</div>`;
 }
 function render(){
  visible=filter.value==='all'?plants:plants.filter(p=>p.technology===filter.value);
  markers=groupNearby(visible);
  const html=markers.map(g=>{
   const many=g.points.length>1,p=g.points[0],kind=plantTechnology(p.technology);
   return `<g class="plant-pin" data-plant-group="${g.id}" data-technology="${many?'group':kind}" role="button" tabindex="0" aria-pressed="false" aria-label="${many?`${g.points.length} centrales próximas en este esquema`:escapeHtml(p.name)}. Seleccionar">
    <title>${many?`${g.points.length} centrales representadas en esta zona (posiciones esquemáticas)`:escapeHtml(p.name)}</title>
    <circle class="plant-pin-halo" cx="${g.x}" cy="${g.y}" r="${many?27:23}"/>
    <circle class="plant-pin-core" cx="${g.x}" cy="${g.y}" r="${many?18:16}"/>
    ${many?`<text class="plant-pin-number" text-anchor="middle" x="${g.x}" y="${g.y+5}">${g.points.length}</text>`:`<g class="plant-pin-icon" transform="translate(${g.x} ${g.y})">${plantGlyph(kind,22)}</g>`}
   </g>`;
  }).join('');
  el.innerHTML=`<div class="plant-map-canvas"><svg viewBox="0 0 960 560" role="group" aria-label="Mapa ilustrativo con ${markers.length} grupos para ${visible.length} centrales CFE"><title>Mapa geográfico de centrales con referencias municipales agrupadas cuando están próximas</title><image href="assets/maps/mexico.svg" x="0" y="0" width="960" height="560"/>${html}</svg>
   <div class="plant-map-notice">◎ Ubicación municipal/regional · NO coordenada exacta de cada central</div></div>
   <div class="plant-tech-legend" aria-label="Leyenda por tecnología"><span>TECNOLOGÍAS:</span>${['hydro','solar','nuclear','thermal'].map((k,i)=>`<span class="plant-legend" data-technology="${k}">${plantGlyph(k,17)} ${['Hidráulica','Solar','Nuclear','Combustión'][i]}</span>`).join('')}<span class="plant-legend plant-legend-group">● Número = grupo de centrales</span></div>
   <div class="plant-cluster-choices" hidden></div>
   <div class="plant-directory-heading"><strong>Explora ${visible.length} centrales</strong><span>Elige una central para ver su ficha y destacar su zona</span></div>
   <div class="plant-directory">${visible.map((p,i)=>`<button type="button" class="plant-option" data-plant-select="${escapeHtml(p.id)}" aria-pressed="false"><span class="plant-option-icon" data-technology="${plantTechnology(p.technology)}">${plantGlyph(plantTechnology(p.technology),19)}</span><span class="plant-option-info"><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.state)} · ${es(p.mw,p.mw%1?1:0)} MW</small></span></button>`).join('')}</div>`;
  const selectId=visible.some(p=>p.id===activeId)?activeId:visible[0].id;
  choose(selectId);
 }
 el.addEventListener('click',ev=>{
  const option=ev.target.closest('[data-plant-select]');if(option){choose(option.dataset.plantSelect);return;}
  const clusterOption=ev.target.closest('[data-plant-choose]');if(clusterOption){choose(clusterOption.dataset.plantChoose);return;}
  const pin=ev.target.closest('[data-plant-group]');if(pin){const g=markers[+pin.dataset.plantGroup];showCluster(g);choose(g.points[0].id);}
 });
 el.addEventListener('keydown',ev=>{
   const pin=ev.target.closest('[data-plant-group]');if(pin&&(ev.key==='Enter'||ev.key===' ')){
    ev.preventDefault();const g=markers[+pin.dataset.plantGroup];showCluster(g);choose(g.points[0].id);
   }
 });
 filter.addEventListener('change',()=>{activeId=null;render()});
 detail.setAttribute('tabindex','-1');render();
}
function initMaps(){
 initGenerationMap();
 chartMap('map-transmission',systems,'transmission',s=>{$('#system-detail').innerHTML=`<span class="overline">CENACE · REFERENCIA TERRITORIAL</span><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.detail)}</p><dl><div><dt>Estado</dt><dd>${escapeHtml(s.status)}</dd></div><div><dt>Ciudad usada para situar el marcador</dt><dd>${escapeHtml(s.city)}</dd></div><div><dt>Alcance cartográfico</dt><dd>Referencia urbana aproximada; precisión puntual pendiente. No describe límites, sedes, subestaciones ni conexiones reales. Corte estadístico 2024. Las diez gerencias de CFE Transmisión son otra estructura.</dd></div></dl><a class="source-link" href="https://www.cenace.gob.mx/Docs/10_PLANEACION/DiagramasUnifilares/Mod%20Gral%20Planeaci%C3%B3n%202020-2025%20Diagramas%20Unifilares%20RNT%20y%20RGD%20del%20MEM.pdf" target="_blank" rel="noopener noreferrer">CENACE · Planeación 2020–2025; no prueba puesta en operación ↗</a><p class="note">Clasificación al corte 2024: <a href="https://www.cne.gob.mx/Electricidad%20CNE/Codigo%20de%20red/Anexo%20Acuerdo%20RCSEN2024%20R00.pdf#page=5" target="_blank" rel="noopener noreferrer">CNE, Confiabilidad SEN 2024, p.5/PDF5</a>.</p>`;});
 initDivisionMap();
}
function initSimTrans(){const input=['p-mw','v-kv','r-ohm','p-factor'].map(id=>document.getElementById(id));
 function update(){const P=+input[0].value*1e6,V=+input[1].value*1000,R=+input[2].value,pf=+input[3].value,I=P/(Math.sqrt(3)*V*pf),loss=3*I*I*R;
 safeText('p-label',`${es(P/1e6)} MW`);safeText('v-label',`${es(V/1000,1)} kV`);safeText('r-label',`${es(R,1)} Ω`);safeText('pf-label',pf.toFixed(2));safeText('result-current',es(I,1));safeText('result-loss',es(loss/1e6,3));safeText('result-loss-pct',es(100*loss/P,2));safeText('transmission-warning',loss>=P?'Pérdidas iguales o mayores que P de carga: escenario excesivo, fuera de un diseño viable. La fórmula no se limita artificialmente.':'El resultado es didáctico: un porcentaje pequeño no certifica viabilidad, límites térmicos ni caída de tensión.');
 const pts=[];for(let k=0;k<=36;k++){const v=13.8+(500-13.8)*k/36;const ii=P/(Math.sqrt(3)*v*1000*pf);pts.push({v,loss:3*ii**2*R/1e6});}
 // Graph y-axis logarithmically compressed for readability at low voltages.
 const width=620,height=220,left=70,right=17,top=12,bottom=35;const maxlog=Math.log10(1+Math.max(...pts.map(x=>x.loss))),X=v=>left+(v-13.8)/(500-13.8)*(width-left-right),Y=l=>top+(height-top-bottom)*(1-Math.log10(1+l)/maxlog);
 const ticks=[0,0.5,1].map(q=>{const value=10**(q*maxlog)-1;const y=Y(value);return `<g><line x1="${left}" x2="${width-right}" y1="${y}" y2="${y}" stroke="#adc9d5" stroke-dasharray="3 4"/><text x="${left-5}" y="${y+4}" text-anchor="end" font-size="10" fill="#38576c">${es(value,value<10?2:0)} MW</text></g>`}).join('');
 const poly=pts.map(d=>`${X(d.v).toFixed(1)},${Y(d.loss).toFixed(1)}`).join(' ');const cx=X(V/1000),cy=Y(loss/1e6);
 $('#chart-sim-trans').innerHTML=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Pérdida vs tensión; eje vertical comprimido de forma logarítmica"><title>Curva de pérdidas a distinta tensión; compresión log10(1 + PJ/(1 MW))</title>${ticks}<path d="M${left} ${top}V${height-bottom}H${width-right}" fill="none" stroke="#adc9d5"/><path d="M${left} ${height-bottom}L${poly.replaceAll(' ',' L')}L${width-right} ${height-bottom}Z" fill="#18b7b027"/><polyline points="${poly}" fill="none" stroke="${col.teal}" stroke-width="3"/><line x1="${cx}" x2="${cx}" y1="${cy}" y2="${height-bottom}" stroke="${col.gold}" stroke-dasharray="4 5"/><circle cx="${cx}" cy="${cy}" r="6" fill="${col.gold}" stroke="white" stroke-width="2"/><text x="${left}" y="${height-6}" font-size="11" fill="#607e8d">13.8 kV</text><text x="${width-right}" y="${height-6}" text-anchor="end" font-size="11" fill="#607e8d">500 kV</text><text x="${left+8}" y="${top+9}" font-size="10" fill="#607e8d">log₁₀(1 + Pⱼ/(1 MW)) · marcas en MW</text></svg>`;
 }
 input.forEach(el=>el.addEventListener('input',update));$('#reset-transmission').addEventListener('click',()=>{['80','230','5','1'].forEach((v,i)=>input[i].value=v);update()});update();}
function initSimTransformer(){const input=['vp-v','turns-ratio','s-kva'].map(x=>document.getElementById(x));function update(){const vp=+input[0].value,ratio=+input[1].value,S=+input[2].value*1000,vs=vp/ratio,ip=S/vp,is=S/vs;safeText('vp-label',`${es(vp)} V`);safeText('ratio-label',`${es(ratio,1)}:1`);safeText('s-label',`${es(S/1000)} kVA`);safeText('result-vs',es(vs,1));safeText('result-ip',es(ip,2));safeText('result-is',es(is,2));
 const turns=Math.max(4,Math.min(10,Math.round(4+Math.log2(Math.max(ratio,.5)+1))));
 const winding=(x,n,color)=>Array.from({length:n},(_,i)=>`<path d="M${x} ${55+i*(148/n)} q -21 ${74/n} 0 ${148/n}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`).join('');
 const speed=Math.max(.9,Math.min(4,100/Math.max(15,S/1000)));
 $('#chart-sim-transformer').innerHTML=`<svg class="transformer-art" style="--flux-duration:${speed.toFixed(2)}s" viewBox="0 0 620 290" role="img" aria-label="Transformador ideal monofásico: primario ${es(vp)} V y ${es(ip,2)} A; secundario ${es(vs,1)} V y ${es(is,2)} A. Relación de espiras ${es(ratio,1)} a uno"><defs><pattern id="core-laminations" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0H8" stroke="#0A3A66" stroke-opacity=".16"/></pattern></defs><rect x="5" y="5" width="610" height="280" rx="22" fill="#E9EEF3"/><path d="M201 44h218v173H201z" fill="none" stroke="#0A3A66" stroke-width="27" stroke-linejoin="round"/><path d="M201 44h218v173H201z" fill="none" stroke="url(#core-laminations)" stroke-width="22"/><path class="transformer-flux" d="M207 44h206v173H207z" fill="none" stroke="#F5B400" stroke-width="4" stroke-dasharray="10 28"/>${winding(185,turns,'#18B7B0')}${winding(435,Math.max(4,Math.min(10,Math.round(12-turns/2))),'#F5B400')}<path d="M48 130h107m305 0h110" stroke="#0A3A66" stroke-width="4" stroke-linecap="round"/><circle class="transformer-pulse" cx="91" cy="130" r="7" fill="#18B7B0"/><circle class="transformer-pulse transformer-pulse-out" cx="529" cy="130" r="7" fill="#F5B400"/><text x="42" y="78" fill="#0A3A66" font-size="13" font-weight="800">PRIMARIO</text><text x="42" y="105" fill="#0A3A66" font-size="21" font-weight="900">${es(vp)} V</text><text x="41" y="164" fill="#0A3A66" font-size="12">${es(ip,2)} A RMS</text><text x="468" y="78" fill="#0A3A66" font-size="13" font-weight="800">SECUNDARIO</text><text x="468" y="105" fill="#0A3A66" font-size="21" font-weight="900">${es(vs,1)} V</text><text x="469" y="164" fill="#0A3A66" font-size="12">${es(is,2)} A RMS</text><text x="310" y="253" text-anchor="middle" fill="#0A3A66" font-size="13" font-weight="800">Nₚ/Nₛ = ${es(ratio,1)} : 1 · S = ${es(S/1000)} kVA</text><text x="310" y="272" text-anchor="middle" fill="#0A3A66" font-size="10">FLUJO MAGNÉTICO ESQUEMÁTICO · MODELO IDEAL</text></svg>`;
}
 input.forEach(el=>el.addEventListener('input',update));$('#reset-transformer').addEventListener('click',()=>{['13200','60','75'].forEach((v,i)=>input[i].value=v);update()});update();}
function initFindings(){
 const groups=['Todos','Recursos','Generación','Transmisión','Distribución'],control=$('#finding-filters');
 control.innerHTML=groups.map((g,i)=>`<button type="button" class="pill ${i===0?'active':''}" aria-pressed="${i===0}" data-find-filter="${escapeHtml(g)}">${escapeHtml(g)}</button>`).join('');
 function render(group){const list=group==='Todos'?findings:findings.filter(f=>f.group===group);
 $('#findings-list').innerHTML=list.map(f=>{const a=f.compare?.a,b=f.compare?.b,max=Math.max(a||0,b||0,1);
 const comparison=f.compare?`Comparación: ${f.compare.labels[0]}: ${displayValue(a)}; ${f.compare.labels[1]}: ${displayValue(b)}.`:'';
 return `<article class="finding"><span>${escapeHtml(f.group.toUpperCase())} / ${f.year}</span><h3>${escapeHtml(f.q)}</h3>
 <div class="finding-stat">${displayValue(f.v)} <small>${escapeHtml(f.unit)}</small></div>
 ${f.compare?`<div class="mini-bars" role="img" aria-label="${escapeHtml(comparison)}"><div><i style="width:${100*a/max}%"></i></div><div><i style="width:${100*b/max}%"></i></div></div>`:`<a class="finding-visual" href="${f.visual.href}">${escapeHtml(f.visual.label)} →</a>`}
 <p>${escapeHtml(f.detail)} ${escapeHtml(comparison)}</p>${sourceLink(f.source)}</article>`}).join('');}
 control.addEventListener('click',ev=>{const b=ev.target.closest('[data-find-filter]');if(!b)return;$$('[data-find-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render(b.dataset.findFilter)});render('Todos');
 $('#findings-list').addEventListener('click',event=>{const link=event.target.closest('.finding-visual');if(!link)return;const target=document.querySelector(link.getAttribute('href'));if(target){const details=target.closest('details');if(details)details.open=true;target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}});
}
function initTimeline(){
 const nav=$('#timeline-nav');nav.innerHTML=timeline.map((t,i)=>`<button type="button" class="${i===0?'active':''}" aria-pressed="${i===0}" data-timeline="${i}">${escapeHtml(t.year)} <span aria-hidden="true">→</span></button>`).join('');
 function set(i){$$('[data-timeline]').forEach(btn=>{btn.classList.toggle('active',+btn.dataset.timeline===i);btn.setAttribute('aria-pressed',String(+btn.dataset.timeline===i));});const t=timeline[i];
 $('#timeline-detail').innerHTML=`<span class="overline">PUBLICACIÓN ${escapeHtml(t.date)}</span><h3>${escapeHtml(t.title)}</h3><p><strong>Vigencia:</strong> ${escapeHtml(t.effective)}</p><p>${escapeHtml(t.text)}</p><ul>${t.effects.map(e=>`<li>${escapeHtml(e)}</li>`).join('')}</ul><p class="note">${escapeHtml(t.source)}</p><a href="${escapeHtml(t.url)}" target="_blank" rel="noopener noreferrer">Consultar norma original ↗</a>`;}
 nav.addEventListener('click',ev=>{const b=ev.target.closest('[data-timeline]');if(b)set(+b.dataset.timeline)});set(0);
 $('#legal-effects').innerHTML=legalEffects.map((e,i)=>`<article><h4>${i+1}. ${escapeHtml(e.title)}</h4><p>${escapeHtml(e.text)}</p><p class="note">${escapeHtml(e.source)}</p></article>`).join('');
}
function initSources(){$('#sources-list').innerHTML=Object.values(DOCS).map(doc=>`<div class="source-card"><div><strong>${escapeHtml(doc.name)}</strong><br><span>${escapeHtml(doc.institution)} · edición ${doc.edition}; publicación: no disponible</span></div><a href="${doc.url}" target="_blank" rel="noopener noreferrer">Abrir PDF de referencia ↗</a></div>`).join('');}
function initNavigation(){const nav=$('#main-nav');const toggle=$('#menu-toggle');toggle.addEventListener('click',()=>{const next=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(next));nav.classList.toggle('open',next)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));nav.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});const progress=$('#reading-progress');const scroll=()=>{const full=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${full>0?window.scrollY/full*100:0}%`};window.addEventListener('scroll',scroll,{passive:true});scroll();if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const link=nav.querySelector(`a[href="#${e.target.id}"]`);if(link){nav.querySelectorAll('a').forEach(x=>x.classList.toggle('active',x===link));}}}),{rootMargin:'-15% 0px -74% 0px'});['recursos','generacion','transmision','distribucion','sabias'].forEach(id=>observer.observe(document.getElementById(id)));}}
function initVisualMotion(){
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(reduce.matches||!('IntersectionObserver' in window))return;
 const targets=document.querySelectorAll('.section-heading,.family-card,.kpi,.finding,.panel,.map-layout');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});
 targets.forEach(el=>{el.classList.add('reveal');observer.observe(el)});
}
function init(){initVisualMotion();initNavigation();initResources();initClassifier();initReflection();renderAllCharts();initMaps();initSimTrans();initSimTransformer();initFindings();initTimeline();initSources();console.info('HELION Atlas · v1.6 · experiencia visual cargada');}
init();
