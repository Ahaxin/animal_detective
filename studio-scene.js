// Original low-poly cutaway studio. No remote assets or runtime requests.
export function buildStudio({box,ball,cyl,solid}){
 box(0,-.55,0,160,.5,160,'#b6d1dc');box(0,-.2,0,23,.4,21,'#769baa');
 box(0,.02,0,22,.1,20,'#d4e2e4');
 for(let x=-10;x<=10;x+=2)for(let z=-9;z<=9;z+=2)box(x,.08,z,1.96,.03,1.96,(x+z)%4===1?'#c3d9de':'#dce7e5');
 box(0,2,-10,23,4,.5,'#8db2c2');box(-11,.65,0,.35,1.3,20,'#b4cdd4');box(11,.65,0,.35,1.3,20,'#b4cdd4');
 for(const x of [-7,0,7]){
  box(x,2.5,-9.65,4,2.6,.2,'#eff4e9');box(x,2.5,-9.48,3.6,2.2,.1,'#79b4cb');
  box(x,2.5,-9.35,.1,2.2,.1,'#ecf1e6');box(x,2.5,-9.35,3.6,.1,.1,'#ecf1e6');
  for(let i=0;i<3;i++)ball(x-1+i,2.85,-9.24,.075,'#f7fbf1');
 }
 box(0,.13,.5,12,.05,9,'#7094a2');box(0,.16,.5,11.65,.025,8.65,'#8eafb6');
 // Three front-facing canvases: orange/white, red/yellow/blue, black/white/grey.
 for(const [i,x]of [-4,0,4].entries()){
  for(const side of [-1,1]){const leg=box(x+side*.8,1.4,-2.3,.13,2.8,.14,'#8c674c');leg.rotation.z=-side*.14;}
  box(x,1.3,-2.8,.14,2.6,.14,'#8c674c');box(x,1.8,-1.95,2.4,.16,.28,'#bc9568');
  box(x,3,-2.15,2.5,2.65,.16,'#987549');box(x,3,-2.04,2.25,2.4,.06,'#fff3d5');
  const portraitColor=i===0?'#ee8a35':i===1?'#db483d':'#63686b';
  ball(x,2.46,-1.96,.7,portraitColor,undefined,[1,.7,.055]);
  ball(x,3.2,-1.94,.6,i===0?'#fffef2':i===1?'#e54c3c':'#30393e',undefined,[.9,1,.07]);
  if(i===0){for(const side of [-1,1]){ball(x+side*.28,3.88,-1.92,.32,'#fffef2',undefined,[.45,1.6,.08]);ball(x+side*.28,3.9,-1.88,.18,'#e8b5a3',undefined,[.4,1.6,.08]);}}
  if(i===1){ball(x+.34,3.13,-1.86,.3,'#efc33f',undefined,[1,.6,.1]);for(const side of [-1,1])ball(x+side*.57,2.57,-1.89,.4,'#2876bb',undefined,[.45,1,.08]);}
  if(i===2){box(x,3.35,-1.86,.22,1,.045,'#f4f1df');for(let j=0;j<6;j++){const stroke=box(x-.8+j*.31,2.7+(j%3)*.3,-1.8,.09,1.4,.04,j%2?'#41494d':'#969c9b');stroke.rotation.z=-.8+j*.37;}}
  for(const side of [-1,1])ball(x+side*.21,3.27,-1.83,.065,'#293a41',undefined,[1,1,.2]);
  solid(x,-2.35,1.3);
 }
 // Sink, brass tap and a large unwashed palette lying on a low work table.
 box(7,1.1,1.1,2.8,2,1.7,'#9bbcc5');box(7,2.15,1.1,3,.16,1.9,'#e9eeea');box(7,2.25,1.1,2.3,.08,1.25,'#648b9c');
 cyl(7,2.55,.5,.07,.07,.7,'#c9aa6b');box(7,2.85,.72,.14,.12,.55,'#c9aa6b');solid(7,1.1,1.6);
 box(6.2,.65,3.65,2.8,.12,1.8,'#aa8460');for(const x of [5.1,7.3])for(const z of [3.05,4.25])box(x,.32,z,.1,.6,.1,'#765b47');
 const palette=cyl(6.2,.78,3.65,1,1,.1,'#edce91',undefined,24);palette.scale.z=.7;
 for(const [i,color]of ['#dd3e34','#f4cf35','#2379c2'].entries())cyl(5.55+i*.64,.85,3.65,.23,.23,.045,color);
 cyl(6.35,.85,4,.16,.16,.05,'#745944');const brush=box(5.4,.85,4.1,1.2,.07,.07,'#6f5345');brush.rotation.y=.2;
 solid(6.2,3.65,1.2);
 // The victim lies beside the easels: closed eyes, no blood or wounds.
 ball(-3.6,.48,1.7,.9,'#edf2e9',undefined,[1.5,.55,.85]);ball(-4.9,.52,1.7,.62,'#f6f7ec',undefined,[1,.7,1]);
 for(const z of [1.3,2.1]){ball(-5.15,.67,z,.19,'#edf2e9');ball(-2.6,.3,z,.25,'#edf2e9',undefined,[1.5,.7,1]);}
 ball(-5.25,.55,2.02,.2,'#e0e4db');ball(-5.4,.62,2.07,.09,'#36464c');
 for(const x of [-5.15,-4.75])box(x,.88,1.94,.17,.04,.04,'#4c6068');solid(-3.8,1.7,1.65);
 // Shelves, brushes, rolled canvases and an entry mat establish the studio.
 box(-8,1.5,-7,4,.15,1.2,'#b28e66');for(let i=0;i<5;i++)cyl(-9.5+i*.7,1.95,-7,.22,.22,.75,['#d6e2de','#799bab','#d1bc97'][i%3]);solid(-8,-7,1.6);
 for(const x of [-7,7]){cyl(x,.7,7,.7,.8,1.4,'#ac8864');for(let i=0;i<4;i++)cyl(x-.3+i*.2,1.7,7,.065,.065,1.8,'#f0dec1');solid(x,7,.9);}
 box(0,.1,9,4,.08,1.7,'#688797');
}
