import { useState, useEffect, useRef } from 'react';

export default function useKeyPress(targetKeys) {
  if (!targetKeys instanceof Array) {
    throw TypeError('Target keys must be an array of strings');
  }

  const [keyPressed, setKeyPressed] = useState(null);
  const keydown = useRef(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      // check for long press
      if (keydown.current) return;

      if (targetKeys.includes(key)) {
        setKeyPressed(key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        keydown.current = true;
      }
    };

    const upHandler = ({ key }) => {
      // console.log('up handler');
      if (targetKeys.includes(key)) {
        setKeyPressed(null);
        keydown.current = false;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKeys]);

  return keyPressed;
}
