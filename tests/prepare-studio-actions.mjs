// Resolve actual startup control positions for the skill-provided action client.
import fs from 'node:fs/promises';
import {chromium} from './playwright-runtime.mjs';
const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage({viewport:{width:1280,height:720}});await page.goto('http://127.0.0.1:5173');await page.click('#start-btn');const steps=[];for(const selector of ['#enter-case','#intro-next','#claim-tool']){const r=await page.locator(selector).boundingBox();steps.push({buttons:['left_mouse_button'],frames:2,mouse_x:r.x+r.width/2,mouse_y:r.y+r.height/2},{buttons:[],frames:4});await page.click(selector)}steps.push({buttons:['right'],frames:6},{buttons:[],frames:10});await fs.writeFile('tests/studio-actions.json',JSON.stringify({steps},null,2));}finally{await browser.close()}
