import { useEffect } from 'react';

export const useFetchUser = (action, state) => {
  useEffect(() => {
    if (!state) {
      action();
    }
  }, [state]);
};
