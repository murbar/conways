import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from './styles/helpers';
import { initGrid, stepGrid, countPopulation } from './gameLogic';
import GridDisplay from './GridDisplay';
import useInterval from './useInterval';
import useHotKeys from './useHotKeys';
import Footer from './components/Footer';
import Controls from './components/Controls';
import Stats from './components/Stats';

const AppWrapper = styled.div`
  padding: 0 2rem 3rem;
  margin: 0 auto;
  position: relative;
  min-width: 320px;
  ${media.tablet`
    padding: 0 4rem 3rem;
  `}
  ${media.desktop`
    width: 50vw;
    margin: 0 50vw 0 0;
  `}
`;

const About = styled.div``;

const GameContainer = styled.div`
  ${media.tablet`
    width: 68rem;
  `}
  ${media.desktop`
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 45vw;
    left: calc(55vw - 4rem);

    max-width: 80vh;
    max-height: 100vh;
  `}
`;

function App() {
  const [config, setConfig] = useState({
    gridSize: 42,
    speed: 200
  });
  const [gridState, setGridState] = useState(initGrid(config.gridSize, true));
  const [evolutionInterval, setEvolutionInterval] = useState(null);
  const [genCount, setGenCount] = useState(0);
  const popCount = countPopulation(gridState);
  const isPaused = evolutionInterval === null;

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


  useHotKeys({
    p: playPause,
    r: randomize,
    c: reset,
    s: step
  });

  return (
    <AppWrapper>
      <header>
        <h1>Conway's Game of Life</h1>
      </header>

      <GameContainer>
        <Controls isPaused={isPaused} callbacks={{ playPause, step, randomize, reset }} />
        <GridDisplay state={gridState} setCell={setCell} isPaused={isPaused} />
        <Stats genCount={genCount} popCount={popCount} isPaused={isPaused} />
      </GameContainer>

      <About>
        <h2>WTH is this?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, natus dignissimos sit
          labore debitis iste! Voluptates eaque exercitationem sed, vero velit dicta? Delectus
          aliquam odit ex reprehenderit omnis repellat unde.
        </p>
        <h2>Rules</h2>
        <ul>
          <li>If a cell is alive and has exactly 2 or 3 neighbors it stays alive</li>
          <li>If a cell is alive and it have less than 2 or more than 4 neighbors it dies</li>
          <li>If a cell is dead and it has exactly 3 live neighbors it comes to life</li>
        </ul>
      </About>
      <Footer />
    </AppWrapper>
  );
}

export default App;
