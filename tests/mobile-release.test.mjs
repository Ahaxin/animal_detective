import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
await fs.mkdir('output/mobile-release',{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://127.0.0.1:5173');
 await page.waitForFunction(()=>navigator.serviceWorker.controller!==null,{timeout:15000});
 for(const selector of ['#start-btn','#enter-case','#intro-next','#claim-tool'])await page.tap(selector);
 await page.evaluate(()=>{const c=JSON.parse(render_game_to_text()).clueLocations.find(c=>c.id==='hole'),r=document.querySelector('#scene').getBoundingClientRect();document.querySelector('#scene').dispatchEvent(new MouseEvent('click',{clientX:r.x+c.x*r.width,clientY:r.y+c.y*r.height,bubbles:true}))});await page.evaluate(()=>advanceTime(12000));await page.tap('#overlay .primary[data-close]');
 await page.screenshot({path:'output/mobile-release/phone-garden.png'});
 const initial=JSON.parse(await page.evaluate(()=>render_game_to_text()));assert.equal(initial.magnifier,true);assert.deepEqual(initial.evidence,['hole']);
 const manifest=await page.evaluate(()=>fetch('./manifest.webmanifest').then(r=>r.json()));assert.equal(manifest.display,'standalone');
 await context.setOffline(true);await page.reload();await page.waitForFunction(()=>typeof render_game_to_text==='function');
 await page.tap('#start-btn');await page.tap('#enter-case');let state=JSON.parse(await page.evaluate(()=>render_game_to_text()));assert.equal(state.magnifier,true);assert.deepEqual(state.evidence,['hole']);
 await page.tap('#inventory-toggle');await page.tap('[data-bag-clue="hole"]');await page.tap('#overlay .primary[data-close]');
 await page.tap('[data-scene-suspect="mole"]');await page.evaluate(()=>advanceTime(12000));assert.equal(JSON.parse(await page.evaluate(()=>render_game_to_text())).dialogue.speaker,'mole');
 await page.screenshot({path:'output/mobile-release/offline-dialogue.png'});await page.tap('#dialogue-next');await page.tap('#dialogue-next');
 await page.tap('#journal-toggle');assert.equal(JSON.parse(await page.evaluate(()=>render_game_to_text())).notebookOpen,true);await page.screenshot({path:'output/mobile-release/offline-notebook.png'});await page.tap('#notebook-close');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight===innerHeight&&document.documentElement.scrollWidth===innerWidth),true);assert.deepEqual(errors,[]);
 await fs.writeFile('output/mobile-release/results.json',JSON.stringify({passed:true,touchInput:true,installableManifest:true,offlineReload:true,offlineEvidence:true,offlineDialogue:true,preservedSave:true,errors,physicalPhoneTested:false},null,2));console.log('PASS: phone touch flow, manifest, cached offline reload, saved evidence, offline dialogue and notebook, no page scrolling or console errors.');
 await context.close();
}finally{await browser.close()}

