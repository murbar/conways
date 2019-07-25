import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from './styles/helpers';
import { initGrid, stepGrid, countPopulation } from './lifeLogic';
import useInterval from './useInterval';
import useHotKeys from './useHotKeys';
import Header from './components/Header';
import Controls from './components/Controls';
import Grid from './components/Grid';
import Stats from './components/Stats';
import Presets from './components/Presets';
import About from './components/About';
import Footer from './components/Footer';

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
    gridCols: 42,
    gridRows: 42,
    speed: 200
  });
  const [gridState, setGridState] = useState(initGrid(config.gridRows, config.gridCols, true));
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
    const newState = initGrid(config.gridRows, config.gridCols, true);
    setGridState(newState);
  };

  const step = () => {
    setGridState(prevGrid => {
      setGenCount(prevCount => prevCount + 1);
      return stepGrid(prevGrid);
    });
  };

  const reset = () => {
    setGenCount(0);
    const newState = initGrid(config.gridRows, config.gridCols);
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

  const loadPreset = gridPreset => {
    if (!(gridPreset.length <= config.gridRows && gridPreset[0].length <= config.gridCols)) {
      console.error('Grid preset too large for current grid');
    } else {
      setEvolutionInterval(null);
      // have to wait for the last interval to finish
      setTimeout(() => {
        setGenCount(0);
        setGridState(gridPreset.map(row => [...row]));
      }, config.speed);
    }
  };

  const logStatePretty = () => {
    // pretty print grid state for debug & easy copy/paste
    let log = '[';
    gridState.forEach(row => (log += `[${row.join(', ')}],\n`));
    log += ']';
    console.log(log);
  };

  useInterval(() => {
    step();
  }, evolutionInterval);

  useHotKeys({
    p: playPause,
    r: randomize,
    c: reset,
    s: step,
    l: logStatePretty
  });

  return (
    <AppWrapper>
      <Header />
      <GameContainer>
        <Controls isPaused={isPaused} callbacks={{ playPause, step, randomize, reset, setSpeed }} />
        <Grid state={gridState} isPaused={isPaused} callbacks={{ setCell, playPause }} />
        <Stats genCount={genCount} popCount={popCount} isPaused={isPaused} />
      </GameContainer>
      <Presets loadPreset={loadPreset} />
      <About />
      <Footer />
    </AppWrapper>
  );
}

export default App;
