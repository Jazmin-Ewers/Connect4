/*----- constants -----*/
/*----- app's state (variables) -----*/
let turn, winner, board;
const lookup = {
    "1": "red", 
    "-1": "black", 
    null: "white"
};

/*----- cached element references -----*/
const circleEls = document.querySelectorAll('span') // select all the circles in the form of a Nodelist
/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
const message = document.querySelector("h1");
/*----- functions -----*/
init(); // sets up state variables

function init(){
    board = [[null, null, null,  null, null, null, null], 
             [-1, null, null, null, null, null, null],
             [-1, -1, null, null, null, null, null],
             [-1, -1, -1, null, null, null, null],
             [-1, -1, -1, 1, null, null, null],
             [-1, -1, -1, -1, null, null, null]
             ];
    turn = 1;
    winner = null; 
    render();
}


function render(){
    // Loop through row and then through each element
    // If board[][] null : change background to white, 1 : change background to red,  -1: change background to black 
    // According to board[index] value change the background image to object's lookup[sq] value 
    board.forEach(function(row, rowIdx){
        row.forEach(function(element, elementIdx){
            let currentBoardCircle = board[rowIdx][elementIdx];
            let domBoardCircle = document.getElementById(`cir${rowIdx}${elementIdx}`);
            domBoardCircle.style.backgroundColor = lookup[currentBoardCircle];
        });
    });
    if (winner === "T") {
        message.innerHTML = "It's a tie!";
      } else if (winner) {
        message.innerHTML = `Player ${lookup[winner]} won!`;
      } else {
        message.innerHTML = `It's Player ${lookup[turn]}'s Turn`;
      }
    }  
function getWinner(){
    //Get Column winner
//  for (let i = 0; i < 7; i++) {
//      if (Math.abs(board[0][i] +  board[1][i] + board[2][i] + board[3][i]) === 4) {
//          console.log('Winner by Column [0-3] index');
//      } else if (Math.abs(board[1][i] +  board[2][i] + board[3][i] + board[4][i]) === 4){
//          console.log('Winner by Column [1-4] index');
//      } else if (Math.abs(board[2][i] +  board[3][i] + board[4][i] + board[5][i]) === 4){
//          console.log('Winner by Column [2-5] index');
//      }
//  }
//  //Get Row winner
//  for (let i = 0; i < 6; i++) { 
//      if (Math.abs(board[i][0] + board[i][1] + board[i][2] + board[i][3]) === 4) {
//          console.log('Winner by Row [0-3] index')
//      } else if (Math.abs(board[i][1] +  board[i][2] + board[i][3] + board[i][4]) === 4){
//          console.log('Winner by Row [1-4] index')
//      } else if (Math.abs(board[i][2] + board[i][3] + board[i][4] + board[i][5]) === 4){
//          console.log('Winner by Row [2-5] index')
//      } else if (Math.abs(board[i][3] +  board[i][4] + board[i][5] + board[i][6]) === 4){
//          console.log('Winner by Row [3-6] index')
//      }
//  }
 //Get Diagonal winner
let index1DiagonalLoop = 0;
let index2DiagonalLoop = 1;
let index3DiagonalLoop = 2;
let index4DiagonalLoop = 3;

    for (let i = 0; i < 3; i++) {
        if (Math.abs(board [0][index1DiagonalLoop] +  board[1][index2DiagonalLoop] + board[2][index3DiagonalLoop] + board[3][index4DiagonalLoop]) === 4){
            console.log(`Winner by Diagonal index 0${index1DiagonalLoop} , 1${index2DiagonalLoop}, 2${index3DiagonalLoop}, 3${index4DiagonalLoop}`)
        } else {
            index1DiagonalLoop ++;
            index2DiagonalLoop ++;
            index3DiagonalLoop ++;
            index4DiagonalLoop ++;
        }
}
}



function handleMove(evt){
    //Grab index value from the square we click on
    let rowNumberIndex = parseInt(evt.target.id.replace('cir', '')[0]);
    let elementIndex = parseInt(evt.target.id.replace('cir', '')[1]);
    // Check if circle clicked is available
    if (board[rowNumberIndex][elementIndex]) return; // both 1 and -1 are truthy and null is falsey
    // Check if circle click has a full column beneath it 
    // Loop through X times depending on how many spaces are underneath the circle clicked 
    let row = rowNumberIndex;
    for (let i = 0; i < (6 - rowNumberIndex); i++){
        // As soon as there is a null "empty space" beneath the circle click return/exit the function
        if (row > rowNumberIndex && board[row][elementIndex] === null) {
            return;
        } else {
            row ++;
        }
    }
    board[rowNumberIndex][elementIndex] = turn;
    turn *= -1;
    winner = getWinner();
    render();
    }
