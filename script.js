//DOM elements
let gridContainer = document.querySelector(".gridContainer")
let resetBtn = document.querySelector("#reset");
let inputGridSize = document.querySelector("#gridSizeInput")
let gridSizeDisplay = document.querySelector("#gridSizeDisplay")
let rainbowColor = document.querySelector("#rainbow")
let gridToggle = document.querySelector("#gridToggle");
let shadingToggle = document.querySelector("#shadingToggle")
let lighteningToggle = document.querySelector("#lighteningToggle")
let primaryColor = document.querySelector("#primaryPaintColor");
let chosenBackgroundColor = document.querySelector("#backgroundPaintColor")

//grid size
let gridSize = inputGridSize.value;;
let gridWidth = gridContainer.clientWidth
let gridSquare;

//shading and tinting factors - 1st number
const shadingFactor = 10 / 100;
const tintFactor = 10 / 100;
//mouse button[0] is down
let isDown = false;

//button to shaden grid squares
let shadingState = false;
function shadingToggler(element){
    if (!shadingState && !lighteningState){
        shadingState = true;
        element.classList.add("btnOn");

        //cant have rainbow mode or button on
        rainbowMode = false;
        rainbowModeColoring(rainbowColor);
    }
    else{
        shadingState = false;
        element.classList.remove("btnOn");
    }
}


//button to lighten grid squares
let lighteningState = false;
function lighteningToggler(element){
    if (!lighteningState && !shadingState){
        lighteningState = true;
        element.classList.add("btnOn");
        //cant have rainbow mode or button on
        rainbowMode = false;
        rainbowModeColoring(rainbowColor);
    }
    else{
        lighteningState = false;
        element.classList.remove("btnOn");
    }
}

//grid
function createGrid(sizeOfGrid){
    //grid square size - division and multipl for 2 decimal numbers - minus two to account for borders
    let squareWidth = Math.floor((((gridWidth) / sizeOfGrid) - 2) * 10)/ 10; 
    for (let i = 0; i < sizeOfGrid; i++){
        for(let j = 0; j < sizeOfGrid; j++){
            //create div, add class, 
            gridSquare = document.createElement('div');
            gridSquare.classList.add("gridSquare");
            gridSquare.classList.add("gridOn");
            //disables mozillas draggability of elements
            gridSquare.classList.add("selector");

            gridContainer.appendChild(gridSquare);
            gridSquare.setAttribute("style",`flex-basis: ${squareWidth}px;`);
            gridSquare.style.backgroundColor = chosenBackgroundColor.value;
        }
}}

createGrid(gridSize);

//delete grid
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//let user choose background color
function backgroundColorChange (target){
    chosenBackgroundColor.addEventListener("change", ()=>{
        target.style.backgroundColor = chosenBackgroundColor.value;
    })
}

//grid line toggler
let gridOn = true;
function gridLineToggler(element){
    let gridArray = Array.from(document.querySelectorAll(".gridSquare"));
    if(gridOn && !gridChanged){
        gridOn = false;
        for(let i = 0; i < gridArray.length; i++){
            //removes grid lines
            gridArray[i].classList.remove("gridOn");
            //when grid is on, when toggling grid off - the size is calculated without taking borders in mind
            squareWidth = Math.floor((((gridWidth) / gridSize)) * 10)/ 10; 
            gridArray[i].style.flexBasis = `${squareWidth}px`;
        }
    }
    else{
        gridOn = true;
        for(let i = 0; i < gridArray.length; i++){
            gridArray[i].classList.add("gridOn");
            //size claculated based on border size times 2
            squareWidth = Math.floor((((gridWidth) / gridSize) - 2) * 10)/ 10; 
            gridArray[i].style.flexBasis = `${squareWidth}px`;

        }
    }
}
//rainbow coloring mode toggler
let rainbowMode = false;
function rainbowModeColoring(element){
    if (!rainbowMode && !shadingState && !lighteningState){
        rainbowMode = true;
        element.classList.add("btnOn");
    }
    else{
        rainbowMode = false;
        element.classList.remove("btnOn");

    }
}
//rainbow color paint toggler
rainbowColor.addEventListener("click",()=>{
        rainbowModeColoring(rainbowColor);
        console.log("rainbow activated")
})

//painting
function paintGrid (){
    //grid square array
    let gridArray = Array.from(document.querySelectorAll(".gridSquare"));
    for(let i = 0; i < gridArray.length; i++){
        //change background color
        backgroundColorChange(gridArray[i]); 
        //painting with mouse holded
        gridArray[i].style.backgroundColor = chosenBackgroundColor;
        gridArray[i].addEventListener("mousedown", (e)=>{
            //only left mouse click works to paint
            if(e.button === 0){
                let randomColorNumber = Math.floor(Math.random() * 361);
                    isDown = true;
                if(!rainbowMode){
                    if(shadingState){
                        //prevents from painting
                        isDown = false;
                        lighteningState = false;
                        rainbowMode = false;
                        shading(gridArray[i])
                    }
                    else if(lighteningState){
                        //prevents from painting 
                        isDown = false;
                        shadingState = false;
                        rainbowMode = false;
                        lightening(gridArray[i]);
                    }
                    else{
                        gridArray[i].style.backgroundColor = primaryColor.value;
                    }
                }
                else{
                    gridArray[i].style.backgroundColor = `hsl(${randomColorNumber}, 100%, 65%)`;
                }
            }
        })
        gridArray[i].addEventListener("mouseup", ()=>{
            isDown = false;
        })
        gridArray[i].addEventListener("mouseenter", (e)=>{
            if(isDown){
                if(!shadingState || !lighteningState){
                    if(rainbowMode){
                        let randomColorNumber = Math.floor(Math.random() * 361);
                        gridArray[i].style.backgroundColor = `hsl(${randomColorNumber}, 100%, 65%)`;
                    }
                    else if(!shadingState || !lighteningState){
                        gridArray[i].style.backgroundColor = primaryColor.value;
                    }
                }
            }
        })
        //reset colors
        resetBtn.addEventListener("click", ()=>{
            gridArray[i].classList.remove("gridSquareColorChange")
            gridArray[i].style.backgroundColor = "";
            gridArray[i].style.backgroundColor = chosenBackgroundColor.value;
        })
    }
}
paintGrid();

//after cursor leaves stop painting
let playContainer = document.querySelector(".playContainer");
playContainer.addEventListener("mouseleave", ()=>{
    isDown = false;
})

//avoids deleting grid lines with grid size change
let gridChanged = false;
//select grid size
gridSizeDisplay.textContent = inputGridSize.value;
inputGridSize.addEventListener("input", (e)=>{
    gridSizeDisplay.textContent = e.target.value;
})
inputGridSize.addEventListener("change", (e)=>{
    gridChanged = true;
    setTimeout(removeAllChildNodes(gridContainer), 500);
    gridSize = inputGridSize.value;
    createGrid(gridSize);
    setTimeout(paintGrid(), 500);
        //after grid size change, unpress grid line button
    gridOn = true;
        gridToggle.classList.remove("btnOn");
})

//grid line toggler
gridToggle.addEventListener("click", ()=>{
    //avoids deleting grid lines with grid size change
    gridChanged = false;
    //toggles that button is on
    if(gridOn && !gridChanged){
        gridToggle.classList.add("btnOn");
    }else{
        gridToggle.classList.remove("btnOn");
    }
    gridLineToggler(gridToggle);
})

shadingToggle.addEventListener("click", ()=>{
    shadingToggler(shadingToggle)

})

lighteningToggle.addEventListener("click", ()=>{
    lighteningToggler(lighteningToggle)
})

//shading
function shading(square){
    let numberReg = /\d+/g;
    let color = square.style.backgroundColor.match(numberReg);
    square.addEventListener("click", (element)=>{
        let numberArray = color.map((x) => parseInt(x))
        let currentR = numberArray[0]; 
        let currentG = numberArray[1];
        let currentB = numberArray[2];
        if(currentR !== 0 || currentG !== 0 || currentB !== 0){
            currentR *= (1 - (shadingFactor)); 
            currentG *= (1 - (shadingFactor));
            currentB *= (1 - (shadingFactor));
        }
        element.target.style.backgroundColor = `rgb(${currentR}, ${currentG}, ${currentB})`;
    })
}

//lightening 
function lightening(square){
    let numberReg = /\d+/g;
    let color = square.style.backgroundColor.match(numberReg);
    square.addEventListener("click", (element)=>{
        let numberArray = color.map((x) => parseInt(x))
        let currentR = numberArray[0]; 
        let currentG = numberArray[1];
        let currentB = numberArray[2];
        let newR = currentR + (255 - currentR) * (tintFactor);
        let newG = currentG + (255 - currentG) * (tintFactor);
        let newB = currentB + (255 - currentB) * (tintFactor);
        element.target.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
    })
}