import React, { useRef, useEffect } from 'react';
import { withTheme } from 'styled-components';

const dpr = window.devicePixelRatio || 1;

function GridLines({ theme, dimension }) {
  const ref = useRef();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const gridRect = c.getBoundingClientRect();

    c.width = gridRect.width * dpr;
    c.height = gridRect.width * dpr;
    ctx.scale(dpr, dpr);

    const cellSize = c.width / dpr / dimension;
    const gridSize = c.width / dpr;

    ctx.strokeStyle = theme.colors.secondary;
    ctx.lineWidth = 1;
    ctx.setLineDash([1, 1]);

    ctx.strokeRect(0, 0, gridSize, gridSize);

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
  }, [theme, dimension]);

  return <canvas ref={ref} />;
}

export default withTheme(GridLines);
