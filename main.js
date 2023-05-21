// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });


function ready() {
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: screen.width, height: screen.height });
    document.body.appendChild(app.view);


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

    requestAnimationFrame(update);

    function update() {

        let bugLocations = "";

        gameEntities.forEach(e => { 
            move(e); 

            //basic collision detection
            let location = "" + Math.floor(e.x) + ":" + Math.floor(e.y) + ","
            if (!e.ant){
                bugLocations += location;
            }else{
                let hit = bugLocations.indexOf(location);
                if (hit > -1){
                    e.mood = getMoodByName("angry"); //TODO: setup change mood and color.
                }
            }
        });
    
        app.render(app.stage);
        
        requestAnimationFrame(update);
    }
}
