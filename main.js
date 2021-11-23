/*----- app's state (variables) -----*/
let turn, winner, board;
const lookup = {
    "1": "red", 
    "-1": "black", 
    null: "white"
};
/*----- cached element references -----*/
let message = document.querySelector("h1");

/*----- event listeners -----*/
document.getElementById('startbutton').addEventListener('click', startGame);
document.getElementById('resetbutton').addEventListener('click', init);

/*----- functions -----*/
function init(){
    board = [[null, null, null,  null, null, null, null], 
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null,null, null, null, null],
            [null, null, null, null, null, null, null]
            ];
    turn = 1;
    winner = null; 
    render();
}
function startGame(){
    init();
    document.querySelector('table').addEventListener('click', handleMove);
}
 
function render(){
    let count = 0;
    // Loop through each row and then through each element.
    // For each board space set the background to white, red or black.  
    // If board space is 1 or -1 add 1 to the count. (This will be used to determined the tie). 
    board.forEach(function(row, rowIdx){
        row.forEach(function(element, elementIdx){
            let currentBoardCircle = board[rowIdx][elementIdx];
            let domBoardCircle = document.getElementById(`cir${rowIdx}${elementIdx}`);
            domBoardCircle.style.backgroundColor = lookup[currentBoardCircle];
            if (board[rowIdx][elementIdx] === 1 || board[rowIdx][elementIdx] === -1 ){
                count++;
            }
        });
    });
    //Check if the board is full with -1's and 1's.
    if (count === 42){
        winner = "T";
    }
    // Check who the winner is and change the text on the HTML page to display message.
    if (winner === "T") {
        return message.innerHTML = "It's a tie!";
    } else if (winner === 1 || winner === -1 ) {
        return message.innerHTML = `Player ${lookup[winner]} won!`;
    } else {
        return message.innerHTML = `It's Player ${lookup[turn]}'s Turn`;
    }
} 

function getWinner(){
// Get Column winner
    for (let i = 0; i < 7; i++) {
        if (Math.abs(board[0][i] +  board[1][i] + board[2][i] + board[3][i]) === 4) {
            return board[0][i];

        } else if (Math.abs(board[1][i] +  board[2][i] + board[3][i] + board[4][i]) === 4){
            return board[1][i];

        } else if (Math.abs(board[2][i] +  board[3][i] + board[4][i] + board[5][i]) === 4){
            return board[2][i];
        }
    }
// Get Row winner
    for (let i = 0; i < 6; i++) { 
        if (Math.abs(board[i][0] + board[i][1] + board[i][2] + board[i][3]) === 4) {
            return board[i][0];

        } else if (Math.abs(board[i][1] +  board[i][2] + board[i][3] + board[i][4]) === 4){
            return board[i][1];

        } else if (Math.abs(board[i][2] + board[i][3] + board[i][4] + board[i][5]) === 4){
            return board[i][2];

        } else if (Math.abs(board[i][3] +  board[i][4] + board[i][5] + board[i][6]) === 4){
            return board[i][3];
        }
    }

// Get Diagonal winner
    for (let i = 0; i < 4; i++) {
        let diagonalIndex1 = 0;
        let diagonalIndex2 = 1;
        let diagonalIndex3 = 2;
        let diagonalIndex4 = 3;
        if (Math.abs(board[0][diagonalIndex1] +  board[1][diagonalIndex2] + board[2][diagonalIndex3] + board[3][diagonalIndex4]) === 4){
            console.log(`Won 0${diagonalIndex1} + 1${diagonalIndex2} + 2${diagonalIndex3} + 3${diagonalIndex4}`)
            return board[0][diagonalIndex1];
        } else if (Math.abs(board[1][diagonalIndex1] +  board[2][diagonalIndex2] + board[3][diagonalIndex3] + board[4][diagonalIndex4]) === 4){
            return board[1][diagonalIndex1];

        } else if (Math.abs(board[2][diagonalIndex1] +  board[3][diagonalIndex2] + board[4][diagonalIndex3] + board[5][diagonalIndex4]) === 4){
            return board[2][diagonalIndex1];
                
        } else if (Math.abs(board[3][diagonalIndex1] +  board[2][diagonalIndex2] + board[1][diagonalIndex3] + board[0][diagonalIndex4]) === 4){
            return board[3][diagonalIndex1];
                
        } else if (Math.abs(board[4][diagonalIndex1] +  board[3][diagonalIndex2] + board[2][diagonalIndex3] + board[1][diagonalIndex4]) === 4){
            return board[4][diagonalIndex1];
                
        } else if (Math.abs(board[5][diagonalIndex1] +  board[4][diagonalIndex2] + board[3][diagonalIndex3] + board[2][diagonalIndex4]) === 4){
            return board[2][diagonalIndex1];
                
        } else {
            diagonalIndex1 ++;
            diagonalIndex2 ++;
            diagonalIndex3 ++;
            diagonalIndex4 ++;
        }
    }
}
    
function handleMove(evt){
    if (winner === 1 || winner === -1){
        return
    }
    // Grab index value from the circle we click on
    let rowNumberIndex = parseInt(evt.target.id.replace('cir', '')[0]);
    let elementIndex = parseInt(evt.target.id.replace('cir', '')[1]);

    // Check if circle clicked is available
    if (board[rowNumberIndex][elementIndex]) return;

    // Check if circle click has a full column beneath it
    let row = rowNumberIndex;
    for (let i = 0; i < (6 - rowNumberIndex); i++){
        // Looping through X times depending on how many spaces are underneath the circle clicked. 
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






