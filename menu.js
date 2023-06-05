antsApp.menu = {
    displayed: false,
    display: function(e, items) {
        this.close();
        //display a menu at the current mouse location
        antsApp.menu.x = e.x;
        antsApp.menu.y = e.y;  
        let menu = antsApp.menu.div(items);
        document.body.appendChild(menu);
        antsApp.menu.displayed = true;
    },
    div: function(items) {
        let rtn = document.createElement("div");
        rtn.id = "menu";
        rtn.style.position = "absolute";
        rtn.style.top = antsApp.menu.y + "px";
        rtn.style.left = antsApp.menu.x + "px";
        rtn.style.width = "100px";
        rtn.style.height = "100px";
        rtn.style.backgroundColor = "white";
        rtn.style.border = "1px solid black";
        rtn.style.zIndex = "100";
        for (let i = 0; i < items.length; i++) {
            rtn.appendChild(items[i]);
        }
        return rtn;
    },
    item: function(name, action) {
        let rtn = document.createElement("div");
        rtn.style.width = "100%";
        rtn.style.height = "20px";
        rtn.style.backgroundColor = "white";
        rtn.style.border = "1px solid gray";
        rtn.innerText = name;
        rtn.onclick = action;  
        rtn.style.cursor = "pointer"; 
        rtn.style.textAlign = "center";
        //hover color
        rtn.onmouseover = function() {
            this.style.backgroundColor = "lightgray";
        }     
        rtn.onmouseout = function() {
            this.style.backgroundColor = "white";
        }
        return rtn;
    },
    close: function() {
        if (antsApp.menu.displayed) {
            document.body.removeChild(document.getElementById("menu"));
            antsApp.menu.displayed = false;
        }
    }
};