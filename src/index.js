import "./style.css";
import nQueens from "./nQueens";
import solveSudoku from "./sudokuSolver";
import nKnights from "./nKnights";
import wordSearch from "./wordSearch";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const wordSearchContainer = document.querySelector(".word-search-container");
const nQueensContainer = document.querySelector(".n-queens-container");
const nKnightsContainer = document.querySelector(".n-knights-container");
const sudokuContainer = document.querySelector(".sudoku-container");
const selectProblem = document.querySelector("#select-problem");

selectProblem.addEventListener("change", function(event) {
    
    const value = event.target.value;

    switch (value) {
        case "N-Queens":
            sudokuContainer.style.display = "none";
            nQueensContainer.style = "display: grid; grid-template: 1fr / 10fr 3fr; align-items: center; justify-items: center;";
            nKnightsContainer.style.display = "none";
            wordSearchContainer.style.display = "none";
            break;
        case "Sudoku":
            sudokuContainer.style.display = "flex";
            nQueensContainer.style.display = "none";
            nKnightsContainer.style.display = "none";
            wordSearchContainer.style.display = "none";
            break;
        case "N-Knights":
            nKnightsContainer.style = "display: grid; grid-template: 1fr / 10fr 3fr; align-items: center; justify-items: center;"
            nQueensContainer.style.display = "none";
            sudokuContainer.style.display = "none";
            wordSearchContainer.style.display = "none";
            break;
        case "Word-Search":
            wordSearchContainer.style.display = "flex";
            nQueensContainer.style.display = "none";
            sudokuContainer.style.display = "none";
            nKnightsContainer.style.display = "none";
            break;
    }

});

