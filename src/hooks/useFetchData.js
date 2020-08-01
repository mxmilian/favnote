import { useEffect } from 'react';

export const useFetchData = (action, state, type, setLoading, shared) => {
  useEffect(() => {
    if (state) {
      setLoading();
      action(type).then(() => {
        setLoading();
      });
    }
  }, [shared]);
};
