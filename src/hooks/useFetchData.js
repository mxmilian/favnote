import { useEffect } from 'react';

export const useFetchData = (action, state, type, loading, shared) => {
  useEffect(() => {
    if (state) {
      loading();
      action(type).then(() => loading());
    }
  }, [shared]);
};
