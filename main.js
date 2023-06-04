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
    //width = 400;
    //height = 400;
    antsApp.center = {x: width/2, y: height/2};
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

    //test controls
    //let div_input = document.getElementById("div_input");
    //div_input.style.position = "absolute";
    //div_input.style.top = height - 50 + "px";
    //div_input.style.left = width - 50 + "px";

    /*
    // center mark
    let center = new PIXI.Graphics();
    center.lineStyle(1, antColorRed, 1);
    center.moveTo(width/2, 0);
    center.lineTo(width/2, height);
    center.moveTo(0, height/2);
    center.lineTo(width, height/2);
    antsApp.pixiApp.stage.addChild(center);
    */

    //add the ants home to the center of the screen
    let home = antsApp.entity.getHome();
    antsApp.gameEntities.push(home);
    antsApp.pixiApp.stage.addChild(home);

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

    // add food
    for (let i = 0; i < antsApp.StartingFood; i++) {
        let food = antsApp.entity.getBug();
        antsApp.entity.changeMood(food, antsApp.entity.getMoodByName("food"));
        antsApp.gameEntities.push(food);
        antsApp.pixiApp.stage.addChild(food);
    }

    mouseSetup();

    antsApp.pixiApp.animationUpdate =
    function(t) {

        //let bugLocations = [];
        quadTree.clear();

        //update the entities
        let deletes = antsApp.gameEntities.filter(e => {return e.delete == true;});
        deletes.forEach(e => {
            //if deleting remove entities that are tracking
            antsApp.gameEntities.forEach(ent => {
                if (ent.track.x) {
                    if (ent.track.x == e.x){
                        ent.track = {};
                    }
                }
            });
            //delete the entity if it is marked for deletion
            if (e.delete){
                antsApp.pixiApp.stage.removeChild(e);
                e.destroy();
            }
        });
        antsApp.gameEntities = antsApp.gameEntities.filter(e => {return e.delete == false});

        antsApp.gameEntities.forEach(e => { 
            //move the entity
            if (e.eType != "home"){
                antsApp.entity.move(e,t); 
            }

            if (e.eType != "ant") quadTree.insert(e);

            //lag stopper
           if(t > 1){
                
                //new ants
                if (antsApp.food > antsApp.foodCostAnt){
                    antsApp.food -= antsApp.foodCostAnt;
                    let ant = antsApp.entity.getAnt();
                    antsApp.gameEntities.push(ant);
                    antsApp.pixiApp.stage.addChild(ant);
                    antsApp.StartingAnts++;
                }

                //quad tree collision detection
                let entities = quadTree.retrieve(e);
                //lag detection (too many ants packed into a location will not attack the bug)
                if (entities.length < 30){
                    entities.forEach(ent => {
                        //only ants attack bugs
                        if (e.eType == "ant" && ent.eType == "bug"){
                            let ant = e;
                            let bug = ent;
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

                                //cooldown
                                if (ant.moodCooldown < 1){
                                    //if the bug is food then change directly to excited
                                    if(ant.mood.name != "withFood"){
                                        antsApp.entity.AntHuntingBug(bug,ant);
                                    }
                                }else{
                                    ant.moodCooldown--;
                                }

                                if (ant.mood.attack){
                                    //Now they are angry they will attack and the bug will lose life and then turn into food
                                    antsApp.entity.AntAttackingBug(bug,ant);
                                }else{
                                  //else, the ant is not angry
                                    if (bug.mood.name == "food" && ant.mood.name != "withFood"){
                                        antsApp.entity.AntEatingFood(bug,ant);
                                    }  
                                };
                            };//else, too far away
                        };//else, bug and ant
                        //console.log(e.mood.name, ent.mood.name);
                        //ran into home
                        if (e.mood.name == "withFood" && ent.mood.name == "home"){
                            let ant = e;
                            let home = ent;
                            let diffx = Math.abs(ant.x - home.x);
                            let diffy = Math.abs(ant.y - home.y);
                            if (diffx < antsApp.antBugRange * antsApp.worldSize && diffy < antsApp.antBugRange * antsApp.worldSize){
                                antsApp.entity.AntFoodDrop(e,home);
                            }
                        };
                    });
                };//else, too many ants in this location

                //show the current stats
                antsApp.mainText.display();
           };//else, lag
        });//end of game entities loop
        
        //quad tree collision detection
        antsApp.pixiApp.render(antsApp.pixiApp.stage);        
    }
    antsApp.pixiApp.ticker.add(antsApp.pixiApp.animationUpdate);
}
