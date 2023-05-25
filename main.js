// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });

function ready() {
    //calulate the demensions after the load
    antsApp.width = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    antsApp.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
    //set the canvas size
    let width = antsApp.width;
    let height = antsApp.height;
    document.body.style.margin = "0px";
    document.body.style.overflow = "hidden";
    // Create the application helper and add its render target to the page
    antsApp.pixiApp = new PIXI.Application({ width: width, height: height });
    document.body.appendChild(antsApp.pixiApp.view);

    //create a quad tree for object collision detection
    let quadTree = new Quadtree({x: 0,y: 0,width: width,height: height}, 4,4);

    // add ground
    //let ground = groundLoop(width, height);
    //ground.forEach(g => {
    //    app.stage.addChild(groundLoop(width, height)); //(g);
    //});

    // center mark
    let center = new PIXI.Graphics();
    center.lineStyle(1, antColorRed, 1);
    center.moveTo(width/2, 0);
    center.lineTo(width/2, height);
    center.moveTo(0, height/2);
    center.lineTo(width, height/2);
    antsApp.pixiApp.stage.addChild(center);
    

    // add bugs
    for (let i = 0; i < antsApp.StartingBugs; i++) {
        let bug = antsApp.entity.getBug();
        antsApp.gameEntities.push(bug);
        antsApp.pixiApp.stage.addChild(bug);
    }
    
    // add ants
    for (let i = 0; i < antsApp.StartingAnts; i++) {
        let ant = antsApp.entity.getAnt();
        antsApp.gameEntities.push(ant);
        antsApp.pixiApp.stage.addChild(ant);
    }

    mouseSetup();

    antsApp.pixiApp.animationUpdate =
    function(t) {

        //let bugLocations = [];
        quadTree.clear();

        antsApp.gameEntities.forEach(e => { 
            antsApp.entity.move(e,t); 
            if (!e.ant) quadTree.insert(e);
            /* /basic collision detection
            let location = [Math.floor(e.x),Math.floor(e.y)];
            if (!e.ant){
                bugLocations.push(location);
            }else{
                let hit = bugLocations.includes(location);
                if (hit){
                    changeMood(e, getMoodByName("surprised"));
                }
            }
            */

            //lag stopper
           if(t > 1){

                //quad tree collision detection
                let entities = quadTree.retrieve(e);
                //lag detection (too many ants packed into a location will not attack the bug)
                if (entities.length < 30){
                    entities.forEach(bug => {
                        //only ants attack bugs
                        if (e.ant && !bug.ant){
                            let ant = e;
                            //this ant is near a bug
                            let diffx = Math.abs(ant.x - bug.x);
                            let diffy = Math.abs(ant.y - bug.y);
                            if (diffx < antsApp.antBugRange * antsApp.worldSize && diffy < antsApp.antBugRange * antsApp.worldSize){
                                //track this bug
                                ant.track = bug;

                                //bug tracks the ant if not already
                                if (!bug.tracking.includes(ant)){
                                    bug.tracking.push(ant);
                                }

                                //mood progression
                                let maxProgression = antsApp.entity.AntAttackProgression.length - 1;
                                let currentProgression = antsApp.entity.AntAttackProgression.indexOf(ant.mood.name);
     
                                //cooldown
                                if (ant.moodCooldown < 1){
                                    //if the bug is food then change directly to excited
                                    if (bug.mood.name == "food"){
                                        antsApp.entity.changeMood(ant, antsApp.entity.getMoodByName("excited"));
                                    }else if (currentProgression < maxProgression){
                                        //if not at max progression
                                            antsApp.entity.changeMood(ant, antsApp.entity.getMoodByName(antsApp.entity.AntAttackProgression[currentProgression + 1]));
                                            currentProgression += 1;
                                    }
                                }else{
                                    ant.moodCooldown -= 1;
                                }

                                if (ant.mood.attack){
                                    //Now they are angry they will attack and the bug will lose life and then turn into food
                                    if (bug.mood.name != "worried" && bug.mood.name != "food"){
                                        antsApp.entity.changeMood(bug, antsApp.entity.getMoodByName("worried"));
                                    }
                                    
                                    bug.life -= ant.hitpoints;
                                    
                                    if (bug.life < 1 && bug.mood.name != "food"){
                                        antsApp.entity.changeMood(bug, antsApp.entity.getMoodByName("food"));
                                        bug.life = 100;
                                        //Now that the bug is food the ants need to change to excited
                                        bug.tracking.forEach(a => {
                                            antsApp.entity.changeMood(a, antsApp.entity.getMoodByName("excited"));
                                            //a.tracking = {};
                                        });
                                        bug.scale.x = 1.25;
                                        bug.scale.y = 1.25;
                                    };//else, the bug is still alive
                                };//else, the ant is not angry
                            };//else, too far away
                        };//else, this is not an ant
                    });
                };//else, too many ants in this location
           };//else, lag
        });//end of game entities loop
        
        //quad tree collision detection
        antsApp.pixiApp.render(antsApp.pixiApp.stage);        
    }
    antsApp.pixiApp.ticker.add(antsApp.pixiApp.animationUpdate);
}
