// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });


function ready() {
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: screen.width, height: screen.height });
    document.body.appendChild(app.view);


    var gameEntities = [];
    // add ants
    for (let i = 0; i < 1000; i++) {
        let ant = getAnt(antColorRed);
        gameEntities.push(ant);
        app.stage.addChild(ant);
    }

    // add bugs
    for (let i = 0; i < 100; i++) {
        let bug = getBug();
        gameEntities.push(bug);
        app.stage.addChild(bug);
    }


    requestAnimationFrame(update);

    function update() {

        gameEntities.forEach(e => { move(e); });
    
        app.render(app.stage);
        
        requestAnimationFrame(update);
    }
}
