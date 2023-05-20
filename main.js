// on document ready javascript code
document.addEventListener("DOMContentLoaded", () => {
    ready();
  });


function ready() {
    // Create the application helper and add its render target to the page
    let app = new PIXI.Application({ width: 640, height: 360 });
    document.body.appendChild(app.view);

    app.stage.addChild(ant);

    requestAnimationFrame(update);

    function update() {
        ant.position.x += 1;
    
        app.render(app.stage);
        
        requestAnimationFrame(update);
    }
}
