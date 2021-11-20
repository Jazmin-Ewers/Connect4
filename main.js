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
console.log(circleEls);
/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
/*----- functions -----*/
init(); // sets up state variables

function init(){
    board = [[null, null, null,  null, null, null, null], 
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null]
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
    // Check if square clicked on is available
    if (board[rowNumberIndex][elementIndex]) return; // both 1 and -1 are truthy and null is falsey
    board[rowNumberIndex][elementIndex] = turn;
    turn *= -1;
    render();
    }