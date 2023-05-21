var antColorRed = 0xff0000;
var antColorDarkRed = 0x800000;
var antColorGreen = 0x00ff00;
var antColorDarkGreen = 0x008000;
var antColorBlue = 0x0000ff;
var antColorDarkBlue = 0x000080;
var antColorYellow = 0xffff00;
var antColorDarkYellow = 0x808000;
var bugColorBrown = 0x8B4513;

var moods = [
    {name:"calm",speed:.5,antColor:antColorDarkRed,rest:.25,moveDirection:false},
    {name:"happy",speed:1,antColor:antColorYellow,rest:.1,moveDirection:false},
    {name:"sad",speed:.25,antColor:antColorDarkYellow,rest:.5,moveDirection:false},
    {name:"excited",speed:.75,antColor:antColorGreen,rest:.05,moveDirection:true},
    {name:"hungry",speed:.7,antColor:antColorYellow,rest:.25,moveDirection:true},
    {name:"confused",speed:.80,antColor:antColorBlue,rest:.6,moveDirection:false},
    {name:"bored",speed:.33,antColor:antColorDarkGreen,rest:.7,moveDirection:false},
    {name:"scared",speed:1.25,antColor:antColorDarkBlue,rest:.75,moveDirection:false},
    {name:"surprised",speed:1.25,antColor:antColorYellow,rest:.2,moveDirection:false},
    {name:"sick",speed:.25,antColor:antColorDarkYellow,rest:.8,moveDirection:false},
    {name:"angry",speed:1.5,antColor:antColorRed,rest:0,moveDirection:true},
    {name:"mad",speed:2,antColor:antColorRed,rest:0,moveDirection:true}
];//,"hungry","sleepy","happy","sad","angry","excited","bored","confused","scared","surprised","sick","silly","shy","tired","worried","lonely","proud","puzzled"];

function getAnt(antColor) {
    let ant =  new PIXI.Graphics();
    ant.mood = getRandomMood(true);
    ant.beginFill(ant.mood.antColor);
    ant.drawRect(0, 0, 3, 3);
    ant.endFill();
    ant.x = 100;
    ant.y = 100;
    ant.direction = Math.random() * 2 * Math.PI;
    return ant;
}

function getBug() {
    let bug =  new PIXI.Graphics();
    bug.mood = getMoodByName("calm");
    bug.beginFill(bugColorBrown);
    bug.drawRect(0, 0, 5, 5);
    bug.endFill();
    bug.x = Math.random() * document.body.clientWidth;
    bug.y = Math.random() * document.body.clientHeight;
    bug.direction = Math.random() * 2 * Math.PI;
    return bug;
}

function move(ent){
    if (Math.random() > ent.mood.rest){
        moveRandom(ent);
        moveDirection(ent);
    }    
}

function moveRandom(ent) {
    ent.x += Math.random() * ent.mood.speed - (ent.mood.speed/2);
    ent.y += Math.random() * ent.mood.speed - (ent.mood.speed/2);
}

function moveDirection(ent) {
    if (ent.mood.moveDirection){
        ent.x += Math.cos(ent.direction) * ent.mood.speed;
        ent.y += Math.sin(ent.direction) * ent.mood.speed;
    }
}

function getRandomMood(start) {
    if(start){
        return moods[Math.floor(Math.random() * 7)]; //only the first 6 moods
    } else {
        return moods[Math.floor(Math.random() * (moods.length))];
    }
}

function getMoodByName(name) {
    return moods.find(mood => mood.name == name);
}