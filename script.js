let gridContainer = document.querySelector(".gridContainer")
let gridSize = 50;

//grid square size 
let gridWidth = gridContainer.offsetWidth;
let squareWidth = (gridWidth-gridSize) / gridSize; 
let gridHeight = gridContainer.offsetHeight;
let squareHeight = (gridHeight-gridSize) / gridSize; 

let gridSquare;

//grid
for (let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
        gridSquare = document.createElement('div');
        gridSquare.classList.add("gridSquare");
        gridContainer.appendChild(gridSquare);
        gridSquare.setAttribute("style",`flex-basis: ${squareWidth}px; height: ${squareHeight}`);
    }
}

