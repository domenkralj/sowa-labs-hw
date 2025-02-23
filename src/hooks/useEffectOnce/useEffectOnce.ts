import {useEffect, useRef} from 'react';

/**
 * Runs an effect only once on mount.
 * @param effect Function to execute on mount
 */
const useEffectOnce = (effect: () => void | (() => void)) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
  }, []);
}

export default useEffectOnce