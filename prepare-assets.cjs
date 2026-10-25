// One-time crop of the generated transparent strip; never edits source artwork.
const sharp=require('sharp');
(async()=>{
 const boxes=[['bird',20,505],['fox',510,1025],['squirrel',1120,1685],['mole',1700,2145]];
 for(const [id,left,right] of boxes){const crop=await sharp('assets/characters-sheet.png').extract({left,top:0,width:right-left,height:724}).png().toBuffer();await sharp(crop).trim({threshold:15}).resize({height:700}).png().toFile(`assets/${id}.png`);}
 await sharp('assets/owl-source.png').trim({threshold:15}).resize({height:700}).png().toFile('assets/owl.png');
 await sharp('assets/garden.png').webp({quality:92}).toFile('assets/garden.webp');
 console.log('Prepared garden and five transparent character assets.');
})();
