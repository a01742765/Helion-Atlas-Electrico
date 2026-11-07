import assert from 'node:assert/strict';
import fs from 'node:fs';
import {generation,tech,plants,systems,divisionPoints,resources,findings,timeline,legalEffects,ref,cleanGeneration} from '../js/data.js';
const records=JSON.parse(fs.readFileSync(new URL('../docs/evidencia/auditoria.json',import.meta.url)));
assert.equal(records.length,397);
assert.deepEqual(generation.map(x=>x.gwh),[141343,150462,154059]);
assert.deepEqual([2022,2023,2024].map(y=>tech.reduce((sum,t)=>sum+t[`g${y}`],0)),[141342,150461,154059]);
// All 33 technologies against audit, never adjust a category to fit totals.
for(const year of [2022,2023,2024])for(const [index,t] of tech.entries()){
 const r=records.find(r=>r.field===`tech[${index}].g${year}`);
 assert.ok(r,`${t.name} ${year}: audit row`);assert.equal(t[`g${year}`],r.verified);
}
assert.equal(tech.slice(5).reduce((s,t)=>s+t.g2024,0),15761);
assert.equal(cleanGeneration.gwh,38982.9);
assert.deepEqual(resources.map(r=>r.value),[782478,132950,128665,130343,100594,85253,null,null]);
assert.equal(resources[4].unit,'miles de m³');assert.equal(resources[4].comparable,false);
assert.match(resources[4].note,/pendiente/i);assert.equal(findings[4].compare,undefined);
assert.equal(plants.find(p=>p.id==='zim').mw,304);
assert.equal(plants.find(p=>p.id==='penasco').mw,120);
assert.equal(plants.find(p=>p.id==='penasco').year,2023);
assert.match(plants.find(p=>p.id==='penasco').capacityNote,/420 MW/);
assert.match(plants.find(p=>p.id==='port1').loc,/Conflicto.*Ocoyucan.*Atlixco.*pendiente/);
assert.match(plants.find(p=>p.id==='port2').capacityNote,/0.032.*0.0/);
assert.match(plants.find(p=>p.id==='altar').loc,/San Luis Río Colorado/);
for(const p of plants){assert.ok(p.year&&p.capacityBasis&&p.operation&&p.source&&p.territorySource);assert.match(p.geoStatus,/PENDIENTE/);}
assert.match(divisionPoints[10].scope,/Xalapa/);assert.ok(systems.slice(0,7).every(s=>s.detail.includes('Gerencia de Control Regional')));
assert.equal(findings.length,20);assert.ok(findings.every(f=>f.compare||f.visual));
assert.equal(legalEffects.length,5);assert.deepEqual(timeline.map(t=>t.date),['20-dic-2013','11-ago-2014','31-oct-2024','18-mar-2025']);
assert.equal(ref('cfe24',26).pdfPage,29);assert.equal(ref('cfe24',12345).pdfPage,null);
assert.equal(plants.find(p=>p.id==='port1').territorySource.pdfPage,'NO DISPONIBLE');
const app=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
for(const f of findings.filter(f=>f.visual))assert.ok(html.includes(`id="${f.visual.href.slice(1)}"`));
assert.ok(!app.includes('VF.pdf#page=13'));
// Exercise production simulator handlers, rather than recopying their formulas.
function simulator(name,initial,next){
 const start=app.indexOf(`function ${name}()`),end=app.indexOf(`function ${next}()`,start);
 const elements=Object.fromEntries(Object.entries(initial).map(([k,v])=>[k,{value:v,listeners:{},addEventListener(event,fn){this.listeners[event]=fn}}]));
 const output={};const document={getElementById:id=>elements[id]};
 const $=selector=>elements[selector.slice(1)]??(elements[selector.slice(1)]={innerHTML:'',listeners:{},addEventListener(event,fn){this.listeners[event]=fn}});
 const run=new Function('document','$','safeText','es','col',app.slice(start,end)+`;return ${name};`)(document,$,(k,v)=>output[k]=v,(n)=>n,{teal:'#18B7B0',gold:'#F5B400'});
 run();return {output,elements,set(id,value){elements[id].value=value;elements[id].listeners.input();}};
}
const close=(actual,expected,tolerance=1e-6)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);
const t=simulator('initSimTrans',{'p-mw':80,'v-kv':230,'r-ohm':5,'p-factor':1},'initSimTransformer');
close(t.output['result-current'],200.81748493505825);close(t.output['result-loss'],0.6049149338374291);close(t.output['result-loss-pct'],0.7561436672967864);
const i=t.output['result-current'],loss=t.output['result-loss'];t.set('v-kv',460);close(t.output['result-current'],i/2);close(t.output['result-loss'],loss/4);
t.set('v-kv',230);t.set('p-mw',160);close(t.output['result-current'],2*i);close(t.output['result-loss'],4*loss);
t.set('v-kv',13.8);t.set('p-mw',500);t.set('r-ohm',40);assert.match(t.output['transmission-warning'],/fuera de un diseño viable/);assert.ok(t.output['result-loss-pct']>100);
t.elements['reset-transmission'].listeners.click();close(t.output['result-current'],i);
const tr=simulator('initSimTransformer',{'vp-v':13200,'turns-ratio':60,'s-kva':75},'initFindings');
close(tr.output['result-vs'],220);close(tr.output['result-ip'],5.681818181818182);close(tr.output['result-is'],340.90909090909093);
tr.set('turns-ratio',.5);close(tr.output['result-vs'],26400);close(tr.output['result-is'],75000/26400);
tr.elements['reset-transformer'].listeners.click();close(tr.output['result-vs'],220);
console.log('✓ v1.5: 397 registros, 33 valores, residuos, fuentes, pendientes y simuladores reales comprobados.');
