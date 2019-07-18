import { useEffect, useRef } from 'react';
import useKeyPress from './useKeyPress';

export default function useKeyboardShortcuts(keyCallbacks) {
  const keys = Object.keys(keyCallbacks);
  const keyPressed = useKeyPress(keys);

  useEffect(() => {
    if (keyPressed !== null) {
      keyCallbacks[keyPressed]();
    }
    // including keyCallbacks cause the key press to be fired twice
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);
}
