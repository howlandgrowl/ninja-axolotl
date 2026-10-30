'use strict';
NA.Game = class {
 constructor(teams,names,rules){
  if(NA.validate(rules).length)throw Error('Invalid rules.');
  if(teams.length!==2||teams.some(t=>t.ids.length!==3||new Set(t.ids).size!==3||!t.ids.includes(t.active)||t.ids.some(id=>!NA.card(id))))throw Error('Each team needs three different fighters and a selected starting fighter.');
  this.rules=NA.clone(rules);this.rulesId=NA.rulesId(rules);this.setup=NA.clone(teams);this.names=names.map((n,i)=>n.trim()||`Player ${i+1}`);
  this.players=teams.map((t,i)=>({name:this.names[i],active:t.active,energy:0,damage:0,kos:0,fighters:t.ids.map(id=>({id,hp:rules.cards[id].hp}))}));
  this.phase='opening-choice';this.choice=null;this.die=null;this.current=null;this.turn=0;this.revision=0;this.history=[];this.winner=null;this.startedAt=new Date().toISOString();
 }
 log(message){this.history.push({turn:this.turn,message});}
 roll(choice,die){
  if(this.phase!=='opening-choice'||!['Odd','Even'].includes(choice)||!Number.isInteger(die)||die<1||die>6)return false;
  this.choice=choice;this.die=die;this.starter=((die%2===1)===(choice==='Odd'))?0:1;this.phase='die-result';this.revision++;
  this.log(`${this.names[0]} chose ${choice}. Rolled ${die} (${die%2?'Odd':'Even'}). ${this.names[this.starter]} starts.`);return true;
 }
 enter(){if(this.phase!=='die-result')return false;this.begin(this.starter);return true;}
 begin(player){this.current=player;this.turn++;this.players[player].energy=Math.min(this.rules.cap,this.players[player].energy+1);this.phase='active-turn';this.revision++;this.log(`${this.names[player]}'s turn. Energy: ${this.players[player].energy}.`);}
 fighter(p){return this.players[p].fighters.find(f=>f.id===this.players[p].active);}
 attackReason(index){
  if(this.phase!=='active-turn')return 'Wait for an active turn.';
  if(!Number.isInteger(index)||index<0||index>2)return 'Unknown attack.';
  if(this.turn===1&&this.rules.openingRestriction)return 'Opening turn: switch or pass.';
  const p=this.players[this.current],a=this.rules.cards[p.active].attacks[index];
  return p.energy<a.cost?`Needs ${a.cost} energy; you have ${p.energy}.`:'';
 }
 act(action,revision){
  if(revision!==this.revision)return false;
  if(this.phase==='replacement-selection'){
   if(action.type!=='replace')return false;const p=this.players[this.current];const f=p.fighters.find(f=>f.id===action.id);
   if(!f||f.hp<=0||f.id===p.active)return false;
   p.active=f.id;this.log(`${p.name} sends in ${NA.card(f.id).name}.`);this.begin(this.current);return true;
  }
  if(this.phase!=='active-turn')return false;
  const p=this.players[this.current],other=1-this.current;
  if(action.type==='attack'){
   if(this.attackReason(action.index))return false;
   const a=this.rules.cards[p.active].attacks[action.index],target=this.fighter(other),removed=Math.min(target.hp,a.damage);
   p.energy-=a.cost;target.hp-=removed;p.damage+=removed;
   this.log(`${p.name}: ${NA.card(p.active).attacks[action.index][0]} → ${NA.card(target.id).name}, −${removed} HP.`);
   if(target.hp===0){p.kos++;this.log(`${NA.card(target.id).name} is knocked out.`);
    if(this.players[other].fighters.every(f=>f.hp===0)){this.winner=this.current;this.phase='game-over';this.revision++;this.log(`${p.name} wins!`);return true;}
    this.current=other;this.phase='replacement-selection';this.revision++;return true;
   }
  }else if(action.type==='switch'){
   const f=p.fighters.find(f=>f.id===action.id);if(!f||f.hp<=0||f.id===p.active)return false;
   p.active=f.id;this.log(`${p.name} switches to ${NA.card(f.id).name}.`);
  }else if(action.type==='pass'){this.log(`${p.name} passes and keeps ${p.energy} energy.`);}else return false;
  this.begin(other);return true;
 }
 rematch(){return new NA.Game(this.setup,this.names,this.rules);}
 export(){return {game:'Ninja Axolotl',formatVersion:1,rulesId:this.rulesId,rules:NA.clone(this.rules),startedAt:this.startedAt,teams:this.setup,players:this.players,winner:this.winner===null?null:this.names[this.winner],totalTurns:this.turn,history:this.history};}
};
