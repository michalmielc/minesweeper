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
            tile.classList.add("tile");
            // tile.classList.add("unlocked");
            tile.setAttribute("id",j+"_"+i);
            tileBox.classList.add("tileBox");
        
            //tileBox.innerText = board[j][i];
            tile.appendChild(tileBox);

            tile.style.backgroundColor="#c9cbcf";
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
      
        //USTALENIE AKTUALNEJ LICZBY  WOLNYCH MIEJSC
        const y = freeIndexes.length;
        //LOSOWANIE INDEKSU
        const rnd = Math.floor(Math.random()*y);
        const x = freeIndexes[rnd];
        
        // ############## MODYFIKACJA
        // const i = getMultiple(x,boardWidth);
        // const j = x%boardWidth;

        const i = getRow(x,boardHeight);
        const j = getColumn(x,boardHeight);
    
        board[i][j]="M";
        // USUNIĘCIE EL X
        freeIndexes.splice(rnd,1);
        tempMinesAmount=tempMinesAmount-1;
     }
}
//ZWRACA POŁOŻENIE ELEMENTU W KOLUMNIE NR
function getColumn(x, boardHeight) {

    // x = 11, 7x3 , // x = 10  4x 6 // x = 28 6x6
    x = Number(x);
    x=x+1;
    let col = 0;

    while(boardHeight<x){
        x = x- boardHeight;
        col = col+1;
    }
    return col;
}
//ZWRACA POŁOŻENIE ELEMENTU W WIERSZY NR
function getRow(x, boardHeight) {
    // x = 11, 7x3 , // x = 10  4x 6 // x = 28 6x6
    x = Number(x);
    x=x+1;

    while(boardHeight<x){
        x = x- boardHeight;
        
    }
    return x-1;
}
//ZWRACA NR INDEKSU W TABLICY WG WIERSZ I KOLUMNY W TABLICY I X J
function getIndex(i,j) {
    let index = 0;

    for (let k =0; k<=i;k++) {
        for (let  l=0; l<=j;l++) {
            index = index+1;
        }
    }

    return index;
}

// ZWRACA WIELOKROTNOŚĆ domodyfikacji
function getMultiple(a,b) {

    let temp = 0;
    b = Number(b);
    a = Number(a);

    // if (a>b) {
    //     let c = b;
    //     b = a;
    //     a = c;
    // }
    
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
        let efficiencyIndex = Math.round(counterCurrent/clickCounter,2)/10;
        efficiency.innerText= "Eff.: " + efficiencyIndex;
        setLevel(efficiencyIndex);
    }
}

function minesCounter(a){
    let mines = document.querySelector("#mines");
    minesLocated=minesLocated+a;
    mines.innerText = "Mines: " + minesLocated  + " / " + minesAmount;

}
//ODSŁONIĘCIE POLA
function uncoverTile(tile,index) {
    
// NUMERACJA INDEXU:
//    0 4 8
//    1 5 9
//    2 6 10
//    3 7 11

    if (!isGameActice) {
        return;
    }

   addClick();
  

   let tileBox = tile.querySelector(".tileBox"); 

   if(!tileBox.classList.contains("locked") && !tileBox.classList.contains("mine")  ){

        //kolumny
        const j = getColumn(index,boardHeight);
        //wiersze
        const i = getRow(index,boardHeight);
        
        // JEŻELI JEST MINA
        if(board[i][j]==="M") {
            endGame();
        }

        // JEŻELI JEST PUSTE POLE
        else if (board[i][j]===0){
         
            tileBox.innerText = "";
            tileBox.classList.add("locked");
            tileBox.style.visibility="visible";
            tile.style.backgroundColor="white";
            checkEndGame();
            
            // DO POPRAWY!!
            // showNeighbourEmptyFields(i,j);
        }

        // INNE
        else {
            tileBox.innerText = board[i][j];
            tileBox.classList.add("locked");
            tileBox.style.visibility="visible";
            changeColorNumber(board[i][j],tileBox);
            tile.style.background="none";
            checkEndGame();
        }
    }
}

//ZAZNACZANIE POLA
function markTile(tile,index) {

   if (isGameActice){
        addClick();
        let tileBox = tile.querySelector(".tileBox"); 
        if (!tileBox.classList.contains("locked")){

            // ODZNACZENIE
            if (tileBox.innerText === "?") {
                tile.style.backgroundColor="#c9cbcf";
                tileBox.style.visibility="hidden";
                tileBox.innerText ="";
                tileBox.classList.remove("mine");
                minesCounter(-1);
            }

            /// ZAZNACZENIE MINY ? 
            else 
            {
                tile.style.background="yellow";
                tileBox.style.visibility="visible";
                tileBox.innerText = "?";
                tileBox.classList.add("mine");
                minesCounter(1);
            }
        }
    }

}

function checkEndGame(){
    let counter=0;
    let counterMine = 0;
    let fieldsAmount = boardHeight*boardWidth;

    tiles.forEach((tile,index)=>{
   
        let tileBox = tile.querySelector(".tileBox"); 
        if (tileBox.classList.contains("locked")){
            counter=counter+1;
        };

        if (tileBox.classList.contains("mine")){
            counterMine=counterMine+1;
        };

        
        if(counter==(fieldsAmount-minesAmount) && counterMine==minesAmount){
            isGameActice=false;
            let  game_status =  document.getElementById("game_status");
            game_status.visibility=true;
            game_status.innerText="YOU WON!";
        }
 
    })
}

//KONIEC GRY
function endGame(){
    isGameActice=false;
    setLevel(0);
    tiles.forEach((tile,index)=>{

        let tileBox = tile.querySelector(".tileBox"); 
        tileBox.classList.add("locked");
        tileBox.style.visibility="visible";
    
       //kolumny
       const j = getColumn(index,boardHeight);
       //wiersze
       const i = getRow(index,boardHeight);

        if (board[i][j]!==0){
            tileBox.innerText = board[i][j];
        }   

        if (tileBox.innerText ==="M")
        {
            tile.classList.add("mine_fields");
        }
    });

    let  game_status =  document.getElementById("game_status");
    game_status.visibility=true;
    game_status.style.color="red";
    game_status.innerText="YOU LOST!";
    setLevel(0);

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

        let efficiency = document.querySelector("#efficiency");
        let efficiencyIndex = Math.round(counterCurrent/clickCounter,2)/10;
        efficiency.innerText= "Eff.: " + efficiencyIndex;
        setLevel(efficiencyIndex);
    }
}

//ZMIANA KOLORU LICZBY
function changeColorNumber(value, tileBox){

    switch (value) {

        case 1:
            tileBox.style.color="#33CEFF";
            break; 
        case 2: 
            tileBox.style.color="#3368FF";
            break;
        case 3:
            tileBox.style.color="#6433FF";
            break; 
        case 4:
            tileBox.style.color="#FF3342";
            break; 
        case 5:
            tileBox.style.color="#FF5733";
            break; 
        case 6:
            tileBox.style.color="#C70039";
            break; 
        case 7:
            tileBox.style.color="#900C3F";
            break; 
        case 8:
            tileBox.style.color="#581845";
            break; 

    }

    return;
}

//ODKRYWANIE WSZYSTKICH ZER W POBLIŻU DO PORAWY!!!!
// function showNeighbourEmptyFields(i,j) {
//     for (let m = -1; m<2; m++) {
//         for (let n= - 1; n<2; n++) {

//             if ((i+m)>=0 && (i+m)<boardHeight && (j+n)>=0 && (j+n)<boardWidth) {
//                 const newId = (i+m).toString()+"_"+(j+n).toString();
//                 if (document.getElementById(newId)!=null){
//                     let next_tile  = document.getElementById(newId); 
//                     //let newIndex = getIndex(i+m,j+n);
//                     let tileBox = next_tile.querySelector(".tileBox"); 

//                     tileBox.innerText = "";
//                     tileBox.style.visibility="visible";
//                     next_tile.style.backgroundColor="white";
//                     tileBox.classList.add("locked");

//                     //showNeighbourEmptyFields(i+m, j+n);
                              
//                 } 
//             }
//         }
//     }
// }


// FUNKCJA Z BŁĘDEM
// function showNeighbourEmptyFields(tile, index)
// {
  
//     let tileBox = tile.querySelector(".tileBox"); 

//          //kolumny
//          let j = getColumn(index,boardHeight);
//          //wiersze
//          let i = getRow(index,boardHeight);
 
  

//     if(!tileBox.classList.contains("locked")){
        
//        if(board[i][j]===0) {
//             tileBox.style.visibility="visible";
//             tileBox.classList.add("locked");
//             tile.style.backgroundColor="pink";

//            // ############ KOD DO POPRAWY ######################## 
//             //  for (let m = -1; m<2; m++) {
//             //     for (let n= - 1; n<2; n++) {
//             //         if ((i+m)>=0 && (i+m)<boardHeight && (j+n)>=0 && (j+n)<boardWidth) {
                        
//             //             const newId = (i+m).toString()+"_"+(j+n).toString();
//             //             console.log(newId);

//             //             if (document.getElementById(newId)!=null){
//             //                 let next_tile  = document.getElementById(newId); 
//             //                 let newIndex = getIndex(i+m,j+n);
//             //                 // if (board[i+m][j+n]===0){
                            
//             //                     showNeighbourEmptyFields(next_tile, newIndex);
//             //                     console.log("sprawdzenie" + newIndex);
//             //                 //}
//             //            } 
//             //     }
//             //     }
//             // }

         
//         }
           
//     }
// }

// WYŚWIETLENIE POZIOMU
function setLevel(efficiencyIndex)
{
    if (efficiencyIndex <0.4 && efficiencyIndex >0 ) {
        //EXPERT
        showPartLevel(9,12,12);
    }

    else if (efficiencyIndex >=0.4 && efficiencyIndex < 1.7) {
        //SENIOR
        showPartLevel(9,12,11);
    }

    else if (efficiencyIndex >=1.7 && efficiencyIndex < 2.4) {
        //ADVANCED
        showPartLevel(8,11,10);
    }

    else if (efficiencyIndex >=2.4 && efficiencyIndex < 3.2) {
        //Experienced
        showPartLevel(7,10,9);
    }

    else if (efficiencyIndex >=3.2 && efficiencyIndex < 4) {
        //Proficient
        showPartLevel(6,9,8);
    }

    else if (efficiencyIndex >=4 && efficiencyIndex < 4.9) {
        // Seasoned
        showPartLevel(5,8,7);
    }
    else if (efficiencyIndex >=4.9 && efficiencyIndex < 6) {
        // Skillful
        showPartLevel(4,7,6);
    }
    else if (efficiencyIndex >=6 && efficiencyIndex < 7.3) {
        // Intermediate
        showPartLevel(3,6,5);
    }
    else if (efficiencyIndex >=7.3 && efficiencyIndex < 8.6) {
        // Skilled
        showPartLevel(2,5,4);
    }
    else if (efficiencyIndex >=8.6 && efficiencyIndex < 10) {
        // Talented
        showPartLevel(2,5,3);
    }
    else if (efficiencyIndex >=10 && efficiencyIndex < 15) {
        // Beginner
        showPartLevel(1,4,2);
    }
    else if (efficiencyIndex >=15 ) {
        // Rookie
        showPartLevel(1,3,1);
    }
    else if (efficiencyIndex==0) {
        //death
        showPartLevel(0,0,0);
    }
}

// POZIOMY GRY
function showPartLevel(start,end,level)
{
    //  POZIOMY
    // 0. Death
    // 1. Rookie
    // 2. Beginner
    // 3. Talented
    // 4. Skilled
    // 5. Intermediate
    // 6. Skillful
    // 7. Seasoned
    // 8. Proficient  
    // 9. Experienced 
    // 10.Advanced
    // 11. Senior
    // 12. Expert 

    const levels = ["Death","Rookie","Beginner","Talented","Skilled","Intermediate",
    "Skillful","Seasoned","Proficient","Experienced","Advanced","Senior","Expert" ];

    let ulLevel = document.getElementById("ul_level");
    ulLevel.innerHTML="";
    for ( let k= start; k<= end; k++) {
        const el  = document.createElement("li");
        el.innerText = levels[k];
        if (k==level){
            el.style.backgroundColor="gray";
            el.style.color ="#4d0026";
            el.style.fontStyle="bold";
        }
        ulLevel.appendChild(el);
        
    }


} 

