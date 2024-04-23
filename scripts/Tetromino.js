export default class Tetromino{
  constructor(shape, color, parentSelector){
    this.shape = shape;
    this.color = color;
    this.parentSelector = parentSelector;
    this.row = -1;
    this.col = -1;
    this.blocks = [];
    this.initialized = false;
  }

  copy(){
    return new Tetromino(this.shape, this.color, this.parentSelector);
  }

  clearCell(row, column){
    const child = this.blocks[row - this.row][column - this.col];
    if(!child) return;
    document.querySelector(`.${this.parentSelector}`).removeChild(child);
    this.blocks[row - this.row][column - this.col] = undefined;
    this.shape[row - this.row][column - this.col] = 0;
  }

  positionOffset(dx, dy){
    this.col += dx;
    this.row += dy;
  }

  setRowCol(row, col){
    this.row = row;
    this.col = col;
  }

  moveLeft(){
    this.col--;
  }

  moveRight(){
    this.col++;
  }

  moveDown(){
    this.row++;
  }

  rotateClockwise(){
    const {newShape, newBlocks} = this.getRotatedClockwiseShape();
    this.shape = newShape;
    this.blocks = newBlocks;
  }

  getRotatedClockwiseShape(){
    const newShape = [];
    const newBlocks = [];
    for(let i = 0; i < this.shape[0].length; i++){
      let row = [];
      let blockRow = [];
      for(let j = this.shape.length - 1; j >= 0; j--){
        row.push(this.shape[j][i]);
        blockRow.push(this.blocks[j][i]);
      }
      newShape.push(row);
      newBlocks.push(blockRow);
    }
    return {newShape, newBlocks};
  }

  rotateAntiClockwise(){
    const{newShape, newBlocks} = this.getRotatedAnticlockwiseShape;
    this.shape = newShape;
    this.blocks = newBlocks;
  }

  getRotatedAnticlockwiseShape(){
    const newShape = [];
    const newBlocks = [];
    for(let i = this.shape[0].length - 1; i >= 0; i--){
      let row = [];
      let blockRow = [];
      for(let j = 0; j < this.shape.length; j++){
        row.push(this.shape[j][i]);
        blockRow.push(this.blocks[j][i]);
      }
      newShape.push(row);
      newBlocks.push(blockRow);
    }
    return {newShape, newBlocks};
  }

  rotate180(){
    for(let i = 0; i < this.shape.length; i++){
      this.shape[i].reverse();
      this.blocks[i].reverse();
    }
  }

  init(){
    if(this.row == -1 || this.col == -1) return;
    
    this.initialized = true;
    for(let r = 0; r < this.shape.length; r++){
      this.blocks[r] = [];
      for(let c = 0; c < this.shape[r].length; c++){
        if(!this.shape[r][c]) continue;
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.backgroundColor = this.color;
        document.querySelector(`.${this.parentSelector}`).appendChild(block);
        this.blocks[r][c] = block;
      }
    }
    this.update();
  }

  update(){
    if(!this.initialized){
      this.init();
    }

    if(this.blocks.length === 0) return;

    for(let r = 0; r < this.blocks.length; r++){
      for(let c = 0; c < this.blocks[r].length; c++){
        if(!this.blocks[r][c]) continue;
        this.blocks[r][c].style.gridArea = `${this.row + r + 1} / ${this.col + c + 1} / span 1 / span 1`;
      }
    }
  }
}
