import "./style.css";
import nQueens from "./nQueens";
import solveSudoku from "./sudokuSolver";



const nQueensContainer = document.querySelector(".n-queens-container");
const sudokuContainer = document.querySelector(".sudoku-container");
const selectProblem = document.querySelector("#select-problem");

selectProblem.addEventListener("change", function(event) {
    
    const value = event.target.value;

    switch (value) {
        case "N-Queens":
            sudokuContainer.style.display = "none";
            nQueensContainer.style = "display: grid; grid-template: 1fr / 10fr 3fr; align-items: center; justify-items: center;";
            break;
        case "Sudoku":
            sudokuContainer.style.display = "flex";
            nQueensContainer.style.display = "none";
            break;
    }

});

