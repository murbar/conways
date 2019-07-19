import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import ChoiceToggle from './ChoiceToggle';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StepIcon } from '../icons/forward.svg';
import { ReactComponent as RandomizeIcon } from '../icons/shuffle.svg';
import { ReactComponent as ResetIcon } from '../icons/grid.svg';
import { gliderGun, oscillators, spaceRake, spaceships } from '../presets';

const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const StepButton = styled(IconButton)`
  svg {
    width: 75%;
    top: 12.5%;
    left: 12.5%;
  }
`;

const RandomizeButton = styled(IconButton)`
  svg {
    width: 55%;
    top: 22.5%;
    left: 22.5%;
  }
`;

const speedChoices = {
  '.25x': 800,
  '.5x': 400,
  '1x': 200,
  '2x': 100,
  '4x': 50
};

export default function Controls({ isPaused, callbacks }) {
  return (
    <ControlsWrapper>
      <IconButton
        onClick={callbacks.playPause}
        title={isPaused ? 'Start simulation (P)' : 'Pause simulation (P)'}
      >
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>

      <StepButton onClick={callbacks.step} title="Step through simulation (S)" disabled={!isPaused}>
        <StepIcon />
      </StepButton>
      <RandomizeButton
        onClick={callbacks.randomize}
        title="Randomize cells (R)"
        disabled={!isPaused}
      >
        <RandomizeIcon />
      </RandomizeButton>
      <IconButton onClick={callbacks.reset} title="Clear all cells (C)" disabled={!isPaused}>
        <ResetIcon />
      </IconButton>

      {/* <button onClick={() => callbacks.loadPreset(spaceships)}>preset</button> */}

      <ChoiceToggle choices={speedChoices} initial={'1x'} onToggle={callbacks.setSpeed} />
    </ControlsWrapper>
  );
}
