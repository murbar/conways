import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from './styles/helpers';
import { initGrid, stepGrid, countPopulation } from './gameLogic';
import Grid from './Grid';
import useInterval from './useInterval';
import Footer from './components/Footer';
import Controls from './components/Controls';

const AppWrapper = styled.div`
  padding: 0 2rem 3rem;
  margin: 0 auto;
  position: relative;
  ${media.phone`
    padding: 0 4rem 3rem;
  `}
`;

const Stats = styled.p`
  text-transform: uppercase;
  font-size: 0.8em;
  span {
    font-weight: bold;
    display: inline-block;
    min-width: 5rem;
    text-align: right;
  }
`;

const Button = styled.button`
  margin-right: 1.5rem;
  padding: 0.5rem 1.25rem;
  background: ${p => p.theme.colors.blueGrey};
  color: ${p => p.theme.colors.cream};
  font-size: 1em;
  border: none;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    background: ${p => p.theme.colors.blue};
    color: ${p => p.theme.colors.blueBlack};
  }
  &:focus {
    outline: none;
  }
`;

function App() {
  const [config, setConfig] = useState({
    gridSize: 30,
    speed: 200
  });
  const [gridState, setGridState] = useState(initGrid(config.gridSize, true));
  const [evolutionInterval, setEvolutionInterval] = useState(null);
  const popCount = countPopulation(gridState);
  const isPaused = evolutionInterval === null;
  const [genCount, setGenCount] = useState(0);

  const playPause = () => {
    setEvolutionInterval(prev => {
      return prev == null ? config.speed : null;
    });
  };

  const randomize = () => {
    const newState = initGrid(config.gridSize, true);
    setGridState(newState);
  };

  const step = () => {
    setGenCount(prev => prev + 1);
    const newState = stepGrid(gridState);
    setGridState(newState);
  };

  const reset = () => {
    setGenCount(0);
    const newState = initGrid(config.gridSize);
    setGridState(newState);
  };

  const setCell = (row, col, isAlive) => {
    setGridState(prev => {
      prev[row][col] = isAlive ? 1 : 0;
      return [...prev];
    });
  };

  useInterval(() => {
    step();
  }, evolutionInterval);

  return (
    <AppWrapper>
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>

      <Controls isPaused={isPaused} callbacks={{ playPause, step, randomize, reset }} />

      <Stats>
        Generation <span>{genCount}</span>
        <br />
        Population <span>{popCount}</span>
      </Stats>

      <Grid state={gridState} setCell={setCell} isPaused={isPaused} />

      <div className="rules">
        <h2>Rules</h2>
        <ul>
          <li>If a cell is alive and has exactly 2 or 3 neighbors it stays alive</li>
          <li>If a cell is alive and it have less than 2 or more than 4 neighbors it dies</li>
          <li>If a cell is dead and it has exactly 3 live neighbors it comes to life</li>
        </ul>
      <Footer />
    </AppWrapper>
  );
}

export default App;
