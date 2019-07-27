import React, { useRef, useState, useEffect } from 'react';
import { withTheme } from 'styled-components';

const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const dpr = window.devicePixelRatio || 1;

function GridInteractionLayer({ gridState, isPaused, callbacks, theme }) {
  const canvasRef = useRef();
  const [initialDragCellIsAlive, setInitialDragCellIsAlive] = useState(false);
  const [prevInteractionCellID, setPrevInteractionCellID] = useState('');
  const [ready, setReady] = useState(false);
  const numGridRows = gridState.length;
  const numGridCols = gridState[0].length;

  const getCellId = (row, col) => `r${row}c${col}`;

  const getMousePosition = e => {
    const rect = e.target.getBoundingClientRect();
    const isTouch = e.type === 'touchstart';
    const xPos = isTouch ? e.touches[0].clientX : e.clientX;
    const yPos = isTouch ? e.touches[0].clientY : e.clientY;
    return [xPos - rect.left, yPos - rect.top];
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
    if (!isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / dpr / numGridRows;

    const xPos = col * cellSize;
    const yPos = row * cellSize;
    const cellIsAlive = !!gridState[row][col];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!cellIsAlive) {
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
    if (!isPaused) return;

    const [row, col] = getGridCoordinates(e);
    const mouseButtonIsDown = e.buttons === 1;
    const cellId = getCellId(row, col);
    if (mouseButtonIsDown) {
      if (cellId !== prevInteractionCellID) {
        setPrevInteractionCellID(cellId);
        callbacks.setCell(row, col, !initialDragCellIsAlive);
      }
    } else {
      drawCellHover(row, col);
    }
  };

  const handleMouseLeave = e => {
    if (isPaused) clearCanvas();
  };

  const handleMouseDown = e => {
    if (!isPaused) return;

    const [row, col] = getGridCoordinates(e);
    const isAlive = !!gridState[row][col];
    setInitialDragCellIsAlive(isAlive);
    setPrevInteractionCellID(getCellId(row, col));
    callbacks.setCell(row, col, !isAlive);
    clearCanvas();
  };

  const handleDoubleClick = () => {
    if (!isPaused) callbacks.playPause();
  };

  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const gridRect = canvas.getBoundingClientRect();
      canvas.width = gridRect.width * dpr;
      const cellSize = canvas.width / dpr / numGridCols;
      canvas.height = cellSize * numGridRows * dpr;
      ctx.scale(dpr, dpr);
      setReady(true);
    };

    setupCanvas();

    // ensure mouse position calc is correct
    const withDelay = debounce(setupCanvas, 100);
    window.addEventListener('resize', withDelay);
    return () => window.removeEventListener('resize', withDelay);
  }, [numGridCols, numGridRows]);

  return (
    <canvas
      id="interaction-canvas"
      ref={canvasRef}
      {...ready && {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onTouchStart: handleMouseDown,
        onDoubleClick: handleDoubleClick
      }}
    />
  );
}

export default withTheme(GridInteractionLayer);
