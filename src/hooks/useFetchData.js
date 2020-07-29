import { useEffect } from 'react';

let x = 0;
export const useFetchData = (action, state, type, loading, shared) => {
  useEffect(() => {
    if ((state.length === 0 || shared) && x < 2) {
      x += 1;
      loading();
      action(type).then(() => loading());
      console.log(x);
    }
  }, [shared]);
};
