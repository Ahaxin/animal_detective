import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
await fs.mkdir('output/single-screen/layout',{recursive:true});
const profiles=[['desktop',1440,900],['small-desktop',960,600],['landscape',844,390],['portrait-720',720,1280],['portrait-1080',1080,2400],['phone',390,844],['iphone-x',375,812],['iphone-x-landscape',812,375],['iphone-x-browser',375,635]];
const results=[];
const saved={version:1,lang:0,stars:5,hearts:2,coins:23,owned:['bird','fox'],character:'fox',magnifier:true,started:true,clues:['hole'],statements:['owl'],solved:false,rewarded:false,player:{x:.4,y:.86},introSeen:true};
try{
 for(const [name,width,height] of profiles){
  const page=await browser.newPage({viewport:{width,height},hasTouch:width<740||height<500});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.addInitScript(s=>localStorage.setItem('animal-detective-v1',JSON.stringify(s)),saved);
  await page.goto('http://127.0.0.1:5173');await page.waitForTimeout(300);
  const check=async()=>{assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth&&document.documentElement.scrollHeight===innerHeight),true,name+' no scroll');const box=await page.locator('#game-stage').boundingBox();assert.equal(Math.round(box.width),width);assert.equal(Math.round(box.height),height)};
  await check();await page.screenshot({path:`output/single-screen/layout/${name}-title.png`});
  for(const s of ['#start-btn','#enter-case']){await page.locator(s).click();await page.waitForTimeout(50)}
  await check();let state=JSON.parse(await page.evaluate(()=>window.render_game_to_text()));assert.equal(state.resources.coins,23);assert.equal(state.character,'fox');assert.deepEqual(state.evidence,['hole']);assert.deepEqual(state.statements,['owl']);
  const inspectHits=()=>page.evaluate(()=>Array.from(document.querySelectorAll('#game-toolbar button,.hotspot')).filter(el=>{const r=el.getBoundingClientRect();return r.width<44||r.height<44||[[.5,.5],[.3,.3],[.7,.3],[.3,.7],[.7,.7]].some(([x,y])=>{const hit=document.elementFromPoint(r.x+r.width*x,r.y+r.height*y);return !(hit===el||el.contains(hit))})}).map(el=>el.id||el.dataset.sceneClue||el.dataset.sceneSuspect));
  const hitIssues=await inspectHits();
  assert.deepEqual(hitIssues,[],name+' unobstructed >=44px interaction targets');
  await page.screenshot({path:`output/single-screen/layout/${name}-garden.png`});
  await page.locator('#journal-toggle').click();await check();await page.screenshot({path:`output/single-screen/layout/${name}-journal.png`});await page.locator('#notebook-close').click();
  await page.locator('#inventory-toggle').click();assert.equal(await page.locator('[data-bag-clue="hole"]').isEnabled(),true);await page.locator('[data-bag-clue="hole"]').click();assert.equal(await page.locator('.modal h2').textContent(),'新翻的泥土洞');await page.locator('#overlay .primary[data-close]').click();
  await page.locator('#lang').click();await check();assert.deepEqual(await inspectHits(),[],name+' Dutch unobstructed targets');await page.screenshot({path:`output/single-screen/layout/${name}-dutch.png`});
  assert.deepEqual(errors,[]);results.push({name,width,height,oldSavePreserved:true,unobstructedTargets:true,noPageScroll:true,locales:['zh','nl'],errors});await page.close();
 }
 await fs.writeFile('output/single-screen/layout-results.json',JSON.stringify({passed:true,profiles:results,physicalDeviceTested:false},null,2));console.log('PASS: nine screen profiles, existing save, notebook/backpack, 44px hit targets, Chinese/Dutch, zero page scrolling.');
}finally{await browser.close()}
