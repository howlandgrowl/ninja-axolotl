'use strict';
window.NA = window.NA || {};
NA.cards = [
 {id:'ninja',name:'Ninja Axolotl',image:'assets/4.png',hp:760,attacks:[['Smoke Step',200],['Silent Strike',230],['Twin Blade Rush',260]],tag:'Move in silence. Strike with purpose.'},
 {id:'warrior',name:'Warrior Axolotl',image:'assets/2.png',hp:780,attacks:[['Shield Bash',190],['Sword Strike',220],['Warrior Charge',250]],tag:'Honor stands tallest in the arena.'},
 {id:'dark',name:'Dark Ninja Axolotl',image:'assets/3.png',hp:820,attacks:[['Shadow Pulse',210],['Void Claw',240],['Abyss Roar',270]],tag:'A shadow with something to prove.'},
 {id:'fire',name:'Fire Axolotl',image:'assets/1.png',hp:850,attacks:[['Volcanic Dash',180],['Inferno Tide',210],['Blazing Slash',250]],tag:'Born of lava. Trained in flame.'},
 {id:'flying',name:'Flying Axolotl',image:'assets/7.png',hp:800,attacks:[['Sky Dive',220],['Gale Spin',240],['Cloud Breaker',290]],tag:'The sky is only the first arena.'}
];
NA.card = id => NA.cards.find(c=>c.id===id);
