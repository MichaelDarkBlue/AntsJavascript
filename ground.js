

//generate a random green color
function getRandomGroundColor() {
    return groundColors[Math.floor(Math.random() * groundColors.length)];
}

function groundLoop(width, height){
    let g =  new PIXI.Graphics();
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            getGroundShape(x,y,g);
        }
    }
    return g;
}

function getGroundShape(x,y,g) {
    g.beginFill(getRandomGroundColor());
    g.drawRect(x, y, x+1, y+1);
    g.endFill();
    return g;
}