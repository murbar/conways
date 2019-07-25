import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridCells({ theme, gridState }) {
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

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellAlive = !!gridState[row][col];
        const xPos = col * cellSize;
        const yPos = row * cellSize;

        ctx.fillStyle = theme.colors.primary;
        if (cellAlive) {
          ctx.fillRect(xPos, yPos, cellSize, cellSize);
        } else {
          ctx.clearRect(xPos, yPos, cellSize, cellSize);
        }
      }
    }
  }, [theme, gridState]);

  return <canvas id="cells-canvas" ref={canvasRef} />;
}

export default withTheme(GridCells);
