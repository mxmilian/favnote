import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchUser = (fetchUser, user) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      if (Object.keys(user).length === 0) {
        await fetchUser(source);
        setLoading((prevState) => !prevState);
      }
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, [user, fetchUser]);

  return loading;
};
