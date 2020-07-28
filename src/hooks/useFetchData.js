import { useEffect } from 'react';

export const useFetchData = (action, state, type, loading) => {
  useEffect(() => {
    if (state.length === 0) {
      loading();
      action(type).then(() => loading());
    }
  }, [state.length, loading, action, type]);
};
