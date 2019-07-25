import React from 'react';
import styled from 'styled-components';
import GridLines from './GridLines';
import GridCells from './GridCells';
import GridCellFX from './GridCellFX';
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

function Grid({ state, callbacks, isPaused }) {
  return (
    <SquareAspectControl>
      <CanvasLayers>
        <GridLines gridState={state} />
        <GridCellFX gridState={state} />
        <GridCells gridState={state} />
        <GridInteractionLayer gridState={state} isPaused={isPaused} callbacks={callbacks} />
      </CanvasLayers>
    </SquareAspectControl>
  );
}

export default Grid;
