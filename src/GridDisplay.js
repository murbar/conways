import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { media } from './styles/helpers';

const GridDisplay = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 100vw;
  height: 100vw;
  margin: 0 -2rem;
  border-top: 1px solid ${p => p.theme.colors.blueGrey};
  border-left: 1px solid ${p => p.theme.colors.blueGrey};
  & > div {
    width: calc(100% / ${p => p.size});
    height: calc(100% / ${p => p.size});
  }
  ${media.phone`
    margin: 0;
    width: 50rem;
    height: 50rem;
  `}
  ${media.tablet`
    width: 60rem;
    height: 60rem;
  `}
  ${media.desktop`
    position: fixed;
    left: calc(50vw - 4rem);
    top: 50%;
    transform: translateY(-50%);
    width: 50vw;
    height: 50vw;
    max-width: 100vh;
    max-height: 100vh;
  `}
`;

const cellIsAlive = css`
  box-shadow: 0 0 0.75rem ${p => p.theme.colors.blue};
  border: none;
`;

const cellIsNotAlive = css`
  &:hover {
    background: ${p => p.theme.colors.blueGrey};
  }
`;

const CellDisplay = styled.div`
  background: ${p => (p.isAlive ? p.theme.colors.blue : 'transparent')};
  border-right: 1px solid ${p => p.theme.colors.blueGrey};
  border-bottom: 1px solid ${p => p.theme.colors.blueGrey};
  ${'' /* border-radius: 0.3rem; */}
  box-sizing: border-box;
  user-select: none;
  ${p => !p.isAlive && cellIsNotAlive};
  ${p => p.isAlive && cellIsAlive};
`;

export default function Grid({ state, setCell, isPaused }) {
  const [initialDragCellIsAlive, setInitialDragCellIsAlive] = useState(false);
  const size = state.length;

  const handleMouseDown = e => {
    if (isPaused) {
      const { row, col } = e.target.dataset;
      const isAlive = !!state[row][col];
      setInitialDragCellIsAlive(isAlive);
      setCell(row, col, !isAlive);
    }
  };

  const handleMouseEnter = e => {
    if (isPaused && e.buttons === 1) {
      const { row, col } = e.target.dataset;
      setCell(row, col, !initialDragCellIsAlive);
    }
  };

  return (
    <GridDisplay size={size} draggable="false">
      {state.map((row, i) => {
        return row.map((isAlive, j) => {
          return (
            <CellDisplay
              key={`${i}${j}`}
              isAlive={!!isAlive}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              draggable="false"
              data-row={i}
              data-col={j}
              onTouchStart={handleMouseDown}
            />
          );
        });
      })}
    </GridDisplay>
  );
}
