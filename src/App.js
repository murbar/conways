import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './Grid';

const gridSize = 30;

const initGrid = (size, random = false) =>
  Array(size)
    .fill()
    .map(() =>
      Array(size)
        .fill()
        .map(() => {
          return random ? Math.round(Math.random()) : 0;
        })
    );

const AppWrapper = styled.div`
  margin: 1rem 2rem 3rem;
`;

function App() {
  const [gameState, setGameState] = useState(initGrid(gridSize, true));

  const randomize = () => {
    const newState = initGrid(gridSize, true);
    setGameState(newState);
  };

  return (
    <AppWrapper>
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>

      <button onClick={randomize}>Randomize</button>
      <Grid state={gameState} />

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
