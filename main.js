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
/*----- functions -----*/
init(); // sets up state variables

function init(){
    board = [[null, null, null,  null, null, null, null], 
             [null, 1, null, null, null, null, null],
             [null, 1, null, null, null, null, null],
             [null, 1, null, null, null, null, null],
             [null, 1, null, null, 1, null, 1],
             [null, 1, null, null, 1, null, 1]
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
        if (board[row][elementIndex] === null) {
            console.log(`null ${row}, ${elementIndex}`);
            row ++;
        } else {
            console.log(`Not null ${row}, ${elementIndex}`)
        }
    }
    //console.log([rowNumberIndex + 1], [elementIndex])
    // && board[rowNumberIndex + 1][elementIndex] === null
    board[rowNumberIndex][elementIndex] = turn;
    turn *= -1;
    render();
    }
