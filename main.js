// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });


function ready() {
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: screen.width, height: screen.height });
    document.body.appendChild(app.view);

    var ants = [];
    for (let i = 0; i < 1000; i++) {
        let ant = getAnt(antColorRed);
        ants.push(ant);
        app.stage.addChild(ant);
    }


    requestAnimationFrame(update);

    function update() {

        ants.forEach(ant => { move(ant); });
    
        app.render(app.stage);
        
        requestAnimationFrame(update);
    }
}
