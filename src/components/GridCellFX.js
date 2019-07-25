import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridCellFX({ theme, gridState }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridRect = canvas.getBoundingClientRect();

    canvas.width = gridRect.width * dpr;
    canvas.height = gridRect.width * dpr;
    ctx.scale(dpr, dpr);

    const gridSize = gridState.length;
    const cellSize = canvas.width / dpr / gridSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, 0, cellSize * 4);
    gradient.addColorStop(0.2, theme.colors.cellShadowGradientStart);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellIsAlive = !!gridState[row][col];
        const xPos = col * cellSize;
        const yPos = row * cellSize + cellSize;

        ctx.translate(xPos, yPos);
        if (cellIsAlive) ctx.fillRect(0, 0, cellSize, cellSize * 4);
        ctx.translate(-xPos, -yPos);
      }
    }
  }, [theme, gridState]);

  return (
    <div>
      <canvas id="shadows-canvas" ref={canvasRef} />
    </div>
  );
}

export default withTheme(GridCellFX);
