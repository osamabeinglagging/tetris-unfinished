import Gameboard from "./Gameboard";

const gameboard = new Gameboard("game__wrapper");
gameboard.getRandomTetromino();
gameboard.updateBoard();

document.addEventListener("keydown", (event) => {
  gameboard.handleKeyPresses(event.keyCode);
});


const currentTimeMs = Date.now();

console.log(currentTimeMs);
