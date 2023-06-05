

function mouseSetup(){
    let stage = antsApp.pixiApp.stage;
    let down = false;
    let startX = 0;
    let startY = 0;
    //allow mouse events to be triggered in a queue
    antsApp.mouseEvent = [];

    //mouse events
    document.body.addEventListener("wheel", zoom, { passive: true });
    document.body.addEventListener("mousemove", mousePosition, { passive: true });
    document.body.addEventListener("mousedown", mousedown, { passive: true });
    document.body.addEventListener("mouseup", mouseup, { passive: true });
    document.body.addEventListener('contextmenu', mouseright, false);


    //mouse position
    function mousePosition(e) {
        if (down) {
            let x = (e.offsetX - startX); // / width;
            let y = (e.offsetY - startY); // / height;
            stage.position.x = x;
            stage.position.y = y;
            //document.getElementById("test").innerHTML = "x: " + x + " y: " + y + debug(e);
        }
    }

    //mouse down
    function mousedown(e) {
        down = true;
        startX = e.offsetX - stage.position.x;
        startY = e.offsetY - stage.position.y;
        //document.getElementById("test").innerHTML = "startX: " + startX + " startY: " + startY + debug(e);
    }

    //mouse right
    function mouseright(e) {
        e.preventDefault();
        //reset stage
        stage.pivot.x = 0;
        stage.pivot.y = 0;
        stage.position.x = 0;
        stage.position.y = 0;
        stage.scale.x = 1;
        stage.scale.y = 1;
        //document.getElementById("test").innerHTML = "reset: " + debug(e);

        //create menu
        let close = antsApp.menu.item("Close", antsApp.menu.close);
        let items = [close];
        antsApp.menu.display(e, items);

        return false;
    }

    //mouse up
    function mouseup(e) {
        down = false;
        startX = 0;
        startY = 0;
        //document.getElementById("test").innerHTML = "up" + debug();
    }

    //zoom
    function zoom(e) {
        //e.preventDefault();

        let scaleX = stage.scale.x;
        let tx = (e.x - stage.x) / scaleX;
        let ty = (e.y - stage.y) / scaleX;
        scaleX += -1 * Math.max(-1, Math.min(1, e.deltaY)) * antsApp.zoomRate * scaleX;
        stage.setTransform(-tx * scaleX + e.x, -ty * scaleX + e.y, scaleX, scaleX);
    
        //return false;
    }

    /*
    //debug
    function debug(e) {
        return " stage.x: " + stage.position.x + " stage.y: " + stage.position.y + " stage.scale.x: " + stage.scale.x + " stage.scale.y: " + stage.scale.y + 
        " width:" + width + " height:" + height + " offsetX: " + e.offsetX + " offsetY: " + e.offsetY + " stage.width:" + stage.width;
    }
    */

}

