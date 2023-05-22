var antsApp = {};
antsApp.gameEntities = [];
antsApp.cooldown = 30;
antsApp.worldSpeed = 1;
antsApp.worldSize = 1;
antsApp.antBugRange = 10;
antsApp.StartingAnts = 100;
antsApp.StartingBugs = 10;

antsApp.entity = {};
antsApp.entity.moods = [
    {name:"confused",speed:.80,antColor:antColorBlue,rest:.6,moveDirection:true,randomDirection:true,attack:false},
    {name:"bored",speed:.25,antColor:antColorDarkGreen,rest:.7,moveDirection:true,randomDirection:true,attack:false},
    {name:"calm",speed:.5,antColor:antColorDarkRed,rest:.25,moveDirection:true,randomDirection:true,attack:false},
    {name:"happy",speed:.6,antColor:antColorYellow,rest:.1,moveDirection:true,randomDirection:true,attack:false},
    {name:"excited",speed:.75,antColor:antColorGreen,rest:.05,moveDirection:true,randomDirection:true,attack:false},
    {name:"hungry",speed:.7,antColor:antColorYellow,rest:.25,moveDirection:true,randomDirection:true,attack:false},
    {name:"scared",speed:1.25,antColor:antColorDarkBlue,rest:.75,moveDirection:false,randomDirection:false,attack:false},
    {name:"surprised",speed:1.25,antColor:antColorYellow,rest:.2,moveDirection:true,randomDirection:true,attack:false},
    {name:"angry",speed:1.5,antColor:antColorRed,rest:0,moveDirection:true,randomDirection:false,attack:true},
    {name:"mad",speed:2,antColor:antColorRed2,rest:0,moveDirection:true,randomDirection:false,attack:true},
    {name:"sad",speed:2.25,antColor:antColorDarkYellow,rest:.5,moveDirection:false,randomDirection:true,attack:false},
    {name:"sick",speed:.25,antColor:antColorDarkYellow,rest:.8,moveDirection:false,randomDirection:false,attack:false},
    {name:"food",speed:0,antColor:foodColorOrange,rest:1,moveDirection:false,randomDirection:false,attack:false},
    {name:"worried",speed:1,antColor:bugColorDarkBrown,rest:0,moveDirection:true,randomDirection:true,attack:false}
];//,"hungry","sleepy","happy","sad","angry","excited","bored","confused","scared","surprised","sick","silly","shy","tired","worried","lonely","proud","puzzled"];
antsApp.entity.startingMoods = ["calm","happy","excited","hungry"];
antsApp.entity.moodsBugs = ["confused","bored","calm","scared","sick"];

antsApp.entity.AntAttackProgression = ["calm","surprised","angry","mad"];
//ant
antsApp.entity.getAnt = function () {
    let ant =  antsApp.entity.getBase();
    ant.mood = antsApp.entity.getMoodByName(antsApp.entity.startingMoods[Math.floor(Math.random() * antsApp.entity.startingMoods.length)]);
    //getMoodByName(startingMoods[Math.floor(Math.random() * startingMoods.length)]); 
    //getMoodByName("happy");
    ant.beginFill(ant.mood.antColor);
    ant.size = 3 * antsApp.worldSize;
    ant.drawRect(0, 0, ant.size, ant.size);
    ant.endFill();
    ant.ant = true;
    //ants have a different starting position than default
    ant.x = getWidth() / 2;
    ant.y = getHeight() / 2;
    return ant;
}

antsApp.entity.getBase = function (){
    let base =  new PIXI.Graphics();
    base.x = Math.random() * document.body.clientWidth;
    base.y = Math.random() * document.body.clientHeight;
    base.direction = Math.random() * 2 * Math.PI;
    base.moodCooldown = 0;
    base.moveCooldown = Math.floor(Math.random() * antsApp.cooldown);
    base.ant = false;
    //ant is tracking a bug
    base.track = {};
    //bug is being tracked by an ant(s)
    base.tracking = [];
    base.life = 100;
    base.hitpoints = 1;
    //enity base event listener
    base.event
    return base;
}

//bug
antsApp.entity.getBug = function() {
    let bug =  antsApp.entity.getBase();
    //get random mood name from moodsBugs array;
    let mood = antsApp.entity.moodsBugs[Math.floor(Math.random() * antsApp.entity.moodsBugs.length)];
    bug.mood = antsApp.entity.getMoodByName(mood);
    bug.beginFill(bugColorBrown);
    bug.size = 7 * antsApp.worldSize;
    bug.drawRect(0, 0, bug.size, bug.size);
    bug.endFill();
    return bug;
}

antsApp.entity.changeMood = function(ent, mood) {
    ent.mood = mood;
    ent.beginFill(ent.mood.antColor);
    ent.drawRect(0, 0, ent.size, ent.size);
    ent.endFill();
    ent.moodCooldown = antsApp.cooldown;
}

antsApp.entity.move = function(ent, time){
    if (Math.random() > ent.mood.rest){
        let speed = (ent.mood.speed * antsApp.worldSpeed * time);
        antsApp.entity.moveRandom(ent, speed);
        antsApp.entity.moveDirection(ent, speed);
    }else if (ent.mood.randomDirection){
        if (ent.moveCooldown < antsApp.cooldown) {
            ent.moveCooldown++;
        }else{
            ent.direction = antsApp.entity.getRandomDirection();
            ent.moveCooldown = Math.floor(Math.random() * antsApp.cooldown);;
        }
    }    
    /* if the ent goes off the screen move it to the other side
    if (ent.x > getWidth()) {
        ent.x = 0;
    } else if (ent.x < 0) {
        ent.x = getWidth();
    }
    if (ent.y > getHeight()) {
        ent.y = 0;
    } else if (ent.y < 0) {
        ent.y = getHeight();
    }
    */
}

antsApp.entity.moveRandom = function(ent, speed) {
    //using the deta time to move the ant randomly
    ent.x += Math.random() * speed - (speed/2);
    ent.y += Math.random() * speed - (speed/2);
}

antsApp.entity.moveDirection = function(ent, speed) {
    if (ent.mood.moveDirection){
        //if tracking point towards the tracking point
        if (ent.track.x != undefined) {
            let dx = (ent.track.x - ent.x);
            let dy = (ent.track.y - ent.y);
            ent.direction = Math.atan2(dy, dx);
            antsApp.entity.moveRandom(ent, 5);
        }
        ent.x += Math.cos(ent.direction) * speed;
        ent.y += Math.sin(ent.direction) * speed;
    }
}

antsApp.entity.getRandomDirection = function() {
    return Math.random() * 2 * Math.PI;
}

antsApp.entity.getRandomMood = function(start) {
    if(start){
        return antsApp.entity.moods[Math.floor(Math.random() * 7)]; //only the first 6 moods
    } else {
        return antsApp.entity.moods[Math.floor(Math.random() * (antsApp.entity.moods.length))];
    }
}

antsApp.entity.getMoodByName = function(name) {
    return antsApp.entity.moods.find(mood => mood.name == name);
}

antsApp.entity.getAntsByMood = function(mood) {
    return antsApp.gameEntities.filter(ant => ant.mood.name == mood);
}