import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StepIcon } from '../icons/forward.svg';
import { ReactComponent as RandomizeIcon } from '../icons/shuffle.svg';
import { ReactComponent as ResetIcon } from '../icons/x.svg';
import { media } from '../styles/helpers';

const Styles = styled.div`
  .controls {
    svg {
      width: 1em;
      transform: translateY(0.1em);
    }
    ${'' /* line-height: 1.8; */}
  }
`;

const Instructions = styled.div`
  background: ${p => p.theme.colors.secondary};
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.8em;
  margin-top: 1rem;
  h2 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      line-height: 2;
    }
  }
  ${media.phone`
    padding: 1.5rem 2.5rem;
    font-size: 0.9em;
  `}
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

export default function About() {
  return (
    <Styles>
      <Instructions>
        <h2>Get Started</h2>
        <ul className="controls">
          <li>
            <PlayIcon /> <strong>Play</strong> / <PauseIcon /> <strong>Pause</strong> the simulation{' '}
            <HotKey>P</HotKey>
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
            Control the <strong>rate of evolution</strong> with the speed toggle and change a cell's
            state with a <strong>click, or drag across the grid</strong> to easily edit multiple
            cells
          </li>
        </ul>
      </Instructions>
      <h2>What is it?</h2>
      <p>
        Invented by Cambridge mathematician John Conway in 1970, the Game of Life is a "game" with
        no players. More simulation than game, cells on a grid live and die according to a simple
        set of rules. A cell's fate is determined by the number of neighboring cells that are alive.
        Upon each iteration of the grid:
      </p>
      <ul>
        <li>A living cell with less than 2 neighbors will die from loneliness</li>
        <li>A living cell with more than 3 neighbors will die from overcrowding</li>
        <li>A living cell with 2 or 3 neighbors is contented and lives on</li>
        <li>An empty cell with exactly 3 neighbors will spring to life</li>
      </ul>
      <p>
        Conway's game was inspired by work done in the 1940s by John von Neumann who was working on
        an idea for a hypothetical self-replicating machine. The <em>Game of Life</em> is a classic{' '}
        <a href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automaton</a> and the
        product of Conway's efforts to simplify von Neumann's ideas.
      </p>
      <p>
        The work is of interest to computer scientists because it's possible to build the elementary
        parts of a computer, including memory and{' '}
        <a href="https://sucs.org/~pwb/report/lifecomp.html">logic gates</a>, inside the simulation.
        This makes <em>Life</em> a{' '}
        <a href="https://en.wikipedia.org/wiki/Universal_Turing_machine">
          universal Turing machine
        </a>{' '}
        &mdash; theoretically capable of computing anything that can be computed algorithmically,
        given a large enough grid and sufficient time.
      </p>
      <p>
        The game's concepts of emergent complexity and self-organization are influential in a wide
        range of fields including physics, biology, math, economics, philosophy and art.{' '}
      </p>

      {/* <h2>Technical Considerations</h2>

      <p>
        Polya process, React, double-buffers, canvas, possible improvments... Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Ab sapiente excepturi adipisci fuga animi cumque
        veritatis error rerum quis, laboriosam dolore delectus porro dolorem rem enim obcaecati
        ipsum distinctio aspernatur.
      </p> */}
    </Styles>
  );
}
