// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });

function getWidth() {
return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
);
}

function getHeight() {
return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
);
}

function ready() {
    let width = getWidth();
    let height = getHeight();
    document.body.style.margin = "0px";
    document.body.style.overflow = "hidden";
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: width, height: height });
    document.body.appendChild(app.view);

    //create a quad tree for object collision detection
    let quadTree = new Quadtree({x: 0,y: 0,width: width,height: height}, 4,4);

    // add ground
    //let ground = groundLoop(width, height);
    //ground.forEach(g => {
        //app.stage.addChild(g);
    //});

    // add bugs
    for (let i = 0; i < antsApp.StartingBugs; i++) {
        let bug = antsApp.entity.getBug();
        antsApp.gameEntities.push(bug);
        app.stage.addChild(bug);
    }
    
    // add ants
    for (let i = 0; i < antsApp.StartingAnts; i++) {
        let ant = antsApp.entity.getAnt();
        antsApp.gameEntities.push(ant);
        app.stage.addChild(ant);
    }

    app.animationUpdate =
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
                            if (diffx < antsApp.antBugRange && diffy < antsApp.antBugRange){
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
                                    //if not at max progression
                                    if (currentProgression < maxProgression){
                                        antsApp.entity.changeMood(ant, antsApp.entity.getMoodByName(antsApp.entity.AntAttackProgression[currentProgression + 1]));
                                        currentProgression += 1;
                                    }
                                }else{
                                    ant.moodCooldown -= 1;
                                }

                                if (ant.mood.attack){
                                    //Now they are angry they will attack and the bug will lose life and then turn into food
                                    if (bug.mood.name != "worried"){
                                        antsApp.entity.changeMood(bug, antsApp.entity.getMoodByName("worried"));
                                    }
                                    
                                    bug.life -= 1;
                                    
                                    if (bug.life < 1){
                                        antsApp.entity.changeMood(bug, antsApp.entity.getMoodByName("food"));
                                        bug.life = 100;
                                        //Now that the bug is food the ants need to change to excited
                                        bug.tracking.forEach(a => {
                                            antsApp.entity.changeMood(a, antsApp.entity.getMoodByName("excited"));
                                            a.tracking = {};
                                        });
                                    };//else, the bug is still alive
                                };
                            };//else, too far away
                        };//else, this is not an ant
                    });
                };//else, too many ants in this location
           };//else, lag
        });//end of game entities loop
        
        //quad tree collision detection
        app.render(app.stage);        
    }
    app.ticker.add(app.animationUpdate);
}
