import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchData = (action, type) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = () => {
      setLoading((prevState) => !prevState);
      action(type, source).then(() => setLoading((prevState) => !prevState));
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [action, type]);
  return loading;
};
