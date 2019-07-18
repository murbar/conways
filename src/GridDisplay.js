import React, { useState } from 'react';
import styled, { css } from 'styled-components';

// padding on parent element is 2rem on the sides
const GridAspectControl = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const GridDisplay = styled.div`
  display: flex;
  flex-flow: wrap;
  border-top: 0.5px solid ${p => p.theme.colors.blueGrey};
  border-left: 0.5px solid ${p => p.theme.colors.blueGrey};
  overflow: hidden;
  & > div {
    width: calc(100% / ${p => p.size});
    height: calc(100% / ${p => p.size});
  }
`;

const cellIsAlive = css`
  box-shadow: 0 0 0.75rem ${p => p.theme.colors.blue};
  border: none;
  &:before {
    content: '';
    pointer-events: none;
    display: block;
    position: relative;
    top: 100%;
    height: 400%;
    background: ${p => p.theme.colors.cellShadowGradient};
  }
`;

const cellIsNotAlive = css`
  &:hover {
    background: ${p => p.theme.colors.blueGrey};
  }
`;

const CellDisplay = styled.div`
  background: ${p => (p.isAlive ? p.theme.colors.blue : 'transparent')};
  border-right: 0.5px solid ${p => p.theme.colors.blueGrey};
  border-bottom: 0.5px solid ${p => p.theme.colors.blueGrey};
  box-sizing: border-box;
  user-select: none;
  ${'' /* transition: background 0.05s linear; */}
  ${p => !p.isAlive && cellIsNotAlive};
  ${p => p.isAlive && cellIsAlive};
`;

export default function Grid({ state, setCell, isPaused }) {
  const [initialDragCellIsAlive, setInitialDragCellIsAlive] = useState(false);
  const size = state.length;

  const handleMouseDownCell = e => {
    if (isPaused) {
      const { row, col } = e.target.dataset;
      const isAlive = !!state[row][col];
      setInitialDragCellIsAlive(isAlive);
      setCell(row, col, !isAlive);
    }
  };

  const handleMouseEnterCell = e => {
    if (isPaused && e.buttons === 1) {
      const { row, col } = e.target.dataset;
      setCell(row, col, !initialDragCellIsAlive);
    }
  };

  return (
    <GridAspectControl>
      <GridDisplay size={size} draggable="false">
        {state.map((row, i) => {
          return row.map((isAlive, j) => {
            return (
              <CellDisplay
                key={`${i}${j}`}
                isAlive={!!isAlive}
                onMouseDown={handleMouseDownCell}
                onMouseEnter={handleMouseEnterCell}
                draggable="false"
                data-row={i}
                data-col={j}
                onTouchStart={handleMouseDownCell}
              />
            );
          });
        })}
      </GridDisplay>
    </GridAspectControl>
  );
}
