import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '../icons/info.svg';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StepIcon } from '../icons/forward.svg';
import { ReactComponent as RandomizeIcon } from '../icons/shuffle.svg';
import { ReactComponent as ResetIcon } from '../icons/grid.svg';
import { ReactComponent as HideIcon } from '../icons/x.svg';
import { media } from '../styles/helpers';
import IconButton from './IconButton';

const Styles = styled.div`
  h1 {
    margin-bottom: 0;
  }
`;

const HowTo = styled.div`
  font-size: 0.9em;
  margin-bottom: 1rem;
  span {
    color: ${p => p.theme.colors.primary};
    svg {
      height: 1.5em;
      transform: translateY(25%);
      margin-right: 0.5rem;
    }
  }
  span:hover {
    color: ${p => p.theme.colors.foreground};
    cursor: pointer;
  }
`;

const Content = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.8em;
  margin-top: 1rem;
  position: relative;
  h2 {
    margin: 0 0 1rem;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-bottom: 1rem;
    }
  }
  .controls {
    svg {
      width: 1em;
      transform: translateY(10%);
      color: ${p => p.theme.colors.primary};
    }
  }
  ${media.phone`
    padding: 1.5rem 2.5rem;
    font-size: 1em;
  `}
`;

const HideButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

const HotKey = styled.kbd`
  background: ${p => p.theme.colors.secondary};
  padding: 0.25em 0.5em;
  border-radius: 0.5rem;
  font-size: 0.8em;
  font-family: inherit;
  text-transform: uppercase;
  box-shadow: 1px 1px black, 1px 1px grey inset;
  margin-left: 0.5rem;
`;

const Instructions = () => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <HowTo>
      {!isShowing && (
        <span onClick={() => setIsShowing(true)} title="Show instructions">
          <InfoIcon />
          How does it work?
        </span>
      )}
      {isShowing && (
        <Content>
          <HideButton onClick={() => setIsShowing(false)} title="Hide instructions">
            <HideIcon />
          </HideButton>
          <h2>Get Started</h2>
          <ul className="controls">
            <li>
              <PlayIcon /> <strong>Play</strong> / <PauseIcon /> <strong>Pause</strong> the
              simulation <HotKey>P</HotKey>
            </li>
            <li>
              <StepIcon /> <strong>Step</strong> forward one iteration <HotKey>S</HotKey>
            </li>
            <li>
              <RandomizeIcon /> <strong>Randomize</strong> the grid <HotKey>R</HotKey>
            </li>
            <li>
              <ResetIcon /> <strong>Clear</strong> the grid <HotKey>C</HotKey>
            </li>
            <li>
              Control the <strong>rate of evolution</strong> with the speed toggle and change a
              cell's state with a <strong>click, or drag across the grid</strong> to easily edit
              multiple cells
            </li>
          </ul>
        </Content>
      )}
    </HowTo>
  );
};

export default function Header() {
  return (
    <Styles>
      <h1>The Game of Life</h1>
      <Instructions />
    </Styles>
  );
}
