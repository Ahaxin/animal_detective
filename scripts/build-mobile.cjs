const fs=require('node:fs/promises');
const path=require('node:path');
const sharp=require('sharp');
(async()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'publish','animal-detective','dist');
 await fs.mkdir(path.join(out,'assets'),{recursive:true});
 const names=['garden','garden-portrait','bird','fox','squirrel','mole','owl'];
 let original=0,optimized=0;
 for(const name of names){const source=path.join(root,'assets',name+'.png'),target=path.join(root,'assets',name+'.webp');await sharp(source).webp({quality:name.startsWith('garden')?88:91,alphaQuality:100}).toFile(target);original+=(await fs.stat(source)).size;optimized+=(await fs.stat(target)).size;await fs.copyFile(target,path.join(out,'assets',name+'.webp'));}
 for(const size of [192,512]){const file=`icon-${size}.png`;await sharp(path.join(root,'assets','favicon.svg')).resize(size,size).png().toFile(path.join(root,'assets',file));await fs.copyFile(path.join(root,'assets',file),path.join(out,'assets',file));}
 for(const file of ['index.html','game.js','world3d.bundle.js','game-screen.css','mobile.js','manifest.webmanifest','sw.js'])await fs.copyFile(path.join(root,file),path.join(out,file));
 await fs.copyFile(path.join(root,'assets','favicon.svg'),path.join(out,'assets','favicon.svg'));
 console.log(JSON.stringify({output:out,originalImageBytes:original,optimizedImageBytes:optimized,reductionPercent:Math.round((1-optimized/original)*100),runtimeFiles:16}));
})();
