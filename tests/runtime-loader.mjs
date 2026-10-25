import {pathToFileURL} from 'node:url';
export async function resolve(specifier,context,nextResolve){
 if(specifier==='playwright')return {url:new URL('./playwright-runtime.mjs',import.meta.url).href,shortCircuit:true};
 return nextResolve(specifier,context);
}
