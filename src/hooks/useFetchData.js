import { useEffect } from 'react';

export const useFetchData = (action, state, type, loading, shared) => {
  useEffect(() => {
    if (state.length === 0 || shared) {
      loading();
      action(type).then(() => loading());
    }
  }, [state.length, loading, action, type]);
};
