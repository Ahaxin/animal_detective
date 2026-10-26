import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],network=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url())});
 await page.goto(pathToFileURL(path.resolve('index.html')).href);await page.evaluate(()=>localStorage.removeItem('animal-detective-v1'));await page.reload();
 for(const id of ['#start-btn','#enter-case','#intro-next','#claim-tool'])await page.click(id);
 await page.evaluate(()=>{const c=JSON.parse(render_game_to_text()).clueLocations.find(c=>c.id==='hole'),r=document.querySelector('#scene').getBoundingClientRect();document.querySelector('#scene').dispatchEvent(new MouseEvent('click',{clientX:r.x+c.x*r.width,clientY:r.y+c.y*r.height,bubbles:true}))});await page.evaluate(()=>window.advanceTime(4000));await page.click('#overlay .primary[data-close]');
 await page.reload();await page.click('#start-btn');await page.click('#enter-case');
 const state=JSON.parse(await page.evaluate(()=>window.render_game_to_text()));assert.equal(state.magnifier,true);assert.deepEqual(state.evidence,['hole']);assert.deepEqual(errors,[]);assert.deepEqual(network,[]);
 await fs.mkdir('output/single-screen',{recursive:true});await page.screenshot({path:'output/single-screen/12-offline.png',fullPage:true});await fs.writeFile('output/single-screen/offline-results.json',JSON.stringify({passed:true,networkRequests:network,errors,saveAndReload:true},null,2));console.log('PASS: double-click/file startup, offline assets, interactions and save/reload; zero network requests.');
}finally{await browser.close()}
