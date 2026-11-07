import fs from 'node:fs';
import assert from 'node:assert/strict';
import { divisionPoints } from '../js/data.js';
const source=fs.readFileSync(new URL('../js/app.js', import.meta.url),'utf8');
const start=source.indexOf('function initDivisionMap(){');
const end=source.indexOf('function initMaps(){',start);
assert.ok(start>=0&&end>start);
const functionText=source.slice(start,end);
const attrs = (selector, html) => [...html.matchAll(new RegExp(selector+'="(\\d+)"','g'))].map(m=>({dataset: selector==='data-division-select'?{divisionSelect:m[1]}:{divisionMarker:m[1]}, setAttribute(a,b){this[a]=b},classList:{toggle(){}}}));
class MockElement {
 constructor(){this.html='';this.listeners={};this.children={}}
 set innerHTML(s){this.html=s;this.children={}}
 get innerHTML(){return this.html}
 querySelectorAll(sel){return sel.includes('division-select')?attrs('data-division-select',this.html):attrs('data-division-marker',this.html)}
 addEventListener(k,f){this.listeners[k]=f}
 setAttribute(k,v){this[k]=v}
 focus(){}
}
const el=new MockElement(), detail=new MockElement();
const $=id=>id==='#map-distribution'?el:detail;
const escapeHtml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const sourceLink=()=>'<a href="#">Fuente</a>';
const init=new Function('divisionPoints','escapeHtml','sourceLink','$',functionText+'; return initDivisionMap;')(divisionPoints,escapeHtml,sourceLink,$);
init();
assert.equal(divisionPoints.length,16);
assert.equal(el.querySelectorAll('[data-division-select]').length,16);
assert.equal(el.querySelectorAll('[data-division-marker]').length,14);
assert.match(el.innerHTML,/Valle de México/);
assert.match(detail.innerHTML,/Baja California/);
function clickOn(selector,index){el.listeners.click({target:{closest:query=>query===selector?{dataset: selector==='[data-division-select]'?{divisionSelect:String(index)}:{divisionMarker:String(index)}}:null}})};
clickOn('[data-division-select]',14);
assert.match(detail.innerHTML,/<h3>Valle de México Centro<\/h3>/);
assert.equal((detail.innerHTML.match(/data-detail-division/g)||[]).length,3);
detail.listeners.click({target:{closest:sel=>sel==='[data-detail-division]'?{dataset:{detailDivision:'15'}}:null}});
assert.match(detail.innerHTML,/<h3>Valle de México Sur<\/h3>/);
clickOn('[data-division-marker]',12);
assert.match(detail.innerHTML,/<h3>Peninsular<\/h3>/);
console.log('✓ 16 tarjetas, 14 marcadores, agrupación VM y ficha sincronizada: prueba de interacciones simuladas superada.');
