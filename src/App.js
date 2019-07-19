import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from './styles/helpers';
import { initGrid, stepGrid, countPopulation } from './lifeLogic';
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
    setGridState(() => {
    setGenCount(prev => prev + 1);
      return stepGrid(gridState);
    });
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

  const setSpeed = speedMS => {
    const speed = parseInt(speedMS);

    if (!typeof speed === 'number') {
      console.error('Speed must be a number');
    } else {
      setConfig(prev => {
        if (!isPaused) setEvolutionInterval(speed);
        return { ...prev, speed };
      });
    }
  };

  const setGrid = gridState => {
    if (!(gridState.length <= config.gridSize)) {
      console.error('Grid preset too large for current grid');
    } else {
      setGridState(gridState);
    }
  };

  useInterval(() => {
    step();
  }, evolutionInterval);

  const logStatePretty = () => {
    // pretty print grid state for debug & easy copy/paste
    let log = '[';
    gridState.forEach(row => (log += `[${row.join(', ')}]\n`));
    log += ']';
    console.log(log);
  };

  useHotKeys({
    p: playPause,
    r: randomize,
    c: reset,
    s: step,
    l: logStatePretty
  });

  return (
    <AppWrapper>
      <header>
        <h1>The Game of Life</h1>
      </header>

      <GameContainer>
        <Controls isPaused={isPaused} callbacks={{ playPause, step, randomize, reset, setSpeed }} />
        <GridDisplay state={gridState} setCell={setCell} isPaused={isPaused} />
        <Stats genCount={genCount} popCount={popCount} isPaused={isPaused} />
      </GameContainer>

      <About>
        <h2>What is it?</h2>
        <p>
          Invented by Cambridge mathematician John Conway, the Game of Life is a game with no
          players. More simulation than game, cells on a grid live and die according to a simple set
          of rules. Upon each iteration of the grid:
        </p>
        <ul>
          <li>A living cell with less than 2 neighbors will die from loneliness</li>
          <li>A living cell with more than 3 neighbors will die from overcrowding</li>
          <li>A living cell with 2 or 3 neighbors is contented and lives on</li>
          <li>An empty cell with exactly 3 neighbors will spontaneously come to life</li>
        </ul>
      </About>
      <Footer />
    </AppWrapper>
  );
}

export default App;
