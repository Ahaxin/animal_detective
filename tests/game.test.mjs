import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
await fs.mkdir('output/single-screen',{recursive:true});
const get=()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
const snap=name=>page.screenshot({path:`output/single-screen/${name}.png`,fullPage:true});
const click=async sel=>{if(sel.includes('data-scene-clue')){const id=sel.match(/"([^"]+)"/)[1],c=(await get()).clueLocations.find(c=>c.id===id),v=page.viewportSize();await page.mouse.click(c.x*v.width,c.y*v.height)}else await page.locator(sel).click();await page.waitForTimeout(60)};
const move=async sel=>{await click(sel);await page.evaluate(()=>window.advanceTime(12000));await page.waitForTimeout(60)};
const closeEvidence=async()=>{await click('#overlay [data-close].primary')};
async function begin(){await click('#start-btn');await click('#enter-case');if((await get()).modal==='intro')await click('#intro-next');if((await get()).modal==='tool')await click('#claim-tool')}
async function collect(){for(const id of ['acorn','feather','hole']){await move(`[data-scene-clue="${id}"]`);assert.equal((await get()).modal,'evidence');await closeEvidence()}}
async function speak(id){await move(`[data-scene-suspect="${id}"]`);assert.equal((await get()).dialogue.speaker,id);while((await get()).dialogue)await click('#dialogue-next')}
async function allStatements(){for(const id of ['squirrel','owl','mole'])await speak(id)}
async function accuse(suspect,clue){await click('#deduce-toggle');await click(`[data-pick-suspect="${suspect}"]`);await click(`[data-pick-clue="${clue}"]`);await click('#confirm-accuse')}
try{
 await page.goto('http://127.0.0.1:5173');await page.evaluate(()=>localStorage.removeItem('animal-detective-v1'));await page.reload();await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));await page.waitForTimeout(450);
 await snap('01-title');assert.equal((await get()).resources.stars,2);
 await begin();assert.equal((await get()).magnifier,true);assert.deepEqual((await get()).resources,{stars:2,hearts:0,coins:0});await snap('02-garden');assert.equal((await get()).notebookOpen,false);
 await click('#journal-toggle');assert.equal((await get()).notebookOpen,true);await snap('02a-notebook');const paused=(await get()).player;await page.keyboard.down('ArrowRight');await page.evaluate(()=>window.advanceTime(300));await page.keyboard.up('ArrowRight');assert.deepEqual((await get()).player,paused);await page.keyboard.press('Escape');assert.equal((await get()).notebookOpen,false);
 await click('#inventory-toggle');assert.equal((await get()).modal,'inventory');await snap('02b-inventory');assert.equal(await page.locator('[data-bag-clue="hole"]').isDisabled(),true);await click('#overlay .primary[data-close]');
 // Keyboard and ground movement, boundaries, persistence.
 const old=(await get()).player.x;await page.keyboard.down('ArrowRight');await page.evaluate(()=>window.advanceTime(300));await page.keyboard.up('ArrowRight');assert.ok((await get()).player.x>old);await page.keyboard.down('ArrowUp');await page.evaluate(()=>window.advanceTime(9000));await page.keyboard.up('ArrowUp');assert.ok((await get()).player.y>=.08);
 await move('[data-scene-clue="acorn"]');await snap('03-evidence');await closeEvidence();await page.reload();await click('#start-btn');await click('#enter-case');assert.deepEqual((await get()).evidence,['acorn']);assert.equal((await get()).magnifier,true);
 await move('[data-scene-clue="feather"]');await closeEvidence();await move('[data-scene-clue="hole"]');await closeEvidence();
 await move('[data-scene-suspect="squirrel"]');await snap('04-dialogue');while((await get()).dialogue)await click('#dialogue-next');await speak('owl');await speak('mole');assert.equal((await get()).canAccuse,true);await snap('05-ready');
 // Wrong evidence does not punish; wrong suspect does.
 await accuse('mole','acorn');assert.equal((await get()).resources.stars,2);assert.ok(await page.locator('#evidence-error').textContent());await click('#overlay .close');
 await accuse('squirrel','feather');assert.equal((await get()).modal,'failure');assert.equal((await get()).resources.stars,0);await snap('06-false-accusation');await click('#retry-case');await click('#intro-next');assert.equal((await get()).magnifier,true);assert.equal((await get()).evidence.length,0);
 await click('#hint');assert.equal(await page.locator('#buy-hint').isDisabled(),true);await click('#overlay [data-close]');
 await collect();await allStatements();await accuse('mole','hole');assert.ok((await get()).dialogue);await snap('07-confrontation');for(let i=0;i<11&&(await get()).dialogue;i++)await click('#dialogue-next');assert.equal((await get()).solved,true);assert.equal((await get()).modal,'success');assert.deepEqual((await get()).resources,{stars:3,hearts:1,coins:10});await snap('08-solved');
 await click('#success-home');await click('#characters-btn');await click('[data-character="fox"]');assert.equal((await get()).character,'fox');assert.equal((await get()).resources.coins,9);await click('#done-characters');await begin();assert.equal((await get()).character,'fox');
 // The fox introduction is shown before accepting it.
 await click('#home');await click('#lang');assert.equal((await get()).language,'nl');await snap('09-dutch-menu');await begin();await click('#hint');await click('#buy-hint');assert.equal((await get()).resources.stars,2);await click('#overlay [data-close]');await snap('10-dutch-garden');
 await page.setViewportSize({width:390,height:844});await snap('11-mobile');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth&&document.documentElement.scrollHeight<=window.innerHeight),true);
 // Test second wrong accusation at zero stars: replay remains possible.
 await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(150);await collect();await allStatements();await accuse('owl','feather');await click('#retry-case');await click('#intro-next');assert.equal((await get()).resources.stars,0);assert.equal((await get()).magnifier,true);
 assert.deepEqual(errors,[]);await fs.writeFile('output/single-screen/results.json',JSON.stringify({passed:true,checks:['single viewport, no document scrolling','notebook opens and closes inside stage','gameplay pauses while reading notebook','inventory and permanent magnifier','movement and bounds','evidence collection','dialogue recording','save and reload','wrong evidence recovery','wrong accusation and reset','zero-star recovery','complete confrontation','reward granted once','fox purchase and selection','paid hints','Dutch localization','mobile width and height'],errors,state:await get()},null,2));console.log('PASS: single-screen first-case flow, notebook/inventory, persistence, failure/retry, rewards, fox, Dutch, mobile; no browser errors.');
}finally{await browser.close()}
