import React, { useEffect, useRef } from 'react';
import styled, { withTheme } from 'styled-components';
import GridLines from './GridLines';
import CellShadows from './CellShadows';

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

const Styles = styled.div`
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    ${'' /* border: 1px solid ${p => p.theme.colors.secondary}; */}
  }
`;

const dpr = window.devicePixelRatio || 1;

function Canvas({ state, setCell, isPaused, theme }) {
  const canvasRef = useRef();
  const ctxRef = useRef();

  const drawGrid = () => {
    const c = canvasRef.current;
    const ctx = ctxRef.current;
    const gridSize = state.length;
    const cellSize = c.width / dpr / gridSize;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellAlive = !!state[row][col];
        const xPos = col * cellSize;
        const yPos = row * cellSize;

        // ctx.beginPath();
        ctx.fillStyle = theme.colors.primary;
        if (cellAlive) {
          ctx.fillRect(xPos, yPos, cellSize, cellSize);
        } else {
          ctx.clearRect(xPos, yPos, cellSize, cellSize);
        }
        // ctx.closePath();
      }
    }
  };

  const drawCellHover = (row, col) => {
    const c = canvasRef.current;
    const ctx = ctxRef.current;
    const gridSize = state.length;
    const cellSize = c.width / dpr / gridSize;

    const xPos = col * cellSize;
    const yPos = row * cellSize;

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(xPos, yPos, cellSize, cellSize);
    ctx.closePath();
  };

  const getMousePosition = e => {
    const rect = e.target.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    return [xPos, yPos];
  };

  const getGridCoordinates = e => {
    const c = canvasRef.current;
    const gridSize = state.length;
    const cellSize = c.width / dpr / gridSize;
    const [xPos, yPos] = getMousePosition(e);
    const row = Math.floor(Math.abs(yPos) / cellSize);
    const col = Math.floor(Math.abs(xPos) / cellSize);
    return [row, col];
  };

  const handleMouseMove = e => {
    const [row, col] = getGridCoordinates(e);
    // drawCellHover(row, col);
    console.log(row, col);
  };

  useEffect(() => {
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.width * dpr;
    ctxRef.current = c.getContext('2d');
    ctxRef.current.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    drawGrid();
  }, [state]);

  return (
    <SquareAspectControl>
        <CellShadows gridState={state} />
          Your browser cannot display this content. :(
        </canvas>
        <GridLines dimension={state.length} />
      </Styles>
    </SquareAspectControl>
  );
}

export default withTheme(Canvas);
