var antColorRed = 0xff0000;
var antColorDarkRed = 0x800000;
var antColorGreen = 0x00ff00;
var antColorDarkGreen = 0x008000;
var antColorBlue = 0x0000ff;
var antColorDarkBlue = 0x000080;
var antColorYellow = 0xffff00;
var antColorDarkYellow = 0x808000;

var moods = [
    {name:"mad",speed:2,antColor:antColorRed},
    {name:"calm",speed:.5,antColor:antColorDarkRed},
    {name:"happy",speed:1,antColor:antColorYellow},
    {name:"sad",speed:.25,antColor:antColorDarkYellow},
    {name:"angry",speed:1.5,antColor:antColorRed},
    {name:"excited",speed:.75,antColor:antColorGreen},
    {name:"bored",speed:.33,antColor:antColorDarkGreen},
    {name:"confused",speed:.80,antColor:antColorBlue},
    {name:"scared",speed:1.25,antColor:antColorDarkBlue},
    {name:"surprised",speed:1.25,antColor:antColorYellow},
    {name:"sick",speed:.25,antColor:antColorDarkYellow}
];//,"hungry","sleepy","happy","sad","angry","excited","bored","confused","scared","surprised","sick","silly","shy","tired","worried","lonely","proud","puzzled","pained","thirsty","hot","cold","pained","itchy","sore","hurt","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt","pained","sick","hungry","thirsty","sleepy","tired","bored","lonely","cold","hot","itchy","sore","hurt"];

function getAnt(antColor) {
    let ant =  new PIXI.Graphics();
    ant.mood = getRandomMood();
    ant.beginFill(ant.mood.antColor);
    ant.drawRect(0, 0, 3, 3);
    ant.endFill();
    ant.x = 100;
    ant.y = 100;
    return ant;
}

function moveRandom(ent) {
    ent.x += Math.random() * ent.mood.speed - (ent.mood.speed/2);
    ent.y += Math.random() * ent.mood.speed - (ent.mood.speed/2);
}

function getRandomMood() {
    return moods[Math.floor(Math.random() * moods.length)];
}