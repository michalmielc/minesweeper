let resetButton = document.querySelector("#reset");
let settingsButton = document.querySelector("#opt_submit");
let hiddenSections =  document.querySelectorAll(".hide");
let optionSection = document.querySelector(".options"); 
let field = document.querySelector(".tile");
let boardHeight = 0;
let boardWidth = 0;
let minesAmount = 0;
let isGameActice = false;
let maxHeightSize = 20;
let maxWidthSize =20;
let maxMinesAmount = 0;
let board = [];
 /** @type {HTMLDivElement} */
let tiles ="";
let clickCounter=0;
let minesLocated=0;

//////////// WALIDACJA INPUTÓW --------------------------------------------
// ---- HEIGHT ------------------------------------------------------------ 

let  inputValueHeight = document.getElementById("board_height").value;
let  inputHeight =  document.getElementById("board_height");

inputHeight.addEventListener('beforeinput',e=>{

    inputValueHeight = document.getElementById('board_height').value;

        if (!(/^[0-9]+$/.test(e.data))){
 
           e.preventDefault();
        }
    })

inputHeight.addEventListener('input', e=>{


    if (!(/^[0-9]+$/.test(e.data))){

        e.preventDefault();
    }

    else  {
        inputValueHeight = document.getElementById('board_height').value;
        if (inputValueHeight>maxHeightSize ||inputValueHeight<=0 ) {
            inputValueHeight = maxHeightSize;
            inputHeight.value=maxHeightSize;
        }
        const event = new Event('click');
        resetMines.dispatchEvent(event);
    }

})

let  heightReset =  document.getElementById("resetHeight");

heightReset.addEventListener('click',e=>{
    inputHeight.value = maxWidthSize;
    const event = new Event('click');
    resetMines.dispatchEvent(event);

})
// ---- WIDTH  ------------------------------------------------------------ 

let  inputValueWidth = document.getElementById("board_width").value;
let  inputWidth =  document.getElementById("board_width");

inputWidth.addEventListener('beforeinput',e=>{

    inputValueWidth = document.getElementById('board_width').value;

        if (!(/^[0-9]+$/.test(e.data))){
           e.preventDefault();
        }
    })

inputWidth.addEventListener('input', e=>{

    if (!(/^[0-9]+$/.test(e.data))){
        e.preventDefault();
    }

    else  {
        inputValueWidth = document.getElementById('board_width').value;
        if (inputValueWidth>maxWidthSize ||inputValueWidth<=0 ) {
            inputValueWidth = maxWidthSize;
            inputWidth.value = maxWidthSize;
        }
        const event = new Event('click');
        resetMines.dispatchEvent(event);
    }

})

let  widthReset =  document.getElementById("resetWidth");

widthReset.addEventListener('click',e=>{
    inputWidth.value = maxWidthSize;
    const event = new Event('click');
    resetMines.dispatchEvent(event);
})
//--------------------------------------------------------------------------

// ---- MINES ------------------------------------------------------------ 

let  inputValueMines = document.getElementById("mines_amount").value;
let  inputMines =  document.getElementById("mines_amount");
let  inputMinesPerc =  document.getElementById("mines_perc");

inputMines.addEventListener('beforeinput',e=>{

    inputValueMines = document.getElementById('mines_amount').value;

        if (!(/^[0-9]+$/.test(e.data))){
           e.preventDefault();
        }
    })

inputMines.addEventListener('input', e=>{

    if (!(/^[0-9]+$/.test(e.data))){
        e.preventDefault();
    }

    else  {
        inputValueMines = document.getElementById('mines_amount').value;
        let h = document.getElementById("board_height").value;
        let w = document.getElementById("board_width").value;
        let perc = document.getElementById("mines_perc");
        maxMinesAmount = h*w;

        if (inputValueMines>maxMinesAmount ||inputValueMines<=0 ) {
            inputValueMines = maxMinesAmount;
            inputMines.value = maxMinesAmount;
        }

        else {

            perc.value = parseInt(100*(inputValueMines/maxMinesAmount));
        }
    }

})

let  resetMines =  document.getElementById("resetMines");
resetMines.addEventListener('click',e=>{
    inputMines.value = 0;
    inputMinesPerc.value=0;
    inputValue = 0;
})

/////////// ----------------------------------------------------------------
//// RESET GRY
resetButton.addEventListener("click",  function() {     
    hiddenSections.forEach(el=>{ el.classList.add("hide");});
    optionSection.classList.remove("hide");
    resetBoard();
});

//RESET PLANSZY
function resetBoard() {
    isGameActice=false;

    const myNode = document.getElementById("fields");
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);}

    window.location.reload();    
}

// MANIPULOWANIE SEKCJAMI 
// USTAWIENIA PLANSZY
settingsButton.addEventListener("click", function() {

    //usunięcie ttułu
    let title = document.querySelector(".title");
    title.classList.add("hide"); 

    hiddenSections.forEach(el=>{ el.classList.remove("hide");});
    optionSection.classList.add("hide");
    boardHeight = document.getElementById("board_height").value;
    boardWidth = document.getElementById("board_width").value;
    minesAmount = document.getElementById("mines_amount").value;
    let time = document.querySelector("#time");
    time.innerText="Time: 0.0";
    let efficiency = document.querySelector("#efficiency");
    efficiency.innerText="Eff. " + "0.0";
    let mines = document.querySelector("#mines");
    mines.innerText = "Mines: " + 0 +"/"+minesAmount;
    let clicked = document.querySelector("#clicked");
    clicked.innerText= "Clicked: 0";

    //RYSOWANIE PLANSZY
    assignBoard(boardHeight,boardWidth, board);
    assignMines(minesAmount,boardHeight,boardWidth, board);
    assignValuesToBoard(boardHeight,boardWidth,board);
    drawBoard(boardHeight,boardWidth);
    isGameActice=true;

});

//RYSOWANIE PLANSZY
function drawBoard(boardHeight,boardWidth){
  
    let boardBox = document.getElementById("fields");

    for (let i =0; i<boardWidth;i++) {

        let row = document.createElement("div");
 
        for (let j =0; j<boardHeight;j++) {

            const tile = document.createElement("div");
            const tileBox = document.createElement("div");
            tile.className="tile";
            tile.setAttribute("id",j+"_"+i);
            tileBox.className="tileBox";
            

            //tileBox.innerText = board[j][i];
            tile.appendChild(tileBox);

            // tile.style.backgroundColor="pink";
            tileBox.style.visibility="hidden";
            //DODAWANIE POLA
            // <div class="tile" id="i_j"></div>
           row.appendChild(tile); 

        }

        boardBox.appendChild(row);
    }

  
        //################################################################
        // OBSŁUGA MYSZY LPM I PPM
       
        tiles = Array.from(document.querySelectorAll(".tile"));

        // // PODPIĘCIE ZDARZENIA DO KAFELKÓW LPM
        tiles.forEach ( (tile,index)=> {
            tile.addEventListener("click",()=>uncoverTile(tile,index)); 
        });

         // // PODPIĘCIE ZDARZENIA DO KAFELKÓW PPM
          tiles.forEach ( (tile,index)=> {
            tile.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            markTile(tile,index);})});
    }

// STWORZENIE GLOBALNEJ TABLICY
function assignBoard(boardHeight,boardWidth,board)
{
    for (let i = 0; i<boardHeight; i++) {
        let row = [];
        for (let j = 0; j<boardWidth; j++) {
            row[j]='';
        }
        board.push(row);
    }
}

// PRZYPISANIE WARTOŚCI POLA W ZALEZNOŚCI OD ILOŚCI MIN
function assignValuesToBoard(boardHeight,boardWidth,board){
    for (let i = 0; i<boardHeight; i++) {
        for (let j = 0; j<boardWidth; j++) {

           let minesValueNearby = 0;

           if (board[i][j]==='M'){
            continue;
           }

           else {
            for (let m = -1; m<2; m++) {
                for (let n= - 1; n<2; n++) {
                    if ((i+m)>=0 && (i+m)<boardHeight && (j+n)>=0 && (j+n)<boardWidth) {
            
                        if (board[i+m][j+n]==='M'){
                            minesValueNearby=minesValueNearby+1;
                           }
                       
                    } 
                }
            }

            //console.log(board[i,j]+ " liczba min " + minesValueNearby);
            board[i][j]=minesValueNearby;
           }


        }
}
}
//FUNKCJA ROZMIESZAJĄCA LOSOWO MINY
function assignMines(minesAmount,boardHeight,boardWidth, board){
  
     let tempMinesAmount = minesAmount;
     let freeIndexes = [];
    
     for ( let k=0; k<boardHeight*boardWidth; k++ )
     {
        freeIndexes[k]=k;
     }

     while(tempMinesAmount>0)
     {
      
        //USTALENIE AKTUALNEJ LICBZY WOLLNYCH MIEJSC
        const y = freeIndexes.length;
        //LOSOWANIE INDEKSU
        const rnd = Math.floor(Math.random()*y);
        const x = freeIndexes[rnd];
        const i = getMultiple(x,boardWidth);
        const j = x%boardWidth;
    
        board[i][j]="M";
        // USUNIĘCIE EL X
        freeIndexes.splice(rnd,1);
        tempMinesAmount=tempMinesAmount-1;
     }
}

// ZWRACA WIELOKROTNOŚĆ
function getMultiple(a,b) {

    let temp = 0;
    b = Number(b);
    a = Number(a);
    
    while (b<=a){
        temp=temp+1;
        a=a-b;
    }

  
    return temp;
}

function addClick(){

    if(isGameActice){
        clickCounter++;
        let click = document.querySelector("#clicked");
        click.innerText = "Clicked: " + clickCounter;

        let efficiency = document.querySelector("#efficiency");
        efficiency.innerText= "Eff.: " + Math.round(counterCurrent/clickCounter,2)/10;
    }
}

function minesCounter(a){
    let mines = document.querySelector("#mines");
    minesLocated=minesLocated+a;
    mines.innerText = "Mines: " + minesLocated  + " / " + minesAmount;

}
//ODSŁONIĘCIE POLA
function uncoverTile(tile,index) {
   addClick();
   let tileBox = tile.querySelector(".tileBox"); 

   if(!tileBox.classList.contains("locked")){
        const i = getMultiple(index,boardWidth);
        const j = index%boardWidth;
        tileBox.innerText = board[i][j];
        tileBox.style.visibility="visible";
        tileBox.classList.add("locked");
        if(board[i][j]==="M") {
            tile.style.background="red";
                endGame();
        }
        else{
           tile.style.background="none";
        }
    }
}

//ZAZNACZANIE POLA
function markTile(tile,index) {

   if (isGameActice){
    addClick();
        let tileBox = tile.querySelector(".tileBox"); 
        if (!tileBox.classList.contains("locked")){

            if (tileBox.innerText === "?") {
                tile.style.background="none";
                tileBox.style.visibility="hidden";
                minesCounter(-1);
            }

            else 
            {
        
                tile.style.background="yellow";
                tileBox.style.visibility="visible";
                tileBox.innerText = "?";
                minesCounter(1);
            }
        }
    }

}

//KONIEC GRY
function endGame(){
    isGameActice=false;
    tiles.forEach((tile,index)=>{

        let tileBox = tile.querySelector(".tileBox"); 
   
        tileBox.style.visibility="visible";
    
        const i = getMultiple(index,boardWidth);
        const j = index%boardWidth;
        tileBox.innerText = board[i][j];

        if (tileBox.innerText ==="M")
        {
            tile.style.background="red";
        }
    });

}

//LICZNIK CZASU
let counterUp = document.getElementById("time");
let counterCurrent =0;

setInterval(setTime, 100);

        function setTime()
        {
            if (isGameActice){
                ++counterCurrent;
                if(counterCurrent%10===0){
                    counterUp.innerText = "Time: "+ counterCurrent/10 +".0";
                }
                else{
                    counterUp.innerText = "Time: "+ counterCurrent/10;
                }
            }
        }

//  POZIOMY

// Death
// Rookie
// Beginner
// Talented
// Skilled
// Intermediate
// Skillful
// Seasoned
// Proficient  
// Experienced 0.7
// Advanced 0.6
// Senior 0.3
// Expert 0.2