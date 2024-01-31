let gridContainer = document.querySelector(".gridContainer")
let gridSize = 100;

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
        gridSquare.classList.add("selector");

        gridContainer.appendChild(gridSquare);
        gridSquare.setAttribute("style",`flex-basis: ${squareWidth}px; height: ${squareHeight}; `);
    }
}
let gridArray = Array.from(document.querySelectorAll(".gridSquare"));
let gridArrayLenght = gridArray.length;
let isDown = false;

for(let i = 0; i < gridArrayLenght; i++){
    gridArray[i].setAttribute('id', i+1);

    gridArray[i].addEventListener("mousedown", (e)=>{
       
        if(e.button == 0){
            console.log(gridArray[i].id);
            isDown = true;
            gridArray[i].style.backgroundColor = "white";
        }

    })
    gridArray[i].addEventListener("mouseup", ()=>{
        isDown = false;
    })
    gridArray[i].addEventListener("mouseenter", ()=>{
        if(isDown){
            gridArray[i].style.backgroundColor = "white";
        }
    })
}

let playContainer = document.querySelector(".playContainer");
playContainer.addEventListener("mouseleave", ()=>{
    isDown = false;
})


