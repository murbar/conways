import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import useInterval from './useInterval';

const initGrid = (size, random = false) =>
  Array(size)
    .fill()
    .map(row =>
      Array(size)
        .fill()
        .map(col => {
          return random ? Math.round(Math.random()) : 0;
        })
    );

const countPopulation = grid => {
  let count = 0;
  for (let row of grid) {
    for (let col of row) {
      if (col === 1) count++;
    }
  }
  return count;
};

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

const stepGrid = grid => {
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

const AppWrapper = styled.div`
  margin: 1rem 2rem 3rem;
`;

function App() {
  const [config, setConfig] = useState({
    gridSize: 30,
    speed: 200
  });
  const [gridState, setGridState] = useState(initGrid(config.gridSize, true));
  const [evolutionInterval, setEvolutionInterval] = useState(null);
  const population = countPopulation(gridState);

  const play = () => {
    setEvolutionInterval(config.speed);
  };

  const pause = () => {
    setEvolutionInterval(null);
  };

  const randomize = () => {
    const newState = initGrid(config.gridSize, true);
    setGridState(newState);
  };

  const step = () => {
    const newState = stepGrid(gridState);
    setGridState(newState);
  };

  const reset = () => {
    const newState = initGrid(config.gridSize);
    setGridState(newState);
  };

  const toggleCell = (row, col) => {
    if (evolutionInterval === null) {
      setGridState(prev => {
        const isAlive = !!prev[row][col];
        prev[row][col] = isAlive ? 0 : 1;
        return [...prev];
      });
    }
  };

  useInterval(() => {
    step();
  }, evolutionInterval);

  return (
    <AppWrapper>
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>

      {evolutionInterval === null && <button onClick={randomize}>Randomize</button>}
      {evolutionInterval === null && <button onClick={play}>Play</button>}
      {evolutionInterval !== null && <button onClick={pause}>Pause</button>}
      {evolutionInterval === null && <button onClick={reset}>Reset</button>}
      {evolutionInterval === null && <button onClick={step}>Step</button>}
      <p>Pop: {population}</p>
      <Grid state={gridState} toggleCell={toggleCell} />

      <div className="rules">
        <h2>Rules</h2>
        <ul>
          <li>If a cell is alive and has exactly 2 or 3 neighbors it stays alive</li>
          <li>If a cell is alive and it have less than 2 or more than 4 neighbors it dies</li>
          <li>If a cell is dead and it has exactly 3 live neighbors it comes to life</li>
        </ul>
      </div>
    </AppWrapper>
  );
}

export default App;
