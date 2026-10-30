'use strict';
NA.clone = x => JSON.parse(JSON.stringify(x));
NA.defaults = () => ({version:1,cap:3,openingRestriction:true,cards:Object.fromEntries(NA.cards.map(c=>[c.id,{hp:c.hp,attacks:c.attacks.map((a,i)=>({damage:a[1],cost:i+1}))}]))});
NA.validate = r => {
 const errors=[]; const positive=x=>Number.isSafeInteger(x)&&x>0;
 if(!r||!positive(r.cap)) errors.push('Energy cap must be a positive integer.');
 if(typeof r?.openingRestriction!=='boolean') errors.push('Choose an opening-turn rule.');
 for(const c of NA.cards){const v=r?.cards?.[c.id];
  if(!positive(v?.hp)) errors.push(`${c.name}: health must be a positive integer.`);
  c.attacks.forEach((a,i)=>{const t=v?.attacks?.[i];if(!positive(t?.damage)) errors.push(`${c.name}, ${a[0]}: damage must be a positive integer.`);if(!positive(t?.cost)||t.cost>r?.cap) errors.push(`${c.name}, ${a[0]}: cost must be from 1 to the energy cap.`);});
 }
 return errors;
};
NA.rulesId = r => {let h=2166136261;for(const ch of JSON.stringify(r)) h=Math.imul(h^ch.charCodeAt(0),16777619);return 'v1-'+(h>>>0).toString(16);};
NA.loadRules=()=>{try{const r=JSON.parse(localStorage.getItem('ninja-axolotl-rules'));return r&&!NA.validate(r).length?r:NA.defaults();}catch{return NA.defaults();}};
