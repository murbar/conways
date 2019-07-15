import React from 'react';
import styled from 'styled-components';

const GridDisplay = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 30rem;
  height: 30rem;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  & > div {
    width: calc(100% / ${p => p.size});
    height: calc(100% / ${p => p.size});
  }
`;

const CellDisplay = styled.div`
  background: ${p => (p.on ? 'black' : 'white')};
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
`;

export default function Grid({ state }) {
  const size = state.length;
  return (
    <GridDisplay size={size}>
      {state.map(row => {
        return row.map(on => {
          return <CellDisplay on={!!on} />;
        });
      })}
    </GridDisplay>
  );
}
