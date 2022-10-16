export type LifeGrid = (0 | 1)[][];

const ACTIVE_CELL_CHANCE = 0.2;

export const initGrid = (rows: number, cols: number, random = false) =>
  Array(rows)
    .fill(null)
    .map((row) =>
      Array(cols)
        .fill(null)
        .map((col) => {
          if (random) return Math.random() < ACTIVE_CELL_CHANCE ? 1 : 0;
          return 0;
        })
    );

const countNeighbors = (grid: LifeGrid, x: number, y: number) => {
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

const getCellNextState = (isAlive: boolean, neighborCount: number) => {
  const [LIVES, DIES] = [1, 0] as const;

  if (!isAlive && neighborCount === 3) {
    return LIVES;
  } else if (isAlive && (neighborCount < 2 || neighborCount > 3)) {
    return DIES;
  } else {
    return isAlive ? LIVES : DIES;
  }
};

export const stepGrid = (grid: LifeGrid) => {
  const newGrid = initGrid(grid.length, grid[0].length);

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      newGrid[i][j] = getCellNextState(!!cell, countNeighbors(grid, i, j));
    });
  });

  return newGrid;
};

export const countPopulation = (grid: LifeGrid) => {
  let count = 0;
  for (let row of grid) {
    for (let cell of row) {
      if (cell === 1) count++;
    }
  }
  return count;
};
