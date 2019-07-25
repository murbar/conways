import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridInteractionLayer({ gridState, isPaused, theme }) {
  const canvasRef = useRef();
  const numGridRows = gridState.length;

  const getMousePosition = e => {
    const rect = e.target.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    return [xPos, yPos];
  };

  const getGridCoordinates = e => {
    const canvas = canvasRef.current;
    const cellSize = canvas.width / dpr / numGridRows;
    const [xPos, yPos] = getMousePosition(e);
    const row = Math.floor(Math.abs(yPos) / cellSize);
    const col = Math.floor(Math.abs(xPos) / cellSize);
    return [row, col];
  };

  const drawCellHover = (row, col) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / dpr / numGridRows;

    const xPos = col * cellSize;
    const yPos = row * cellSize;
    const cellIsAlive = !!gridState[row][col];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!cellIsAlive && isPaused) {
      ctx.fillStyle = theme.colors.secondary;
      ctx.fillRect(xPos, yPos, cellSize, cellSize);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleMouseMove = e => {
    const [row, col] = getGridCoordinates(e);
    drawCellHover(row, col);
  };

  const handleMouseLeave = e => {
    clearCanvas();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridRect = canvas.getBoundingClientRect();

    canvas.width = gridRect.width * dpr;
    canvas.height = gridRect.width * dpr;
    ctx.scale(dpr, dpr);
  }, []);

  return (
    <canvas
      id="interaction-canvas"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default withTheme(GridInteractionLayer);
