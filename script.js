let gridContainer = document.querySelector(".gridContainer")
let gridSize = 16;
let margin = 1;

//grid square size
let gridWidth = gridContainer.offsetWidth;
let squareWidth = gridWidth / gridSize; 
let gridSquare;

//grid
for (let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
        gridSquare = document.createElement('div');
        gridSquare.classList.add("gridSquare");
        gridContainer.appendChild(gridSquare);
        gridSquare.setAttribute("style",`flex-basis: ${squareWidth}px;`)
    }
}
let squares = document.querySelectorAll('.gridSquare');


