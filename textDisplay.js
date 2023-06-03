antsApp.mainText = {
    display:function(){
        let text = "";
        let div = document.getElementById("mainText");        
        text += "Ants: " + antsApp.StartingAnts + ", ";
        text += "Bugs: " + antsApp.StartingBugs + ", ";
        text += "Food: " + antsApp.food + " ";
        div.innerHTML = text;
    }
}