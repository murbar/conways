import React, { useEffect, useRef } from 'react';
import styled, { withTheme } from 'styled-components';

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
  canvas#canvas {
    ${'' /* display: none; */}
  }
`;

const dpr = window.devicePixelRatio || 1;

function Canvas({ state, setCell, isPaused, theme }) {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const gridCanvasRef = useRef();
  const gridCtxRef = useRef();

  const setupGrid = () => {
    // cells
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.width * dpr;
    ctxRef.current = c.getContext('2d');
    ctxRef.current.scale(dpr, dpr);

    // grid
    const g = gridCanvasRef.current;
    const gridRect = g.getBoundingClientRect();
    g.width = gridRect.width * dpr;
    g.height = gridRect.width * dpr;
    gridCtxRef.current = g.getContext('2d');
    gridCtxRef.current.scale(dpr, dpr);

    drawGridLines();
  };

  const drawGridLines = () => {
    const c = gridCanvasRef.current;
    const ctx = c.getContext('2d');
    const cellSize = c.width / dpr / state.length;
    const gridSize = c.width / dpr;

    ctx.strokeStyle = theme.colors.secondary;
    ctx.lineWidth = 1;

    // perimeter
    ctx.strokeRect(0, 0, gridSize, gridSize);
    ctx.setLineDash([1, 1]);
    for (let linePos = cellSize; linePos < gridSize - cellSize; linePos += cellSize) {
      // rows
      ctx.beginPath();
      ctx.moveTo(0, linePos);
      ctx.lineTo(gridSize, linePos);
      ctx.stroke();
      // cols
      ctx.beginPath();
      ctx.moveTo(linePos, 0);
      ctx.lineTo(linePos, gridSize);
      ctx.stroke();
    }
  };

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
    setupGrid();
  }, []);

  useEffect(() => {
    drawGrid();
  }, [state]);

  return (
    <SquareAspectControl>
      <Styles>
        <canvas id="canvas" ref={canvasRef} onMouseMove={handleMouseMove}>
          Your browser cannot display this content. :(
        </canvas>
        <canvas id="grid-canvas" ref={gridCanvasRef} />
      </Styles>
    </SquareAspectControl>
  );
}

export default withTheme(Canvas);
