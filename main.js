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
    for (let i = 0; i < 10; i++) {
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

        gameEntities.forEach(e => { 
            move(e,t); 

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
        });
    
        app.render(app.stage);        
    }
    app.ticker.add(app.animationUpdate);
}
