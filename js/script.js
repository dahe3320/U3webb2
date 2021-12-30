// Globala Variabler
var newGameBtn; // variabel för knappen newGame
var newBricksBtn; // variabel för knappen newBricks
var tileArray = []; // Array för bilderna
var newBricks; // de fyra brickorna med de 4 nya nummer
var boardElem = []; // array med alla rutor för spelplanen
var dragBrickElem; // bilden som dras
var droppedBricks = 0; // Räknar antalet droppta brickor
// Referens till classerna empty i newBricks och spelplanen



function init() {
    newGameBtn = document.getElementById("newGameBtn");
    newBricksBtn = document.getElementById("newTilesBtn");
    newBricks = document.getElementById("newTiles").getElementsByTagName("img");
    boardElem = document.getElementById("board").getElementsByTagName("img");

    newGameBtn.addEventListener("click",startGame);
    newBricksBtn.addEventListener("click",newTiles);

 
}
window.addEventListener("load",init); // Se till att init aktiveras då sidan är inladdad
//------------------------
function startGame() { // Funktion för när spelet startas 
    for (let i = 1; i < 41 ; i++) {
        tileArray.push(i);
    }
    newGameBtn.disabled = true;
}

function newTiles() { // funktion som generar nya brickor i newBricks, lägger till event för dragstart och dragend
    for (let i = 0; i < 4; i++) {
        let r = Math.floor(tileArray.length*Math.random());
        newBricks[i].src = "img/" + tileArray[r] + ".png";
        newBricks[i].id = tileArray[r];    
        tileArray.splice(r, 1);
    }

    for (let i = 0; i < newBricks.length; i++) {
        newBricks[i].addEventListener("dragstart",dragstartBricks);
        newBricks[i].addEventListener("dragend",dragendBricks);
        newBricks[i].draggable = true;
        newBricks[i].classList.remove("empty");
        newBricks[i].classList.add("filled");
        newBricks[i].style.pointerEvents = "auto";
    }
    newBricksBtn.disabled = true;
    
}

function dragstartBricks(e) { // funktion för när brickorna dras till board, skickar med event i funktionen
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].addEventListener("dragover",bricksOverBoard);
        boardElem[i].addEventListener("dragleave",bricksOverBoard);
        boardElem[i].addEventListener("drop",bricksOverBoard);
    }
        dragBrickElem = this;
        e.dataTransfer.setData("text",this.id); // hämtar id på tilearray till dragBrickElem
    
}


function dragendBricks() { // funktion för avslutandet av event drag and drop
    for (let i = 0; i < boardElem[i]; i++) {
		boardElem[i].removeEventListener("dragover",bricksOverBoard);
        boardElem[i].removeEventListener("dragleave",bricksOverBoard);
		boardElem[i].removeEventListener("drop", bricksOverBoard);
	}
}

function bricksOverBoard(e) { // funktion för när brickorna är på board, 
    e.preventDefault();
    if (e.type == "drop") {
    let r = e.dataTransfer.getData("text");
    this.src = "img/" + r + ".png"; // hämtar bilderna som dras från newBricks till vald ruta på board
    this.classList.remove("empty");
    this.classList.add("filled"); // skapar vit bakgrund för bilderna
    this.style.backgroundColor = "";
    dragBrickElem.src = "img/empty.png";
    dragBrickElem.className = "empty";
    dragBrickElem.style.pointerEvents = "none";
    droppedBricks ++;
    }

    if (droppedBricks == 4) { // aktiverar knappen newBricksBtn när alla bilderna dragits till board, annars inaktiv
        newBricksBtn.disabled = false;
        droppedBricks = 0;
    }
    
    if (e.type == "dragover") {
        this.style.backgroundColor = "green";
    }

    else if (e.type == "dragleave") {
        this.style.backgroundColor = "";
    }
}
