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

    var gameEntities = [];

    // add bugs
    for (let i = 0; i < 100; i++) {
        let bug = getBug();
        gameEntities.push(bug);
        app.stage.addChild(bug);
    }
    
    // add ants
    for (let i = 0; i < 1000; i++) {
        let ant = getAnt();
        gameEntities.push(ant);
        app.stage.addChild(ant);
    }

    app.animationUpdate =
    function(t) {

        //let bugLocations = [];
        quadTree.clear();

        gameEntities.forEach(e => { 
            move(e,t); 
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
                let entities = quadTree.retrieve(e);
                if (entities.length < 30){
                    entities.forEach(e2 => {
                        if (e.ant && !e2.ant){
                            //Math.floor(e.x) == Math.floor(e2.x) && Math.floor(e.y) == Math.floor(e2.y)
                            let diffx = Math.abs(e.x - e2.x);
                            let diffy = Math.abs(e.y - e2.y);
                            if (diffx < 10 && diffy < 10){
                                if(e.mood.name == "surprised"){
                                    changeMood(e, getMoodByName("angry"));
                                    e.tracking = e2;
                                }else{
                                    if (e.mood.name != "angry") {
                                        changeMood(e, getMoodByName("surprised"));
                                    }else{
                                        //getting hit
                                        e2.life -= 1;
                                        if (e2.life < 1){
                                            changeMood(e2, getMoodByName("food"));
                                            e2.life = 100;
                                            //take the any off this list
                                            let a1 = gameEntities.find(a => a.target == e2);
                                            a1.forEach(a => {
                                                changeMood(a, getMoodByName("excited"));
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
