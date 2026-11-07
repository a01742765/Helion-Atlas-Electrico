import fs from 'node:fs';
import assert from 'node:assert/strict';
import {geoProject,plants,systems,divisionPoints} from '../js/data.js';
const svg=fs.readFileSync(new URL('../assets/maps/mexico.svg',import.meta.url),'utf8');
assert.match(svg,/Natural Earth/);
assert.match(svg,/viewBox="0 0 960 560"/);
const [lon,lat]=[-99.133,19.4326];
const {x,y}=geoProject(lat,lon);
assert.ok(Math.abs(x-(60+(lon+118.6)*26))<.001);
assert.ok(Math.abs(y-(26+(33.7-lat)*26))<.001);
for(const obj of [...plants,...systems,...divisionPoints]){
 assert.ok(obj.lat>=14&&obj.lat<=33,`lat fuera de México: ${obj.name}`);
 assert.ok(obj.lon>=-118&&obj.lon<=-86,`lon fuera de México: ${obj.name}`);
 assert.ok(Number.isFinite(obj.x)&&Number.isFinite(obj.y),`sin proyección: ${obj.name}`);
 assert.ok(obj.x>20&&obj.x<940&&obj.y>10&&obj.y<545,`pin fuera de mapa: ${obj.name}`);
}
assert.equal(plants.length,15);
assert.equal(systems.length,10);
assert.equal(divisionPoints.length,16);
assert.ok(plants.every(p=>p.geoSource.startsWith('https://')&&p.geoType&&p.loc));
assert.deepEqual(divisionPoints.map(d=>d.name),[
 'Baja California','Noroeste','Norte','Golfo Norte','Golfo Centro','Bajío','Jalisco','Centro Occidente',
 'Centro Sur','Centro Oriente','Oriente','Sureste','Peninsular','Valle de México Norte','Valle de México Centro','Valle de México Sur']);
assert.equal(divisionPoints.filter(p=>p.cluster==='valle-mexico').length,3);
assert.equal(systems.filter(p=>p.status==='interconectado en SIN').length,7);
assert.equal(systems.filter(p=>p.status!=='interconectado en SIN').length,3);
assert.ok(plants.find(p=>p.id==='encanto').loc.includes('Tlapacoyan'));
assert.ok(plants.find(p=>p.id==='mazatepec').loc.includes('Tlatlauquitepec'));
assert.ok(plants.find(p=>p.id==='penasco').loc.includes('Puerto Peñasco'));
assert.ok(plants.find(p=>p.id==='laguna').loc.includes('Alto Lucero'));
console.log('✓ Geografía v1.4: 15 localidades de centrales, 16 divisiones, 10 referencias de transmisión y proyección consistente.');
