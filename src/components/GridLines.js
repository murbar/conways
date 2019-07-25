import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridLines({ theme, gridState }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const numGridRows = gridState.length;
    const numGridCols = gridState[0].length;

    canvas.width = rect.width * dpr;
    const cellWidth = canvas.width / dpr / numGridCols;
    // cells will always be square even if grid is not
    const cellHeight = cellWidth;
    canvas.height = cellHeight * numGridRows * dpr;
    ctx.scale(dpr, dpr);

    const gridWidth = canvas.width / dpr;
    const gridHeight = cellHeight * numGridRows;

    ctx.strokeStyle = theme.colors.secondary;
    ctx.lineWidth = 1;

    ctx.strokeRect(0, 0, gridWidth, gridHeight);

    const rightBoundary = gridWidth - Math.floor(cellWidth);
    const bottomBoundary = gridHeight - Math.floor(cellHeight);

    // row lines
    for (let linePos = cellHeight; linePos < bottomBoundary; linePos += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(0, linePos);
      ctx.lineTo(gridWidth, linePos);
      ctx.stroke();
    }
    // col lines
    for (let linePos = cellWidth; linePos < rightBoundary; linePos += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(linePos, 0);
      ctx.lineTo(linePos, gridHeight);
      ctx.stroke();
    }
  }, [theme, gridState]);

  return <canvas id="grid-canvas" ref={canvasRef} />;
}

export default withTheme(GridLines);
