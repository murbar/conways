import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridCells({ theme, gridState }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridRect = canvas.getBoundingClientRect();
    const numGridRows = gridState.length;
    const numGridCols = gridState[0].length;

    canvas.width = gridRect.width * dpr;
    const cellSize = canvas.width / dpr / numGridCols;
    canvas.height = cellSize * numGridRows * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = theme.colors.primary;
    ctx.shadowBlur = 8;
    ctx.shadowColor = theme.colors.primary;

    for (let row = 0; row < numGridRows; row++) {
      for (let col = 0; col < numGridCols; col++) {
        const cellAlive = !!gridState[row][col];
        const xPos = col * cellSize;
        const yPos = row * cellSize;

        if (cellAlive) ctx.fillRect(xPos, yPos, cellSize, cellSize);
      }
    }
  }, [theme, gridState]);

  return <canvas id="cells-canvas" ref={canvasRef} />;
}

export default withTheme(GridCells);
