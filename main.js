// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });


function ready() {
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: 640, height: 360 });
    document.body.appendChild(app.view);

    var ants = [];
    for (let i = 0; i < 100; i++) {
        let ant = getAnt(antColorRed);
        ants.push(ant);
        app.stage.addChild(ant);
    }


    requestAnimationFrame(update);

    function update() {

        ants.forEach(ant => { moveRandom(ant) });
    
        app.render(app.stage);
        
        requestAnimationFrame(update);
    }
}
