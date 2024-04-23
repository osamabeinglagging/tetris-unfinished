import {tetrominoes, PARENT_SELECTOR} from "./tetrominoes";
import Tetromino from "./Tetromino";

class Gameboard{
  constructor(parentClass){
    this.gameboard = document.querySelector(`.${parentClass}`);
    this.boardWidth = 10;
    this.boardHeight = 20;
    this.cells = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
    this.tetrominoes = tetrominoes;
    this.currentTetromino = undefined;
    this.lastUpdateTime = Date.now();
    this.frameID = 0;
  }

  updateBoard(){
    if(this.currentTetromino == undefined){
      this.checkLineBreak();
      this.getRandomTetromino();
    }

    if(Date.now() - this.lastUpdateTime > 500){
      this.lastUpdateTime = Date.now();
      this.updateCurrentTetromino();
    }

    requestAnimationFrame(this.updateBoard.bind(this));
  }

  checkLineBreak(){
    let shouldClearRow = true;
    for(let r = this.boardHeight - 1; r >= 0; r--){
      for(let c = 0; c < this.boardWidth; c++){
        if(!this.cells[r][c]){
          shouldClearRow = false;
          continue;
        }
      }
      if(shouldClearRow){
        for(let cc = 0; cc < this.boardWidth; cc++){
          let tetr = this.cells[r][cc];
          if(!tetr) continue;
          this.updateTetromino(tetr, true)
          tetr.clearCell(r, cc);
        }
        this.cells.slice(r, 1);
        console.log(this.cells);
        this.cells.unshift(Array(10).fill(0));
        shouldClearRow = true;

        this.cells.forEach(row => {
          row.forEach(cell => {
            if(cell){
              this.updateTetromino(cell, true)
              cell.moveDown();
              cell.update();
              this.updateTetromino(cell);
            }
          });
        });
      }
    }
  }

  getRandomTetromino(){
    this.currentTetromino = this.tetrominoes[Math.floor(Math.random() * this.tetrominoes.length)].copy();
    this.currentTetromino.setRowCol(0, Math.floor(Math.random() * (this.boardWidth - this.currentTetromino.shape[0].length)));
    this.currentTetromino.update();
    this.updateTetromino(this.currentTetromino);
  }

  updateTetromino(tetromino, remove = false){
    for(let r = 0; r < tetromino.shape.length; r++){
      for(let c = 0; c < tetromino.shape[r].length; c++){
        if(!tetromino.shape[r][c]) continue;
        let tetr = tetromino;
        if(remove) tetr = 0;
        this.cells[tetromino.row + r][tetromino.col + c] = tetr;
      }
    }
  }

  updateCurrentTetromino(dx = 0, dy = 1){
    if(this.currentTetromino == undefined) return;
    if(!this.canMoveCurrentPiece(dx, dy)){
      if(!dx) this.currentTetromino = undefined;
      return;
    }
    this.updateTetromino(this.currentTetromino, true)
    if(dx == 0 && dy == 0){
      if(this.canRotateCurrentTetromino(dx, dy)){
        this.currentTetromino.rotateClockwise();
      }
    }
    else if(dx == -1 && dy == -1){
      if(this.canRotateCurrentTetromino(dx, dy)){
        this.currentTetromino.rotateAntiClockwise();
      }
    }
    else{
      this.currentTetromino.positionOffset(dx, dy);
    }
    this.currentTetromino.update();
    this.updateTetromino(this.currentTetromino);
  }

  canRotateCurrentTetromino(dx, dy){
    if(dx == 0 && dy == 1) return true;

    let shape;
    let { newShape } = this.currentTetromino.getRotatedClockwiseShape();
      if(dx == -1 && dz == -1){
      let { newShape } = this.currentTetromino.getRotatedAnticlockwiseShape();
      shape = newShape;
    }
    shape = newShape;
    console.log(newShape);


    for(let r = 0; r < shape.length; r++){
      for(let c = 0; c < shape[r].length; c++){
        if(!shape[r][c]) continue;
        let newRow = this.currentTetromino.row + r;
        let newCol = this.currentTetromino.col + c;
        if(newRow >= this.boardHeight || newCol < 0 || newCol >= this.boardWidth) return false;
        const thisBlock = this.cells[newRow][newCol];
        if(thisBlock && thisBlock !== this.currentTetromino) return false;

      }
    }
    return true;
  }

  canMoveCurrentPiece(dx, dy){
    for(let r = 0; r < this.currentTetromino.shape.length; r++){
      for(let c = 0; c < this.currentTetromino.shape[0].length; c++){
        if(!this.currentTetromino.shape[r][c]) continue;
        let newRow = this.currentTetromino.row + r + dy;
        let newCol = this.currentTetromino.col + c + dx;
        if(newRow >= this.boardHeight || newCol < 0 || newCol >= this.boardWidth) return false;
        const thisBlock = this.cells[newRow][newCol];
        if(thisBlock && thisBlock !== this.currentTetromino) return false;
      }
    }
    return true;
  }

  handleKeyPresses(keyCode){
    if(keyCode < 37 || keyCode > 40) return;
    let dx = 0;
    let dy = 0;
    switch(keyCode){
      case 37:
        dx = -1;
        break;
      case 39:
        dx = 1;
        break;
      case 40:
        dy = 1;
        break;       
    }
    this.updateCurrentTetromino(dx, dy);
  }
}

export default Gameboard;
