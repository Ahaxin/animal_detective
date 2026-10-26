import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// Procedural miniature garden. All meshes are original; Three.js is bundled locally.
window.createGarden3D=function(canvas,caseId='garden'){
 const orchard=caseId==='orchard',npcIds=orchard?['bear','raccoon','monkey']:['squirrel','owl','mole'],clueIds=orchard?['footprint','branch','paint']:['acorn','feather','hole'];
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.setClearColor('#c8d9cf');
 const scene=new T.Scene();scene.fog=new T.Fog('#c8d9cf',38,80);const camera=new T.PerspectiveCamera(42,1,.1,100);const look=new T.Vector3(0,0,0);
 scene.add(new T.HemisphereLight('#fff2d4','#69846d',2.4));const sun=new T.DirectionalLight('#ffe6bb',3);sun.position.set(-9,19,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-18,right:18,top:18,bottom:-18,far:55});sun.shadow.normalBias=.04;scene.add(sun);
 const materials=new Map();function mat(c){if(!materials.has(c))materials.set(c,new T.MeshStandardMaterial({color:c,roughness:.88,flatShading:true}));return materials.get(c)}
 function mesh(g,c,x,y,z,parent=scene){const m=new T.Mesh(g,mat(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 const box=(x,y,z,w,h,d,c,p)=>mesh(new T.BoxGeometry(w,h,d),c,x,y,z,p);
 const ball=(x,y,z,r,c,p,s=[1,1,1])=>{const m=mesh(new T.IcosahedronGeometry(r,1),c,x,y,z,p);m.scale.set(...s);return m};
 const cyl=(x,y,z,rt,rb,h,c,p,n=12)=>mesh(new T.CylinderGeometry(rt,rb,h,n),c,x,y,z,p);
 const obstacles=[];function solid(x,z,r){obstacles.push({x,z,r})}
 let gem;const tapeGroup=new T.Group();scene.add(tapeGroup);let solvedSince=null;
 if(!orchard){
 box(0,-.55,0,160,.5,160,'#849b70');box(0,-.45,0,26,.8,24,'#9aa779');box(0,-.05,0,24,.15,22,'#7e9b69');
 box(0,.035,0,4.2,.08,22,'#d8c5a0');box(0,.04,0,24,.08,3.5,'#d8c5a0');cyl(0,.07,0,4.7,4.7,.1,'#deceb0',scene,48);
 // Inlaid paving stones and low clipped garden walls.
 for(let z=-10;z<=10;z+=1.1)for(let x=-1.55;x<=1.6;x+=1.05)box(x,.09,z,.96,.025,1,'#e5d6b8');
 for(let x=-11;x<=11;x+=1.1)for(const z of [-10.8,10.8]){if(z>0&&Math.abs(x)<2.5)continue;box(x,.5,z,1.1,1,1,'#45684c');ball(x,1,z,.62,'#648357')}
 for(let z=-10;z<=10;z+=1.1)for(const x of [-11.5,11.5]){box(x,.45,z,1,.9,1.1,'#45684c');ball(x,.95,z,.6,'#648357')}
 function tree(x,z,size=1){cyl(x,1.6,z,.22,.36,3.2,'#74543c');for(let i=0;i<4;i++)ball(x+Math.sin(i*2)*.7,3.6+i*.3,z+Math.cos(i*2)*.7,1.35*size,['#6f8d55','#819d61','#54774c','#9aab6a'][i]);solid(x,z,.6)}
 for(const [x,z,s] of [[-8,-7,1.3],[8,-8,1.5],[-9,4,1],[9,6,1],[-5,-9,1],[5,-10,1]])tree(x,z,s);
 function bed(x,z,c){box(x,.22,z,2.7,.4,1.8,'#b0a588');box(x,.46,z,2.5,.08,1.6,'#574b38');solid(x,z,1.65);for(let i=0;i<12;i++){const px=x+((i*7)%11)/5-1,pz=z+((i*3)%7)/5-.6;cyl(px,.7,pz,.035,.035,.5,'#486449');ball(px,.94,pz,.16,c)}}
 bed(-6,0,'#d39398');bed(7,-2,'#d58283');bed(-5,6,'#e4bd63');bed(6,7,'#c6a2bb');
 // Exhibit, velvet cushion, tunnel, and a recovered sapphire.
 cyl(0,.23,0,1.5,1.65,.4,'#b6aa8c');cyl(0,1.1,0,.8,1,1.6,'#e3d7b8');cyl(0,1.95,0,1.3,1.3,.22,'#f1e4c7');box(0,2.1,0,1.8,.12,1.8,'#547391');solid(0,0,1.8);
 gem=mesh(new T.OctahedronGeometry(.48),'#54b9df',0,2.6,0);gem.visible=false;
 const tunnel=cyl(0,.13,2, .65,.65,.08,'#342b26',scene,16);tunnel.scale.z=.65;for(let i=0;i<8;i++)ball(Math.sin(i)*.7,.17,2+Math.cos(i)*.45,.19,'#90704c');
 // Benches and iron lamps frame the investigation area.
 for(const x of [-6,6]){box(x,.75,-6,2.8,.18,.85,'#8f6343');box(x,1.25,-6.35,2.8,.65,.12,'#9f7955');for(const a of [-1,1])box(x+a,.35,-6,.12,.7,.65,'#3f5148');solid(x,-6,1.6)}
 for(const x of [-3,3])for(const z of [-8,8]){cyl(x,1.5,z,.07,.13,3,'#3b514a');box(x,3.05,z,.45,.6,.45,'#e9c984');cyl(x,3.45,z,0,.42,.28,'#43594f');solid(x,z,.28)}

 }else{
 box(0,-.55,0,160,.5,160,'#a3a66c');box(0,-.1,0,24,.2,22,'#8a995c');box(0,.035,0,4,.08,22,'#c7aa76');box(4,.04,0,16,.08,2.5,'#c7aa76');
 // Split-rail orchard fence and an open east entrance.
 for(let z=-10;z<=10;z+=2)for(const x of [-11.5,11.5]){if(x>0&&Math.abs(z)<2)continue;box(x,.65,z,.16,1.3,.16,'#8c6644');box(x,.75,z,.12,.12,1.9,'#c4a071');box(x,1.1,z,.12,.12,1.9,'#c4a071')}
 for(let x=-10;x<=10;x+=2)for(const z of [-10.5,10.5]){if(z>0&&Math.abs(x)<2)continue;box(x,.65,z,.16,1.3,.16,'#8c6644');box(x,.85,z,2,.14,.12,'#c4a071')}
 function appleTree(x,z,scale=1){cyl(x,1.35,z,.18,.32,2.7,'#795534');for(let i=0;i<3;i++)ball(x+Math.sin(i*2.3)*.65,3+i*.32,z+Math.cos(i*2.3)*.65,1.3*scale,['#71864a','#90a057','#a7ae65'][i]);for(let i=0;i<6;i++){const a=i*2.4;ball(x+Math.cos(a)*1.05,2.85+(i%3)*.4,z+Math.sin(a)*1.05,.18,['#c95737','#dd7542','#c99039'][i%3])}solid(x,z,.65)}
 for(const [x,z] of [[-7,-7],[7,-7],[-7,6],[7,6],[-3,-9],[3,-9]])appleTree(x,z);
 // The crime tree: bare climbing trunk, high broken branch and hanging peel.
 cyl(0,2.3,0,.3,.65,4.6,'#785237');solid(0,0,1);ball(-.8,4.6,-.9,1.5,'#8b9d50');ball(.7,5,-1.1,1.45,'#a6ad57');ball(0,5.5,-1.5,1.2,'#bac06c');
 const broken=box(.9,4.15,.6,2,.19,.2,'#846044');broken.rotation.z=.2;ball(1.8,4.35,.6,.15,'#e1bd83');
 const peel=mesh(new T.TorusGeometry(.3,.075,6,14,Math.PI*1.4),'#f5cf49',1.6,4.3,.65);peel.rotation.z=-.6;const peel2=mesh(new T.TorusGeometry(.22,.065,6,12,Math.PI),'#efbb32',1.7,4.1,.7);peel2.rotation.z=1;
 gem=ball(0,5.9,-.4,.4,'#efc34d');gem.visible=false;
 const stalk=cyl(0,.48,0,.035,.035,.22,'#755138',gem);stalk.position.set(0,.43,0);
 // Mud and barefoot toes with a red heel; no overlay marker.
 const mud=cyl(-1.4,.05,2.4,1.05,1.05,.08,'#8c694a');mud.scale.z=.8;
 for(let i=0;i<3;i++){const x=-1.7+i*.35,z=2.8-i*.5;const foot=ball(x,.12,z,.32,'#513f2e',scene,[.55,.12,1]);for(let j=0;j<4;j++)ball(x-.17+j*.1,.13,z-.29,.065,'#513f2e',scene,[1,.3,1]);ball(x,.14,z+.2,.12,'#bc4937',scene,[1,.12,1])}
 // East gate and spilled red paint with a trail into the orchard.
 const bucket=cyl(8,.4,0,.42,.36,.75,'#9caca6');bucket.rotation.z=1.2;cyl(8.5,.085,.2,.8,.8,.04,'#bc4937');for(let i=0;i<7;i++)ball(7.4-i*.7,.1,.25+i*.2,.13,'#aa4b35',scene,[1,.2,1.4]);
 box(11,1.8,-1.8,.2,3.6,.2,'#9c7444');box(11,1.8,1.8,.2,3.6,.2,'#9c7444');box(11,3.5,0,.3,.25,3.9,'#b18c52');
 // Stream where the raccoon washes a marshmallow, and harvest crates.
 box(-9.5,.01,-1.5,2,.1,7,'#78a9ac');for(let i=0;i<9;i++)ball(-8.45,.16,-4.5+i*.75,.25,'#a9a58c');solid(-9.5,-1.5,1.8);
 for(const [x,z] of [[5,8],[-5,8]]){box(x,.35,z,1.8,.6,1.2,'#a17a44');for(let i=0;i<5;i++)ball(x-.6+i*.3,.73,z,.22,'#d37739')}
 box(0,0,0,1.2,.045,.12,'#f2ddb1',tapeGroup);for(let i=0;i<12;i++)box(-.55+i*.1,.03,0,.015,.015,.1,'#725b36',tapeGroup);tapeGroup.visible=false;
 }
 // Procedural animal figures, with articulated feet, faces, detective coat and hat.
 function animal(id){const g=new T.Group();scene.add(g);const bird=id==='bird',fox=id==='fox',owl=id==='owl',mole=id==='mole',bear=id==='bear',raccoon=id==='raccoon',monkey=id==='monkey';const fur=bear?'#95603d':raccoon?'#92918b':monkey?'#a87849':bird?'#b5c9b2':fox?'#c38149':owl?'#8a7864':mole?'#6a6870':'#b77c4a';
 ball(0,.85,0,.61,bird||fox?'#c5a77c':fur,g,[.82,1.15,.72]);ball(0,1.64,.02,.5,fur,g);ball(0,1.5,.38,.28,'#e9d7b7',g,[1,.7,.65]);
 for(const x of [-.19,.19]){ball(x,1.73,.43,.13,'#f7e9c8',g);ball(x,1.74,.535,.055,'#293d37',g);if(!bird&&!mole&&!bear&&!monkey){const ear=mesh(new T.ConeGeometry(.18,.4,4),fur,x*1.6,2.09,0,g);ear.rotation.z=x<0?.2:-.2}}
 if(bird||owl){const beak=mesh(new T.ConeGeometry(.12,.33,4),'#c79643',0,1.53,.63,g);beak.rotation.x=Math.PI/2}else ball(0,1.53,.58,.09,'#3c3934',g);
 if(mole)for(const x of [-.2,.2])ball(x,1.75,.51,.17,'#283e40',g,[1,.75,.4]);
 const feet=[];for(const x of [-.25,.25]){const leg=new T.Group();leg.position.set(x,.42,0);g.add(leg);box(0,-.15,.09,.23,.32,.44,bird?'#bc8d45':'#4b443c',leg);feet.push(leg);ball(x*2,.93,0,.22,fur,g,[.6,1.4,.7])}
 if(bird||fox){cyl(0,2.05,0,.65,.65,.09,'#6f654b',g);cyl(0,2.22,0,.36,.44,.3,'#a28c65',g);cyl(0,2.12,0,.435,.435,.07,'#4e5c47',g);box(0,1.15,.43,.09,.5,.07,'#54624e',g);const ring=mesh(new T.TorusGeometry(.2,.035,6,16),'#d6b568',.65,.95,.25,g);box(.65,.66,.25,.06,.3,.06,'#594c39',g)}
 if(bear||monkey)for(const x of [-.47,.47]){ball(x,1.78,0,.23,fur,g);ball(x,1.78,.18,.13,'#d4ab79',g)}
 if(bear){g.scale.set(1.25,1.12,1.2);cyl(0,.9,.65,.29,.26,.45,'#d4a54b',g);cyl(0,1.15,.65,.31,.31,.08,'#b98232',g)}
 if(raccoon){for(const x of [-.2,.2]){ball(x,1.73,.44,.18,'#414849',g,[1,.7,.35]);ball(x,1.74,.52,.05,'#f1e7c9',g)}const tail=ball(.1,.6,-.55,.3,'#686f6b',g,[.8,1,2.2]);for(let i=0;i<3;i++)cyl(.1,.6,-.6-i*.17,.25,.25,.09,'#323e3b',g);box(.55,1.1,.3,.27,.27,.27,'#f4e6c8',g)}
 if(monkey){const tail=mesh(new T.TorusGeometry(.5,.08,6,16,Math.PI*1.6),fur,0,.75,-.5,g);tail.rotation.y=.4;const soles=[];for(const x of [-.25,.25])soles.push(box(x,.22,.3,.25,.12,.12,'#c34c38',g));g.userData.soles=soles;for(const sole of soles)sole.visible=false}
 if(id==='squirrel'||fox){const tail=ball(.1,.8,-.48,.4,fur,g,[.8,1.8,1]);tail.rotation.x=-.4}return {g,feet};}
 const actors={};for(const id of ['bird','fox',...npcIds])actors[id]=animal(id);
 const points=orchard?{footprint:{x:-1.4,z:2.4,y:.14},branch:{x:1.6,z:.65,y:4.3},paint:{x:8,z:0,y:.4},bear:{x:-4.5,z:3.8},raccoon:{x:-7,z:-2},monkey:{x:5,z:-3.8}}:{acorn:{x:4,z:2.9},feather:{x:7,z:-.6},hole:{x:0,z:2},squirrel:{x:5.5,z:4},owl:{x:-7,z:-4},mole:{x:4,z:-3.8}};
 for(const id of npcIds){actors[id].g.position.set(points[id].x,0,points[id].z);actors[id].g.rotation.y=-.3;solid(points[id].x,points[id].z,.65)}
 if(!orchard){cyl(4,.2,2.9,.18,.12,.3,'#9b683a');ball(4,.38,2.9,.2,'#705438');const feather=ball(7,.2,-.6,.3,'#dad7c9',scene,[.35,.15,1.5]);feather.rotation.y=.5;}
 const marker=mesh(new T.TorusGeometry(.28,.035,6,24),'#fff1b2',0,.14,0);marker.rotation.x=Math.PI/2;marker.visible=false;
 // Batch static meshes by material to keep mobile draw calls low.
 scene.updateMatrixWorld(true);const batches=new Map();for(const child of [...scene.children]){if(!child.isMesh||child===gem||child===marker)continue;const g=child.geometry.clone().applyMatrix4(child.matrixWorld);const list=batches.get(child.material)||[];list.push(g);batches.set(child.material,list);scene.remove(child)}for(const [material,geometries] of batches){const merged=mergeGeometries(geometries.map(g=>g.index?g.toNonIndexed():g));const m=new T.Mesh(merged,material);m.castShadow=true;m.receiveShadow=true;scene.add(m)}
 const ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),0);let width=1,height=1,lastPos=null,facing=0;
 const world=p=>({x:(p.x-.5)*24,z:(p.y-.5)*24});const norm=p=>({x:p.x/24+.5,y:p.z/24+.5});
 function blocked(x,z){return Math.abs(x)>10.5||Math.abs(z)>10||obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.r+.3)}
 function move(p,dx,dz){const w=world(p);if(!blocked(w.x+dx,w.z))w.x+=dx;if(!blocked(w.x,w.z+dz))w.z+=dz;return norm(w)}
 // Grid pathfinding avoids exhibits, beds, trees and benches; no walking through props.
 function route(from,to){const a=world(from),b=world(to),grid=.5,key=(x,z)=>x+','+z,start=[Math.round(a.x/grid),Math.round(a.z/grid)],end=[Math.round(b.x/grid),Math.round(b.z/grid)],queue=[start],seen=new Map([[key(...start),null]]);let final=null;
 for(let i=0;i<queue.length&&i<2400;i++){const p=queue[i];if(Math.hypot(p[0]-end[0],p[1]-end[1])<=1){final=p;break}for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const n=[p[0]+d[0],p[1]+d[1]],k=key(...n);if(seen.has(k)||blocked(n[0]*grid,n[1]*grid))continue;seen.set(k,p);queue.push(n)}}
 if(!final)return [];const out=[];while(final&&key(...final)!==key(...start)){out.unshift(norm({x:final[0]*grid,z:final[1]*grid}));final=seen.get(key(...final))}return out;}
 function project(id){const p=points[id]||{x:0,z:0};const v=new T.Vector3(p.x,npcIds.includes(id)?2.6:points[id]?.y??(id==='hole'?.16:.3),p.z).project(camera);return {x:(v.x+1)/2,y:(1-v.y)/2}}
 // Invisible pick volumes cover only the actual evidence objects, not garden regions.
 const pickables=clueIds.map(id=>{const p=points[id],m=new T.Mesh(new T.SphereGeometry(['hole','footprint','branch','paint'].includes(id)?.7:.45,8,6),new T.MeshBasicMaterial());m.position.set(p.x,p.y??(id==='hole'?.16:.3),p.z);m.updateMatrixWorld();m.userData={type:'clue',id};return m});
 function pick(x,y){ray.setFromCamera(new T.Vector2(x*2-1,1-y*2),camera);const hits=ray.intersectObjects([...pickables,...npcIds.map(id=>actors[id].g)],true);if(!hits.length)return null;let o=hits[0].object;while(o){if(o.userData.type)return o.userData;for(const id of npcIds)if(o===actors[id].g)return {type:'suspect',id};o=o.parent}return null}
 function resize(w,h){width=w;height=h;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.set(0,w<h?37:24,w<h?22:27);camera.fov=w<h?47:37;camera.lookAt(look);camera.updateProjectionMatrix();camera.updateMatrixWorld()}
 function render(state,time,target){const p=world(state.player);for(const id of ['bird','fox'])actors[id].g.visible=id===state.character;const a=actors[state.character==='fox'?'fox':'bird'];const speed=lastPos?Math.hypot(p.x-lastPos.x,p.z-lastPos.z):0;if(speed>.0001)facing=Math.atan2(p.x-lastPos.x,p.z-lastPos.z);a.g.position.set(p.x,0,p.z);a.g.rotation.y=facing;a.feet.forEach((f,i)=>f.rotation.x=speed>.0001?Math.sin(time*13+i*Math.PI)*.55:0);lastPos=p;if(!orchard)actors.mole.g.visible=!state.solved;gem.visible=state.solved;gem.rotation.y=time*.5;if(orchard){for(const sole of actors.monkey.g.userData.soles)sole.visible=state.solved;tapeGroup.visible=state.solved;if(state.solved){if(solvedSince===null)solvedSince=time;const progress=Math.min(1,(time-solvedSince)/2);gem.position.set(T.MathUtils.lerp(points.monkey.x,p.x+.75,progress),1.2+Math.sin(progress*Math.PI)*.6,T.MathUtils.lerp(points.monkey.z,p.z,progress));tapeGroup.position.set(p.x+.7,1.15,p.z);tapeGroup.scale.x=.7+.3*Math.sin(time*2)}else solvedSince=null}marker.visible=!!target;if(target){const q=world(target);marker.position.set(q.x,.14,q.z)}renderer.render(scene,camera)}
 return {dispose:()=>{scene.traverse(o=>{o.geometry?.dispose()});for(const m of materials.values())m.dispose();for(const p of pickables){p.geometry.dispose();p.material.dispose()}renderer.dispose()},pick,render,resize,project,move,route,world,blocked,obstacles,points,destination:id=>norm(id==='branch'?{x:1.8,z:2.1}:{x:points[id].x,z:points[id].z+1}),ground:(x,y)=>{ray.setFromCamera(new T.Vector2(x*2-1,1-y*2),camera);const hit=new T.Vector3();return ray.ray.intersectPlane(plane,hit)&&!blocked(hit.x,hit.z)?norm(hit):null},stats:()=>({drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles})};
};
