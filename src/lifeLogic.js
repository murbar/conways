export const initGrid = (rows, cols, random = false) =>
  Array(rows)
    .fill()
    .map(row =>
      Array(cols)
        .fill()
        .map(col => {
          if (random) return Math.random() < 0.25 ? 1 : 0;
          return 0;
        })
    );

const countNeighbors = (grid, x, y) => {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // "wrap" around the grid
      const row = (x + i + numRows) % numRows;
      const col = (y + j + numCols) % numCols;
      count += grid[row][col];
    }
  }
  count -= grid[x][y]; // discount self
  return count;
};

const getCellNextState = (isAlive, numNeighbors) => {
  const [LIVES, DIES] = [1, 0];

  if (!isAlive && numNeighbors === 3) {
    return LIVES;
  } else if (isAlive && (numNeighbors < 2 || numNeighbors > 3)) {
    return DIES;
  } else {
    return isAlive ? LIVES : DIES;
  }
};

export const stepGrid = grid => {
  const newGrid = initGrid(grid.length, grid[0].length);

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      newGrid[i][j] = getCellNextState(!!cell, countNeighbors(grid, i, j));
    });
  });

  return newGrid;
};

export const countPopulation = grid => {
  let count = 0;
  for (let row of grid) {
    for (let cell of row) {
      if (cell === 1) count++;
    }
  }
  return count;
};
