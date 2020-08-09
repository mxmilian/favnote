import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchData = (action, type) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading((prevState) => !prevState);
      await action(type, source).then(() => setLoading((prevState) => !prevState));
    };

    fetchData().then(() => '');

    return () => {
      source.cancel();
    };
  }, [action, type]);
  return loading;
};
