import React from 'react';
import styled from 'styled-components';
import GridLines from './GridLines';
import GridCellFX from './GridCellFX';
import GridCells from './GridCells';
import GridInteractionLayer from './GridInteractionLayer';

const SquareAspectControl = styled.div`
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

const CanvasLayers = styled.div`
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

function Grid({ state, setCell, isPaused }) {
  return (
    <SquareAspectControl>
      <CanvasLayers>
        <GridCellFX gridState={state} />
        <GridCells gridState={state} />
        <GridLines gridState={state} />
      </CanvasLayers>
    </SquareAspectControl>
  );
}

export default Grid;
