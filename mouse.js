

function mouseSetup(stage){
    let down = false;

    
    document.body.addEventListener("wheel", zoom, { passive: true });
    document.body.addEventListener("mousemove", mousePosition, { passive: true });
    document.body.addEventListener("mousedown", mousedown, { passive: true });
    document.body.addEventListener("mouseup", mouseup, { passive: true });
    
    //mouse position
    function mousePosition(e) {
        if (down) {
            stage.position.x = e.offsetX;
            stage.position.y = e.offsetX;
        }
    }

    //mouse down
    function mousedown(e) {
        down = true;
    }

    //mouse up
    function mouseup(e) {
        down = false;
    }

    //zoom
    function zoom(e) {
        let zoom = 1.05;
        if (e.deltaY < 0) {
            // zoom in
            stage.scale.x *= zoom;
            stage.scale.y *= zoom;
        } else {
            // zoom out
            stage.scale.x /= zoom;
            stage.scale.y /= zoom;
        }
    }

}

