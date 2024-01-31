let gridContainer = document.querySelector(".gridContainer")
let resetBtn = document.querySelector("#reset");
let inputGridSize = document.querySelector("#gridSizeInput")
let gridSizeDisplay = document.querySelector("#gridSizeDisplay")
let rainbowColor = document.querySelector("#rainbow")
//grid size
let gridSize = inputGridSize.value;;

let gridHeight = gridContainer.offsetHeight;
let gridWidth = gridContainer.offsetWidth- 0.34;

let gridSquare;



//grid
function createGrid(sizeOfGrid){
    //grid square size 

    let squareWidth = (gridWidth-gridSize) / gridSize; 

    let squareHeight = (gridHeight-gridSize) / gridSize; 

    for (let i = 0; i < sizeOfGrid; i++){
    for(let j = 0; j < sizeOfGrid; j++){
        //create div, add class, 
        gridSquare = document.createElement('div');
        gridSquare.classList.add("gridSquare");
        //disables mozillas draggability of elements
        gridSquare.classList.add("selector");

        gridContainer.appendChild(gridSquare);
        gridSquare.setAttribute("style",`flex-basis: ${squareWidth}px; height: ${squareHeight}; `);
    }
}}

createGrid(gridSize);

//delete grid
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//mouse button[0] is down
let isDown = false;

//rainbow mode toggle


//painting
function paintGrid (){
    let rainbowMode = false;
    let rainbowColors = ["#e81416", "#ffa500", "#faeb36", "#79c314","#487de7", "#4b369d","#70369d"]

    rainbowColor.addEventListener("click",()=>{
        rainbowMode = true;
        console.log("rainbow activated")
    })
    //grid square array
    let gridArray = Array.from(document.querySelectorAll(".gridSquare"));
    for(let i = 0; i < gridArray.length; i++){
        gridArray[i].addEventListener("mousedown", (e)=>{
            isDown = true;
            if(e.button == 0 && !rainbowMode){
                // gridArray[i].style.backgroundColor = "white";
                gridArray[i].classList.add("gridSquareColorChange")
            }
        })
        gridArray[i].addEventListener("mouseup", ()=>{
            isDown = false;
        })
        gridArray[i].addEventListener("mouseenter", ()=>{
            if(isDown){
                if(rainbowMode){
                    let randomColorNumber = Math.floor(Math.random() * 361);
                    gridArray[i].style.backgroundColor = `hsl(${randomColorNumber}, 100%, 60%)`;
                }
                else{
                    gridArray[i].classList.add("gridSquareColorChange")
                }
            }
        })
        //reset colors
        resetBtn.addEventListener("click", ()=>{
            gridArray[i].classList.remove("gridSquareColorChange")
            gridArray[i].style.backgroundColor = "";

        })
    }
}
paintGrid();

//after cursor leaves stop painting
let playContainer = document.querySelector(".playContainer");
playContainer.addEventListener("mouseleave", ()=>{
    isDown = false;
})


//select grid size
gridSizeDisplay.textContent = inputGridSize.value;
inputGridSize.addEventListener("input", (e)=>{
    gridSizeDisplay.textContent = e.target.value;
})
inputGridSize.addEventListener("change", (e)=>{
    setTimeout(removeAllChildNodes(gridContainer), 500);
    gridSize = inputGridSize.value;
    createGrid(gridSize);
    setTimeout(paintGrid(), 500);
})

