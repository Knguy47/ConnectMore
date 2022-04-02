const DIRECTIONS: Array<Array<number[]>> = [
  [
    // Column
    [0, -1],
    [0, +1],
  ],
  [
    // Horizontal
    [-1, 0],
    [+1, 0],
  ],
  [
    // Diagonal Downright
    [-1, -1],
    [+1, +1],
  ],
  [
    // Diagonal Upright
    [-1, +1],
    [+1, -1],
  ],
];

const checkForWinner: (
  grid: Array<Array<number>>,
  rowIndex: number,
  colIndex: number,
  currentPlayer: number,
) => boolean = (grid, rowIndex, colIndex, currentPlayer) => {
  // from the current row/col index
  // bfs until BOTH pointers are out of bounds or there is 4 counter;
  for (const direction of DIRECTIONS) {
    let counter = 1;

    for (const axis of direction) {
      // shift grid position to next tile;
      let left = rowIndex + axis[0];
      let right = colIndex + axis[1];

      // Check if next tile in bound;
      if (left >= 0 && left < grid.length && right >= 0 && right < grid[0].length) {
        let currentTile = grid[left][right];

        // tile is owned by current player shift
        while (currentTile === currentPlayer) {
          counter += 1;
          left += axis[0];
          right += axis[1];

          // Check if next tile in bound;
          // if it is not stop shifting
          if (left >= 0 && left < grid.length && right >= 0 && right < grid[0].length) {
            currentTile = grid[left][right];
          } else {
            currentTile = NaN;
          }

          if (counter >= 4) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export default checkForWinner;
