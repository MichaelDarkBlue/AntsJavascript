var antColorRed = 0xff0000;
var antColorDarkRed = 0x800000;
var antColorGreen = 0x00ff00;
var antColorDarkGreen = 0x008000;
var antColorBlue = 0x0000ff;
var antColorDarkBlue = 0x000080;
var antColorYellow = 0xffff00;
var antColorDarkYellow = 0x808000;
var bugColorBrown = 0x8B4513;
var cooldown = 60;
var worldSpeed = 1;

var moods = [
    {name:"confused",speed:.80,antColor:antColorBlue,rest:.6,moveDirection:true,randomDirection:true},
    {name:"bored",speed:.25,antColor:antColorDarkGreen,rest:.7,moveDirection:true,randomDirection:true},
    {name:"calm",speed:.5,antColor:antColorDarkRed,rest:.25,moveDirection:true,randomDirection:true},
    {name:"happy",speed:.6,antColor:antColorYellow,rest:.1,moveDirection:true,randomDirection:true},
    {name:"excited",speed:.75,antColor:antColorGreen,rest:.05,moveDirection:true,randomDirection:true},
    {name:"hungry",speed:.7,antColor:antColorYellow,rest:.25,moveDirection:true,randomDirection:true},
    {name:"scared",speed:1.25,antColor:antColorDarkBlue,rest:.75,moveDirection:false,randomDirection:false},
    {name:"surprised",speed:1.25,antColor:antColorYellow,rest:.2,moveDirection:false,randomDirection:true},
    {name:"angry",speed:1.5,antColor:antColorRed,rest:0,moveDirection:true,randomDirection:false},
    {name:"mad",speed:2,antColor:antColorRed,rest:0,moveDirection:true,randomDirection:false},
    {name:"sad",speed:2.25,antColor:antColorDarkYellow,rest:.5,moveDirection:false,randomDirection:true},
    {name:"sick",speed:.25,antColor:antColorDarkYellow,rest:.8,moveDirection:false,randomDirection:false}
];//,"hungry","sleepy","happy","sad","angry","excited","bored","confused","scared","surprised","sick","silly","shy","tired","worried","lonely","proud","puzzled"];
var startingMoods = ["calm","happy","excited","hungry"];
var moodsBugs = ["confused","bored","calm","scared","sick"];

//ant
function getAnt() {
    let ant =  new PIXI.Graphics();
    ant.mood = getMoodByName(startingMoods[Math.floor(Math.random() * startingMoods.length)]);
    //getMoodByName(startingMoods[Math.floor(Math.random() * startingMoods.length)]); 
    //getMoodByName("happy");
    ant.beginFill(ant.mood.antColor);
    ant.drawRect(0, 0, 3, 3);
    ant.endFill();
    ant.x = getWidth()/2;
    ant.y = getHeight()/2;
    ant.direction = getRandomDirection();
    ant.MoodCooldown = 0;
    ant.moveCooldown = Math.floor(Math.random() * cooldown);
    ant.ant = true;
    return ant;
}

//bug
function getBug() {
    let bug =  new PIXI.Graphics();
    //get random mood name from moodsBugs array;
    let mood = moodsBugs[Math.floor(Math.random() * moodsBugs.length)];
    bug.mood = getMoodByName(mood);
    bug.beginFill(bugColorBrown);
    bug.drawRect(0, 0, 7, 7);
    bug.endFill();
    bug.x = Math.random() * document.body.clientWidth;
    bug.y = Math.random() * document.body.clientHeight;
    bug.direction = Math.random() * 2 * Math.PI;
    bug.MoodCooldown = 0;
    bug.moveCooldown = Math.floor(Math.random() * cooldown);
    bug.ant = false;
    return bug;
}

function changeMood(ent, mood) {
    ent.mood = mood;
    ent.beginFill(ent.mood.antColor);
    ent.drawRect(0, 0, 3, 3);
    ent.endFill();
    ent.MoodCooldown = Math.floor(Math.random() * cooldown);
}

function move(ent, time){
    if (Math.random() > ent.mood.rest){
        let speed = (ent.mood.speed * worldSpeed * time);
        moveRandom(ent, speed);
        moveDirection(ent, speed);
    }else if (ent.mood.randomDirection){
        if (ent.moveCooldown < cooldown) {
            ent.moveCooldown++;
        }else{
            ent.direction = getRandomDirection();
            ent.moveCooldown = Math.floor(Math.random() * cooldown);;
        }
    }    
}

function moveRandom(ent, speed) {
    //using the deta time to move the ant randomly
    ent.x += Math.random() * speed - (speed/2);
    ent.y += Math.random() * speed - (speed/2);
}

function moveDirection(ent, speed) {
    if (ent.mood.moveDirection){
        ent.x += Math.cos(ent.direction) * speed;
        ent.y += Math.sin(ent.direction) * speed;
    }
}

function getRandomDirection() {
    return Math.random() * 2 * Math.PI;
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