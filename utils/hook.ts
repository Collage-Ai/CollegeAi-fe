import { useEffect, useRef, useState } from 'react';

// 定义一个自定义的 useState，支持回调
export function useStateCallback(initialState: any) {
  const [state, setState] = useState(initialState);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const callbackRef = useRef<Function | null>(null); // Fix: Specify the type of callbackRef

  const setStateCallback = (state: any, callback: any) => {
    callbackRef.current = callback;
    setState(state);
  };

  useEffect(() => {
    if (callbackRef.current && typeof callbackRef.current === 'function') {
      // Fix: Check if callbackRef.current is a function
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
