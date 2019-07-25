import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridLines({ theme, gridSize }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridRect = canvas.getBoundingClientRect();

    canvas.width = gridRect.width * dpr;
    canvas.height = gridRect.width * dpr;
    ctx.scale(dpr, dpr);

    const cellSize = canvas.width / dpr / gridSize;
    const gridWidth = canvas.width / dpr;

    ctx.strokeStyle = theme.colors.secondary;
    ctx.lineWidth = 1;

    ctx.strokeRect(0, 0, gridWidth, gridWidth);

    const boundary = gridWidth - Math.floor(cellSize);
    for (let linePos = cellSize; linePos < boundary; linePos += cellSize) {
      // rows
      ctx.beginPath();
      ctx.moveTo(0, linePos);
      ctx.lineTo(gridWidth, linePos);
      ctx.stroke();
      // cols
      ctx.beginPath();
      ctx.moveTo(linePos, 0);
      ctx.lineTo(linePos, gridWidth);
      ctx.stroke();
    }
  }, [theme, gridSize]);

  return (
    <div>
      <canvas id="grid-canvas" ref={canvasRef} />
    </div>
  );
}

export default withTheme(GridLines);
