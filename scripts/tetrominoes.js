import Tetromino from './Tetromino.js';
const PARENT_SELECTOR = "game__wrapper";

const tetrominoes = [
  new Tetromino(
    [
      [1, 1],
      [1, 1]
    ],
    "#ffd800",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    "#7925dd",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    "orange",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    "red",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    "green",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    "#ff6400",
    PARENT_SELECTOR
  ),
  new Tetromino(
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    "$00b5ff",
    PARENT_SELECTOR
  )
];

export { tetrominoes, PARENT_SELECTOR };
