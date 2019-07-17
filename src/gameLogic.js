export const initGrid = (size, random = false) =>
  Array(size)
    .fill()
    .map(row =>
      Array(size)
        .fill()
        .map(col => {
          return random ? Math.round(Math.random()) : 0;
        })
    );

const countNeighbors = (grid, x, y) => {
  const size = grid.length;
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (x + i + size) % size;
      const col = (y + j + size) % size;
      count += grid[row][col];
    }
  }
  count -= grid[x][y]; // don't count self
  return count;
};

export const stepGrid = grid => {
  const dimension = grid.length;
  const newGrid = initGrid(dimension);

  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      const alive = !!grid[i][j];
      const neighbors = countNeighbors(grid, i, j);

      if (!alive && neighbors === 3) {
        newGrid[i][j] = 1;
      } else if (alive && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = 0;
      } else {
        newGrid[i][j] = alive ? 1 : 0;
      }
    }
  }

  return newGrid;
};

export const countPopulation = grid => {
  let count = 0;
  for (let row of grid) {
    for (let col of row) {
      if (col === 1) count++;
    }
  }
  return count;
};
