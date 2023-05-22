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
    for (let i = 0; i < 100; i++) {
        let bug = antsApp.entity.getBug();
        antsApp.gameEntities.push(bug);
        app.stage.addChild(bug);
    }
    
    // add ants
    for (let i = 0; i < 2; i++) {
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
                    entities.forEach(e2 => {
                        //only ants attack bugs
                        if (e.ant && !e2.ant){
                            //finding a bug around it
                            let diffx = Math.abs(e.x - e2.x);
                            let diffy = Math.abs(e.y - e2.y);
                            if (diffx < antsApp.antBugRange && diffy < antsApp.antBugRange){
                                if(e.mood.name == "surprised"){
                                    //after being surprised, the ant will become angry
                                    antsApp.entity.changeMood(e, antsApp.entity.getMoodByName("angry"));
                                    //the ant will now track the bug
                                    e.track = e2;
                                    //the bug will now track the ants
                                    e2.tracking.push(e);
                                }else{
                                    //if already tracking

                                    if (e.mood.name != "angry") {
                                        //before they are angry, they are surprised
                                        antsApp.entity.changeMood(e, antsApp.entity.getMoodByName("surprised"));
                                    }else{
                                        //Now they are angry they will attack and the bug will lose life and then turn into food
                                        e2.life -= 1;
                                        if (e2.life < 1){
                                            antsApp.entity.changeMood(e2, antsApp.entity.getMoodByName("food"));
                                            e2.life = 100;
                                            //Now that the bug is food the ants need to change to excited
                                            e2.tracking.forEach(a => {
                                                antsApp.entity.changeMood(a, antsApp.entity.getMoodByName("excited"));
                                                a.tracking = {};
                                            });
                                        }
                                    }
                            }
                            }
                        }
                    });
                }
           }
        });
        
        //quad tree collision detection
        app.render(app.stage);        
    }
    app.ticker.add(app.animationUpdate);
}
