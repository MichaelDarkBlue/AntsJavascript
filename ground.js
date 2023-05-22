

//generate a random green color
function getRandomGroundColor() {
    return groundColors[Math.floor(Math.random() * groundColors.length)];
}

function groundLoop(width, height){
    let rtn = [];
    for (let x = 0; x < width; x++){
        for (let y = 0; y < height; y++){
            rtn.push(getGroundShape(x,y));
        }
    }
    return rtn;
}

function getGroundShape(x,y) {
    let g =  new PIXI.Graphics();
    g.beginFill(getRandomGroundColor());
    g.drawRect(0, 0, 1, 1);
    g.endFill();
    g.x = x;
    g.y = y;
    return g;
}