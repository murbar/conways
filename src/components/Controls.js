import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StepIcon } from '../icons/forward.svg';
import { ReactComponent as RandomizeIcon } from '../icons/shuffle.svg';
import { ReactComponent as ResetIcon } from '../icons/x.svg';

const ControlsWrapper = styled.div``;

const IconButtonStep = styled(IconButton)`
  svg {
    width: 75%;
    top: 12.5%;
    left: 12.5%;
  }
`;

export default function Controls({ isPaused, callbacks }) {
  return (
    <ControlsWrapper>
      <IconButton
        onClick={callbacks.playPause}
        title={isPaused ? 'Start simulation' : 'Pause simulation'}
      >
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
      {isPaused && (
        <>
          <IconButtonStep onClick={callbacks.step} title="Step through simulation">
            <StepIcon />
          </IconButtonStep>
          <IconButton onClick={callbacks.randomize} title="Randomize cells">
            <RandomizeIcon />
          </IconButton>
          <IconButton onClick={callbacks.reset} title="Clear all cells">
            <ResetIcon />
          </IconButton>
        </>
      )}
    </ControlsWrapper>
  );
}
