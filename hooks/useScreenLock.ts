import { useCallback, useState } from 'react';

const useScreenLock = () => {
  const [isLocked, setIsLocked] = useState(false);

  const lock = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setIsLocked(true);
  }, []);

  const unlock = useCallback(() => {
    document.body.style.overflow = 'auto';
    setIsLocked(false);
  }, []);

  return { isLocked, lock, unlock };
};

export default useScreenLock;
