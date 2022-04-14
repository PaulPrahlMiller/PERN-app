import { useEffect, useRef } from "react";

/** Source - https://overreacted.io/making-setinterval-declarative-with-react-hooks/ */
function useInterval(callback, delay) {
  // Reference to the callback
  const savedCallback = useRef();

  // Remember the latest callback. Only re-run when the callback changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // Only set up an interval if a delay is provided
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
