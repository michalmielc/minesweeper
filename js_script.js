let resetButton = document.querySelector("#reset");
let settingsButton = document.querySelector("#opt_submit");
let hiddenSections =  document.querySelectorAll(".hide");
let optionSection = document.querySelector(".options"); 
let boardHeight = "";
let height=0;
let boardWidth = "";
let width=0;
let minesAmount = "";
let mines =0;
let isGameActice = false;

//////////// WALIDACJA INPUTÓW --------------------------------------------
let  inputValueHeight = document.getElementById("board_height").value;
let  inputHeight =  document.getElementById("board_height");

inputHeight.addEventListener('beforeinput',e=>{

    inputValueHeight = document.getElementById('board_height').value;

        if (!(/^[0-9]+$/.test(e.data))){
            console.log("beforeinput BŁĄD!");
           e.preventDefault();
        }
    })

inputHeight.addEventListener('input', e=>{

    if (!(/^[0-9]+$/.test(e.data))){
        console.log("input BŁĄD!");
        e.preventDefault();
    }

    // DOPISAĆ ZEROWANIE POLA 
    else  {
        inputValueHeight = document.getElementById('board_height').value;
        if (inputValueHeight>100) {
            console.log("zmiana");
            inputValueHeight = 100;
            inputHeight.value=100;
        }
    }

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

}


// MANIPULOWANIE SEKCJAMI 
// USTAWIENIA PLANSZY
settingsButton.addEventListener("click", function() {
    hiddenSections.forEach(el=>{ el.classList.remove("hide");});
    optionSection.classList.add("hide");
    height = document.getElementById("board_height");
    boardHeight  = height.value;
    width = document.getElementById("board_width");
    boardWidth  = width.value;
    mines = document.getElementById("mines_amount");
    mines_amount  = mines.value;
    
    //RYSOWANIE PLANSZY
    drawBoard(boardHeight,boardWidth,mines_amount);
    isGameActice=true;

});

//RYSOWANIE PLANSZY
function drawBoard(boardHeight,boardWidth,mines_amount){
  
    let boardBox = document.getElementById("fields");


    for (let i =0; i<boardWidth;i++) {

        let row = document.createElement("div");
 
        for (let j =0; j<boardHeight;j++) {

            const tile = document.createElement("div");
            tile.className="tile";
            tile.setAttribute("id",i+"_"+j);
            //DODAWANIE POLA
            // <div class="tile" id="i_j"></div>
           row.appendChild(tile); 

        }

        boardBox.appendChild(row);
    }

}

//SPRAWDZENIE WARTOŚCI
function checkValues(id_value)
{
   

}



// ////RESET PLANSZY
        // function resetBoard() {
        //     board =['','','','','','','','',''];
        //     isGameActice=false;
        //     tiles.forEach(tile=>{
        //         tile.innerText="";
        //     });
        //     message.innerText="";
        //     userPlayer ="-";
        //     pcPlayer = "-";
        // }



// let message =document.querySelector(".message");

// const tiles = Array.from(document.querySelectorAll(".tile"));
// let fields = document.getElementById("fields").children;
// let minMax = true;
// let board =['','','','','','','','',''];
// let boardMinMax = ['','','','','','','','',''];






// // PROTOTYP PIERWSZEGO RUCHU
// // function ifFirstMove(){
// //     let firstMove = true;
// //     for ( let i =0; i<=8;i++) {
// //         if (board[i]!==""){
// //              firstMove = false;   
// //              break;
// //         }
// //     }

// //     return firstMove;
// // }

// // //RUCH KOMPUTERA
// function movePc(minMax){

//     let move=-1;
    
//     if(minMax){

//                 boardMinMax= Array.from(board);
//                 move = startMinMax(boardMinMax);
//         }
    

//     else {
//         move= randomPcMOve();
//     }

//         updateBoard(move,pcPlayer);
//         fields[move].innerText=pcPlayer;
//         checkResult();
    
// }

	

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////


// // // PODPIĘCIE ZDARZENIA DO KAFELKÓW
// tiles.forEach ( (tile,index)=> {
//     tile.addEventListener("click",()=>playerMove(tile,index)); 

// });

// // // RUCH GRACZA
// const  playerMove =(tile,index ) => {
//     if (isTileEmpty(tile) && isGameActice) {
//             tile.innerText = userPlayer;
//             updateBoard(index,userPlayer);
//             checkResult();
//             if (isGameActice) {
//                 movePc(minMax)
//             }
//         return; }

// };

// //// WALIDACJA KAFELKA CZY JEST ZAJĘTY
// const isTileEmpty = (tile) => {
//     if(tile.innerText==="X" || tile.innerText==="O")
//     {
//         return false;
//     }

//     return true;};
     
// //// SPRAWDZENIE WARUNKÓW GRY    
// function checkResult(){

//     if (winningVariants()) {
//         isGameActice=false;
//         return;
//     }

//     if (!board.includes('')) {
//        message.innerText="TIE";
//        isGameActice=false;
//        return;
//     }
// }

// // SPRAWDZENIE WARIANTÓW
// function winningVariants() {
//     let winning = false;
//     const winningConditions  = [
//                 [0,1,2],
//                 [3,4,5],
//                 [6,7,8],
//                 [0,3,6],
//                 [1,4,7],
//                 [2,5,8],
//                 [0,4,8],
//                 [2,4,6]];

//     for ( let i=0; i<8;i++) {
//         const win = winningConditions[i];
//         const field1 = board[win[0]];
//         const field2 = board[win[1]];
//         const field3 = board[win[2]];

//         if (( field1===field2) && (field2 === field3) && (field1!=="")) {
//             if (field1==="X") {
//                 message.innerText = "WINNING BY X";
//                 winning =  true;
//                }
//             else {
//                 message.innerText = "WINNING BY O";
//                 winning =  true;
//             }   
//         }
//     }

 
//     return winning;
// }

// // SPRAWDZENIE WARIANTÓW ZWYCIESTWA REMISU PORAŻKI
// function winningVariantsMinMax(boardMinMax) {
//     let winning = false;
//     const winningConditions  = [
//                 [0,1,2],
//                 [3,4,5],
//                 [6,7,8],
//                 [0,3,6],
//                 [1,4,7],
//                 [2,5,8],
//                 [0,4,8],
//                 [2,4,6]];

//     for ( let i=0; i<8;i++) {
//         const win = winningConditions[i];
//         const field1 = boardMinMax[win[0]];
//         const field2 = boardMinMax[win[1]];
//         const field3 = boardMinMax[win[2]];

//         if (( field1===field2) && (field2 === field3) && (field1!=="")) {
//             if (field1==="X") {
//                 winning =  true;
//                }
//             else {
//                 winning =  true;
//             }   
//         }
//     }

 
//     return winning;
// }


// ////LOSOWY RUCH KOMPA
// function randomPcMOve() {
   
//     let freeTile=-1;
//     let indx =-1;
//     const tabFreeFields = [];
//     for ( let i =0; i<=8;i++) {
//         if (board[i]===""){
//             tabFreeFields.push(i);
//         }
//     }
//     indx = randomNumber(0,tabFreeFields.length-1);
//     return freeTile = tabFreeFields[indx] ;
// }

// //// GENEROWANIE LOSOWEJ LICZBY
// function randomNumber(min, max) {
   
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     if (min==max) {
//         return 0;
//     }
//     else{
//         const indx = Math.floor(Math.random() * (max - min + 1) + min);
//         return indx ;
//     }
// };

// ////UPDATE TABLICY
// const updateBoard = (index,player) => {
//     board[index] = player;

// }


