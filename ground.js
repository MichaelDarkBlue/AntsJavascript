

//generate a random green color
function getRandomGreen() {
    return "rgb(0," + Math.floor(Math.random() * 256) + ",0)";
}

function getAnt(antColor) {
    let ant =  new PIXI.Graphics();
    ant.beginFill(getRandomGreen());
    ant.drawRect(0, 0, 3, 3);
    ant.endFill();
    ant.x = 100;
    ant.y = 100;
    return ant;
}