import React from 'react';
import styled from 'styled-components';

const GridDisplay = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 50rem;
  height: 50rem;
  border-top: 1px solid ${p => p.theme.colors.blueGrey};
  border-left: 1px solid ${p => p.theme.colors.blueGrey};
  & > div {
    width: calc(100% / ${p => p.size});
    height: calc(100% / ${p => p.size});
  }
`;

const CellDisplay = styled.div`
  background: ${p => (p.isAlive ? p.theme.colors.blue : 'transparent')};
  border-right: 1px solid ${p => p.theme.colors.blueGrey};
  border-bottom: 1px solid ${p => p.theme.colors.blueGrey};
  box-sizing: border-box;
`;

export default function Grid({ state }) {
  const size = state.length;
  return (
    <GridDisplay size={size}>
      {state.map((row, i) => {
        return row.map((isAlive, j) => {
          return <CellDisplay key={`r${i}c${j}`} isAlive={!!isAlive} />;
        });
      })}
    </GridDisplay>
  );
}
