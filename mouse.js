

function mouseSetup(){
    let stage = antsApp.pixiApp.stage;
    let down = false;
    let startX = 0;
    let startY = 0;
    let width = antsApp.width;
    let height = antsApp.height;
    
    document.body.addEventListener("wheel", zoom, { passive: true });
    document.body.addEventListener("mousemove", mousePosition, { passive: true });
    document.body.addEventListener("mousedown", mousedown, { passive: true });
    document.body.addEventListener("mouseup", mouseup, { passive: true });
    
    function centerStageOnMouseOffset(e){
        /*
        let x = e.offsetX - width/2 * stage.scale.x;
        let y = e.offsetY - height/2 * stage.scale.y;

        stage.position.x = x;
        stage.position.y = y;
        */

        let x = (e.offsetX - startX); // / width;
        let y = (e.offsetY - startY); // / height;
        //stage.position.x -= 50;
        //stage.position.y -= 50;
        
        document.getElementById("test").innerHTML = "x: " + x + " y: " + y + debug(e);
    }

    //mouse position
    function mousePosition(e) {
        if (down) {
            let x = (e.offsetX - startX); // / width;
            let y = (e.offsetY - startY); // / height;
            stage.position.x = x;
            stage.position.y = y;
            document.getElementById("test").innerHTML = "x: " + x + " y: " + y + debug(e);
        }
    }

    //mouse down
    function mousedown(e) {
        down = true;
        startX = e.offsetX - stage.position.x;
        startY = e.offsetY - stage.position.y;
        document.getElementById("test").innerHTML = "startX: " + startX + " startY: " + startY + debug(e);
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
        startX = e.offsetX - stage.position.x;
        startY = e.offsetY - stage.position.y;

        if (e.deltaY < 0) {
            // zoom in
            stage.scale.x *= antsApp.zoomRate;
            stage.scale.y *= antsApp.zoomRate;
            } else {
            // zoom out
            stage.scale.x /= antsApp.zoomRate;
            stage.scale.y /= antsApp.zoomRate;
            }

        centerStageOnMouseOffset(e)
        //document.getElementById("test").innerHTML = zoom + " zoom in" + " startX: " + startX + " startY: " + startY + debug(e);
    }

    //debug
    function debug(e) {
        return " stage.x: " + stage.position.x + " stage.y: " + stage.position.y + " stage.scale.x: " + stage.scale.x + " stage.scale.y: " + stage.scale.y + 
        " width:" + width + " height:" + height + " offsetX: " + e.offsetX + " offsetY: " + e.offsetY + " stage.width:" + stage.width;
    }

}

