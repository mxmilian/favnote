import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchData = (state, action, type) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (Object.keys(state).length === 0) {
      const fetchData = () => {
        setLoading((prevState) => !prevState);
        action(type, source).then(() => setLoading((prevState) => !prevState));
      };

      fetchData();
    }
    return () => {
      source.cancel();
    };
  }, [type]);
  return loading;
};
