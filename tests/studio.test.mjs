import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
await fs.mkdir('output/studio',{recursive:true});
const errors=[],context=await browser.newContext({viewport:{width:375,height:812},hasTouch:true});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
const state=()=>page.evaluate(()=>JSON.parse(render_game_to_text()));
const tap=async s=>{await page.tap(s);await page.waitForTimeout(80)};
const close=()=>tap('#overlay .primary[data-close]');
async function scene(id,type='clue'){if(type==='suspect')await tap(`[data-scene-suspect="${id}"]`);else{const s=await state(),c=s.clueLocations.find(c=>c.id===id),v=page.viewportSize();await page.touchscreen.tap(c.x*v.width,c.y*v.height)}await page.evaluate(()=>advanceTime(12000));await page.waitForTimeout(80)}
async function dialogue(){let guard=0;while((await state()).dialogue&&guard++<20)await tap('#dialogue-next');assert.ok(guard<20)}
async function collect(){for(const id of ['portraits','palette']){await scene(id);assert.equal((await state()).modal,'evidence',id);await page.screenshot({path:`output/studio/${id}.png`});await close()}}
try{
 await page.goto('http://127.0.0.1:5173');await tap('#start-btn');assert.equal(await page.locator('[data-enter]').count(),3);await tap('#enter-studio');await tap('#intro-next');
 assert.equal((await state()).caseId,'studio');assert.equal((await state()).toolRequired,false);assert.equal((await state()).magnifier,false);assert.equal((await state()).modal,null);assert.equal(await page.locator('#inventory-toggle').evaluate(e=>e.classList.contains('needs-tool')),false);
 await page.screenshot({path:'output/studio/phone-scene.png'});
 // No testimony or evidence leaks into early accusation.
 await tap('#deduce-toggle');await tap('[data-pick-suspect="parrot"]');assert.equal(await page.locator('[data-pick-clue]').count(),0);await tap('#accuse-without-evidence');assert.equal((await state()).solved,false);await tap('#overlay .close');
 // Empty floor only moves; no clue is granted.
 await page.touchscreen.tap(220,580);await page.evaluate(()=>advanceTime(3000));assert.deepEqual((await state()).evidence,[]);
 await collect();assert.equal(await page.locator('#inventory-count').textContent(),'2/2');
 await page.reload();await tap('#start-btn');await tap('#enter-studio');assert.deepEqual((await state()).evidence,['portraits','palette']);assert.equal((await state()).modal,null);
 await tap('#deduce-toggle');await tap('[data-pick-suspect="parrot"]');assert.equal(await page.locator('[data-pick-clue="parrot-habit"]').count(),0);await tap('[data-pick-clue="palette"]');await tap('#confirm-accuse');assert.equal((await state()).solved,false);await tap('#overlay .close');
 await scene('skunk','suspect');await dialogue();
 await tap('#deduce-toggle');await tap('[data-pick-suspect="skunk"]');await tap('#accuse-without-evidence');assert.equal((await state()).dialogue.speaker,'skunk');await page.screenshot({path:'output/studio/skunk-dialogue.png'});await dialogue();
 assert.equal((await state()).modal,'failure');assert.equal((await state()).embarrassed,true);assert.equal((await state()).resources.stars,0);assert.deepEqual((await state()).evidence,[]);assert.deepEqual((await state()).statements,[]);await page.screenshot({path:'output/studio/skunk-failure.png'});
 // Failure has already reset saved evidence; reload cannot refund the penalty.
 await page.reload();assert.equal((await state()).resources.stars,0);assert.deepEqual((await state()).evidence,[]);assert.equal((await state()).embarrassed,false);await tap('#start-btn');await tap('#enter-studio');await tap('#intro-next');
 await collect();for(const id of ['missRabbit','skunk','parrot']){await scene(id,'suspect');await dialogue()}
 assert.equal(await page.locator('#deduce-count').textContent(),'5/5');
 await tap('#deduce-toggle');await tap('[data-pick-suspect="parrot"]');await tap('[data-pick-clue="portraits"]');await tap('[data-pick-clue="parrot-habit"]');await tap('#confirm-accuse');assert.equal((await state()).solved,false);
 await tap('[data-pick-clue="portraits"]');await tap('[data-pick-clue="palette"]');assert.deepEqual((await state()).selectedClues,['parrot-habit','palette']);await page.screenshot({path:'output/studio/combination.png'});await tap('#confirm-accuse');
 while((await state()).dialogue?.speaker!=='narrator')await tap('#dialogue-next');await page.evaluate(()=>advanceTime(1500));await page.screenshot({path:'output/studio/escort.png'});await page.evaluate(()=>advanceTime(7000));await page.screenshot({path:'output/studio/ending.png'});await dialogue();
 assert.equal((await state()).solved,true);assert.deepEqual((await state()).resources,{stars:3,hearts:1,coins:15});await page.screenshot({path:'output/studio/success.png'});
 await page.reload();assert.deepEqual((await state()).resources,{stars:3,hearts:1,coins:15});assert.ok((await state()).completed.includes('studio'));
 // Per-case saves and shared permanent tape survive a third-case visit.
 await tap('#start-btn');await tap('#enter-orchard');await tap('#intro-next');await tap('#inventory-toggle');await tap('#choose-tape');await tap('#buy-tape');assert.equal((await state()).tape.owned,true);
 await tap('#home');await tap('#start-btn');await tap('#enter-studio');await tap('#intro-next');assert.equal((await state()).tape.owned,true);assert.equal((await state()).resources.coins,15);await tap('#lang');assert.equal((await state()).language,'nl');await page.screenshot({path:'output/studio/dutch-scene.png'});
 // Cached offline reload includes new content, portraits and 3D scene.
 await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await tap('#start-btn');await tap('#enter-studio');await scene('palette');assert.equal((await state()).modal,'evidence');await close();await scene('parrot','suspect');assert.equal((await state()).dialogue.speaker,'parrot');await page.screenshot({path:'output/studio/offline-dialogue.png'});await context.setOffline(false);
 assert.deepEqual(errors,[]);console.log('PASS studio: no tools, observation, testimony gate, skunk reset, paired evidence, rewards once, shared tape, Dutch, offline');
 await fs.writeFile('output/studio/results.json',JSON.stringify({passed:true,errors},null,2));
}finally{await browser.close()}
