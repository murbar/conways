import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridLines({ theme, gridState }) {
  const canvasRef = useRef();
  const numGridRows = gridState.length;
  const numGridCols = gridState[0].length;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    // cells will always be square even if grid is not
    const cellSize = canvas.width / dpr / numGridCols;
    canvas.height = cellSize * numGridRows * dpr;
    ctx.scale(dpr, dpr);

    const gridWidth = canvas.width / dpr;
    const gridHeight = cellSize * numGridRows;

    ctx.strokeStyle = theme.colors.secondary;
    ctx.lineWidth = 1;

    ctx.strokeRect(0, 0, gridWidth, gridHeight);

    const rightBoundary = gridWidth - Math.floor(cellSize);
    const bottomBoundary = gridHeight - Math.floor(cellSize);

    // row lines
    for (let linePos = cellSize; linePos < bottomBoundary; linePos += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, linePos);
      ctx.lineTo(gridWidth, linePos);
      ctx.stroke();
    }
    // col lines
    for (let linePos = cellSize; linePos < rightBoundary; linePos += cellSize) {
      ctx.beginPath();
      ctx.moveTo(linePos, 0);
      ctx.lineTo(linePos, gridHeight);
      ctx.stroke();
    }
  }, [numGridCols, numGridRows, theme]);

  return <canvas id="grid-canvas" ref={canvasRef} />;
}

export default withTheme(GridLines);
