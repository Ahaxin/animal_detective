import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true}),errors=[];await fs.mkdir('output/studio/layout',{recursive:true});
try{for(const [width,height]of [[1440,900],[960,600],[844,390],[720,1280],[1080,2400],[390,844],[375,812],[812,375],[375,635]]){
 const p=await browser.newPage({viewport:{width,height},hasTouch:true});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>localStorage.setItem('animal-detective-v1',JSON.stringify({version:1,caseId:'studio',lang:0,stars:2,hearts:0,coins:0,owned:['bird'],character:'bird',magnifier:false,started:true,clues:[],statements:[],solved:false,rewarded:false,player:{x:.4,y:.86},introSeen:true})));
 await p.goto('http://127.0.0.1:5173');await p.click('#start-btn');await p.click('#enter-studio');
 for(const lang of ['zh','nl']){
  if(lang==='nl')await p.click('#lang');await p.waitForTimeout(120);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth&&document.documentElement.scrollHeight===innerHeight),true);
  const hits=await p.evaluate(()=>[...document.querySelectorAll('.hotspot,#game-toolbar button')].filter(e=>{const r=e.getBoundingClientRect();return r.width<44||r.height<44||!e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}).map(e=>e.dataset.sceneSuspect||e.id));assert.deepEqual(hits,[],`${width}x${height} ${lang}`);
  await p.screenshot({path:`output/studio/layout/${width}x${height}-${lang}.png`});
  const st=JSON.parse(await p.evaluate(()=>render_game_to_text())),c=st.clueLocations.find(c=>c.id==='portraits');await p.touchscreen.tap(c.x*width,c.y*height);await p.evaluate(()=>advanceTime(12000));assert.equal(JSON.parse(await p.evaluate(()=>render_game_to_text())).modal,'evidence');
  const imgs=await p.locator('.portrait-comparison img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0));assert.equal(imgs,true);await p.screenshot({path:`output/studio/layout/${width}x${height}-${lang}-portraits.png`});await p.click('#overlay .primary[data-close]');
 }
 await p.close();
}assert.deepEqual(errors,[]);console.log('PASS studio nine viewports, both locales, 44px controls, real portrait picking and image load');}finally{await browser.close()}
