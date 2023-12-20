

let isSolved = false;
let stopExecution = false;


const chooseSpeed = document.querySelector("#speed");
const stop = document.querySelector("#stop-execution");

let value1 = 200;
let value2 = 500;

chooseSpeed.addEventListener("change", function(event) {

    switch(event.target.value) {
        case "Slow":
            value1 = 200;
            value2 = 500;
            break;
        case "Medium":
            value1 = 100;
            value2 = 200;
            break;
        case "Fast":
            value1 = 0;
            value2 = 100;
            break;
        case "Super Fast":
            value1 = 0;
            value2 = 0;
            break;
    }

});

stop.addEventListener("click", function() {
    stopExecution = true;
});


const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function generateSolvableSudoku(difficulty) {
    
    generateBoard(board);

    const puzzle = board.map(row => [...row]);

    const totalCells = 9 * 9;
    let removedCells = 0;

    while (removedCells < totalCells - difficulty) {

        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (puzzle[row][col].textContent !== "") {
            const orgVal = puzzle[row][col];
            puzzle[row][col] = "";

            isSolved = false;

            generateBoard(puzzle);

            // increment removedCells by one for more filled board

            if (!isSolved) {
                puzzle[row][col] = orgVal; 
            } else {
                removedCells += 0.5;
            }
        }

    }

    return puzzle;


}

function displaySolvableBoard(difficulty) {

    const puzzle = generateSolvableSudoku(difficulty);


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            board[i][j].textContent = puzzle[i][j].textContent;
            

        }
    }

    return board;


}


function displayBoard() {

    const container = document.querySelector(".board-container");
    container.innerHTML = "";

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const cell = document.createElement("div");
            board[i][j] = cell;
            container.append(cell);

        }
    }

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function displaySudokuStepByStep(board) {

    isSolved = false;

    await solveSudokuStepByStep(board, 0, 0);


}

async function solveSudokuStepByStep(board, row, col) {

    if (!stopExecution) {

        if (row == board.length-1 && col == board.length) {
            isSolved = true;
            return;
        }
    
        if (row == board.length) {
            return;
        }
    
        if (col == board.length) {
            await solveSudokuStepByStep(board, row + 1, 0);
            return;
        }
    
        if (board[row][col].textContent == "") {
    
            for (let i = 1; i <= 9; i++) {
    
                if (!isSolved) {
                    board[row][col].textContent = "? " + i;
                    board[row][col].style.color = "red";
                    await sleep(value1);
                    board[row][col].style.color = "#32de84";
    
                }
    
                if (isSafe(board, row, col, i)) {
                    board[row][col].textContent = i;
                    board[row][col].style.color = "red";
                    await sleep(value1);
                    board[row][col].style.color = "#32de84";
                    await sleep(value1);
                    await solveSudokuStepByStep(board, row, col + 1);                
                    await sleep(value2);
                }
       
            }
    
            if (!isSolved) {
                board[row][col].style.color = "red";
                board[row][col].textContent = "";
            } else {
                return;
            }
    
    
        } else {
            await solveSudokuStepByStep(board, row, col + 1);
        }
    

    } 
      

    
}

// regular sudoku solver

function generateBoard(board) {


    generateSudoku(board, 0, 0);

    stopExecution = false;

    return board;

}

function generateSudoku(board, row, col) {


    if (row == board.length-1 && col == board.length) {
        isSolved = true;
        return;
    }

    if (row == board.length) {
        return;
    }

    if (col == board.length) {
        generateSudoku(board, row + 1, 0);
        return;
    }

    if (board[row][col].textContent == "") {

        for (let i = 1; i <= 9; i++) {

            if (isSafe(board, row, col, i)) {
                board[row][col].textContent = i;
                 
                generateSudoku(board, row, col + 1);                

            }
    
        }

        if (!isSolved) {
            board[row][col].textContent = "";
        } else {
             return;
         }


    } else {
        generateSudoku(board, row, col + 1);
    }


}

function isSafe(board, row, col, i) {

    // check row
    for (let r = 0; r < board.length; r++) {
        if (board[r][col].textContent == i) {
            return false;
        }
    }
    //check column
    for (let c = 0; c < board[row].length; c++) {

        if (board[row][c].textContent == i) {
            return false;
        }

    }

    // check sub grid
    let startRow;
    let startCol;

    if (row % 3 == 0) {
        startRow = row;
    } else if (row % 3 == 1) {
        startRow = row - 1;
    } else {
        startRow = row - 2;
    }

    if (col % 3 == 0) {
        startCol = col;
    } else if (col % 3 == 1) {
        startCol = col - 1;
    } else {
        startCol = col - 2;
    }

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c].textContent == i) {
                return false;
            }
        }
    }

    return true;

}

const difficultyValue = document.querySelector("#range-value");
const difficuly = document.querySelector("#difficulty");
const generateBoardButton = document.querySelector("#generate-board");
const solveSudokuButton = document.querySelector("#solve-sudoku");

let chosenDifficuly = 26;

difficuly.addEventListener("input", function(event) {

    let value = event.target.value;

    difficultyValue.textContent = "Difficulty: " +  value;

    chosenDifficuly = value;


});

let puzzle;
let count = 0;
let solved = true;


export default function solveSudoku() {

    generateBoardButton.addEventListener("click", function() {
    
        if (solved || count === 0) {
            displayBoard();
            puzzle = displaySolvableBoard(chosenDifficuly);
            isSolved = false;
            solved = false;
        }
    
    
        solveSudokuButton.addEventListener("click", async function() {
    
            if (count == 0) {
                count = 1;
    
                await displaySudokuStepByStep(puzzle);
    
                solved = true;
                isSolved = false;
                count = 0;
            }
        
        
        });
    
    });

}

solveSudoku();