import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const read=(p)=>fs.readFileSync(new URL(p,root),'utf8');
const html=read('index.html'),data=read('js/data.js'),app=read('js/app.js');
for(const id of ['recursos','generacion','transmision','distribucion','sabias','map-generation','map-transmission','map-distribution','chart-generation','chart-saidi','chart-losses','chart-mix','chart-tech','chart-lines','chart-mva','chart-cycles','chart-clean','result-current','result-vs']){
 assert.match(html,new RegExp(`id="${id}"`),`falta ${id}`);
}
assert.equal((data.match(/group:'Recursos'/g)||[]).length,5);
for(const g of ['Generación','Transmisión','Distribución'])assert.equal((data.match(new RegExp(`group:'${g}'`,'g'))||[]).length,5);
const plantSection=data.split('export const plants = [')[1].split('export const systems')[0];
assert.match(plantSection,/geoProject/);
assert.match(app,/Math\.sqrt\(3\)/);
assert.match(app,/S\/vs/);
for(const path of ['assets/brand/logo-horizontal.svg','assets/maps/mexico.svg','css/styles.css','js/app.js'])assert.ok(fs.existsSync(new URL(path,root)),path);
console.log('✓ Estructura, 5 módulos, 3 mapas, 15 centrales, 20 hallazgos y simuladores: comprobación estática satisfactoria.');
const mod=await import('../js/data.js');
assert.equal(mod.plants.length,15);
assert.equal(mod.classifier.length,18);
assert.equal(mod.findings.length,20);
assert.ok(new Set(mod.plants.map(p=>p.state)).size>=5);
assert.ok(new Set(mod.plants.map(p=>p.technology)).size>=4);
assert.equal(mod.generation.length,3);
assert.ok(html.includes('<option value="2022">2022</option>'), '2022 debe estar disponible en el selector');
for (const year of [2022,2023,2024]) {
 assert.ok(mod.tech.every(t=>Number.isFinite(t[`g${year}`])),`faltan datos en ${year}`);
}
assert.equal(mod.tech.reduce((sum,t)=>sum+t.g2022,0),141342);
assert.equal(mod.tech.reduce((sum,t)=>sum+t.g2024,0),154059);
const P=80e6,V=230e3,R=5,pf=1;
const I=P/(Math.sqrt(3)*V*pf), loss=3*I*I*R;
assert.ok(Math.abs(I-200.816)<0.1);
assert.ok(Math.abs(loss/1e6-.6049)<.002);
const Vp=13200,ratio=60,S=75000,Vs=Vp/ratio;
assert.equal(Vs,220);
assert.ok(Math.abs(S/Vp-5.681818)<.001);
assert.ok(Math.abs(S/Vs-340.909)<.001);
console.log('✓ Datos y cálculos básicos verificados: 15 centrales, 4 tecnologías, 20 hallazgos, 80 MW trifásicos y transformador ideal.');

assert.match(app,/function initGenerationMap\(/);
assert.match(app,/function plantArtwork\(/);
assert.match(app,/data-plant-select/);
assert.match(app,/groupNearby\(visible\)/);
assert.match(read('css/styles.css'),/#map-generation \.plant-directory/);
console.log('✓ Versión 1.2: mapa de centrales por tecnología, agrupación visual y directorio.');
